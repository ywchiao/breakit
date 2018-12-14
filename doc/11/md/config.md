<!---
  @file       config.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       12/14/2018 created.
  @date       12/14/2018 last modified.
  @version    0.1.0
  @since      0.1.0
  @copyright  CC-BY, © 2018 Yiwei Chiao
-->

# 配置檔 (`configuration file`)

 上面的問題就是所謂**配置檔** (configuration file) 的動機。

 `Configuration file` 的概念出現之後，這個檔案有各式各樣的檔案格式 (file
 format) 曾經/目前被使用過。除了少數特殊考量之外，所有的格式都是人類可閱讀的
 簡單文字檔 (text file)，目的是為了讓使用者能在不需要大量技術支援的情況下，快速
 理解並調整系統配置。

 這裡 [BreakIt][breakit.js] 專案將採用 [JSON][] 格式作為它的系統配
 置檔。一個原因是是 [JSON][] 格式簡單易學；另一個原因則是 [JSON][]
 目前己經是 Web 領域，客戶端 (browser) 和伺服端 (http server) 交換
 資料的主要格式。好 [JSON][]，不學嗎？

## [JSON][] 格式

 [JSON][] 其實是 `JavaScript Object Notation` 的字首縮寫。如它名字
 所表示的 [JSON][] 檔案的內容就是一個合法的 [JavaScript][mdnJavaScript]
 物件表示式 (object literal)。或者，由這裡也可以看出為什麼 [JSON][]
 格式會在 Web 領域裡受到廣泛的歡迎。

 直接看 `index.js` 裡的 `routingTable` (對了，`index.js` 的
 `routingTable` 寫法就是 [JavaScript][mdnJavaScript] 的 `Object
 literal`) 寫成 [JSON][] 格式的模樣：

```json
 1. {
 2.   "/": {
 3.     "url": "../htdocs/index.html",
 4.     "type": "text/html"
 5.   },
 6.   "/styles.css": {
 7.     "url": "../htdocs/assets/css/styles.css",
 8.     "type": "text/css"
 9.   },
10.   "/breakit.js": {
11.     "url": "../htdocs/js/index.js",
12.     "type": "application/javascript"
13.   }
14. }
```

 可以和原來 `index.js` 裡的 `routingTable` 對照看。原則上 [JSON][] 和
 [JavaScript][mdnJavaScript] 的 `object literals` 完全相同，都採用：

```javascript
{
  key: value
}
```

 的格式。但 [JSON][] 的定義更嚴謹，而有幾個明顯/要注意的不同點：

  * `key`: [JavaScript][mdnJavaScript] 的 `key` 是簡單字串的話，可以
   不用加字串引號 (single/double quote) `"'"` 或 `'"'`；而如果要加
   **引號** (quotation mark)，只要前後一致，單，雙引號都可以。[JSON][] 的
   `key` 則**一定**要用**雙引號** (double quotes)
  * 多組 `key: value` 間的分隔逗點 ",": [JSON][] 和
   [JavaScript][mdnJavaScript] 的 `object literals` 都採用**逗點**
   "," 來分隔不同的 `key: value`；要注意的是**最後一組** `key: value`。
   [JavaScript][mdnJavaScript] 會**容忍**最後一組的 `key: value,` 後面的那個**逗號**；但 [JSON][] **不會**。[JSON][] 認為那是錯誤。
  * `{}`: `{}` 用來標示物件的開始和結束，在 [JavaScript][mdnJavaScript]
   裡，很自然的 `{` 前面可能有 `=`， `(` 之類的符號，而 `}` 後面可能也有 `)`
   或 `;` 跟著；但 [JSON][] 裡，這些都是**不允許**的。因為沒必要。
  * 註解 (comments)：[JSON][] 格式**不允許**註解，**不允許**註解，
   **不允許**註解。很重要，所以說三次。這是 [JSON][] 格式最具爭議的一個設計決
   定。但 [JSON][] 設計者堅持 [JSON][] 格式簡單到不需要註解；更不需要註解來污
   染這格式的簡單純粹。真需要註解，有其它格式可選，結案。

 除去這些更嚴謹的設定不同，[JSON][] 格式的文件就是  [JavaScript][mdnJavaScript] 的 object literal；換句話說，就是個合法的
 [JavaScript][mdnJavaScript] 程式檔案，只是副檔名 (延伸檔名) 使用 '.json'
 或 '.js' 的不同而已。因此，格式在 2007 (或之前) 提出後很快的就被 Web 開發社群接受。

## `config.json`

 理解 [JSON][] 格式的意義，就可以將 `routingTable` 的定義移到
 `config.json` 檔案內。利用文字編輯器 (text editor) 建立 `config.json` 檔案，內容如前一小節所示，就是原來 `index.js` 內 `routingTable` 的內容。

 將 `config.json` 和 `index.js` 放在同一個資料夾。然後修改 `index.js`，
 將原來 `routintTable` 的內容移除，更改成：

```javascript
  const routingTable = require('./config.json');
```

 是的，就這樣。因為如同前面對 [JSON][] 格式的介紹，[JSON][] 檔案本身就是個
 合法的 [JavaScript][mdnJavaScript] 檔案，它的內容其實可以視作是一個
 **匿名** (anonymous) 的物件宣告。所以可以直接當作 [Node.js][nodejs] 的
 模組載入使用。

[JSON]: https://www.json.org/
[breakit.js]: https://github.com/ywchiao/breakit.js
[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[mdnHTML5]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[mdnJavaScript]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[nodejs]: https://nodejs.org
[http_inmsg]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[scriptingLanguage]: https://en.wikipedia.org/wiki/Scripting_language
[shellScript]: https://en.wikipedia.org/wiki/Shell_script

<!-- config.md -->
