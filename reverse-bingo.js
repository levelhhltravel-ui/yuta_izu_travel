const bingoContainer = document.getElementById("bingo");
const bingoCountText = document.getElementById("bingoCount");
const reachCountText = document.getElementById("reachCount");
const resetBtn = document.getElementById("resetBtn");
const bingoPopup = document.getElementById("bingoPopup");

let board = [];
let opened = JSON.parse(localStorage.getItem("openedCells")) || [];

// ★ 前回のビンゴ数（誤爆防止用）
let previousBingoCount = 0;

// ★ ビンゴファンファーレ
const bingoFanfare = new Audio("sounds/bingo-fanfare.mp3");
bingoFanfare.volume = 0.8;

// ★ 火花生成
function createSpark(x, y) {
    const spark = document.createElement("div");
    spark.classList.add("spark-effect");
    spark.style.left = `${x - 7}px`;
    spark.style.top = `${y - 7}px`;
    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 600);
}

// ビンゴライン一覧
const lines = [
    [0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14],
    [15,16,17,18,19], [20,21,22,23,24],
    [0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22],
    [3,8,13,18,23], [4,9,14,19,24],
    [0,6,12,18,24], [4,8,12,16,20]
];

// 盤面生成
function generateBoard() {
    board = [];
    for (let i = 1; i <= 25; i++) {
        if (i === 13) board.push("FREE");
        else board.push(i < 13 ? i : i - 1);
    }
}

// 描画
function renderBoard() {
    bingoContainer.innerHTML = "";

    board.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.style.backgroundImage =
            value === "FREE"
                ? `url("images/numbers/num-free.png")`
                : `url("images/numbers/num-${value}.png")`;

        if (opened.includes(index) || value === "FREE") {
            cell.classList.add("open");
        }

        cell.addEventListener("click", (e) => toggleCell(index, cell, e));

        bingoContainer.appendChild(cell);
    });

    updateCounts();
}

// セル開閉
function toggleCell(i, cell, event) {
    if (board[i] === "FREE") return;

    if (opened.includes(i)) {
        opened = opened.filter(n => n !== i);
        cell.classList.remove("open");
    } else {
        opened.push(i);
        cell.classList.add("open");

        // ★ セル内部の金色粒子（既存）
        cell.classList.add("spark");
        setTimeout(() => cell.classList.remove("spark"), 600);

        // ★ タップ位置に火花（新規）
        createSpark(event.clientX, event.clientY);
    }

    localStorage.setItem("openedCells", JSON.stringify(opened));
    updateCounts();
}

// リーチ数＋ビンゴ数＋演出更新
function updateCounts() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(c => {
        c.classList.remove("reach-blink");
        c.classList.remove("bingo-glow");
    });

    let bingoCount = 0;
    let reachCount = 0;

    lines.forEach(line => {
        const openedCount = line.filter(i =>
            opened.includes(i) || board[i] === "FREE"
        ).length;

        // ★ ビンゴ
        if (openedCount === 5) {
            bingoCount++;
            line.forEach(i => cells[i].classList.add("bingo-glow"));
        }

        // ★ リーチ
        else if (openedCount === 4) {
            reachCount++;
            line.forEach(i => {
                if (!opened.includes(i) && board[i] !== "FREE") {
                    cells[i].classList.add("reach-blink");
                }
            });
        }
    });

    // ★ 新しくビンゴが増えたときだけ演出
    if (bingoCount > previousBingoCount) {
        bingoFanfare.currentTime = 0;
        bingoFanfare.play().catch(() => {});
        bingoPopup.classList.add("show");
    }

    previousBingoCount = bingoCount;

    bingoCountText.textContent = bingoCount;
    reachCountText.textContent = reachCount;
}

// BINGOポップアップをタップで消す
bingoPopup.addEventListener("click", () => {
    bingoPopup.classList.remove("show");
});

// リセット
resetBtn.addEventListener("click", () => {
    resetBtn.classList.add("burst");

    opened = [];
    previousBingoCount = 0;
    localStorage.removeItem("openedCells");
    renderBoard();

    setTimeout(() => {
        resetBtn.classList.remove("burst");
    }, 600);
});

// ★ 初期化
generateBoard();
renderBoard();

// ★ ページ再訪時に必ずポップアップを閉じる
bingoPopup.classList.remove("show");
