const viewer = document.getElementById("viewer");
const panel = document.getElementById("panel");
const info = document.getElementById("info");
const specimen = document.getElementById("specimen");

let currentPin = null;

// =========================
// 部位データ
// =========================
const parts = {
  "頭頂部": {
    name: "頭頂部",
    position: "-4.023 85.368 17.761",
    text: "頭蓋骨の最上部。脳を保護する重要な部位。"
  },

  "下顎": {
    name: "下顎",
    position: "4.682 -45.525 -132.909",
    text: "咀嚼を行う骨。強い筋肉が付着する。"
  },

  "眼窩": {
    name: "眼窩",
    position: "-24.483 51.793 -16.613",
    text: "眼球が収まる空間。視覚機能に関係。"
  },

  "犬歯": {
    name: "犬歯",
    position: "-24.314 -18.262 -126.959",
    text: "獲物を捕らえ引き裂く鋭い歯。肉食動物の特徴。"
  }
};

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

    // =========================
    // 説明表示
    // =========================
    info.innerHTML = `
      <b>${part.name}</b><br>
      ${part.text}
    `;

    // =========================
    // ピン更新
    // =========================
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
  });

  panel.appendChild(btn);
});
