import { writeFile } from "node:fs/promises";
import postgres from "postgres";

const sourcePath = "C:\\Users\\renato\\.claude\\projects\\d--repositorio-geral-repositorio-arkanos\\memory\\questoes-geo-av1-completo-80.json";
const targetPath = "web-v2/data/quiz/geo-av1-completo-80.json";
const url = process.env.DATABASE_URL;

const rawQuestions = [
  // 1 to 40
  {
    "id": 1,
    "pergunta": "Em qual continente ficam o Peru e o Equador?",
    "alternativas": {
      "A": "Europa",
      "B": "América do Sul",
      "C": "África",
      "D": "Ásia"
    },
    "correta": "B",
    "cronica_guardiao": "A América do Sul abriga a Floresta Amazônica, os Andes e diversas civilizações antigas."
  },
  {
    "id": 2,
    "pergunta": "Qual país fica ao norte do Peru?",
    "alternativas": {
      "A": "Chile",
      "B": "Brasil",
      "C": "Equador",
      "D": "Bolívia"
    },
    "correta": "C",
    "cronica_guardiao": "O Equador recebeu esse nome porque a Linha do Equador passa pelo país."
  },
  {
    "id": 3,
    "pergunta": "Qual cidade é a capital do Equador?",
    "alternativas": {
      "A": "Guayaquil",
      "B": "Cusco",
      "C": "Quito",
      "D": "Lima"
    },
    "correta": "C",
    "cronica_guardiao": "Quito está entre as capitais mais altas do planeta."
  },
  {
    "id": 4,
    "pergunta": "Qual montanha é a mais alta do Equador?",
    "alternativas": {
      "A": "Cotopaxi",
      "B": "Chimborazo",
      "C": "Andes",
      "D": "Pico da Neblina"
    },
    "correta": "B",
    "cronica_guardiao": "O topo do Chimborazo é o point da superfície terrestre mais distante do centro da Terra."
  },
  {
    "id": 5,
    "pergunta": "Qual arquipélago pertence ao Equador?",
    "alternativas": {
      "A": "Malvinas",
      "B": "Galápagos",
      "C": "Canárias",
      "D": "Açores"
    },
    "correta": "B",
    "cronica_guardiao": "Galápagos ficou famosa pelos estudos de Charles Darwin."
  },
  {
    "id": 6,
    "pergunta": "Qual grande cadeia de montanhas atravessa a América do Sul?",
    "alternativas": {
      "A": "Alpes",
      "B": "Atlas",
      "C": "Andes",
      "D": "Rochosas"
    },
    "correta": "C",
    "cronica_guardiao": "Os Andes se estendem por cerca de 7 mil quilômetros."
  },
  {
    "id": 7,
    "pergunta": "O que significa a palavra 'remanescente'?",
    "alternativas": {
      "A": "Algo perdido",
      "B": "Algo que sobra ou permanece",
      "C": "Algo escondido",
      "D": "Algo recém-criado"
    },
    "correta": "B",
    "cronica_guardiao": "Remanescente é aquilo que permanece depois de grandes mudanças."
  },
  {
    "id": 8,
    "pergunta": "Como os incas chamavam seu império?",
    "alternativas": {
      "A": "Tahuantinsuyo",
      "B": "Machu Picchu",
      "C": "Cuscolândia",
      "D": "Império Solar"
    },
    "correta": "A",
    "cronica_guardiao": "Tahuantinsuyo significa 'Terra dos Quatro Quartos'."
  },
  {
    "id": 9,
    "pergunta": "Quem eram os incas?",
    "alternativas": {
      "A": "Um povo da Europa",
      "B": "Um povo indígena da América do Sul",
      "C": "Um povo da África",
      "D": "Um povo da Ásia"
    },
    "correta": "B",
    "cronica_guardiao": "Os incas construíram um dos maiores impérios da América."
  },
  {
    "id": 10,
    "pergunta": "Qual animal é muito associado aos Andes?",
    "alternativas": {
      "A": "Camelo",
      "B": "Lhama",
      "C": "Búfalo",
      "D": "Alce"
    },
    "correta": "B",
    "cronica_guardiao": "As lhamas eram usadas para transporte pelos povos andinos."
  },
  {
    "id": 11,
    "pergunta": "Qual cidade antiga ficou conhecida como a Cidade Perdida dos Incas?",
    "alternativas": {
      "A": "Cusco",
      "B": "Lima",
      "C": "Machu Picchu",
      "D": "Quito"
    },
    "correta": "C",
    "cronica_guardiao": "Machu Picchu permaneceu escondida dos conquistadores espanhóis."
  },
  {
    "id": 12,
    "pergunta": "Em qual país está localizada Machu Picchu?",
    "alternativas": {
      "A": "Chile",
      "B": "Peru",
      "C": "Equador",
      "D": "Bolívia"
    },
    "correta": "B",
    "cronica_guardiao": "Machu Picchu está entre os sítios arqueológicos mais famosos do mundo."
  },
  {
    "id": 13,
    "pergunta": "Quem redescobriu Machu Picchu em 1911?",
    "alternativas": {
      "A": "Atahualpa",
      "B": "Francisco Pizarro",
      "C": "Hiram Bingham",
      "D": "Simón Bolívar"
    },
    "correta": "C",
    "cronica_guardiao": "Hiram Bingham apresentou Machu Picchu ao mundo moderno."
  },
  {
    "id": 14,
    "pergunta": "Qual organização declarou Machu Picchu Patrimônio Mundial?",
    "alternativas": {
      "A": "ONU",
      "B": "OMS",
      "C": "UNESCO",
      "D": "OTAN"
    },
    "correta": "C",
    "cronica_guardiao": "A UNESCO protege locais considerados valiosos para toda a humanidade."
  },
  {
    "id": 15,
    "pergunta": "Qual era uma das funções possíveis de Machu Picchu?",
    "alternativas": {
      "A": "Base naval",
      "B": "Refúgio para reis incas",
      "C": "Porto marítimo",
      "D": "Fábrica"
    },
    "correta": "B",
    "cronica_guardiao": "Pesquisadores acreditam que o local possuía funções religiosas e administrativas."
  },
  {
    "id": 16,
    "pergunta": "Qual destes é um alimento tradicional dos Andes?",
    "alternativas": {
      "A": "Batata",
      "B": "Trigo",
      "C": "Cevada",
      "D": "Aveia"
    },
    "correta": "A",
    "cronica_guardiao": "Existem milhares de variedades de batata cultivadas nos Andes."
  },
  {
    "id": 17,
    "pergunta": "Qual é a capital do Peru?",
    "alternativas": {
      "A": "Cusco",
      "B": "Lima",
      "C": "Arequipa",
      "D": "Puno"
    },
    "correta": "B",
    "cronica_guardiao": "Lima é a maior cidade do Peru."
  },
  {
    "id": 18,
    "pergunta": "Qual oceano banha a costa do Peru?",
    "alternativas": {
      "A": "Atlântico",
      "B": "Índico",
      "C": "Pacífico",
      "D": "Ártico"
    },
    "correta": "C",
    "cronica_guardiao": "O Pacífico é o maior oceano do planeta."
  },
  {
    "id": 19,
    "pergunta": "Qual animal aparece frequentemente em imagens de Machu Picchu?",
    "alternativas": {
      "A": "Lhama",
      "B": "Bisão",
      "C": "Urso",
      "D": "Raposa"
    },
    "correta": "A",
    "cronica_guardiao": "As lhamas circulam livremente em muitas áreas de Machu Picchu."
  },
  {
    "id": 20,
    "pergunta": "Os Andes são uma:",
    "alternativas": {
      "A": "Planície",
      "B": "Cordilheira",
      "C": "Floresta",
      "D": "Ilha"
    },
    "correta": "B",
    "cronica_guardiao": "Uma cordilheira é um conjunto de montanhas ligadas."
  },
  {
    "id": 21,
    "pergunta": "Quem é o personagem principal das histórias contadas neste capítulo?",
    "alternativas": {
      "A": "Davy Crockett",
      "B": "Paul Bunyan",
      "C": "Hiram Bingham",
      "D": "Atahualpa"
    },
    "correta": "B",
    "cronica_guardiao": "Paul Bunyan é um dos personagens mais famosos do folclore norte-americano."
  },
  {
    "id": 22,
    "pergunta": "Qual era a profissão de Paul Bunyan?",
    "alternativas": {
      "A": "Pescador",
      "B": "Lenhador",
      "C": "Mineiro",
      "D": "Fazendeiro"
    },
    "correta": "B",
    "cronica_guardiao": "As lendas dizem que Paul Bunyan era tão grande que derrubava florestas inteiras."
  },
  {
    "id": 23,
    "pergunta": "Qual era o nome do famoso boi de Paul Bunyan?",
    "alternativas": {
      "A": "Max",
      "B": "Thunder",
      "C": "Babe",
      "D": "Bluey"
    },
    "correta": "C",
    "cronica_guardiao": "Babe é um dos animais mais conhecidos do folclore dos Estados Unidos."
  },
  {
    "id": 24,
    "pergunta": "Qual era a cor do boi Babe?",
    "alternativas": {
      "A": "Preto",
      "B": "Marrom",
      "C": "Branco",
      "D": "Azul"
    },
    "correta": "D",
    "cronica_guardiao": "Babe ficou conhecido como o lendário Boi Azul."
  },
  {
    "id": 25,
    "pergunta": "Segundo a lenda, como Babe ficou azul?",
    "alternativas": {
      "A": "Foi pintado",
      "B": "Nasceu azul",
      "C": "Ficou preso em uma tempestade de neve",
      "D": "Tomou uma poção mágica"
    },
    "correta": "C",
    "cronica_guardiao": "As histórias exageradas são uma marca das lendas de Paul Bunyan."
  },
  {
    "id": 26,
    "pergunta": "As histórias de Paul Bunyan são exemplos de:",
    "alternativas": {
      "A": "Relatórios científicos",
      "B": "Lendas folclóricas",
      "C": "Biografias",
      "D": "Notícias"
    },
    "correta": "B",
    "cronica_guardiao": "Lendas misturam fatos e imaginação para criar histórias marcantes."
  },
  {
    "id": 27,
    "pergunta": "O que torna Paul Bunyan diferente das pessoas comuns?",
    "alternativas": {
      "A": "Sua inteligência",
      "B": "Sua velocidade",
      "C": "Seu tamanho gigantesco",
      "D": "Sua riqueza"
    },
    "correta": "C",
    "cronica_guardiao": "Nas lendas, Paul Bunyan possuía força e tamanho extraordinários."
  },
  {
    "id": 28,
    "pergunta": "O que geralmente acontece nas histórias de Paul Bunyan?",
    "alternativas": {
      "A": "Eventos comuns",
      "B": "Situações exageradas e impossíveis",
      "C": "Experimentos científicos",
      "D": "Batalhas históricas"
    },
    "correta": "B",
    "cronica_guardiao": "O exagero é uma característica típica do gênero conhecido como 'tall tale'."
  },
  {
    "id": 29,
    "pergunta": "Em que país surgiram as histórias de Paul Bunyan?",
    "alternativas": {
      "A": "Canadá",
      "B": "México",
      "C": "Estados Unidos",
      "D": "Peru"
    },
    "correta": "C",
    "cronica_guardiao": "Paul Bunyan tornou-se um símbolo das regiões florestais dos Estados Unidos."
  },
  {
    "id": 30,
    "pergunta": "Qual característica melhor descreve Babe?",
    "alternativas": {
      "A": "Pequeno e rápido",
      "B": "Azul e gigantesco",
      "C": "Velho e cansado",
      "D": "Branco e tímido"
    },
    "correta": "B",
    "cronica_guardiao": "Nas lendas, Babe era tão grande quanto seu dono."
  },
  {
    "id": 31,
    "pergunta": "Qual era a principal companhia de Paul Bunyan?",
    "alternativas": {
      "A": "Seu cachorro",
      "B": "Seu cavalo",
      "C": "O boi Babe",
      "D": "Seu irmão"
    },
    "correta": "C",
    "cronica_guardiao": "Babe participava das aventuras mais incríveis de Paul Bunyan."
  },
  {
    "id": 32,
    "pergunta": "O que é uma lenda?",
    "alternativas": {
      "A": "Uma conta matemática",
      "B": "Uma história transmitida ao longo do tempo",
      "C": "Uma reportagem",
      "D": "Um mapa"
    },
    "correta": "B",
    "cronica_guardiao": "As lendas ajudam a preservar a cultura e as tradições dos povos."
  },
  {
    "id": 33,
    "pergunta": "Qual destas características aparece frequentemente nas lendas?",
    "alternativas": {
      "A": "Exagero",
      "B": "Precisão científica",
      "C": "Fórmulas matemáticas",
      "D": "Dados estatísticos"
    },
    "correta": "A",
    "cronica_guardiao": "O exagero torna as histórias mais divertidas e memoráveis."
  },
  {
    "id": 34,
    "pergunta": "Por que Babe chamou a atenção das pessoas?",
    "alternativas": {
      "A": "Porque falava",
      "B": "Porque era azul",
      "C": "Porque voava",
      "D": "Porque vivia no mar"
    },
    "correta": "B",
    "cronica_guardiao": "A cor azul de Babe tornou-o uma figura inesquecível das lendas."
  },
  {
    "id": 35,
    "pergunta": "Qual destas palavras descreve melhor Paul Bunyan?",
    "alternativas": {
      "A": "Gigante",
      "B": "Pequeno",
      "C": "Frágil",
      "D": "Medroso"
    },
    "correta": "A",
    "cronica_guardiao": "Os feitos de Paul Bunyan eram proporcionais ao seu tamanho lendário."
  },
  {
    "id": 36,
    "pergunta": "O objetivo principal das histórias de Paul Bunyan é:",
    "alternativas": {
      "A": "Ensinar matemática",
      "B": "Explicar fenômenos científicos",
      "C": "Entreter e transmitir tradições",
      "D": "Registrar fatos históricos"
    },
    "correta": "C",
    "cronica_guardiao": "O folclore preserva valores e histórias importantes para cada povo."
  },
  {
    "id": 37,
    "pergunta": "O que diferencia uma lenda de uma notícia?",
    "alternativas": {
      "A": "A lenda usa imaginação",
      "B": "A notícia usa imaginação",
      "C": "A lenda sempre é verdadeira",
      "D": "Não existe diferença"
    },
    "correta": "A",
    "cronica_guardiao": "Lendas podem conter elementos imaginários e fantásticos."
  },
  {
    "id": 38,
    "pergunta": "Qual animal acompanha Paul Bunyan em suas aventuras?",
    "alternativas": {
      "A": "Urso",
      "B": "Lobo",
      "C": "Boi",
      "D": "Águia"
    },
    "correta": "C",
    "cronica_guardiao": "Babe é um dos animais mais famosos da literatura folclórica americana."
  },
  {
    "id": 39,
    "pergunta": "O Sr. Bunyan é lembrado principalmente por:",
    "alternativas": {
      "A": "Suas invenções",
      "B": "Suas aventuras gigantescas",
      "C": "Suas viagens marítimas",
      "D": "Suas descobertas científicas"
    },
    "correta": "B",
    "cronica_guardiao": "As aventuras exageradas fazem parte da tradição dos contos do Oeste."
  },
  {
    "id": 40,
    "pergunta": "Qual lição podemos aprender com as lendas?",
    "alternativas": {
      "A": "Apenas fatos históricos importam",
      "B": "A imaginação também ajuda a transmitir cultura",
      "C": "As histórias não têm valor",
      "D": "Somente a ciência ensina"
    },
    "correta": "B",
    "cronica_guardiao": "Os povos preservam sua memória por meio das histórias que contam."
  },
  // 41 to 80
  {
    "id": 41,
    "pergunta": "Qual é a capital do Equador mostrada no mapa?",
    "alternativas": {
      "A": "Lima",
      "B": "Quito",
      "C": "Cusco",
      "D": "Guayaquil"
    },
    "correta": "B",
    "cronica_guardiao": "Quito está localizada próxima à Linha do Equador e é uma das capitais mais altas do mundo."
  },
  {
    "id": 42,
    "pergunta": "Qual é a montanha mais alta do Equador?",
    "alternativas": {
      "A": "Aconcágua",
      "B": "Cotopaxi",
      "C": "Chimborazo",
      "D": "Illimani"
    },
    "correta": "C",
    "cronica_guardiao": "O Chimborazo é tão alto que seu topo é o ponto da Terra mais distante do centro do planeta."
  },
  {
    "id": 43,
    "pergunta": "Como os incas chamavam seu império?",
    "alternativas": {
      "A": "Machu Picchu",
      "B": "Tahuantinsuyo",
      "C": "Cusco",
      "D": "Andesia"
    },
    "correta": "B",
    "cronica_guardiao": "Tahuantinsuyo significa 'Terra dos Quatro Quartos', pois o império era dividido em quatro regiões."
  },
  {
    "id": 44,
    "pergunta": "Qual animal aparece na fotografia ao lado do texto sobre Machu Picchu?",
    "alternativas": {
      "A": "Alpaca",
      "B": "Vicunha",
      "C": "Lhama",
      "D": "Guanaco"
    },
    "correta": "C",
    "cronica_guardiao": "As lhamas eram muito importantes para os povos andinos como meio de transporte."
  },
  {
    "id": 45,
    "pergunta": "Em qual país fica Machu Picchu?",
    "alternativas": {
      "A": "Bolívia",
      "B": "Chile",
      "C": "Equador",
      "D": "Peru"
    },
    "correta": "D",
    "cronica_guardiao": "Machu Picchu foi construída pelos incas nas montanhas do Peru."
  },
  {
    "id": 46,
    "pergunta": "Quem redescobriu Machu Picchu in 1911?",
    "alternativas": {
      "A": "Francisco Pizarro",
      "B": "Simón Bolívar",
      "C": "Hiram Bingham",
      "D": "Atahualpa"
    },
    "correta": "C",
    "cronica_guardiao": "Hiram Bingham era um explorador americano que levou Machu Picchu ao conhecimento mundial."
  },
  {
    "id": 47,
    "pergunta": "Qual cordilheira atravessa o Peru?",
    "alternativas": {
      "A": "Montanhas Rochosas",
      "B": "Alpes",
      "C": "Andes",
      "D": "Atlas"
    },
    "correta": "C",
    "cronica_guardiao": "A Cordilheira dos Andes é a maior cadeia de montanhas da América do Sul."
  },
  {
    "id": 48,
    "pergunta": "Qual oceano fica a oeste do Peru?",
    "alternativas": {
      "A": "Atlântico",
      "B": "Índico",
      "C": "Glacial Ártico",
      "D": "Pacífico"
    },
    "correta": "D",
    "cronica_guardiao": "O Oceano Pacífico banha toda a costa oeste da América do Sul."
  },
  {
    "id": 49,
    "pergunta": "Qual destes países NÃO faz fronteira com o Peru?",
    "alternativas": {
      "A": "Brasil",
      "B": "Chile",
      "C": "Bolívia",
      "D": "Argentina"
    },
    "correta": "D",
    "cronica_guardiao": "A Argentina não faz fronteira com o Peru."
  },
  {
    "id": 50,
    "pergunta": "Qual era o antigo império localizado onde hoje fica o Peru?",
    "alternativas": {
      "A": "Asteca",
      "B": "Maia",
      "C": "Inca",
      "D": "Olmeca"
    },
    "correta": "C",
    "cronica_guardiao": "O Império Inca foi o maior império da América pré-colombiana."
  },
  {
    "id": 51,
    "pergunta": "Qual destes alimentos é citado como parte da culinária peruana?",
    "alternativas": {
      "A": "Trigo",
      "B": "Milho",
      "C": "Centeio",
      "D": "Aveia"
    },
    "correta": "B",
    "cronica_guardiao": "O milho é cultivado nos Andes há milhares de anos."
  },
  {
    "id": 52,
    "pergunta": "Segundo o texto, qual animal de estimação popular nos EUA também é consumido no Peru?",
    "alternativas": {
      "A": "Coelho",
      "B": "Hamster",
      "C": "Porquinho-da-índia",
      "D": "Periquito"
    },
    "correta": "C",
    "cronica_guardiao": "O porquinho-da-índia é um alimento tradicional em algumas regiões andinas."
  },
  {
    "id": 53,
    "pergunta": "Qual cidade é a capital do Peru?",
    "alternativas": {
      "A": "Cusco",
      "B": "Arequipa",
      "C": "Lima",
      "D": "Puno"
    },
    "correta": "C",
    "cronica_guardiao": "Lima foi fundada pelos espanhóis em 1535."
  },
  {
    "id": 54,
    "pergunta": "Em que continente ficam Equador e Peru?",
    "alternativas": {
      "A": "Europa",
      "B": "Ásia",
      "C": "América do Sul",
      "D": "África"
    },
    "correta": "C",
    "cronica_guardiao": "A América do Sul abriga a Cordilheira dos Andes e a Floresta Amazônica."
  },
  {
    "id": 55,
    "pergunta": "O que significa a palavra 'remanescente' apresentada no vocabulário?",
    "alternativas": {
      "A": "Algo que desapareceu",
      "B": "Algo que sobrou",
      "C": "Algo novo",
      "D": "Algo antigo"
    },
    "correta": "B",
    "cronica_guardiao": "Remanescente é aquilo que permanece depois que o restante desaparece."
  },
  {
    "id": 56,
    "pergunta": "O que é uma cordilheira?",
    "alternativas": {
      "A": "Uma ilha",
      "B": "Um rio",
      "C": "Um grupo de montanhas conectadas",
      "D": "Uma floresta"
    },
    "correta": "C",
    "cronica_guardiao": "Os Andes formam a maior cordilheira da América do Sul."
  },
  {
    "id": 57,
    "pergunta": "Como é chamado o ponto mais alto de uma montanha?",
    "alternativas": {
      "A": "Vale",
      "B": "Sopé",
      "C": "Passagem",
      "D": "Cume"
    },
    "correta": "D",
    "cronica_guardiao": "Alpinistas costumam celebrar quando alcançam o cume de uma montanha."
  },
  {
    "id": 58,
    "pergunta": "O que é um cânion?",
    "alternativas": {
      "A": "Um lago profundo",
      "B": "Um vale profundo com lados íngremes",
      "C": "Uma montanha isolada",
      "D": "Uma floresta fechada"
    },
    "correta": "B",
    "cronica_guardiao": "Os cânions são formados principalmente pela erosão causada pelos rios."
  },
  {
    "id": 59,
    "pergunta": "Como é chamado o local baixo entre montanhas?",
    "alternativas": {
      "A": "Vale",
      "B": "Pico",
      "C": "Penhasco",
      "D": "Planalto"
    },
    "correta": "A",
    "cronica_guardiao": "Muitas cidades importantes foram construídas em vales."
  },
  {
    "id": 60,
    "pergunta": "Qual patrimônio histórico dos incas foi declarado Patrimônio Mundial pela UNESCO em 1983?",
    "alternativas": {
      "A": "Cusco",
      "B": "Lago Titicaca",
      "C": "Machu Picchu",
      "D": "Nazca"
    },
    "correta": "C",
    "cronica_guardiao": "Machu Picchu é considerada uma das maravilhas do mundo moderno."
  },
  {
    "id": 61,
    "pergunta": "Observando o mapa do Peru, qual cidade é a capital do país?",
    "alternativas": {
      "A": "Cusco",
      "B": "Pucallpa",
      "C": "Lima",
      "D": "Matarani"
    },
    "correta": "C",
    "cronica_guardiao": "Lima é a maior cidade do Peru e está localizada na costa do Oceano Pacífico."
  },
  {
    "id": 62,
    "pergunta": "Qual lago aparece no sul do mapa do Peru?",
    "alternativas": {
      "A": "Lago Vitória",
      "B": "Lago Titicaca",
      "C": "Lago Superior",
      "D": "Lago Ness"
    },
    "correta": "B",
    "cronica_guardiao": "O Lago Titicaca é um dos lagos navegáveis mais altos do mundo."
  },
  {
    "id": 63,
    "pergunta": "Qual destes países faz fronteira com o Peru?",
    "alternativas": {
      "A": "Paraguai",
      "B": "Uruguai",
      "C": "Colômbia",
      "D": "Argentina"
    },
    "correta": "C",
    "cronica_guardiao": "A Colômbia está ao norte do Peru."
  },
  {
    "id": 64,
    "pergunta": "Qual é o nome da grande bacia hidrográfica mostrada nos mapas do Peru e do Equador?",
    "alternativas": {
      "A": "Bacia do Prata",
      "B": "Bacia do Orinoco",
      "C": "Bacia Amazônica",
      "D": "Bacia do Mississipi"
    },
    "correta": "C",
    "cronica_guardiao": "A Bacia Amazônica é a maior bacia hidrográfica do planeta."
  },
  {
    "id": 65,
    "pergunta": "O que é um penhasco?",
    "alternativas": {
      "A": "Uma planície",
      "B": "Uma face íngreme de rocha ou solo",
      "C": "Um rio estreito",
      "D": "Uma montanha baixa"
    },
    "correta": "B",
    "cronica_guardiao": "Penhascos costumam se formar pela erosão do relevo ao longo de milhares de anos."
  },
  {
    "id": 66,
    "pergunta": "O que é um planalto?",
    "alternativas": {
      "A": "Uma área baixa inundada",
      "B": "Uma montanha com topo plano ou colina elevada",
      "C": "Um vale estreito",
      "D": "Um lago cercado por montanhas"
    },
    "correta": "B",
    "cronica_guardiao": "Muitos planaltos servem como importantes áreas agrícolas."
  },
  {
    "id": 67,
    "pergunta": "Qual é o significado da palavra elevação?",
    "alternativas": {
      "A": "Profundidade de um rio",
      "B": "Altura acima do nível do mar",
      "C": "Velocidade do vento",
      "D": "Quantidade de chuva"
    },
    "correta": "B",
    "cronica_guardiao": "Montanhas possuem grandes elevações em relação ao nível do mar."
  },
  {
    "id": 68,
    "pergunta": "Como se chama o ponto que se projeta para fora de uma montanha?",
    "alternativas": {
      "A": "Vale",
      "B": "Cume",
      "C": "Pico",
      "D": "Planalto"
    },
    "correta": "C",
    "cronica_guardiao": "Nem todo pico é o ponto mais alto da montanha, mas sempre se destaca no relevo."
  },
  {
    "id": 69,
    "pergunta": "O que é uma passagem nas montanhas?",
    "alternativas": {
      "A": "Um lago escondido",
      "B": "Um caminho sobre ou através das montanhas",
      "C": "Uma floresta tropical",
      "D": "Uma mina abandonada"
    },
    "correta": "B",
    "cronica_guardiao": "Muitas rotas comerciais históricas atravessavam passagens montanhosas."
  },
  {
    "id": 70,
    "pergunta": "O que são sopés?",
    "alternativas": {
      "A": "Os picos das montanhas",
      "B": "As colinas na base das montanhas",
      "C": "As cavernas dos Andes",
      "D": "Os vales inundados"
    },
    "correta": "B",
    "cronica_guardiao": "O sopé marca a transição entre a montanha e a área mais plana ao redor."
  },
  {
    "id": 71,
    "pergunta": "Em qual cordilheira foi construída Machu Picchu?",
    "alternativas": {
      "A": "Montanhas Rochosas",
      "B": "Alpes",
      "C": "Andes",
      "D": "Atlas"
    },
    "correta": "C",
    "cronica_guardiao": "Os Andes se estendem por cerca de 7.000 quilômetros ao longo da América do Sul."
  },
  {
    "id": 72,
    "pergunta": "Qual organização declarou Machu Picchu Patrimônio Mundial?",
    "alternativas": {
      "A": "ONU",
      "B": "UNESCO",
      "C": "OTAN",
      "D": "OMS"
    },
    "correta": "B",
    "cronica_guardiao": "A UNESCO protege locais considerados importantes para toda a humanidade."
  },
  {
    "id": 73,
    "pergunta": "Qual destas construções é citada como uma das principais de Machu Picchu?",
    "alternativas": {
      "A": "Templo do Sol",
      "B": "Coliseu",
      "C": "Partenon",
      "D": "Pirâmide do Sol"
    },
    "correta": "A",
    "cronica_guardiao": "Templo do Sol era um dos locais mais importantes da cidade inca."
  },
  {
    "id": 74,
    "pergunta": "Segundo alguns pesquisadores, Machu Picchu pode ter servido como:",
    "alternativas": {
      "A": "Base naval",
      "B": "Refúgio para reis e rainhas incas",
      "C": "Mercado internacional",
      "D": "Fortaleza espanhola"
    },
    "correta": "B",
    "cronica_guardiao": "Muitos estudiosos acreditam que Machu Picchu possuía funções religiosas e administrativas."
  },
  {
    "id": 75,
    "pergunta": "Qual destes animais está associado aos povos andinos?",
    "alternativas": {
      "A": "Camelo",
      "B": "Lhama",
      "C": "Bisão",
      "D": "Alce"
    },
    "correta": "B",
    "cronica_guardiao": "A lã das lhamas é utilizada até hoje na produção de roupas."
  },
  {
    "id": 76,
    "pergunta": "Qual oceano aparece tanto no mapa do Peru quanto próximo ao Equador?",
    "alternativas": {
      "A": "Atlântico",
      "B": "Índico",
      "C": "Pacífico",
      "D": "Ártico"
    },
    "correta": "C",
    "cronica_guardiao": "O Oceano Pacífico é o maior oceano do planeta."
  },
  {
    "id": 77,
    "pergunta": "O arquipélago de Galápagos pertence a qual país?",
    "alternativas": {
      "A": "Peru",
      "B": "Chile",
      "C": "Colômbia",
      "D": "Equador"
    },
    "correta": "D",
    "cronica_guardiao": "As Ilhas Galápagos ficaram famosas pelos estudos de Charles Darwin."
  },
  {
    "id": 78,
    "pergunta": "Qual cidade peruana aparece próxima a Machu Picchu no mapa?",
    "alternativas": {
      "A": "Lima",
      "B": "Cusco",
      "C": "Talara",
      "D": "Pucallpa"
    },
    "correta": "B",
    "cronica_guardiao": "Cusco foi a antiga capital do Império Inca."
  },
  {
    "id": 79,
    "pergunta": "O que caracteriza uma montanha?",
    "alternativas": {
      "A": "Uma grande elevação natural do terreno",
      "B": "Uma área coberta por água",
      "C": "Uma floresta tropical",
      "D": "Uma região desértica"
    },
    "correta": "A",
    "cronica_guardiao": "As montanhas são formadas por movimentos tectônicos da crosta terrestre."
  },
  {
    "id": 80,
    "pergunta": "Qual grande tema une Equador, Peru, Andes e Machu Picchu neste capítulo?",
    "alternativas": {
      "A": "A história dos vikings",
      "B": "A exploração da América do Sul e da herança inca",
      "C": "A Revolução Industrial",
      "D": "A colonização australiana"
    },
    "correta": "B",
    "cronica_guardiao": "A civilização inca deixou um legado impressionante que ainda pode ser visto nos Andes."
  }
];

