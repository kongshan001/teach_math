import { generateUUID } from './utils.js';

// 加减法生成器
export function generateAddSubtraction() {
    const isAddition = Math.random() > 0.5;
    let a, b, answer, question, difficulty;

    if (isAddition) {
        // 增加进位加法难度，数字范围 10-100
        const carry = Math.random() > 0.0;
        if (carry) {
            // 难：两位数进位加法，数字 10-90
            a = Math.floor(Math.random() * 81) + 10;  // 10-90
            const maxB = Math.min(99 - a, 90);
            b = Math.floor(Math.random() * maxB) + 10;  // 确保结果在100以内且都是两位数
            difficulty = 2;
        } else {
            // 简单：个位数加法
            a = Math.floor(Math.random() * 8) + 2;
            b = Math.floor(Math.random() * (9 - a)) + 1;
            difficulty = 1;
        }
        answer = a + b;
        question = `${a} + ${b} =`;
    } else {
        // 减法：增加退位减法比例和数字范围
        const useHardSubtraction = Math.random() > 0.3;  // 70% 难题
        if (useHardSubtraction) {
            // 难：两位数减两位数，必有退位
            a = Math.floor(Math.random() * 50) + 50;  // 50-99
            // 确保有退位：个位小于减数的个位
            const aUnit = a % 10;
            b = Math.floor(Math.random() * (a - 10)) + 10;  // 10 到 a-1
            // 确保退位
            while ((a % 10) >= (b % 10)) {
                b = Math.floor(Math.random() * (a - 10)) + 10;
            }
            difficulty = 2;
        } else {
            // 简单：不退位减法
            a = Math.floor(Math.random() * 50) + 10;  // 10-59
            b = Math.floor(Math.random() * (a % 10 + 1));  // 不超过个位数
            difficulty = 1;
        }
        answer = a - b;
        question = `${a} - ${b} =`;
    }

    return {
        id: generateUUID(),
        question,
        answer,
        type: 'addition',
        difficulty,
        timeLimit: difficulty === 1 ? 30 : 60
    };
}

// 乘法生成器
export function generateMultiplication() {
    // 限制在99乘法表（1-9 × 1-9）
    // 增加大数乘法比例，偏向 6-9 的乘法
    const useHardMultiplication = Math.random() > 0.4;  // 60% 难题
    let a, b, difficulty;
    
    if (useHardMultiplication) {
        // 难：两个数都在 6-9
        a = Math.floor(Math.random() * 4) + 6;  // 6-9
        b = Math.floor(Math.random() * 4) + 6;  // 6-9
        difficulty = 2;
    } else {
        // 简单：表内乘法，至少一个数 <=5
        a = Math.floor(Math.random() * 5) + 1;  // 1-5
        b = Math.floor(Math.random() * 9) + 1;  // 1-9
        difficulty = 1;
    }
    
    const answer = a * b;

    return {
        id: generateUUID(),
        question: `${a} × ${b} =`,
        answer,
        type: 'multiplication',
        difficulty,
        timeLimit: difficulty === 1 ? 30 : 60
    };
}

