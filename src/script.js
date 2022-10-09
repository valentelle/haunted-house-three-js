import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.hide()
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

/**
 * Fog
 */
 const fog = new THREE.Fog('#262837', 1, 15)
 scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const gravesColorTexture = textureLoader.load('/textures/graves/rough_plasterbrick_05_diff_2k.png')
const gravesDisplacementTexture = textureLoader.load('/textures/graves/rough_plasterbrick_05_disp_2k.png')
const gravesAmbientOcclusionTexture = textureLoader.load('/textures/graves/rough_plasterbrick_05_ao_2k.png')
const gravesNormalTexture = textureLoader.load('/textures/graves/rough_plasterbrick_05_nor_dx_2k.png')
const gravesRoughnessTexture = textureLoader.load('/textures/graves/rough_plasterbrick_05_rough_2k.png')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

//repeate texture
grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping


/**
 * House
 */
//Group
const house = new THREE.Group()
scene.add(house)

//Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ 
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
     })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 2.5 / 2 
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
     })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.z = 2 + 0.01
door.position.y = 1
house.add(door)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

//Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ 
    map: gravesColorTexture,
    transparent: true,
    aoMap: gravesAmbientOcclusionTexture,
    displacementMap: gravesDisplacementTexture,
    displacementScale: 0,
    normalMap: gravesNormalTexture,
    roughnessMap: gravesRoughnessTexture
 })

for(let i = 0; i < 40; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    grave.position.set(x, 0.3, z)                              

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the graves container
    graves.add(grave)
    grave.castShadow = true
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

/**
 * Ghosts
 */

 //Group
const ghostBodyGeometry = new THREE.SphereGeometry( 0.2, 10, 10);
const ghostBodyMaterial = new THREE.MeshLambertMaterial( {
    color: 0xffffff,
    // transparent: true,
    // opacity: 0.8,
    emissive: 0xffffff,
    emissiveIntensity: 10
} );
const ghostTailGeometry = new THREE.ConeGeometry( 0.15, 0.2, 6 );
const ghostTailMaterial = new THREE.MeshLambertMaterial( {
    color: 0xffffff,
    // transparent: true,
    // opacity: 0.8,
    emissive: 0xffffff,
    emissiveIntensity: 10
} );
const ghostEyeGeometry = new THREE.CircleGeometry( 0.05, 32 );
const ghostEyeMaterial = new THREE.MeshBasicMaterial( { 
    color: 0x000000, } );
ghostEyeMaterial.side = THREE.DoubleSide

let ghosts = [];

for(let i = 0; i < 3; i++) {
    const ghostBody = new THREE.Mesh( ghostBodyGeometry, ghostBodyMaterial );
    ghostBody.position.set(0, 0, 0)

    
    const ghostEye1 = new THREE.Mesh( ghostEyeGeometry, ghostEyeMaterial );
    ghostEye1.position.set(-0.08, ghostBody.position.y + 0.1, 0.16)
    ghostEye1.rotation.x = Math.PI * -0.20
    ghostEye1.rotation.y = Math.PI * -0.1
    const ghostEye2 = new THREE.Mesh( ghostEyeGeometry, ghostEyeMaterial );
    ghostEye2.position.set(0.08, ghostBody.position.y + 0.1, 0.16)
    ghostEye2.rotation.x = Math.PI * -0.20
    ghostEye2.rotation.y = Math.PI * 0.1

    const ghostTail = new THREE.Mesh( ghostTailGeometry, ghostTailMaterial );
    ghostTail.position.set(0, ghostBody.position.y - 0.1, -0.18)
    ghostTail.rotation.x = Math.PI * -0.65

    const ghost = new THREE.Group()
    const ghostLight = new THREE.PointLight('#63b6ba', 1, 3, 1)
    ghost.add(ghostBody, ghostLight, ghostEye1, ghostEye2, ghostTail)
    ghosts.push(ghost)
    scene.add(ghosts[i])
    ghost.castShadow = true
    ghostLight.shadow.mapSize.width = 256
    ghostLight.shadow.mapSize.height = 256
    ghostLight.shadow.camera.far = 7
    const scale = (Math.random() * (1 - .5) + .5)
    ghosts[i].scale.set(scale, scale, scale)

}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor('#262837') //same color of the fog to hide floor angles
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
 * Shadows
 */

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

doorLight.castShadow = true
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7


walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

/**
 * Animate
 */
const clock = new THREE.Clock()

const randomNumbers1 = []
ghosts.map((ghost) => randomNumbers1.push(Math.random() * (7 - 3) + 3))
const randomNumbers2 = []
ghosts.map((ghost, i) => randomNumbers2.push(Math.random() * (i - 0) + 0))
const randomNumbers3 = []
ghosts.map((ghost) => randomNumbers3.push(Math.random()* (0.5 - 0.1) + 0.1))

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    ghosts.map((ghost, i) => {
        const ghost1Angle = elapsedTime * randomNumbers3[i]
        ghost.position.x = (Math.cos(ghost1Angle) * (randomNumbers1[i] + Math.sin(elapsedTime * randomNumbers2[i])))
        ghost.position.z = Math.sin(ghost1Angle) * (randomNumbers1[i] + Math.sin(elapsedTime * randomNumbers2[i]))
        ghost.position.y = Math.sin(elapsedTime * randomNumbers1[i]) + Math.sin(elapsedTime * randomNumbers2[i])

        if(Math.floor(elapsedTime + randomNumbers1[i]) % 2 == 0) {
            ghost.visible = true
        } else {
            ghost.visible = false
        }
    })

    const cameraAngle = elapsedTime / 4
    camera.position.x = - Math.cos(cameraAngle) * 10
    camera.position.z = Math.sin(cameraAngle) * 5


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()