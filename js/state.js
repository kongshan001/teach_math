// 测试状态
export let currentTest = {
    questions: [],
    currentIndex: 0,
    correctCount: 0,
    answers: [],
    startTime: null,
    enableTimer: false
};

// 计时器相关
export let currentTimer = null;
export let timeLeft = 0;
export let maxTime = 0;
export let totalTimeTimer = null;

// 记录 ID
export let currentRecordId = null;

// 重置测试状态
export function resetTestState() {
    currentTest = {
        questions: [],
        currentIndex: 0,
        correctCount: 0,
        answers: [],
        startTime: null,
        enableTimer: false
    };
    currentTimer = null;
    timeLeft = 0;
    maxTime = 0;
    totalTimeTimer = null;
    currentRecordId = null;
}
