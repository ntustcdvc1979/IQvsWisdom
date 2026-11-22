# IQ vs 智慧 — 航海求生互動簡報

- 簡報：<https://ntustcdvc1979.github.io/IQvsWisdom/>（← → 換頁、F 全螢幕、T 計時）
- 學員手機頁：`sea.html`（由簡報第 4 頁的 QR Code 進入）

## 班級代碼

QR Code 會帶上班級代碼 `?c=…`，不同場次的資料分開存放。
預設是開簡報當天的日期（例如 `20261122`）。同一天上兩場時，請在簡報網址後加上自訂代碼：

```
https://ntustcdvc1979.github.io/IQvsWisdom/?c=morning
```

## 主持人：清空答案

簡報上按 **H**（或左下角 ⚙）開啟主持人面板，第一次輸入主持人 PIN 登入後，
可「清空本班所有答案」：刪除該班級代碼的所有作答，學員手機會自動回到開始畫面。
PIN 只存在 Firestore 的 `config/host`（網頁讀不到），不在程式碼裡。

## Firebase 設定（全班即時統計）

沒設定 Firebase 時，網站一樣能用，只是不會顯示全班結果。

1. 到 <https://console.firebase.google.com> 建立專案（Google Analytics 可關閉）。
2. **Build → Authentication → Get started → Sign-in method**：啟用 **Anonymous（匿名）**。
3. **Build → Firestore Database → Create database**：位置選 `asia-east1`（台灣），以 **production mode** 建立。
4. Firestore 的 **Rules** 分頁：把 [`firestore.rules`](firestore.rules) 的內容整段貼上，按 **Publish**。
5. **專案設定（齒輪）→ 一般 → 你的應用程式 → `</>` Web**：註冊一個網頁應用程式（不用勾 Hosting），複製 `firebaseConfig`。
6. 把設定貼進 [`firebase-config.js`](firebase-config.js)：

   ```js
   window.FIREBASE_CONFIG = {
     apiKey: "…",
     authDomain: "….firebaseapp.com",
     projectId: "…",
     storageBucket: "…",
     messagingSenderId: "…",
     appId: "…"
   };
   ```

7. **Authentication → Settings → Authorized domains**：加入 `ntustcdvc1979.github.io`。

這組 `firebaseConfig` 本來就是公開在網頁上的設定，不是密碼；資料安全由 `firestore.rules` 控管：
每位學員只能寫入自己那一筆，不能刪除，也不能寫入其他路徑。

## 資料

`classes/{班級代碼}/responses/{匿名使用者}`：暱稱、組別、個人排序、團隊排序。
課後可在 Firestore 主控台查看或匯出。

## 出處

活動改編自 Grahame Knox “Lost at Sea”（insight.typepad.co.uk，CC BY-NC-ND 3.0）；
專家排序與理由為美國海岸防衛隊版本（NCIPH EpiTeams 整理）。
