// ★ BGM
const bgm = new Audio("sounds/home-theme.mp3");
bgm.loop = true;
bgm.volume = 0;

// ★ タップ音
const tapSound = new Audio("sounds/tap.mp3");
tapSound.volume = 0.6;

// ★ BGM設定の読み込み
let bgmEnabled = localStorage.getItem("bgmEnabled");
if (bgmEnabled === null) bgmEnabled = "true"; // 初回はON扱い

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

// ★ 全ページのボタンにタップ音
document.addEventListener("click", (e) => {
    if (e.target.closest("a") || e.target.closest("button")) {
        tapSound.currentTime = 0;
        tapSound.play().catch(() => {});
    }
});
