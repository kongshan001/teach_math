import { BaseGenerator } from '../core/QuestionGenerator.js';
import { Question, QuestionGeneratorOptions, Grade, DifficultyLevel } from '../types/Question.js';
export declare class Grade2Generator extends BaseGenerator {
    supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean;
    generate(options: QuestionGeneratorOptions): Question[];
    private generateQuestion;
    private generateBasic;
    private generateImproved;
    private generateChallenge;
}
//# sourceMappingURL=Grade2Generator.d.ts.map