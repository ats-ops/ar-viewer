import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, model;

init();

function init() {

  // シーン
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // カメラ
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  // レンダラー
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  // ライト
  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);

  // ローダー
  const loader = new GLTFLoader();

  loader.load(
    "models/model.glb",

    function (gltf) {
      model = gltf.scene;
      scene.add(model);
      animate();
    },

    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },

    function (error) {
      console.error("GLB読み込み失敗:", error);
    }
  );
}

// アニメーション
function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
