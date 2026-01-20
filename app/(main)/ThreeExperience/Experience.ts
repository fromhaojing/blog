import * as THREE from 'three'

import { Camera, Render, Sphericalparticles } from '.'
import { Sizes, Time } from './Utils'

export default class Experience {
  private static instance: Experience | null = null

  container: HTMLCanvasElement
  scene: THREE.Scene
  camera: Camera
  sizes: Sizes
  renderer: Render
  time: Time
  sphericalparticles: Sphericalparticles

  // 添加获取实例的静态方法
  static getInstance(): Experience {
    if (!Experience.instance) {
      throw new Error('Experience instance has not been created yet')
    }
    return Experience.instance
  }

  constructor(container?: HTMLCanvasElement) {
    if (Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this
    this.container = container!
    this.scene = new THREE.Scene()
    this.sizes = new Sizes()
    this.time = new Time()
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    // this.scene.add(ambientLight)
    this.camera = new Camera()
    this.renderer = new Render(container)
    this.sphericalparticles = new Sphericalparticles()

    this.sizes.on('resize', () => {
      this.resize()
    })
    this.time.on('tick', () => {
      this.update()
    })
  }
  resize() {
    this.renderer.resize()
  }
  update() {
    this.renderer.update()
  }
}
