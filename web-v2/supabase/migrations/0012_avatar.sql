-- 0012 — Foto de perfil do usuário (avatar)
-- Coluna em profiles + bucket público "avatars" + policies (cada um gere seus arquivos).

alter table public.profiles add column if not exists avatar_url text;

-- Bucket público de avatares
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Leitura pública das imagens
drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read" on storage.objects
  for select using (bucket_id = 'avatars');

-- Cada usuário só escreve dentro da própria pasta {uid}/...
drop policy if exists "avatars user insert" on storage.objects;
create policy "avatars user insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars user update" on storage.objects;
create policy "avatars user update" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "avatars user delete" on storage.objects;
create policy "avatars user delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- Garante que o usuário pode atualizar o próprio perfil (avatar_url)
drop policy if exists "profiles self update avatar" on public.profiles;
create policy "profiles self update avatar" on public.profiles
  for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);
