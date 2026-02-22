import { resetTestState, currentTest } from './state.js';

// 显示指定页面
export function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// 重置到首页
export function resetHome() {
    resetTestState();
    showPage('homePage');
    document.getElementById('questionCount').value = '20';
    document.getElementById('enableTimer').checked = false;
}

// 显示反馈
export function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = 'feedback ' + type;
    feedback.style.display = 'block';
}

// 清除反馈
export function clearFeedback() {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback';
    feedback.style.display = 'none';
}

// 设置输入框状态
export function setInputState(disabled, hasError = false) {
    const input = document.getElementById('answerInput');
    input.disabled = disabled;
    
    if (hasError) {
        input.classList.add('error');
    } else {
        input.classList.remove('error');
    }
}

// 更新进度信息
export function updateProgressInfo() {
    document.getElementById('currentQuestionNum').textContent = currentTest.currentIndex + 1;
    document.getElementById('totalQuestions').textContent = currentTest.questions.length;
    document.getElementById('currentScore').textContent = Math.round(
        (currentTest.correctCount / (currentTest.currentIndex + 1)) * 100
    );
}

// 更新按钮显示
export function updateButtons(modifyVisible, nextVisible) {
    document.getElementById('modifyBtn').style.display = modifyVisible ? 'inline-block' : 'none';
    document.getElementById('nextBtn').style.display = nextVisible ? 'inline-block' : 'none';
}

// 显示弹窗
export function showModal() {
    document.getElementById('detailModal').classList.add('active');
}

// 隐藏弹窗
export function hideModal() {
    document.getElementById('detailModal').classList.remove('active');
}

// 处理键盘事件
export function handleKeyPress(event) {
    if (event.key === 'Enter') {
        if (document.getElementById('modifyBtn').style.display === 'none') {
            window.submitAnswer();
        } else {
            window.nextQuestion();
        }
    }
}
