window.addEventListener("DOMContentLoaded", () => {

  const viewer = document.getElementById("viewer");

  // 読み込み完了
  viewer.addEventListener("load", () => {
    console.log("3Dモデル読み込み完了");
  });

  // エラー
  viewer.addEventListener("error", () => {
    console.error("3Dモデル読み込み失敗");
    alert("モデルを読み込めませんでした（model.glbを確認）");
  });

});
