<!---
  @file       css.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       10/26/2017 created.
  @date       10/05/2018 last modified.
  @version    0.1.1
  @since      0.1.0
  @copyright  CC-BY, © 2017-2018 Yiwei Chiao
-->

# 簡單的 CSS 檔案設定

 直接在 [HTML][mdnHTML] *tag* 裡插入各式各樣的屬性設定，除了極少數
 的情況外，實在不是個好主意。所以才有 [CSS][mdnCSS] 的出現，也就是
 **外部的** (*external*) 獨立 `.css` 檔案。

 原來的 `index.html` 可以改寫如下：

```html
 1. <!DOCTYPE html>
 2. <html lang="zh-TW">
 3.   <head>
11.
12.     <link rel="stylesheet" href="assets/css/styles.css">
13.   </head>
14.   <body>
15.     <header id="page_top">
16.       <h1 class="irontext">BreakIt:</h1>
17.       <h3>一個 html5/css3/node.js 的練習專案</h3>
18.     </header>
19.     <nav>
20.       <h2>NAV</h2>
21.       <h3>功能表單 navigation</h3>
47.     </nav>
48.     <div class="flexbox">
49.       <aside>
50.         <h2 class="irontext">ASIDE</h2>
51.         <h3>側欄</h3>
52.       </aside>
53.       <article>
54.         <h2 class="bluetext">ARTICLE</h2>
55.         主題文件
56.         <section class="browntext" id="sec1">
57.           <h2 class="redtext">SECTION</h2>
58.           第一小節
59.           <button type="button">
60.             <a href="#page_top">回上方</a>
61.           </button>
62.         </section>
63.         <section class="browntext milky" id="sec2">
64.           <h2 class="redtext">SECTION</h2>
65.           第二小節
66.         </section>
67.         <section class="browntext milky" id="sec3">
68.           <h2 class="redtext">SECTION</h2>
69.           第三小節
70.         </section>
71.       </article>
72.     </div>
73.     <footer class="lighttext">
74.       <h2 class="blacktext">FOOTER</h2>
75.       <small>&copy; Copyright 2018，佛光大學創意與科技學院<small>
76.     </footer>
77.   </body>
78. </html>
```

 和原來的 `index.html` 重要的差別有四 (4):
  1. 第 *12* 行，加入了 `<link>` *tag*，連結到外部的 `.css` 檔案，
   `styles.css`。
  1. 所有 *tag* 裡有關**背景顏色** (*background-color*) 的描述都拿掉了。
  1. 有些 *tag* (如第 *15* 行的 `<header>`) 多了 `id` 的設定；而另有些
   *tag* (如第 *16* 行的 `<h1>`) 多了 `class` 的設定。

## `<link>` *tag*

 [HTML][mdnHTML] 利用 `<link>` *tag* 來標明和外部 (external) 資源
 (resource) 的聯繫。最**常用**的情況就是用來標明使用的 `.css` 檔。

 `index.html` 的第 *12* 行內容如下：

```html
12.     <link rel="stylesheet" href="assets/css/styles.css">
```

 其中 `rel` 代表 *relation* (關係)，就是 `<link>` 的外部資源和目前的
 `.html` 檔的**關係** (relationship)，這裡填入 `stylesheet` 代表是相關的
 `.css` 檔案；後面 `href` (hyper-reference) 則是 `url` 指出如何取得這個
 外部 `.css` 檔案。這裡利用以 `index.html` 為**參考點**的**相對路徑**
 (relative path) 去取得置於在 `assets/css` 資料夾下的 `styles.css`
 檔案。

## `styles.css` 檔

 `assets/css` 資料夾的 `styles.css` 檔案內容如下：

```css
  1. html {
  2.     height: 100%;
  3. }
  4.
  5. body {
  6.     background-color: #ffffe7;
  7.     height: 100%;
  8. }
  9.
 10. header {
 11.     background-color: #c7c7f7;
 12. }
 13.
 14. nav {
 15.     background-color: #c7f7f7;
 16. }
 17.
 46. aside {
 47.     background-color: #f7c7c7;
 48.     width: 15%;
 49.     float: left;
 50. }
 51.
 52. article {
 53.     background-color: #c7c7c7;
 54.     width: 85%;
 55.     float: left;
 56. }
 57.
 58. section {
 59.     background-color: #c7f7c7;
 60. }
 61.
 62. footer {
 63.     background-color: #e7e7e7;
 64. }
 65.
 66. .flexbox {
 67.     display: flex;
 68. }
 69.
 70. .blacktext{
 71.     color: #0f0f0f;
 72. }
 73.
 74. .redtext {
 75.     color: #ff3333;
 76. }
 77.
 78. .bluetext {
 79.     color: #3333ff;
 80. }
 81.
 82. .irontext {
 83.     color: #efefaf;
 84. }
 85.
 86. .browntext {
 87.     color: #9f5f5f;
 88. }
 89.
 90. .sectext {
 91.     color: #7f7fef;
 92. }
 93.
 94. .lighttext {
 95.     color: #9f9f7f;
 96. }
 97.
137. #about {
138.     float: right;
139.     margin: 0px 2em 0px 0px;
140. }
141.
150. .milky {
151.     background-color: #ffffea;
152. }
```

 如上所示，`.css` 內是以一個名稱，稱作**選擇器** (*selector*) 開始，後面跟著
 用 `{...}` 標示的**區塊** (block)，在**區塊**內就是 `css` 的屬性設定。

 **屬性** (atttibute) 設定遵循 `attribute: value;` 的格式；要設定的
 **屬性**名稱和**值** (value) 由 `:` 隔開；而**屬性**和**屬性**之間則以
 `;` 分隔。

