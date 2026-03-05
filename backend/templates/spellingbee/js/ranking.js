// src/interface/js/ranking.js

export function salvarRanking(jogador, pontos) {
  const chave = `ranking_${jogador.serie}`;
  let ranking = JSON.parse(localStorage.getItem(chave)) || [];
  const existente = ranking.find(j => j.login === jogador.login);

  if (existente) {
    if (pontos > existente.pontos) existente.pontos = pontos;
  } else {
    ranking.push({ login: jogador.login, nome: jogador.nome, pontos, serie: jogador.serie });
  }

  localStorage.setItem(chave, JSON.stringify(ranking));
}

export function mostrarRanking(mensagem = "🏁 Game Over!") {
  const series = ["2ano", "4ano"];
  let rankingFinal = "";

  series.forEach(serie => {
    let ranking = JSON.parse(localStorage.getItem(`ranking_${serie}`)) || [];
    ranking.sort((a, b) => b.pontos - a.pontos);
    rankingFinal += `🎮 Top 10 - ${serie.toUpperCase()}\n\n`;
    ranking.slice(0, 10).forEach((j, i) => {
      rankingFinal += `${i + 1}. ${j.nome} - ${j.pontos} pts\n`;
    });
    rankingFinal += `\n`;
  });

  document.getElementById("ranking-conteudo").innerText = `${mensagem}\n\n${rankingFinal}`;
  document.getElementById("tela-jogo").classList.add("hidden");
  document.getElementById("tela-inicial").classList.add("hidden");
  document.getElementById("tela-ranking").classList.remove("hidden");
  document.getElementById("resultado").innerText = "";
  document.getElementById("historico").innerHTML = "";
}

export function reiniciarJogo() {
  document.getElementById("tela-ranking").classList.add("hidden");
  document.getElementById("tela-inicial").classList.remove("hidden");
  document.getElementById("nome").value = "";
  document.getElementById("login").value = "";
  document.getElementById("serie").value = "";
  document.getElementById("historico").innerHTML = "";
}
