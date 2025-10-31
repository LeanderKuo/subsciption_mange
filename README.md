# 訂閱管理平台 (Subscription Manager)

一個現代化的訂閱管理 Web 應用程式，讓用戶能夠輕鬆追蹤和管理各種訂閱服務。

## 功能特色

- 智能費用追蹤與統計分析
- 到期提醒通知（開發中）
- 品牌圖標自動識別
- 企業級安全保障 (Supabase RLS)
- 響應式設計，支援所有裝置
- 快速且直觀的使用者介面

## 技術架構

### 前端
- **框架**: React 19.2.0 + TypeScript
- **UI 庫**: Material-UI (MUI) v7.3.4
- **狀態管理**: React Query (TanStack Query)
- **路由**: React Router DOM
- **部署**: Vercel

### 後端
- **平台**: Supabase
- **資料庫**: PostgreSQL
- **認證**: Supabase Auth (支援 Email/Google/Apple)
- **安全**: Row Level Security (RLS)

## 快速開始

### 前置需求

- Node.js 16.x 或更高版本
- npm 或 yarn
- Supabase 帳號

### 1. 克隆專案

```bash
git clone https://github.com/LeanderKuo/subsciption_mange.git
cd subsciption_mange
```

### 2. 設定前端環境變數

```bash
cd frontend
cp .env.example .env
```

編輯 `.env` 檔案，填入你的 Supabase 憑證：

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Note: 從 [Supabase Dashboard](https://app.supabase.com) > Settings > API 取得這些值

### 3. 安裝依賴並啟動

```bash
npm install
npm start
```

應用程式將在 `http://localhost:3000` 啟動

### 4. 設定 Supabase 資料庫

確保你的 Supabase 專案已套用資料庫遷移：

```bash
# 在專案根目錄
npx supabase db push
```

或手動執行 SQL：

```sql
-- 參考 supabase/migrations/20251023103603_create_subscriptions_table.sql
```

## 專案結構

```
subscription_mange/
├── frontend/               # React 前端應用
│   ├── src/
│   │   ├── components/    # UI 組件
│   │   ├── pages/         # 頁面組件 (Landing, Index, NotFound)
│   │   ├── services/      # API 服務層
│   │   ├── hooks/         # 自定義 Hooks
│   │   ├── types/         # TypeScript 類型
│   │   └── utils/         # 工具函數
│   └── package.json
├── backend/               # 已棄用 (遷移至 Supabase)
├── supabase/              # Supabase 配置
│   ├── migrations/        # 資料庫遷移
│   └── functions/         # Edge Functions
└── README.md
```

## 部署

### 部署到 Vercel (前端)

1. 在 Vercel 連接你的 GitHub Repository
2. 設定環境變數：
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_ANON_KEY`
3. 部署目錄設為 `frontend`
4. Build 指令：`npm run build`
5. Output 目錄：`build`

### Supabase 設定

1. 建立 Supabase 專案
2. 套用資料庫遷移 (migrations)
3. 設定 Authentication Providers (Email, Google, Apple)
4. 設定 RLS Policies (已在 migration 中定義)

## 開發指南

### 建置生產版本

```bash
cd frontend
npm run build
```

### 執行測試

```bash
cd frontend
npm test
```

### 程式碼風格

專案使用 ESLint 和 Prettier 保持程式碼品質。

## 已知問題與修正

### 注意：環境設定

- **問題**: 缺少前端 `.env` 檔案
- **修正**: 複製 `.env.example` 為 `.env` 並填入正確的 Supabase 憑證

### 注意：後端遷移

- **狀態**: `backend/` 目錄中的 Express.js 後端已棄用
- **說明**: 所有後端功能已遷移至 Supabase
- **建議**: 可以安全地忽略或移除 `backend/` 目錄

## 未來計劃

- [ ] 推播通知與 Email 提醒
- [ ] 多用戶協作功能
- [ ] 訂閱費用預測與建議
- [ ] 匯出功能 (CSV/PDF)
- [ ] 更多統計圖表
- [ ] 暗黑模式支援

## 貢獻

歡迎提交 Issue 或 Pull Request！

## 授權

MIT License

## 聯絡方式

- **開發者**: Leander Kuo
- **GitHub**: [@LeanderKuo](https://github.com/LeanderKuo)
- **專案連結**: [https://github.com/LeanderKuo/subsciption_mange](https://github.com/LeanderKuo/subsciption_mange)

---

Built with ❤️ using React, Material-UI, and Supabase