const ANO = "5º ano", DISC = "Geografia", PROVA = "AV1", TRIM = 2;

async function runSeeder() {
  // Convert questions to Arkanos JSON Schema
  const formattedQuestions = {};
  
  for (const q of rawQuestions) {
    const idStr = `geo_av1_${String(q.id).padStart(3, "0")}`;
    const diff = q.id <= 30 ? "facil" : q.id <= 60 ? "media" : "dificil";
    
    // Categorize by theme/topic based on id range or content
    let tema = "América do Sul";
    let subtema = "Geral";
    
    if (q.id >= 21 && q.id <= 40) {
      tema = "Lendas";
      subtema = "Folclore";
    } else if (q.pergunta.toLowerCase().includes("machu picchu")) {
      tema = "Machu Picchu";
      subtema = "História";
    } else if (q.pergunta.toLowerCase().includes("cordilheira") || q.pergunta.toLowerCase().includes("montanha") || q.pergunta.toLowerCase().includes("cânion") || q.pergunta.toLowerCase().includes("vales") || q.pergunta.toLowerCase().includes("sopé")) {
      tema = "Relevo";
      subtema = "Geografia Física";
    } else if (q.pergunta.toLowerCase().includes("equador")) {
      tema = "Equador";
      subtema = "Geografia";
    } else if (q.pergunta.toLowerCase().includes("peru")) {
      tema = "Peru";
      subtema = "Geografia";
    }
    
    formattedQuestions[idStr] = {
      id: idStr,
      numero: q.id,
      tema: tema,
      subtema: subtema,
      dificuldade: diff,
      pergunta: q.pergunta,
      alternativas: q.alternativas,
      respostaCorreta: q.correta,
      cronicaGuardiao: q.cronica_guardiao,
      imagem: `${idStr}.webp`,
      promptImagem: `Educational fantasy illustration representing: ${q.pergunta}`
    };
  }

  const outputData = {
    meta: {
      descricao: "Matriz Mestre Completa de Questões Geografia AV1 (1-80)",
      total: 80,
      blocos: {
        bloco_1: "Questões 1-30 - Geografia, Relevo e Lendas",
        bloco_2: "Questões 31-60 - Paul Bunyan e Geografia Andina",
        bloco_3: "Questões 61-80 - Cartografia, Andes e Relevo"
      },
      ultima_atualizacao: new Date().toISOString().split('T')[0],
      imagens_unicas: 80,
      temas: ["Equador", "Peru", "Andes", "Machu Picchu", "Lendas", "Relevo", "América do Sul"]
    },
    questoes: formattedQuestions
  };

  // 1. Save JSON files
  await writeFile(sourcePath, JSON.stringify(outputData, null, 2), "utf8");
  await writeFile(targetPath, JSON.stringify(outputData, null, 2), "utf8");
  console.log("✓ JSON files saved.");

  // 2. Reseed Database
  if (!url) {
    console.log("✗ DATABASE_URL absent, skipping DB update.");
    return;
  }

  const sql = postgres(url, { prepare: false, max: 1 });
  
  try {
    const gradeId = await sql`select id from public.quiz_grades where name = ${ANO} limit 1`.then(r => r[0]?.id || sql`insert into public.quiz_grades (name) values (${ANO}) returning id`.then(r => r[0].id));
    const subjectId = await sql`select id from public.quiz_subjects where name = ${DISC} limit 1`.then(r => r[0]?.id || sql`insert into public.quiz_subjects (name) values (${DISC}) returning id`.then(r => r[0].id));
    
    const assessmentId = await sql`
      select id from public.quiz_assessments
      where name = ${PROVA} and grade_id = ${gradeId} and subject_id = ${subjectId}
        and trimestre is not distinct from ${TRIM} limit 1
    `.then(r => r[0]?.id || sql`
      insert into public.quiz_assessments (name, grade_id, subject_id, trimestre)
      values (${PROVA}, ${gradeId}, ${subjectId}, ${TRIM}) returning id
    `.then(r => r[0].id));

    // Delete existing questions for this assessment
    await sql`
      delete from public.quiz_questions 
      where topic_id in (
        select id from public.quiz_topics 
        where assessment_id = ${assessmentId}
      )
    `;
    console.log("✓ Old questions cleared in DB.");

    let inserted = 0;
    for (const qId of Object.keys(formattedQuestions)) {
      const it = formattedQuestions[qId];
      
      const topicId = await sql`
        select id from public.quiz_topics
        where subject_id = ${subjectId} and grade_id = ${gradeId}
          and assessment_id = ${assessmentId} and name = ${it.tema} limit 1
      `.then(r => r[0]?.id || sql`
        insert into public.quiz_topics (subject_id, grade_id, assessment_id, name)
        values (${subjectId}, ${gradeId}, ${assessmentId}, ${it.tema}) returning id
      `.then(r => r[0].id));

      const alts = ["A", "B", "C", "D"].map(k => it.alternativas[k]).filter(v => v != null);
      const answer = it.alternativas[it.respostaCorreta] ?? "";
      const imageUrl = `/img/quiz/geo-av1/${it.imagem}`;

      await sql`
        insert into public.quiz_questions
          (topic_id, question, options, answer, type, difficulty, explanation,
           cronica_do_guardiao, has_image, image_mode, image_url, image_prompt,
           image_alt, source, metadata_json)
        values (
          ${topicId}, ${it.pergunta}, ${sql.json(alts)}, ${answer},
          'multiple_choice', ${it.dificuldade},
          '', ${it.cronicaGuardiao},
          true, 'generated_asset', ${imageUrl},
          ${it.promptImagem}, ${"Ilustração para a questão " + it.numero},
          'manual',
          ${sql.json({ id_original: it.id, avaliacao: "AV1 - 2º Trimestre", ano: ANO,
                       guardiao: "Aion", arquivo: it.imagem, tema: it.tema, subtema: it.subtema })}
        )
      `;
      inserted++;
    }
    console.log(`✓ Reseeded ${inserted} questions in DB.`);
  } catch (err) {
    console.error("✗ Database seeding failed:", err.message);
  } finally {
    await sql.end();
  }
}

runSeeder();
