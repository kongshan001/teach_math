import { BaseGenerator } from '../core/QuestionGenerator.js';
import { Question, QuestionGeneratorOptions, Grade, DifficultyLevel, QuestionType } from '../types/Question.js';

export class Grade4Generator extends BaseGenerator {
    supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean {
        return grade === 4;
    }
    
    generate(options: QuestionGeneratorOptions): Question[] {
        const { count, difficultyLevel } = options;
        const questions: Question[] = [];
        
        for (let i = 0; i < count; i++) {
            questions.push(this.generateQuestion(difficultyLevel));
        }
        
        return questions;
    }
    
    private generateQuestion(difficultyLevel: DifficultyLevel): Question {
        switch (difficultyLevel) {
            case 'basic':
                return this.generateBasic();
            case 'improved':
                return this.generateImproved();
            case 'challenge':
                return this.generateChallenge();
        }
    }
    
    private generateBasic(): Question {
        const a = Math.floor(Math.random() * 900) + 100;
        const b = Math.floor(Math.random() * 90) + 10;
        const answer = a * b;
        const question = `${a} × ${b} =`;
        
        return this.createQuestion(question, answer, 'multiplication', 4, 'basic', ['三位数乘两位数']);
    }
    
    private generateImproved(): Question {
        const dividend = Math.floor(Math.random() * 900) + 100;
        const divisor = Math.floor(Math.random() * 89) + 10;
        const quotient = Math.floor(dividend / divisor);
        const answer = quotient;
        const question = `${dividend} ÷ ${divisor} =`;
        
        return this.createQuestion(question, answer, 'division', 4, 'improved', ['除数是两位数的除法']);
    }
    
    private generateChallenge(): Question {
        const type = Math.random();
        
        if (type < 0.5) {
            const a = Math.floor(Math.random() * 20) + 5;
            const b = Math.floor(Math.random() * 20) + 5;
            const c = Math.floor(Math.random() * 10) + 1;
            const answer = (a + b) * c;
            const question = `(${a} + ${b}) × ${c} =`;
            return this.createQuestion(question, answer, 'composite', 4, 'challenge', ['四则混合运算']);
        } else if (type < 0.8) {
            const a = Math.floor(Math.random() * 50) + 20;
            const b = Math.floor(Math.random() * 10) + 2;
            const c = Math.floor(Math.random() * 20) + 5;
            const answer = a * b + c;
            const question = `${a} × ${b} + ${c} =`;
            return this.createQuestion(question, answer, 'composite', 4, 'challenge', ['四则混合运算']);
        } else {
            const a = Math.floor(Math.random() * 50) + 50;
            const b = Math.floor(Math.random() * 20) + 10;
            const c = Math.floor(Math.random() * (a - b)) + b;
            const answer = a - c;
            const question = `${a} - (${b} + ${c - b}) =`;
            return this.createQuestion(question, answer, 'composite', 4, 'challenge', ['含括号运算']);
        }
    }
}
