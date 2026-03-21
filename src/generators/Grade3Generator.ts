import { BaseGenerator } from '../core/QuestionGenerator.js';
import { Question, QuestionGeneratorOptions, Grade, DifficultyLevel, QuestionType } from '../types/Question.js';

export class Grade3Generator extends BaseGenerator {
    supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean {
        return grade === 3;
    }
    
    generate(options: QuestionGeneratorOptions): Question[] {
        const { count, difficultyLevel } = this.validateAndNormalizeOptions(options);
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
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        const answer = a * b;
        const question = `${a} × ${b} =`;
        
        return this.createQuestion(question, answer, 'multiplication', 3, 'basic', ['表内乘法']);
    }
    
    private generateImproved(): Question {
        const isMultiplication = Math.random() > 0.3;
        
        if (isMultiplication) {
            const a = Math.floor(Math.random() * 9) + 1;
            const b = Math.floor(Math.random() * 9) + 1;
            const answer = a * b;
            const question = `${a} × ${b} =`;
            return this.createQuestion(question, answer, 'multiplication', 3, 'improved', ['表内乘法', '除法入门']);
        } else {
            const dividend = Math.floor(Math.random() * 81) + 1;
            const divisor = Math.floor(Math.random() * 8) + 1;
            const quotient = Math.floor(dividend / divisor);
            const answer = quotient;
            const question = `${dividend} ÷ ${divisor} =`;
            return this.createQuestion(question, answer, 'division', 3, 'improved', ['除法入门']);
        }
    }
    
    private generateChallenge(): Question {
        const type = Math.random();
        
        if (type < 0.4) {
            const a = Math.floor(Math.random() * 90) + 10;
            const b = Math.floor(Math.random() * 8) + 2;
            const answer = a * b;
            const question = `${a} × ${b} =`;
            return this.createQuestion(question, answer, 'multiplication', 3, 'challenge', ['两位数乘一位数']);
        } else if (type < 0.7) {
            const numerator = Math.floor(Math.random() * 8) + 2;
            const denominator = Math.floor(Math.random() * (numerator - 1)) + 2;
            const answer = numerator / denominator;
            const question = `${numerator}/${denominator}`;
            return this.createQuestion(question, answer, 'fraction', 3, 'challenge', ['分数认识']);
        } else {
            const a = Math.floor(Math.random() * 9) + 1;
            const b = Math.floor(Math.random() * 9) + 1;
            const c = Math.floor(Math.random() * 9) + 1;
            const answer = a * b * c;
            const question = `${a} × ${b} × ${c} =`;
            return this.createQuestion(question, answer, 'multiplication', 3, 'challenge', ['连乘']);
        }
    }
}
