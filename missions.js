const missionIcons = [
    "🦀","🗻","🍽️","⛴️","🦞","🍦","🌉","🏯","🥇",
    "💌","📸","👒","🗑️","♨️","🌊","🎁","🥤"
];

const missions = [
    "① タカアシガニをさわる",
    "② 大瀬埼で富士山を見る",
    "③ 戸田で蟹を食べる",
    "④ クルーズ船に乗る",
    "⑤ 伊勢海老を食べる",
    "⑥ ワサビソフトを食べる",
    "⑦ 城ケ崎海岸で吊り橋を渡る",
    "⑧ 熱海城の天守閣に登る",
    "⑨ 記念メダルを3枚ゲット",
    "⑩ 素敵な絵葉書を家族に送る",
    "⑪ 写ルンです1つを使い切る",
    "⑫ お揃いの帽子をゲットする",
    "⑬ 空き缶かペットボトルを合計5つ拾い、ごみ箱に捨てる",
    "⑭ 温泉につかる",
    "⑮ 太平洋とみんなで記念撮影",
    "⑯ 喜一の誕生祝いを購入する",
    "⑰ ご当地ドリンクを飲む"
];

let doneList = JSON.parse(localStorage.getItem("doneMissions")) || [];
let missionStatus = JSON.parse(localStorage.getItem("missionStatus")) || {};

const missionList = document.getElementById("missionList");
const resetBtn = document.getElementById("resetBtn");

function renderMissions() {
    missionList.innerHTML = "";

    missions.forEach((text, index) => {
        const card = document.createElement("div");
        card.className = "mission-card";

        // ミッション13のカウント復元
        if (index === 12) {
            const count = missionStatus[13] || 0;
            text = `⑬ 空き缶かペットボトルを合計5つ拾い、ごみ箱に捨てる（${count}/5）`;

            if (count >= 5) {
                card.classList.add("done");
            }
        } else if (doneList.includes(index)) {
            card.classList.add("done");
        }

        card.innerHTML = `
            <div class="mission-icon">${missionIcons[index]}</div>
            <div class="mission-text">${text}</div>
        `;

        card.onclick = () => {

            // ミッション13だけ特別仕様
            if (index === 12) {

                // 5回達成済みなら → 次のタップでリセット
                if ((missionStatus[13] || 0) >= 5) {
                    missionStatus[13] = 0;
                    doneList = doneList.filter(n => n !== index);
                } else {
                    // 通常カウントアップ
                    missionStatus[13] = (missionStatus[13] || 0) + 1;

                    // 5回達成で done 扱い
                    if (missionStatus[13] >= 5) {
                        if (!doneList.includes(index)) {
                            doneList.push(index);
                        }
                    }
                }

                // 保存
                localStorage.setItem("missionStatus", JSON.stringify(missionStatus));
                localStorage.setItem("doneMissions", JSON.stringify(doneList));

                renderMissions();
                return;
            }

            // 通常ミッション
            if (doneList.includes(index)) {
                doneList = doneList.filter(n => n !== index);
            } else {
                doneList.push(index);
            }

            localStorage.setItem("doneMissions", JSON.stringify(doneList));
            renderMissions();
        };

        missionList.appendChild(card);
    });
}

resetBtn.onclick = () => {
    resetBtn.classList.add("burst");

    doneList = [];
    missionStatus = {};
    localStorage.removeItem("doneMissions");
    localStorage.removeItem("missionStatus");

    setTimeout(() => {
        resetBtn.classList.remove("burst");
        renderMissions(); // ← これが重要
    }, 600);
};

renderMissions();


