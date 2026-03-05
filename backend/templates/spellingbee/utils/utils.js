// interface/spellingbee/js/utils.js

// Função para gerar username com base no nome e sobrenome
function gerarUsername(nomeCompleto) {
  const nomes = nomeCompleto.trim().split(" ");
  if (nomes.length < 2) return null;
  return `${nomes[0].toLowerCase()}_${nomes[nomes.length - 1].toLowerCase()}`;
}

// Função para salvar no localStorage
function salvarDadosJogador(jogador) {
  localStorage.setItem("jogador", JSON.stringify(jogador));
}

// Função para carregar os dados do jogador
function carregarDadosJogador() {
  return JSON.parse(localStorage.getItem("jogador"));
}

// Função para obter palavras da série
async function carregarPalavras(serie) {
  const arquivo = `../palavras/palavras_${serie}.js`;
  try {
    const modulo = await import(arquivo);
    return modulo.palavras;
  } catch (e) {
    console.error("Erro ao carregar palavras:", e);
    return [];
  }
}

// Função para embaralhar um array (shuffle)
function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função para salvar no ranking da série
function salvarRanking(jogador) {
  const chave = `ranking_${jogador.serie}`;
  let ranking = JSON.parse(localStorage.getItem(chave)) || [];

  const index = ranking.findIndex(p => p.username === jogador.username);
  if (index !== -1) {
    if (jogador.pontos > ranking[index].pontos) ranking[index].pontos = jogador.pontos;
  } else {
    ranking.push({ username: jogador.username, nome: jogador.nome, pontos: jogador.pontos });
  }

  ranking.sort((a, b) => b.pontos - a.pontos);
  localStorage.setItem(chave, JSON.stringify(ranking));
}
