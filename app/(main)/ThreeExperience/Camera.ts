import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Experience from '.'

export default class Camera {
  instance: THREE.PerspectiveCamera
  experience: Experience
  controls: OrbitControls
  constructor() {
    this.experience = new Experience()
    this.setInstance()
    this.setControls()
  }
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.experience.sizes.width / this.experience.sizes.height,
      1,
      100
    )
    this.instance.position.set(0, 0, 50)
    this.experience.scene.add(this.instance)
  }
  setControls() {
    this.controls = new OrbitControls(this.instance, this.experience.container)
    this.controls.enableDamping = true
  }
}
