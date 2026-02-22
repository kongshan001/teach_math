import { BaseGenerator } from '../core/QuestionGenerator.js';
import { Question, QuestionGeneratorOptions, Grade, DifficultyLevel, QuestionType } from '../types/Question.js';

export class Grade1Generator extends BaseGenerator {
    supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean {
        return grade === 1;
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
        const isAddition = Math.random() > 0.5;
        let a: number, b: number, answer: number, question: string, type: QuestionType;
        
        if (isAddition) {
            a = Math.floor(Math.random() * 9) + 1;
            b = Math.floor(Math.random() * (10 - a));
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        } else {
            a = Math.floor(Math.random() * 9) + 2;
            b = Math.floor(Math.random() * (a - 1)) + 1;
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        
        return this.createQuestion(question, answer, type, 1, 'basic', ['10以内加减法']);
    }
    
    private generateImproved(): Question {
        const isAddition = Math.random() > 0.5;
        let a: number, b: number, answer: number, question: string, type: QuestionType;
        
        if (isAddition) {
            a = Math.floor(Math.random() * 15) + 5;
            b = Math.floor(Math.random() * (20 - a));
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        } else {
            a = Math.floor(Math.random() * 10) + 10;
            b = Math.floor(Math.random() * (a - 1)) + 1;
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        
        return this.createQuestion(question, answer, type, 1, 'improved', ['20以内加减法']);
    }
    
    private generateChallenge(): Question {
        const isAddition = Math.random() > 0.5;
        let a: number, b: number, answer: number, question: string, type: QuestionType;
        
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
        } else {
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
