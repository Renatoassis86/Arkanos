import { bancoPalavras } from "./palavras/bancoPalavras.js";

let jogador = {};
let palavraAtual = {};
let pontos = 0;
let rodada = 0;
let palavrasUsadas = [];
let cronometro;
let inicioJogo = null;

// 🔹 Funções de interface
window.mostrarLogin = function () {
  document.getElementById("tela-escolha").classList.add("hidden");
  document.getElementById("tela-login").classList.remove("hidden");
};
window.mostrarCadastro = function () {
  document.getElementById("tela-escolha").classList.add("hidden");
  document.getElementById("tela-cadastro").classList.remove("hidden");
};
window.voltarEscolha = function () {
  document.getElementById("tela-login").classList.add("hidden");
  document.getElementById("tela-cadastro").classList.add("hidden");
  document.getElementById("tela-escolha").classList.remove("hidden");
};

// 🔹 Carregar perfil
function carregarPerfil(login) {
  return JSON.parse(localStorage.getItem(`perfil_${login}`));
}

// 🔹 Salvar perfil
function salvarPerfil(perfil) {
  localStorage.setItem(`perfil_${perfil.login}`, JSON.stringify(perfil));
}

// ✅ Cadastro
window.fazerCadastro = function () {
  const nome = document.getElementById("cad-nome").value.trim();
  const sobrenome = document.getElementById("cad-sobrenome").value.trim();
  const login = document.getElementById("cad-login").value.trim();
  const senha = document.getElementById("cad-senha").value.trim();
  const serie = document.getElementById("cad-serie").value;

  if (!nome || !sobrenome || !login || !senha || !serie) {
    alert("Please fill all fields.");
    return;
  }

  if (senha.length !== 6 || isNaN(senha)) {
    alert("Password must be 6 digits (ddmmyy).");
    return;
  }

  if (carregarPerfil(login)) {
    alert("This username is already registered.");
    return;
  }

  const perfil = { nome, sobrenome, login, senha, serie };
  salvarPerfil(perfil);
  alert("✅ Registration successful! You can now log in.");
  voltarEscolha();
};

// ✅ Login
window.fazerLogin = function () {
  const login = document.getElementById("login-usuario").value.trim();
  const senha = document.getElementById("login-senha").value.trim();

  const perfil = carregarPerfil(login);
  if (!perfil || perfil.senha !== senha) {
    alert("Invalid username or password.");
    return;
  }

  jogador = perfil;
  pontos = 0;
  rodada = 0;
  palavrasUsadas = [];
  inicioJogo = Date.now();

  document.getElementById("pontos").innerText = pontos;
  document.getElementById("rodada").innerText = rodada;
  document.getElementById("tela-login").classList.add("hidden");
  document.getElementById("tela-jogo").classList.remove("hidden");
  iniciarRodada();
};

// ✅ Início da rodada
function iniciarRodada() {
  if (palavrasUsadas.length === bancoPalavras[jogador.serie].length) {
    return mostrarRanking("🏁 You've completed all words!");
  }

  let index;
  do {
    index = Math.floor(Math.random() * bancoPalavras[jogador.serie].length);
  } while (palavrasUsadas.includes(index));

  palavraAtual = bancoPalavras[jogador.serie][index];
  palavrasUsadas.push(index);
  rodada++;

  document.getElementById("rodada").innerText = rodada;
  document.getElementById("btn-frase").classList.remove("hidden");
  document.getElementById("btn-significado").classList.remove("hidden");
  document.getElementById("btn-soletrar").classList.remove("hidden");
  document.getElementById("pergunta").innerText = `Can you spell the next word?`;
  document.getElementById("resultado").innerText = "";

  iniciarContador();
  falarTexto(`Can you spell ${palavraAtual.word}?`);
}

// ✅ Contador
function iniciarContador() {
  let tempo = 60;
  document.getElementById("contador").innerText = tempo;
  clearInterval(cronometro);
  cronometro = setInterval(() => {
    tempo--;
    document.getElementById("contador").innerText = tempo;
    if (tempo <= 0) {
      clearInterval(cronometro);
      desclassificar("⏰ Time's up!");
    }
  }, 1000);
}

