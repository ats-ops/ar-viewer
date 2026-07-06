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
