<!---
  @file       javascript.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       10/12/2018 created.
  @date       10/12/2018 last modified.
  @version    0.1.0
  @since      0.1.0
  @copyright  CC-BY, © 2018 Yiwei Chiao
-->

## `index.js` 說明

### [JavaScript][mdnJavaScript] 程式起點

 程式開始執行需要一個起點；`C/C++/C#/Java` 系列語言都有一個
 `main()` 函數或 `Main()` 方法當作程式的進入點，開始執行的地方。

 但是像 [JavaScript][mdnJavaScript] 這樣的**劇本式語言**
 (*scripting languages*，其它如 [Python][], [Ruby][] 等) 就不仰賴，
 也無法仰賴在特定的方法/函數上；它們是簡單的遵循程式碼的安排，
 由**第一行** 開始，**循序執行**。

### [JavaScript][mdnJavaScript] `strict` 模式

 `index.js` 的第一行，宣告了一個字串：

```javascript
 1. 'use strict';
```

  在 [JavaScript][mdnJavaScript] 裡 \' (單) 和 \" (雙) 引號都可以用
  來指定**字串** (*string*)。當然，這些標明字串的引號**必需**是成對
  出現的。

  `'use strict';` 後面的分號 `;` 標明一行的結束；[JavaScript][mdnJavaScript]
  其實並**不**要求這個分號 `;`；因為絕大部份時間，[JavaScript][mdnJavaScript]
  執行引擎會自行推斷出每一行指令的結束。不過為了和寫 `C/C++/C#/Java`
  系列程式的習慣相容，我們還是會放上分號 `;`。

#### strict mode

  `'use strict';` 其實也不是一個 [JavaScript][mdnJavaScript] 的指令/陳述。
  它其實是一個和 [JavaScript][mdnJavaScript] **執行環境** 溝通用的
  **標記字串**。

  如同之前提過的，[JavaScript][mdnJavaScript] 這些年迎來了重大的標準
  化進展；和任何重大變動一樣，這無可避免的造成語言新舊版本的相容問題。
  為了降低衝擊，[JavaScript][mdnJavaScript] 引入了所謂的 **strict**
  模式；使用新版 [JavaScript][mdnJavaScript] 語言標準的程式自動遵循
  **strict** 模式；而其它使用舊版標準；或混合式 (某些部份使用新版，
  有些用舊版) 的程式則可以利用 `'use strict'` 這個字串來通知
  [JavaScript][mdnJavaScript] 後續程式碼使用新版語言規範。

### window

```JavaScript
 3. window.addEventListener('load', () => {
 ...
12. });
```

  `window` 是 DOM 模型裡代表瀏覽器視窗的介面物件；整個 JavaScript
  程式就是在這個物件代表的環境下執行。

  這裡，利用 `window` 提供的 `addEventListener` 介面函數，在 `window`
  註冊了一個 `load` 事件的**事件處理函式** (event listener/handler)。

#### `load` 事件

  由之前對 [HTML][mdnHTML] 的介紹可以注意到，當瀏覽器開啟一個網頁時，
  它必需要下載相關的 *.html (頁面文件結構), *.css (頁面風格設計)，
  *.js (可能的互動控制) 和其它資源 (字型，圖片 ...) 等。

  `load` 事件就是設計來通知 `window` 物件，它使用的資源 (`window`
  將要呈現的 HTML 內容，和相關資源) **已經**下載完成。

  所以，在 `window` 物件上註冊 `load` 事件的處理程序就是在瀏覽器下
  載完相關資訊後，開始**接手**內容的處理。

#### `() => {...}`

  `() => {...}` 是一個**匿名**函式宣告；也就是我們用來處理 `load`
  事件的事件處理程序。

  傳統的 [JavaScript][mdnJavaScript] 寫法也可以寫成

```JavaScript
  function () {...}
```

  不過利用新版 [JavaScript][mdnJavaScript] 的**箭頭函數** (*arrow function*)
  寫法，感覺更簡潔。

  第 4 到 11 行就是這個函數的內容。

### `console`

```JavaScript
 4.   console.log("index.js loaded");
```

  第 4 行的 `console` 是 JavaScript 執行環境提供的命令列介面物件；
  最簡單直接的用途就是利用它在命令列介面輸出一些除錯用的信息；如第
  4 行作的。

  `console` 的 `log` 方法可以在命令列介面輸出一個訊息；第 4行這裡
  輸出一個簡單的訊息字串： `index.js loaded` 指出在第 3 行註冊的
  `load` 事件處理函式不但註冊成功，而且已被呼叫。

  而這個輸出結果會在瀏覽器開發者工具的 `console` 頁面出現；
  但**不會**在使用者看到的 window 裡出現。

