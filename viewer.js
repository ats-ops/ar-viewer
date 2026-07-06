const viewer = document.getElementById("viewer");
const info = document.getElementById("info");

let editMode = false;
let pins = [];

// =========================
// 編集モード切替
// =========================
window.toggleEditMode = function () {
  editMode = !editMode;

  info.textContent = editMode
    ? "🟢 編集モードON（クリックでピン追加）"
    : "🔵 閲覧モード";

  console.log("editMode:", editMode);
};

// =========================
// ピン削除
// =========================
window.clearPins = function () {

  pins.forEach(p => p.remove());
  pins = [];

  info.textContent = "ピンを削除しました";
};

// =========================
// クリック処理
// =========================
viewer.addEventListener("click", (event) => {

  const hit = viewer.positionAndNormalFromPoint(event.clientX, event.clientY);
  if (!hit) return;

  const pos = hit.position;

  // =========================
  // 編集モードのみピン追加
  // =========================
  if (editMode) {

    const x = pos.x.toFixed(3);
    const y = pos.y.toFixed(3);
    const z = pos.z.toFixed(3);

    const btn = document.createElement("button");

    btn.className = "hotspot";
    btn.slot = "hotspot-" + pins.length;
    btn.dataset.position = `${x} ${y} ${z}`;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      info.textContent = `📍 ピン: ${x} ${y} ${z}`;
    });

    viewer.appendChild(btn);

    pins.push(btn);

    info.textContent = "📍 ピン追加";
  }
});

// =========================
// ロード
// =========================
viewer.addEventListener("load", () => {
  info.textContent = "閲覧モード";
});
