<!---
  @file       intro.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       10/06/2017 created.
  @date       10/05/2018 last modified.
  @version    0.1.1
  @since      0.1.0
  @copyright  CC-BY, © 2017-2018 Yiwei Chiao
-->

# HTML5/CSS3

 在網頁瀏覽器 (browser) 上，[JavaScript][wikiECMAScript]
 ([ECMAScript][]) 控制**程式行為** (behavior)，
 [HTML][wikiHTML] ([Hyper Text Markup Language][wikiHTML]) 決定文件
 的**組織結構** (structure)，而
 [CSS][wikiCSS] ([Cascading Style Sheets][wikiCSS])
 處理**排版**(style)。三者各司其職。

 [BreakIt][breakit] 專案既然是一個網頁遊戲專案，自然少不了
 [HTML][wikiHTML] 和 [CSS][wikiCSS]。只是專案重心在
 [JavaScript][mdnJavaScript]，所以
 [HTML][mdnHTML]，[CSS][mdnCSS] 只會簡單帶過使用到的部份。其餘更全面的介紹
 或進階的主題，需要去參考其它的資源 (如這裡給的連結：[HTML][mdnHTML]，和
 [CSS][mdnCSS])。

## index.html

  首先，在 `breakit/htdocs` 資料夾下，建立 `index.html` 檔案，內容如下：

```html
<!DOCTYPE html>
<html lang="zh-TW">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>BreakIt: A Breakout Game</title>
    <meta name="author" content="Yiwei Chiao">
    <meta name="description" content="A web-based Breakout (打磚塊) game.">
    <meta name="keywords" content="Javascript, game, Breakout">
  </head>
  <body>
    Hello World!
  </body>
</html>
```

 在 `index.html` 的內容列表中，用 `<>` 框起的字串稱為**標記** (*tag*)，
 它們也就是 [HTML][wikiHTML] 標記語言的組成部份。針對 [HTML][wikiHTML]
 較詳細的介紹放在這一章的後半，這裡需要注意的只是 `<body>` 和 `</body>`
 夾起的 `Hello World!`。

 準備好 `breakit/htdocs` 資料夾下的 `index.html` 後，可以開啟瀏覽器，在瀏
 覽器的網址列內輸入：

  * Windows: `file:///d:/breakit/htdocs/index.html`
  * Linux: `file:///home/ywchiao/breakit/htdocs/index.html`
  * MacOs: `file:///Users/ywchiao/breakit/htdocs/index.html`

 其中 Windows 的 `d:`，Linux/MacOS 裡的 `ywchiao` 請依個人情況更改。在
 Linux/MacOS 系統如果不清楚路徑要怎麼打，可以在 terminal 下利用 `cd` 指令，
 切換工作目錄到 `breakit/htdocs` 之後，輸入 `pwd`
 (Present Working Directory)，依螢幕輸出打就行了；而 Windows 則可以利用
 檔案總管，切換資料夾到 `breakit/htdocs` 後，在檔管總管的瀏覽器列空白處，
 點一下滑鼠左鍵就可以看到要輸入的內容。

 如果瀏覽器的網址列輸入正確，應該會看見如 Figuer \ref{file:index} 的畫面。

 ![瀏覽器開啟 `index.html`\label{file:index}](images/file_index.png)

### [HTML][mdnHTML] 標題 `<h1> ... <h6>`

 Figure \ref{file:index} 看起來沒什麼不同？的確如此，因為前面提過，
 [HTML][wikiHTML] 的用途在決定文件**結構** (structure)，而非呈現。不過，
 一些簡單的效果還是有的。修改:

```html
 <body>
   Hello World!
 </body>
```

 成為：

```html
 <body>
   <h1>Hello World!</h1>
 </body>
```

 存檔後，重新整理網頁，可以發現 `Hello World!` 的字型大小變了。這是因為
 `<h1></h1>` 是 [HTML][mdnHTML] 用來標記**標題** (Heading) 的 *tag*；
 其中，`<h1>` 標記標題的開始，而 `</h1>` 則標記標題的結束。排版習慣上，標題
 的字體通常會比內文大一些。所以，[HTML][mdnHTML] 的 heading tags，標記的
 文字也會大一些。

 [HTML][mdnHTML] 總共定義了六 (6) 級的 heading 大小，分別以 `<h1>`.
 `<h2>`。一直到 `<h6>` 標記。可以逐一試試效果。

[ECMAScript]: https://www.ecma-international.org/publications/standards/Ecma-262.htm
[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[mdnHTML]: https://developer.mozilla.org/en-US/docs/Web/HTML
[mdnJavaScript]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[wikiCSS]: https://en.wikipedia.org/wiki/Cascading_Style_Sheets
[wikiECMAScript]: https://en.wikipedia.org/wiki/ECMAScript
[wikiHTML]: https://en.wikipedia.org/wiki/HTML

<!-- intro.md -->
