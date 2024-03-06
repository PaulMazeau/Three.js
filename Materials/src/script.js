import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace
/**
 * Object
 */

//MeshBasicMaterial
//const material = new THREE.MeshBasicMaterial({map :doorColorTexture})

//const material = new THREE.MeshBasicMaterial()
//material.map = doorColorTexture
//material.color = new THREE.Color('green')
//material.transparent = true
//material.opacity = .5
//material.alphaMap = doorAlphaTexture
//material.side = THREE.DoubleSide
//const material = new THREE.MeshNormalMaterial()
//const material = new THREE.MeshMatcapMaterial()
//material.matcap = matcapTexture
//const material = new THREE.MeshDepthMaterial()
//const material = new THREE.MeshToonMaterial()
//gradientTexture.minFilter = THREE.NearestFilter
//gradientTexture.magFilter = THREE.NearestFilter
//material.gradientMap = gradientTexture

//MeshStandardMaterial
//const material = new THREE.MeshStandardMaterial()
//material.metalness = .7
//material.roughness = .2
//material.map = doorColorTexture //Rajouter une porte
//material.aoMap = doorAmbientOcclusionTexture //Ombre où la texture est sombre
//material.aoMapIntensity = 1
//material.displacementMap = doorHeightTexture //Relief de l'objet
//material.displacementScale = .2 
//material.metalnessMap = doorMetalnessTexture //Effet métallique
//material.roughnessMap = doorRoughnessTexture //Effet de saleté
//material.normalMap = doorNormalTexture //Details de zinzin
//material.normalScale.set(.5, .5)
//material.transparent = true
//material.alphaMap = doorAlphaTexture //Partie visible d'autre non

//gui.add(material, 'metalness').min(0).max(1).step(.0001)
//gui.add(material, 'roughness').min(0).max(1).step(.0001)

//MaterialPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = .7
material.roughness = .2
material.map = doorColorTexture //Rajouter une porte
material.aoMap = doorAmbientOcclusionTexture //Ombre où la texture est sombre
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture //Relief de l'objet
material.displacementScale = .2
material.metalnessMap = doorMetalnessTexture //Effet métallique
material.roughnessMap = doorRoughnessTexture //Effet de saleté
material.normalMap = doorNormalTexture //Details de zinzin
material.normalScale.set(.5, .5)
material.transparent = true
material.alphaMap = doorAlphaTexture //Partie visible d'autre non

gui.add(material, 'metalness').min(0).max(1).step(.0001)
gui.add(material, 'roughness').min(0).max(1).step(.0001)

//material.clearcoat = 1
//material.clearcoatRoughness = 0

//gui.add(material, 'clearcoat').min(0).max(1).step(.0001)
//gui.add(material, 'clearcoatRoughness').min(0).max(1).step(.0001)

//material.sheen = 1
//material.sheenRoughness = .25
//material.sheenColor.set(1,1,1)

//gui.add(material, 'sheen').min(0).max(1).step(.0001)
//gui.add(material, 'sheenRoughness').min(0).max(1).step(.0001)
//gui.addColor(material, 'sheenColor')

/* material.iridescence = 1
material.iridescenceIOR = 1
material.iridescenceThicknessRange = [100, 800]

gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1) */

material.transmission = 1
material.ior = 1.5
material.thickness = .5

gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(1).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(.3, .2, 64, 128),
    material
)
torus.position.x = 1.5


scene.add(sphere, plane, torus)

/**
 * Light
 */

//const ambientLight = new THREE.AmbientLight(0xffffff, 1)
//const pointLight = new THREE.PointLight(0xffffff, 30)
//pointLight.position.x = 2
//pointLight.position.y = 3
//pointLight.position.z = 4
//scene.add(pointLight, ambientLight)

/**
 * Environement map
 */

const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    //Rotate object 
    sphere.rotation.y = .1 * elapsedTime
    plane.rotation.y = .1 * elapsedTime
    torus.rotation.y = .1 * elapsedTime

    sphere.rotation.x = - .15 * elapsedTime
    plane.rotation.x = - .15 * elapsedTime
    torus.rotation.x = - .15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()