### 選擇器 (selector)

 為了知道 `.css` 檔內設定的屬性要應用在 `.html` 檔內的那個 `tag` 上，
 [CSS][mdnCSS] 設定了**三***(*3*) 的層級的**選擇器**，如下：

 * HTML tag: 每個 [HTML][mdnHTML] 的 `tag` 都是**第一階**的選擇器。在這裡
  設定的 style，如果沒有被其它選擇器覆蓋掉，會應用在 `.html` 檔裡**所有**相
  同的 `tag` 上。如 `styles.css` 裡的第 1, 5, 10 行等。
 * class: 在 [HTML][mdnHTML] 的 `tag` 裡設定的 `class`；如
  `index.html` 的第 *16* 行 `<h1 class="irontext"` 裡的 `irontext`
  就對應上面 `styles.css` 檔裡的第 *82* 行。注意，在 [CSS][mdnCSS] 裡，
  `class` 選擇器以 `.` (句點) 開頭。和 HTML tag 選擇器類似，如果沒有另外被覆
  蓋，設定的 style 會應用在**所用**相同 *class* 的 *tag* 上。
 * `id`: 在 [HTML][mdnHTML] 的 `tag` 裡設定的 `id`；如 `index.html`
  裡的第 *15* 行和 `styles.css` 裡的第 *138* 行；和前兩 (*2*) 者不同的是，
  `id` 是**唯一** (*unique*) 的。

 [CSS][mdnCSS] 除了上述三類選擇器，還設計了輔助用的運算子，如 `>`，可以更精確
 的選出需要排版的元素，可以參照 [CSS][mdnCSS] 的說明。

## 範例：以 [CSS][mdnCSS] 搭配 [HTML][mdnHTML] 製作下拉功能表

 上面 `index.html` 和 `styles.css` 裡刪除的部份其實是個簡易的下拉式功能
 表單。程式表列出如下。將它們放入原來的檔案後，`index.html` 就有了一個簡單的
 下拉表單。

```html
22.       <ul>
23.         <li id="sec1">第一頁
24.           <ul class="drop_box" id="drop_1">
25.             <li><a href="#sec1">Section 1</a></li>
26.           </ul>
27.         </li>
28.         <li>第二頁
29.           <ul class="drop_box" id="drop_2">
30.             <li><a href="#sec2">Section 2</a></li>
31.           </ul>
32.         </li>
33.         <li>第三頁
34.           <ul class="drop_box" id="drop_3">
35.             <li><a href="#sec3">Section 3</a></li>
36.           </ul>
37.         </li>
38.         <li>第四頁</li>
39.         <li>第五頁</li>
40.         <li id="about">關  於
41.           <ul class="drop_box" id="drop_about">
42.             <li>小組成員</li>
43.             <li>工作分工</li>
44.           </ul>
45.         </li>
46.       </ul>
```

```css
18. /*
19.  * 選擇 nav 下面的 ul 元素下的 *所有* li 元素
20.  */
21. nav > ul > li {
22.     display: inline-block;
23.     height: 2em;
24.     min-width: 4em;
25.     line-height: 2em;
26.     text-align: center;
27.     // 上下 pading: 0; 左右 padding: 0.5 em;
28.     padding: 0px .5em;
29.     // 上下 pading: 0; 左右 padding: 0.25 em;
30.     margin: 0px .25em;
31.     border: none;
32.     background-color: bisque;
33. }
34.
35. /*
36.  * 當滑鼠游標移到 nav > ul > li 上時，更改 *背景顏色*
37.  */
38. nav > ul > li:hover {
39.     background-color: #dfdfdf;
40. }
41.
42. nav > ul > li:hover [id*=drop_] {
43.     display: block;
44. }
45.
98. /*
99.  * 下拉式 (drop-down) 功能表
100.  */
101. .drop_box {
102.     // 預設不顯示;
103.     display: none;
104.     // 去除 ul.li 的項目標示;
105.     list-style-type: none;
106.     // 位置跟隨它的父元素;
107.     position: absolute;
108.     background-color: #f9f9f9;
109.     padding: 0px;
110.     margin: 0px .25em;
111. }
112.
113. /*
114.  * 下拉式功能表裡的 *li* (list item)
115.  * 選單項目屬性設定
116.  */
117. .drop_box ul li {
118.     min-width: 4em;
119.     text-align: center;
120.     padding: 0px .5em;
121.     margin: .25em 0px;
122.     border: none;
123.     background-color: bisque;
124. }
125.
126. /*
127.  * 當滑鼠游標移至
128.  * 下拉式功能表裡的 *li* (list item)
129.  * 選單項目時，
130.  * 更改屬性設定
131.  */
132. .drop_box li:hover {
133.     color: DodgerBlue;
134.     background-color: Salmon;
135. }
136.
142. /*
143.  * 當滑鼠游標移至 *關於* (about) 時，將
144.  * 對應的 drop_box 顯示出來
145.  */
146. #about:hover #drop_about {
147.     display: block;
148. }
149.
```

[github]: https://github.com/
[githubHead]: https://github.com/joshbuchea/HEAD
[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
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

<!-- css.md -->
