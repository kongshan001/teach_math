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

// 按年级和难度生成题目
export function generateQuestionsByGrade(grade, difficultyLevel, count) {
    const questions = [];
    
    for (let i = 0; i < count; i++) {
        questions.push(generateQuestionByGrade(grade, difficultyLevel));
    }
    
    return questions;
}

function generateQuestionByGrade(grade, difficultyLevel) {
    const difficulty = difficultyLevel === 'basic' ? 1 : difficultyLevel === 'improved' ? 2 : 3;
    const timeLimit = difficulty === 1 ? 30 : difficulty === 2 ? 45 : 60;
    const gradeDesc = `${getGradeName(grade)}-${getDifficultyName(difficultyLevel)}`;
    
    let question, answer, type, tags;
    
    switch (grade) {
        case 1:
            ({ question, answer, type, tags } = generateGrade1(difficultyLevel));
            break;
        case 2:
            ({ question, answer, type, tags } = generateGrade2(difficultyLevel));
            break;
        case 3:
            ({ question, answer, type, tags } = generateGrade3(difficultyLevel));
            break;
        case 4:
            ({ question, answer, type, tags } = generateGrade4(difficultyLevel));
            break;
        case 5:
            ({ question, answer, type, tags } = generateGrade5(difficultyLevel));
            break;
        case 6:
            ({ question, answer, type, tags } = generateGrade6(difficultyLevel));
            break;
        default:
            ({ question, answer, type, tags } = generateGrade1(difficultyLevel));
    }
    
    return {
        id: generateUUID(),
        question,
        answer,
        type,
        grade,
        difficulty,
        difficultyLevel,
        timeLimit,
        tags,
        gradeDescription: gradeDesc
    };
}

function getGradeName(grade) {
    const names = { 1: '一年级', 2: '二年级', 3: '三年级', 4: '四年级', 5: '五年级', 6: '六年级' };
    return names[grade] || '一年级';
}

function getDifficultyName(level) {
    const names = { basic: '基础', improved: '提高', challenge: '挑战' };
    return names[level] || '基础';
}

