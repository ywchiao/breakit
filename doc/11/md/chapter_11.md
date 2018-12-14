<!---
  @file       chapter_11.md
  @date       12/14/2018 created.
  @copyright  CC-BY, (C) 2017 Yiwei Chiao
  @detail
    This file is machine-generated. DONOT MODIFY IT DIRECTLY.
-->
# 路由表 `routing table`

 目前 `index.js` 利用 `routingTable` 結構來依據使用者要求，傳回不同
 的檔案內容到瀏覽器端。路由表 (`routingTable`) 內容類似下面的型態：

```javascript
const routingTable = {
  '/': {
    url: '../htdocs/index.html',
    mime: 'text/html'
  },

  '/styles.css': {
    url: '../htdocs/assets/css/styles.css',
    mime: 'text/css'
  },

  '/breakit.js': {
    url: '../htdocs/js/index.js',
    mime: 'application/javascript'
  },
};
```

 而相應的 `HTML` 內容片段如下：

```html
    <link rel="stylesheet" href="styles.css">
    <script src="breakit.js"></script>
```

 可以看到在 `index.html` 檔案內其實無法直接看出在伺服端的檔案對應，
 和資料夾安排方式。這樣的好處是，如果為了系統擴充式其它原因需要更改
 伺服端的檔案結構或資料提供方式，系統需要的只是去修改這個 `routingTable`
 的內容就行了，其它的部份都不需要動。

 但這還有一個缺點，目前這個 `routingTable` 結構是 `index.js` 的一部
 份；也就是屬於程式碼的一部份。可是它其實只是**資料** (*data*)。接
 下來，就是準備將 `routingTable` 抽離 `index.js`，讓它回復**資料**
 本色，安靜的待在資料檔案裡。

<!-- intro.md -->

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

<!-- config.md -->

# 專案製作

 目前為止，我們已經完成了一個簡單的 Web Server 架構，知道如何建立
 Web 服務的路由表，如何寫作 [JSON][] 檔案，利用 [JSON][] 檔案儲存
 資料；在客戶端，學到了如何操作 [DOM][mdnDOM] 模型，如何用
 [canvas][mdnCanvas] 作畫，製作動畫，如何利用事件取得使用者輸入，
 追蹤滑鼠，等等。回首遙望，在 Web 的學習上，我們已經走了很長的一段路。

 只是 Web 的世界如海廣闊，開發者們還在不斷的探索新的可能，提出新的
 技術，前面等待著的，是更多，更長的旅程。

 「千里之行，始於足下。」無論如何，那條旅程都要自己去走，剩下的就是
 大家自己努力了。

 * 請自己找好同伴同行：1 或 2 人一組。
 * 請自行挑選一個題目：
    + 黑白棋 (Reversi)
    + 踩地雷 (MineSweeper)
    + 貪食蛇 (Snake)
    + 俄羅斯方塊 (Tetris)
    + 其它 (需事前提出討論，同意後進行)
 * 學期第 17 週完成。

<!-- config.md -->

