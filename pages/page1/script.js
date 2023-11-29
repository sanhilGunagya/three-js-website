import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {Water} from 'three/examples/jsm/objects/Water';


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const pointLight = new THREE.PointLight(0xffffff,100,500);
pointLight.position.set(0,3,0)

scene.add(pointLight);

const watergeometry = new THREE.PlaneGeometry(10000,10000);

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

water.rotation.x = Math.PI*(-0.5);
scene.add(water);


update()
function update(){
  water.material.uniforms['time'].value += 0.01;
  requestAnimationFrame(update)
}



const controls = new OrbitControls(camera,renderer.domElement);



// scene.background = new THREE.Color(0x87CEEB);
scene.background = new THREE.Color(0.1,0.5,0.5);




camera.position.set(-2.5,32,23)
animate()

function animate(){
  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
  console.log(camera.position)
}