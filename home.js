const bgm = document.getElementById("bgm");
const tapSound = document.getElementById("tapSound");
const bgmToggleBtn = document.getElementById("bgmToggle");

// ★ BGM設定の読み込み（全ページ共通）
let bgmEnabled = localStorage.getItem("bgmEnabled");
if (bgmEnabled === null) bgmEnabled = "true";

// 初期音量
bgm.volume = 0;
tapSound.volume = 0.6;

// ★ ボタン初期表示
bgmToggleBtn.textContent = bgmEnabled === "true" ? "BGM：ON" : "BGM：OFF";

// ★ スマホ自動再生対策
document.addEventListener("click", () => {
    if (bgmEnabled === "true") {
        bgm.play().catch(() => {});
    }
    tapSound.play().catch(() => {});
    tapSound.pause();
}, { once: true });

// ★ BGMフェードイン（ONのときだけ）
function fadeInBGM() {
    if (bgmEnabled !== "true") return;

    let vol = 0;
    const fade = setInterval(() => {
        vol += 0.02;
        if (vol >= 0.4) {
            vol = 0.4;
            clearInterval(fade);
        }
        bgm.volume = vol;
    }, 120);
}

window.addEventListener("load", fadeInBGM);

// ▼ 火花生成関数
function createSpark(x, y) {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    spark.style.left = `${x - 6}px`;
    spark.style.top = `${y - 6}px`;
    document.body.appendChild(spark);

    setTimeout(() => {
        spark.remove();
    }, 600);
}

// ★ メニューのボタンにタップ音＋火花
document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        tapSound.currentTime = 0;
        tapSound.play().catch(() => {});

        // ★ 火花発生
        createSpark(e.clientX, e.clientY);
    });
});

// ★ BGM ON/OFF ボタン制御（全ページ連動）
bgmToggleBtn.addEventListener("click", (e) => {
    // 火花
    createSpark(e.clientX, e.clientY);

    if (bgmEnabled === "true") {
        bgmEnabled = "false";
        localStorage.setItem("bgmEnabled", "false");
        bgm.pause();
        bgmToggleBtn.textContent = "BGM：OFF";
    } else {
        bgmEnabled = "true";
        localStorage.setItem("bgmEnabled", "true");
        bgm.play().catch(() => {});
        bgmToggleBtn.textContent = "BGM：ON";
    }
});
