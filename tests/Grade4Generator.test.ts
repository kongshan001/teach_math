import { describe, it, expect } from 'vitest';
import { Grade4Generator } from '../src/generators/Grade4Generator.js';
import type { Grade } from '../src/types/Question.js';

describe('Grade4Generator', () => {
    const generator = new Grade4Generator();

    describe('supports', () => {
        it('should support grade 4', () => {
            expect(generator.supports(4 as Grade, 'basic')).toBe(true);
            expect(generator.supports(4 as Grade, 'improved')).toBe(true);
            expect(generator.supports(4 as Grade, 'challenge')).toBe(true);
        });

        it('should not support other grades', () => {
            expect(generator.supports(3 as Grade, 'basic')).toBe(false);
            expect(generator.supports(5 as Grade, 'basic')).toBe(false);
        });
    });

    describe('generate - basic (三位数乘两位数)', () => {
        const questions = generator.generate({ grade: 4 as Grade, difficultyLevel: 'basic', count: 50 });

        it('should generate correct count', () => {
            expect(questions).toHaveLength(50);
        });

        it('should generate multiplication only', () => {
            questions.forEach(q => {
                expect(q.type).toBe('multiplication');
                expect(q.tags).toContain('三位数乘两位数');
            });
        });

        it('should have correct answers', () => {
            questions.forEach(q => {
                const match = q.question.match(/(\d+) × (\d+) =/);
                if (match) {
                    expect(q.answer).toBe(parseInt(match[1]) * parseInt(match[2]));
                }
            });
        });
    });

    describe('generate - improved (除数是两位数的除法)', () => {
        const questions = generator.generate({ grade: 4 as Grade, difficultyLevel: 'improved', count: 50 });

        it('should generate division', () => {
            questions.forEach(q => {
                expect(q.type).toBe('division');
                expect(q.tags).toContain('除数是两位数的除法');
            });
        });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(2);
            });
        });
    });

    describe('generate - challenge (四则混合运算)', () => {
        const questions = generator.generate({ grade: 4 as Grade, difficultyLevel: 'challenge', count: 50 });

        it('should generate composite operations', () => {
            questions.forEach(q => {
                expect(q.type).toBe('composite');
                expect(q.tags.some(t => t === '四则混合运算' || t === '含括号运算')).toBe(true);
            });
        });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(3);
            });
        });
    });
});
