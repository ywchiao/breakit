<!---
  @file       fs.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       10/11/2017 created.
  @date       11/30/2018 last modified.
  @version    0.1.0
  @since      0.1.0
  @copyright  CC-BY, © 2017-2018 Yiwei Chiao
-->

# [Node.js][nodejs] 的 [fs][] 模組

 針對檔案系統的讀寫，[Node.js][nodejs] 提供了一個 [fs][]
 (*File System*) 模組。

 先看引入了 [fs][] 模組的 `httpd/index.js` 的程式碼：

```javascript
 1. 'use strict';
 2.
 3. let http = require('http');
 4.
 5. http.createServer((request, response) => {
 6.   // 取得 node.js 的 fs 模組
 7.   let fs = require('fs');
 8.
 9.   fs.readFile('../htdocs/index.html', (err, data) => {
10.     response.writeHead(200, {
11.       'Content-Type': 'text/html'
12.     });
13.
14.     response.write(data);
15.
16.     response.end();
17.   });
18. }).listen(8088);
19.
20. // log message to Console
21. console.log('伺服器啟動，連線 url:  http://127.0.0.1:8088/');
```

 和原來的 `index.js` 內容比較，主要的變化出現在第 6 行到第 17 行這段 `callback` 函數的內容。具體的說是：

  * 第 7 行：利用 `require('fs')` 載入了 [Node.js][nodejs] 的
   [fs][] ([File System][fs])模組，並將產生的物件放入同名的 `fs` 變數
   內。
  * 第 9 行：呼叫 [fs][] 物件的 [`readFile`][readfile] 方法；讀入
   `index.html` 檔案；有趣的在第二個參數的 `callback` 函數。
   這個 `callback` 函數本身需要兩個參數：  
    * `err`：代表 [`readFile()`][readfile] 執行中發生錯誤。
    * `data`: 代表讀取成功的資料。
   目前的 `index.js` 檔案暫時不處理錯誤，所以並沒有對 `err` 進行處理。而讀入
   的 `data` 就直接準備傳送給客戶端 (瀏覽器)。
  * 第 10 到 16 行：和之前一樣，呼叫 [`response`][serverresponse] 三步
   走；不一樣的是，現在這幾行變成
   [`readFile(fname, callback)`][readfile] 第二個參數： `callback`
   函數的內容：
    - 第 10 行，[`writeHead(...)`][responsewritehead]；因為傳回的資料
     現在是 `html`，所以 `'Content-Type'`([MIME Type][mime]) 設為
     `'text/html'`。
    - 第 14 行，[`write(data)`][responsewrite]：呼叫
     [`response`][serverresponse] 的 [`write`][`responsewrite`]
     方法將讀入的資料 (`data`) 傳送給客戶端 (瀏覽器)
    - 第 16 行，[`end()`][responseend]：**結東**
     [`response`][serverresponse] 物件的工作，確實將資料傳送出去。

## 非同步 (asynchronous) 的 `fs.readFile(...)`

  如果去查 `index.js` 第 9 行的 [`fs.readFile(...)`][readfile] 說明
  文件，會注意到文件特別強調它是 *asynchronous* (**非同步**) 的。這是
  [Node.js][nodejs] 的一個特點。[Node.js]][nodejs] 提供的模組裡的
  [API][]s (Application Programming Interface: 應用程式介面)，除非特
  別聲明，或者如 [readFile(...)][readfile] 的姊妹函數
  [readFileSync(...)][readfilesync] 般，函數名稱裡就帶有
  *Sync* (*SYNChronous*)，全部都是**非同步** (*asynchronous*) 的。

  所謂**非同步** (*asynchronous*) 指的是，以 [readFile(...)][readfile]
  方法為例，[Node.js][nodejs] **不會** 等檔案讀取完畢之後才進行下一步
  驟的執行； **[Node.js][nodejs] 啟動 I/O 作業，開始讀取檔案後，就去
  處理程式的下一個指令了；一直到 I/O 系統完成了工作，才會透過
  [readFile(...)][readfile] 的 `callback` 函數，通知 [Node.js][nodejs]
  回頭進行讀取資料的後續處理。**

  這樣設計的好處是，同樣以 [readFile(...)][readfile] 為例，如果讀
  取的檔案很大，[Node.js][nodejs] 可以不用傻傻的在那兒等檔案讀完，
  而可以先去忙其它事情，等到檔案讀完再回頭處理。從而最大化運算核心
  和記憶體的使用效率。

[API]: https://en.wikipedia.org/wiki/Application_programming_interface
[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[mdnHTML]: https://developer.mozilla.org/en-US/docs/Web/HTML
[mdnJavaScript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[nodejs]: https://nodejs.org
[ECMAScript]: https://www.ecma-international.org/publications/standards/Ecma-262.htm
[fs]: https://nodejs.org/api/fs.html#fs_file_system
[mime]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
[readfile]: https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
[readfilesync]: https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options
[responseend]: https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
[responsewrite]: https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback
[responsewritehead]: https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
[serverlisten]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
[serverresponse]: https://nodejs.org/api/http.html#http_class_http_serverresponse

<!-- fs.md -->
