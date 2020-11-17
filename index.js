class Timer {
  constructor(durationInput, startBtn, pauseBtn, callbacks) {
    this.durationInput = durationInput
    this.startBtn = startBtn
    this.pauseBtn = pauseBtn
    this.pauseBtn = pauseBtn

    if (callbacks) {
      this.onStart = callbacks.onStart
      this.onTick = callbacks.onTick
      this.onComplete = callbacks.onComplete
    }

    this.startBtn.addEventListener('click', this.start)
    this.pauseBtn.addEventListener('click', this.pause)
  }

  start = () => {
    if (this.onStart) {
      this.onStart()
    }

    // avoid 1sec delay
    this.tick()
    this.interval = setInterval(this.tick, 1000)
    if (this.onTick) {
      this.onTick()
    }

  }

  pause = () => {
    clearInterval(this.interval)
  }
  
  // Data - i.e. current time - sits in DOM (input element)
  tick = () => {
    
    if (this.timeRemaining <= 0) {
      this.pause()
      if(this.onComplete) this.onComplete()
    } else {
      this.timeRemaining = this.timeRemaining - 1 
    }
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value)
  }

  set timeRemaining(time) {
    this.durationInput.value = time
  }

}

const durationInput = document.querySelector('#duration')
const startBtn = document.querySelector('#start')
const pauseBtn = document.querySelector('#pause')

const timer = new Timer(durationInput, startBtn, pauseBtn, {
  onStart() {
    console.log('Timer started')
  },
  onTick() {
    console.log('Timer is ticking');
  },
  onComplete() {
    console.log('Timer is done');
  }
})

