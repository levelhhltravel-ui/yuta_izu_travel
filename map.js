// 行先データ（①〜⑩）
const spots = {
    1: { title: "三島駅", text: "静岡県三島市一番町16-1<br>伊豆旅のスタート地点。新幹線でアクセスし、ここから冒険が始まる。" },
    2: { title: "三津シーパラダイス", text: "静岡県沼津市内浦長浜3-1<br>タカアシガニをさわれる水族館。海獣ショーやイルカとのふれあいも楽しめる。<br>Mission：タカアシガニをさわる" },
    3: { title: "大瀬崎", text: "静岡県沼津市西浦江梨331<br>富士山を望む絶景スポット。夕暮れ時は特に幻想的。<br>Mission：富士山を見る" },
    4: { title: "戸田（宿泊）ムーブ戸田241", text: "静岡県沼津市戸田843-2<br>深海魚と蟹料理が名物の港町。宿泊拠点として海の幸と静かな夜を満喫できる。<br>Mission：蟹を食べる" },
    5: { title: "天窓洞クルーズ", text: "静岡県賀茂郡西伊豆町仁科2060<br>洞窟の天井がぽっかり開いた“天窓洞”を船で巡るクルーズ。光が差し込む海の青さが印象的。<br>Mission：クルーズに乗る" },
    6: { title: "石廊崎オーシャンパーク", text: "静岡県賀茂郡南伊豆町石廊崎546-5<br>伊豆半島の南端に位置する海の展望スポット。断崖絶壁と灯台、広がる太平洋の景色が圧巻。<br>Mission：太平洋と記念撮影" },
    7: { title: "川津七滝", text: "静岡県賀茂郡河津町梨本<br>七つの滝が連なる渓谷。遊歩道を歩きながら、滝と森のマイナスイオンに癒される。<br>Mission：ワサビソフトを食べる" },
    8: { title: "北川温泉", text: "静岡県賀茂郡東伊豆町奈良本1127-14<br>海を望む温泉宿。露天風呂から太平洋を一望できる。<br>Mission：伊勢海老を食べる" },
    9: { title: "城ケ崎海岸", text: "静岡県伊東市富戸<br>溶岩でできた断崖絶壁の海岸線。吊り橋や遊歩道から迫力ある海の景色を楽しめる。<br>Mission：吊り橋を渡る" },
    10:{ title: "熱海城", text: "静岡県熱海市熱海1993<br>熱海の高台に建つ観光城。展望台からの景色や展示が魅力。<br>Mission：天守閣に登る" }
};

// DOM取得
const buttons = document.querySelectorAll(".map-number-row button");
const detailWindow = document.getElementById("detailWindow");
const detailTitle = document.getElementById("detailTitle");
const detailText = document.getElementById("detailText");

// 番号タップで説明表示
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const spot = spots[id];
        detailTitle.textContent = spot.title;
        detailText.innerHTML = spot.text;
        detailWindow.classList.remove("hidden");
    });
});

// 背景タップで閉じる
detailWindow.addEventListener("click", (e) => {
    if (e.target === detailWindow) {
        detailWindow.classList.add("hidden");
    }
});
