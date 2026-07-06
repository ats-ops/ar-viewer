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

  const light1 = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light1);

  camera.position.z = 2;

  const loader = new THREE.GLTFLoader();

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
      console.error("モデル読み込み失敗", error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}