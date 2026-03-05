const palavras = ["sabedoria", "virtude", "gramática", "lógica", "retórica"];
let palavraAtual = palavras[Math.floor(Math.random() * palavras.length)];

document.getElementById("palavra").innerText = embaralhar(palavraAtual);

function embaralhar(palavra) {
    return palavra.split('').sort(() => Math.random() - 0.5).join('');
}

function verificar() {
    const resposta = document.getElementById("entrada").value.trim().toLowerCase();
    const mensagem = document.getElementById("mensagem");

    if (resposta === palavraAtual) {
        mensagem.innerText = "✅ Correto!";
        mensagem.style.color = "green";
    } else {
        mensagem.innerText = "❌ Tente novamente.";
        mensagem.style.color = "red";
    }
}
