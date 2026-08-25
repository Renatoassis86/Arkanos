"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GuardianAvatar } from "@/components/guardian-avatar";
import { speak, stopSpeaking } from "@/lib/spell-speech";
import { SpeakerIcon, CheckCircleIcon, XCircleIcon, MicIcon } from "@/components/game-icons";

interface SpellingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: "pt-BR" | "en-US";
  gameTitle?: string;
}

const STORAGE_KEY = "arkanos_skip_spelling_tutorial";

export function SpellingTutorialModal({
  isOpen,
  onClose,
  lang = "pt-BR",
  gameTitle = "Radix",
}: SpellingTutorialProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const isPt = lang === "pt-BR";

  const tutorialAudioText = isPt
    ? "Bem-vindo ao concurso de soletração! Para uma captura de voz perfeita: primeiro, fale a palavra inteira em voz alta e clara para abrir os slots. Em seguida, soletre cada letra com calma e uma pequena pausa entre elas. Mantenha o ambiente silencioso e evite palavras extras como 'peraí' enquanto o microfone estiver ligado. Se preferir, você também pode clicar nas letras na tela. Boa sorte!"
    : "Welcome to the spelling challenge! For perfect voice recognition: first, pronounce the whole word clearly to activate the spelling slots. Next, spell out each letter slowly with a slight pause. Keep a quiet background and avoid extra filler words while the mic is listening. You can also tap the letter tiles on the screen. Good luck!";

  function handlePlayAudio() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }

    setSpeaking(true);
    speak(tutorialAudioText, {
      lang,
      rate: 0.9,
      onend: () => setSpeaking(false),
    });
  }

  function handleStart() {
    stopSpeaking();
    if (dontShowAgain && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    onClose();
  }

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border-2 border-emerald-200 bg-white p-5 sm:p-7 shadow-2xl"
        >
          {/* Topo / Header */}
          <div className="flex items-center gap-3.5 border-b border-slate-100 pb-4">
            <GuardianAvatar name="lyra" size={54} ring="#10b981" className="shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                {isPt ? "Tutorial de Soletração Oficial" : "Official Spelling Tutorial"}
              </span>
              <h2 className="font-display text-xl font-black text-slate-900 leading-tight mt-0.5">
                {isPt ? "Como Ter 100% de Precisão na Voz" : "How to Get 100% Voice Accuracy"}
              </h2>
            </div>
          </div>

          {/* Botão de Áudio Explicativo da Guardiã */}
          <button
            type="button"
            onClick={handlePlayAudio}
            className={`mt-4 w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 text-xs font-bold transition shadow-sm ${
              speaking
                ? "bg-emerald-600 text-white animate-pulse"
                : "border-2 border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            <SpeakerIcon className="h-4 w-4" />
            {speaking
              ? (isPt ? "Ouvindo Lyra... (Clique para parar)" : "Listening to Lyra... (Click to stop)")
              : (isPt ? "Ouvir Explicação em Áudio da Guardiã" : "Listen to Guardian's Voice Guide")}
          </button>

          {/* 4 Regras Essenciais */}
          <div className="mt-4 space-y-2.5 text-left text-xs sm:text-sm">
            {/* Regra 1 */}
            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/40 p-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-black text-white">
                1
              </span>
              <div>
                <strong className="text-slate-900">
                  {isPt ? "Diga a palavra inteira primeiro:" : "Pronounce the whole word first:"}
                </strong>
                <p className="text-slate-600 text-xs mt-0.5">
                  {isPt
                    ? 'Fale a palavra claramente em voz alta (ex: "CASA") para destravar a soletração.'
                    : 'Say the full word aloud (e.g., "APPLE") to activate the letter slots.'}
                </p>
              </div>
            </div>

            {/* Regra 2 */}
            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/40 p-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-black text-white">
                2
              </span>
              <div>
                <strong className="text-slate-900">
                  {isPt ? "Soletre pausadamente letra por letra:" : "Spell out each letter calmly:"}
                </strong>
                <p className="text-slate-600 text-xs mt-0.5">
                  {isPt
                    ? 'Pronuncie cada letra com calma (ex: "C... A... S... A"). Para acentos ou ç, fale diretamente a letra ("á", "é", "cê-cedilha") ou clique na tela.'
                    : 'Spell with a brief pause between letters (e.g., "A... P... P... L... E").'}
                </p>
              </div>
            </div>

            {/* Regra 3 - O QUE NÃO FAZER */}
            <div className="flex items-start gap-2.5 rounded-xl border border-rose-100 bg-rose-50/40 p-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500 text-[11px] font-black text-white">
                3
              </span>
              <div>
                <strong className="text-rose-900">
                  {isPt ? "O que evitar para não dar erro:" : "What to avoid:"}
                </strong>
                <p className="text-rose-800/80 text-xs mt-0.5">
                  {isPt
                    ? "Evite barulhos ao redor (TV, conversas) e não fale palavras extras como 'peraí', 'hum' ou 'acho que é...'."
                    : "Avoid background noise (TV, chatter) and do not speak filler words like 'wait', 'um' or 'I think'."}
                </p>
              </div>
            </div>

            {/* Regra 4 */}
            <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-600 text-[11px] font-black text-white">
                4
              </span>
              <div>
                <strong className="text-slate-900">
                  {isPt ? "Teclado interativo na tela:" : "Interactive on-screen keyboard:"}
                </strong>
                <p className="text-slate-600 text-xs mt-0.5">
                  {isPt
                    ? "Se preferir ou estiver em local com barulho, você pode clicar nas letras na tela."
                    : "If you prefer or are in a noisy environment, you can tap the on-screen letter tiles."}
                </p>
              </div>
            </div>
          </div>

          {/* Opção Não Mostrar Novamente */}
          <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>{isPt ? "Não mostrar este tutorial novamente" : "Don't show this tutorial again"}</span>
            </label>
          </div>

          {/* Botão de Começar */}
          <button
            type="button"
            onClick={handleStart}
            className="mt-4 w-full rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-md hover:bg-emerald-700 transition active:scale-95 flex items-center justify-center gap-2"
          >
            {isPt ? "Entendido! Começar Soletração →" : "Understood! Start Spelling →"}
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function shouldShowTutorial(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) !== "true";
}
