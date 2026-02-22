import { stopTimer, getTimeLeft, getMaxTime } from './timer.js';
import { showFeedback, setInputState, updateProgressInfo, updateButtons } from './ui.js';
import { currentTest } from './state.js';

// 提交答案
export function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answerInput').value);
    const question = currentTest.questions[currentTest.currentIndex];
    const isCorrect = userAnswer === question.answer;
    const timeSpent = getMaxTime() - getTimeLeft();

    console.log(`submitAnswer - question.id: ${question.id}, userAnswer: ${userAnswer}, isCorrect: ${isCorrect}`);
    console.log(`submitAnswer - currentTest.answers.length: ${currentTest.answers.length}`);
    console.log(`submitAnswer - currentTest.answers:`, currentTest.answers.map(a => ({ questionId: a.questionId, hadError: a.hadError, isCorrect: a.isCorrect })));

    const existingAnswerIndex = currentTest.answers.findIndex(
        a => a.questionId === question.id
    );

    console.log(`submitAnswer - existingAnswerIndex: ${existingAnswerIndex}, isCorrect: ${isCorrect}`);

    if (existingAnswerIndex !== -1) {
        const prevHadError = currentTest.answers[existingAnswerIndex].hadError;
        const newHadError = prevHadError || !isCorrect;
        
        console.log(`submitAnswer - prevHadError: ${prevHadError}, newHadError: ${newHadError}`);
        
        currentTest.answers[existingAnswerIndex] = {
            ...currentTest.answers[existingAnswerIndex],
            userAnswer: userAnswer,
            isCorrect: isCorrect,
            timeSpent: currentTest.answers[existingAnswerIndex].timeSpent + timeSpent,
            hadError: newHadError
        };
        
        if (isCorrect && !currentTest.answers[existingAnswerIndex].wasCorrect) {
            currentTest.correctCount++;
        }
        
        currentTest.answers[existingAnswerIndex].wasCorrect = isCorrect;
        
        console.log(`submitAnswer - Updated answer:`, currentTest.answers[existingAnswerIndex]);
    } else {
        const answer = {
            questionId: question.id,
            question: question.question,
            userAnswer: userAnswer,
            correctAnswer: question.answer,
            isCorrect: isCorrect,
            type: question.type,
            difficulty: question.difficulty,
            timeLimit: question.timeLimit,
            timeSpent: timeSpent,
            hadError: !isCorrect,
            wasCorrect: isCorrect
        };
        
        currentTest.answers.push(answer);
        console.log(`submitAnswer - New answer:`, answer);

        if (isCorrect) {
            currentTest.correctCount++;
        }
    }

    stopTimer();
    setInputState(true, !isCorrect);
    updateProgressInfo();

    if (isCorrect) {
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
    const input = document.getElementById('answerInput');
    input.value = '';
    input.disabled = false;
    input.classList.remove('error');
    input.focus();
    
    window.clearFeedback();
    updateButtons(false, false);
    
    const question = currentTest.questions[currentTest.currentIndex];
    const existingAnswer = currentTest.answers.find(a => a.questionId === question.id);
    
    if (existingAnswer) {
        const timeLeft = existingAnswer.timeLimit - existingAnswer.timeSpent;
        window.startTimer(timeLeft);
    } else {
        window.startTimer(question.timeLimit);
    }
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
