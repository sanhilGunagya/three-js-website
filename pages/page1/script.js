import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Water } from 'three/examples/jsm/objects/Water';

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Append the renderer to the content div
document.body.appendChild(renderer.domElement);

// Light, water, and other Three.js elements
const pointLight = new THREE.PointLight(0xffffff, 100, 500);
pointLight.position.set(0, 3, 0);
scene.add(pointLight);

const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

const water = new Water(waterGeometry, {
  textureHeight: 512,
  textureWidth: 512,
  waterNormals: new THREE.TextureLoader().load('images/waternormals.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }),
  sunDirection: pointLight.position,
  sunColor: 0x87CEEB,
  waterColor: 0x00546A,
  distortionScale: 4,
});

water.position.y = 1;
water.rotation.x = Math.PI * -0.5;
scene.add(water);

// Your content in the HTML file
const contentElement = document.querySelector('.content');

// Variable to control content movement
const movementSpeed = 0.1;

// Mouse movement event listener
document.addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  // Move content based on mouse movement
  contentElement.style.transform = `translateX(${mouseX * movementSpeed * 100}px)`;

}

// Orbit controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;

// Set background color
scene.background = new THREE.Color(0.1, 0.5, 0.5);

// Set initial camera position
camera.position.set(-2.5, 32, 23);

// Animation update function
function update() {
  water.material.uniforms['time'].value += 0.01;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

update();
