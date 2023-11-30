import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
// import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import {Water} from 'three/examples/jsm/objects/Water';


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const pointLight = new THREE.PointLight(0xffffff,100,500);
pointLight.position.set(0,3,0)

scene.add(pointLight);

const watergeometry = new THREE.PlaneGeometry(20000,20000);


const water = new Water(watergeometry,{
  textureHeight: 512,
  textureWidth: 512,
  waterNormals: new THREE.TextureLoader().load('images/waternormals.jpg',function(texture){
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }),

  sunDirection: pointLight.position,
  sunColor: 0x87CEEB,
  waterColor: 0x87CEEB,
  distortionScale:4


})

water.position.y = 1
// const waterhelper = new water


water.rotation.x = Math.PI*(-0.5);
scene.add(water);


update()
function update(){
  water.material.uniforms['time'].value += 0.01;
  requestAnimationFrame(update)
}



// const controls = new OrbitControls(camera,renderer.domElement);
// controls.enablePan = fals

// const loader = new THREE.TextureLoader();

// scene.background = loader.load('./images/sky.jpg');
scene.background = new THREE.Color(0.1,0.5,0.5);



window.addEventListener('resize',function(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})


const flyControls = new FlyControls(camera, renderer.domElement);

// camera.position.set(0, 10, 50);
flyControls.movementSpeed = 0.05;

flyControls.autoForward = false;
flyControls.dragToLook = false;


camera.position.y = 55;




camera.lookAt(-2.5,32,23);

// const camerahelper = new THREE.CameraHelper(camera);
// scene.add(camerahelper);
// camerahelper.scale.set(50,50,50);


// const cssRenderer = new CSS3DRenderer();
// cssRenderer.setSize(window.innerWidth, window.innerHeight);
// cssRenderer.domElement.style.position = 'absolute';
// cssRenderer.domElement.style.top = 0;
// document.body.appendChild(cssRenderer.domElement);

// // Create a HTML element
// const element = document.createElement('div');
// element.style.width = '10px';
// element.style.height = '25px';
// element.style.background = 'red';
// element.style.color = 'black';
// element.textContent = 'Flying HTML!';
// const cssObject = new CSS3DObject(element);
// cssObject.position.set(5, 3, 20); 
// cssObject.rotation.set(0,10,-20)
// scene.add(cssObject);

const gridHelper = new THREE.GridHelper(200, 10);
scene.add(gridHelper);



animate()

function animate(){
  // controls.update();
  flyControls.update(0.01);
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
  // cssRenderer.render(scene, camera);
  // camera.position.z += (mouseX - camera.position.z)*0.002;
  // console.log(camera.position)
}

