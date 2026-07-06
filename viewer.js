import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, model;

init();

function init() {

  // ===== シーン =====
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // ===== カメラ =====
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 2;

  // ===== レンダラー =====
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // ===== ライト =====
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(3, 3, 3);
  scene.add(dirLight);

  // ===== ローダー =====
  const loader = new GLTFLoader();

  loader.load(
    "./model.glb", // ★直置き対応

    function (gltf) {
      model = gltf.scene;
      scene.add(model);

      // 中央に寄せる
      model.position.set(0, 0, 0);

      // 少し見やすくスケール調整（必要なら変更）
      model.scale.set(1, 1, 1);

      animate();
    },

    function (xhr) {
      console.log(`loading: ${(xhr.loaded / xhr.total * 100).toFixed(1)}%`);
    },

    function (error) {
      console.error("❌ GLB読み込み失敗:", error);
    }
  );
}

// ===== アニメーション =====
function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

// ===== リサイズ対応 =====
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
