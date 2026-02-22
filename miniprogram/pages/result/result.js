const { loadRecords, deleteRecord } = require('../../utils/storage.js');
const { formatTime } = require('../../utils/utils.js');
const app = getApp();

Page({
  data: {
    score: 0,
    correctCount: 0,
    totalCount: 0,
    totalTime: ''
  },

  onLoad(options) {
    const score = parseInt(options.score) || 0;
    const correctCount = parseInt(options.correctCount) || 0;
    const totalCount = parseInt(options.totalCount) || 0;
    const totalTime = parseInt(options.totalTime) || 0;

    this.setData({
      score,
      correctCount,
      totalCount,
      totalTime: formatTime(totalTime)
    });
  },

  showResultDetail() {
    const records = loadRecords();
    if (records.length === 0) {
      wx.showToast({
        title: '没有可显示的记录',
        icon: 'none'
      });
      return;
    }

    // 显示最新记录的详情
    const latestRecord = records[0];
    const questionsJson = JSON.stringify(latestRecord.questions);

    wx.navigateTo({
      url: `/pages/records/records?mode=detail&testId=${latestRecord.testId}`
    });
  },

  resetHome() {
    wx.navigateBack({
      delta: 2
    });
  },

  showRecords() {
    wx.navigateTo({
      url: '/pages/records/records'
    });
  }
});