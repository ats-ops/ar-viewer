window.addEventListener("DOMContentLoaded", () => {

  const viewer = document.getElementById("viewer");
  const infoCard = document.getElementById("infoCard");

  // =========================
  // 情報データ（サイドバー連動）
  // =========================
  const data = {
    "頭頂部": "頭蓋骨の最上部。脳を保護する重要な部位。",
    "下顎": "咀嚼を行う骨。筋肉が強く付着している。",
    "眼窩": "眼球が収まる空間。視覚機能に関係。"
  };

  // =========================
  // サイドバークリック関数
  // =========================
  window.showInfo = function (partName) {
    infoCard.textContent = data[partName] || "情報がありません";
  };
const viewer = document.getElementById("viewer");
const info = document.getElementById("info");

let currentPoint = null;

// =========================
// 部位データ（ここが重要）
// =========================
const parts = {
  "頭頂部": {
    position: "0 0.15 0",
    text: "頭蓋骨の最上部。脳を保護する重要な部位。"
  },
  "下顎": {
    position: "0 -0.1 0.2",
    text: "咀嚼を行う骨。筋肉が強く付着している。"
  },
  "眼窩": {
    position: "0.1 0.05 0.15",
    text: "眼球が収まる空間。視覚機能に関係。"
  }
};

// =========================
// 部位クリック → ポイント表示
// =========================
window.showInfo = function (partName) {

  const data = parts[partName];
  if (!data) return;

  // 説明更新
  info.textContent = data.text;

  // 既存ポイント削除
  if (currentPoint) {
    currentPoint.remove();
  }

  // 新しいポイント作成
  const btn = document.createElement("button");
  btn.slot = "hotspot-" + partName;
  btn.className = "hotspot";
  btn.dataset.position = data.position;
  btn.textContent = "📍";

  btn.style.background = "red";
  btn.style.border = "none";
  btn.style.borderRadius = "50%";
  btn.style.width = "14px";
  btn.style.height = "14px";
  btn.style.cursor = "pointer";

  btn.addEventListener("click", () => {
    info.textContent = "選択中: " + partName;
  });

  viewer.appendChild(btn);

  currentPoint = btn;
};

// =========================
// 初期化
// =========================
viewer.addEventListener("load", () => {
  info.textContent = "部位を選択してください";
});

// =========================
// エラー
// =========================
viewer.addEventListener("error", () => {
  info.textContent = "モデル読み込み失敗";
});
  // =========================
  // モデル読み込み完了
  // =========================
  viewer.addEventListener("load", () => {
    console.log("3Dモデル読み込み完了");

    infoCard.textContent = "部位を選択してください";
  });

  // =========================
  // エラー処理
  // =========================
  viewer.addEventListener("error", () => {
    console.error("モデル読み込み失敗");
    infoCard.textContent = "モデルを読み込めませんでした";
  });

  // =========================
  // AR開始イベント（任意）
  // =========================
  viewer.addEventListener("ar-status", (event) => {
    console.log("AR状態:", event.detail.status);
  });

});
