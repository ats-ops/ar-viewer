// =====================================================
// ui.js
// UI管理
// =====================================================

let activeButton = null;

/**
 * 標本情報を更新
 */
export function updateSpecimenInfo(specimen) {

    document.getElementById("specimen-name").textContent = specimen.name;
    document.getElementById("species").textContent = specimen.species;
    document.getElementById("age").textContent = specimen.age;
    document.getElementById("sex").textContent = specimen.sex;
    document.getElementById("location").textContent = specimen.location;
    document.getElementById("date").textContent = specimen.date;
    document.getElementById("condition").textContent = specimen.condition;
    document.getElementById("specimen-id").textContent = specimen.id;

}


/**
 * 部位ボタン生成
 */
export function createPartButtons(panel, specimen, callback) {

    panel.innerHTML = "";

    activeButton = null;

    Object.keys(specimen.parts).forEach(partName => {

        const button = document.createElement("button");

        button.className = "partButton";

        button.textContent = partName;

        button.addEventListener("click", () => {

            setActiveButton(button);

            callback(partName);

        });

        panel.appendChild(button);

    });

}


/**
 * ボタン選択
 */
export function setActiveButton(button) {

    if (activeButton) {

        activeButton.classList.remove("active");

    }

    activeButton = button;

    activeButton.classList.add("active");

}


/**
 * 説明表示
 */
export function showDescription(info, part) {

    info.innerHTML = `
        <h2>${part.name}</h2>
        <p>${part.text}</p>
    `;

}


/**
 * 初期説明
 */
export function resetInfo(info) {

    info.innerHTML = `
        <h2>操作方法</h2>

        <p>

        左側の部位一覧から
        観察したい部位を選択してください。

        </p>
    `;

}


/**
 * 選択解除
 */
export function clearSelection() {

    if (activeButton) {

        activeButton.classList.remove("active");

        activeButton = null;

    }

}
