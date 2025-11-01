# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## ForkTsChecker 記憶體調整

為避免建置時 TypeScript 型別檢查程式耗盡記憶體，專案預設整合了高記憶體模式：

1. `npm run build` 會呼叫 `scripts/build-with-memory.js`，自動設定  
   `FORK_TS_CHECKER_MEMORY_LIMIT=12288` 與 `NODE_OPTIONS=--max-old-space-size=4096`。
2. 若需要微調，修改 `.env` 裡的 `FORK_TS_CHECKER_MEMORY_LIMIT`（單位 MB）或 `NODE_OPTIONS` 後再執行 `npm run build`。
3. 若仍出現警示，可暫時在命令列覆寫：  
   `FORK_TS_CHECKER_MEMORY_LIMIT=12288 NODE_OPTIONS=--max-old-space-size=4096 npm run build`
4. 長期建議：升級 `fork-ts-checker-webpack-plugin`、精簡型別檢查範圍，或考慮遷移至 Vite 等更輕量的建置流程，以根本改善記憶體需求。
