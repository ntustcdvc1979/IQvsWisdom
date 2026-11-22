// 本機預覽用：複製成 firebase-config.js，填入 Firebase 網頁 API key（此檔不會進 git）。
// 正式網站的 firebase-config.js 由 GitHub Actions 從 repo secret FIREBASE_API_KEY 產生。
// 保持 null 時網站仍可使用，只是不上傳資料、不顯示全班結果。
window.FIREBASE_CONFIG = {
  apiKey: "在這裡填入 API key",
  authDomain: "iq-tax-4q.firebaseapp.com",
  projectId: "iq-tax-4q",
  storageBucket: "iq-tax-4q.firebasestorage.app",
  messagingSenderId: "243777640133",
  appId: "1:243777640133:web:c5717604c086ab2156c2ac"
};
