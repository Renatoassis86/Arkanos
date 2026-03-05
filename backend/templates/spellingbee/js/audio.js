// src/interface/js/audio.js

export function falarTexto(texto) {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'en-US';
  utterance.rate = 0.7;
  speechSynthesis.speak(utterance);
}

export function configurarMusicaDeFundo() {
  const musica = document.getElementById("musica-fundo");
  if (musica) {
    musica.volume = 0.2;
    document.addEventListener('click', () => {
      if (musica.paused) musica.play().catch(() => {});
    }, { once: true });
  }
}

export function tocarSomCorreto() {
  const som = document.getElementById("som-correto");
  if (som) som.play();
}

export function tocarSomErro() {
  const som = document.getElementById("som-erro");
  if (som) som.play();
}
