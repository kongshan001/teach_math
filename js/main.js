// 导入所有模块
import { playAlarm, generateUUID, formatTime } from './utils.js';
import { generateAddSubtraction, generateMultiplication, generateComposite, generateQuestions } from './questionGenerator.js';
import { currentTest as testState, resetTestState } from './state.js';
import { startTimer, stopTimer, updateTimerDisplay, getTimeLeft, getMaxTime } from './timer.js';
import { saveTestRecord, loadRecords, deleteRecord } from './storage.js';
import { showPage, resetHome, showFeedback, clearFeedback, setInputState, updateProgressInfo, updateButtons, showModal, hideModal } from './ui.js';
import { submitAnswer, modifyAnswer, nextQuestion } from './quiz.js';
import { startTest as startTestCore, showQuestion, showResult } from './test.js';
import { showResultDetail as showResultDetailCore, showRecords, showRecordDetail, closeDetailModal, deleteCurrentRecord } from './review.js';

// 暴露状态
Object.defineProperty(window, 'currentTest', {
    get() { return testState; }
});

// 暴露必要的函数到 window 对象
window.playAlarm = playAlarm;
window.generateUUID = generateUUID;
window.formatTime = formatTime;
window.saveTestRecord = saveTestRecord;
window.loadRecords = loadRecords;
window.deleteRecord = deleteRecord;
window.showPage = showPage;
window.resetHome = resetHome;
window.showFeedback = showFeedback;
window.clearFeedback = clearFeedback;
window.setInputState = setInputState;
window.updateProgressInfo = updateProgressInfo;
window.updateButtons = updateButtons;
window.showModal = showModal;
window.hideModal = hideModal;
window.submitAnswer = submitAnswer;
window.modifyAnswer = modifyAnswer;
window.nextQuestion = nextQuestion;
window.startTest = startTestCore;
window.showQuestion = showQuestion;
window.showResult = showResult;
window.showResultDetail = showResultDetailCore;
window.showRecords = showRecords;
window.showRecordDetail = showRecordDetail;
window.closeDetailModal = closeDetailModal;
window.deleteCurrentRecord = deleteCurrentRecord;
window.startTimer = startTimer;
window.stopTimer = stopTimer;
window.updateTimerDisplay = updateTimerDisplay;
window.getTimeLeft = getTimeLeft;
window.getMaxTime = getMaxTime;

