import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
// camera.position.set(-2057, -1560, -106);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener('change', renderer);
controls.minDistance = 50;
// controls.maxDistance = 10000;

// camera.lookAt(-5057, -1060, -2000);
// camera.position.z = 50;


// let materialArray = [];
// let texture_1 = new THREE.TextureLoader().load('boximg/arid2_ft.jpg');
// let texture_2 = new THREE.TextureLoader().load('boximg/arid2_bk.jpg');
// let texture_3 = new THREE.TextureLoader().load('boximg/arid2_up.jpg');
// let texture_4 = new THREE.TextureLoader().load('boximg/arid2_dn.jpg');
// let texture_5 = new THREE.TextureLoader().load('boximg/arid2_rt.jpg');
// let texture_6 = new THREE.TextureLoader().load('boximg/arid2_lf.jpg');

// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_1 }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_2 }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_3 }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_4 }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_5 }));
// materialArray.push(new THREE.MeshBasicMaterial({ map: texture_6 }));

// for (let i = 0; i < 6; i++)
//     materialArray[i].side = THREE.BackSide;

// let skyboxGeo = new THREE.BoxGeometry(15000, 15000, 15000);
// let skybox = new THREE.Mesh(skyboxGeo, materialArray);
// scene.add(skybox);

const loader = new GLTFLoader();

loader.load('model/scene.gltf',(gltf,err)=>{
    if(err){
        console.log(err)
    }
    const model = gltf.scene;
    scene.add(model)
    model.scale.set(10,10,10)
    model.position.set(0,-20000,0)
    model.traverse( function ( child ) {

        if ( child.isMesh ) {

            var textureLoader = new THREE.TextureLoader();
            var texture = textureLoader.load( 'model/seatexture.jpg' );

            var material = new THREE.MeshStandardMaterial( { map: texture } );
            child.material = material;

        }
})
})
const texture = new THREE.TextureLoader().load('images/seaimg.jpg');
scene.background = texture;

// const fog = new THREE.Fog(0xffffff,1,100)
// scene.fog = fog

const light = new THREE.AmbientLight(0xffffff,2);
scene.add(light)

camera.position.set(0,-110,-60)
// camera.lookAt(0,-20000,0)
// camera.lookAt(933659,10623,-102641)
// camera.position.z = 55;

// const helper = new THREE.CameraHelper(camera);
// scene.add(helper)
// const gridhelper = new THREE.GridHelper(1000,10)
// scene.add(gridhelper)

const axishelper = new THREE.AxesHelper(500);
scene.add(axishelper)

animate()
function animate(){
    controls.update();
    renderer.render(scene,camera);
    // scene.fog.near += 0.1;
    // scene.fog.far += 0.1;
    requestAnimationFrame(animate)
    // console.log(camera.position)
}


