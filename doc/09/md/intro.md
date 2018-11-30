<!---
  @file       intro.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       11/29/2018 created.
  @date       11/29/2018 last modified.
  @version    0.1.0
  @copyright  CC-BY, © 2018 Yiwei Chiao
-->

# httpd server 和檔案服務

 之前的 `httpd/index.js` 檔案可以接受使用者連線，傳回簡單的 `Hello World!`
 訊息； 但是 [BreakIt!][breakit] 的內容是在 `htdocs/` 資料夾下的
 `index.html` 和 `htdocs/js` 資料夾下的 `index.js`，與 `htdocs/assets/css/`
 資料夾下的 `styles.css` 檔案。也就是說， httpd server 必需能在收到
 使用者要求時傳回相應的*檔案*內容，而不是簡單的文字而已。

 要作到這個目的，需要 `Node.js` 的 `fs` 模組。

[breakit]: https://github.com/ywchiao/breakit.git

<!-- intro.md -->
