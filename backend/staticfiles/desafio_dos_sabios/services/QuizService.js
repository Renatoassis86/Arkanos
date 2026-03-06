/**
 * Desafio dos Sábios - Quiz Service
 */
export class QuizService {
    constructor(baseUrl = '/desafio-dos-sabios/api') {
        this.baseUrl = baseUrl;
    }

    async getQuestions(filters = {}) {
        // topics -> topic_id
        if (filters.topic) {
            filters.topic_id = filters.topic;
            delete filters.topic;
        }
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

    async getGrades() {
        const response = await fetch(`${this.baseUrl}/grades/`);
        return response.json();
    }

    async getAssessments(gradeId, subjectId) {
        const response = await fetch(`${this.baseUrl}/assessments/?grade_id=${gradeId}&subject_id=${subjectId}`);
        return response.json();
    }

    async getTopics(subjectId, assessmentId) {
        let url = `${this.baseUrl}/topics/?subject_id=${subjectId}`;
        if (assessmentId) url += `&assessment_id=${assessmentId}`;
        const response = await fetch(url);
        return response.json();
    }
}
