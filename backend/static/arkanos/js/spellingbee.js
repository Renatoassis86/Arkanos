/**
 * Arkanos Spelling Bee - Core Logic
 * Optimized for Premium RPG Experience
 */

class SpellingBeeGame {
    constructor(config) {
        this.words = config.words || [];
        this.currentIndex = -1;
        this.score = 0;
        this.streak = 0;
        this.level = 1;
        this.xp = config.initialXp || 0;
        this.history = [];
        this.isListening = false;
        this.engine = config.engine; // GameEngine instance
        this.elements = config.elements; // DOM elements

        this.recognition = this.initRecognition();
        this.synth = window.speechSynthesis;
        this.voices = [];

        // Handle async voice loading
        if (this.synth) {
            this.synth.onvoiceschanged = () => {
                this.voices = this.synth.getVoices();
            };
            this.voices = this.synth.getVoices();
        }

        this.sounds = {
            correct: new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'),
            wrong: new Audio('https://assets.mixkit.co/active_storage/sfx/2959/2959-preview.mp3'),
            start: new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'),
            gameover: new Audio('https://assets.mixkit.co/active_storage/sfx/2015/2015-preview.mp3'),
            levelup: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3')
        };
    }

    playSound(name) {
        const sound = this.sounds[name];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Audio play blocked:", e));
        }
    }

    initRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition not supported in this browser.");
            return null;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.continuous = false;
        return recognition;
    }

    normalize(text) {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z]/g, "")
            .trim();
    }

    speak(text, rate = 0.85) {
        if (!this.synth) return;
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        utterance.pitch = 0.85;

        // Ensure voices are available
        let availableVoices = this.synth.getVoices();

        const maleVoice = availableVoices.find(v => v.lang.startsWith('en') && (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Guy'))) ||
            availableVoices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) ||
            availableVoices.find(v => v.lang.startsWith('en'));

        if (maleVoice) utterance.voice = maleVoice;

        // Some browsers need a short delay or repeated call if voices are still loading
        if (availableVoices.length === 0) {
            this.synth.onvoiceschanged = () => {
                const refreshedVoices = this.synth.getVoices();
                const v = refreshedVoices.find(v => v.lang.startsWith('en'));
                if (v) utterance.voice = v;
                this.synth.speak(utterance);
            };
        } else {
            this.synth.speak(utterance);
        }
    }

    getDetailedFeedback(correct, spoken) {
        const c = this.normalize(correct);
        const s = this.normalize(spoken);
        if (c === s) return null;
        if (s.length === 0) return "I didn't hear anything. Try spelling it out loud!";

        for (let i = 0; i < Math.max(c.length, s.length); i++) {
            if (c[i] !== s[i]) {
                const pos = i + 1;
                const expected = c[i] || 'nothing';
                const actual = s[i] || 'nothing';
                return `Almost! At position ${pos}, I expected '${expected.toUpperCase()}' but I heard '${actual.toUpperCase()}'.`;
            }
        }
        return `You said '${spoken}'. The correct word is '${correct}'.`;
    }

    async processAnswer(spokenText) {
        const currentWordData = this.words[this.currentIndex];
        const correctWord = currentWordData.palavra;
        const feedback = this.getDetailedFeedback(correctWord, spokenText);

        if (!feedback) {
            this.score += 10;
            this.xp += 15;
            this.streak += 1;
            this.playSound('correct');
            this.speak(`Victory! ${correctWord} is correct!`, 0.9);
            return { success: true };
        } else {
            this.streak = 0;
            this.playSound('wrong');
            const explanation = `The correct spelling is ${correctWord.split('').join(', ')}.`;
            this.speak(`${explanation} Game over, traveler.`, 0.82);

            // Update Ranking Permanente UI
            const rankingData = await this.engine.getLeaderboard();
            const rankingList = this.elements.rankingList;
            if (rankingList && rankingData) {
                const rankingHtml = rankingData.map((p, i) => `
                    <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05); background:${i < 3 ? 'rgba(251,191,36,0.05)' : 'transparent'}">
                        <span style="font-weight:700; color:${i < 3 ? '#fbbf24' : '#fff'}">#${i + 1} ${p.username.toUpperCase()}</span>
                        <span style="color:var(--text-muted)">${p.xp} XP</span>
                    </div>
                `).join('');

                rankingList.innerHTML = `
                    <h3 style="color:#fbbf24; margin-bottom:15px; font-family:'Cinzel', serif; text-align:center; letter-spacing:1px;">RANKING PERMANENTE</h3>
                    ${rankingHtml}
                `;
            }

            return {
                success: false,
                gameOver: true,
                message: feedback,
                explanation: explanation
            };
        }
    }

    startListening() {
        if (!this.recognition) return Promise.reject("Not supported");
        this.isListening = true;
        console.log("Starting voice recognition...");

        try {
            this.recognition.start();
        } catch (e) {
            console.error("Recognition already started or error:", e);
        }

        return new Promise((resolve) => {
            this.recognition.onstart = () => {
                console.log("Microphone is active");
            };
            this.recognition.onresult = (event) => {
                this.isListening = false;
                const transcript = event.results[0][0].transcript;
                console.log("Result received:", transcript);
                resolve(transcript);
            };
            this.recognition.onerror = (event) => {
                this.isListening = false;
                console.error("Recognition error:", event.error);
                resolve("");
            };
            this.recognition.onend = () => {
                this.isListening = false;
                console.log("Recognition ended");
            };
        });
    }

    nextWord() {
        this.currentIndex++;
        if (this.currentIndex >= this.words.length) return null;
        return this.words[this.currentIndex];
    }

    promptWord(word, extra = "") {
        this.speak(`${word}.`, 0.85);
        setTimeout(() => {
            if (extra) this.speak(`${extra}. Again: ${word}.`, 0.85);
            else this.speak(`Spell the word: ${word}.`, 0.85);
        }, 1200);
    }
}

