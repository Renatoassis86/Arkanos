/**
 * Arkanos Game Engine - Core
 * Centralized logic for sessions, scoring and progression.
 */

export class GameEngine {
    constructor(config = {}) {
        this.baseUrl = config.baseUrl || '/api/game-engine';
        this.sessionId = null;
        this.gameKey = null;
        this.mode = null;
    }

    async startSession(gameKey, mode = 'aprendiz', context = {}) {
        this.gameKey = gameKey;
        this.mode = mode;
        const response = await fetch(`${this.baseUrl}/games/session/start/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameKey, mode, context })
        });
        const data = await response.json();
        this.sessionId = data.sessionId;
        return data.sessionId;
    }

    async registerEvent(type, payload = {}) {
        if (!this.sessionId) return;
        return fetch(`${this.baseUrl}/games/session/event/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: this.sessionId, type, payload })
        });
    }

    async finishSession(finalScore) {
        if (!this.sessionId) return;
        const response = await fetch(`${this.baseUrl}/games/session/finish/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: this.sessionId, finalScore })
        });
        return response.json();
    }

    async getProgress() {
        const response = await fetch(`${this.baseUrl}/progress/me/`);
        return response.json();
    }

    async getLeaderboard(scopeType = 'global', scopeKey = null) {
        const url = `${this.baseUrl}/leaderboard/?scopeType=${scopeType}${scopeKey ? `&scopeKey=${scopeKey}` : ''}`;
        const response = await fetch(url);
        return response.json();
    }
}

// Export a singleton instance if needed, or just the class
export default GameEngine;
