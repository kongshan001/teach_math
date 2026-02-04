import { playAlarm } from './utils.js';
import { currentTimer, timeLeft, maxTime } from './state.js';

export function startTimer(seconds, onTick, onComplete) {
    window.timeLeft = seconds;
    window.maxTime = seconds;
    
    updateTimerDisplay();
    
    window.currentTimer = setInterval(() => {
        window.timeLeft--;
        updateTimerDisplay();
        
        if (window.timeLeft <= 0) {
            clearInterval(window.currentTimer);
            playAlarm();
            document.getElementById('timerText').classList.add('danger');
            if (onComplete) onComplete();
        } else if (onTick) {
            onTick(window.timeLeft);
        }
    }, 1000);
}

export function stopTimer() {
    if (window.currentTimer) {
        clearInterval(window.currentTimer);
        window.currentTimer = null;
    }
}

export function updateTimerDisplay() {
    const progress = (window.timeLeft / window.maxTime) * 100;
    document.getElementById('timerProgress').style.width = `${progress}%`;
    document.getElementById('timerText').textContent = `${window.timeLeft}秒`;
    
    const timerText = document.getElementById('timerText');
    timerText.classList.remove('warning', 'danger');
    
    if (window.timeLeft <= 10) {
        timerText.classList.add('danger');
    } else if (window.timeLeft <= 20) {
        timerText.classList.add('warning');
    }
}

export function getTimeLeft() {
    return window.timeLeft;
}

export function getMaxTime() {
    return window.maxTime;
}
