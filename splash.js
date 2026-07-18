// ▼▼▼ キラキラ粒子エフェクトを完全に停止 ▼▼▼

// const canvas = document.getElementById("particles");
// const ctx = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight * 0.4;

// let particles = [];

// function createParticle() {
//     return {
//         x: Math.random() * canvas.width,
//         y: canvas.height + 10,
//         size: Math.random() * 2 + 1,
//         speed: Math.random() * 1 + 0.5,
//         opacity: Math.random() * 0.8 + 0.2
//     };
// }

// function init() {
//     for (let i = 0; i < 120; i++) {
//         particles.push(createParticle());
//     }
// }

// function animate() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     particles.forEach(p => {
//         ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fill();

//         p.y -= p.speed;
//         if (p.y < -10) {
//             p.y = canvas.height + 10;
//             p.x = Math.random() * canvas.width;
//         }
//     });

//     requestAnimationFrame(animate);
// }

// init();
// animate();

// ▲▲▲ キラキラ粒子エフェクトここまで削除 ▲▲▲


// ▼ コンパスを回転させながら消す
const compass = document.querySelector(".compass-bg");

setTimeout(() => {
    compass.classList.add("compass-disappear");
}, 2000); // 2秒後にアニメ開始


// ▼ アニメ終了後に home.html へ遷移
setTimeout(() => {
    window.location.href = "home.html";
}, 4200); // アニメ時間に合わせて遷移
