import { Grade1Generator } from '../generators/Grade1Generator.js';
import { Grade2Generator } from '../generators/Grade2Generator.js';
import { Grade3Generator } from '../generators/Grade3Generator.js';
import { Grade4Generator } from '../generators/Grade4Generator.js';
import { Grade5Generator } from '../generators/Grade5Generator.js';
import { Grade6Generator } from '../generators/Grade6Generator.js';
export class GradeQuestionFactory {
    constructor() {
        this.generators = [
            new Grade1Generator(),
            new Grade2Generator(),
            new Grade3Generator(),
            new Grade4Generator(),
            new Grade5Generator(),
            new Grade6Generator()
        ];
    }
    generate(options) {
        const { grade, difficultyLevel, count } = options;
        for (const generator of this.generators) {
            if (generator.supports(grade, difficultyLevel)) {
                return generator.generate({ grade, difficultyLevel, count });
            }
        }
        throw new Error(`No generator found for grade ${grade} and difficulty ${difficultyLevel}`);
    }
    supports(grade, difficultyLevel) {
        return this.generators.some(g => g.supports(grade, difficultyLevel));
    }
    getSupportedGrades() {
        return [1, 2, 3, 4, 5, 6];
    }
    getSupportedDifficultyLevels(grade) {
        return ['basic', 'improved', 'challenge'];
    }
}
//# sourceMappingURL=GradeQuestionFactory.js.map