// ✅ Voz
function falarTexto(texto) {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'en-US';
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}

// ✅ Botões auxiliares
window.ouvirPergunta = function () {
  falarTexto(`Can you spell... ${palavraAtual.word}?`);
};
window.falarFrase = function () {
  falarTexto(`In a sentence: ${palavraAtual.frase}`);
};
window.falarSignificado = function () {
  falarTexto(`It means: ${palavraAtual.meaning}`);
};

// ✅ Gravar resposta
window.gravarResposta = function () {
  if (!palavraAtual || !palavraAtual.word) {
    alert("Game not started or word missing.");
    return;
  }
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();

  recognition.onresult = (event) => {
    const falado = event.results[0][0].transcript.toLowerCase();
    const texto = falado.replace(/[^a-z]/g, '').split('').join('');
    const soletradoCorreto = palavraAtual.word.toLowerCase().split('').join('');
    const resultadoDiv = document.getElementById("resultado");

    if (texto === soletradoCorreto) {
      pontos++;
      document.getElementById("pontos").innerText = pontos;
      const somCorreto = document.getElementById("som-correto");
      if (somCorreto) somCorreto.play();
      falarTexto("Correct!");
      resultadoDiv.innerText = `✅ Correct! Score: ${pontos}`;
      resultadoDiv.className = "pulse-green";
      setTimeout(iniciarRodada, 3000);
    } else {
      clearInterval(cronometro);
      const somErro = document.getElementById("som-erro");
      if (somErro) somErro.play();

      const mensagemErro = `❌ Wrong spelling! The correct spelling is: ${palavraAtual.word.toUpperCase()}`;

      // 🔊 Falar mensagem de erro e soletração
      falarTexto(`Wrong spelling. The correct spelling is ${palavraAtual.word}`);
      setTimeout(() => {
        const soletrado = palavraAtual.word.split('').join(' ');
        falarTexto(`Spelling: ${soletrado}`);
        setTimeout(() => {
          desclassificar(mensagemErro);
        }, 3000);
      }, 2500);
    }
  };

  recognition.onerror = (event) => {
    alert("Speech error: " + event.error);
  };
};

// ✅ Ranking
function salvarRanking() {
  const chave = `ranking_${jogador.serie}`;
  let ranking = JSON.parse(localStorage.getItem(chave)) || [];

  const tempoTotal = Math.floor((Date.now() - inicioJogo) / 1000);
  const nomeCompleto = `${jogador.nome} ${jogador.sobrenome}`;

  const existente = ranking.find(j => j.login === jogador.login);
  if (existente) {
    if (pontos > existente.pontos) existente.pontos = pontos;
    existente.tempo = tempoTotal;
  } else {
    ranking.push({ login: jogador.login, nome: nomeCompleto, pontos, serie: jogador.serie, tempo: tempoTotal });
  }
  localStorage.setItem(chave, JSON.stringify(ranking));
}

function mostrarRanking(mensagem = "🏁 Game Over!") {
  salvarRanking();
  const series = ["2ano", "4ano"];
  let rankingFinal = "";
  series.forEach(serie => {
    let ranking = JSON.parse(localStorage.getItem(`ranking_${serie}`)) || [];
    ranking.sort((a, b) => b.pontos - a.pontos);
    rankingFinal += `🎮 Top 10 - ${serie.toUpperCase()}\n\n`;
    ranking.slice(0, 10).forEach((j, i) => {
      rankingFinal += `${i + 1}. ${j.nome} - ${j.pontos} pts (${j.tempo || 0}s)\n`;
    });
    rankingFinal += `\n`;
  });

  document.getElementById("ranking-conteudo").innerText = `${mensagem}\n\n${rankingFinal}`;
  document.getElementById("tela-jogo").classList.add("hidden");
  document.getElementById("tela-ranking").classList.remove("hidden");
}

function desclassificar(mensagem) {
  salvarRanking();
  falarTexto(mensagem);
  mostrarRanking(mensagem);
}

// ✅ Reiniciar jogo
window.reiniciarJogo = function () {
  document.getElementById("tela-ranking").classList.add("hidden");
  document.getElementById("tela-escolha").classList.remove("hidden");
};
