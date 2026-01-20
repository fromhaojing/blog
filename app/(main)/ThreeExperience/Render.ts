import * as THREE from 'three'

import  Experience from '.'

export default class Render {
  instance: THREE.WebGLRenderer
  container: HTMLCanvasElement
  experience: Experience
  constructor(container: HTMLCanvasElement) {
    this.container = container
    this.experience = new Experience()
    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.container,
      antialias: true,
    })
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    // this.instance.setClearColor('#ffffff')
    this.instance.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height
    )
    this.instance.setPixelRatio(this.experience.sizes.pixelRatio)
  }

  resize() {
    this.instance.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height
    )
    this.instance.setPixelRatio(this.experience.sizes.pixelRatio)
  }

  update() {
    this.instance.render(
      this.experience.scene,
      this.experience.camera.instance
    )
  }
}
