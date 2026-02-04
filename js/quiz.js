import { stopTimer, getTimeLeft, getMaxTime } from './timer.js';
import { showFeedback, setInputState, updateProgressInfo, updateButtons } from './ui.js';
import { currentTest } from './state.js';

// 提交答案
export function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answerInput').value);
    const question = currentTest.questions[currentTest.currentIndex];
    const isCorrect = userAnswer === question.answer;
    const timeSpent = getMaxTime() - getTimeLeft();

    currentTest.answers.push({
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.answer,
        isCorrect: isCorrect,
        type: question.type,
        difficulty: question.difficulty,
        timeLimit: question.timeLimit,
        timeSpent: timeSpent
    });

    stopTimer();
    setInputState(true, !isCorrect);
    updateProgressInfo();

    if (isCorrect) {
        currentTest.correctCount++;
        showFeedback('✓ 正确！', 'success');
        updateButtons(false, false);
        setTimeout(() => {
            window.nextQuestion();
        }, 1000);
    } else {
        showFeedback('✗ 错误！', 'error');
        updateButtons(true, true);
    }
}

// 修改答案
export function modifyAnswer() {
    const answer = currentTest.answers.pop();
    currentTest.correctCount--;
    
    const input = document.getElementById('answerInput');
    input.value = answer.userAnswer;
    input.disabled = false;
    input.classList.remove('error');
    
    window.clearFeedback();
    updateButtons(false, false);
    
    const timeLeft = answer.timeLimit - answer.timeSpent;
    const maxTime = answer.timeLimit;
    window.startTimer(timeLeft);
}

// 下一题
export function nextQuestion() {
    currentTest.currentIndex++;
    
    if (currentTest.currentIndex >= currentTest.questions.length) {
        window.showResult();
    } else {
        window.showQuestion();
    }
}
