const viewer = document.getElementById("viewer");
const panel = document.getElementById("panel");
const info = document.getElementById("info");

let currentPin = null;

// =========================
// 図鑑データ（骨＋犬歯）
// =========================
const parts = {
  "頭頂部": {
    name: "頭頂部",
     position: "-4.023 85.368 17.761",
    orbit: "0deg 80deg 2.6m",
    text: "頭蓋骨の最上部。脳を保護する重要な部位。"
  },

  "下顎": {
    name: "下顎",
      position: "4.682 -45.525 -132.909",
    orbit: "25deg 110deg 2.6m",
    text: "咀嚼を行う骨。強い筋肉が付着する。"
  },

  "眼窩": {
    name: "眼窩",
   position: "-24.483 51.793 -16.613",
    orbit: "-20deg 95deg 2.6m",
    text: "眼球が収まる空間。視覚機能に関係。"
  },

  "犬歯": {
    name: "犬歯",
    position: "-24.314 -18.262 -126.959",
    orbit: "-40deg 100deg 2.4m",
    text: "獲物を捕らえ引き裂くために発達した鋭い歯。肉食動物の特徴。"
  }
};

// =========================
// カメラを滑らかに移動
// =========================
function moveCamera(part) {

  viewer.cameraTarget = part.position;

  // 1フレーム遅延で自然な遷移
  requestAnimationFrame(() => {
    viewer.cameraOrbit = part.orbit;
  });

  viewer.fieldOfView = "30deg";
}

// =========================
// UI生成（自動）
// =========================
Object.keys(parts).forEach((key) => {

  const btn = document.createElement("button");
  btn.textContent = key;

  btn.addEventListener("click", () => {

    const part = parts[key];

    // =========================
    // 説明表示
    // =========================
    info.innerHTML = `
      <b>${part.name}</b><br>
      ${part.text}
    `;

    // =========================
    // ピン削除
    // =========================
    if (currentPin) currentPin.remove();

    // =========================
    // ピン生成
    // =========================
    const pin = document.createElement("button");
    pin.className = "hotspot";
    pin.slot = "hotspot-" + key;
    pin.dataset.position = part.position;
    pin.textContent = "📍";

    pin.addEventListener("click", (e) => {
      e.stopPropagation();
      info.innerHTML = `
        <b>${part.name}</b><br>
        ${part.text}
      `;
    });

    viewer.appendChild(pin);
    currentPin = pin;

    // =========================
    // カメラ移動（滑らか）
    // =========================
    moveCamera(part);
  });

  panel.appendChild(btn);
});

// =========================
// ロード時
// =========================
viewer.addEventListener("load", () => {
  info.textContent = "部位を選択してください";
});
