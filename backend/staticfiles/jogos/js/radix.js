import { GameEngine } from '/static/game_engine/index.js';

document.addEventListener('DOMContentLoaded', async () => {
    const engine = new GameEngine();
    let words = typeof WORDS !== 'undefined' ? WORDS : [{ palavra: "SABEDORIA", significado: "Qualidade de sábio. Profundo conhecimento." }];

    // Filtro simplificado caso as palavras venham de um JSON complexo
    if (words.length && words[0].palavra) {
        words = words.sort(() => Math.random() - 0.5);
    }

    let currentIndex = 0;
    let score = 0;
    let streak = 0;
    let currentWord = words[currentIndex] || { palavra: "TESTE", significado: "Apenas um teste." };

    // UI Elements
    const txtMystery = document.getElementById('txt-mystery');
    const inputAnswer = document.getElementById('input-answer');
    const speechBubble = document.getElementById('speech-bubble');
    const scoreUI = document.getElementById('count-score');
    const streakUI = document.getElementById('count-streak');
    const progressText = document.getElementById('txt-progress');
    const barProgress = document.getElementById('bar-progress');
    const victoryOverlay = document.getElementById('victory-overlay');
    const finalScore = document.getElementById('final-score');
    const victoryTitle = document.getElementById('victory-title');

    // Muta interface para iniciar (se houver gate)
    const loginGate = document.getElementById('screen-login');
    const playArea = document.getElementById('play-area');

    window.startGame = async () => {
        if (loginGate) loginGate.classList.add('hidden');
        if (playArea) playArea.classList.remove('hidden');

        try {
            await engine.startSession('radix', 'aprendiz');
        } catch (e) { }

        loadWord();
    };

    if (USER && USER.is_authenticated) {
        if (loginGate) {
            loginGate.querySelector('.gate-title').innerText = "PORTAL ABERTO";
            loginGate.querySelector('.gate-actions').innerHTML = `<button onclick="startGame()" class="btn-rpg-big primary w-full justify-center py-5">INICIAR MISSÃO ⚔️</button>`;
        }
    }

    function loadWord() {
        if (currentIndex >= words.length) {
            endGame(false);
            return;
        }
        currentWord = words[currentIndex];
        txtMystery.innerText = currentWord.palavra[0].toUpperCase() + currentWord.palavra.slice(1).replace(/[a-zA-Záéíóúâêôãõç]/g, ' _');
        txtMystery.style.color = "var(--rpg-text)";
        inputAnswer.value = '';
        inputAnswer.focus();
        speechBubble.innerText = `Ouça com atenção. A palavra tem ${currentWord.palavra.length} letras.`;

        const pct = ((currentIndex) / words.length) * 100;
        barProgress.style.width = `${pct}%`;
        progressText.innerText = `QUEST ${currentIndex + 1}/${words.length}`;
        speakWord(currentWord.palavra);
    }

    function speakWord(text) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'pt-BR';
        msg.rate = 0.85;
        window.speechSynthesis.speak(msg);
    }

    async function endGame(isFailure = false) {
        const finalScoreVal = score;
        finalScore.innerText = finalScoreVal.toString().padStart(4, '0');
        victoryOverlay.classList.remove('hidden');

        if (isFailure) {
            victoryTitle.innerText = "GAME OVER";
            victoryTitle.style.color = "#FF4B2B";
        } else {
            victoryTitle.innerText = "MISSÃO CUMPRIDA!";
            victoryTitle.style.color = "#FFD700";
        }

        try {
            if (engine.sessionId) await engine.finishSession(finalScoreVal);
            const leaderboard = await engine.getLeaderboard('global');
            renderRanking(leaderboard);
        } catch (e) { console.warn(e); }
    }

    function renderRanking(data) {
        const list = document.getElementById('ranking-list-items');
        if (!list) return;
        if (!data || !data.length) {
            list.innerHTML = '<p class="text-white opacity-50 p-4">Nenhum sábio no ranking ainda.</p>';
            return;
        }
        list.innerHTML = '';
        const top10 = data.slice(0, 10);
        top10.forEach((entry, idx) => {
            const row = document.createElement('div');
            row.className = `ranking-row ${idx === 0 ? 'top-1' : ''}`;
            row.style.animationDelay = `${idx * 0.1}s`;
            row.innerHTML = `
                <div class="flex items-center flex-1">
                    <span class="rank-number">${(idx + 1).toString().padStart(2, '0')}</span>
                    <span class="rank-name">${(entry.username || 'Sábio').toUpperCase()}</span>
                </div>
                <div class="rank-score">${entry.xp || 0} XP</div>
            `;
            list.appendChild(row);
            setTimeout(() => row.classList.add('rise-up'), 50);
        });
    }

    // Input feedback
    inputAnswer.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const ans = inputAnswer.value.trim().toLowerCase();
            const correct = currentWord.palavra.toLowerCase();

            engine.registerEvent('SPELLING_ATTEMPT', { word: correct, attempt: ans });

            if (ans === correct) {
                // Correct!
                txtMystery.innerText = correct.toUpperCase();
                txtMystery.style.color = "#10B981";
                score += 100;
                streak++;
                scoreUI.innerText = score.toString().padStart(4, '0');
                streakUI.innerText = streak.toString().padStart(2, '0');
                speechBubble.innerText = "Brilhante! Preparando a próxima...";

                setTimeout(() => {
                    currentIndex++;
                    loadWord();
                }, 1500);
            } else {
                // Wrong = Game over (como pedido pelo usuário: errar dá recomeço/gameover)
                txtMystery.innerText = correct.toUpperCase();
                txtMystery.style.color = "#EF4444";
                speechBubble.innerText = `Você soletrou incorretamente. A forma certa é: ${correct.toUpperCase()}`;

                setTimeout(() => {
                    endGame(true);
                }, 2000);
            }
        }
    });

    // Window bindings for hints
    window.showMeaning = () => {
        speechBubble.innerText = `Significado: ${currentWord.significado || "Uma palavra do português."}`;
        speakWord(currentWord.significado);
    };

    window.showExample = () => {
        speechBubble.innerText = `Exemplo: ${currentWord.exemplo || "Ela usou essa palavra na frase."}`;
        speakWord(currentWord.exemplo);
    };

    window.giveLetter = () => {
        speechBubble.innerText = `A primeira letra é: ${currentWord.palavra[0].toUpperCase()}`;
        speakWord(currentWord.palavra[0]);
    };
});
