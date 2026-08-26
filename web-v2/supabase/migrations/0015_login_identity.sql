-- ============================================================
-- 0015 — Identidade de login unica por (nome+sobrenome) com
-- desambiguacao por data de nascimento quando ha colisao de nomes.
--
-- Ate aqui o e-mail interno da conta era so slug(nome).slug(sobrenome),
-- entao dois alunos reais com o mesmo primeiro nome + ultimo sobrenome
-- caiam na MESMA conta (o segundo nunca se cadastrava de fato, so
-- "herdava" o login do primeiro). Agora:
--   - login_key = slug(nome).slug(sobrenome) (chave de busca, nao unica)
--   - email fica denormalizado em profiles pra permitir o lookup de
--     login ANTES de autenticar (RLS bloqueia leitura de profiles sem
--     sessao, entao o lookup roda via RPC security definer)
--   - no cadastro: se login_key ja existir, o novo e-mail ganha um
--     sufixo com a data de nascimento (AAAAMMDD) pra nao colidir
--   - no login: se houver mais de 1 conta com o mesmo login_key, o
--     app pede a data de nascimento pra desempatar
-- Idempotente.
-- ============================================================

alter table public.profiles
  add column if not exists login_key text,
  add column if not exists email text,
  add column if not exists last_login_at timestamptz;

-- Backfill a partir do e-mail ja existente em auth.users. O sufixo de
-- data de nascimento (se houver, de cadastros antigos feitos na mao)
-- segue o padrao ".AAAAMMDD" no fim do local-part.
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id and p.email is null;

update public.profiles
set login_key = regexp_replace(split_part(email, '@', 1), '\.[0-9]{8}$', '')
where login_key is null and email is not null;

create index if not exists profiles_login_key_idx on public.profiles (login_key);

-- ---------- trigger de criação: agora também grava login_key e email ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, serie, data_nascimento, login_key, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'serie',
    nullif(new.raw_user_meta_data ->> 'data_nascimento', '')::date,
    new.raw_user_meta_data ->> 'login_key',
    new.email
  );
  return new;
end;
$$;

-- ---------- RPCs de login (security definer — chamaveis sem sessao) ----------

-- Passo 1: quantas contas existem com esse login_key? Se for exatamente
-- 1, ja devolve o e-mail (seguro usar direto). Se for 0 ou 2+, email
-- volta null e o app decide o que fazer (cadastrar ou desambiguar).
drop function if exists public.login_lookup(text);
create or replace function public.login_lookup(p_login_key text)
returns table(candidate_count integer, email text)
language plpgsql security definer set search_path = public as $$
declare
  v_count int;
  v_email text;
begin
  select count(*) into v_count from public.profiles where login_key = p_login_key;
  if v_count = 1 then
    select p.email into v_email from public.profiles p where p.login_key = p_login_key limit 1;
  end if;
  return query select v_count, v_email;
end;
$$;

-- Passo 2 (só quando há colisão): desempata por nome+sobrenome+nascimento.
drop function if exists public.login_lookup_by_birthdate(text, date);
create or replace function public.login_lookup_by_birthdate(p_login_key text, p_data_nascimento date)
returns text
language sql security definer set search_path = public as $$
  select email from public.profiles
  where login_key = p_login_key and data_nascimento = p_data_nascimento
  limit 1;
$$;

-- Quantos alunos ja tem esse login_key — usado no cadastro pra decidir
-- se o novo e-mail precisa do sufixo de data de nascimento.
drop function if exists public.count_login_key(text);
create or replace function public.count_login_key(p_login_key text)
returns integer
language sql security definer set search_path = public as $$
  select count(*)::int from public.profiles where login_key = p_login_key;
$$;

grant execute on function public.login_lookup(text) to anon, authenticated;
grant execute on function public.login_lookup_by_birthdate(text, date) to anon, authenticated;
grant execute on function public.count_login_key(text) to anon, authenticated;
