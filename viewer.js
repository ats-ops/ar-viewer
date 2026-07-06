const viewer = document.getElementById("viewer");
const info = document.getElementById("info");

// 現在表示されているポイント
let currentPoint = null;

// =========================
// 部位データ（中心0,0,0基準）
// =========================
const parts = {
  "頭頂部": {
    position: "0 50 0",
    text: "頭蓋骨の最上部。脳を保護する重要な部位。"
  },
  "下顎": {
    position: "0 -0.12 0.18",
    text: "咀嚼を行う骨。筋肉が強く付着している。"
  },
  "眼窩": {
    position: "0.12 0.05 0.15",
    text: "眼球が収まる空間。視覚機能に関係する部位。"
  }
};
window.adjustPoint = function(x, y, z) {
  console.log(`調整: ${x}, ${y}, ${z}`);
};
const viewer = document.getElementById("viewer");
const info = document.getElementById("info");

// クリック座標表示用
const output = document.createElement("div");
output.style.position = "absolute";
output.style.bottom = "10px";
output.style.left = "10px";
output.style.background = "rgba(0,0,0,0.8)";
output.style.color = "white";
output.style.padding = "10px";
output.style.fontSize = "12px";
output.style.borderRadius = "8px";
output.style.zIndex = "999";

document.body.appendChild(output);

// =========================
// クリックで座標取得
// =========================
viewer.addEventListener("click", (event) => {

  // model-viewer専用API
  const hit = viewer.positionAndNormalFromPoint(event.clientX, event.clientY);

  if (!hit) {
    output.textContent = "モデル上をクリックしてください";
    return;
  }

  const position = hit.position;

  const x = position.x.toFixed(3);
  const y = position.y.toFixed(3);
  const z = position.z.toFixed(3);

  const result = `${x} ${y} ${z}`;

  // 表示
  output.innerHTML = `
    📍 座標取得:<br>
    <b>${result}</b><br><br>
    クリックしてコピー可能
  `;

  console.log("座標:", result);

  // クリックでコピー
  output.onclick = () => {
    navigator.clipboard.writeText(result);
    output.innerHTML += "<br>コピーしました ✔";
  };

});
// =========================
// サイドバーから呼ばれる関数
// =========================
window.showInfo = function (partName) {

  const data = parts[partName];
  if (!data) return;

  // 説明更新
  info.textContent = data.text;

  // 既存ポイント削除
  if (currentPoint) {
    currentPoint.remove();
    currentPoint = null;
  }

  // 新しいポイント作成
  const btn = document.createElement("button");

  // model-viewerのホットスポット
  btn.slot = "hotspot-" + partName;
  btn.className = "hotspot";

  btn.dataset.position = data.position;
  btn.dataset.normal = "0 1 0";

  btn.textContent = "📍";

  // スタイル
  btn.style.background = "red";
  btn.style.border = "none";
  btn.style.borderRadius = "50%";
  btn.style.width = "14px";
  btn.style.height = "14px";
  btn.style.cursor = "pointer";

  // クリック時
  btn.addEventListener("click", () => {
    info.textContent = "選択中： " + partName;
  });

  // 追加
  viewer.appendChild(btn);

  currentPoint = btn;
};

// =========================
// モデル読み込み完了
// =========================
viewer.addEventListener("load", () => {
  console.log("3Dモデル読み込み完了");

  info.textContent = "部位を選択してください";
});

// =========================
// エラー処理
// =========================
viewer.addEventListener("error", () => {
  console.error("モデル読み込み失敗");
  info.textContent = "モデルを読み込めませんでした";
});

// =========================
// ARイベント（確認用）
// =========================
viewer.addEventListener("ar-status", (event) => {
  console.log("AR状態:", event.detail.status);
});
