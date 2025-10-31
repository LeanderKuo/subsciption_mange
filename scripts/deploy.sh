#!/bin/bash

# 訂閱管理平台 - 快速部署腳本

echo "=========================================="
echo "  訂閱管理平台 - 部署腳本"
echo "=========================================="
echo ""

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 檢查 Git 狀態
echo "檢查 Git 狀態..."
if ! git diff-index --quiet HEAD --; then
    echo ""
    echo "${YELLOW}以下檔案有未提交的變更：${NC}"
    git status --short
    echo ""
    read -p "是否要提交這些變更？(y/n): " commit_changes

    if [ "$commit_changes" = "y" ]; then
        read -p "請輸入 commit 訊息: " commit_message

        if [ -z "$commit_message" ]; then
            commit_message="Update: $(date +%Y-%m-%d)"
        fi

        echo ""
        echo "提交變更..."
        git add .
        git commit -m "$commit_message"

        echo "${GREEN}完成${NC} 變更已提交"
    else
        echo "${YELLOW}提醒${NC} 取消部署，請先提交變更"
        exit 1
    fi
else
    echo "${GREEN}完成${NC} 沒有未提交的變更"
fi

echo ""
echo "推送到 GitHub..."
if git push origin main; then
    echo "${GREEN}完成${NC} 成功推送到 GitHub"
else
    echo "${RED}失敗${NC} 推送失敗，請檢查網路連線或 Git 權限"
    exit 1
fi

echo ""
echo "=========================================="
echo "${GREEN}部署完成${NC}"
echo "=========================================="
echo ""
echo "接下來："
echo "1. 前往 Vercel Dashboard 查看部署狀態"
echo "   https://vercel.com/dashboard"
echo ""
echo "2. 如果有修改 Edge Function，請執行："
echo "   npx supabase functions deploy brandfetch-api"
echo ""
echo "3. 驗證部署："
echo "   - 訪問你的 Vercel URL"
echo "   - 測試登入/登出功能"
echo "   - 測試新增訂閱功能"
echo ""
echo "詳細資訊請參考 DEPLOY_GUIDE.md"
echo "=========================================="
