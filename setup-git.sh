#!/bin/bash

# Git 設定腳本 - 訂閱管理平台

echo "=========================================="
echo "  Git 設定與 GitHub 連接"
echo "=========================================="
echo ""

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 檢查是否已經是 Git repository
if [ -d ".git" ]; then
    echo "${YELLOW}⚠ 此目錄已經是 Git repository${NC}"
    echo ""
    git remote -v
    echo ""
    read -p "是否要重新設定？(y/n): " reset_git

    if [ "$reset_git" != "y" ]; then
        echo "取消設定"
        exit 0
    fi
else
    echo "📦 初始化 Git repository..."
    git init
    echo "${GREEN}✓${NC} Git repository 已初始化"
fi

echo ""
echo "=========================================="
echo "  設定 Git 使用者資訊"
echo "=========================================="
echo ""

# 檢查現有的 Git 配置
current_name=$(git config user.name 2>/dev/null)
current_email=$(git config user.email 2>/dev/null)

if [ -n "$current_name" ] && [ -n "$current_email" ]; then
    echo "目前設定："
    echo "  名稱: $current_name"
    echo "  Email: $current_email"
    echo ""
    read -p "是否使用目前的設定？(y/n): " use_current

    if [ "$use_current" != "y" ]; then
        read -p "請輸入你的名稱: " git_name
        read -p "請輸入你的 Email: " git_email
        git config user.name "$git_name"
        git config user.email "$git_email"
    fi
else
    read -p "請輸入你的名稱: " git_name
    read -p "請輸入你的 Email: " git_email
    git config user.name "$git_name"
    git config user.email "$git_email"
fi

echo "${GREEN}✓${NC} Git 使用者資訊已設定"

echo ""
echo "=========================================="
echo "  添加檔案到 Git"
echo "=========================================="
echo ""

echo "📝 檢查將要添加的檔案..."
echo ""

# 顯示將要添加的檔案
git status --short | head -20

echo ""
echo "${YELLOW}⚠ 重要: 確保 .env 檔案沒有被加入！${NC}"
echo ""

if git status --short | grep -q "\.env$"; then
    echo "${RED}✗ 警告: .env 檔案將被加入到 Git！${NC}"
    echo "請檢查 .gitignore 檔案"
    exit 1
fi

read -p "是否添加所有檔案？(y/n): " add_files

if [ "$add_files" = "y" ]; then
    git add .
    echo "${GREEN}✓${NC} 檔案已添加"
else
    echo "取消添加檔案"
    exit 0
fi

echo ""
echo "=========================================="
echo "  創建 Commit"
echo "=========================================="
echo ""

read -p "請輸入 commit 訊息（按 Enter 使用預設）: " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="feat: Initial commit - 訂閱管理平台

- 完整的 React 前端應用
- Material-UI 設計系統
- Supabase 認證與資料庫整合
- Landing Page（Hero, Features, FAQ, CTA）
- ErrorBoundary 錯誤處理
- Brandfetch API Edge Function
- 完整文檔（SETUP_GUIDE、DEPLOY_GUIDE 等）

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

git commit -m "$commit_msg"
echo "${GREEN}✓${NC} Commit 已創建"

echo ""
echo "=========================================="
echo "  連接到 GitHub"
echo "=========================================="
echo ""

# 檢查是否已有 remote
if git remote | grep -q "origin"; then
    echo "目前的 remote:"
    git remote -v
    echo ""
    read -p "是否要更新 remote URL？(y/n): " update_remote

    if [ "$update_remote" = "y" ]; then
        read -p "請輸入 GitHub repository URL: " repo_url
        git remote set-url origin "$repo_url"
        echo "${GREEN}✓${NC} Remote URL 已更新"
    fi
else
    echo "請選擇連接方式："
    echo "1. HTTPS (使用 Personal Access Token)"
    echo "2. SSH (需要先設定 SSH key)"
    echo ""
    read -p "選擇 (1/2): " connection_type

    if [ "$connection_type" = "1" ]; then
        echo ""
        echo "${BLUE}ℹ${NC} HTTPS URL 格式: https://github.com/使用者名稱/repository名稱.git"
        read -p "請輸入 GitHub repository URL: " repo_url
        git remote add origin "$repo_url"
        echo "${GREEN}✓${NC} Remote 已添加"
    elif [ "$connection_type" = "2" ]; then
        echo ""
        echo "${BLUE}ℹ${NC} SSH URL 格式: git@github.com:使用者名稱/repository名稱.git"
        read -p "請輸入 GitHub repository SSH URL: " repo_url
        git remote add origin "$repo_url"
        echo "${GREEN}✓${NC} Remote 已添加"
    else
        echo "${RED}✗${NC} 無效的選擇"
        exit 1
    fi
fi

echo ""
echo "=========================================="
echo "  推送到 GitHub"
echo "=========================================="
echo ""

echo "${YELLOW}準備推送到 GitHub...${NC}"
echo ""
echo "如果使用 HTTPS，你需要："
echo "  - Username: 你的 GitHub 使用者名稱"
echo "  - Password: Personal Access Token (不是你的 GitHub 密碼！)"
echo ""
echo "如何取得 Personal Access Token："
echo "  1. GitHub > Settings > Developer settings > Personal access tokens"
echo "  2. Generate new token (classic)"
echo "  3. 勾選 'repo' 權限"
echo "  4. 複製 token"
echo ""
read -p "準備好了嗎？按 Enter 繼續..."

if git push -u origin main 2>&1; then
    echo ""
    echo "${GREEN}=========================================="
    echo "  ✓ 成功推送到 GitHub！"
    echo "==========================================${NC}"
    echo ""
    echo "接下來："
    echo "1. 前往你的 GitHub repository 確認檔案"
    echo "2. 前往 Vercel 連接 GitHub repository"
    echo "3. 設定自動部署"
    echo ""
else
    echo ""
    echo "${RED}=========================================="
    echo "  ✗ 推送失敗"
    echo "==========================================${NC}"
    echo ""
    echo "可能的原因："
    echo "1. GitHub repository 不存在"
    echo "   解決: 先在 GitHub 創建 repository"
    echo ""
    echo "2. 認證失敗"
    echo "   解決: 使用 Personal Access Token 而非密碼"
    echo ""
    echo "3. 遠端有衝突"
    echo "   解決: 先執行 'git pull origin main --rebase'"
    echo ""
    echo "詳細資訊請參考 GITHUB_SETUP.md"
fi

echo ""
echo "=========================================="
