# 專案結構說明

本文件提供訂閱管理平台的資料夾配置與關鍵檔案說明，方便快速了解專案。

---

## 目錄概覽

```
subscription_mange/
├── README.md
├── CHANGELOG.md
├── DEPLOY_GUIDE.md
├── docs/
│   ├── QUICK_START.md
│   ├── SETUP_GUIDE.md
│   ├── IMPROVEMENTS.md
│   └── PROJECT_STRUCTURE.md
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
├── backend/               # 已棄用的 Express 後端
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   └── functions/
├── scripts/
│   ├── deploy.sh
│   └── setup-env.sh
└── vercel.json
```

---

## 前端 (frontend/)

| 類別 | 路徑 | 說明 |
|------|------|------|
| 頁面 | `src/pages/Landing.tsx` | 登入前的 Landing Page |
| | `src/pages/Index.tsx` | 登入後主畫面 |
| 組件 | `src/components/ErrorBoundary.tsx` | React 錯誤邊界 |
| | `src/components/AuthDialog.tsx` | 登入與註冊對話框 |
| 服務 | `src/services/supabaseClient.ts` | Supabase 初始化 |
| | `src/services/brandfetchService.ts` | 品牌查詢 Edge function 封裝 |
| Hooks | `src/hooks/useBrandAutofill.ts` | 品牌自動帶入邏輯 |
| 設定 | `src/i18n/translations.ts` | 多語言字典 |
| | `.env.example` | 前端環境變數範例 |

---

## Supabase (supabase/)

- `config.toml`：Supabase 專案設定。
- `migrations/`：資料庫遷移腳本。
- `functions/brandfetch-api/`：品牌圖標 Edge Function。
- `functions/brand-search/`、`functions/exchange-rate/`：其他 Edge Functions（若啟用）。

---

## 後端 (backend/)

此目錄保留傳統 Express 版本，現已棄用。所有資料處理改由 Supabase 負責，僅保留歷史參考。

- `server.js`：舊的 Express 伺服器入口。
- `.env`：標示為棄用，提醒不要再使用 MySQL 設定。
- `README.md`：說明遷移狀態。

---

## 自動化腳本 (scripts/)

- `setup-env.sh`：互動式腳本，用於生成 `frontend/.env`。
- `deploy.sh`：Git 推送與部署輔助腳本。

---

## 文件 (docs/)

| 檔案 | 用途 |
|------|------|
| `QUICK_START.md` | 三步驟快速啟動專案 |
| `SETUP_GUIDE.md` | 詳細的環境設定與問題排除 |
| `IMPROVEMENTS.md` | 已知問題與改進計畫 |
| `PROJECT_STRUCTURE.md` | 本文件 |

主要說明性文件集中於 `docs/` 目錄，避免干擾專案根目錄。

---

## 其他資源

- `CHANGELOG.md`：重要改動紀錄。
- `DEPLOY_GUIDE.md`：Supabase 與 Vercel 部署流程。
- `vercel.json`：前端部署配置。

最後更新：2025-10-31
