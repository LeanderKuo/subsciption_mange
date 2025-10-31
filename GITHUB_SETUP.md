# 🔧 GitHub 設定指南

你的專案還沒有初始化 Git。請依照以下步驟設定：

---

## 📋 前置檢查

你提到專案已部署到 Vercel 和 Supabase，但本地還沒有 Git repository。這表示可能：

1. 你是直接在 Vercel 介面上傳檔案
2. 或使用了其他方式部署
3. 或是 `.git` 目錄被刪除了

---

## 🚀 完整 Git 設定步驟

### 步驟 1: 初始化 Git Repository

```bash
# 進入專案目錄
cd /mnt/c/Users/Lijenkuo/Desktop/personal_project/subsciption_mange

# 初始化 Git
git init

# 設定你的 Git 使用者資訊（如果尚未設定）
git config user.name "你的名字"
git config user.email "你的email@example.com"
```

### 步驟 2: 添加所有檔案

```bash
# 查看將要添加的檔案
git status

# 添加所有檔案（.gitignore 會自動排除 .env 等敏感檔案）
git add .

# 檢查是否有 .env 被加入（應該要被忽略）
git status | grep .env
```

**重要**: 確保 `.env` 檔案沒有被加入！

### 步驟 3: 創建第一個 Commit

```bash
# 創建 commit
git commit -m "feat: Initial commit - 訂閱管理平台

- 完整的 React 前端應用
- Material-UI 設計系統
- Supabase 認證與資料庫整合
- Landing Page（Hero, Features, FAQ, CTA）
- ErrorBoundary 錯誤處理
- Brandfetch API Edge Function
- 完整文檔（SETUP_GUIDE、DEPLOY_GUIDE 等）

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## 🌐 連接到 GitHub

### 方法 1: 如果 GitHub Repository 已存在

如果你已經在 GitHub 上有 repository（例如 `https://github.com/LeanderKuo/subsciption_mange`）：

```bash
# 添加遠端 repository
git remote add origin https://github.com/LeanderKuo/subsciption_mange.git

# 拉取遠端的檔案（如果有的話）
git pull origin main --allow-unrelated-histories

# 推送到 GitHub
git push -u origin main
```

### 方法 2: 創建新的 GitHub Repository

1. **前往 GitHub**:
   - 登入 https://github.com
   - 點擊右上角 "+" > "New repository"

2. **填寫資訊**:
   - Repository name: `subsciption_mange`（或你喜歡的名稱）
   - Description: `訂閱管理平台 - 輕鬆管理你的所有訂閱服務`
   - 選擇 **Public** 或 **Private**
   - **不要**勾選 "Initialize this repository with a README"
   - 點擊 "Create repository"

3. **連接 Repository**:
   ```bash
   # 使用 GitHub 提供的指令
   git remote add origin https://github.com/你的使用者名稱/subsciption_mange.git
   git branch -M main
   git push -u origin main
   ```

---

## 🔑 GitHub 認證設定

### 如果推送時要求輸入帳號密碼

GitHub 已不再支援密碼認證，你需要使用 Personal Access Token：

#### 步驟 1: 創建 Personal Access Token

1. 前往 GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. 點擊 "Generate new token" > "Generate new token (classic)"
3. 設定:
   - Note: `Subscription Manager Deploy`
   - Expiration: `90 days`（或你喜歡的期限）
   - 勾選 scopes:
     - ✅ `repo` (所有項目)
     - ✅ `workflow`
4. 點擊 "Generate token"
5. **複製 token**（只會顯示一次！）

#### 步驟 2: 使用 Token 推送

```bash
# 方法 1: 在 URL 中包含 token
git remote set-url origin https://你的token@github.com/你的使用者名稱/subsciption_mange.git

# 方法 2: 推送時輸入
git push -u origin main
# Username: 你的GitHub使用者名稱
# Password: 貼上你的 Personal Access Token
```

### 使用 SSH（推薦）

```bash
# 1. 生成 SSH key（如果還沒有）
ssh-keygen -t ed25519 -C "你的email@example.com"

# 2. 複製公鑰
cat ~/.ssh/id_ed25519.pub

# 3. 添加到 GitHub
# 前往 GitHub > Settings > SSH and GPG keys > New SSH key
# 貼上公鑰內容

# 4. 測試連接
ssh -T git@github.com

# 5. 修改 remote URL
git remote set-url origin git@github.com:你的使用者名稱/subsciption_mange.git

# 6. 推送
git push -u origin main
```

---

## 🔗 連接 Vercel 到 GitHub

一旦 GitHub repository 設定完成：

1. **前往 Vercel Dashboard**:
   - https://vercel.com/dashboard

2. **Import Project**:
   - 點擊 "Add New..." > "Project"
   - 選擇 "Import Git Repository"
   - 選擇你的 GitHub repository

3. **設定專案**:
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **設定環境變數**:
   ```
   REACT_APP_SUPABASE_URL = https://oitlzkqnqrtnpipbkflj.supabase.co
   REACT_APP_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. **部署**:
   - 點擊 "Deploy"
   - 等待建置完成

之後每次 `git push` 到 GitHub，Vercel 就會自動部署！

---

## ✅ 驗證 Git 設定

```bash
# 檢查 Git 狀態
git status

# 檢查 remote
git remote -v

# 應該顯示：
# origin  https://github.com/你的使用者名稱/subsciption_mange.git (fetch)
# origin  https://github.com/你的使用者名稱/subsciption_mange.git (push)
```

---

## 🐛 常見問題

### Q1: "fatal: not a git repository"

**解決**: 確認你在正確的目錄
```bash
cd /mnt/c/Users/Lijenkuo/Desktop/personal_project/subsciption_mange
git status
```

### Q2: "remote: Support for password authentication was removed"

**解決**: 使用 Personal Access Token 或 SSH key（見上方說明）

### Q3: "! [rejected] main -> main (non-fast-forward)"

**解決**: 遠端有你本地沒有的 commits
```bash
# 選項 1: Pull 後再 push
git pull origin main --rebase
git push origin main

# 選項 2: 強制推送（小心使用！會覆蓋遠端）
git push -f origin main
```

### Q4: ".env 被加入到 Git"

**解決**: 從 Git 移除但保留本地檔案
```bash
git rm --cached frontend/.env
git commit -m "Remove .env from Git"
```

---

## 📝 完整執行步驟

```bash
# 1. 進入專案目錄
cd /mnt/c/Users/Lijenkuo/Desktop/personal_project/subsciption_mange

# 2. 初始化 Git
git init

# 3. 設定使用者資訊
git config user.name "Leander Kuo"
git config user.email "你的email@example.com"

# 4. 添加檔案
git add .

# 5. 檢查狀態（確保 .env 沒被加入）
git status

# 6. 創建 commit
git commit -m "feat: Initial commit - 訂閱管理平台"

# 7. 添加 GitHub remote（替換成你的 URL）
git remote add origin https://github.com/LeanderKuo/subsciption_mange.git

# 8. 推送到 GitHub
git push -u origin main
```

---

## 🎯 下一步

設定完成後：

1. ✅ 每次修改程式碼後提交
   ```bash
   git add .
   git commit -m "描述你的變更"
   git push
   ```

2. ✅ Vercel 會自動偵測並部署

3. ✅ 查看 GitHub repository 確認檔案已上傳

---

需要協助嗎？告訴我你遇到的錯誤訊息，我會幫你解決！
