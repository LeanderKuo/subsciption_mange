# 快速開始

> 想立即開始使用？只需 3 個步驟！

---

## 3 步驟快速啟動

### 步驟 1: 設定環境變數

運行自動化設定腳本：

```bash
./scripts/setup-env.sh
```

或手動設定：

```bash
cd frontend
cp .env.example .env
# 編輯 .env，填入你的 Supabase 憑證
```

> 從哪裡取得 Supabase 憑證？
> - 前往 https://app.supabase.com
> - 選擇你的專案 > Settings > API
> - 複製 `Project URL` 和 `anon public` key

---

### 步驟 2: 安裝依賴

```bash
cd frontend
npm install
```

---

### 步驟 3: 啟動開發伺服器

```bash
npm start
```

完成！應用程式將在 `http://localhost:3000` 啟動

---

## 需要完整設定？

如果你需要：
- 設定 Google 第三方登入
- 部署到 Vercel
- 資料庫遷移
- 詳細的錯誤排除

請參考 [完整設定指南](./SETUP_GUIDE.md)

---

## 驗證安裝

啟動後，確認以下功能：

- [ ] Landing Page 正常顯示
- [ ] 可以開啟登入對話框
- [ ] Email 註冊/登入正常運作
- [ ] （選配）Google 登入按鈕顯示

---

## 常見錯誤

### "Missing Supabase environment variables"

```bash
cd frontend
cp .env.example .env
# 編輯 .env 並填入正確的憑證
```

### "Cannot find module" 錯誤

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 已被佔用

```bash
# 使用其他 port
PORT=3001 npm start
```

---

## 更多資源

- [完整設定指南](./SETUP_GUIDE.md) - 詳細的逐步設定
- [README](../README.md) - 專案說明與架構
- [改進建議](./IMPROVEMENTS.md) - 已知問題與待改進項目

---

需要協助？查看 [SETUP_GUIDE.md](./SETUP_GUIDE.md) 的常見問題排除章節。
