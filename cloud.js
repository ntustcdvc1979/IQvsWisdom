// Firebase（Firestore + 匿名登入）同步層。沒有設定時自動停用，不影響網頁其他功能。
// 資料結構：classes/{班級代碼}/responses/{匿名使用者 uid} = { nick, team, ind:[物品id], grp:[物品id], updatedAt }
const V = "10.12.2";
const cfg = window.FIREBASE_CONFIG;

let ready = null;
if (cfg) {
  ready = (async () => {
    const [{ initializeApp }, auth, fs] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`)
    ]);
    const app = initializeApp(cfg);
    const a = auth.getAuth(app);
    const cred = await auth.signInAnonymously(a);
    return { db: fs.getFirestore(app), uid: cred.user.uid, fs };
  })();
  ready.catch((e) => console.warn("[cloud] Firebase 初始化失敗：", e));
}

window.SEACLOUD = {
  enabled: !!cfg,
  // 上傳（合併）自己的作答
  async save(classId, data) {
    if (!ready) throw new Error("Firebase 未設定");
    const { db, uid, fs } = await ready;
    await fs.setDoc(
      fs.doc(db, "classes", classId, "responses", uid),
      { ...data, updatedAt: fs.serverTimestamp() },
      { merge: true }
    );
  },
  // 監看班級狀態（round 變了代表主持人清空過）
  async watchClass(classId, cb) {
    if (!ready) throw new Error("Firebase 未設定");
    const { db, fs } = await ready;
    return fs.onSnapshot(fs.doc(db, "classes", classId), (d) => cb(d.exists() ? d.data() : {}), () => {});
  },
  // 主持人：目前這個瀏覽器是否已登記
  async isHost() {
    if (!ready) return false;
    const { db, uid, fs } = await ready;
    try { return (await fs.getDoc(fs.doc(db, "hosts", uid))).exists(); } catch (e) { return false; }
  },
  // 主持人：用 PIN 登記（PIN 錯誤時規則會拒絕）
  async hostLogin(pin) {
    const { db, uid, fs } = await ready;
    await fs.setDoc(fs.doc(db, "hosts", uid), { pin: String(pin), at: fs.serverTimestamp() });
  },
  // 主持人：刪除本班所有作答，並讓 round + 1 通知所有手機重新開始；回傳刪除筆數
  async clearClass(classId) {
    const { db, fs } = await ready;
    const snap = await fs.getDocs(fs.collection(db, "classes", classId, "responses"));
    const docs = snap.docs;
    for (let i = 0; i < docs.length; i += 400) {
      const b = fs.writeBatch(db);
      docs.slice(i, i + 400).forEach((d) => b.delete(d.ref));
      await b.commit();
    }
    await fs.setDoc(fs.doc(db, "classes", classId),
      { round: fs.increment(1), clearedAt: fs.serverTimestamp(), game: null }, { merge: true });
    return docs.length;
  },
  // 主持人：小遊戲狀態（"open" 開放作答／"closed" 截止）
  async setGame(classId, state) {
    const { db, fs } = await ready;
    await fs.setDoc(fs.doc(db, "classes", classId), { game: state }, { merge: true });
  },
  // 即時監看整個班級的作答；回傳取消函式
  async watch(classId, cb, onErr) {
    if (!ready) throw new Error("Firebase 未設定");
    const { db, fs } = await ready;
    return fs.onSnapshot(
      fs.collection(db, "classes", classId, "responses"),
      (snap) => cb(snap.docs.map((d) => d.data())),
      (e) => onErr && onErr(e)
    );
  }
};
window.dispatchEvent(new Event("seacloud"));
