import { Question, QuestionGenerator, QuestionGeneratorOptions, Grade, DifficultyLevel } from '../types/Question.js';
export declare abstract class BaseGenerator implements QuestionGenerator {
    abstract generate(options: QuestionGeneratorOptions): Question[];
    abstract supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean;
    protected getDifficultyValue(level: DifficultyLevel): 1 | 2 | 3;
    protected getTimeLimit(difficulty: 1 | 2 | 3): number;
    protected getGradeDescription(grade: Grade): string;
    protected getDifficultyDescription(level: DifficultyLevel): string;
    protected createQuestion(question: string, answer: number, type: Question['type'], grade: Grade, difficultyLevel: DifficultyLevel, tags: string[]): Question;
    protected generateUUID(): string;
}
//# sourceMappingURL=QuestionGenerator.d.ts.map