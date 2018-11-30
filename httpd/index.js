/**
 *  @file       index.js
 *  @brief      The entry file of the HTTP server.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/23/2018 created.
 *  @date       11/30/2018 last modified.
 *  @version    0.1.0
 *  @since      0.1.0
 *  @copyright  MIT, © 2018 Yiwei Chiao
 *  @details
 *
 *  The entry file of the HTTP server.
 */
'use strict';

let http = require('http');

http.createServer((request, response) => {
  // 取得 node.js 的 fs 模組
  let fs = require('fs');

   fs.readFile('../htdocs/index.html', (err, data) => {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });

    response.write(data);

    // 傳送回應內容。
    response.end();
  });
}).listen(8088);

// log message to Console
console.log('伺服器啓動，連線 url:  http://127.0.0.1:8088/');

// index.js
