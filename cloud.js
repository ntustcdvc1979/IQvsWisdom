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
