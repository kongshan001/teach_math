import { Question, QuestionGenerator, QuestionGeneratorOptions, Grade, DifficultyLevel } from '../types/Question.js';

/**
 * 题目生成器基类
 * 提供通用的辅助方法和参数验证
 */
export abstract class BaseGenerator implements QuestionGenerator {
    /**
     * 生成题目（子类实现）
     * @param options 生成选项
     */
    abstract generate(options: QuestionGeneratorOptions): Question[];
    
    /**
     * 检查是否支持指定年级和难度
     * @param grade 年级
     * @param difficultyLevel 难度级别
     */
    abstract supports(grade: Grade, difficultyLevel: DifficultyLevel): boolean;
    
    /**
     * 验证并规范化生成选项
     * DEV-002: 添加输入参数验证
     * @param options 原始选项
     * @returns 规范化后的选项
     */
    protected validateAndNormalizeOptions(options: QuestionGeneratorOptions): QuestionGeneratorOptions {
        // 确保 count 在有效范围内 [1, 1000]
        const count = Math.max(1, Math.min(1000, options.count));
        
        // 如果 count 被修正，记录警告（在生产环境可替换为日志系统）
        if (count !== options.count) {
            console.warn(`[BaseGenerator] count 参数 ${options.count} 已被修正为 ${count}`);
        }
        
        return {
            ...options,
            count
        };
    }
    
    protected getDifficultyValue(level: DifficultyLevel): 1 | 2 | 3 {
        switch (level) {
            case 'basic': return 1;
            case 'improved': return 2;
            case 'challenge': return 3;
        }
    }
    
    protected getTimeLimit(difficulty: 1 | 2 | 3): number {
        switch (difficulty) {
            case 1: return 30;
            case 2: return 45;
            case 3: return 60;
        }
    }
    
    protected getGradeDescription(grade: Grade): string {
        const descriptions: Record<Grade, string> = {
            1: '一年级',
            2: '二年级',
            3: '三年级',
            4: '四年级',
            5: '五年级',
            6: '六年级'
        };
        return descriptions[grade];
    }
    
    protected getDifficultyDescription(level: DifficultyLevel): string {
        const descriptions: Record<DifficultyLevel, string> = {
            basic: '基础',
            improved: '提高',
            challenge: '挑战'
        };
        return descriptions[level];
    }
    
    protected createQuestion(
        question: string,
        answer: number,
        type: Question['type'],
        grade: Grade,
        difficultyLevel: DifficultyLevel,
        tags: string[]
    ): Question {
        const difficulty = this.getDifficultyValue(difficultyLevel);
        return {
            id: this.generateUUID(),
            question,
            answer,
            type,
            grade,
            difficulty,
            difficultyLevel,
            timeLimit: this.getTimeLimit(difficulty),
            tags,
            gradeDescription: `${this.getGradeDescription(grade)}-${this.getDifficultyDescription(difficultyLevel)}`
        };
    }
    
    protected generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
