import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "three/examples/jsm/controls/DragControls.js";

const gui = new dat.GUI();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  sizes.height = innerHeight;
  sizes.width = innerWidth;

  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //Update Renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scene
const scene = new THREE.Scene();

// Object
const params = {
  color: 0xff0000,
};
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: params.color });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 0.5;
scene.add(mesh);
var objects = [mesh];
//Grid
const size = 10;
const divisions = 20;

const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 10;

//Controls
const orbitcontrols = new OrbitControls(camera, canvas);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Animate
const clock = new THREE.Clock();
const controls = new DragControls(objects, camera, renderer.domElement);

controls.addEventListener("dragstart", function (event) {
  orbitcontrols.enabled = false;
});

controls.addEventListener("dragend", function (event) {
  orbitcontrols.enabled = true;
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
// Debug
function buttonFunction() {
  const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
  const material = new THREE.MeshBasicMaterial({ color: params.color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.material.color.set( Math.random() * 0xffffff );
  mesh.position.y = 0.5;
  scene.add(mesh);
  objects.push(mesh);
}

var stuff = {
  Cubo: buttonFunction,
};

var folder = gui.addFolder("My folder");

folder.add(stuff, "Cubo");

folder.open();

tick();
