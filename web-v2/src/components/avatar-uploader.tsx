"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/**
 * Avatar do usuário com upload (PC e mobile). No celular, accept="image/*"
 * permite escolher entre câmera e galeria. Sobe para o bucket "avatars" do
 * Supabase Storage e grava avatar_url no profile.
 */
export function AvatarUploader({
  userId,
  currentUrl,
  displayName,
  size = 80,
}: {
  userId: string;
  currentUrl: string | null;
  displayName: string;
  size?: number;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string | null>(currentUrl);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // permite reescolher a mesma foto
    if (!file) return;
    setErr(null);

    if (!file.type.startsWith("image/")) {
      setErr("Selecione uma imagem.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErr("Imagem muito grande (máx. 5 MB).");
      return;
    }

    setBusy(true);
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `${userId}/avatar-${Date.now()}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
      const publicUrl = pub.publicUrl;

      const { error: dbErr } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);
      if (dbErr) throw dbErr;

      setUrl(publicUrl);
      router.refresh();
    } catch {
      setErr("Não foi possível enviar a foto. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex flex-col items-center">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        aria-label="Alterar foto de perfil"
        className="font-display group relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#f1c40f] to-[#e0a417] font-black text-[#3b2f00] shadow-md"
        style={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="Foto de perfil" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span>{displayName.charAt(0).toUpperCase()}</span>
        )}
        <span className="absolute inset-0 flex items-end justify-center pb-1.5 text-[10px] font-bold text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
          {busy ? "Enviando…" : "Alterar"}
        </span>
        {/* ícone de câmera (desenhado, sem emoji) */}
        <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#3b2f00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onPick}
        className="hidden"
      />
      {err && <p className="mt-1 max-w-[160px] text-center text-[10px] font-bold text-red-500">{err}</p>}
    </div>
  );
}
