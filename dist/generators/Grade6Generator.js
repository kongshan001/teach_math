import { BaseGenerator } from '../core/QuestionGenerator.js';
export class Grade6Generator extends BaseGenerator {
    supports(grade, difficultyLevel) {
        return grade === 6;
    }
    generate(options) {
        const { count, difficultyLevel } = options;
        const questions = [];
        for (let i = 0; i < count; i++) {
            questions.push(this.generateQuestion(difficultyLevel));
        }
        return questions;
    }
    generateQuestion(difficultyLevel) {
        switch (difficultyLevel) {
            case 'basic':
                return this.generateBasic();
            case 'improved':
                return this.generateImproved();
            case 'challenge':
                return this.generateChallenge();
        }
    }
    generateBasic() {
        const a = Math.floor(Math.random() * 20) + 2;
        const b = Math.floor(Math.random() * 20) + 2;
        const answer = a * b;
        const question = `${a}/${b}`;
        const simplified = this.simplifyFraction(a, b);
        return this.createQuestion(question, simplified, 'fraction', 6, 'basic', ['分数乘法']);
    }
    generateImproved() {
        const type = Math.random();
        if (type < 0.5) {
            const a = Math.floor(Math.random() * 20) + 2;
            const b = Math.floor(Math.random() * 20) + 2;
            const c = Math.floor(Math.random() * 10) + 2;
            const answer = a / b / c;
            const question = `${a}/${b} ÷ ${c} =`;
            return this.createQuestion(question, answer, 'fraction', 6, 'improved', ['分数除法']);
        }
        else {
            const base = Math.floor(Math.random() * 90) + 10;
            const percent = Math.floor(Math.random() * 50) + 10;
            const answer = base * percent / 100;
            const question = `${base} 的 ${percent}% =`;
            return this.createQuestion(question, answer, 'percentage', 6, 'improved', ['百分数']);
        }
    }
    generateChallenge() {
        const type = Math.random();
        if (type < 0.5) {
            const a = Math.floor(Math.random() * 8) + 2;
            const b = Math.floor(Math.random() * 8) + 2;
            const c = Math.floor(Math.random() * 8) + 2;
            const d = Math.floor(Math.random() * 8) + 2;
            const answer = (a / b) * (c / d);
            const question = `${a}/${b} × ${c}/${d} =`;
            return this.createQuestion(question, answer, 'fraction', 6, 'challenge', ['分数乘除法混合']);
        }
        else {
            const a = Math.floor(Math.random() * 9) + 2;
            const b = Math.floor(Math.random() * 9) + 2;
            const c = a;
            const d = Math.floor(Math.random() * (a * b - 1)) + 1;
            const answer = a / b;
            const ratio = `${a}:${b}`;
            const actual = `${c}:${d}`;
            const question = `已知 ${ratio} = ${actual}，求 ${c}:${d} 的比值`;
            return this.createQuestion(question, answer, 'ratio', 6, 'challenge', ['比例和比例尺']);
        }
    }
    simplifyFraction(numerator, denominator) {
        const gcd = this.gcd(numerator, denominator);
        return numerator / gcd / (denominator / gcd);
    }
    gcd(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    }
}
//# sourceMappingURL=Grade6Generator.js.map