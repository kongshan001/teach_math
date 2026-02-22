export type QuestionType = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'composite' | 'fraction' | 'decimal' | 'percentage' | 'ratio';

export type Difficulty = 1 | 2 | 3;

export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

export type DifficultyLevel = 'basic' | 'improved' | 'challenge';

export interface Question {
    id: string;
    question: string;
    answer: number;
    type: QuestionType;
    grade: Grade;
    difficulty: Difficulty;
    difficultyLevel: DifficultyLevel;
    timeLimit: number;
    tags: string[];
    gradeDescription: string;
}

export interface QuestionGeneratorOptions {
    grade: Grade;
    difficultyLevel: DifficultyLevel;
    count: number;
}

export interface QuestionGenerator {
    generate(options: QuestionGeneratorOptions): Question[];
    supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean;
}

export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
