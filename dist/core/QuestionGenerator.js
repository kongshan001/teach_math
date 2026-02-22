export class BaseGenerator {
    getDifficultyValue(level) {
        switch (level) {
            case 'basic': return 1;
            case 'improved': return 2;
            case 'challenge': return 3;
        }
    }
    getTimeLimit(difficulty) {
        switch (difficulty) {
            case 1: return 30;
            case 2: return 45;
            case 3: return 60;
        }
    }
    getGradeDescription(grade) {
        const descriptions = {
            1: '一年级',
            2: '二年级',
            3: '三年级',
            4: '四年级',
            5: '五年级',
            6: '六年级'
        };
        return descriptions[grade];
    }
    getDifficultyDescription(level) {
        const descriptions = {
            basic: '基础',
            improved: '提高',
            challenge: '挑战'
        };
        return descriptions[level];
    }
    createQuestion(question, answer, type, grade, difficultyLevel, tags) {
        const difficulty = this.getDifficultyValue(difficultyLevel);
        return {
            id: this.generateUUID(),
            question,
            answer,
            type,
            grade,
            difficulty,
            difficultyLevel,
            timeLimit: this.getTimeLimit(difficulty),
            tags,
            gradeDescription: `${this.getGradeDescription(grade)}-${this.getDifficultyDescription(difficultyLevel)}`
        };
    }
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
//# sourceMappingURL=QuestionGenerator.js.map