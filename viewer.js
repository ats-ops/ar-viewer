const viewer = document.getElementById("viewer");
const panel = document.getElementById("panel");
const info = document.getElementById("info");

let currentPin = null;

// =========================
// データ
// =========================
const parts = {
  "頭頂部": {
    name: "頭頂部",
    position: "-4.023 85.368 17.761",
    orbit: "0deg 80deg 2.5m",
    text: "頭蓋骨の最上部。脳を保護する部位。"
  },

  "下顎": {
    name: "下顎",
    position: "4.682 -45.525 -132.909",
    orbit: "30deg 110deg 2.5m",
    text: "咀嚼を行う骨。"
  },

    "眼窩": {
    name: "眼窩",
    position: "-24.483 51.793 -16.613",
      orbit: "30deg 110deg 2.5m",
    text: "眼球が収まる空間。視覚機能に関係。"
  },

  "犬歯": {
    name: "犬歯",
   position: "-24.314 -18.262 -126.959",
    orbit: "-40deg 100deg 2.5m",
    text: "獲物を捕らえる鋭い歯。"
  }
};

// =========================
// カメラを滑らかに移動
// =========================
function smoothMoveTo(targetPosition, targetOrbit) {

  // ターゲット設定
  viewer.cameraTarget = targetPosition;

  // 一度transition ON
  viewer.style.transition = "all 0.8s ease-in-out";

  // 少し遅らせて角度変更（重要）
  requestAnimationFrame(() => {
    viewer.cameraOrbit = targetOrbit;
  });
}

// =========================
// UI生成
// =========================
Object.keys(parts).forEach((key) => {

  const btn = document.createElement("button");
  btn.textContent = key;

  btn.addEventListener("click", () => {

    const part = parts[key];

    // 説明
    info.innerHTML = `
      <b>${part.name}</b><br>
      ${part.text}
    `;

    // ピン更新
    if (currentPin) currentPin.remove();

    const pin = document.createElement("button");
    pin.className = "hotspot";
    pin.dataset.position = part.position;
    pin.textContent = "📍";

    pin.addEventListener("click", (e) => {
      e.stopPropagation();
      info.innerHTML = `<b>${part.name}</b><br>${part.text}`;
    });

    viewer.appendChild(pin);
    currentPin = pin;

    // ⭐滑らかカメラ移動
    smoothMoveTo(part.position, part.orbit);
  });

  panel.appendChild(btn);
});


