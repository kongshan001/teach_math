const { generateQuestions } = require('../../utils/questionGenerator.js');
const app = getApp();

Page({
  data: {
    questionCount: 20,
    enableTimer: false
  },

  onLoad() {
  },

  onQuestionCountInput(e) {
    let value = parseInt(e.detail.value) || 20;
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    this.setData({ questionCount: value });
  },

  onTimerToggle() {
    this.setData({
      enableTimer: !this.data.enableTimer
    });
  },

  startTest() {
    const { questionCount, enableTimer } = this.data;
    
    if (questionCount < 1 || questionCount > 100) {
      wx.showToast({
        title: '题目数量必须在1-100之间',
        icon: 'none'
      });
      return;
    }

    // 重置状态
    app.globalData.currentTest = {
      questions: [],
      currentIndex: 0,
      correctCount: 0,
      answers: [],
      startTime: Date.now(),
      enableTimer: enableTimer
    };

    // 生成题目
    app.globalData.currentTest.questions = generateQuestions(questionCount);

    // 跳转到答题页
    wx.navigateTo({
      url: '/pages/quiz/quiz'
    });
  },

  showRecords() {
    wx.navigateTo({
      url: '/pages/records/records'
    });
  }
});