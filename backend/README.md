# Backend (已棄用)

## ⚠️ 重要通知

此目錄中的 Express.js 後端已經棄用，不再使用。

所有後端功能已遷移至 **Supabase**：

- ✅ 資料庫：PostgreSQL (Supabase Database)
- ✅ 認證：Supabase Auth
- ✅ API：直接使用 Supabase Client SDK
- ✅ 安全性：Row Level Security (RLS)

## 為什麼遷移？

1. **更好的安全性**：Supabase 提供企業級安全保障和 RLS
2. **更簡單的部署**：無需管理伺服器，完全 serverless
3. **更快的開發**：內建認證、即時訂閱等功能
4. **更低的成本**：免費方案已足夠大多數使用情境

## 舊的設定檔案

- `server.js` - Express.js 伺服器（不再使用）
- `.env` - MySQL 資料庫設定（不再使用）
- `schema.sql` - MySQL 資料庫架構（已遷移至 Supabase）

## 新的後端架構

請參考專案根目錄的 `README.md` 和 `supabase/` 目錄。

### 資料庫遷移

資料庫架構已遷移至：
```
supabase/migrations/20251023103603_create_subscriptions_table.sql
```

### API 呼叫

前端現在直接使用 Supabase Client：
```
frontend/src/services/supabaseService.ts
```

## 可以刪除此目錄嗎？

可以，但建議保留一段時間作為參考。如果確定不再需要，可以安全刪除整個 `backend/` 目錄。
