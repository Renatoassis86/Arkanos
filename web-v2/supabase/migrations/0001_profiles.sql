-- ============================================================
-- Fase 1 · 0001 — Tabela de perfis + criação automática no signup
-- Aplicar no SQL Editor do Supabase (ou via supabase db push).
-- ============================================================

create table if not exists public.profiles (
  id              uuid primary key references auth.users (id) on delete cascade,
  display_name    text,
  serie           text,
  data_nascimento date,
  role            text not null default 'student',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Cria a row em profiles automaticamente quando um usuário se registra.
-- Lê os metadados enviados no signUp (options.data).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, serie, data_nascimento)
  values (
    new.id,
    new.raw_user_meta_data ->> 'display_name',
    new.raw_user_meta_data ->> 'serie',
    nullif(new.raw_user_meta_data ->> 'data_nascimento', '')::date
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
