# 專案結構說明

本文檔詳細說明專案的目錄結構和各檔案的用途。

---

## 📁 目錄結構

```
subscription_mange/
│
├── 📄 README.md                    # 專案說明文檔
├── 📄 QUICK_START.md              # 快速開始指南
├── 📄 SETUP_GUIDE.md              # 完整設定指南
├── 📄 IMPROVEMENTS.md             # 改進建議清單
├── 📄 CHANGELOG.md                # 更新日誌
├── 📄 PROJECT_STRUCTURE.md        # 本檔案
├── 📄 .gitignore                  # Git 忽略規則
├── 🔧 setup-env.sh                # 環境變數自動設定腳本
├── 📄 spec.md                     # 專案規格文檔
├── 📄 package.json                # 根目錄套件配置（已棄用）
│
├── 📂 frontend/                   # ⭐ React 前端應用
│   ├── 📂 public/                 # 靜態資源
│   │   ├── index.html            # HTML 模板
│   │   ├── manifest.json         # PWA 配置
│   │   ├── robots.txt            # SEO 爬蟲規則
│   │   └── favicon.ico           # 網站圖標
│   │
│   ├── 📂 src/                    # 源代碼目錄
│   │   ├── 📂 components/        # UI 組件
│   │   │   ├── AddSubscriptionDialog.tsx      # 新增訂閱對話框
│   │   │   ├── EditSubscriptionDialog.tsx     # 編輯訂閱對話框
│   │   │   ├── SubscriptionCard.tsx           # 訂閱卡片組件
│   │   │   ├── StatsCard.tsx                  # 統計卡片組件
│   │   │   ├── AuthDialog.tsx                 # 登入/註冊對話框
│   │   │   ├── LogoutButton.tsx               # 登出按鈕
│   │   │   ├── ToastProvider.tsx              # Toast 通知提供者
│   │   │   └── ⭐ ErrorBoundary.tsx            # 錯誤邊界（新增）
│   │   │
│   │   ├── 📂 pages/             # 頁面組件
│   │   │   ├── ⭐ Landing.tsx                  # Landing Page（新增）
│   │   │   ├── Index.tsx                      # 主頁（已改善）
│   │   │   └── NotFound.tsx                   # 404 頁面
│   │   │
│   │   ├── 📂 services/          # API 服務層
│   │   │   ├── supabaseClient.ts             # Supabase 客戶端初始化
│   │   │   ├── supabaseService.ts            # Supabase CRUD 操作
│   │   │   ├── subscriptionService.ts        # 訂閱服務（舊）
│   │   │   └── brandfetchService.ts          # 品牌圖標服務
│   │   │
│   │   ├── 📂 hooks/             # 自定義 Hooks
│   │   │   ├── use-toast.ts                  # Toast 通知 Hook
│   │   │   └── useBrandAutofill.ts           # 品牌自動填寫 Hook
│   │   │
│   │   ├── 📂 types/             # TypeScript 類型定義
│   │   │   └── subscription.ts               # 訂閱相關類型
│   │   │
│   │   ├── 📂 utils/             # 工具函數
│   │   │   └── subscriptionDates.ts          # 日期處理工具
│   │   │
│   │   ├── 📂 config/            # 配置檔案
│   │   │   └── appManifest.ts                # 應用程式 Manifest
│   │   │
│   │   ├── App.tsx                           # 主應用組件（已改善）
│   │   ├── index.tsx                         # 應用入口點
│   │   ├── setupTests.ts                     # 測試設定
│   │   └── react-app-env.d.ts                # React 類型定義
│   │
│   ├── 📄 package.json           # 前端依賴配置
│   ├── 📄 tsconfig.json          # TypeScript 配置
│   ├── 📄 .env.example           # ⭐ 環境變數範例（新增）
│   └── 📄 .env                   # 環境變數（需手動創建）
│
├── 📂 backend/                    # ⚠️ 已棄用的 Express 後端
│   ├── server.js                 # Express 伺服器（已棄用）
│   ├── schema.sql                # MySQL 架構（已棄用）
│   ├── package.json              # 後端依賴（已棄用）
│   ├── .env                      # ⭐ 已更新為棄用警告
│   └── ⭐ README.md               # 遷移說明（新增）
│
├── 📂 supabase/                   # ⭐ Supabase 配置
│   ├── config.toml               # Supabase 專案配置
│   │
│   ├── 📂 migrations/            # 資料庫遷移
│   │   └── 20251023103603_create_subscriptions_table.sql
│   │
│   └── 📂 functions/             # Edge Functions
│       └── brandfetch-api/       # 品牌圖標 API
│           └── index.ts
│
└── 📂 src-temp/                   # 臨時源代碼（可忽略）
```

---

## 🎯 核心檔案說明

### ⭐ 新增/重要檔案

#### 1. 前端 Landing Page
**檔案**: `frontend/src/pages/Landing.tsx`
- **用途**: 未登入用戶看到的 Landing Page
- **功能**:
  - Hero Section（主視覺）
  - Features（功能介紹）
  - FAQ（常見問題）
  - CTA（行動呼籲）

#### 2. 錯誤邊界組件
**檔案**: `frontend/src/components/ErrorBoundary.tsx`
- **用途**: 捕獲並優雅處理 React 錯誤
- **功能**:
  - 顯示友善錯誤訊息
  - 開發模式顯示詳細堆疊
  - 提供返回首頁功能

