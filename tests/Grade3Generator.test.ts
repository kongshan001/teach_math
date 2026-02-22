import { describe, it, expect } from 'vitest';
import { Grade3Generator } from '../src/generators/Grade3Generator.js';
import type { Grade } from '../src/types/Question.js';

describe('Grade3Generator', () => {
    const generator = new Grade3Generator();

    describe('supports', () => {
        it('should support grade 3', () => {
            expect(generator.supports(3 as Grade, 'basic')).toBe(true);
            expect(generator.supports(3 as Grade, 'improved')).toBe(true);
            expect(generator.supports(3 as Grade, 'challenge')).toBe(true);
        });

        it('should not support other grades', () => {
            expect(generator.supports(2 as Grade, 'basic')).toBe(false);
            expect(generator.supports(4 as Grade, 'basic')).toBe(false);
        });
    });

    describe('generate - basic (表内乘法 1-5)', () => {
        const questions = generator.generate({ grade: 3 as Grade, difficultyLevel: 'basic', count: 50 });

        it('should generate multiplication only', () => {
            questions.forEach(q => {
                expect(q.type).toBe('multiplication');
                expect(q.tags).toContain('表内乘法');
            });
        });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(1);
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

    describe('generate - improved (表内乘法 + 除法)', () => {
        const questions = generator.generate({ grade: 3 as Grade, difficultyLevel: 'improved', count: 50 });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(2);
            });
        });

        it('should contain division or multiplication', () => {
            const types = questions.map(q => q.type);
            expect(types.some(t => t === 'multiplication' || t === 'division')).toBe(true);
        });
    });

    describe('generate - challenge (两位数乘一位数 + 分数 + 连乘)', () => {
        const questions = generator.generate({ grade: 3 as Grade, difficultyLevel: 'challenge', count: 50 });

        it('should have correct difficulty', () => {
            questions.forEach(q => {
                expect(q.difficulty).toBe(3);
            });
        });

        it('should generate various types', () => {
            const types = questions.map(q => q.type);
            const uniqueTypes = new Set(types);
            expect(uniqueTypes.size).toBeGreaterThan(1);
        });
    });
});
