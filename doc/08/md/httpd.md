<!---
  @file       httpd.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       10/03/2017 created.
  @date       11/20/2017 last modified.
  @version    0.1.0
  @copyright  CC-BY, (C) 2017 Yiwei Chiao
-->

# Httpd

  這一章將利用 [Node.js][nodejs] 建立一個簡單的 Web 服務器，以提供
  [BreakIt!][breakit] 遊戲內容到瀏覽器端。先從簡單的傳送靜態 Web 網頁開
  始。

## 專案目錄結構

  專案目錄結構是程式碼住的小窩。程式碼住的舒服，程式開發與維護才能輕鬆
  寫意。目前 [BreakIt!][breaikit] 的專案結構如下：

---

**專案目錄結構**
```
  D:\breakit         專案資料夾
  │  .gitignore        .gitignore 檔
  │  LICENSE           授權聲明
  │  README.md         專案說明檔。 Markdwon 格式。
  │
  ├─htdocs           客戶端程式資料夾
  │  ├─assets          客戶端程式資源
  │  │  └─css             .css 檔
  │  └─js              .js 檔；客戶端 Javascript/ECMAScript 程式碼
  └─httpd            伺服端程式資料夾
      │  index.js         伺服端程式入口 (main)
      │
      └─js             伺服端 Javascript/ECMAScript 程式碼
```
---

  如列表所示，整個專案大致分為兩個資料夾：

  * *htdocs*: 客戶端 (瀏覽器) 相關程式與資源。
  * *httpd*: 伺服端 (node.js) 程式。

  基本上，專案啟動時是啟動 *httpd* 資料夾內的 `index.js` 檔案 (伺服端程式進入點)；而使用者利用瀏覽器 (browser) 連上伺服後，伺服端會先將放在 *htdocs*
  資料夾裡的程式文件與資源按瀏覽器的要求依序傳送到客戶端執行或顯示。從而完成網頁
  應用程式的執行。

  之前處理了 `htdocs` 下客戶端的部份，現在開始處理**伺服端**的部份。

  [nodejs]: https://nodejs.org
  [scriptingLanguage]: https://en.wikipedia.org/wiki/Scripting_language
  [shellScript]: https://en.wikipedia.org/wiki/Shell_script
  [breakit]: https://github.com/ywchiao/breakit.git

<!--- httpd.md -->
