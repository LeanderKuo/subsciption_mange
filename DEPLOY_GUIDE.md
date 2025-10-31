# 🚀 部署與更新指南

本指南將協助你部署最新的程式碼更新到 Vercel 和 Supabase。

---

## 📋 部署檢查清單

在開始部署前，請確認：

- ✅ 本地環境變數已設定（`frontend/.env`）
- ✅ Git 已安裝
- ✅ 有 Vercel 帳號和專案存取權限
- ✅ 有 Supabase 專案存取權限
- ✅ 有 Brandfetch API Key（如需使用品牌圖標功能）

---

## 🔧 步驟 1: 設定 Supabase Edge Function

### 1.1 部署 Brandfetch API Function

```bash
# 安裝 Supabase CLI（如果尚未安裝）
npm install -g supabase

# 登入 Supabase
npx supabase login

# 連接到你的專案
npx supabase link --project-ref oitlzkqnqrtnpipbkflj

# 部署 Edge Function
npx supabase functions deploy brandfetch-api
```

### 1.2 設定 Brandfetch API Key（Supabase Secrets）

**重要**: 你需要有 Brandfetch API Key 才能使用品牌圖標自動抓取功能。

```bash
# 設定 Brandfetch API Key 為 Supabase Secret
npx supabase secrets set BRANDFETCH_API_KEY=your_brandfetch_api_key_here
```

**如何取得 Brandfetch API Key**:
1. 前往 https://brandfetch.com/developers
2. 註冊或登入帳號
3. 前往 Dashboard > API Keys
4. 創建新的 API Key
5. 複製 API Key

**免費方案限制**:
- 每月 1,000 次 API 呼叫
- 100 requests/second
- 測試 brandfetch.com 域名不計入配額

### 1.3 驗證 Edge Function

```bash
# 測試 Edge Function
curl -X POST https://oitlzkqnqrtnpipbkflj.supabase.co/functions/v1/brandfetch-api \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"brand":"netflix.com"}'
```

應該會返回：
```json
{
  "iconUrl": "https://...",
  "name": "Netflix",
  "domain": "netflix.com"
}
```

---

## 📤 步驟 2: 提交程式碼到 Git

### 2.1 檢查變更

```bash
# 查看所有變更
git status

# 查看具體變更內容
git diff
```

### 2.2 提交變更

```bash
# 添加所有變更（排除 .env）
git add .

# 確認 .env 沒有被加入（應該被 .gitignore 忽略）
git status

# 提交變更
git commit -m "feat: 新增 Landing Page 和改善認證流程

- 新增完整的 Landing Page（Hero, Features, FAQ, CTA）
- 改善登出流程，使用 signOut() 取代 window.reload()
- 新增 ErrorBoundary 錯誤邊界組件
- 改善 TypeScript 類型安全（User | null）
- 新增載入狀態指示器
- 改善 Brandfetch API Edge Function（CORS、錯誤處理、rate limit）
- 新增完整文檔（SETUP_GUIDE、QUICK_START 等）

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"

# 推送到 GitHub
git push origin main
```

---

## 🌐 步驟 3: 部署到 Vercel

### 3.1 更新 Vercel 環境變數

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇你的專案
3. 前往 **Settings** > **Environment Variables**
4. 確認以下環境變數已設定：

```
REACT_APP_SUPABASE_URL = https://oitlzkqnqrtnpipbkflj.supabase.co
REACT_APP_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pdGx6a3FucXJ0bnBpcGJrZmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMzUwMjEsImV4cCI6MjA3NjcxMTAyMX0.jbPYVcL5-5XzPur1MxhP83k_VbpjRpdZTGW18wIoKfs
```

**重要提示**:
- 環境變數名稱必須以 `REACT_APP_` 開頭
- 所有環境（Production, Preview, Development）都要設定

### 3.2 觸發部署

#### 方法 1: 自動部署（推薦）

Vercel 會自動偵測 GitHub push 並開始部署。

1. 等待幾秒鐘
2. 前往 Vercel Dashboard > Deployments
3. 查看最新的部署狀態

#### 方法 2: 手動部署

```bash
# 使用 Vercel CLI
npx vercel --prod
```

### 3.3 檢查部署狀態

1. 前往 Vercel Dashboard
2. 點擊最新的 Deployment
3. 查看建置日誌（Build Logs）
4. 確認沒有錯誤

---

## ✅ 步驟 4: 驗證部署

### 4.1 功能驗證清單

訪問你的 Vercel URL，測試以下功能：

#### Landing Page
- [ ] Landing Page 正常顯示
- [ ] Hero Section 統計數據顯示
- [ ] Features 區塊正常
- [ ] FAQ 可以展開/收合
- [ ] CTA 按鈕可以開啟登入對話框

#### 認證功能
- [ ] 點擊「立即開始使用」開啟 AuthDialog
- [ ] Email 註冊功能正常
- [ ] Email 登入功能正常
- [ ] Google 登入按鈕顯示（如已設定）
- [ ] 登入後重定向到主頁面

