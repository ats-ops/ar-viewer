const viewer = document.getElementById("viewer");
const info = document.getElementById("info");

let currentPin = null;

// =========================
// 固定データ（ここが本体）
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
    text: "眼球が収まる空間。視覚機能を支える。"
  },

  "犬歯": {
    name: "犬歯",
    position: "-24.314 -18.262 -126.959",
    text: "獲物を捕らえ、引き裂くための鋭い歯。"
  }
};

// =========================
// 左上UI生成
// =========================
const panel = document.createElement("div");
panel.style.position = "absolute";
panel.style.top = "70px";
panel.style.left = "10px";
panel.style.background = "rgba(0,0,0,0.7)";
panel.style.padding = "10px";
panel.style.borderRadius = "10px";
panel.style.color = "white";
panel.style.zIndex = "1000";

document.body.appendChild(panel);

// =========================
// UIボタン生成
// =========================
Object.keys(parts).forEach((key) => {

  const btn = document.createElement("button");

  btn.textContent = key;

  btn.style.display = "block";
  btn.style.margin = "5px 0";
  btn.style.padding = "6px";
  btn.style.width = "120px";

  btn.addEventListener("click", () => {

    const part = parts[key];

    // 説明表示
    info.innerHTML = `
      <b>${part.name}</b><br>
      ${part.text}
    `;

    // 既存ピン削除
    if (currentPin) {
      currentPin.remove();
    }

    // ピン作成
    const pin = document.createElement("button");
    pin.className = "hotspot";
    pin.slot = "hotspot-" + key;
    pin.dataset.position = part.position;
    pin.textContent = "📍";

    pin.style.background = "red";
    pin.style.border = "none";
    pin.style.borderRadius = "50%";
    pin.style.width = "14px";
    pin.style.height = "14px";

    viewer.appendChild(pin);

    currentPin = pin;
  });

  panel.appendChild(btn);
});
