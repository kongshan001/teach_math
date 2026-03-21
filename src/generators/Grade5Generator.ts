import { BaseGenerator } from '../core/QuestionGenerator.js';
import { Question, QuestionGeneratorOptions, Grade, DifficultyLevel, QuestionType } from '../types/Question.js';

export class Grade5Generator extends BaseGenerator {
    supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean {
        return grade === 5;
    }
    
    generate(options: QuestionGeneratorOptions): Question[] {
        // DEV-002: 使用参数验证
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
        const a = Math.floor(Math.random() * 90) + 10;
        const b = Math.floor(Math.random() * 90) + 10;
        const decimals = Math.random() > 0.5 ? 1 : 2;
        
        const aDecimal = this.toDecimal(a, decimals);
        const bDecimal = this.toDecimal(b, decimals);
        // DEV-001: 修复小数精度问题，确保答案精确到两位小数
        const answer = Math.round((aDecimal + bDecimal) * 100) / 100;
        const question = `${aDecimal.toFixed(decimals)} + ${bDecimal.toFixed(decimals)} =`;
        
        return this.createQuestion(question, answer, 'decimal', 5, 'basic', ['小数加减法']);
    }
    
    private generateImproved(): Question {
        const a = Math.floor(Math.random() * 90) + 10;
        const b = Math.floor(Math.random() * 8) + 2;
        const decimals = Math.random() > 0.5 ? 1 : 2;
        
        const aDecimal = this.toDecimal(a, decimals);
        const bDecimal = this.toDecimal(b, decimals);
        // DEV-001: 修复小数精度问题，确保答案精确到两位小数
        const answer = Math.round((aDecimal * bDecimal) * 100) / 100;
        const question = `${aDecimal.toFixed(decimals)} × ${bDecimal.toFixed(decimals)} =`;
        
        return this.createQuestion(question, answer, 'decimal', 5, 'improved', ['小数乘除法']);
    }
    
    private generateChallenge(): Question {
        let numerator1 = Math.floor(Math.random() * 8) + 2;
        let denominator1 = Math.floor(Math.random() * (numerator1 - 1)) + 2;
        let numerator2 = Math.floor(Math.random() * 8) + 2;
        let denominator2 = Math.floor(Math.random() * (numerator2 - 1)) + 2;
        
        const isAddition = Math.random() > 0.5;
        let answer: number;
        let question: string;
        
        if (isAddition) {
            const commonDenom = denominator1 * denominator2;
            const newNumerator1 = numerator1 * denominator2;
            const newNumerator2 = numerator2 * denominator1;
            // DEV-001: 修复小数精度问题，确保答案精确到两位小数
            answer = Math.round(((newNumerator1 + newNumerator2) / commonDenom) * 100) / 100;
            question = `${numerator1}/${denominator1} + ${numerator2}/${denominator2} =`;
        } else {
            const commonDenom = denominator1 * denominator2;
            const newNumerator1 = numerator1 * denominator2;
            const newNumerator2 = numerator2 * denominator1;
            // DEV-001: 修复小数精度问题，确保答案精确到两位小数
            answer = Math.round(((newNumerator1 - newNumerator2) / commonDenom) * 100) / 100;
            if (answer < 0) {
                [numerator1, numerator2] = [numerator2, numerator1];
                [denominator1, denominator2] = [denominator2, denominator1];
                const newN1 = numerator1 * denominator2;
                const newN2 = numerator2 * denominator1;
                // DEV-001: 修复小数精度问题，确保答案精确到两位小数
                answer = Math.round(Math.abs((newN1 - newN2) / (denominator1 * denominator2)) * 100) / 100;
            }
            question = `${numerator1}/${denominator1} - ${numerator2}/${denominator2} =`;
        }
        
        return this.createQuestion(question, answer, 'fraction', 5, 'challenge', ['分数加减法']);
    }
    
    private toDecimal(num: number, decimals: number): number {
        const multiplier = Math.pow(10, decimals);
        return Math.round((Math.random() * num) * multiplier) / multiplier;
    }
}
