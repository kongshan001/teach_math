import { describe, it, expect, beforeEach } from 'vitest';
import { GradeQuestionFactory } from '../src/core/GradeQuestionFactory.js';
import type { Grade, DifficultyLevel, Question } from '../src/types/Question.js';

describe('GradeQuestionFactory', () => {
    let factory: GradeQuestionFactory;

    beforeEach(() => {
        factory = new GradeQuestionFactory();
    });

    describe('getSupportedGrades', () => {
        it('should return all 6 grades', () => {
            const grades = factory.getSupportedGrades();
            expect(grades).toHaveLength(6);
            expect(grades).toContain(1);
            expect(grades).toContain(2);
            expect(grades).toContain(3);
            expect(grades).toContain(4);
            expect(grades).toContain(5);
            expect(grades).toContain(6);
        });
    });

    describe('getSupportedDifficultyLevels', () => {
        it('should return all difficulty levels for any grade', () => {
            const levels = factory.getSupportedDifficultyLevels(1 as Grade);
            expect(levels).toHaveLength(3);
            expect(levels).toContain('basic');
            expect(levels).toContain('improved');
            expect(levels).toContain('challenge');
        });
    });

    describe('supports', () => {
        it('should support all grades with basic difficulty', () => {
            expect(factory.supports(1 as Grade, 'basic')).toBe(true);
            expect(factory.supports(2 as Grade, 'basic')).toBe(true);
            expect(factory.supports(3 as Grade, 'basic')).toBe(true);
            expect(factory.supports(4 as Grade, 'basic')).toBe(true);
            expect(factory.supports(5 as Grade, 'basic')).toBe(true);
            expect(factory.supports(6 as Grade, 'basic')).toBe(true);
        });

        it('should support all grades with improved difficulty', () => {
            expect(factory.supports(1 as Grade, 'improved')).toBe(true);
            expect(factory.supports(2 as Grade, 'improved')).toBe(true);
            expect(factory.supports(3 as Grade, 'improved')).toBe(true);
            expect(factory.supports(4 as Grade, 'improved')).toBe(true);
            expect(factory.supports(5 as Grade, 'improved')).toBe(true);
            expect(factory.supports(6 as Grade, 'improved')).toBe(true);
        });

        it('should support all grades with challenge difficulty', () => {
            expect(factory.supports(1 as Grade, 'challenge')).toBe(true);
            expect(factory.supports(2 as Grade, 'challenge')).toBe(true);
            expect(factory.supports(3 as Grade, 'challenge')).toBe(true);
            expect(factory.supports(4 as Grade, 'challenge')).toBe(true);
            expect(factory.supports(5 as Grade, 'challenge')).toBe(true);
            expect(factory.supports(6 as Grade, 'challenge')).toBe(true);
        });
    });

    describe('generate', () => {
        it('should generate correct number of questions', () => {
            const questions = factory.generate({ grade: 1 as Grade, difficultyLevel: 'basic', count: 10 });
            expect(questions).toHaveLength(10);
        });

        it('should generate questions with correct grade', () => {
            const questions = factory.generate({ grade: 3 as Grade, difficultyLevel: 'basic', count: 5 });
            questions.forEach(q => {
                expect(q.grade).toBe(3);
            });
        });

        it('should generate questions with correct difficulty level', () => {
            const questions = factory.generate({ grade: 4 as Grade, difficultyLevel: 'challenge', count: 5 });
            questions.forEach(q => {
                expect(q.difficultyLevel).toBe('challenge');
                expect(q.difficulty).toBe(3);
            });
        });

        it('should generate questions with valid time limits', () => {
            const basicQuestions = factory.generate({ grade: 1 as Grade, difficultyLevel: 'basic', count: 3 });
            basicQuestions.forEach(q => {
                expect(q.timeLimit).toBe(30);
            });

            const improvedQuestions = factory.generate({ grade: 2 as Grade, difficultyLevel: 'improved', count: 3 });
            improvedQuestions.forEach(q => {
                expect(q.timeLimit).toBe(45);
            });

            const challengeQuestions = factory.generate({ grade: 3 as Grade, difficultyLevel: 'challenge', count: 3 });
            challengeQuestions.forEach(q => {
                expect(q.timeLimit).toBe(60);
            });
        });

        it('should generate questions with unique IDs', () => {
            const questions = factory.generate({ grade: 1 as Grade, difficultyLevel: 'basic', count: 20 });
            const ids = questions.map(q => q.id);
            const uniqueIds = new Set(ids);
            expect(uniqueIds.size).toBe(20);
        });

        it('should generate questions with grade descriptions', () => {
            const questions = factory.generate({ grade: 5 as Grade, difficultyLevel: 'improved', count: 3 });
            questions.forEach(q => {
                expect(q.gradeDescription).toBe('五年级-提高');
            });
        });

        it('should throw error for unsupported grade', () => {
            expect(() => {
                factory.generate({ grade: 7 as Grade, difficultyLevel: 'basic', count: 5 });
            }).toThrow();
        });
    });
});
