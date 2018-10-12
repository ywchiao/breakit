<!---
  @file       intro.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       12/15/2017 created.
  @date       10/12/2018 last modified.
  @version    0.2.0
  @since      0.1.0
  @copyright  CC-BY, © 2017-2018 Yiwei Chiao
-->

# [DOM][mdnDOM] (Data Object Model) 背景

 要寫作網頁應用程式 (`WebApp`)，在客戶端 (網頁瀏覽器) 有三大支柱：
  * [HTML][mdnHTML5]：負責**文件** (*Document*) 結構
  * [CSS][mdnCSS]：負責**文件**排版
  * [JavaScript][mdnJavaScript]：負責**文作**操作 (*manipulate*)
 一個有趣的問題就出現了。[HTML][mdnHTML5] 和 [CSS][mdnCSS] 都是簡單的文字
 檔案。[JavaScript][mdnJavaScript] (或任何其它程式語言) 當然可以將它們當作
 **文字** (*text*)，或說**字串** (*string*) 來處理。事實上，在伺服端 (網頁
 伺服器)，所謂的**後台** (或稱**後端**，*backend*) 程式，如 [PHP][]，
 [JSP][wikiJSP]，[Python][]，[Ruby][] 等開發工具就是這麼作的。甚至還開發了
 專門的**樣本語言** ([*template engine*][wikiTemplateEngine]) 來作這件
 事。例如，給 [Node.js][nodejs] 用的 [Jade][jade]，[Python][]
 的 [Jinja2][jinja]，[Ruby][] 內建的 [ERB][wikiERuby]，[PHP][]
 的 [Twig][twig] 等。

 但是，現在是在**前端** (或稱 **前台**，*frontend*)；無論是
 [HTML][mdnHTML5] 或 [CSS][mdnCSS] 都己經 (也必需) 分析轉換成瀏覽器的
 **內部** (*internal*) 表示型式。所以在前端最好的方式應該是直接和瀏覽器溝通。
 直接操作解譯過的 [HTML][mdnHTML5] 物件。

 這個讓外部程式可以直接操縱瀏覽器解譯後的 [HTML][mdnHTML5]，[CSS][mdnCSS]
 物件的標準，就是 [DOM][mdnDOM] 應用程式介面 (api)。

## [DOM][mdnDOM] 簡介

 [DOM][mdnDOM] 全稱是 *`Data Object Model`^ (**資料物件模型**)；設計用來
 處理和表示 [HTML][mdnHTML]，[SVG][mdnSVG] 和 [XML][mdnXML] 文件的
 Web 公開標準。

 [DOM][mdnDOM] 背後的骨幹概念很簡單而直覺。[DOM][mdnDOM] 將文件視為
 一棵**樹** (*tree*)，文件內的結構則視作這棵樹的**分支** (*branch*)，
 最後的內容，自然是**樹葉** (*leaf*)，稱作**節點** (*node*)。
 因為 [DOM][mdnDOM] 將文件視為一棵樹，所以後面會用
 **[DOM][mdnDOM] 樹** 或 *[DOM][mdnDOM] tree* 來稱呼某個
 [HTML][mdnHTML5] 文件的 [DOM][mdnDOM] 型式。

## [DOM][mdnDOM] 和 [HTML][mdnHTML] 文件

一個簡單的例子，考慮下面這個簡單的 `.html` 檔案:

```html
<html>
  <body>
    Hello World!
  </body>
</html>
```
  以 [DOM][mdnDOM] 模型來表示，大概長成這樣：

```
window.document
  |
  + body
  |   |
  .   TextNode
  .
```

 和原來的 [HTML][mdnHTML] 對照，應該可以看到明確的一一對應。而上面列表中的
 `window.document` 就是 [JavaScript][mdnJavaScript] 在處理網頁文件時
 的**根** (*root*) 物件。其中的 `window` 代表的是瀏覽器視窗 (viewport)；
 是真正的**瀏覽器物件**；也就是說，`window` **不是** [HTML][mdnHTML5]
 物件的一部份，它的存在是作為一個容器，將瀏覽器和外來的 [HTML][mdnHTML5]
 文件結合在一起，就是 `window.document` 這個**屬性**裡存放的物件才是真正
 [HTML][mdnHTML5] 文件。一般在 [JavaScript][mdnJavaScript] 裡，可以
 直接寫 `document` 來存取它的方法。

 在 `body` 下面的 `TextNode` 就對應到 [HTML][mdnHTML] 裡的 `Hello World!`
 因為 `Hello World!` 不是個 [HTML][mdnHTML] 的**標籤** (*tag*)，而是
 普通的文字內容，所以 **DOM** 模型設計了一個 **TextNode** 節點物件來
 存放它。

