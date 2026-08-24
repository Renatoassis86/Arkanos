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
        
        const screenIntro = document.getElementById('screen-intro');
        if (screenIntro) screenIntro.classList.remove('hidden');

        if (playArea) playArea.classList.add('hidden'); // Forces play-area to stay hidden FIRST!

        try {
            await engine.startSession('radix', 'aprendiz');
        } catch (e) { }

        const introSpeech = document.getElementById('intro-speech-bubble');
        if (introSpeech) speakWord(introSpeech.innerText);
    };

    // Attach listener upfront right during load state flawlessly Node setup flawlessly trigger Node setup list!
    const btnIntro = document.getElementById('btn-comencar-intro');
    const screenIntro = document.getElementById('screen-intro');
    if (btnIntro) {
        btnIntro.onclick = () => {
            if (screenIntro) screenIntro.classList.add('hidden');
            if (playArea) playArea.classList.remove('hidden');
            loadWord();
        };
    }


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
        txtMystery.innerText = currentWord.palavra.replace(/[a-zA-Záéíóúâêôãõç]/g, '_ ').trim().toUpperCase();
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
        msg.rate = 0.95;
        msg.pitch = 1.25; // Adjusted for a teen boy voice

        // Enhance voice quality if better engines are available
        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find(v => v.lang.includes('pt-BR') && (v.name.includes('Google') || v.name.includes('Microsoft')));
        if (ptVoice) msg.voice = ptVoice;

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
                speakWord("Correto! Muito bem.");

                setTimeout(() => {
                    currentIndex++;
                    loadWord();
                }, 1500);
            } else {
                // Wrong = Game over
                txtMystery.innerText = correct.toUpperCase();
                txtMystery.style.color = "#EF4444";
                const errText = `Você soletrou incorretamente. A forma certa é: ${correct.toUpperCase()}`;
                speechBubble.innerText = errText;
                speakWord(`Errado. A forma certa é: ${correct.split('').join(', ')}.`);

                setTimeout(() => {
                    endGame(true);
                }, 3000);
            }
        }
    });

    // --- Reconhecimento de Voz (SpeechRecognition em PT-BR) ---
    const btnMic = document.getElementById('btn-mic');
    const micStatus = document.getElementById('mic-status');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    let isListening = false;
    let recognizer = null;

    const LETTER_NAMES = {
        'a': ['a', 'á', 'à', 'ã', 'â'],
        'b': ['b', 'be', 'bê'],
        'c': ['c', 'ce', 'cê', 'si'],
        'd': ['d', 'de', 'dê', 'di'],
        'e': ['e', 'é', 'ê'],
        'f': ['f', 'ef', 'efe', 'efi'],
        'g': ['g', 'ge', 'gê', 'ji'],
        'h': ['h', 'aga', 'agá', 'raga', 'rá'],
        'i': ['i', 'í'],
        'j': ['j', 'jota', 'jóta', 'je'],
        'k': ['k', 'ka', 'cá'],
        'l': ['l', 'el', 'ele', 'eli'],
        'm': ['m', 'em', 'eme', 'emi'],
        'n': ['n', 'en', 'ene', 'eni'],
        'o': ['o', 'ó', 'ô'],
        'p': ['p', 'pe', 'pê'],
        'q': ['q', 'que', 'quê'],
        'r': ['r', 'er', 'erre', 'erri'],
        's': ['s', 'es', 'esse', 'essi'],
        't': ['t', 'te', 'tê', 'ti'],
        'u': ['u', 'ú'],
        'v': ['v', 've', 'vê', 'vi'],
        'w': ['w', 'dablio', 'dábliu', 'dabliu'],
        'x': ['x', 'ex', 'xis', 'xiz'],
        'y': ['y', 'ipsilon', 'ípsilon'],
        'z': ['z', 'ze', 'zê', 'zi'],
        'ç': ['ç', 'cedilha', 'ce cedilha', 'cê cedilha']
    };

    const TOKEN_MAP = {};
    for (const [letter, synonyms] of Object.entries(LETTER_NAMES)) {
        for (const syn of synonyms) {
            TOKEN_MAP[syn] = letter;
        }
    }

    function parseSpokenLetters(text, targetWord) {
        if (!text) return '';
        const norm = (s) => (s || '').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
        const normTarget = norm(targetWord);
        const normText = norm(text);

        // 1. Se a pessoa falou a palavra inteira
        if (normTarget && (normText === normTarget || normText.includes(normTarget))) {
            return normTarget;
        }

        // 2. Se soletrou letra a letra
        const tokens = text.toLowerCase().replace(/[^a-z0-9áéíóúâêôãõç\s]/g, ' ').split(/\s+/).filter(Boolean);
        let result = '';

        for (const tok of tokens) {
            const cleanTok = tok.trim();
            if (cleanTok.length === 1 && /[a-zç]/i.test(cleanTok)) {
                result += cleanTok;
            } else if (TOKEN_MAP[cleanTok]) {
                result += TOKEN_MAP[cleanTok];
            } else {
                const normTok = norm(cleanTok);
                if (normTok.length === 1 && /[a-zç]/i.test(normTok)) {
                    result += normTok;
                } else if (TOKEN_MAP[normTok]) {
                    result += TOKEN_MAP[normTok];
                } else if (normTarget && normTok === normTarget) {
                    result += normTok;
                }
            }
        }

        return result;
    }

    if (SpeechRecognition) {
        recognizer = new SpeechRecognition();
        recognizer.lang = 'pt-BR';
        recognizer.continuous = true;
        recognizer.interimResults = true;

        recognizer.onresult = (e) => {
            const targetWord = currentWord ? currentWord.palavra : '';
            let accumulated = '';
            for (let i = 0; i < e.results.length; i++) {
                const text = e.results[i][0].transcript.trim();
                const letters = parseSpokenLetters(text, targetWord);
                if (letters) {
                    if (letters.toLowerCase() === targetWord.toLowerCase()) {
                        accumulated = targetWord.toLowerCase();
                        break;
                    }
                    accumulated += letters;
                }
            }
            if (accumulated) {
                const maxLen = targetWord.length || 15;
                const clean = accumulated.slice(0, maxLen).toUpperCase();
                inputAnswer.value = clean;

                if (clean.toLowerCase() === targetWord.toLowerCase()) {
                    stopMic();
                    const event = new KeyboardEvent('keydown', { key: 'Enter' });
                    inputAnswer.dispatchEvent(event);
                }
            }
        };

        recognizer.onerror = () => {
            stopMic();
        };

        recognizer.onend = () => {
            if (isListening) {
                try { recognizer.start(); } catch (err) { stopMic(); }
            }
        };

        function startMic() {
            try {
                isListening = true;
                recognizer.start();
                if (btnMic) btnMic.classList.add('animate-pulse', 'ring-4', 'ring-blue-400');
                if (micStatus) micStatus.classList.remove('hidden');
            } catch (e) {
                stopMic();
            }
        }

        function stopMic() {
            isListening = false;
            try { recognizer.stop(); } catch (e) {}
            if (btnMic) btnMic.classList.remove('animate-pulse', 'ring-4', 'ring-blue-400');
            if (micStatus) micStatus.classList.add('hidden');
        }

        if (btnMic) {
            btnMic.addEventListener('click', () => {
                if (isListening) {
                    stopMic();
                } else {
                    startMic();
                }
            });
        }
    } else if (btnMic) {
        btnMic.style.display = 'none';
    }

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
