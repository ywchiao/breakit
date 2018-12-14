<!---
  @file       intro.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       12/14/2018 created.
  @date       12/14/2018 last modified.
  @version    0.1.0
  @since      0.1.0
  @copyright  CC-BY, © 2018 Yiwei Chiao
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
