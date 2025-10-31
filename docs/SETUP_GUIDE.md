# 訂閱管理平台 - 完整設定指南

本指南將協助你完成專案的完整設定，包括 Supabase 配置、Google 第三方登入、環境變數等。

---

## 目錄

1. [Supabase 專案設定](#1-supabase-專案設定)
2. [設定 Google OAuth 登入](#2-設定-google-oauth-登入)
3. [前端環境變數設定](#3-前端環境變數設定)
4. [本地開發啟動](#4-本地開發啟動)
5. [部署到 Vercel](#5-部署到-vercel)
6. [常見問題排除](#6-常見問題排除)

---

## 1. Supabase 專案設定

### 1.1 創建 Supabase 專案

1. 前往 [Supabase Dashboard](https://app.supabase.com)
2. 點擊 "New Project"
3. 填寫專案資訊：
   - Name: `subscription-manager`（或你喜歡的名稱）
   - Database Password: 設定一個強密碼（請記住）
   - Region: 選擇離你最近的區域（建議：Singapore 或 Tokyo）

### 1.2 取得 API 憑證

專案創建完成後：

1. 前往 **Settings** > **API**
2. 複製以下兩個值（待會會用到）：
   - `Project URL`
   - `anon/public` key

### 1.3 設定資料庫

#### 方法一：使用 Supabase CLI（推薦）

```bash
# 在專案根目錄
npx supabase db push
```

#### 方法二：手動執行 SQL

1. 在 Supabase Dashboard，前往 **SQL Editor**
2. 複製並執行 `supabase/migrations/20251023103603_create_subscriptions_table.sql` 的內容
3. 確認執行成功

### 1.4 驗證資料庫設定

在 SQL Editor 執行：

```sql
SELECT * FROM public.subscriptions;
```

應該會看到空表格（沒有錯誤）。

---

## 2. 設定 Google OAuth 登入

### 2.1 創建 Google Cloud 專案

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 創建新專案或選擇現有專案

### 2.2 設定 OAuth 同意畫面

1. 前往 **APIs & Services** > **OAuth consent screen**
2. 選擇 **External**（外部）
3. 填寫必要資訊：
   - App name: `訂閱管理平台`
   - User support email: 你的 Email
   - Developer contact information: 你的 Email
4. 點擊 **Save and Continue**

### 2.3 創建 OAuth 2.0 憑證

1. 前往 **APIs & Services** > **Credentials**
2. 點擊 **Create Credentials** > **OAuth client ID**
3. 選擇 **Web application**
4. 填寫資訊：
   - Name: `Subscription Manager`
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     https://your-vercel-app.vercel.app
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000
     https://your-supabase-project.supabase.co/auth/v1/callback
     https://your-vercel-app.vercel.app
     ```
5. 點擊 **Create**
6. 複製 **Client ID** 和 **Client Secret**

### 2.4 在 Supabase 設定 Google Provider

1. 在 Supabase Dashboard，前往 **Authentication** > **Providers**
2. 找到 **Google** 並啟用
3. 填入從 Google Cloud 取得的：
   - Client ID
   - Client Secret
4. 點擊 **Save**

### 2.5 驗證 Google 登入

稍後啟動應用程式後，應該能看到 Google 登入按鈕。

---

## 3. 前端環境變數設定

### 3.1 使用自動化腳本（推薦）

```bash
# 在專案根目錄
./scripts/setup-env.sh
```

按照提示輸入你的 Supabase 憑證。

### 3.2 手動設定

```bash
cd frontend
cp .env.example .env
```

編輯 `frontend/.env`：

```env
REACT_APP_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

將上面的值替換為你在 Supabase Dashboard 取得的實際值。

### 3.3 驗證環境變數

```bash
cd frontend
cat .env
```

確保兩個變數都有正確填入。

---

## 4. 本地開發啟動

### 4.1 安裝依賴

```bash
cd frontend
npm install
```

### 4.2 啟動開發伺服器

```bash
npm start
```

應用程式會在 `http://localhost:3000` 啟動。

### 4.3 驗證功能

1. **Landing Page**: 應該看到完整的 Landing Page
2. **Google 登入**: 點擊登入按鈕，選擇 Google 登入
3. **新增訂閱**: 登入後，嘗試新增一個訂閱
4. **查看訂閱**: 確認訂閱顯示正確
5. **登出**: 測試登出功能

---

## 5. 部署到 Vercel

### 5.1 連接 GitHub Repository

1. 確保程式碼已推送到 GitHub
2. 前往 [Vercel Dashboard](https://vercel.com)
3. 點擊 **Add New Project**
4. 選擇你的 Repository

### 5.2 設定專案

- **Framework Preset**: Create React App
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `build`

### 5.3 設定環境變數

在 Vercel 專案設定中，前往 **Settings** > **Environment Variables**，新增：

```
REACT_APP_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5.4 部署

點擊 **Deploy**，等待建置完成。

### 5.5 更新 Google OAuth 重定向 URI

部署完成後，記得在 Google Cloud Console 新增 Vercel 的 URL：

```
https://your-app-name.vercel.app
https://your-supabase-project.supabase.co/auth/v1/callback
```

---

## 6. 常見問題排除

### Q1: 本地開發時出現 "Missing Supabase environment variables"

**解決方案**:
```bash
cd frontend
cp .env.example .env
# 編輯 .env 並填入 Supabase 憑證
```

### Q2: Google 登入後跳轉錯誤

**檢查清單**:
- [ ] Google Cloud Console 的 Authorized redirect URIs 是否正確
- [ ] Supabase 的 Google Provider 是否已啟用
- [ ] Client ID 和 Client Secret 是否正確

### Q3: 登入後看不到訂閱資料

**可能原因**:
1. RLS 政策未正確設定
2. user_id 欄位有問題

**解決方案**:
```sql
-- 在 Supabase SQL Editor 執行
SELECT * FROM public.subscriptions WHERE user_id = auth.uid();
```

確認 RLS 政策：
```sql
SELECT * FROM pg_policies WHERE tablename = 'subscriptions';
```

### Q4: 部署到 Vercel 後環境變數不生效

**解決方案**:
1. 確認環境變數名稱必須以 `REACT_APP_` 開頭
2. 在 Vercel 重新部署（環境變數變更需要重新部署）
3. 使用 `vercel env pull` 同步環境變數

### Q5: 登出後沒有回到 Landing Page

**解決方案**:
已修正！現在使用 `signOut()` 函數並在成功後重新導向。

---

## 完成設定

恭喜！你已經完成所有設定。現在可以開始使用訂閱管理平台了。

### 下一步

- 閱讀 [IMPROVEMENTS.md](./IMPROVEMENTS.md) 了解未來改進計劃
- 閱讀 [README.md](README.md) 了解專案架構
- 開始新增你的訂閱服務！

---

## 需要協助？

如果遇到任何問題：

1. 檢查 [常見問題排除](#6-常見問題排除)
2. 查看瀏覽器 Console 的錯誤訊息
3. 查看 Supabase Dashboard 的日誌
4. 提交 GitHub Issue

---

最後更新：2025-10-31
