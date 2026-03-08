import { GameEngine } from '/static/game_engine/index.js';

document.addEventListener('DOMContentLoaded', async () => {
    const engine = new GameEngine();
    let words = typeof WORDS !== 'undefined' ? WORDS : [{ palavra: "SABEDORIA", significado: "Qualidade de sábio. Profundo conhecimento." }];
    const gameMode = typeof MODE !== 'undefined' ? MODE : 'digitacao';

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
            await engine.startSession('radix_' + gameMode, 'aprendiz');
        } catch (e) { }

        loadWord();
    };

    if (USER && USER.is_authenticated) {
        if (loginGate) {
            loginGate.querySelector('.gate-title').innerText = (gameMode === 'soletracao' ? "RADIX SOLETRAÇÃO" : "RADIX DIGITAÇÃO") + " - PRONTO";
            loginGate.querySelector('.gate-actions').innerHTML = `<button onclick="startGame()" class="btn-rpg-big primary w-full justify-center py-5">INICIAR MISSÃO ⚔️</button>`;
        }
    }

    function loadWord() {
        if (currentIndex >= words.length) {
            endGame(false);
            return;
        }
        currentWord = words[currentIndex];

        // Em ambos os modos, mostramos as lacunas
        txtMystery.innerText = currentWord.palavra[0].toUpperCase() + currentWord.palavra.slice(1).replace(/[a-zA-Záéíóúâêôãõç]/g, ' _');
        txtMystery.style.color = "var(--rpg-text)";

        if (inputAnswer) {
            inputAnswer.value = '';
            inputAnswer.focus();
        }

        // Apenas fala, não mostra no balão para não facilitar a leitura se o objetivo é ouvir
        // speechBubble.innerText = `Ouça com atenção. A palavra tem ${currentWord.palavra.length} letras.`;
        speechBubble.innerText = "Prepare sua percepção...";

        const pct = ((currentIndex) / words.length) * 100;
        if (barProgress) barProgress.style.width = `${pct}%`;
        if (progressText) progressText.innerText = `QUEST ${currentIndex + 1}/${words.length}`;

        speakWord(currentWord.palavra);
    }

    function speakWord(text, rate = 0.85) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'pt-BR';
        msg.rate = rate;

        // Tenta voz feminina se disponível (Lyra)
        const voices = window.speechSynthesis.getVoices();
        const lyraVoice = voices.find(v => v.lang.includes('pt-BR') && (v.name.includes('Luciana') || v.name.includes('Maria') || v.name.includes('Google')));
        if (lyraVoice) msg.voice = lyraVoice;

        window.speechSynthesis.speak(msg);
    }

    async function endGame(isFailure = false) {
        const finalScoreVal = score;
        if (finalScore) finalScore.innerText = finalScoreVal.toString().padStart(4, '0');
        if (victoryOverlay) victoryOverlay.classList.remove('hidden');

        if (isFailure) {
            if (victoryTitle) {
                victoryTitle.innerText = "GAME OVER";
                victoryTitle.style.color = "#FF4B2B";
            }
        } else {
            if (victoryTitle) {
                victoryTitle.innerText = "MISSÃO CUMPRIDA!";
                victoryTitle.style.color = "#FFD700";
            }
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

    // Input feedback para DIGITAÇÃO
    if (inputAnswer) {
        inputAnswer.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                const ans = inputAnswer.value.trim().toLowerCase();
                processResult(ans);
            }
        });
    }

    // Botão de ouvir
    const btnListen = document.getElementById('btn-listen');
    if (btnListen) {
        btnListen.onclick = () => speakWord(currentWord.palavra);
    }

    // Botão de falar (SOLETRACAO)
    const btnSpeak = document.getElementById('btn-speak');
    if (btnSpeak) {
        btnSpeak.onclick = async () => {
            speechBubble.innerText = "Ouvindo... Soletre a palavra e repita ela ao final.";
            try {
                const transcript = await startListening();
                processResultFromVoice(transcript);
            } catch (e) {
                speechBubble.innerText = "Não consegui ouvir. Tente falar novamente?";
                speakWord("Não entendi. Pode repetir?");
            }
        };
    }

    function startListening() {
        return new Promise((resolve, reject) => {
            const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!Recognition) {
                alert("Navegador não suporta reconhecimento de voz.");
                return reject();
            }
            const rec = new Recognition();
            rec.lang = 'pt-BR';
            rec.onresult = (e) => resolve(e.results[0][0].transcript);
            rec.onerror = (e) => reject(e);
            rec.start();
        });
    }

    async function processResult(ans) {
        const correct = currentWord.palavra.toLowerCase();
        engine.registerEvent('RADIX_ATTEMPT', { word: correct, attempt: ans, mode: gameMode });

        if (ans === correct) {
            handleSuccess();
        } else {
            handleFailure();
        }
    }

    async function processResultFromVoice(transcript) {
        const correct = currentWord.palavra.toLowerCase();
        const cleanTranscript = transcript.toLowerCase().replace(/[^a-z0-9áéíóúâêôãõç]/g, '');

        // Lógica de validação (soletração + palavra ou apenas palavra)
        // O usuário pode dizer "C-A-S-A casa"
        if (cleanTranscript.includes(correct)) {
            handleSuccess();
        } else {
            handleFailure();
        }
    }

    function handleSuccess() {
        txtMystery.innerText = currentWord.palavra.toUpperCase();
        txtMystery.style.color = "#10B981";
        score += 100;
        streak++;
        if (scoreUI) scoreUI.innerText = score.toString().padStart(4, '0');
        if (streakUI) streakUI.innerText = streak.toString().padStart(2, '0');
        speechBubble.innerText = "Brilhante! Preparando a próxima...";
        speakWord("Correto! Muito bem.");

        setTimeout(() => {
            currentIndex++;
            loadWord();
        }, 1500);
    }

    function handleFailure() {
        txtMystery.innerText = currentWord.palavra.toUpperCase();
        txtMystery.style.color = "#EF4444";
        // No modo soletração, não mostramos o texto do erro para não dar a resposta visual
        if (gameMode === 'soletracao') {
            speechBubble.innerText = "Quase lá! Ouça a forma correta...";
        } else {
            speechBubble.innerText = `Incorreto. A forma certa é: ${currentWord.palavra.toUpperCase()}`;
        }

        speakWord(`Incorreto. A forma certa é: ${currentWord.palavra.split('').join(', ')}.`);

        setTimeout(() => {
            endGame(true);
        }, 3000);
    }

    // Window bindings for hints
    window.showMeaning = () => {
        // speechBubble.innerText = `Significado: ${currentWord.significado || "Uma palavra do português."}`; // USER: Don't show on screen
        speakWord("O significado desta palavra é: " + currentWord.significado);
    };

    window.showExample = () => {
        // speechBubble.innerText = `Exemplo: ${currentWord.exemplo || "Ela usou essa palavra na frase."}`; // USER: Don't show on screen
        speakWord("Veja um exemplo: " + currentWord.exemplo);
    };

    window.giveLetter = () => {
        const firstLetter = currentWord.palavra[0].toUpperCase();
        speakWord("A primeira letra é: " + firstLetter);
    };
});
