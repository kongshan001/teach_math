import { describe, it, expect } from 'vitest';
import { Grade6Generator } from '../src/generators/Grade6Generator.js';
import type { Grade } from '../src/types/Question.js';

describe('Grade6Generator', () => {
    const generator = new Grade6Generator();

    describe('supports', () => {
        it('should support grade 6', () => {
            expect(generator.supports(6 as Grade, 'basic')).toBe(true);
            expect(generator.supports(6 as Grade, 'improved')).toBe(true);
            expect(generator.supports(6 as Grade, 'challenge')).toBe(true);
        });

        it('should not support other grades', () => {
            expect(generator.supports(5 as Grade, 'basic')).toBe(false);
            expect(generator.supports(1 as Grade, 'basic')).toBe(false);
        });
    });

    describe('generate - basic (分数乘法)', () => {
        const questions = generator.generate({ grade: 6 as Grade, difficultyLevel: 'basic', count: 50 });

        it('should generate fraction operations', () => {
            questions.forEach(q => {
                expect(q.type).toBe('fraction');
                expect(q.tags).toContain('分数乘法');
            });
        });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(1);
            });
        });
    });

    describe('generate - improved (分数除法 + 百分数)', () => {
        const questions = generator.generate({ grade: 6 as Grade, difficultyLevel: 'improved', count: 50 });

        it('should generate division or percentage', () => {
            const types = questions.map(q => q.type);
            expect(types.some(t => t === 'fraction' || t === 'percentage')).toBe(true);
        });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(2);
            });
        });
    });

    describe('generate - challenge (分数乘除法混合 + 比例)', () => {
        const questions = generator.generate({ grade: 6 as Grade, difficultyLevel: 'challenge', count: 50 });

        it('should generate various types', () => {
            const types = questions.map(q => q.type);
            expect(types.some(t => t === 'fraction' || t === 'ratio')).toBe(true);
        });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(3);
            });
        });
    });
});
