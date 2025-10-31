# 專案改進建議

根據專案檢查結果，以下列出目前的改進事項。

## 高優先（需立即處理）

### 1. 缺少前端環境變數檔案

**問題描述**
- 缺少 `frontend/.env` 檔案
- 本地開發時會出現錯誤

**建議作法**
```bash
cd frontend
cp .env.example .env
# 編輯 .env 並填入你的 Supabase 憑證
```

**狀態**: 已提供 `.env.example` 作為模板

---

### 2. 後端設定過時

**問題描述**
- `backend/.env` 仍設定為 MySQL 資料庫
- 專案後端已遷移至 Supabase

**建議作法**
- 建議刪除或標示 `backend/` 目錄為棄用
- 保留說明文件提醒開發者

**狀態**: 已在 `backend/README.md` 標示為棄用

---

### 3. 未設定 `.gitignore`

**問題描述**
- 可能會誤將 `.env` 檔案提交至 Git

**建議作法**
- 維護 `.gitignore`，確保 `.env` 與敏感資料不被提交

**狀態**: 已新增 `.gitignore`

---

## 中優先（建議短期內改善）

### 4. 缺少具吸引力的 Landing Page

**問題描述**
- 未登入用戶目前看到的是登入頁面
- 尚未展示產品價值

**建議作法**
- 使用 `frontend/src/pages/Landing.tsx`
- 更新 `App.tsx` 在未登入狀態下導向 Landing Page
- 建議包含：Hero、功能介紹、優勢、FAQ、CTA、Footer

**狀態**: 已完成

---

### 5. 登出流程不夠優雅

**問題描述**
- `frontend/src/pages/Index.tsx` 使用 `window.location.reload()` 登出

**建議作法**
```typescript
const handleLogout = async () => {
  await signOut();
  // 透過路由或狀態管理進行導向
};
```

**狀態**: 待改進

---

### 6. 缺少錯誤邊界

**問題描述**
- React 應用沒有錯誤邊界
- 若組件出錯會導致整個畫面空白

**建議作法**
- 建立 `frontend/src/components/ErrorBoundary.tsx`
- 在 `App.tsx` 中包覆主要內容

**狀態**: 待實作

---

### 7. 缺少 Loading 狀態

**問題描述**
- 初始化期間沒有明確的載入狀態

**建議作法**
- 在 `App.tsx` 中加入 `isLoading` 狀態並顯示載入指示

**狀態**: 待實作

---

## 次要（可視情況排程）

### 8. TypeScript `any` 類型

**問題描述**
- `App.tsx` 中使用 `any`：`const [user, setUser] = useState<any>(null);`

**建議作法**
```typescript
import { User } from '@supabase/supabase-js';
const [user, setUser] = useState<User | null>(null);
```

**狀態**: 待改進

---

### 9. 缺少 SEO 優化

**建議新增**
- Meta tags（title、description）
- Open Graph tags
- Favicon
- `sitemap.xml`
- `robots.txt`（已存在於 `public/`）

**狀態**: 待實作

---

### 10. 性能優化

**建議作法**
- 使用 `React.lazy()` 進行代碼分割
- 優化圖片載入（建議使用 WebP）
- 如訂閱項目眾多，可考慮虛擬滾動

**狀態**: 待實作

---

## 文檔改進

**已完成**
- 建立 `README.md` 作為專案總覽
- 建立 `frontend/.env.example` 範本
- 建立 `backend/README.md` 標示為棄用
- 本文檔記錄改進事項

---

## 未來功能建議

根據 `spec.md`，以下為規劃中的功能：

- 推播通知與 Email 提醒
- 多用戶協作
- 訂閱費用預測
- 匯出功能（CSV/PDF）
- 更多統計圖表
- 暗色主題

---

## 優先順序建議

1. **立即處理（已完成）**
   - `.env.example`
   - `.gitignore`
   - Landing Page

2. **短期內完成**
   - 登出流程優化
   - 加入錯誤邊界
   - 修正 `any` 類型

3. **下個版本**
   - SEO 優化
   - 性能優化
   - 新功能開發

---

最後更新：2025-10-31