[ECMAScript]: https://www.ecma-international.org/publications/standards/Ecma-262.htm
[breakit]: https://github.com/ywchiao/breakit.git
[breakout]: https://en.wikipedia.org/wiki/Breakout_(video_game)
[nodejs]: https://nodejs.org
[atom]: https://atom.io
[babeljs]: https://babeljs.io
[browserify]: http://browserify.org
[git]: https://git-scm.com
[github]: https://github.com
[ide]: https://en.wikipedia.org/wiki/Integrated_development_environment
[rollupjs]: https://rollupjs.org
[terser]: https://github.com/terser-js/terser
[torvalds]: https://en.wikipedia.org/wiki/Linus_Torvalds
[typescript]: https://www.typescriptlang.org
[vcs]: https://en.wikipedia.org/wiki/Version_control
[vscode]: https://github.com/Microsoft/vscode
[webpack]: https://webpack.github.io
[brew]: https://github.com/Homebrew/brew
[cli]: https://en.wikipedia.org/wiki/Command-line_interface
[cmder]: https://github.com/cmderdev/cmder
[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[npm]: https://www.npmjs.com
[nvm]: https://github.com/creationix/nvm
[vim]: https://vim.sourceforge.io
[xcode]: https://developer.apple.com/xcode
[commonmark]: http://commonmark.org
[gfm]: https://github.github.com/gfm
[gitignore]: https://git-scm.com/docs/gitignore
[markdown]: https://en.wikipedia.org/wiki/Markdown
[MIT]: https://opensource.org/licenses/MIT
[scriptingLanguage]: https://en.wikipedia.org/wiki/Scripting_language
[shellScript]: https://en.wikipedia.org/wiki/Shell_script
[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[mdnHTML]: https://developer.mozilla.org/en-US/docs/Web/HTML
[mdnJavaScript]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[wikiCSS]: https://en.wikipedia.org/wiki/Cascading_Style_Sheets
[wikiECMAScript]: https://en.wikipedia.org/wiki/ECMAScript
[wikiHTML]: https://en.wikipedia.org/wiki/HTML
[githubHead]: https://github.com/joshbuchea/HEAD
[mdnHTML5]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[wikiMarkdown]: https://en.wikipedia.org/wiki/Markdown
[wikiMarkupLang]: https://en.wikipedia.org/wiki/Markup_language
[wikiMetadata]: https://en.wikipedia.org/wiki/Metadata
[wikiProgLang]: https://en.wikipedia.org/wiki/Programming_language
[wikiText]: https://en.wikipedia.org/wiki/Text_(literary_theory)
[wikiXML]: https://en.wikipedia.org/wiki/XML
[wikiYAML]: https://en.wikipedia.org/wiki/YAML
[chrome]: https://www.google.com.tw/chrome
[firefox]: https://www.mozilla.org/zh-TW/firefox/
[jade]: http://jade-lang.com/
[jinja]: http://jinja.pocoo.org/
[mdnDOM]: https://developer.mozilla.org/zh-TW/docs/Web/API/Document_Object_Model
[mdnSVG]: https://developer.mozilla.org/kab/docs/Web/SVG
[mdnXML]: https://developer.mozilla.org/en-US/docs/XML_introduction
[PHP]: https://secure.php.net/
[Python]: https://www.python.org/
[Ruby]: https://www.ruby-lang.org/zh_tw/
[twig]: https://twig.symfony.com/
[wikiERuby]: https://en.wikipedia.org/wiki/ERuby
[wikiJSP]: https://en.wikipedia.org/wiki/JavaServer_Pages
[wikiTemplatEngine]: https://en.wikipedia.org/wiki/Template_processor
[mdnCanvas2D]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
[mdnWebGL]: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
[amd]: http://requirejs.org/docs/whyamd.html
[arrowfunction]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[clientrequest]: https://nodejs.org/api/http.html#http_class_http_clientrequest
[closure]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures
[commonjs]: http://www.commonjs.org
[console]: https://nodejs.org/api/console.html#console_class_console
[createserver]: https://nodejs.org/api/http.html#http_http_createserver_requestlistener
[http]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[httpmod]: https://nodejs.org/api/http.html#http_http
[httpserver]: https://nodejs.org/api/http.html#http_class_http_server
[iife]: https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
[JavaScript]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[let]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/let
[mdn]: https://developer.mozilla.org/zh-TW
[mime]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
[require]: https://nodejs.org/api/modules.html#modules_require
[responseend]: https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
[responsewrite]: https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback
[responsewritehead]: https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
[serverlisten]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
[serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse
[strict]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
[var]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/var
[API]: https://en.wikipedia.org/wiki/Application_programming_interface
[fs]: https://nodejs.org/api/fs.html#fs_file_system
[readfile]: https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
[readfilesync]: https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
[http_inmsg]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[MIME_type]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
[JSON]: https://www.json.org/
[breakit.js]: https://github.com/ywchiao/breakit.js
[mdnCanvas]: https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial
[^ECMAScript]: https://en.wikipedia.org/wiki/ECMAScript
[^breakit]: https://github.com/ywchiao/breakit
[^breakout]: https://en.wikipedia.org/wiki/Breakout_(video_game)
[^nodejs]: https://nodejs.org
[^atom]: https://atom.io
[^babeljs]: https://babeljs.io
[^browserify]: http://browserify.org
[^git]: https://git-scm.com
[^github]: https://github.com
[^ide]: https://en.wikipedia.org/wiki/Integrated_development_environment
[^rollupjs]: https://rollupjs.org
[^terser]: https://github.com/terser-js/terser
[^torvalds]: https://en.wikipedia.org/wiki/Linus_Torvalds
[^typescript]: https://www.typescriptlang.org
[^vcs]: https://en.wikipedia.org/wiki/Version_control
[^vscode]: https://github.com/Microsoft/vscode
[^webpack]: https://webpack.github.io
[^brew]: https://github.com/Homebrew/brew
[^cli]: https://en.wikipedia.org/wiki/Command-line_interface
[^cmder]: https://github.com/cmderdev/cmder
[^gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[^npm]: https://www.npmjs.com
[^nvm]: https://github.com/creationix/nvm
[^vim]: https://vim.sourceforge.io
[^xcode]: https://developer.apple.com/xcode
[^commonmark]: http://commonmark.org
[^gfm]: https://github.github.com/gfm
[^gitignore]: https://git-scm.com/docs/gitignore
[^markdown]: https://en.wikipedia.org/wiki/Markdown
[^MIT]: https://opensource.org/licenses/MIT

<!--- chapter_11.md -->