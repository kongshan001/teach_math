import { Question, QuestionGenerator, QuestionGeneratorOptions, Grade, DifficultyLevel } from '../types/Question.js';

export abstract class BaseGenerator implements QuestionGenerator {
    abstract generate(options: QuestionGeneratorOptions): Question[];
    
    abstract supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean;
    
    protected getDifficultyValue(level: DifficultyLevel): 1 | 2 | 3 {
        switch (level) {
            case 'basic': return 1;
            case 'improved': return 2;
            case 'challenge': return 3;
        }
    }
    
    protected getTimeLimit(difficulty: 1 | 2 | 3): number {
        switch (difficulty) {
            case 1: return 30;
            case 2: return 45;
            case 3: return 60;
        }
    }
    
    protected getGradeDescription(grade: Grade): string {
        const descriptions: Record<Grade, string> = {
            1: '一年级',
            2: '二年级',
            3: '三年级',
            4: '四年级',
            5: '五年级',
            6: '六年级'
        };
        return descriptions[grade];
    }
    
    protected getDifficultyDescription(level: DifficultyLevel): string {
        const descriptions: Record<DifficultyLevel, string> = {
            basic: '基础',
            improved: '提高',
            challenge: '挑战'
        };
        return descriptions[level];
    }
    
    protected createQuestion(
        question: string,
        answer: number,
        type: Question['type'],
        grade: Grade,
        difficultyLevel: DifficultyLevel,
        tags: string[]
    ): Question {
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
    
    protected generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
