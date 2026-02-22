import { describe, it, expect } from 'vitest';
import { Grade1Generator } from '../src/generators/Grade1Generator.js';
import type { Grade, DifficultyLevel, Question } from '../src/types/Question.js';

describe('Grade1Generator', () => {
    const generator = new Grade1Generator();

    describe('supports', () => {
        it('should support grade 1', () => {
            expect(generator.supports(1 as Grade, 'basic')).toBe(true);
            expect(generator.supports(1 as Grade, 'improved')).toBe(true);
            expect(generator.supports(1 as Grade, 'challenge')).toBe(true);
        });

        it('should not support other grades', () => {
            expect(generator.supports(2 as Grade, 'basic')).toBe(false);
            expect(generator.supports(3 as Grade, 'basic')).toBe(false);
        });
    });

    describe('generate', () => {
        it('should generate basic questions with numbers 1-10', () => {
            const questions = generator.generate({ grade: 1 as Grade, difficultyLevel: 'basic', count: 50 });
            expect(questions).toHaveLength(50);
            
            questions.forEach(q => {
                expect(q.grade).toBe(1);
                expect(q.difficultyLevel).toBe('basic');
                expect(q.difficulty).toBe(1);
                expect(q.tags).toContain('10以内加减法');
            });
        });

        it('should generate improved questions with numbers 5-20', () => {
            const questions = generator.generate({ grade: 1 as Grade, difficultyLevel: 'improved', count: 50 });
            expect(questions).toHaveLength(50);
            
            questions.forEach(q => {
                expect(q.grade).toBe(1);
                expect(q.difficultyLevel).toBe('improved');
                expect(q.difficulty).toBe(2);
                expect(q.tags).toContain('20以内加减法');
            });
        });

        it('should generate challenge questions with carry/borrow', () => {
            const questions = generator.generate({ grade: 1 as Grade, difficultyLevel: 'challenge', count: 50 });
            expect(questions).toHaveLength(50);
            
            questions.forEach(q => {
                expect(q.grade).toBe(1);
                expect(q.difficultyLevel).toBe('challenge');
                expect(q.difficulty).toBe(3);
                expect(q.tags).toContain('20以内进位退位');
            });
        });

        it('should generate correct answers for addition', () => {
            const questions = generator.generate({ grade: 1 as Grade, difficultyLevel: 'basic', count: 100 });
            
            questions.forEach(q => {
                const match = q.question.match(/(\d+) \+ (\d+) =/);
                if (match) {
                    const a = parseInt(match[1]);
                    const b = parseInt(match[2]);
                    expect(q.answer).toBe(a + b);
                }
            });
        });

        it('should generate correct answers for subtraction', () => {
            const questions = generator.generate({ grade: 1 as Grade, difficultyLevel: 'improved', count: 100 });
            
            questions.forEach(q => {
                const match = q.question.match(/(\d+) - (\d+) =/);
                if (match) {
                    const a = parseInt(match[1]);
                    const b = parseInt(match[2]);
                    expect(q.answer).toBe(a - b);
                }
            });
        });
    });
});
