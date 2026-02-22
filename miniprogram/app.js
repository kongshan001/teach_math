App({
  onLaunch() {
    // 应用启动
  },

  globalData: {
    currentTest: {
      questions: [],
      currentIndex: 0,
      correctCount: 0,
      answers: [],
      startTime: null,
      enableTimer: false
    },
    timer: null,
    timeLeft: 0,
    maxTime: 0
  }
})