const { generateUUID, formatTime } = require('../../utils/utils.js');
const { saveTestRecord } = require('../../utils/storage.js');
const { startTimer } = require('../../utils/timer.js');
const app = getApp();

Page({
  data: {
    currentIndex: 0,
    totalQuestions: 0,
    currentScore: 0,
    question: '',
    answer: '',
    timeLeft: 0,
    maxTime: 0,
    progress: 100,
    timerText: '30秒',
    timerClass: '',
    inputDisabled: false,
    inputError: false,
    inputFocus: true,
    feedback: '',
    feedbackClass: '',
    showModify: false,
    showNext: false,
    submitDisabled: false
  },

  timerInstance: null,

  onLoad() {
    this.loadQuestion();
  },

  onUnload() {
    if (this.timerInstance) {
      this.timerInstance.stop();
    }
  },

  loadQuestion() {
    const test = app.globalData.currentTest;
    const question = test.questions[test.currentIndex];

    console.log('=== 加载题目 ===');
    console.log('当前题号:', test.currentIndex);
    console.log('题目:', question.question);
    console.log('正确答案:', question.answer, typeof question.answer);
    console.log('答案类型检查:', typeof question.answer === 'number');

    this.setData({
      currentIndex: test.currentIndex,
      totalQuestions: test.questions.length,
      question: question.question,
      answer: '',
      inputDisabled: false,
      inputError: false,
      inputFocus: true,
      feedback: '',
      feedbackClass: '',
      showModify: false,
      showNext: false,
      submitDisabled: false
    });

    const currentScore = Math.round(
      (test.correctCount / (test.currentIndex + 1)) * 100
    ) || 0;

    this.setData({ currentScore });

    // 启动计时器
    if (this.timerInstance) {
      this.timerInstance.stop();
    }

    this.timerInstance = startTimer(
      question.timeLimit,
      (timeLeft, maxTime) => this.onTimerTick(timeLeft, maxTime),
      () => this.onTimerTimeout()
    );

    this.setData({
      timeLeft: question.timeLimit,
      maxTime: question.timeLimit,
      progress: 100,
      timerText: `${question.timeLimit}秒`,
      timerClass: ''
    });
  },

  onTimerTick(timeLeft, maxTime) {
    const progress = (timeLeft / maxTime) * 100;
    let timerClass = '';
    if (timeLeft <= 5) {
      timerClass = 'danger';
    } else if (timeLeft <= 10) {
      timerClass = 'warning';
    }

    this.setData({
      timeLeft,
      progress,
      timerText: `${timeLeft}秒`,
      timerClass
    });
  },

  onTimerTimeout() {
    this.setData({
      inputDisabled: true,
      inputError: true,
      showModify: true
    });

    // 自动提交错误答案
    this.submitAnswer(0);
  },

  onAnswerInput(e) {
    this.setData({
      answer: e.detail.value
    });
  },

  submitAnswer(userAnswerOverride = null) {
    const inputAnswer = this.data.answer;
    let answer;
    
    if (userAnswerOverride !== null) {
      answer = userAnswerOverride;
    } else {
      if (inputAnswer === '' || inputAnswer === undefined || inputAnswer === null) {
        answer = NaN;
      } else {
        const parsed = parseInt(inputAnswer);
        answer = isNaN(parsed) ? NaN : parsed;
      }
    }
    
    const test = app.globalData.currentTest;
    const question = test.questions[test.currentIndex];
    const isCorrect = answer === question.answer;

    console.log('=== 答题调试信息 ===');
    console.log('用户输入:', inputAnswer, typeof inputAnswer);
    console.log('转换后答案:', answer, typeof answer);
    console.log('正确答案:', question.answer, typeof question.answer);
    console.log('是否正确:', isCorrect);
    console.log('答案比较:', answer, '===', question.answer, '=', answer === question.answer);

    // 查找是否已有答案
    const existingAnswerIndex = test.answers.findIndex(
      a => a.questionId === question.id
    );

    if (existingAnswerIndex !== -1) {
      const prevHadError = test.answers[existingAnswerIndex].hadError;
      const newHadError = prevHadError || !isCorrect;

      test.answers[existingAnswerIndex] = {
        ...test.answers[existingAnswerIndex],
        userAnswer: answer,
        isCorrect: isCorrect,
        timeSpent: test.answers[existingAnswerIndex].timeSpent + (this.data.maxTime - this.data.timeLeft),
        hadError: newHadError
      };

      if (isCorrect && !test.answers[existingAnswerIndex].wasCorrect) {
        test.correctCount++;
      }

      test.answers[existingAnswerIndex].wasCorrect = isCorrect;
    } else {
      test.answers.push({
        questionId: question.id,
        question: question.question,
        userAnswer: answer,
        correctAnswer: question.answer,
        isCorrect: isCorrect,
        type: question.type,
        difficulty: question.difficulty,
        timeLimit: question.timeLimit,
        timeSpent: this.data.maxTime - this.data.timeLeft,
        hadError: !isCorrect,
        wasCorrect: isCorrect
      });

      if (isCorrect) {
        test.correctCount++;
      }
    }

    // 更新分数
    const currentScore = Math.round(
      (test.correctCount / (test.currentIndex + 1)) * 100
    );

    this.setData({
      currentScore,
      inputDisabled: true,
      inputError: !isCorrect,
      submitDisabled: true
    });

    if (isCorrect) {
      this.setData({
        feedback: '✓ 正确！',
        feedbackClass: 'success',
        showModify: false,
        showNext: false
      });

      // 1秒后自动下一题
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    } else {
      this.setData({
        feedback: '✗ 错误！',
        feedbackClass: 'error',
        showModify: true,
        showNext: true
      });
    }
  },

  modifyAnswer() {
    this.setData({
      answer: '',
      inputDisabled: false,
      inputError: false,
      inputFocus: true,
      feedback: '',
      feedbackClass: '',
      showModify: false,
      showNext: false,
      submitDisabled: false
    });
  },

  nextQuestion() {
    const test = app.globalData.currentTest;
    test.currentIndex++;

    if (test.currentIndex >= test.questions.length) {
      this.showResult();
    } else {
      this.loadQuestion();
    }
  },

  showResult() {
    if (this.timerInstance) {
      this.timerInstance.stop();
    }

    const test = app.globalData.currentTest;
    const totalTime = Math.round((Date.now() - test.startTime) / 1000);
    const score = Math.round((test.correctCount / test.questions.length) * 100);

    const testRecord = {
      testId: generateUUID(),
      date: new Date().toLocaleString('zh-CN'),
      settings: {
        questionCount: test.questions.length,
        enableTimer: test.enableTimer
      },
      totalTime: totalTime,
      score: score,
      correctCount: test.correctCount,
      totalCount: test.questions.length,
      questions: test.answers
    };

    saveTestRecord(testRecord);

    // 跳转到结果页
    wx.redirectTo({
      url: `/pages/result/result?score=${score}&correctCount=${test.correctCount}&totalCount=${test.questions.length}&totalTime=${totalTime}`
    });
  }
});