import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';

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
  sunColor: 0x87CEE8,
  waterColor: 0x00546A,
  distortionScale:4


})

water.position.y = 1


water.rotation.x = Math.PI*(-0.5);
scene.add(water);


update()
function update(){
  water.material.uniforms['time'].value += 0.01;
  requestAnimationFrame(update)
}

const contentElement = document.querySelector('.content');

const movementSpeed = 0.1;

document.addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;

  contentElement.style.transform = `translateX(${mouseX * movementSpeed * 250}px)`;
}



// const controls = new OrbitControls(camera,renderer.domElement);

const loader = new THREE.TextureLoader();

scene.background = loader.load('./images/sea.jpg');
// scene.background = new THREE.Color(0.1,0.5,0.5);



window.addEventListener('resize',function(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})



camera.position.y = 15;


camera.position.z = 50;

camera.lookAt(288,42,48);

// const camerahelper = new THREE.CameraHelper(camera);
// scene.add(camerahelper);
// camerahelper.scale.set(50,50,50);




// const gridHelper = new THREE.GridHelper(200, 10);
// scene.add(gridHelper);


let mouseX = 0

let windowHalfX = window.innerWidth / 2;

document.addEventListener( 'mousemove', onDocumentMouseMove );

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) * 0.1;

}


animate()

function animate(){
  // controls.update();

  camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.lookAt( scene.position );

  renderer.render(scene,camera);
  requestAnimationFrame(animate);
  // camera.position.z += (mouseX - camera.position.z)*0.002;
  console.log(camera.position)
}