### 動態型別與 let 變數宣告

  和 `C/C++/C#/Java` 等**靜態型別** (*static typed*) 語言，所有變數
  宣告都需要**指定**變數**型別** (type) 不同；
  [JavaScript][mdnJavaScript] 是**動態型別** (*dynamic typed*) 語言
  (參照 [Python][]，[Ruby][] 等) 語言，變數型別會由程式在執行
  時**自動**辨別，指定和使用。

  因此，在 [JavaScript][mdnJavaScript]，傳統上，變數是**不**需要
  宣告的。

  但是變數除了型別 (type) 外，還有一個**有效範圍 (作用域)** (*scope*)
  的問題存在；也就是特定變數在程式的那些區段內可以讀取，使用；
  又在什麼時後生成，什麼時後摧毀。

  傳統 [JavaScript][mdnJavaScript] 在這塊的處理，以最簡單的說法來說，
  是令人困惑的。

  標準化的 [JavaScript][mdnJavaScript] 引入了 `let` 變數宣告來處理
  這個問題。

#### `let`

```Javascript
 6.   let h1 = document.createElement('h1');
 7.   let msg = document.createTextNode('這是 <h1> 的文字訊息');
```

 `let varName` 宣告 `varName` 是一個變數，而 varName 的**作用域**
 就是 `let varName` 所屬的程式區塊 (`{}`) 在 `let varName` 這一行
 以下及延伸的範圍。何謂**延伸的範圍**，我們在之後遇到時再討論。以
 目前而言就是

 . 變數 `h1` 在第 6行宣告，它的作用域是第 6行到第 11行。

 . 變數 `msg` 在第 7行宣告，它的作用域是第 7行到第 11行。

### `document`

 `document` 是 **DOM** 模型裡代表 **HTML** 文件的物件；也是 DOM
 數的根節點。在 Web API (應用程式介面) 的設計裡，可以利用
 `document` 的 `createElement(...)` 方法，動態產生想要的 DOM 節點
 (HTML tag 元素) 或文字節點 (TextNode) 來安放文字內容。

```Javascript
 6.   let h1 = document.createElement('h1');
```

 產生一個 `<h1>` 的 HTML 節點，由變數 `h1` 記錄。

```Javascript
 7.   let msg = document.createTextNode('這是 <h1> 的文字訊息');
```

 產生一個內容是 `這是 <h1> 的文字訊息` 的文字節點 (TextNode)，
 由變數 `msg` 記錄。


#### 方法 `appendChild(...)`

 DOM 節點產生了，也保留在變數裡了，可是它們都還獨立放 DOM 樹之外；
 還沒有和 `document` 產生連結；所以下一步就是要將這些新產生的節點
 安插到 DOM 樹內。

 由之前對 `HTML` 與 `DOM` 的介紹，可以知道，這樣的 `HTML` 程式碼：

```HTML
 <h1>這是 <h1> 的文字訊息</h1>
```

對應的是這樣的結構：

```
  + h1
    |
    + TextNode
      |
      這是 <h1> 的文字訊息
```

 所以變數 `msg` 代表的 `TextNode` 應該是變數 `h1` 代表的 `<h1>`
 節點的**子節點** (*child node*)

 DOM 提供了 `ParentNode.appendChild(childNode)` 這個介面方法，
 讓我們可以將子節點添加到**親節點** (*ParentNode*) 之下。所以，
 我們有：

```Javascript
 9.   h1.appendChild(msg);
10.
11.   document.body.appendChild(h1);
```

  先將 `msg` 加入 `h1` (第 9行)，構成

```
  + h1
    |
    + TextNode
      |
      這是 <h1> 的文字訊息
```

  再將 `h1` 加入 `document.body` 構成：

```
window.document
  |
  + body
      |
      + h1
        |
        + TextNode
           |
           這是 <h1> 的文字訊息
```

## 思考與練習

 * 對 [DOM][mdnDOM] 的操作有基本概念了，範例程式介紹的是 `<h1>`；試試再加上
 幾個，如 `<h2>` 或 `<h6>` 的訊息。
  * 作上面的練習時，觀察一下瀏覽器除錯視窗 `Element` 窗口的訊息變化。
  * 查一下網路資訊，找找如何由 [DOM][mdnDOM] tree 裡：
    + 移除一個節點
    + 將某個節點由當位置搬到新位置。

[chrome]: https://www.google.com.tw/chrome
[firefox]: https://www.mozilla.org/zh-TW/firefox/
[jade]: http://jade-lang.com/
[jinja]: http://jinja.pocoo.org/
[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[mdnDOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[mdnHTML5]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[mdnJavaScript]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[mdnSVG]: https://developer.mozilla.org/zh-TW/docs/Web/SVG
[mdnXML]: https://developer.mozilla.org/en-US/docs/XML_introduction
[nodejs]: https://nodejs.org
[PHP]: https://secure.php.net/
[Python]: https://www.python.org/
[Ruby]: https://www.ruby-lang.org/zh_tw/
[breakit]: https://github.com/ywchiao/breakit.git
[twig]: https://twig.symfony.com/
[wikiERuby]: https://en.wikipedia.org/wiki/ERuby
[wikiJSP]: https://en.wikipedia.org/wiki/JavaServer_Pages
[wikiTemplatEngine]: https://en.wikipedia.org/wiki/Template_processor

<!-- javascript.md -->
