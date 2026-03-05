/**
 * Desafio dos Sábios - Quiz Service
 */
export class QuizService {
    constructor(baseUrl = '/desafio-dos-sabios/api') {
        this.baseUrl = baseUrl;
    }

    async getQuestions(filters = {}) {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${this.baseUrl}/questions/?${params.toString()}`);
        return response.json();
    }

    async validateAnswer(questionId, userAnswer) {
        const response = await fetch(`${this.baseUrl}/validate/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questionId, userAnswer })
        });
        return response.json();
    }

    async getSubjects() {
        const response = await fetch(`${this.baseUrl}/subjects/`);
        return response.json();
    }

    async getTopics(subject) {
        const response = await fetch(`${this.baseUrl}/topics/?subject=${encodeURIComponent(subject)}`);
        return response.json();
    }
}
