// game.js

// Variáveis globais do jogo
let jogador = {};
let palavraAtual = null;
let pontos = 0;
let rodada = 1;
let tempoRestante = 60;
let timerInterval;
let bancoPalavras = {};

// Inicializa o jogo
function iniciarJogo() {
  jogador = obterJogador();
  bancoPalavras = carregarPalavras(jogador.serie);
  pontos = 0;
  rodada = 1;
  tempoRestante = 60;
  atualizarTela();
  proximaPalavra();
  iniciarContagem();
}

// Vai para a próxima palavra
function proximaPalavra() {
  palavraAtual = selecionarPalavra(bancoPalavras);
  exibirPalavra(palavraAtual);
}

// Trata a resposta
function processarResposta(resposta) {
  if (!palavraAtual) return;

  const correta = palavraAtual.word.toUpperCase();
  const digitada = resposta.trim().toUpperCase();

  if (digitada === correta) {
    pontos++;
    rodada++;
    atualizarPontuacao();
    proximaPalavra();
  } else {
    desclassificar("Wrong spelling!");
  }
}

// Atualiza informações na tela
function atualizarTela() {
  document.getElementById("pontuacao").textContent = `Score: ${pontos}`;
  document.getElementById("rodada").textContent = `Round: ${rodada}`;
}

// Temporizador
function iniciarContagem() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    tempoRestante--;
    document.getElementById("tempo").textContent = `Time left: ${tempoRestante}s`;

    if (tempoRestante <= 0) {
      clearInterval(timerInterval);
      desclassificar("Time's up!");
    }
  }, 1000);
}
