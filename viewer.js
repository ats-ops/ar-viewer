const viewer = document.getElementById("viewer");
const panel = document.getElementById("panel");
const info = document.getElementById("info");

let currentPin = null;

// =========================
// 図鑑データ
// =========================
const parts = {
  "頭頂部": {
    name: "頭頂部",
    position: "-4.023 85.368 17.761",
    orbit: "0deg 80deg 5.0m",
    text: "頭蓋骨の最上部。脳を保護する重要な部位。"
  },

  "下顎": {
    name: "下顎",
    position: "4.682 -45.525 -132.909",
    orbit: "165deg 110deg 5.0m",
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
    text: "獲物を捕らえ引き裂くための鋭い歯。肉食動物の特徴。"
  }
};

// =========================
// カメラ移動（滑らか）
// =========================
function moveCamera(part) {

  viewer.cameraTarget = part.position;

  // 1フレーム遅延で自然な補間
  requestAnimationFrame(() => {
    viewer.cameraOrbit = part.orbit;
  });

  viewer.fieldOfView = "30deg";
}

// =========================
// ピン位置補正（外側に浮かせる）
// =========================
function offsetPosition(posStr, strength = 4) {

  const [x, y, z] = posStr.split(" ").map(Number);

  const len = Math.sqrt(x*x + y*y + z*z);

  const nx = x / len;
  const ny = y / len;
  const nz = z / len;

  return `${x + nx * strength} ${y + ny * strength} ${z + nz * strength}`;
}

// =========================
// UI生成
// =========================
Object.keys(parts).forEach((key) => {

  const btn = document.createElement("button");
  btn.textContent = key;

  btn.addEventListener("click", () => {

    const part = parts[key];

    // 説明表示
    info.innerHTML = `
      <b>${part.name}</b><br>
      ${part.text}
    `;

    // 既存ピン削除
    if (currentPin) currentPin.remove();

    // ピン生成（外側にオフセット）
    const pin = document.createElement("button");
    pin.className = "hotspot";
    pin.slot = "hotspot-" + key;
    pin.dataset.position = offsetPosition(part.position, 5);
    pin.textContent = "📍";

    // ピンクリックでも説明更新
    pin.addEventListener("click", (e) => {
      e.stopPropagation();
      info.innerHTML = `
        <b>${part.name}</b><br>
        ${part.text}
      `;
    });

    viewer.appendChild(pin);
    currentPin = pin;

    // カメラ移動
    moveCamera(part);
  });

  panel.appendChild(btn);
});

// =========================
// 初期表示
// =========================
viewer.addEventListener("load", () => {
  info.textContent = "部位を選択してください";
});
