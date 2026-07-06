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
function resetView() {
  const viewer = document.getElementById("viewer");

  viewer.cameraOrbit = "0deg 75deg 2.5m";
  viewer.fieldOfView = "30deg";
}

window.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById("viewer");

  viewer.addEventListener("load", () => {
    console.log("モデル読み込み完了");
    const viewer = document.getElementById("viewer");
const popup = document.getElementById("popup");

// ホットスポット全部取得
const hotspots = document.querySelectorAll(".hotspot");

hotspots.forEach(btn => {
  btn.addEventListener("click", (e) => {

    const info = btn.getAttribute("data-info");

    popup.textContent = info;
    popup.classList.remove("hidden");

    // 3秒後に消える
    setTimeout(() => {
      popup.classList.add("hidden");
    }, 3000);

  });
});

// モデル読み込み確認
viewer.addEventListener("load", () => {
  console.log("モデル読み込み完了（ホットスポット有効）");
});
  });
});
});
