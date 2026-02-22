function startTimer(maxTime, onTick, onTimeout) {
  let timeLeft = maxTime;
  let timer = null;

  function tick() {
    timeLeft--;
    if (typeof onTick === 'function') {
      onTick(timeLeft, maxTime);
    }
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (typeof onTimeout === 'function') {
        onTimeout();
      }
    }
  }

  timer = setInterval(tick, 1000);

  return {
    getTimeLeft: () => timeLeft,
    getMaxTime: () => maxTime,
    stop: () => {
      clearInterval(timer);
    }
  };
}

module.exports = {
  startTimer
};