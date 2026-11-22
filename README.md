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

專案 `iq-tax-4q` 已建立好：Firestore（asia-east1）、匿名登入、授權網域、[`firestore.rules`](firestore.rules)。

**API key 不放在 repo 裡。**
- 正式網站：GitHub Actions（[`.github/workflows/pages.yml`](.github/workflows/pages.yml)）發佈時，
  從 repo secret `FIREBASE_API_KEY` 產生 `firebase-config.js`。
  需要的設定：**Settings → Secrets and variables → Actions** 新增 `FIREBASE_API_KEY`；
  **Settings → Pages → Source** 選 **GitHub Actions**。
- 本機預覽：把 [`firebase-config.example.js`](firebase-config.example.js) 複製成 `firebase-config.js` 並填入 key（已列入 .gitignore）。

這把網頁 API key 在 Google Cloud 已限制只能從 `ntustcdvc1979.github.io`、`iq-tax-4q.firebaseapp.com`、
`localhost:8321` 使用，且只能呼叫登入與 Firestore。資料安全由 `firestore.rules` 控管：
每位學員只能寫入自己那一筆，只有用 PIN 登入的主持人能清空。

修改規則後部署：`npx firebase-tools deploy --only firestore:rules`

## 資料

`classes/{班級代碼}/responses/{匿名使用者}`：暱稱、組別、個人排序、團隊排序。
課後可在 Firestore 主控台查看或匯出。

## 出處

活動改編自 Grahame Knox “Lost at Sea”（insight.typepad.co.uk，CC BY-NC-ND 3.0）；
專家排序與理由為美國海岸防衛隊版本（NCIPH EpiTeams 整理）。
