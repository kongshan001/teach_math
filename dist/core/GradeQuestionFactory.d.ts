import { Question, QuestionGeneratorOptions, Grade, DifficultyLevel } from '../types/Question.js';
export declare class GradeQuestionFactory {
    private generators;
    constructor();
    generate(options: QuestionGeneratorOptions): Question[];
    supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean;
    getSupportedGrades(): Grade[];
    getSupportedDifficultyLevels(grade: Grade): DifficultyLevel[];
}
//# sourceMappingURL=GradeQuestionFactory.d.ts.map