// 日志系统
function log(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    log('DOM 加载完成');
    
    try {
        // 绑定首页按钮
        const startTestBtn = document.getElementById('startTestBtn');
        if (startTestBtn) {
            startTestBtn.addEventListener('click', handleStartTest);
            log('✓ 开始测试按钮已绑定');
        } else {
            log('✗ 开始测试按钮未找到', 'error');
        }

        const showRecordsBtn = document.getElementById('showRecordsBtn');
        if (showRecordsBtn) {
            showRecordsBtn.addEventListener('click', () => showRecords('all'));
            log('✓ 查看历史记录按钮已绑定');
        } else {
            log('✗ 查看历史记录按钮未找到', 'error');
        }

        // 绑定答题页按钮
        const submitAnswerBtn = document.getElementById('submitAnswerBtn');
        if (submitAnswerBtn) {
            submitAnswerBtn.addEventListener('click', handleSubmitAnswer);
            log('✓ 提交答案按钮已绑定');
        }

        const modifyBtn = document.getElementById('modifyBtn');
        if (modifyBtn) {
            modifyBtn.addEventListener('click', handleModifyAnswer);
            log('✓ 修改答案按钮已绑定');
        }

        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', handleNextQuestion);
            log('✓ 下一题按钮已绑定');
        }

        // 绑定结果页按钮
        const showResultDetailBtn = document.getElementById('showResultDetailBtn');
        if (showResultDetailBtn) {
            showResultDetailBtn.addEventListener('click', handleShowResultDetail);
            log('✓ 查看详情按钮已绑定');
        }

        const resetHomeBtn = document.getElementById('resetHomeBtn');
        if (resetHomeBtn) {
            resetHomeBtn.addEventListener('click', handleResetHome);
            log('✓ 重新测试按钮已绑定');
        }

        const showRecordsBtn2 = document.getElementById('showRecordsBtn2');
        if (showRecordsBtn2) {
            showRecordsBtn2.addEventListener('click', () => showRecords('all'));
            log('✓ 查看历史记录按钮2已绑定');
        }

        // 绑定历史记录页按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                showRecords(filter);
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        log('✓ 筛选按钮已绑定');

        const resetHomeBtn2 = document.getElementById('resetHomeBtn2');
        if (resetHomeBtn2) {
            resetHomeBtn2.addEventListener('click', handleResetHome);
            log('✓ 返回首页按钮已绑定');
        }

        // 绑定弹窗按钮
        const closeModalBtn = document.getElementById('closeModalBtn');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', handleCloseDetailModal);
            log('✓ 关闭弹窗按钮已绑定');
        }

        const deleteRecordBtn = document.getElementById('deleteRecordBtn');
        if (deleteRecordBtn) {
            deleteRecordBtn.addEventListener('click', handleDeleteCurrentRecord);
            log('✓ 删除记录按钮已绑定');
        }

        // 绑定键盘事件
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    const modifyBtn = document.getElementById('modifyBtn');
                    if (modifyBtn && modifyBtn.style.display !== 'none') {
                        handleNextQuestion();
                    } else {
                        handleSubmitAnswer();
                    }
                }
            });
            log('✓ 键盘事件已绑定');
        }

        log('✓ 应用初始化完成', 'success');
        window.appLoaded = true;

    } catch (error) {
        log(`✗ 应用初始化失败: ${error.message}`, 'error');
        log(`错误堆栈: ${error.stack}`, 'error');
        alert('应用初始化失败，请刷新页面重试');
    }
});

// 事件处理函数
function handleStartTest() {
    log('开始测试被点击');
    try {
        const count = parseInt(document.getElementById('questionCount').value);
        const enableTimer = document.getElementById('enableTimer').checked;
        log(`题目数量: ${count}, 启用计时器: ${enableTimer}`);
        startTestCore(count, enableTimer);
    } catch (error) {
        log(`开始测试失败: ${error.message}`, 'error');
        alert('开始测试失败: ' + error.message);
    }
}

function handleSubmitAnswer() {
    log('提交答案被点击');
    try {
        submitAnswer();
    } catch (error) {
        log(`提交答案失败: ${error.message}`, 'error');
    }
}

function handleModifyAnswer() {
    log('修改答案被点击');
    try {
        modifyAnswer();
    } catch (error) {
        log(`修改答案失败: ${error.message}`, 'error');
    }
}

function handleNextQuestion() {
    log('下一题被点击');
    try {
        nextQuestion();
    } catch (error) {
        log(`下一题失败: ${error.message}`, 'error');
    }
}

function handleShowResultDetail() {
    log('查看详情被点击');
    try {
        if (!testState.record) {
            log('没有可显示的测试记录', 'error');
            alert('没有可显示的测试记录');
            return;
        }
        showResultDetailCore(testState.record);
    } catch (error) {
        log(`查看详情失败: ${error.message}`, 'error');
    }
}

function handleResetHome() {
    log('重置到首页被点击');
    try {
        resetHome();
    } catch (error) {
        log(`重置失败: ${error.message}`, 'error');
    }
}

function handleCloseDetailModal() {
    log('关闭弹窗被点击');
    try {
        closeDetailModal();
    } catch (error) {
        log(`关闭弹窗失败: ${error.message}`, 'error');
    }
}

function handleDeleteCurrentRecord() {
    log('删除记录被点击');
    try {
        deleteCurrentRecord();
    } catch (error) {
        log(`删除记录失败: ${error.message}`, 'error');
    }
}
