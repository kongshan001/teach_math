import { generateUUID } from './utils.js';

// 加减法生成器
export function generateAddSubtraction() {
    const isAddition = Math.random() > 0.5;
    let a, b, answer, question, difficulty;

    if (isAddition) {
        const carry = Math.random() > 0.5;
        if (carry) {
            a = Math.floor(Math.random() * 50) + 1;
            b = Math.floor(Math.random() * (100 - a)) + 1;
        } else {
            a = Math.floor(Math.random() * 9) + 1;
            b = Math.floor(Math.random() * (10 - a));
        }
        answer = a + b;
        question = `${a} + ${b} =`;
        difficulty = carry ? 2 : 1;
    } else {
        a = Math.floor(Math.random() * 99) + 1;
        b = Math.floor(Math.random() * a);
        const hasBorrow = (a % 10) < (b % 10);
        answer = a - b;
        question = `${a} - ${b} =`;
        difficulty = hasBorrow ? 2 : 1;
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
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const answer = a * b;
    const difficulty = (a >= 6 || b >= 6) ? 2 : 1;

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
    const useTwoSteps = Math.random() > 0.3;

    if (useTwoSteps) {
        const template = Math.floor(Math.random() * 6);
        
        switch (template) {
            case 0:
                const a = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 5) + 1;
                const c = Math.floor(Math.random() * 5) + 1;
                answer = (a + b) * c;
                question = `(${a} + ${b}) × ${c} =`;
                break;
            case 1:
                const d = Math.floor(Math.random() * 9) + 1;
                const e = Math.floor(Math.random() * (d)) + 1;
                const f = Math.floor(Math.random() * 5) + 1;
                answer = (d - e) + f;
                question = `(${d} - ${e}) + ${f} =`;
                break;
            case 2:
                const g = Math.floor(Math.random() * 5) + 2;
                const h = Math.floor(Math.random() * 3) + 1;
                const product = g * h;
                const i = Math.floor(Math.random() * (product - 1)) + 1;
                answer = product - i;
                question = `${g} × ${h} - ${i} =`;
                break;
            case 3:
                const j = Math.floor(Math.random() * 4) + 1;
                const k = Math.floor(Math.random() * 4) + 1;
                const l = Math.floor(Math.random() * 4) + 1;
                const m = Math.floor(Math.random() * 4) + 1;
                answer = (j + k) * (l + m);
                question = `(${j} + ${k}) × (${l} + ${m}) =`;
                difficulty = 3;
                break;
            case 4:
                const n = Math.floor(Math.random() * 6) + 2;
                const o = Math.floor(Math.random() * (n - 1)) + 1;
                const p = Math.floor(Math.random() * 5) + 1;
                answer = n - o + p;
                question = `${n} - ${o} + ${p} =`;
                break;
            case 5:
                const q = Math.floor(Math.random() * 4) + 1;
                const r = Math.floor(Math.random() * 4) + 1;
                const s = Math.floor(Math.random() * 4) + 1;
                const t = Math.floor(Math.random() * 4) + 1;
                const left = q * r;
                const right = s * t;
                answer = left + right;
                question = `${q} × ${r} + ${s} × ${t} =`;
                break;
        }
        if (!difficulty) difficulty = 2;
    } else {
        const a = Math.floor(Math.random() * 4) + 1;
        const b = Math.floor(Math.random() * 4) + 1;
        const c = Math.floor(Math.random() * 4) + 1;
        const d = Math.floor(Math.random() * 4) + 1;
        
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
export function generateQuestions(count) {
    const questions = [];
    const types = ['addition', 'multiplication', 'composite'];
    
    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
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