// 复合运算生成器
export function generateComposite() {
    let question, answer, difficulty;
    // 增加两步运算比例到 40%
    const useTwoSteps = Math.random() < 0.4;

    if (useTwoSteps) {
        const template = Math.floor(Math.random() * 6);
        
        switch (template) {
            case 0: {
                // (a + b) × c，数字增大
                const a = Math.floor(Math.random() * 15) + 5;   // 5-19
                const b = Math.floor(Math.random() * 10) + 1;   // 1-10
                const c = Math.floor(Math.random() * 5) + 2;    // 2-6
                answer = (a + b) * c;
                question = `(${a} + ${b}) × ${c} =`;
                break;
            }
            case 1: {
                // (d - e) + f，增加数字范围
                const d = Math.floor(Math.random() * 30) + 20;  // 20-49
                const e = Math.floor(Math.random() * (d - 10)) + 10;  // 10 到 d-1
                const f = Math.floor(Math.random() * 20) + 5;   // 5-24
                answer = (d - e) + f;
                question = `(${d} - ${e}) + ${f} =`;
                break;
            }
            case 2: {
                // g × h - i，增加难度
                const g = Math.floor(Math.random() * 7) + 3;    // 3-9
                const h = Math.floor(Math.random() * 7) + 3;    // 3-9
                const product = g * h;
                const i = Math.floor(Math.random() * (product - 5)) + 5;
                answer = product - i;
                question = `${g} × ${h} - ${i} =`;
                break;
            }
            case 3: {
                // (j + k) × (l + m)，增加数字
                const j = Math.floor(Math.random() * 15) + 5;   // 5-19
                const k = Math.floor(Math.random() * 10) + 1;   // 1-10
                const l = Math.floor(Math.random() * 8) + 2;    // 2-9
                const m = Math.floor(Math.random() * 8) + 2;    // 2-9
                answer = (j + k) * (l + m);
                question = `(${j} + ${k}) × (${l} + ${m}) =`;
                difficulty = 3;
                break;
            }
            case 4: {
                // n - o + p，连加减
                const n = Math.floor(Math.random() * 40) + 20;  // 20-59
                const o = Math.floor(Math.random() * (n - 10)) + 5;
                const p = Math.floor(Math.random() * 20) + 5;
                answer = n - o + p;
                question = `${n} - ${o} + ${p} =`;
                break;
            }
            case 5: {
                // q × r + s × t，两个乘法相加
                const q = Math.floor(Math.random() * 6) + 4;    // 4-9
                const r = Math.floor(Math.random() * 6) + 4;    // 4-9
                const s = Math.floor(Math.random() * 5) + 2;    // 2-6
                const t = Math.floor(Math.random() * 5) + 2;    // 2-6
                const left = q * r;
                const right = s * t;
                answer = left + right;
                question = `${q} × ${r} + ${s} × ${t} =`;
                break;
            }
        }
        if (!difficulty) difficulty = 2;
    } else {
        // 默认也增加数字范围
        const a = Math.floor(Math.random() * 15) + 5;   // 5-19
        const b = Math.floor(Math.random() * 10) + 2;   // 2-11
        const c = Math.floor(Math.random() * 8) + 2;    // 2-9
        const d = Math.floor(Math.random() * 8) + 2;    // 2-9
        
        answer = (a + b) * (c + d);
        question = `(${a} + ${b}) × (${c} + ${d}) =`;
        difficulty = 3;
    }

    return {
        id: generateUUID(),
        question,
        answer,
        type: 'composite',
        difficulty,
        timeLimit: 60
    };
}

// 计算运算
function calculateOperation(a, b, op) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        default:
            return a + b;
    }
}

// 生成题目集
export function generateQuestions(count, minHardQuestions = 2) {
    const questions = [];
    
    // 保底难题数量（不超过总题数）
    const guaranteedHard = Math.min(minHardQuestions, count);
    
    // 先生成保底难题（难度 >= 2）
    for (let i = 0; i < guaranteedHard; i++) {
        let question;
        // 80% 概率生成复合运算（难度3），20% 生成中等难度
        if (Math.random() < 0.8) {
            question = generateComposite();
        } else {
            // 强制生成中等难度的加减法或乘法
            if (Math.random() > 0.5) {
                // 生成进位加法或退位减法
                const isAddition = Math.random() > 0.5;
                let a, b, answer, qText;
                if (isAddition) {
                    a = Math.floor(Math.random() * 40) + 50;  // 50-89
                    b = Math.floor(Math.random() * (99 - a - 10)) + 11;  // 确保进位
                    while ((a % 10) + (b % 10) < 10) {
                        b = Math.floor(Math.random() * (99 - a - 10)) + 11;
                    }
                    answer = a + b;
                    qText = `${a} + ${b} =`;
                } else {
                    a = Math.floor(Math.random() * 40) + 50;  // 50-89
                    b = Math.floor(Math.random() * (a - 20)) + 10;
                    while ((a % 10) >= (b % 10)) {
                        b = Math.floor(Math.random() * (a - 20)) + 10;
                    }
                    answer = a - b;
                    qText = `${a} - ${b} =`;
                }
                question = {
                    id: generateUUID(),
                    question: qText,
                    answer,
                    type: 'addition',
                    difficulty: 2,
                    timeLimit: 60
                };
            } else {
                // 生成6-9的大数乘法
                const a = Math.floor(Math.random() * 4) + 6;
                const b = Math.floor(Math.random() * 4) + 6;
                question = {
                    id: generateUUID(),
                    question: `${a} × ${b} =`,
                    answer: a * b,
                    type: 'multiplication',
                    difficulty: 2,
                    timeLimit: 60
                };
            }
        }
        questions.push(question);
    }
    
    // 生成剩余题目（随机难度）
    for (let i = guaranteedHard; i < count; i++) {
        const tmp = Math.random() * 100;
        let type;
        if (tmp < 1){
            type = "addition";
        }
        else if (tmp < 2){
            type = "multiplication";
        }
        else{
            type = "composite";
        }

        let question;
        
        if (type === 'addition') {
            question = generateAddSubtraction();
        } else if (type === 'multiplication') {
            question = generateMultiplication();
        } else {
            question = generateComposite();
        }
        
        questions.push(question);
    }

    questions.sort((a, b) => a.difficulty - b.difficulty);

    return questions;
}
