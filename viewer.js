const viewer = document.getElementById("viewer");
const info = document.getElementById("info");

// =========================
// 部位データ（完成版）
// =========================
const parts = {
  "頭頂部": {
    position: "-4.023 85.368 17.761",
    name: "頭頂部",
    text: "頭蓋骨の最上部。脳を保護する重要な部位。"
  },

  "下顎": {
    position: "4.682 -45.525 -132.909",
    name: "下顎",
    text: "咀嚼を行う骨。強い筋肉が付着し、捕食に関与する。"
  },

  "眼窩": {
    position: "-24.483 51.793 -16.613",
    name: "眼窩",
    text: "眼球が収まる空間。視覚機能を支える構造。"
  },

  // ⭐追加：犬歯
  "犬歯": {
    position: "-24.314 -18.262 -126.959",
    name: "犬歯",
    text: "獲物を捕らえ、引き裂くために発達した鋭い歯。肉食動物の特徴的構造。"
  }
};

// =========================
// 部位クリック処理
// =========================
window.showPart = function (key) {

  const part = parts[key];
  if (!part) return;

  info.innerHTML = `
    <b>${part.name}</b><br>
    ${part.text}
  `;
};

// =========================
// モデルクリック（座標ではなく部位選択型）
// =========================
viewer.addEventListener("click", (event) => {

  const hit = viewer.positionAndNormalFromPoint(event.clientX, event.clientY);
  if (!hit) return;

  const pos = hit.position;

  // ここは“簡易判定”（本来は当たり判定拡張可能）
  const z = pos.z;

  if (z > 0.18) {
    showPart("犬歯");
  } 
  else if (z > 0.1) {
    showPart("下顎");
  } 
  else if (z > 0) {
    showPart("眼窩");
  } 
  else {
    showPart("頭頂部");
  }
});

// =========================
// 初期表示
// =========================
viewer.addEventListener("load", () => {
  info.textContent = "部位をクリックしてください（犬歯あり）";
});
