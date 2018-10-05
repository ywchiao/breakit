<!---
  @file       html.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       10/13/2017 created.
  @date       10/05/2018 last modified.
  @version    0.1.1
  @since      0.1.0
  @copyright  CC-BY, © 2017-2018 Yiwei Chiao
-->

# HTML 簡介

 [HTML][wikiHTML] 是 [HyperText Markup Language][wikiHTML] (超文本
 標記語言) 的縮寫。[**標記語言**][wikiMarkupLang]
 ([markup language][wikiMarkupLang]) 和[程式語言][wikiProgLang]
 ([programming language][wikiProgLang]) 有本質的不同。
 如 [HTML][wikiHTML]
 這樣的[標記語言][wikiMarkupLang]設計上是為[**文本**][wikiText]
 ([text][wikiText]) 的不同部份加上**標記** (tag)，方便工作人員或處理工具
 理解原始設計者／創作者的創作意圖，進而依據這些預先定義好的**標記**意義進行後製
 (post-production) 加工。
 在 Web 相關領域，目前常見的標記語言有
 [HTML][wikiHTML]，[Markdown][wikiMarkdown]，[XML][wikiXML]，
 [YAML][wikiYAML] 等。
 每個[標記語言][wikiMarkupLang]都有它想解決的問題和想達成的目的。

## [HTML][mdnHTML] 結構

 [HTML][mdnHTML] 採用的**標記**，稱為 [HTML][mdnHTML] *tag*，
 都以**成對**的角括號 `<...>` 包夾，成 `<tag>` 型式；如 `<h1>`，`<h2>`
 等。

 之前提過，[HTML][mdnHTML] 是設計來規範文件的結構。而一個最簡單的
 [HTML][mdnHTML] 結構大概如下所示：

```html
<html>
  <head>
    <title>HTML 簡介</title>  
  </head>
  <body>
    Hello HTML。
  </body>
</html>
```

 由上面的 [HTML][mdnHTML] 內容可以注意到幾件事情：

 * [HTML][mdnHTML] 檔案開頭與結束分別是 `<html>` 與 `</html>` 的 *tag*
  其中 `<tag>` 稱為 *tag* **開始**標記，而 `</tag>` 則稱為 *tag* **結東**
  標記。
 * [HTML][mdnHTML] 的內容可以分為 `<head></head>` 和 `<body></body>`
  兩大區塊：
    - `<head></head>`: 放置 .html 作者想讓瀏覽器知道，除了文件結構之外，
     一些額外的處理**注意事項**，相關檔案，和被稱為
     [*meta-data*][wikiMetadata] 的文件描述。在
     [GitHub][github] 上有一份整理的很好的文可以參考：
     [*HEAD*][githubHead]
    - `<body></body>`: [HTML][mdnHTML] 真正要呈現的內容。
 * [HTML][mdnHTML] *tag* **不**
  區分大小寫，不過 [HTML5][mdnHTML5] 建議採用**全**小寫。

## `index.html` 的 `<head></head>`

  `htdocs/index.html` 裡的 `<head></head>` 內容如下：

```html
1.  <head>
2.    <meta charset="utf-8">
3.    <meta name="viewport" content="width=device-width, initial-scale=1.0">
4.
5.    <title>BreakIt: A Breakout Game</title>
6.    <meta name="author" content="Yiwei Chiao">
7.    <meta name="description" content="A web-based Breakout (打磚塊) game.">
8.    <meta name="keywords" content="Javascript, game, Breakout">
9.  </head>
```

  * 第 2 行：通知瀏覽器，`index.html` 採用的內容編碼是 `utf-8`。
  * 第 3 行：預設使用設備的全螢幕顯示；放大倍率是 `1.0`
  * 第 5 行：網頁的標題 (title)；這個值會被用作網址列的內容，我的最愛，或搜尋
   引擎。
  * 第 6~8 行：網頁基本資訊，提供給搜尋引擎或網路爬蟲處理。

[github]: https://github.com/
[githubHead]: https://github.com/joshbuchea/HEAD
[mdnHTML]: https://developer.mozilla.org/en-US/docs/Web/HTML
[mdnHTML5]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[wikiHTML]: https://en.wikipedia.org/wiki/HTML
[wikiMarkdown]: https://en.wikipedia.org/wiki/Markdown
[wikiMarkupLang]: https://en.wikipedia.org/wiki/Markup_language
[wikiMetadata]: https://en.wikipedia.org/wiki/Metadata
[wikiProgLang]: https://en.wikipedia.org/wiki/Programming_language
[wikiText]: https://en.wikipedia.org/wiki/Text_(literary_theory)
[wikiXML]: https://en.wikipedia.org/wiki/XML
[wikiYAML]: https://en.wikipedia.org/wiki/YAML

<!-- html.md -->
