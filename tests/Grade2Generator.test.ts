import { describe, it, expect } from 'vitest';
import { Grade2Generator } from '../src/generators/Grade2Generator.js';
import type { Grade, DifficultyLevel } from '../src/types/Question.js';

describe('Grade2Generator', () => {
    const generator = new Grade2Generator();

    describe('supports', () => {
        it('should support grade 2', () => {
            expect(generator.supports(2 as Grade, 'basic')).toBe(true);
            expect(generator.supports(2 as Grade, 'improved')).toBe(true);
            expect(generator.supports(2 as Grade, 'challenge')).toBe(true);
        });

        it('should not support other grades', () => {
            expect(generator.supports(1 as Grade, 'basic')).toBe(false);
            expect(generator.supports(3 as Grade, 'basic')).toBe(false);
        });
    });

    describe('generate - basic (整十数)', () => {
        const questions = generator.generate({ grade: 2 as Grade, difficultyLevel: 'basic', count: 50 });

        it('should generate correct count', () => {
            expect(questions).toHaveLength(50);
        });

        it('should have correct grade and difficulty', () => {
            questions.forEach(q => {
                expect(q.grade).toBe(2);
                expect(q.difficultyLevel).toBe('basic');
                expect(q.difficulty).toBe(1);
                expect(q.tags).toContain('整十数加减法');
            });
        });

        it('should generate multiples of 10', () => {
            questions.forEach(q => {
                const nums = q.question.match(/\d+/g);
                if (nums) {
                    nums.forEach(num => {
                        expect(parseInt(num) % 10).toBe(0);
                    });
                }
            });
        });

        it('should have correct answers', () => {
            questions.forEach(q => {
                const match = q.question.match(/(\d+) \+ (\d+) =/);
                if (match) {
                    expect(q.answer).toBe(parseInt(match[1]) + parseInt(match[2]));
                }
                const subMatch = q.question.match(/(\d+) - (\d+) =/);
                if (subMatch) {
                    expect(q.answer).toBe(parseInt(subMatch[1]) - parseInt(subMatch[2]));
                }
            });
        });
    });

    describe('generate - improved (两位数)', () => {
        const questions = generator.generate({ grade: 2 as Grade, difficultyLevel: 'improved', count: 50 });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficultyLevel).toBe('improved');
                expect(q.difficulty).toBe(2);
                expect(q.tags).toContain('两位数加减法');
            });
        });
    });

    describe('generate - challenge (连加连减)', () => {
        const questions = generator.generate({ grade: 2 as Grade, difficultyLevel: 'challenge', count: 50 });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficultyLevel).toBe('challenge');
                expect(q.difficulty).toBe(3);
                expect(q.tags).toContain('连加连减');
            });
        });

        it('should generate composite operations', () => {
            questions.forEach(q => {
                expect(q.type).toBe('composite');
            });
        });
    });
});
