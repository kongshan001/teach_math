// 导入所有模块
import { playAlarm, generateUUID, formatTime } from './utils.js';
import { generateAddSubtraction, generateMultiplication, generateComposite, generateQuestions } from './questionGenerator.js';
import { currentTest as testState, currentTimer, timeLeft, maxTime, totalTimeTimer, currentRecordId, resetTestState } from './state.js';
import { startTimer, stopTimer, updateTimerDisplay, getTimeLeft, getMaxTime } from './timer.js';
import { saveTestRecord, loadRecords, deleteRecord, filterRecords } from './storage.js';
import { showPage, resetHome, showFeedback, clearFeedback, setInputState, updateProgressInfo, updateButtons, showModal, hideModal, handleKeyPress } from './ui.js';
import { submitAnswer, modifyAnswer, nextQuestion } from './quiz.js';
import { startTest as startTestCore, showQuestion, showResult } from './test.js';
import { showResultDetail as showResultDetailCore, showRecords, showRecordDetail, closeDetailModal, deleteCurrentRecord } from './review.js';

// 将所有函数和状态暴露到全局作用域
window.playAlarm = playAlarm;
window.generateUUID = generateUUID;
window.formatTime = formatTime;
window.generateAddSubtraction = generateAddSubtraction;
window.generateMultiplication = generateMultiplication;
window.generateComposite = generateComposite;
window.generateQuestions = generateQuestions;

// 暴露状态（使用 getter/setter 来访问最新状态）
Object.defineProperty(window, 'currentTest', {
    get() { return testState; },
    set(value) { Object.assign(testState, value); }
});

window.currentTimer = currentTimer;
window.timeLeft = timeLeft;
window.maxTime = maxTime;
window.totalTimeTimer = totalTimeTimer;
window.currentRecordId = currentRecordId;
window.resetTestState = resetTestState;
window.startTimer = startTimer;
window.stopTimer = stopTimer;
window.updateTimerDisplay = updateTimerDisplay;
window.getTimeLeft = getTimeLeft;
window.getMaxTime = getMaxTime;
window.saveTestRecord = saveTestRecord;
window.loadRecords = loadRecords;
window.deleteRecord = deleteRecord;
window.filterRecords = filterRecords;
window.showPage = showPage;
window.resetHome = resetHome;
window.showFeedback = showFeedback;
window.clearFeedback = clearFeedback;
window.setInputState = setInputState;
window.updateProgressInfo = updateProgressInfo;
window.updateButtons = updateButtons;
window.showModal = showModal;
window.hideModal = hideModal;
window.handleKeyPress = handleKeyPress;
window.submitAnswer = submitAnswer;
window.modifyAnswer = modifyAnswer;
window.nextQuestion = nextQuestion;
window.showQuestion = showQuestion;
window.showResult = showResult;
window.showRecordDetail = showRecordDetail;
window.closeDetailModal = closeDetailModal;
window.deleteCurrentRecord = deleteCurrentRecord;

// 包装函数：从 DOM 读取参数并调用核心函数
window.startTest = function() {
    console.log('开始测试...');
    try {
        const count = parseInt(document.getElementById('questionCount').value);
        const enableTimer = document.getElementById('enableTimer').checked;
        console.log('题目数量:', count, '启用计时器:', enableTimer);
        startTestCore(count, enableTimer);
    } catch (error) {
        console.error('开始测试失败:', error);
        alert('开始测试失败，请检查控制台');
    }
};

// 包装函数：从 currentTest 读取记录并显示详情
window.showResultDetail = function() {
    console.log('显示结果详情...');
    try {
        if (!testState.record) {
            console.warn('没有可显示的测试记录');
            alert('没有可显示的测试记录');
            return;
        }
        showResultDetailCore(testState.record);
    } catch (error) {
        console.error('显示结果详情失败:', error);
        alert('显示结果详情失败，请检查控制台');
    }
};

// 暴露原始核心函数（用于其他模块调用）
window.startTestCore = startTestCore;
window.showResultDetailCore = showResultDetailCore;

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    console.log('应用初始化完成');
    console.log('可用全局函数:', Object.keys(window).filter(key => typeof window[key] === 'function' && 
        ['startTest', 'showRecords', 'resetHome', 'submitAnswer', 'modifyAnswer', 
         'nextQuestion', 'showResultDetail', 'closeDetailModal', 'deleteCurrentRecord'].includes(key)));
    
    // 标记应用已加载
    window.appLoaded = true;
    console.log('✓ 应用加载完成');
    
    // 绑定键盘事件
    const answerInput = document.getElementById('answerInput');
    if (answerInput) {
        answerInput.addEventListener('keypress', handleKeyPress);
        console.log('✓ 键盘事件已绑定');
    } else {
        console.warn('⚠ 答案输入框未找到');
    }
});

// 暴露其他函数
window.showRecords = showRecords;