## [DOM][mdnDOM] 實作練習

 來試試 [DOM][mdnDOM] 的實際操作。先在專案裡建立一個**測試** (*test*) 資料夾，如圖 \ref{folder_test}：

  ![專案資料夾\label{folder_test}](images/folder_test.png)

 將下面的程式碼放到 `test/index.html`：

```html
 1. <html lang="zh-TW">
 2.   <head>
 3.     <meta charset="utf-8">
 4.     <script src="index.js"></script>
 5.   </head>
 6.   <body>
 7.   </body>
 8. </html>
```

 再將下面的程式碼放到 `test/index.js`：

```javascript
 1. 'use strict';
 2.
 3. window.addEventListener('load', () => {
 4.   console.log("index.js loaded");
 5.
 6.   let h1 = document.createElement('h1');
 7.   let msg = document.createTextNode('這是 <h1> 的文字訊息');
 8.
 9.   h1.appendChild(msg);
10.
11.   document.body.appendChild(h1);
12. });
```
 利用 [Chrome][chrome] (或 [Firefox][firefox]) 打開
 `file:///d:/breakit/test/index.html` (記得將前面的網址修改成適合當下電腦
 配置。) 應該會看到類似圖 \ref{dom_test} 的畫面。

  ![test.index/test.js\label{dom_test}](images/dom_test.png)

 回頭看 `index.html` 的源碼，應該可以看到它原來應該是一個空白的網頁；
 或者，可以將 `index.html` 的第四 (4) 行 (載入 `.js` 檔案那行) 改成如下的型式：

```html
 4.     <!--script src="index.js"></script-->
```

 也就將第四 (4) 行**註解** (*comment*) 掉。再載入一次，看到的應該是空白畫面。
 因為畫面上的訊息是由 `index.js` 裡的 [JavaScript][mdnJavaScirpt] 直接
 操作 [DOM][mdnDOM] tree 產生的。所以如果將載入 `index.js` 的源碼註解掉，
 程式沒載入，畫面自然回到空白的狀態。

## 程式說明

 因為這是我們和 [JavaScript][mdnJavaScript] 的第一次接觸，讓我們停
 下來仔細看一下這兩個檔案：`index.html` 和 `index.js`。

### `index.html`

 首先是 `index.html`。由上面的程式碼可以看到 `index.html` 裡，

```html
 6.   <body>
 7.   </body>
```

 第六行 `<body>` 和第七行 `</body>` 標籤裡是**沒有**任何內容的。造
 理說，網頁應該是空白的。如前面建議的，如果將第四行

```html
 4.     <script src="index.js"></script>
```

  註解掉

```html
 4.     <!--script src="index.js"></script-->
```

  網頁也真的如預期的變成了空白[^cmtTag]。

[^cmtTag]: [HTML][mdnHTML] 裡，`<!-- ... -->` 稱為**註解**
 (*comment tag*) 標籤，夾在 `<!--` 和 `-->` 間的內容不會被瀏覽器
 (browsers) 處理和顯示。

 明顯的，關鍵就是第四行：

```html
 4.     <script src="index.js"></script>
```

### `<script>` tag

 在 [HTML][mdnHTML] 裡 `<script`> 是用來放置 scripting 程式碼的
 標籤；以目前來說就是放置 [JavaScript][mdnJavaScript] 程式碼的地方。
 隨著 WebApp 的發展與成熟，現在的建議 (best practice) 是不直接將程
 式碼放在這個標籤裡；而是利用 `src` 這個**屬性**，通知瀏覽器去另外
 下載指定的程式碼檔案來執行。

 例如在這個例子裡，就利用 `src=index.js` 這個屬性設定，通知瀏覽器
 去取得 `index.js` 檔案來執行。

### `index.js`

 `index.js` 是我們看到的第一個 [JavaScript][mdnJavaScript] 程式，
 含空白行，只有 12 行。所以可以在下一節，一行行的說明它的行為。

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

<!-- dom.md -->
