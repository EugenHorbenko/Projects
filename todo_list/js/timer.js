const refs = {
  clockface: document.querySelector(".js-clockface"),
  startBtn: document.querySelector('.js-start-timer'),
  stopBtn: document.querySelector('.js-stop-timer'),
  plusTimeBtn: document.querySelector('.js-plus-time-button'),
  minusTimeBtn: document.querySelector('.js-minus-time-button'),
};


let setTime = 15;
refs.clockface.textContent = `${setTime}:00`
refs.plusTimeBtn.addEventListener("click", () => {
  setTime += 1
  refs.clockface.textContent = `${setTime}:00`
})
refs.minusTimeBtn.addEventListener("click", () => {
  setTime -= 1
  refs.clockface.textContent = `${setTime}:00`
})

const timer = {
  isActive: false,
  currentDelta: '',

  start() {
    if (this.isActive) {
      return;
    }
    

    this.isActive = true;
    const startTime = Date.now();
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const date = new Date(Math.round(deltaTime / 1000) * 1000);
      const minutes = String(date.getMinutes() - (60 - setTime)).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      updateClockface(`${minutes}:${seconds}`);
      this.currentDelta = deltaTime;
      if(refs.clockface.textContent === "00:00") {
        clearInterval(this.timerId);
        this.isActive = false;
      }
    }, 1000);

    refs.plusTimeBtn.classList.add('hidden')
    refs.minusTimeBtn.classList.add('hidden')
    pauseTimer()

  },
  pause() {
    clearInterval(this.timerId);
    this.isActive = false
    pauseTimer()
  },
  resume() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    const startTime = Date.now();
    const currentDelta = this.currentDelta
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime + currentDelta;
      const date = new Date(Math.round(deltaTime / 1000) * 1000);
      const minutes = String(date.getMinutes() - (60 - setTime)).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      updateClockface(`${minutes}:${seconds}`);
      if(refs.clockface.textContent === "00:00") {
        clearInterval(this.timerId);
        this.isActive = false;
      }
      this.currentDelta = deltaTime

    }, 1000);
  
    pauseTimer()
  },
  stop() {
    this.currentDelta = 0;
    clearInterval(this.timerId);
    this.isActive = false
    updateClockface(`${setTime}:00`);
    refs.startBtn.classList.remove('js-pause-timer')
    refs.startBtn.classList.add('js-resume-timer')
    const resumeBtn = document.querySelector('.js-resume-timer');
    resumeBtn.addEventListener("click", timer.resume.bind(timer));
    refs.startBtn.innerHTML = 'СТАРТ'
    setTime = 15;
    refs.clockface.textContent = `${setTime}:00`
    refs.plusTimeBtn.classList.remove('hidden')
    refs.minusTimeBtn.classList.remove('hidden')
  }
};

refs.startBtn.addEventListener("click", timer.start.bind(timer));
refs.stopBtn.addEventListener("click", timer.stop.bind(timer));

function updateClockface(timeString) {
  refs.clockface.textContent = timeString;
}

function pauseTimer() {
  if(refs.startBtn.classList.value.includes('js-start-timer')){
    refs.startBtn.innerHTML = 'ПАУЗА'
    refs.startBtn.classList.remove('js-start-timer')
    refs.startBtn.classList.add('js-pause-timer')
    const pauseBtn = document.querySelector('.js-pause-timer');
    pauseBtn.addEventListener("click", timer.pause.bind(timer));
  } else if(refs.startBtn.classList.value.includes('js-pause-timer')) {
    refs.startBtn.innerHTML = 'ПРОДОЛЖИТЬ'
    refs.startBtn.classList.remove('js-pause-timer')
    refs.startBtn.classList.add('js-resume-timer')
    const resumeBtn = document.querySelector('.js-resume-timer');
    resumeBtn.addEventListener("click", timer.resume.bind(timer));
  } else if(refs.startBtn.classList.value.includes('js-resume-timer')) {
    refs.startBtn.innerHTML = 'ПАУЗА'
    refs.startBtn.classList.remove('js-resume-timer')
    refs.startBtn.classList.add('js-pause-timer')
    const pauseBtn = document.querySelector('.js-pause-timer');
    pauseBtn.addEventListener("click", timer.pause.bind(timer));
  }
  }
