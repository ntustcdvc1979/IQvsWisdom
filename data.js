// 航海求生（Lost at Sea）— 物品與美國海岸防衛隊專家排序
// 物品與專家排序依據：Suggested Answers and Rationale for Lost at Sea Exercise (NCIPH EpiTeams)
// 活動流程與計分級距參考：Grahame Knox, "Lost at Sea" (insight.typepad.co.uk, CC BY-NC-ND 3.0)
window.SEA = {
  items: [
    { id: "mirror",   name: "刮鬍子用的鏡子",            en: "Shaving mirror",               rank: 1,  why: "最關鍵的求救工具。陽光下反射的光，遠在地平線外都看得見。" },
    { id: "oil",      name: "8 公升的油氣混合燃料",       en: "2 gallon can of oil/petrol mixture", rank: 2,  why: "第二重要的求救工具。會浮在水面上，用火柴點燃就是醒目的信號。" },
    { id: "water",    name: "20 公升的飲用水",           en: "5 gallon can of water",        rank: 3,  why: "補充因流汗而流失的水分。" },
    { id: "rations",  name: "一箱軍用口糧",              en: "One case of army rations",     rank: 4,  why: "基本的食物來源。" },
    { id: "plastic",  name: "2 平方公尺的不透光塑膠布",   en: "20 sq ft of opaque plastic",   rank: 5,  why: "可以收集雨水，也能遮風擋浪。" },
    { id: "choco",    name: "兩盒巧克力棒",              en: "2 boxes of chocolate bars",    rank: 6,  why: "備用的食物。" },
    { id: "fishing",  name: "一套釣魚工具",              en: "Fishing kit",                  rank: 7,  why: "排在巧克力之後：不保證釣得到魚，巧克力卻已經在手上。" },
    { id: "rope",     name: "5 公尺長的尼龍繩",           en: "15 ft of nylon rope",          rank: 8,  why: "把人或物品綁在一起，避免被浪捲走。" },
    { id: "cushion",  name: "可漂浮的座墊",              en: "Floating seat cushion",        rank: 9,  why: "有人落水時可以當救生圈。" },
    { id: "shark",    name: "一罐鯊魚驅避劑",            en: "Shark repellent",              rank: 10, why: "實測只有約一半的機率有效。" },
    { id: "rum",      name: "一瓶 1 公升、酒精濃度 80% 的蘭姆酒",en: "One quart of 160 proof rum",   rank: 11, why: "酒精濃度高，可當消毒或麻醉用；喝下去反而會脫水。" },
    { id: "radio",    name: "一台小型電晶體收音機",       en: "Small transistor radio",       rank: 12, why: "沒有發射器就沒用，而且你也收不到任何電台。" },
    { id: "maps",     name: "太平洋地圖",                en: "Maps of the Pacific Ocean",    rank: 13, why: "沒有導航儀器就沒用。重要的不是你在哪裡，而是救援的人在哪裡。" },
    { id: "net",      name: "一頂蚊帳",                  en: "Mosquito netting",             rank: 14, why: "太平洋中央沒有蚊子。想拿來捕魚？還是用釣魚工具吧。" }
  ],
  // 計分級距（總差距越低越好），參考 Grahame Knox 版本
  bands: [
    { max: 25,  label: "優秀", text: "求生技能一流，成功獲救！" },
    { max: 32,  label: "良好", text: "高於平均，求生技能不錯，成功獲救！" },
    { max: 45,  label: "普通", text: "暈船、又餓又累，但還是獲救了。" },
    { max: 55,  label: "勉強", text: "脫水、奄奄一息，好不容易才獲救。" },
    { max: 70,  label: "危險", text: "獲救了，但只差一點點就來不及。" },
    { max: 999, label: "不妙", text: "搜救行動結束幾週後，空蕩蕩的救生筏被沖上了海灘……" }
  ],
  // 學員在手機上看答案前要輸入的代碼（講師在投影片上公布）
  revealCode: "36",
  // 手機上組別下拉選單的組數
  teams: 12
};

window.SEA.score = function (order) {
  // order: 陣列，依重要程度排列的物品 id
  var total = 0;
  window.SEA.items.forEach(function (it) {
    var mine = order.indexOf(it.id) + 1;
    total += Math.abs(mine - it.rank);
  });
  return total;
};

window.SEA.band = function (score) {
  var b = window.SEA.bands;
  for (var i = 0; i < b.length; i++) if (score <= b[i].max) return b[i];
  return b[b.length - 1];
};
