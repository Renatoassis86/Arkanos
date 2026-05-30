// Corrige o banco de Português (AV1 · 3º ano):
//  1) Crônicas do Guardião específicas por conteúdo (curiosidade/reforço).
//  2) Desvincula imagens cujo arquivo NÃO existe (evita imagem quebrada);
//     mantém/garante as que existem.
// Também reescreve o JSON-fonte (cronica) para manter a verdade do conteúdo.
// Uso: node --env-file=.env.local scripts/fix-portugues.mjs
import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });

// Crônica do Guardião por questão (id_original) — ligada ao conteúdo da pergunta.
const CRONICAS = {
  "3A-T2-AV1-PT-001": "Toda frase começa com letra MAIÚSCULA e termina com um sinal de pontuação — é como abrir e fechar uma porta para as palavras!",
  "3A-T2-AV1-PT-002": "Frases que perguntam ganham o '?'. Curiosidade: esse sinal só apareceu na Idade Média, criado pelos monges que copiavam livros à mão!",
  "3A-T2-AV1-PT-003": "O '!' mostra emoção forte: surpresa, alegria ou susto. Ele é o 'grito' da escrita!",
  "3A-T2-AV1-PT-004": "O ponto de interrogação ('?') sempre acompanha uma pergunta. Sem ele, ninguém saberia que você espera uma resposta!",
  "3A-T2-AV1-PT-005": "O dígrafo 'NH' tem som único: duas letras que viram um só barulhinho, como em canhão e ninho.",
  "3A-T2-AV1-PT-006": "Ao separar sílabas, o 'NH' nunca se divide — anda sempre junto, como bons amigos: mon-ta-nha.",
  "3A-T2-AV1-PT-007": "O 'NH' aparece em palavras gostosas: banho, sonho, carinho. Repare como ele deixa o som mais suave!",
  "3A-T2-AV1-PT-008": "A vírgula antes ou depois do nome marca o VOCATIVO — quando chamamos alguém: 'Pedro, venha aqui.'",
  "3A-T2-AV1-PT-009": "Interjeições como 'Ai!' expressam sentimentos num instante. 'Ai!' quase sempre é sinal de dor.",
  "3A-T2-AV1-PT-010": "Interjeição é a palavra da emoção: 'Oba!', 'Ufa!', 'Nossa!'. Cabe sozinha e já diz tudo!",
  "3A-T2-AV1-PT-011": "Substantivo é o nome dos seres e das coisas: cadeira, menino, alegria. Se dá para pôr 'o' ou 'a' na frente, é substantivo!",
  "3A-T2-AV1-PT-012": "'Democracia' vem do grego: demos (povo) + kratos (poder) = o poder do povo!",
  "3A-T2-AV1-PT-013": "A frase afirmativa apenas declara algo, sem perguntar nem exclamar — e termina com ponto final.",
  "3A-T2-AV1-PT-014": "Em 'nenhum', o 'NH' junta-se ao 'U' formando 'NHU'. Cada vogal muda o som do 'NH'!",
  "3A-T2-AV1-PT-015": "O ponto final é o ponto de descanso da frase: avisa que a ideia terminou.",
  "3A-T2-AV1-PT-016": "Em cartas, a vírgula separa a cidade da data: 'São Paulo, 23 de novembro'. Assim sabemos de onde e quando!",
  "3A-T2-AV1-PT-017": "'Amanhecer' guarda o 'NHE'. E que palavra linda: é o sol nascendo e um novo dia começando!",
  "3A-T2-AV1-PT-018": "Uma frase bem escrita começa com letra maiúscula e termina com pontuação. Os dois detalhes juntos fazem toda a diferença!",
  "3A-T2-AV1-PT-019": "Quando 'Silêncio!' vem com '!', vira uma ordem firme. A pontuação muda a força das palavras!",
  "3A-T2-AV1-PT-020": "'Canhão' se escreve com um único 'NH'. Cuidado com as pegadinhas: 'cannhão' e 'canhnhão' não existem!",
  "3A-T2-AV1-PT-021": "Toda pergunta pede o '?'. As palavras 'onde', 'quando', 'como' e 'por que' adoram começar perguntas!",
  "3A-T2-AV1-PT-022": "'Companhia' traz o 'NHI'. Curiosidade: vem de 'com pão' — é quem partilha o pão com você!",
  "3A-T2-AV1-PT-023": "Singular é quando falamos de UM só: 'o pássaro'. No plural seriam vários: 'os pássaros'.",
  "3A-T2-AV1-PT-024": "A exclamação de alegria contagia! 'Que dia maravilhoso!' transmite felicidade só de ler.",
  "3A-T2-AV1-PT-025": "Separando 'caminho': ca-mi-nho. O 'NH' fica grudado e nunca se separa!",
  "3A-T2-AV1-PT-026": "A vírgula do vocativo isola o nome de quem chamamos: 'Ana, venha logo.'",
  "3A-T2-AV1-PT-027": "'Nossa!' é a interjeição da surpresa — dizemos sem pensar quando algo nos espanta!",
  "3A-T2-AV1-PT-028": "'Caminhão' termina em 'NHÃO', um som bem forte. Os aumentativos costumam ter esse 'ão' poderoso!",
  "3A-T2-AV1-PT-029": "Frases exclamativas mostram emoção e terminam com '!'. 'Que bolo gostoso!' dá água na boca!",
  "3A-T2-AV1-PT-030": "'Mensagem' termina com 'M', não 'N'. E começa com 'mens-', de mente: é uma ideia enviada!",
  "3A-T2-AV1-PT-031": "A vírgula aqui chama o João: é o vocativo. Sem ela, a frase perderia o chamado.",
  "3A-T2-AV1-PT-032": "Em português, palavras não terminam em 'N' — usamos 'M': também, ninguém, jardim.",
  "3A-T2-AV1-PT-033": "A primeira letra da frase é sempre maiúscula. É o jeito de dizer: 'a frase começa aqui!'",
  "3A-T2-AV1-PT-034": "Antes de 'F' usamos 'N', não 'M': infiel, enfeite, confete. Uma regrinha de ouro da ortografia!",
  "3A-T2-AV1-PT-035": "A exclamação de admiração elogia o que vemos. 'Que paisagem bonita!' é puro encanto!",
  "3A-T2-AV1-PT-036": "'Uau!' é interjeição de espanto e admiração — curtinha, mas cheia de emoção!",
  "3A-T2-AV1-PT-037": "'Esperança' se escreve com 'Ç'. Que palavra bonita: é acreditar que o bom está por vir!",
  "3A-T2-AV1-PT-038": "Perguntas terminam com '?'. 'Que horas são?' só faz sentido com o ponto de interrogação!",
  "3A-T2-AV1-PT-039": "Antes de 'T' usamos 'N': tripulante, gente, ponte. Já antes de 'P' e 'B', usamos 'M'!",
  "3A-T2-AV1-PT-040": "'Socorro!' pede ajuda com força — por isso o '!'. A pontuação dá o tom de urgência!",
  "3A-T2-AV1-PT-041": "O 'NH' deixa o som mais suave: banho, sonho, lenha. Sem ele, 'bano' teria outro som!",
  "3A-T2-AV1-PT-042": "Chamar alguém pede vírgula: 'Maria, venha cá.' É o vocativo de novo em ação!",
  "3A-T2-AV1-PT-043": "'Nossa!' aparece quando algo nos surpreende. É a interjeição favorita do espanto!",
  "3A-T2-AV1-PT-044": "Perguntas diretas terminam com '?'. É o sinal que convida alguém a responder!",
  "3A-T2-AV1-PT-045": "A frase afirmativa declara um fato com calma e termina em ponto final: 'Hoje eu estudei.'",
  "3A-T2-AV1-PT-046": "'Homem' termina com 'M'. Lembre: em português a palavra fecha com 'M', nunca com 'N'!",
  "3A-T2-AV1-PT-047": "'Amanhecer' tem o 'NHE' e carrega esperança: é o dia recomeçando com o sol!",
  "3A-T2-AV1-PT-048": "'Oba!' é a interjeição da alegria. Com '!', a empolgação salta da frase!",
  "3A-T2-AV1-PT-049": "Uma declaração tranquila pede ponto final: 'Eu gosto de ler.' E ler abre portas para mil mundos!",
  "3A-T2-AV1-PT-050": "'Companhia' tem o 'NHI'. E boa companhia torna todo caminho mais leve!",
};

