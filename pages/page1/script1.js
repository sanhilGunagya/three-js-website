import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
// camera.position.set(-2057, -1560, -106);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', renderer);
controls.minDistance = 5000;
controls.maxDistance = 12000;
controls.minPolarAngle = Math.PI / 2.5;
controls.maxPolarAngle = Math.PI / 2.5;
controls.enableDamping = true; // 


const loader = new GLTFLoader();

loader.load('model/scene.gltf', (gltf, err) => {
    if (err) {
        console.log(err)
    }
    const model = gltf.scene;
    scene.add(model)
    model.traverse(function (child) {

        if (child.isMesh) {

            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load('model/seatexture.jpg');

            var material = new THREE.MeshStandardMaterial({ map: texture });
            child.material = material;

        }
    })
})

// const loader1 = new GLTFLoader()
// loader1.lo
const texture = new THREE.TextureLoader().load('images/seaimg.jpg');
scene.background = texture;



const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light)

camera.position.set(-8338, 1958, 10380)

// const helper = new THREE.CameraHelper(camera);
// scene.add(helper)
// const gridhelper = new THREE.GridHelper(1000,10)
// scene.add(gridhelper)



const axishelper = new THREE.AxesHelper(500);
scene.add(axishelper)

const light1 = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light1)


animate()
function animate() {
    controls.update();
    renderer.render(scene, camera);


    requestAnimationFrame(animate)
    // console.log(camera.position)
}


