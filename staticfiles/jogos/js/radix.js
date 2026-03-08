/**
 * ARKANOS RADIX ENGINE
 * Portuguese Spelling & Grammatica
 */

let currentIndex = 0;
let score = 0;
let streak = 0;
let currentWordObj = null;
let revealedLetters = 0;

const screenLogin = document.getElementById('screen-login');
const playArea = document.getElementById('play-area');
const inputAnswer = document.getElementById('input-answer');
const txtMystery = document.getElementById('txt-mystery');
const speechBubble = document.getElementById('speech-bubble');
const feedbackOverlay = document.getElementById('feedback-overlay');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateHUD();

    if (USER.is_authenticated) {
        screenLogin.classList.add('hidden');
        playArea.classList.remove('hidden');
        startBatch();
    }

    inputAnswer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') validateAnswer();
    });
});

function startBatch() {
    currentIndex = 0;
    nextWord();
}

function nextWord() {
    if (currentIndex >= WORDS.length) {
        // Shuffle or finish
        WORDS.sort(() => Math.random() - 0.5);
        currentIndex = 0;
    }

    currentWordObj = WORDS[currentIndex];
    revealedLetters = 0;
    inputAnswer.value = '';

    // Scramble logic for Radix
    txtMystery.innerText = scramble(currentWordObj.palavra);

    speechBubble.innerText = "Desembaralhe e soletre a palavra corretamente!";
    updateHUD();
}

function scramble(word) {
    if (word.length <= 3) return word.split('').sort(() => Math.random() - 0.5).join('');

    // Keep first and last in some cases? No, let's scramble all for Radix
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function validateAnswer() {
    const attempt = inputAnswer.value.trim().toLowerCase();
    const correct = currentWordObj.palavra.toLowerCase();

    if (attempt === correct) {
        handleSuccess();
    } else {
        handleError();
    }
}

function handleSuccess() {
    score += 100 + (streak * 10);
    streak++;
    currentIndex++;

    showFeedback("✨", "CORRETO!", "Sua mente está afiada!", true);
    setTimeout(() => {
        hideFeedback();
        nextWord();
    }, 1500);
}

function handleError() {
    streak = 0;
    showFeedback("❌", "TENTE NOVAMENTE", "A raiz desta palavra é profunda...", false);
    setTimeout(() => {
        hideFeedback();
        inputAnswer.focus();
    }, 1500);
}

function showFeedback(icon, title, msg, isSuccess) {
    document.getElementById('feedback-icon').innerText = icon;
    document.getElementById('feedback-title').innerText = title;
    document.getElementById('feedback-msg').innerText = msg;

    const titleEl = document.getElementById('feedback-title');
    titleEl.style.color = isSuccess ? '#1976D2' : '#D32F2F';

    feedbackOverlay.classList.remove('hidden');
}

function hideFeedback() {
    feedbackOverlay.classList.add('hidden');
}

function updateHUD() {
    document.getElementById('txt-username').innerText = USER.username.toUpperCase();
    document.getElementById('count-streak').innerText = streak.toString().padStart(2, '0');
    document.getElementById('count-score').innerText = score.toString().padStart(4, '0');

    const progress = Math.min(((currentIndex + 1) / 15) * 100, 100);
    document.getElementById('bar-progress').style.width = `${progress}%`;
    document.getElementById('txt-progress').innerText = `QUEST ${currentIndex + 1}/15`;
}

// Hint Functions
function showMeaning() {
    speechBubble.innerText = `Significado: ${currentWordObj.significado || 'Não disponível'}`;
}

function showExample() {
    speechBubble.innerText = `Exemplo: ${currentWordObj.exemplo || 'Não disponível'}`;
}

function giveLetter() {
    const word = currentWordObj.palavra;
    if (revealedLetters < word.length) {
        revealedLetters++;
        const hint = word.substring(0, revealedLetters) + "_".repeat(word.length - revealedLetters);
        speechBubble.innerText = `Dica: ${hint.toUpperCase()}`;
    }
}
