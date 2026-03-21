import { BaseGenerator } from '../core/QuestionGenerator.js';
import { Question, QuestionGeneratorOptions, Grade, DifficultyLevel, QuestionType } from '../types/Question.js';

export class Grade2Generator extends BaseGenerator {
    supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean {
        return grade === 2;
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
        const isAddition = Math.random() > 0.5;
        let a: number, b: number, answer: number, question: string, type: QuestionType;
        
        if (isAddition) {
            a = Math.floor(Math.random() * 9) * 10;
            b = Math.floor(Math.random() * 9) * 10;
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        } else {
            a = Math.floor(Math.random() * 9 + 1) * 10;
            b = Math.floor(Math.random() * Math.floor(a / 10)) * 10;
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        
        return this.createQuestion(question, answer, type, 2, 'basic', ['整十数加减法']);
    }
    
    private generateImproved(): Question {
        const isAddition = Math.random() > 0.5;
        let a: number, b: number, answer: number, question: string, type: QuestionType;
        
        if (isAddition) {
            a = Math.floor(Math.random() * 90) + 10;
            b = Math.floor(Math.random() * (100 - a));
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        } else {
            a = Math.floor(Math.random() * 90) + 10;
            b = Math.floor(Math.random() * (a - 10)) + 10;
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        
        return this.createQuestion(question, answer, type, 2, 'improved', ['两位数加减法']);
    }
    
    private generateChallenge(): Question {
        const useThreeNumbers = Math.random() > 0.5;
        let a: number, b: number, c: number, answer: number, question: string;
        
        if (useThreeNumbers) {
            const isAddition = Math.random() > 0.5;
            a = Math.floor(Math.random() * 50) + 10;
            b = Math.floor(Math.random() * 50) + 10;
            c = Math.floor(Math.random() * 50) + 10;
            
            if (isAddition) {
                answer = a + b + c;
                question = `${a} + ${b} + ${c} =`;
            } else {
                answer = a + b - c;
                while (a + b - c < 0) {
                    c = Math.floor(Math.random() * (a + b - 1)) + 1;
                }
                answer = a + b - c;
                question = `${a} + ${b} - ${c} =`;
            }
        } else {
            a = Math.floor(Math.random() * 80) + 10;
            b = Math.floor(Math.random() * (a - 5)) + 5;
            c = Math.floor(Math.random() * (a - b)) + 1;
            answer = a - b + c;
            question = `${a} - ${b} + ${c} =`;
        }
        
        return this.createQuestion(question, answer, 'composite', 2, 'challenge', ['连加连减']);
    }
}
