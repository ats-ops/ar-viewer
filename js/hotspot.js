// =====================================================
// hotspot.js
// Hotspot管理
// =====================================================

let currentPin = null;


/**
 * 現在のピンを削除
 */
export function clearPin() {

    if (currentPin) {

        currentPin.remove();

        currentPin = null;

    }

}


/**
 * 全てのピンを削除
 */
export function removeAllPins(viewer) {

    viewer.querySelectorAll(".hotspot").forEach(pin => {

        pin.remove();

    });

    currentPin = null;

}


/**
 * Hotspot生成
 */
export function createPin(viewer, part, callback) {

    // 古いピンを削除
    clearPin();

    const pin = document.createElement("button");

    pin.className = "hotspot";

    pin.slot = "hotspot-" + part.name;

    pin.dataset.position = part.position;

    // モデル表面の法線方向
    pin.dataset.normal = "0 1 0";

    pin.dataset.visibilityAttribute = "visible";

    pin.innerHTML = `
        <div class="pin-dot"></div>
    `;

    pin.addEventListener("click", (event) => {

        event.stopPropagation();

        callback(part);

    });

    viewer.appendChild(pin);

    currentPin = pin;

}


/**
 * ピンを非表示
 */
export function hidePin() {

    if (currentPin) {

        currentPin.style.display = "none";

    }

}


/**
 * ピンを表示
 */
export function showPin() {

    if (currentPin) {

        currentPin.style.display = "block";

    }

}


/**
 * ピン取得
 */
export function getCurrentPin() {

    return currentPin;

}
