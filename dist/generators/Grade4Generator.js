import { BaseGenerator } from '../core/QuestionGenerator.js';
export class Grade4Generator extends BaseGenerator {
    supports(grade, difficultyLevel) {
        return grade === 4;
    }
    generate(options) {
        const { count, difficultyLevel } = options;
        const questions = [];
        for (let i = 0; i < count; i++) {
            questions.push(this.generateQuestion(difficultyLevel));
        }
        return questions;
    }
    generateQuestion(difficultyLevel) {
        switch (difficultyLevel) {
            case 'basic':
                return this.generateBasic();
            case 'improved':
                return this.generateImproved();
            case 'challenge':
                return this.generateChallenge();
        }
    }
    generateBasic() {
        const a = Math.floor(Math.random() * 900) + 100;
        const b = Math.floor(Math.random() * 90) + 10;
        const answer = a * b;
        const question = `${a} × ${b} =`;
        return this.createQuestion(question, answer, 'multiplication', 4, 'basic', ['三位数乘两位数']);
    }
    generateImproved() {
        const dividend = Math.floor(Math.random() * 900) + 100;
        const divisor = Math.floor(Math.random() * 89) + 10;
        const quotient = Math.floor(dividend / divisor);
        const answer = quotient;
        const question = `${dividend} ÷ ${divisor} =`;
        return this.createQuestion(question, answer, 'division', 4, 'improved', ['除数是两位数的除法']);
    }
    generateChallenge() {
        const type = Math.random();
        if (type < 0.5) {
            const a = Math.floor(Math.random() * 20) + 5;
            const b = Math.floor(Math.random() * 20) + 5;
            const c = Math.floor(Math.random() * 10) + 1;
            const answer = (a + b) * c;
            const question = `(${a} + ${b}) × ${c} =`;
            return this.createQuestion(question, answer, 'composite', 4, 'challenge', ['四则混合运算']);
        }
        else if (type < 0.8) {
            const a = Math.floor(Math.random() * 50) + 20;
            const b = Math.floor(Math.random() * 10) + 2;
            const c = Math.floor(Math.random() * 20) + 5;
            const answer = a * b + c;
            const question = `${a} × ${b} + ${c} =`;
            return this.createQuestion(question, answer, 'composite', 4, 'challenge', ['四则混合运算']);
        }
        else {
            const a = Math.floor(Math.random() * 50) + 50;
            const b = Math.floor(Math.random() * 20) + 10;
            const c = Math.floor(Math.random() * (a - b)) + b;
            const answer = a - c;
            const question = `${a} - (${b} + ${c - b}) =`;
            return this.createQuestion(question, answer, 'composite', 4, 'challenge', ['含括号运算']);
        }
    }
}
//# sourceMappingURL=Grade4Generator.js.map