#### 主要功能
- [ ] 新增訂閱功能正常
- [ ] 訂閱列表顯示正確
- [ ] 編輯訂閱功能正常
- [ ] 刪除訂閱功能正常
- [ ] 統計數據計算正確

#### 登出功能
- [ ] 點擊登出按鈕
- [ ] 顯示「已登出」Toast 通知
- [ ] 重定向回 Landing Page

#### 錯誤處理
- [ ] 嘗試觸發錯誤（例如：斷網後操作）
- [ ] ErrorBoundary 顯示友善錯誤訊息
- [ ] 「返回首頁」按鈕正常運作

---

## 🐛 常見部署問題排除

### 問題 1: 建置失敗 - "Missing environment variables"

**原因**: Vercel 環境變數未設定

**解決方案**:
1. 前往 Vercel Settings > Environment Variables
2. 新增 `REACT_APP_SUPABASE_URL` 和 `REACT_APP_SUPABASE_ANON_KEY`
3. 重新部署（Deployments > Redeploy）

### 問題 2: 登入後空白頁面

**原因**: Supabase URL 或 Anon Key 錯誤

**檢查方法**:
```bash
# 在瀏覽器 Console 檢查
console.log(process.env.REACT_APP_SUPABASE_URL);
```

**解決方案**:
1. 確認環境變數值正確
2. 重新部署

### 問題 3: Brandfetch API 不工作

**可能原因**:
- Edge Function 未部署
- API Key 未設定
- Rate limit 超過

**檢查步驟**:
```bash
# 1. 檢查 Edge Function 是否部署
npx supabase functions list

# 2. 測試 Edge Function
curl -X POST https://oitlzkqnqrtnpipbkflj.supabase.co/functions/v1/brandfetch-api \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"brand":"brandfetch.com"}'

# 3. 檢查 Supabase Logs
# 前往 Supabase Dashboard > Edge Functions > Logs
```

### 問題 4: Google 登入不工作

**原因**: Google OAuth 重定向 URI 未設定

**解決方案**:
1. 前往 Google Cloud Console
2. OAuth 2.0 Client IDs > Edit
3. 新增 Authorized redirect URIs:
   ```
   https://your-app.vercel.app
   https://oitlzkqnqrtnpipbkflj.supabase.co/auth/v1/callback
   ```
4. 儲存並等待幾分鐘生效

### 問題 5: CORS 錯誤

**原因**: Supabase Edge Function CORS 未正確設定

**解決方案**:
Edge Function 已更新包含 CORS headers，重新部署即可：
```bash
npx supabase functions deploy brandfetch-api
```

---

## 📊 監控與日誌

### Vercel 日誌

1. 前往 Vercel Dashboard
2. 選擇專案 > Deployments
3. 點擊特定部署查看詳細日誌

### Supabase 日誌

1. 前往 Supabase Dashboard
2. 選擇專案 > Edge Functions
3. 點擊 `brandfetch-api` 查看日誌
4. 或前往 Logs 查看所有日誌

### 監控 API 使用量

**Brandfetch API**:
- 前往 Brandfetch Dashboard
- 查看 API Usage
- 監控配額使用情況

**Supabase**:
- 前往 Supabase Dashboard > Settings > Usage
- 監控 Edge Function invocations
- 監控 Database connections

---

## 🔄 未來更新流程

每次有新的程式碼更新時：

```bash
# 1. 本地開發並測試
npm start

# 2. 提交變更
git add .
git commit -m "描述你的變更"
git push origin main

# 3. Vercel 自動部署
# 前往 Vercel Dashboard 確認部署狀態

# 4. （如有 Edge Function 變更）重新部署
npx supabase functions deploy brandfetch-api
```

---

## 📞 需要協助？

### Vercel 問題
- 查看 [Vercel 文檔](https://vercel.com/docs)
- 檢查 [Vercel Status](https://www.vercel-status.com/)

### Supabase 問題
- 查看 [Supabase 文檔](https://supabase.com/docs)
- 檢查 [Supabase Status](https://status.supabase.com/)

### Brandfetch 問題
- 查看 [Brandfetch 文檔](https://docs.brandfetch.com/)
- 聯繫 Brandfetch 支援

---

## ✨ 部署完成檢查

完成部署後，確認：

- ✅ Vercel 部署成功（綠色勾勾）
- ✅ Landing Page 可以訪問
- ✅ 登入/註冊功能正常
- ✅ 所有主要功能運作正常
- ✅ 沒有 Console 錯誤
- ✅ Brandfetch API 正常運作（可選）
- ✅ Google 登入正常（如已設定）

---

## 🎉 恭喜！

你的訂閱管理平台已成功部署！

**下一步**:
- 邀請朋友測試
- 收集使用者反饋
- 根據 [IMPROVEMENTS.md](IMPROVEMENTS.md) 計劃下一步改進

---

最後更新：2025-10-31
