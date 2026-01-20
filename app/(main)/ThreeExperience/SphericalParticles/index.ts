import * as THREE from 'three'

import Experience from '../'
import sphericalparticlesFragmentShader from './shaders/fragment.glsl'
import sphericalparticlesVertexShader from './shaders/vertex.glsl'

export default class Sphericalparticles {
  experience: Experience
  geometry: THREE.SphereGeometry
  material: THREE.ShaderMaterial
  mesh: THREE.Points<
    THREE.SphereGeometry,
    THREE.ShaderMaterial,
    THREE.Object3DEventMap
  >
  constructor() {
    this.experience = new Experience()
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(15, 32, 16)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: sphericalparticlesVertexShader,
      fragmentShader: sphericalparticlesFragmentShader,
    })
  }

  setMesh() {
    this.mesh = new THREE.Points(this.geometry, this.material)
    this.experience.scene.add(this.mesh)
  }
}