#### 3. 環境變數範例
**檔案**: `frontend/.env.example`
- **用途**: 環境變數設定模板
- **內容**:
  - Supabase URL
  - Supabase Anon Key

#### 4. 設定腳本
**檔案**: `setup-env.sh`
- **用途**: 自動化環境變數設定
- **執行**: `./setup-env.sh`

---

## 📚 文檔檔案說明

| 檔案 | 用途 | 適合對象 |
|------|------|---------|
| [README.md](README.md) | 專案概述與說明 | 所有人 |
| [QUICK_START.md](QUICK_START.md) | 3 步驟快速開始 | 想快速試用的人 |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | 完整設定指南 | 需要詳細設定的人 |
| [IMPROVEMENTS.md](IMPROVEMENTS.md) | 已知問題與改進計劃 | 開發者 |
| [CHANGELOG.md](CHANGELOG.md) | 更新日誌 | 開發者/維護者 |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | 專案結構說明 | 開發者 |

---

## 🗂️ 目錄分類

### 生產環境使用
```
frontend/
├── src/components/    # UI 組件
├── src/pages/         # 頁面
├── src/services/      # API 服務
└── public/            # 靜態資源
```

### 配置與設定
```
frontend/
├── .env.example       # 環境變數範例
├── package.json       # 依賴管理
└── tsconfig.json      # TypeScript 配置

supabase/
├── config.toml        # Supabase 配置
└── migrations/        # 資料庫遷移
```

### 文檔
```
根目錄/
├── README.md
├── QUICK_START.md
├── SETUP_GUIDE.md
├── IMPROVEMENTS.md
├── CHANGELOG.md
└── PROJECT_STRUCTURE.md
```

### 已棄用
```
backend/               # 舊的 Express 後端
src-temp/              # 臨時檔案
```

---

## 🔧 配置檔案詳解

### 前端配置

#### package.json
```json
{
  "name": "frontend",
  "dependencies": {
    "react": "^19.2.0",
    "@mui/material": "^7.3.4",
    "@supabase/supabase-js": "^2.76.1",
    "@tanstack/react-query": "^5.62.7"
  }
}
```

#### tsconfig.json
- TypeScript 編譯器配置
- 啟用嚴格模式
- 配置模組解析

#### .env.example
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
```

---

## 📊 組件層級結構

```
App.tsx (ErrorBoundary)
│
├─ Landing.tsx (未登入)
│  ├─ AuthDialog
│  └─ ToastProvider
│
└─ Index.tsx (已登入)
   ├─ AddSubscriptionDialog
   ├─ EditSubscriptionDialog
   ├─ SubscriptionCard (多個)
   ├─ StatsCard (多個)
   ├─ LogoutButton
   └─ ToastProvider
```

---

## 🌐 路由結構

```
/ (根路徑)
├─ 未登入 → Landing Page
└─ 已登入 → Index Page
   └─ /* → NotFound Page
```

---

## 💾 資料流向

```
使用者
  ↓
React Components
  ↓
React Query (快取)
  ↓
Supabase Service
  ↓
Supabase Client
  ↓
Supabase API
  ↓
PostgreSQL Database
```

---

## 🔐 認證流程

```
Landing Page
  ↓
點擊登入
  ↓
AuthDialog
  ↓
選擇登入方式
├─ Email/Password → Supabase Auth
└─ Google OAuth → Google → Supabase Auth
  ↓
認證成功
  ↓
更新 App.tsx 狀態
  ↓
重定向到 Index Page
```

---

## 📦 建置流程

### 開發模式
```bash
npm start
  ↓
webpack-dev-server
  ↓
http://localhost:3000
```

### 生產建置
```bash
npm run build
  ↓
Create React App 建置
  ↓
優化、壓縮、分割代碼
  ↓
輸出到 build/
  ↓
部署到 Vercel
```

---

## 🚀 部署架構

```
GitHub Repository
  ↓
推送代碼
  ↓
Vercel (CI/CD)
  ↓
自動建置
  ↓
部署到 CDN
  ↓
使用者訪問
```

**Supabase**:
- 資料庫: PostgreSQL
- 認證: Supabase Auth
- API: 自動生成的 REST API

---

## 📝 命名規範

### 檔案命名
- **組件**: PascalCase (例: `ErrorBoundary.tsx`)
- **Hooks**: camelCase with "use" prefix (例: `useBrandAutofill.ts`)
- **服務**: camelCase (例: `supabaseService.ts`)
- **類型**: camelCase (例: `subscription.ts`)

### 變數命名
- **常數**: UPPER_SNAKE_CASE (例: `REACT_APP_SUPABASE_URL`)
- **函數**: camelCase (例: `handleLogout`)
- **組件**: PascalCase (例: `<ErrorBoundary />`)

---

## 🔍 快速查找

### 想修改 Landing Page？
👉 `frontend/src/pages/Landing.tsx`

### 想修改登入流程？
👉 `frontend/src/components/AuthDialog.tsx`
👉 `frontend/src/services/supabaseService.ts`

### 想修改主頁面？
👉 `frontend/src/pages/Index.tsx`

### 想修改訂閱卡片樣式？
👉 `frontend/src/components/SubscriptionCard.tsx`

### 想修改資料庫架構？
👉 `supabase/migrations/`

### 想查看錯誤處理？
👉 `frontend/src/components/ErrorBoundary.tsx`

---

最後更新：2025-10-31
