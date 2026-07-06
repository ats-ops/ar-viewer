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
