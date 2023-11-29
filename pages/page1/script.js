import * as THREE from 'three';

const container = document.querySelector('container')
const loader = new THREE.TextureLoader();

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,innerWidth/innerHeight, 0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(14,8,15,9);
const material = new THREE.MeshBasicMaterial({
  // color:'red'
})

const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);
camera.position.z = 4


renderer.render(scene,camera);