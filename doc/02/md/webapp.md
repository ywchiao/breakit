<!---
  @file       webapp.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       10/05/2018 created.
  @date       10/05/2018 last modified.
  @version    0.1.0
  @copyright  CC-BY, © 2018 Yiwei Chiao
-->

# Web App

  這一章介紹如何建構一個 Web App (網頁應用程式) 的專案。先從專案
  的目錄結構開始。

## 專案目錄結構

  專案目錄結構是程式碼住的小窩。程式碼住的舒服，程式開發與維護才能輕鬆
  寫意。[BreakIt][breakit] 的專案結構規劃如下：

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
  │  │  ├─css             .css 檔
  │  │  ├─fonts           web 字型檔
  │  │  └─png             .png 檔
  │  ├─html            .html 檔
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

  目前因為專案剛起動，所以除了 *htdocs* 資料夾下的 `index.html` 檔案之外，其它
  資料夾下的內容大多是空的。而隨著專案進展，不同的檔案會逐步被引入，同時置於相應
  的資料夾之內。這樣規劃資料夾 (目錄) 結構的好處也就是不同用途，作用的檔案會存在
  不同的資料夾之內，使得專案發展時不會被不是當下相關的檔案干擾。

  如果不清楚怎麼在 Linux/MacOS/Windows 作業環境下建立這樣的目錄結構，可以先
  跳到最後附錄一節有簡單的操作說明。

## 問題與思考

  如果這個專案目錄結構 (或它的變形) 是可以接受的，那麼為了省下每次開一個新的專
  案都要手動建立一次同樣的目錄結構的麻煩：

  * 有沒有一個自動化的方式可以在給定了專案名稱之後就自動建立相應的專案目錄結構？
  * 進階：自己寫一個小工具來作這件事如何？ (提示：
    [shell scripts][shellScript]，
    [scripting languages][scriptingLanguage])
  * 進進階：你寫的工具，可不可以 **客製化** (customize)；讀取一個 **設定檔**
    (config file) 之後，依設定檔的內容自動建立不同的目錄結構？

  [nodejs]: https://nodejs.org
  [scriptingLanguage]: https://en.wikipedia.org/wiki/Scripting_language
  [shellScript]: https://en.wikipedia.org/wiki/Shell_script
  [breakit]: https://github.com/ywchiao/breakit.git

<!--- webapp.md -->
