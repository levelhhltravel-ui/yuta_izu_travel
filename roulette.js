const totalNumbers = 24;
let usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || [];
let disabledNumbers = JSON.parse(localStorage.getItem("disabledNumbers")) || [];

const grid = document.querySelector(".grid");
const resultText = document.getElementById("result");
const usedList = document.getElementById("usedList");
const spinBtn = document.getElementById("spinBtn");
const resetBtn = document.getElementById("resetBtn");
const roulettePopup = document.getElementById("roulettePopup");

// ★ 回転中の効果音
const spinSound = new Audio("sounds/spin.mp3");
spinSound.loop = true;
spinSound.volume = 0.5;

// ★ 確定ファンファーレ
const fanfareSound = new Audio("sounds/fanfare.mp3");
fanfareSound.volume = 0.8;

// 石板生成
for (let i = 1; i <= totalNumbers; i++) {
    const div = document.createElement("div");
    div.className = "stone";
    div.id = "stone-" + i;
    div.textContent = i;
    grid.appendChild(div);
}

// ★ 使用済み・封印の状態更新
function updateStoneStates() {
    for (let i = 1; i <= totalNumbers; i++) {
        const stone = document.getElementById("stone-" + i);

        if (usedNumbers.includes(i) || disabledNumbers.includes(i)) {
            stone.classList.add("disabled");
        } else {
            stone.classList.remove("disabled");
        }
    }
}

// ★ 使用済み一覧更新
function updateUsedList() {
    usedList.innerHTML = "";
    usedNumbers.forEach(num => {
        const div = document.createElement("div");
        div.className = "used-number";
        div.textContent = num;

        div.onclick = () => {
            usedNumbers = usedNumbers.filter(n => n !== num);
            localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));
            updateUsedList();
        };

        usedList.appendChild(div);
    });

    updateStoneStates();
}

// ★ 使えない数字設定
function setDisabledNumbers() {
    const text = document.getElementById("disable-input").value;

    disabledNumbers = text
        .split(",")
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n) && n >= 1 && n <= totalNumbers);

    localStorage.setItem("disabledNumbers", JSON.stringify(disabledNumbers));

    alert("使えない数字：" + disabledNumbers.join(", "));
    updateStoneStates();
}

// ★ 抽選可能な数字
function getAvailableNumbers() {
    const available = [];
    for (let i = 1; i <= totalNumbers; i++) {
        if (!usedNumbers.includes(i) && !disabledNumbers.includes(i)) {
            available.push(i);
        }
    }
    return available;
}

// ★ 抽選開始
spinBtn.onclick = () => {
    const available = getAvailableNumbers();
    if (available.length === 0) {
        alert("選べる数字がありません！");
        return;
    }

    let interval;
    let current = null;

    // ★ 回転音スタート
    spinSound.currentTime = 0;
    spinSound.play().catch(() => {});

    interval = setInterval(() => {
        document.querySelectorAll(".stone").forEach(s => {
            if (!s.classList.contains("disabled")) {
                s.classList.remove("active");
            }
        });

        current = available[Math.floor(Math.random() * available.length)];
        document.getElementById("stone-" + current).classList.add("active");
    }, 100);

    // ★ 3秒後に停止
    setTimeout(() => {
        clearInterval(interval);

        // ★ 回転音ストップ
        spinSound.pause();
        spinSound.currentTime = 0;

        // ★ ファンファーレ再生
        fanfareSound.currentTime = 0;
        fanfareSound.play().catch(() => {});

        resultText.textContent = current;
        usedNumbers.push(current);
        localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));

        updateUsedList();

        roulettePopup.textContent = current;
        roulettePopup.classList.add("show");

    }, 3000);
};

// ★ ポップアップをタップで消す
roulettePopup.addEventListener("click", () => {
    roulettePopup.classList.remove("show");
});

// ★ リセット
resetBtn.onclick = () => {
    resetBtn.classList.add("burst");

    localStorage.removeItem("usedNumbers");
    localStorage.removeItem("disabledNumbers");

    usedNumbers = [];
    disabledNumbers = [];

    document.getElementById("disable-input").value = "";
    resultText.textContent = "?";

    setTimeout(() => {
        resetBtn.classList.remove("burst");
        updateUsedList();
        updateStoneStates();
        document.querySelectorAll(".stone").forEach(s => s.classList.remove("active"));
    }, 600);
};

// ★ 初期描画
updateUsedList();
updateStoneStates();

