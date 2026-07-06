import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, model;

init();

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  camera.position.z = 2;

  const loader = new GLTFLoader();

  loader.load(
    "models/model.glb",
    function (gltf) {
      model = gltf.scene;
      scene.add(model);
      animate();
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.01;
  renderer.render(scene, camera);
}