async function run() {
  // 1) Crônicas
  let cron = 0;
  for (const [idOrig, texto] of Object.entries(CRONICAS)) {
    const r = await sql`
      update public.quiz_questions
         set cronica_do_guardiao = ${texto}
       where metadata_json ->> 'id_original' = ${idOrig}`;
    cron += r.count;
  }
  console.log(`✓ Crônicas atualizadas: ${cron}/${Object.keys(CRONICAS).length}`);

  // 2) Imagens: desvincula as que não têm arquivo; garante as que têm.
  const rows = await sql`
    select id, image_url from public.quiz_questions
    where image_url like '/img/quiz/%'`;
  let unlinked = 0, kept = 0;
  for (const r of rows) {
    const exists = fs.existsSync(path.join("public", r.image_url));
    if (exists) {
      await sql`update public.quiz_questions
                   set has_image = true, image_mode = 'generated_asset'
                 where id = ${r.id}`;
      kept++;
    } else {
      await sql`update public.quiz_questions
                   set image_url = null, image = null, has_image = false, image_mode = 'none'
                 where id = ${r.id}`;
      unlinked++;
    }
  }
  console.log(`✓ Imagens: ${kept} mantidas (arquivo existe), ${unlinked} desvinculadas (sem arquivo)`);

  // 3) Reescreve o JSON-fonte (cronica) para manter a verdade do conteúdo.
  const jsonPath = "data/3ano_t2_av1_portugues.json";
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  for (const it of data) if (CRONICAS[it.id]) it.cronica_do_guardiao = CRONICAS[it.id];
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
  console.log(`✓ JSON-fonte atualizado: ${jsonPath}`);

  await sql.end();
}

run().catch((e) => { console.error("ERRO", e.message); process.exit(1); });