// 一年级题目生成
function generateGrade1(difficultyLevel) {
    const isAddition = Math.random() > 0.5;
    let a, b, answer, question, type, tags;
    
    if (difficultyLevel === 'basic') {
        a = Math.floor(Math.random() * 9) + 1;
        b = Math.floor(Math.random() * (10 - a));
        answer = a + b;
        question = `${a} + ${b} =`;
        type = 'addition';
        tags = ['10以内加减法'];
    } else if (difficultyLevel === 'improved') {
        if (isAddition) {
            a = Math.floor(Math.random() * 15) + 5;
            b = Math.floor(Math.random() * (20 - a));
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        } else {
            a = Math.floor(Math.random() * 10) + 10;
            b = Math.floor(Math.random() * (a - 1)) + 1;
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        tags = ['20以内加减法'];
    } else {
        if (isAddition) {
            a = Math.floor(Math.random() * 10) + 10;
            b = Math.floor(Math.random() * 10) + 1;
            while (a + b <= 10) {
                a = Math.floor(Math.random() * 10) + 10;
                b = Math.floor(Math.random() * 10) + 1;
            }
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        } else {
            a = Math.floor(Math.random() * 10) + 10;
            b = Math.floor(Math.random() * 10) + 1;
            while (a <= b) {
                a = Math.floor(Math.random() * 10) + 10;
                b = Math.floor(Math.random() * 10) + 1;
            }
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        tags = ['20以内进位退位'];
    }
    
    return { question, answer, type, tags };
}

// 二年级题目生成
function generateGrade2(difficultyLevel) {
    const isAddition = Math.random() > 0.5;
    let a, b, c, answer, question, type, tags;
    
    if (difficultyLevel === 'basic') {
        a = Math.floor(Math.random() * 9) * 10;
        b = Math.floor(Math.random() * 9) * 10;
        answer = a + b;
        question = `${a} + ${b} =`;
        type = 'addition';
        tags = ['整十数加减法'];
    } else if (difficultyLevel === 'improved') {
        if (isAddition) {
            a = Math.floor(Math.random() * 90) + 10;
            b = Math.floor(Math.random() * (100 - a));
            answer = a + b;
            question = `${a} + ${b} =`;
            type = 'addition';
        } else {
            a = Math.floor(Math.random() * 90) + 10;
            b = Math.floor(Math.random() * (a - 10)) + 10;
            answer = a - b;
            question = `${a} - ${b} =`;
            type = 'subtraction';
        }
        tags = ['两位数加减法'];
    } else {
        const useThreeNumbers = Math.random() > 0.5;
        if (useThreeNumbers) {
            if (isAddition) {
                a = Math.floor(Math.random() * 50) + 10;
                b = Math.floor(Math.random() * 50) + 10;
                c = Math.floor(Math.random() * 50) + 10;
                answer = a + b + c;
                question = `${a} + ${b} + ${c} =`;
            } else {
                a = Math.floor(Math.random() * 50) + 30;
                b = Math.floor(Math.random() * (a - 10)) + 10;
                c = Math.floor(Math.random() * 10) + 1;
                answer = a - b + c;
                question = `${a} - ${b} + ${c} =`;
            }
        } else {
            a = Math.floor(Math.random() * 50) + 30;
            b = Math.floor(Math.random() * 20) + 10;
            c = Math.floor(Math.random() * 20) + 5;
            answer = a - b - c;
            question = `${a} - ${b} - ${c} =`;
        }
        type = 'composite';
        tags = ['连加连减'];
    }
    
    return { question, answer, type, tags };
}

// 三年级题目生成
function generateGrade3(difficultyLevel) {
    let a, b, answer, question, type, tags;
    
    if (difficultyLevel === 'basic') {
        a = Math.floor(Math.random() * 5) + 1;
        b = Math.floor(Math.random() * 9) + 1;
        answer = a * b;
        question = `${a} × ${b} =`;
        type = 'multiplication';
        tags = ['表内乘法'];
    } else if (difficultyLevel === 'improved') {
        const isMultiplication = Math.random() > 0.3;
        if (isMultiplication) {
            a = Math.floor(Math.random() * 9) + 1;
            b = Math.floor(Math.random() * 9) + 1;
            answer = a * b;
            question = `${a} × ${b} =`;
            type = 'multiplication';
            tags = ['表内乘法', '除法入门'];
        } else {
            a = Math.floor(Math.random() * 81) + 1;
            b = Math.floor(Math.random() * 8) + 2;
            answer = Math.floor(a / b);
            question = `${a} ÷ ${b} =`;
            type = 'division';
            tags = ['除法入门'];
        }
    } else {
        const typeChoice = Math.random();
        if (typeChoice < 0.4) {
            a = Math.floor(Math.random() * 90) + 10;
            b = Math.floor(Math.random() * 8) + 2;
            answer = a * b;
            question = `${a} × ${b} =`;
            type = 'multiplication';
            tags = ['两位数乘一位数'];
        } else if (typeChoice < 0.7) {
            a = Math.floor(Math.random() * 5) + 2;
            b = Math.floor(Math.random() * (a - 1)) + 2;
            answer = a / b;
            question = `${a}/${b}`;
            type = 'fraction';
            tags = ['分数认识'];
        } else {
            a = Math.floor(Math.random() * 9) + 1;
            b = Math.floor(Math.random() * 9) + 1;
            c = Math.floor(Math.random() * 9) + 1;
            answer = a * b * c;
            question = `${a} × ${b} × ${c} =`;
            type = 'multiplication';
            tags = ['连乘'];
        }
    }
    
    return { question, answer, type, tags };
}

// 四年级题目生成
function generateGrade4(difficultyLevel) {
    let a, b, c, answer, question, type, tags;
    
    if (difficultyLevel === 'basic') {
        a = Math.floor(Math.random() * 900) + 100;
        b = Math.floor(Math.random() * 90) + 10;
        answer = a * b;
        question = `${a} × ${b} =`;
        type = 'multiplication';
        tags = ['三位数乘两位数'];
    } else if (difficultyLevel === 'improved') {
        a = Math.floor(Math.random() * 900) + 100;
        b = Math.floor(Math.random() * 89) + 10;
        answer = Math.floor(a / b);
        question = `${a} ÷ ${b} =`;
        type = 'division';
        tags = ['除数是两位数的除法'];
    } else {
        const typeChoice = Math.random();
        if (typeChoice < 0.5) {
            a = Math.floor(Math.random() * 20) + 5;
            b = Math.floor(Math.random() * 20) + 5;
            c = Math.floor(Math.random() * 10) + 1;
            answer = (a + b) * c;
            question = `(${a} + ${b}) × ${c} =`;
        } else if (typeChoice < 0.8) {
            a = Math.floor(Math.random() * 50) + 20;
            b = Math.floor(Math.random() * 10) + 2;
            c = Math.floor(Math.random() * 20) + 5;
            answer = a * b + c;
            question = `${a} × ${b} + ${c} =`;
        } else {
            a = Math.floor(Math.random() * 50) + 50;
            b = Math.floor(Math.random() * 20) + 10;
            c = Math.floor(Math.random() * 20) + 10;
            answer = a - b * 2 - c;
            question = `${a} - ${b} × 2 - ${c} =`;
        }
        type = 'composite';
        tags = ['四则混合运算'];
    }
    
    return { question, answer, type, tags };
}

// 五年级题目生成
function generateGrade5(difficultyLevel) {
    let a, b, answer, question, type, tags;
    
    // 小数精度处理函数 - 保留两位小数
    const toDecimal = (num) => Math.round(num * 100) / 100;
    
    if (difficultyLevel === 'basic') {
        // 小数加减法（支持加法和减法）
        const isAddition = Math.random() > 0.5;
        a = Math.floor(Math.random() * 90) + 10;
        b = Math.floor(Math.random() * 90) + 10;
        const aDecimal = toDecimal(Math.random() * a);
        const bDecimal = toDecimal(Math.random() * b);
        
        if (isAddition) {
            answer = toDecimal(aDecimal + bDecimal);
            question = `${aDecimal.toFixed(1)} + ${bDecimal.toFixed(1)} =`;
        } else {
            // 减法确保结果为正
            const [big, small] = aDecimal >= bDecimal ? [aDecimal, bDecimal] : [bDecimal, aDecimal];
            answer = toDecimal(big - small);
            question = `${big.toFixed(1)} - ${small.toFixed(1)} =`;
        }
        type = 'decimal';
        tags = ['小数加减法'];
    } else if (difficultyLevel === 'improved') {
        a = Math.floor(Math.random() * 90) + 10;
        b = Math.floor(Math.random() * 8) + 2;
        const aDecimal = toDecimal(Math.random() * a);
        answer = toDecimal(aDecimal * b);
        question = `${aDecimal.toFixed(1)} × ${b} =`;
        type = 'decimal';
        tags = ['小数乘除法'];
    } else {
        const numerator1 = Math.floor(Math.random() * 8) + 2;
        const denominator1 = Math.floor(Math.random() * (numerator1 - 1)) + 2;
        const numerator2 = Math.floor(Math.random() * 8) + 2;
        const denominator2 = Math.floor(Math.random() * (numerator2 - 1)) + 2;
        
        const isAddition = Math.random() > 0.5;
        if (isAddition) {
            const commonDenom = denominator1 * denominator2;
            answer = (numerator1 * denominator2 + numerator2 * denominator1) / commonDenom;
            question = `${numerator1}/${denominator1} + ${numerator2}/${denominator2} =`;
        } else {
            const commonDenom = denominator1 * denominator2;
            const numResult = Math.abs((numerator1 * denominator2 - numerator2 * denominator1) / commonDenom);
            answer = numResult;
            question = `${numerator1}/${denominator1} - ${numerator2}/${denominator2} =`;
        }
        type = 'fraction';
        tags = ['分数加减法'];
    }
    
    return { question, answer, type, tags };
}

// 六年级题目生成
function generateGrade6(difficultyLevel) {
    let a, b, answer, question, type, tags;
    
    if (difficultyLevel === 'basic') {
        a = Math.floor(Math.random() * 20) + 2;
        b = Math.floor(Math.random() * 20) + 2;
        answer = a * b;
        question = `${a}/${b}`;
        type = 'fraction';
        tags = ['分数乘法'];
    } else if (difficultyLevel === 'improved') {
        const isDivision = Math.random() > 0.5;
        if (isDivision) {
            a = Math.floor(Math.random() * 20) + 2;
            b = Math.floor(Math.random() * 20) + 2;
            c = Math.floor(Math.random() * 10) + 2;
            answer = a / b / c;
            question = `${a}/${b} ÷ ${c} =`;
            type = 'fraction';
            tags = ['分数除法'];
        } else {
            a = Math.floor(Math.random() * 90) + 10;
            b = Math.floor(Math.random() * 50) + 10;
            answer = a * b / 100;
            question = `${a} 的 ${b}% =`;
            type = 'percentage';
            tags = ['百分数'];
        }
    } else {
        const typeChoice = Math.random();
        if (typeChoice < 0.5) {
            a = Math.floor(Math.random() * 8) + 2;
            b = Math.floor(Math.random() * 8) + 2;
            c = Math.floor(Math.random() * 8) + 2;
            d = Math.floor(Math.random() * 8) + 2;
            answer = (a / b) * (c / d);
            question = `${a}/${b} × ${c}/${d} =`;
            type = 'fraction';
            tags = ['分数乘除法混合'];
        } else {
            a = Math.floor(Math.random() * 9) + 2;
            b = Math.floor(Math.random() * 9) + 2;
            answer = a / b;
            question = `已知 ${a}:${b} = ${a*10}:${b*10}，求比值`;
            type = 'ratio';
            tags = ['比例和比例尺'];
        }
    }
    
    return { question, answer, type, tags };
}
