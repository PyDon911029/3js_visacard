import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

// const light = new THREE.SpotLight();
// light.position.set(5, 5, 5)
// scene.add(light);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 1

const renderer = new THREE.WebGLRenderer()
renderer.physicallyCorrectLights = true //deprecated
renderer.useLegacyLights = false //use this instead of setting physicallyCorrectLights=true property
renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearAlpha(0)
document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

const loader = new GLTFLoader()
loader.load(
    'Card_test_001.glb',
    function (obj) {
        scene.add(obj.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

loader.load(
    'card1.glb',
    function (obj) {
        scene.add(obj.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

window.addEventListener('wheel', onWheel, false)
function onWheel(e) {
    // const cx = 0;
    // const cy = 0;
	if (e.wheelDelta > 0) {
        
        for (let i = 0; i < scene.children.length; i++) {
            // if ( -0.7 < scene.children[i].rotation.y) {
                scene.children[i].rotation.y = scene.children[i].rotation.y + 0.09 * i;
                console.log(scene.children[i].rotation.y);
            // } else {
                
            // }
        }
	}else if (e.wheelDelta < 0){
		for (let i = 0; i < scene.children.length; i++) {
            // cy--;
            // scene.children[i].rotation.x--;
            console.log(scene.children[i].rotation.y);
            scene.children[i].rotation.y = scene.children[i].rotation.y - 0.09 * i;
        }
	}
}

// function rotateAround( center, angle ) {

//     const c = Math.cos( angle ), s = Math.sin( angle );

//     const x = this.x - center.x;
//     const y = this.y - center.y;

//     this.x = x * c - y * s + center.x;
//     this.y = x * s + y * c + center.y;

//     return this;

// }

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)
    for (let i = 0; i < scene.children.length; i++) {
        if ( -0.7 < scene.children[i].rotation.y) {
            scene.children[i].rotation.y = scene.children[i].rotation.y + 0.01 * i;
            console.log(scene.children[i].rotation.y);
        } else {
            
        }
    }
    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()