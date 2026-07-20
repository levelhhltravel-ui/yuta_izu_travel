const totalNumbers = 24;
let usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || [];
let disabledNumbers = JSON.parse(localStorage.getItem("disabledNumbers")) || [];

const grid = document.querySelector(".grid");
const resultText = document.getElementById("result");
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

// ★ 火花生成
function createSpark(x, y) {
    const spark = document.createElement("div");
    spark.classList.add("spark-effect");
    spark.style.left = `${x - 7}px`;
    spark.style.top = `${y - 7}px`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 600);
}

// ★ 石板生成
for (let i = 1; i <= totalNumbers; i++) {
    const div = document.createElement("div");
    div.className = "stone";
    div.id = "stone-" + i;
    div.textContent = i;
    grid.appendChild(div);
}

// ★ 石板タップで封印／解除
grid.addEventListener("click", (e) => {
    if (!e.target.classList.contains("stone")) return;

    createSpark(e.clientX, e.clientY);

    const num = parseInt(e.target.textContent);

    if (usedNumbers.includes(num)) return;

    if (disabledNumbers.includes(num)) {
        disabledNumbers = disabledNumbers.filter(n => n !== num);
    } else {
        disabledNumbers.push(num);
    }

    localStorage.setItem("disabledNumbers", JSON.stringify(disabledNumbers));
    updateStoneStates();
});

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
spinBtn.onclick = (e) => {
    createSpark(e.clientX, e.clientY);

    const available = getAvailableNumbers();
    if (available.length === 0) {
        alert("選べる数字がありません！");
        return;
    }

    let interval;
    let current = null;

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

    setTimeout(() => {
        clearInterval(interval);

        spinSound.pause();
        spinSound.currentTime = 0;

        fanfareSound.currentTime = 0;
        fanfareSound.play().catch(() => {});

        resultText.textContent = current;
        usedNumbers.push(current);
        localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));

        updateStoneStates();

        roulettePopup.textContent = current;
        roulettePopup.classList.add("show");

    }, 3000);
};

// ★ ポップアップをタップで消す
roulettePopup.addEventListener("click", (e) => {
    createSpark(e.clientX, e.clientY);
    roulettePopup.classList.remove("show");
});

// ★ リセット
resetBtn.onclick = (e) => {
    createSpark(e.clientX, e.clientY);

    resetBtn.classList.add("burst");

    localStorage.removeItem("usedNumbers");
    localStorage.removeItem("disabledNumbers");

    usedNumbers = [];
    disabledNumbers = [];

    resultText.textContent = "?";

    setTimeout(() => {
        resetBtn.classList.remove("burst");
        updateStoneStates();
        document.querySelectorAll(".stone").forEach(s => s.classList.remove("active"));
    }, 600);
};

// ★ 初期描画
updateStoneStates();

