import { generateQuestions, generateQuestionsByGrade } from './questionGenerator.js';
import { resetTestState, currentTest } from './state.js';
import { showPage, showFeedback, clearFeedback, setInputState, updateButtons } from './ui.js';
import { startTimer } from './timer.js';

// 开始测试
export function startTest(questionCount, enableTimer, grade = 1, difficultyLevel = 'basic') {
    if (questionCount < 1 || questionCount > 100) {
        alert('题目数量必须在 1-100 之间');
        return;
    }

    resetTestState();
    currentTest.questions = generateQuestionsByGrade(grade, difficultyLevel, questionCount);
    currentTest.startTime = Date.now();
    currentTest.enableTimer = enableTimer;
    currentTest.grade = grade;
    currentTest.difficultyLevel = difficultyLevel;

    showPage('quizPage');
    document.getElementById('totalQuestions').textContent = questionCount;
    document.getElementById('currentScore').textContent = '0';

    showQuestion();
}

// 显示题目
export function showQuestion() {
    const question = currentTest.questions[currentTest.currentIndex];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestionNum').textContent = currentTest.currentIndex + 1;
    
    const input = document.getElementById('answerInput');
    input.value = '';
    input.disabled = false;
    input.classList.remove('error');
    input.focus();
    
    clearFeedback();
    updateButtons(false, false);
    
    startTimer(question.timeLimit);
}

// 显示结果
export function showResult() {
    window.stopTimer();
    
    const totalTime = Math.round((Date.now() - currentTest.startTime) / 1000);
    const score = Math.round((currentTest.correctCount / currentTest.questions.length) * 100);

    const testRecord = {
        testId: window.generateUUID(),
        date: new Date().toLocaleString('zh-CN'),
        settings: {
            questionCount: currentTest.questions.length,
            enableTimer: currentTest.enableTimer,
            grade: currentTest.grade,
            difficultyLevel: currentTest.difficultyLevel
        },
        totalTime: totalTime,
        score: score,
        correctCount: currentTest.correctCount,
        totalCount: currentTest.questions.length,
        questions: currentTest.answers
    };

    window.saveTestRecord(testRecord);

    showPage('resultPage');
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctCount').textContent = currentTest.correctCount;
    document.getElementById('totalCount').textContent = currentTest.questions.length;
    
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    document.getElementById('totalTimeDisplay').textContent = 
        `总用时: ${minutes}分${seconds}秒`;
    
    currentTest.record = testRecord;
}
