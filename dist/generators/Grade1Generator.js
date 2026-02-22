import { BaseGenerator } from '../core/QuestionGenerator.js';
export class Grade1Generator extends BaseGenerator {
    supports(grade, difficultyLevel) {
        return grade === 1;
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
        const isAddition = Math.random() > 0.5;
        let a, b, answer, question, type;
        if (isAddition) {
            a = Math.floor(Math.random() * 9) + 1;
            b = Math.floor(Math.random() * (10 - a));
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        }
        else {
            a = Math.floor(Math.random() * 9) + 2;
            b = Math.floor(Math.random() * (a - 1)) + 1;
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        return this.createQuestion(question, answer, type, 1, 'basic', ['10以内加减法']);
    }
    generateImproved() {
        const isAddition = Math.random() > 0.5;
        let a, b, answer, question, type;
        if (isAddition) {
            a = Math.floor(Math.random() * 15) + 5;
            b = Math.floor(Math.random() * (20 - a));
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        }
        else {
            a = Math.floor(Math.random() * 10) + 10;
            b = Math.floor(Math.random() * (a - 1)) + 1;
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        return this.createQuestion(question, answer, type, 1, 'improved', ['20以内加减法']);
    }
    generateChallenge() {
        const isAddition = Math.random() > 0.5;
        let a, b, answer, question, type;
        if (isAddition) {
            a = Math.floor(Math.random() * 10) + 10;
            b = Math.floor(Math.random() * 10) + 1;
            while (a + b <= 10) {
                a = Math.floor(Math.random() * 10) + 10;
                b = Math.floor(Math.random() * 10) + 1;
            }
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        }
        else {
            a = Math.floor(Math.random() * 10) + 10;
            b = Math.floor(Math.random() * 10) + 1;
            while (a <= b) {
                a = Math.floor(Math.random() * 10) + 10;
                b = Math.floor(Math.random() * 10) + 1;
            }
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        return this.createQuestion(question, answer, type, 1, 'challenge', ['20以内进位退位']);
    }
}
//# sourceMappingURL=Grade1Generator.js.map