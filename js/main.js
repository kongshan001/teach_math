// 导入所有模块
import { playAlarm, generateUUID, formatTime } from './utils.js';
import { generateAddSubtraction, generateMultiplication, generateComposite, generateQuestions } from './questionGenerator.js';
import { currentTest, currentTimer, timeLeft, maxTime, totalTimeTimer, currentRecordId, resetTestState } from './state.js';
import { startTimer, stopTimer, updateTimerDisplay, getTimeLeft, getMaxTime } from './timer.js';
import { saveTestRecord, loadRecords, deleteRecord, filterRecords } from './storage.js';
import { showPage, resetHome, showFeedback, clearFeedback, setInputState, updateProgressInfo, updateButtons, showModal, hideModal, handleKeyPress } from './ui.js';
import { submitAnswer, modifyAnswer, nextQuestion } from './quiz.js';
import { startTest, showQuestion, showResult } from './test.js';
import { showResultDetail, showRecords, showRecordDetail, closeDetailModal, deleteCurrentRecord } from './review.js';

// 将所有函数和状态暴露到全局作用域
window.playAlarm = playAlarm;
window.generateUUID = generateUUID;
window.formatTime = formatTime;
window.generateAddSubtraction = generateAddSubtraction;
window.generateMultiplication = generateMultiplication;
window.generateComposite = generateComposite;
window.generateQuestions = generateQuestions;
window.currentTest = currentTest;
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
window.startTest = startTest;
window.showQuestion = showQuestion;
window.showResult = showResult;
window.showResultDetail = showResultDetail;
window.showRecords = showRecords;
window.showRecordDetail = showRecordDetail;
window.closeDetailModal = closeDetailModal;
window.deleteCurrentRecord = deleteCurrentRecord;

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 绑定键盘事件
    document.getElementById('answerInput').addEventListener('keypress', handleKeyPress);
});

// 首页开始测试按钮
function startTestButton() {
    const count = parseInt(document.getElementById('questionCount').value);
    const enableTimer = document.getElementById('enableTimer').checked;
    startTest(count, enableTimer);
}

// 结果页查看详情按钮
function showResultDetailButton() {
    if (!currentTest.record) return;
    showResultDetail(currentTest.record);
}

// 重写全局函数以适配 HTML 中的调用
window.startTest = startTestButton;
window.showResultDetail = showResultDetailButton;
