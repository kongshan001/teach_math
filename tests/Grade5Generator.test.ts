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

    // QA-001: 边界条件测试
    describe('边界条件测试 (QA-001)', () => {
        it('count=0 应被修正为 1', () => {
            const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'basic', count: 0 });
            expect(questions.length).toBe(1);
        });

        it('count=10000 应被修正为 1000', () => {
            const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'basic', count: 10000 });
            expect(questions.length).toBe(1000);
        });

        it('count=-5 应被修正为 1', () => {
            const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'basic', count: -5 });
            expect(questions.length).toBe(1);
        });

        it('count=1 应正常生成 1 道题', () => {
            const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'basic', count: 1 });
            expect(questions.length).toBe(1);
        });

        it('count=1000 应正常生成 1000 道题', () => {
            const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'basic', count: 1000 });
            expect(questions.length).toBe(1000);
        });
    });

    // QA-001: 答案精度测试
    describe('答案精度测试 (DEV-001)', () => {
        it('小数加法答案应精确到两位小数', () => {
            const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'basic', count: 100 });
            questions.forEach(q => {
                // 检查答案最多有两位小数
                const decimalPart = (q.answer.toString().split('.')[1] || '').length;
                expect(decimalPart).toBeLessThanOrEqual(2);
            });
        });

        it('小数乘法答案应精确到两位小数', () => {
            const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'improved', count: 100 });
            questions.forEach(q => {
                const decimalPart = (q.answer.toString().split('.')[1] || '').length;
                expect(decimalPart).toBeLessThanOrEqual(2);
            });
        });

        it('分数计算答案应精确到两位小数', () => {
            const questions = generator.generate({ grade: 5 as Grade, difficultyLevel: 'challenge', count: 100 });
            questions.forEach(q => {
                const decimalPart = (q.answer.toString().split('.')[1] || '').length;
                expect(decimalPart).toBeLessThanOrEqual(2);
            });
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
