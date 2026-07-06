const viewer = document.getElementById("viewer");
const panel = document.getElementById("panel");
const info = document.getElementById("info");

let currentPin = null;
let selectedPart = null;
let autoRotateEnabled = false;

// =========================
// データ
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
    text: "獲物を捕らえ引き裂く鋭い歯。"
  }
};

// =========================
// カメラ移動
// =========================
function moveCamera(part) {

  viewer.cameraTarget = part.position;

  requestAnimationFrame(() => {
    viewer.cameraOrbit = part.orbit;
  });

  viewer.fieldOfView = "30deg";
}

// =========================
// ピン削除
// =========================
function clearPin() {
  if (currentPin) {
    currentPin.remove();
    currentPin = null;
  }
}

// =========================
// UI生成
// =========================
Object.keys(parts).forEach((key) => {

  const btn = document.createElement("button");
  btn.textContent = key;

  btn.addEventListener("click", () => {

    const part = parts[key];
    selectedPart = part;

    // auto-rotate停止
    viewer.autoRotate = false;
    autoRotateEnabled = false;

    // 説明
    info.innerHTML = `
      <b>${part.name}</b><br>
      ${part.text}
    `;

    // ピン更新
    clearPin();

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

    moveCamera(part);
  });

  panel.appendChild(btn);
});

// =========================
// 🔥 解除ボタン作成（重要）
// =========================
const resetBtn = document.createElement("button");
resetBtn.textContent = "🔄 回転再開 / 解除";

resetBtn.style.position = "absolute";
resetBtn.style.top = "60px";
resetBtn.style.right = "10px";
resetBtn.style.zIndex = "1000";
resetBtn.style.padding = "8px";
resetBtn.style.border = "none";
resetBtn.style.borderRadius = "8px";
resetBtn.style.background = "#333";
resetBtn.style.color = "white";
resetBtn.style.cursor = "pointer";

// =========================
// クリック処理
// =========================
resetBtn.addEventListener("click", () => {

  // ピン削除
  clearPin();

  // 説明リセット
  info.textContent = "部位を選択してください";

  // カメラ初期化
  viewer.cameraOrbit = "0deg 80deg 2.6m";
  viewer.cameraTarget = "0 0 0";

  // ⭐自動回転ON
  viewer.autoRotate = true;
  autoRotateEnabled = true;
});

document.body.appendChild(resetBtn);

// =========================
// 初期状態
// =========================
viewer.addEventListener("load", () => {
  viewer.autoRotate = true;
  autoRotateEnabled = true;
});
