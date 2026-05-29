import fs from "fs";

const STYLE = "Ilustração infantil em anime 2D, traço limpo, olhos grandes e expressivos, proporções infantis heroicas, cores vibrantes, iluminação suave, acabamento digital premium, contorno fino, aparência amigável e educativa, estilo idêntico aos personagens oficiais Aion, Kael e Lyra";

const data = [
  {
    q: "Qual frase está escrita corretamente?",
    opts: ["vamos brincar.", "Vamos brincar.", "Vamos brincar", "vamos brincar"],
    ans: 1,
    char: "Aion", scene: "Aion segurando um livro aberto em uma sala de aula mágica", action: "Aion apontando para uma frase correta escrita em um quadro"
  },
  {
    q: "Qual frase é interrogativa?",
    opts: ["Que dia lindo!", "Eu gosto de estudar.", "Você gosta de brincar?", "O menino correu."],
    ans: 2,
    char: "Lyra", scene: "Lyra fazendo uma pergunta para crianças em uma biblioteca mágica", action: "Lyra apontando para um ponto de interrogação brilhante"
  },
  {
    q: "Qual frase é exclamativa?",
    opts: ["O cachorro dormiu.", "Como está quente hoje!", "Onde você mora?", "Ela foi à escola."],
    ans: 1,
    char: "Kael", scene: "Kael no deserto sentindo muito calor", action: "Kael exclamando com expressão surpresa"
  },
  {
    q: "Qual sinal usamos em perguntas?",
    opts: ["!", ".", ",", "?"],
    ans: 3,
    char: "Lyra", scene: "Lyra segurando símbolos de pontuação flutuantes", action: "Lyra destacando um grande ponto de interrogação brilhante"
  },
  {
    q: "Qual palavra completa corretamente: 'ca__ão'?",
    opts: ["nh", "lh", "ch", "rr"],
    ans: 0,
    char: "Aion", scene: "Aion organizando letras mágicas flutuantes", action: "Aion encaixando NH na palavra canhão"
  },
  {
    q: "A separação correta da palavra 'montanha' é:",
    opts: ["mon-ta-nha", "mon-tan-ha", "mon-ta-nh-a", "mo-nta-nha"],
    ans: 0,
    char: "Lyra", scene: "Lyra desenhando sílabas luminosas no ar", action: "Separação silábica da palavra montanha aparecendo magicamente"
  },
  {
    q: "Qual palavra possui 'NHO'?",
    opts: ["caminho", "ninho", "banho", "nenhum"],
    ans: 2,
    char: "Kael", scene: "Kael em uma missão linguística", action: "Kael destacando a palavra banho em um pergaminho"
  },
  {
    q: "Qual frase está pontuada corretamente?",
    opts: ["Pedro venha aqui.", "Pedro, venha aqui.", "Pedro venha, aqui.", "Pedro venha aqui!"],
    ans: 1,
    char: "Aion", scene: "Sala de aula ARKANOS", action: "Aion colocando uma vírgula brilhante corretamente em uma frase"
  },
  {
    q: "A frase 'Ai! Machuquei meu pé!' expressa:",
    opts: ["alegria", "dor", "dúvida", "silêncio"],
    ans: 1,
    char: "Kael", scene: "Kael tropeçando em uma pedra durante uma aventura", action: "Kael segurando o pé com expressão de dor"
  },
  {
    q: "'Oba!' é uma:",
    opts: ["pergunta", "interjeição", "resposta", "vírgula"],
    ans: 1,
    char: "Lyra", scene: "Lyra comemorando em um festival escolar", action: "Balão mágico escrito OBA! brilhando"
  },
  {
    q: "Qual palavra é um substantivo?",
    opts: ["bonito", "correr", "cadeira", "feliz"],
    ans: 2,
    char: "Aion", scene: "Aion em uma sala cheia de objetos mágicos", action: "Aion apontando para uma cadeira encantada"
  },
  {
    q: "A palavra 'democracia' começa com:",
    opts: ["de", "di", "do", "da"],
    ans: 0,
    char: "Lyra", scene: "Lyra ensinando palavras antigas em um templo do conhecimento", action: "Sílabas brilhantes DE aparecendo no ar"
  },
  {
    q: "Qual alternativa apresenta uma frase afirmativa?",
    opts: ["Como você cresceu!", "Onde está o livro?", "Hoje está calor.", "Pare agora!"],
    ans: 2,
    char: "Kael", scene: "Kael caminhando sob um sol forte", action: "Kael falando que está calor"
  },
  {
    q: "A palavra 'nenhum' possui:",
    opts: ["nha", "nho", "nhe", "nhu"],
    ans: 3,
    char: "Aion", scene: "Aion organizando sílabas mágicas em um laboratório educacional", action: "Aion destacando a sílaba NHU"
  },
  {
    q: "Qual frase termina com ponto final?",
    opts: ["Vamos estudar.", "Que lindo!", "Onde está Ana?", "Socorro!"],
    ans: 0,
    char: "Lyra", scene: "Lyra escrevendo em um caderno mágico", action: "Um ponto final brilhante aparecendo no final da frase"
  },
  {
    q: "Em 'São Paulo, 23 de novembro de 2010.', a vírgula separa:",
    opts: ["pessoas", "perguntas", "cidade e data", "sentimentos"],
    ans: 2,
    char: "Aion", scene: "Mapa mágico mostrando São Paulo", action: "Aion apontando para uma vírgula entre cidade e data"
  },
  {
    q: "A palavra 'amanhecer' possui:",
    opts: ["nha", "nhe", "nho", "nhu"],
    ans: 1,
    char: "Lyra", scene: "Nascer do sol mágico no reino ARKANOS", action: "Lyra escrevendo a sílaba NHE no céu"
  },
  {
    q: "Qual frase está correta?",
    opts: ["eu gosto de brincar.", "Eu gosto de brincar.", "Eu gosto de brincar", "eu gosto de brincar"],
    ans: 1,
    char: "Kael", scene: "Kael estudando gramática em uma mesa medieval", action: "Kael destacando a letra maiúscula no início da frase"
  },
  {
    q: "A palavra 'silêncio!' expressa:",
    opts: ["ordem", "alegria", "dúvida", "medo"],
    ans: 0,
    char: "Aion", scene: "Biblioteca mágica silenciosa", action: "Aion fazendo sinal de silêncio"
  },
  {
    q: "Qual palavra está escrita corretamente?",
    opts: ["canhao", "cannhão", "canhão", "canhnhão"],
    ans: 2,
    char: "Kael", scene: "Kael treinando escrita mágica", action: "Palavra canhão aparecendo corretamente em letras douradas"
  },
  {
    q: "Qual alternativa possui uma pergunta?",
    opts: ["Estou feliz hoje.", "Vá para casa.", "Onde você mora?", "Nossa, que legal!"],
    ans: 2,
    char: "Lyra", scene: "Lyra conversando com crianças", action: "Grande ponto de interrogação mágico"
  },
  {
    q: "A palavra 'companhia' possui:",
    opts: ["nha", "nho", "nhi", "nhe"],
    ans: 2,
    char: "Aion", scene: "Aion organizando sílabas luminosas", action: "Destacando NHI"
  },
  {
    q: "Qual frase está no singular?",
    opts: ["Os meninos brincam.", "As flores são lindas.", "O pássaro voou.", "As crianças cantaram."],
    ans: 2,
    char: "Kael", scene: "Kael observando um cachorro sozinho", action: "Indicando singular"
  },
  {
    q: "Qual frase apresenta alegria?",
    opts: ["Ai, minha perna!", "Que dia maravilhoso!", "Onde está o gato?", "Não fale assim."],
    ans: 1,
    char: "Lyra", scene: "Festival alegre no reino ARKANOS", action: "Lyra comemorando"
  },
  {
    q: "Qual é a separação correta da palavra 'caminho'?",
    opts: ["ca-mi-nho", "cam-i-nho", "ca-min-ho", "ca-minh-o"],
    ans: 0,
    char: "Aion", scene: "Aion separando sílabas mágicas", action: "ca-mi-nho brilhando"
  },
  {
    q: "Qual frase está pontuada correta no uso da vírgula para vocativo?",
    opts: ["Ana venha logo.", "Ana venha, logo.", "Ana, venha logo.", "Ana venha logo,"],
    ans: 2,
    char: "Kael", scene: "Kael chamando um amigo", action: "Vírgula brilhando na frase"
  },
  {
    q: "'Nossa!' expressa:",
    opts: ["surpresa", "dor", "silêncio", "ordem"],
    ans: 0,
    char: "Lyra", scene: "Lyra surpresa diante de magia", action: "Expressão surpresa"
  },
  {
    q: "Qual palavra possui 'NHÃO'?",
    opts: ["banho", "caminhão", "sonho", "ninho"],
    ans: 1,
    char: "Aion", scene: "Pergaminho mágico com sílabas", action: "NHÃO brilhando"
  },
  {
    q: "Qual alternativa apresenta uma frase exclamativa?",
    opts: ["Que bolo gostoso!", "Você vai à festa?", "Eu gosto de ler.", "Feche a porta."],
    ans: 0,
    char: "Kael", scene: "Kael admirado diante de um castelo", action: "Exclamação brilhante"
  },
  {
    q: "Qual palavra está escrita corretamente?",
    opts: ["mensajem", "mesagem", "mensagem", "mensagen"],
    ans: 2,
    char: "Lyra", scene: "Lyra revisando palavras mágicas", action: "Mensagem correta iluminada"
  },
  {
    q: "Em 'João, venha almoçar!', a vírgula foi usada para:",
    opts: ["separar datas", "chamar alguém (vocativo)", "fazer uma pergunta", "indicar uma pausa longa"],
    ans: 1,
    char: "Aion", scene: "Refeitório escolar mágico", action: "Aion chamando João"
  },
  {
    q: "A palavra 'também' termina com a letra:",
    opts: ["n", "nh", "m", "l"],
    ans: 2,
    char: "Kael", scene: "Kael montando palavras", action: "Letra M brilhando no final"
  },
  {
    q: "Qual frase está escrita corretamente no início?",
    opts: ["Hoje vamos estudar.", "hoje vamos estudar.", "hOje vamos estudar.", "Hoje vamos estudar"],
    ans: 0,
    char: "Lyra", scene: "Lyra segurando um livro de perguntas", action: "Frase correta iluminada"
  },
  {
    q: "Qual palavra completa corretamente: 'i__fiel'?",
    opts: ["n", "m", "nh", "lh"],
    ans: 0,
    char: "Aion", scene: "Laboratório de letras mágicas", action: "Inserindo letra N"
  },
  {
    q: "A frase 'Que paisagem bonita!' demonstra:",
    opts: ["pergunta", "admiração", "ordem", "dor"],
    ans: 1,
    char: "Lyra", scene: "Paisagem mágica do reino ARKANOS", action: "Lyra admirada"
  },
  {
    q: "Qual alternativa apresenta uma interjeição?",
    opts: ["Você comeu?", "Eu gosto.", "Uau! Que lindo!", "Amanhã choverá."],
    ans: 2,
    char: "Kael", scene: "Kael surpreso durante aventura", action: "Uau brilhando"
  },
  {
    q: "Qual palavra está escrita corretamente?",
    opts: ["esperança", "esperansa", "isperança", "hesperança"],
    ans: 0,
    char: "Aion", scene: "Pergaminho antigo com palavras corretas", action: "Esperança iluminada"
  },
  {
    q: "Em qual alternativa a frase interrogativa está correta?",
    opts: ["Que horas são.", "Que horas são?", "Que horas são!", "Que horas são,"],
    ans: 1,
    char: "Lyra", scene: "Relógio mágico gigante", action: "Lyra fazendo uma pergunta"
  },
  {
    q: "A palavra 'tripulante' é escrita com a letra M ou N antes do T?",
    opts: ["M", "nh", "N", "l"],
    ans: 2,
    char: "Kael", scene: "Navio voador do reino ARKANOS", action: "Kael destacando a letra N"
  },
  {
    q: "Qual frase apresenta ponto de exclamação corretamente?",
    opts: ["Onde você vai!", "Eu gosto de maçã!", "Socorro!", "A menina sorriu!"],
    ans: 2,
    char: "Lyra", scene: "Lyra pedindo socorro em tom divertido", action: "Exclamação gigante brilhando"
  },
  {
    q: "Qual palavra possui NH?",
    opts: ["bano", "banho", "balão", "banco"],
    ans: 1,
    char: "Aion", scene: "Aion em um banheiro mágico", action: "Palavra banho iluminada"
  },
  {
    q: "Qual frase possui vírgula indicando chamamento?",
    opts: ["Maria foi ao parque.", "Maria, venha cá.", "Eu vi a Maria.", "A Maria é legal."],
    ans: 1,
    char: "Kael", scene: "Kael chamando um amigo", action: "Vírgula brilhando"
  },
  {
    q: "Qual frase expressa surpresa?",
    opts: ["Nossa!", "Silêncio.", "Vamos.", "Sim."],
    ans: 0,
    char: "Lyra", scene: "Magia inesperada acontecendo", action: "Expressão surpresa"
  },
  {
    q: "O que usamos no final das perguntas diretas?",
    opts: ["ponto final", "ponto de exclamação", "ponto de interrogação", "vírgula"],
    ans: 2,
    char: "Aion", scene: "Quadro mágico de gramática", action: "Grande ponto de interrogação"
  },
  {
    q: "Qual frase é afirmativa?",
    opts: ["Você não estudou?", "Hoje eu estudei.", "Que susto!", "Vá estudar agora."],
    ans: 1,
    char: "Kael", scene: "Kael estudando feliz", action: "Mostrando caderno completo"
  },
  {
    q: "Qual palavra termina com M?",
    opts: ["homem", "menino", "sol", "cantar"],
    ans: 0,
    char: "Lyra", scene: "Letras mágicas no céu", action: "Final da palavra brilhando"
  },
  {
    q: "Qual palavra possui NHE?",
    opts: ["ninho", "banho", "nenhum", "amanhecer"],
    ans: 3,
    char: "Aion", scene: "Nascer do sol no reino ARKANOS", action: "NHE brilhando"
  },
  {
    q: "Qual frase demonstra alegria?",
    opts: ["Estou com medo.", "Oba! Vamos brincar!", "Não quero ir.", "Que horas são?"],
    ans: 1,
    char: "Kael", scene: "Parque mágico do reino ARKANOS", action: "Comemorando juntos"
  },
  {
    q: "Qual frase possui ponto final corretamente?",
    opts: ["Eu gosto de ler?", "Eu gosto de ler!", "Eu gosto de ler.", "Eu gosto de ler,"],
    ans: 2,
    char: "Aion", scene: "Biblioteca mágica", action: "Livro aberto com ponto final brilhante"
  },
  {
    q: "Qual palavra possui NHI?",
    opts: ["companheiro", "caminho", "companhia", "ninho"],
    ans: 2,
    char: "Lyra", scene: "Lyra caminhando com amigos", action: "Palavra companhia brilhando no céu"
  }
];

const results = data.map((item, index) => {
  const qNum = String(index + 1).padStart(3, "0");
  const id = `3A-T2-AV1-PT-${qNum}`;
  
  // Prompt constructor
  const prompt = `${STYLE} Cena: ${item.scene}. ${item.action}. Personagem: ${item.char}.`;

  return {
    id,
    ano: "3º ano",
    disciplina: "Português",
    avaliacao: "AV1 - 2º Trimestre",
    tema: "Ortografia e Gramática Básica",
    tipo: "multiple_choice",
    dificuldade: "easy",
    pergunta: item.q,
    alternativas: item.opts,
    resposta_correta: item.ans,
    explicacao: `Resposta correta: ${item.opts[item.ans]}.`,
    cronica_do_guardiao: `Muito bem! Aprender português é como desvendar a magia das palavras!`,
    imagem: {
      arquivo: `3a-t2-av1-pt-${qNum}.webp`,
      prompt,
      alt: `Ilustração para a questão ${index + 1}`
    }
  };
});

fs.writeFileSync("data/3ano_t2_av1_portugues.json", JSON.stringify(results, null, 2), "utf-8");
console.log("Arquivo JSON com as 50 questões de português criado com sucesso!");
