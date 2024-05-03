import * as THREE from 'three'
import { Wireframe } from 'three/examples/jsm/Addons.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object 
 */
const geometry = new THREE.OctahedronGeometry(1, 0)
const material = new THREE.MeshToonMaterial({color: 0x00ff00})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Adding edges
const edgesGeometry = new THREE.EdgesGeometry(mesh.geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const edgesMesh = new THREE.LineSegments(edgesGeometry, lineMaterial);
scene.add(edgesMesh);

const positionsArray = new Float32Array([
    0,0,0,
    0,1,0,
    1,0,0
])

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblClick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullScreen)
        {
            canvas.webkitRequestFullScreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(1, 1, 1).normalize()
scene.add(light)


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


