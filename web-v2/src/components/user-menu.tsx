"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/app/(auth)/actions";

/** Menu de conta no canto superior direito: mudar foto, ver site, sair. */
export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) return;
      setUid(user.id);
      const { data: p } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", user.id)
        .single();
      setName(p?.display_name || user.email || "Sábio");
      setAvatar(p?.avatar_url ?? null);
    });
  }, []);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !uid) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return;
    setBusy(true);
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
      const path = `${uid}/avatar-${Date.now()}.${ext}`;
      const { error: up } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (up) throw up;
      const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
      await supabase.from("profiles").update({ avatar_url: pub.publicUrl }).eq("id", uid);
      setAvatar(pub.publicUrl);
      router.refresh();
    } catch {
      /* silencioso */
    } finally {
      setBusy(false);
      setOpen(false);
    }
  }

  const Avatar = ({ size }: { size: number }) => (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#f1c40f] to-[#e0a417] font-black text-[#3b2f00]"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
    >
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={avatar} alt="" className="h-full w-full object-cover" />
      ) : (
        (name || "?").charAt(0).toUpperCase()
      )}
    </span>
  );

  const item =
    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-bold transition";

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu da conta"
        className="flex items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-2 transition hover:bg-white/20"
      >
        <Avatar size={30} />
        <span className="hidden max-w-[110px] truncate text-xs font-bold text-white sm:block">
          {name || "Conta"}
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/80">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <>
          <button
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
              <Avatar size={40} />
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-slate-900">{name || "Sábio"}</p>
                <p className="text-[11px] text-slate-500">Minha conta</p>
              </div>
            </div>
            <div className="p-1.5">
              <button onClick={() => fileRef.current?.click()} disabled={busy} className={`${item} text-slate-700 hover:bg-slate-100`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                {busy ? "Enviando foto…" : "Editar perfil"}
              </button>
              <Link href="/jogos" onClick={() => setOpen(false)} className={`${item} text-slate-700 hover:bg-slate-100`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" />
                </svg>
                Minha plataforma
              </Link>
              <Link href="/" onClick={() => setOpen(false)} className={`${item} text-slate-700 hover:bg-slate-100`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                </svg>
                Ver o site
              </Link>
            </div>
            <div className="border-t border-slate-100 p-1.5">
              <button onClick={() => void logout()} className={`${item} text-rose-600 hover:bg-rose-50`}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" />
                </svg>
                Sair
              </button>
            </div>
          </div>
        </>
      )}

      <input ref={fileRef} type="file" accept="image/*" onChange={onPick} className="hidden" />
    </div>
  );
}
