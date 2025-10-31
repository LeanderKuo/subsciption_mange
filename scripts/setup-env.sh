#!/bin/bash

# 訂閱管理平台 - 環境設定腳本

echo "=========================================="
echo "  訂閱管理平台 - 環境變數設定"
echo "=========================================="
echo ""

# 檢查是否已存在 .env 檔案
if [ -f "frontend/.env" ]; then
    echo "注意：frontend/.env 已存在"
    read -p "是否要覆蓋？(y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo "取消設定"
        exit 0
    fi
fi

echo ""
echo "請從 Supabase Dashboard > Settings > API 取得以下資訊："
echo ""

# 讀取 Supabase URL
read -p "請輸入 Supabase Project URL: " supabase_url

# 讀取 Supabase Anon Key
read -p "請輸入 Supabase Anon Key: " supabase_key

# 驗證輸入
if [ -z "$supabase_url" ] || [ -z "$supabase_key" ]; then
    echo ""
    echo "錯誤：Supabase URL 或 Anon Key 不能為空"
    exit 1
fi

# 創建 .env 檔案
cat > frontend/.env <<EOF
# Supabase Configuration
REACT_APP_SUPABASE_URL=$supabase_url
REACT_APP_SUPABASE_ANON_KEY=$supabase_key
EOF

echo ""
echo "環境變數檔案已創建：frontend/.env"
echo ""
echo "接下來的步驟："
echo "1. cd frontend"
echo "2. npm install (如果尚未安裝)"
echo "3. npm start"
echo ""
echo "=========================================="
