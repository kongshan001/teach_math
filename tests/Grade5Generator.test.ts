import { describe, it, expect } from 'vitest';
import { Grade5Generator } from '../src/generators/Grade5Generator.js';
import type { Grade } from '../src/types/Question.js';

describe('Grade5Generator', () => {
    const generator = new Grade5Generator();

    describe('supports', () => {
        it('should support grade 5', () => {
            expect(generator.supports(5 as Grade, 'basic')).toBe(true);
            expect(generator.supports(5 as Grade, 'improved')).toBe(true);
            expect(generator.supports(5 as Grade, 'challenge')).toBe(true);
        });

        it('should not support other grades', () => {
            expect(generator.supports(4 as Grade, 'basic')).toBe(false);
            expect(generator.supports(6 as Grade, 'basic')).toBe(false);
        });
    });

    describe('generate - basic (小数加减法)', () => {
        const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'basic', count: 50 });

        it('should generate decimal operations', () => {
            questions.forEach(q => {
                expect(q.type).toBe('decimal');
                expect(q.tags).toContain('小数加减法');
            });
        });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(1);
            });
        });
    });

    describe('generate - improved (小数乘除法)', () => {
        const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'improved', count: 50 });

        it('should generate decimal multiplication', () => {
            questions.forEach(q => {
                expect(q.type).toBe('decimal');
                expect(q.tags).toContain('小数乘除法');
            });
        });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(2);
            });
        });
    });

    describe('generate - challenge (分数加减法)', () => {
        const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'challenge', count: 50 });

        it('should generate fraction operations', () => {
            questions.forEach(q => {
                expect(q.type).toBe('fraction');
                expect(q.tags).toContain('分数加减法');
            });
        });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(3);
            });
        });
    });
});
