import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter {
  startTime: number
  currentTime: number
  elapsed: number
  delta: number
  constructor() {
    super()
    this.startTime = Date.now()
    this.currentTime = this.startTime
    this.elapsed = 0
    this.delta = 16
    this.tick()
  }

  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.currentTime
    this.currentTime = currentTime
    this.elapsed = this.currentTime - this.startTime
    this.trigger('tick')
    requestAnimationFrame(() => {
      this.tick()
    })
  }
}
