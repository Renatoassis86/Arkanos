words_data = [
    # 1º Ano
    ("cat", "Gato", "The cat is on the mat.", "1ano", "facil"),
    ("dog", "Cachorro", "I love my dog.", "1ano", "facil"),
    ("sun", "Sol", "The sun is hot.", "1ano", "facil"),
    ("ball", "Bola", "The ball is red.", "1ano", "medio"),
    ("tree", "Árvore", "The tree is tall.", "1ano", "medio"),
    ("fish", "Peixe", "I see a fish.", "1ano", "medio"),
    ("water", "Água", "Drink some water.", "1ano", "dificil"),
    ("apple", "Maçã", "She ate an apple.", "1ano", "dificil"),
    ("jump", "Pular", "Can you jump high?", "1ano", "dificil"),

    # 2º Ano
    ("house", "Casa", "The house is blue.", "2ano", "facil"),
    ("bird", "Pássaro", "The bird is flying.", "2ano", "facil"),
    ("milk", "Leite", "He drinks milk.", "2ano", "facil"),
    ("flower", "Flor", "The flower smells nice.", "2ano", "medio"),
    ("green", "Verde", "The grass is green.", "2ano", "medio"),
    ("smile", "Sorriso", "She has a nice smile.", "2ano", "medio"),
    ("yellow", "Amarelo", "The sun is yellow.", "2ano", "dificil"),
    ("orange", "Laranja", "I eat an orange.", "2ano", "dificil"),
    ("monkey", "Macaco", "The monkey eats banana.", "2ano", "dificil"),

    # 3º Ano
    ("table", "Mesa", "Put it on the table.", "3ano", "facil"),
    ("chair", "Cadeira", "Sit on the chair.", "3ano", "facil"),
    ("door", "Porta", "Close the door.", "3ano", "facil"),
    ("teacher", "Professor", "The teacher is kind.", "3ano", "medio"),
    ("student", "Estudante", "The student is reading.", "3ano", "medio"),
    ("school", "Escola", "I go to school.", "3ano", "medio"),
    ("elephant", "Elefante", "The elephant is big.", "3ano", "dificil"),
    ("beautiful", "Bonito", "The view is beautiful.", "3ano", "dificil"),
    ("surprise", "Surpresa", "It was a surprise.", "3ano", "dificil"),

    # 4º Ano
    ("about", "Sobre / A respeito de", "We talk about games.", "4ano", "facil"),
    ("across", "Através", "Walk across the street.", "4ano", "facil"),
    ("always", "Sempre", "He is always smiling.", "4ano", "facil"),
    ("accident", "Acidente", "Drive carefully inside.", "4ano", "medio"),
    ("airplane", "Avião", "The airplane is fast.", "4ano", "medio"),
    ("animal", "Animal", "Save the animals.", "4ano", "medio"),
    ("because", "Porque (resposta)", "Happy because of you.", "4ano", "dificil"),
    ("believe", "Acreditar", "I believe you.", "4ano", "dificil"),
    ("birthday", "Aniversário", "It is my birthday.", "4ano", "dificil"),

    # 5º Ano
    ("danger", "Perigo", "Beware of danger.", "5ano", "facil"),
    ("clean", "Limpo", "Keep it clean.", "5ano", "facil"),
    ("clock", "Relógio", "Look at the clock.", "5ano", "facil"),
    ("direction", "Direção", "Go in that direction.", "5ano", "medio"),
    ("exercise", "Exercício", "Do your exercise.", "5ano", "medio"),
    ("exactly", "Exatamente", "You are exactly right.", "5ano", "medio"),
    ("necessary", "Necessário", "It is necessary.", "5ano", "dificil"),
    ("natural", "Natural", "It feels natural.", "5ano", "dificil"),
    ("neighbor", "Vizinho", "He is my neighbor.", "5ano", "dificil"),

    # 6º Ano
    ("climate", "Clima", "The climate is warm.", "6ano", "facil"),
    ("curious", "Curioso", "He is a curious boy.", "6ano", "facil"),
    ("culture", "Cultura", "Respect the culture.", "6ano", "facil"),
    ("guarantee", "Garantia / Garantir", "I guarantee success.", "6ano", "medio"),
    ("government", "Governo", "Support the government.", "6ano", "medio"),
    ("general", "Geral", "In a general sense.", "6ano", "medio"),
    ("intelligent", "Inteligente", "She is intelligent.", "6ano", "dificil"),
    ("investigate", "Investigar", "We will investigate.", "6ano", "dificil"),
    ("international", "Internacional", "An international flight.", "6ano", "dificil"),

    # 7º Ano
    ("absolute", "Absoluto", "That is absolute truth.", "7ano", "facil"),
    ("approve", "Aprovar", "They approve the plan.", "7ano", "facil"),
    ("average", "Média / Comum", "An average score.", "7ano", "facil"),
    ("communicate", "Comunicar", "We must communicate.", "7ano", "medio"),
    ("consequence", "Consequência", "Face the consequence.", "7ano", "medio"),
    ("constant", "Constante", "A constant noise.", "7ano", "medio"),
    ("environment", "Ambiente", "Protect our environment.", "7ano", "dificil"),
    ("experience", "Experiência", "A great experience.", "7ano", "dificil"),
    ("establish", "Estabelecer", "To establish rules.", "7ano", "dificil"),

    # 8º Ano
    ("balance", "Equilíbrio", "Keep your balance.", "8ano", "facil"),
    ("benefit", "Benefício", "A huge benefit.", "8ano", "facil"),
    ("building", "Prédio", "A tall building.", "8ano", "facil"),
    ("challenge", "Desafio", "Accept the challenge.", "8ano", "medio"),
    ("comfortable", "Confortável", "A comfortable chair.", "8ano", "medio"),
    ("competition", "Competição", "Win the competition.", "8ano", "medio"),
    ("definition", "Definição", "The word definition.", "8ano", "dificil"),
    ("development", "Desenvolvimento", "Child development.", "8ano", "dificil"),
    ("democracy", "Democracia", "Belief in democracy.", "8ano", "dificil"),

    # 9º Ano
    ("argument", "Argumento", "A strong argument.", "9ano", "facil"),
    ("attitude", "Atitude", "A positive attitude.", "9ano", "facil"),
    ("audience", "Público / Platéia", "The audience clapped.", "9ano", "facil"),
    ("calculation", "Cálculo", "Complex calculation.", "9ano", "medio"),
    ("capability", "Capacidade", "Vast capability.", "9ano", "medio"),
    ("consideration", "Consideração", "Take into consideration.", "9ano", "medio"),
    ("extraordinary", "Extraordinário", "An extraordinary story.", "9ano", "dificil"),
    ("enthusiastic", "Entusiasmado", "They are enthusiastic.", "9ano", "dificil"),
    ("effective", "Eficaz", "An effective method.", "9ano", "dificil")
]

sql_values = []
for word, meaning, example, grade, diff in words_data:
    row = f"('{word}', '{meaning.replace(chr(39), chr(39)+chr(39))}', '{example.replace(chr(39), chr(39)+chr(39))}', '{grade}', '{diff}')"
    sql_values.append(row)

sql = "INSERT INTO public.jogos_palavraspellingbee (palavra, significado, exemplo, serie, dificuldade) VALUES " + ", ".join(sql_values) + ";"
print(sql)
