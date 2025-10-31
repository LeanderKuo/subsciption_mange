# 專案改進建議

根據專案檢查結果，以下是發現的問題和改進建議。

## 🔴 嚴重問題（需立即處理）

### 1. 缺少前端環境變數檔案

**問題描述**:
- 缺少 `frontend/.env` 檔案
- 本地開發時會出現錯誤

**解決方案**:
```bash
cd frontend
cp .env.example .env
# 編輯 .env 並填入你的 Supabase 憑證
```

**狀態**: ✅ 已創建 `.env.example` 模板

---

### 2. 後端設定過時

**問題描述**:
- `backend/.env` 仍設定為 MySQL 資料庫
- 但專案已遷移至 Supabase

**解決方案**:
- 已創建 `backend/README.md` 說明此目錄已棄用
- 可考慮刪除整個 `backend/` 目錄

**狀態**: ✅ 已標記為棄用

---

### 3. 未設定 .gitignore

**問題描述**:
- 可能會不小心將 `.env` 檔案提交到 Git

**解決方案**:
- 已創建 `.gitignore` 檔案
- 確保 `.env` 和敏感資料不會被提交

**狀態**: ✅ 已完成

---

## ⚠️ 中等問題（建議改進）

### 4. 缺少吸引人的 Landing Page

**問題描述**:
- 未登入用戶看到的是簡陋的登入畫面
- 沒有產品介紹和功能說明

**解決方案**:
- ✅ 已創建 `frontend/src/pages/Landing.tsx`
- ✅ 已更新 `App.tsx` 使用新的 Landing Page
- 包含以下區塊：
  - Hero Section (主視覺)
  - Features (功能介紹)
  - Benefits (優勢說明)
  - FAQ (常見問題)
  - CTA (行動呼籲)
  - Footer (頁腳)

**狀態**: ✅ 已完成

---

### 5. 登出流程不夠優雅

**問題描述**:
- `frontend/src/pages/Index.tsx` 中使用 `window.location.reload()` 登出

**目前代碼** (Index.tsx:31-34):
```typescript
const handleLogout = () => {
  // 重新載入頁面來觸發 App 組件的認證檢查
  window.location.reload();
};
```

**建議改進**:
```typescript
const handleLogout = async () => {
  await signOut();
  // 使用 Router navigate 或狀態管理
};
```

**狀態**: ⏳ 待改進

---

### 6. 缺少錯誤邊界 (Error Boundary)

**問題描述**:
- React 應用沒有錯誤邊界
- 若組件出錯會導致整個應用白屏

**建議解決方案**:
創建 `frontend/src/components/ErrorBoundary.tsx`:
```typescript
class ErrorBoundary extends React.Component<Props, State> {
  // ... 錯誤捕獲邏輯
}
```

然後在 `App.tsx` 中包裹所有組件。

**狀態**: ⏳ 待實作

---

### 7. 缺少 Loading 狀態

**問題描述**:
- 應用初始化時沒有 Loading 畫面
- 用戶可能看到短暫的閃爍

**建議改進**:
在 `App.tsx` 中加入 `isLoading` 狀態：
```typescript
const [isLoading, setIsLoading] = useState(true);

if (isLoading) {
  return <CircularProgress />;
}
```

**狀態**: ⏳ 待實作

---

## ℹ️ 次要問題（可選改進）

### 8. TypeScript any 類型

**問題描述**:
- `App.tsx` 中使用 `any` 類型：`const [user, setUser] = useState<any>(null);`

**建議改進**:
```typescript
import { User } from '@supabase/supabase-js';
const [user, setUser] = useState<User | null>(null);
```

**狀態**: ⏳ 待改進

---

### 9. 缺少 SEO 優化

**建議新增**:
- Meta tags (title, description)
- Open Graph tags
- Favicon
- sitemap.xml
- robots.txt (已存在於 `public/`)

**狀態**: ⏳ 待實作

---

### 10. 性能優化

**建議**:
- 使用 React.lazy() 進行代碼分割
- 優化圖片載入（使用 WebP）
- 實作虛擬滾動（如果訂閱項目很多）

**狀態**: ⏳ 待實作

---

## 📝 文檔改進

**已完成**:
- ✅ 創建 `README.md` (專案說明)
- ✅ 創建 `frontend/.env.example` (環境變數模板)
- ✅ 創建 `backend/README.md` (標記為棄用)
- ✅ 創建此文檔 (`IMPROVEMENTS.md`)

---

## 🚀 未來功能建議

根據 `spec.md`，以下功能仍在規劃中：

- [ ] 推播通知與 Email 提醒
- [ ] 多用戶協作功能
- [ ] 訂閱費用預測
- [ ] 匯出功能 (CSV/PDF)
- [ ] 更多統計圖表
- [ ] 暗黑模式

---

## 優先級建議

1. **立即處理** (已完成):
   - ✅ 創建 `.env.example`
   - ✅ 創建 `.gitignore`
   - ✅ 創建 Landing Page

2. **本週完成**:
   - ⏳ 改進登出流程
   - ⏳ 加入錯誤邊界
   - ⏳ 修正 TypeScript any 類型

3. **下個版本**:
   - ⏳ SEO 優化
   - ⏳ 性能優化
   - ⏳ 新功能開發

---

最後更新：2025-10-31
