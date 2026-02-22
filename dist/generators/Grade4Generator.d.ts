import { BaseGenerator } from '../core/QuestionGenerator.js';
import { Question, QuestionGeneratorOptions, Grade, DifficultyLevel } from '../types/Question.js';
export declare class Grade4Generator extends BaseGenerator {
    supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean;
    generate(options: QuestionGeneratorOptions): Question[];
    private generateQuestion;
    private generateBasic;
    private generateImproved;
    private generateChallenge;
}
//# sourceMappingURL=Grade4Generator.d.ts.map