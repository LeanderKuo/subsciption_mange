# AWD 響應式改版任務清單

## 專案快照
- 前端：`frontend/`（React + TS + MUI v7，主要頁面在 `src/pages`，共用元件在 `src/components`，主題在 `src/theme`）
- 後端：`backend/` 為舊版 Express，現已遷移 Supabase，可忽略
- 後端現行：`supabase/`（資料表遷移 + Edge Functions，與響應式改版無直接耦合）

## 目標
- 讓整站在手機、平板、桌機皆有穩定的版面與互動（AWD：Adaptive/Responsive Web Design）
- 行動端優先，確保操作路徑簡短、可點擊區域充足、滾動/抽屜不擋住主要內容
- 維持現有配色與品牌語氣，減少對功能流程的破壞

## 執行原則
- 先統一基礎設計系統（間距、字級、斷點、容器寬度），再調整頁面與元件
- 手機版優先驗證，再向上漸進增強
- 對話框/表單在小螢幕需全螢幕或貼齊邊緣，避免內容被截斷
- 每項調整需同時檢查深/淺色主題與多語系文字長度

## 任務拆解

### 1) 基礎與佈局框架
- [ ] 在 `frontend/src/theme/ThemeProvider.tsx`、`frontend/src/index.css` 定義/校正斷點、字級階梯、間距 token，並在 MUI `createTheme` 裡同步（e.g., `typography`, `breakpoints`, `shape`）。
- [ ] 建立共用佈局樣式（容器最大寬度、內邊距、section 間距），集中管理於主題/全域樣式以減少頁面內聯樣式。
- [ ] 補齊全域響應式工具類（如 `.stack-sm`, `.grid-sm-1`, `.grid-sm-2` 等）或 MUI `sx` 抽象，避免重複手寫 `{ xs, sm, md }`。

### 2) 導覽與框架
- [ ] `frontend/src/components/SiteHeader.tsx`：新增行動版導覽（漢堡 + Drawer/Popover），讓 `LanguageSwitcher`、`ThemeSwitcher`、帳號/登入 CTA 可收合；桌機版保持水平排列。
- [ ] `frontend/src/components/SiteFooter.tsx`：確保社群/連結在手機改為縱向排列並增加點擊區域。
- [ ] `frontend/src/pages/App.tsx`：檢查 `Container maxWidth` 與背景遮罩在小螢幕的可讀性（特別是 loading 狀態）。

### 3) 登入/註冊與 Landing（`frontend/src/pages/Landing.tsx`）
- [ ] Hero 區：手機改為單欄，CTA 與輔助文字堆疊；確保大字標題不超出螢幕並加入行高/斷行設定。
- [ ] Marquee 區：限制行動端高度與動效速度，避免橫向溢出；必要時在 xs 停用 hover 陰影。
- [ ] Features/FAQ：確保卡片在 xs 為 1 欄、sm 為 2 欄；Accordion 文字對比度與點擊區域放大。
- [ ] CTA 區：增加底部安全間距，行動端 CTA 按鈕全寬或接近全寬。

### 4) Dashboard（`frontend/src/pages/Index.tsx`）
- [ ] 標頭資訊列與篩選列：在 xs/sm 拆成多行；將篩選、排序、管理類按鈕收合為「更多」選單或分段堆疊，避免水平捲動。
- [ ] 卡片區：檢查 `Grid` 斷點（目前多為 `xs=12 sm=6 md=6 lg=4`），確保長文字截斷與行高；在極窄寬度提供緊湊模式（減少內邊距、調小字級）。
- [ ] 拖拉分類模式：在手機停用拖拉或提供長按提示，避免與滾動衝突。
- [ ] 空狀態/錯誤狀態：縮短高度，避免在手機需要多次捲動才能看到 CTA。
- [ ] 動作 CTA：考慮行動端提供浮動「新增訂閱」按鈕或底部工具列，提高可達性。

### 5) 卡片與共用元件
- [ ] `frontend/src/components/StatsCard.tsx`、`frontend/src/components/SubscriptionCard.tsx`：新增 `lineClamp` 與字級階梯；行動端縮減邊距與 icon 大小；確保 Chip/按鈕在窄寬度不換行溢出。
- [ ] `frontend/src/components/AccountMenu.tsx`、`LanguageSwitcher.tsx`、`ThemeSwitcher.tsx`：在手機模式提供較大的點擊區與清晰邊界。

### 6) 對話框/表單
- [ ] `AddSubscriptionDialog.tsx`、`EditSubscriptionDialog.tsx`：行動端改為 `fullScreen`，將表單欄位分段摺疊或分組，避免長頁；日期/週期選擇增加說明文字。
- [ ] `CategoryManagementDialog.tsx`：列表在小螢幕改為縱向堆疊，操作按鈕合併為溢出選單。
- [ ] `SubscriptionCalendarDialog.tsx`、`DataOverviewDialog.tsx`：小螢幕改為全螢幕或貼邊並縮小邊距，調整日曆網格/圖表高度以適配 320–414px。
- [ ] `frontend/src/pages/UserSettings.tsx`：表單欄位分段標題保持吸頂，行動端調整間距與按鈕全寬；刪除帳號對話框全螢幕貼邊。

### 7) 資料視覺化（`frontend/src/components/tabs/*`）
- [ ] 確認 `ResponsiveContainer` 在極窄寬度的最小高度與字體大小；在 xs 隱藏多餘座標/圖例或改為精簡模式。
- [ ] Tooltip 與 Legend：行動端改為更大的可點擊區與簡化數字格式，避免遮擋主要圖形。

### 8) 無障礙與互動
- [ ] 為主要操作按鈕/抽屜增加 `focus` 樣式；確保鍵盤能操作導覽、對話框與表單。
- [ ] 為動畫/跑馬燈提供 `prefers-reduced-motion` 偵測，行動端預設減速。
- [ ] 檢查表單錯誤訊息在窄寬度不會被截斷。

### 9) 測試與驗收
- [ ] 建立最小回歸腳本（可用 Cypress/Playwright 或手動清單）覆蓋：Landing、登入、Dashboard 篩選 + 新增/編輯訂閱、日曆/總覽對話框、設定頁、暗黑模式。
- [ ] 針對 3 個視窗寬度驗證：≤414px、768px、1440px；並覆蓋中文/英文長字串。
- [ ] 確認 Vercel Lighthouse 行動端分數（Performance/Accessibility/Best Practices/SEO）達標（目標 85+）。

## 交付與里程碑建議
- M1：完成設計系統與導覽（章節 1–2）
- M2：Landing 與 Dashboard 核心版面（章節 3–4）
- M3：對話框/表單/卡片調整（章節 5–6）
- M4：圖表優化與無障礙檢查（章節 7–8）
- M5：回歸測試與 Lighthouse 驗收（章節 9）
