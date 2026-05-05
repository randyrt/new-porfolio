<template>
  <div v-if="isVRMode" class="vr-container">
    <div style="position: absolute; top: 50px; left: 20px; color: white; background: black; padding: 10px;">VR Mode Active</div>
    <canvas ref="canvasRef" class="vr-canvas"></canvas>
    <button @click="exitVR" class="exit-vr-btn">{{ $t('nav.exit_vr') }}</button>
    <div v-if="!hasXRSupport" class="no-vr-notice">
      {{ $t('nav.no_vr_support') }} - Mode 3D interactif disponible.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import * as THREE from 'three'
import { VRButton } from 'three/addons/webxr/VRButton.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const { t } = useI18n()
const canvasRef = ref<HTMLCanvasElement>()
const isVRMode = ref(false)
const hasXRSupport = ref(false)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let vrButton: HTMLElement

const initVR = () => {
  isVRMode.value = true

  if (!canvasRef.value) return

  hasXRSupport.value = !!navigator.xr

  // Scène
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000011)

  // Caméra
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 1.6, 3)

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Activer XR seulement si supporté
  if (navigator.xr) {
    renderer.xr.enabled = true
    // Bouton VR
    vrButton = VRButton.createButton(renderer)
    document.body.appendChild(vrButton)
  } else {
    // Mode 3D sans VR : ajouter contrôles de souris
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
  }

  // Ajouter des objets 3D pour le portfolio
  addPortfolioObjects()

  // Lumière
  const light = new THREE.AmbientLight(0xffffff, 1)
  scene.add(light)

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()

  isVRMode.value = true
}

const addPortfolioObjects = () => {
  // Cube pour projets
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.position.set(-2, 1, -2)
  scene.add(cube)

  // Animation du cube
  const animateCube = () => {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    requestAnimationFrame(animateCube)
  }
  animateCube()

  // Sphère pour compétences
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(2, 1, -2)
  scene.add(sphere)

  // Animation de la sphère
  const animateSphere = () => {
    sphere.rotation.x += 0.005
    sphere.rotation.z += 0.005
    requestAnimationFrame(animateSphere)
  }
  animateSphere()

  // Texte 3D
  const loader = new FontLoader()
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Portfolio 3D', {
      font: font,
      size: 0.5,
      depth: 0.1,
    })
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const textMesh = new THREE.Mesh(textGeometry, textMaterial)
    textMesh.position.set(0, 2, -3)
    scene.add(textMesh)
  })

  // Ajouter des particules pour un effet visuel
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCount = 1000
  const positions = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const particlesMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 0.02 })
  const particles = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particles)
}

const exitVR = () => {
  if (renderer) {
    renderer.setAnimationLoop(null)
    renderer.dispose()
  }
  if (vrButton) {
    document.body.removeChild(vrButton)
  }
  isVRMode.value = false
}

onMounted(() => {
  initVR()
})

onUnmounted(() => {
  exitVR()
})
</script>

<style scoped>
.vr-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.vr-canvas {
  width: 100%;
  height: 100%;
}

.exit-vr-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.no-vr-notice {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
}
</style>