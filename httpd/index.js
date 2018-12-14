/**
 *  @file       index.js
 *  @brief      The entry file of the HTTP server.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/23/2018 created.
 *  @date       12/14/2018 last modified.
 *  @version    0.1.0
 *  @since      0.1.0
 *  @copyright  MIT, © 2018 Yiwei Chiao
 *  @details
 *
 *  The entry file of the HTTP server.
 */
'use strict';

let http = require('http');

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

/**
  * 利用 http.ServerResponse 物件回傳檔案內容
  *
  * @name serve
  * @function
  * @param response - http.ServerResponse 物件
  * @param fname - 要回傳的檔案名
  * @param mime - 回傳檔案內容的 MIME_type
  * @returns {undefined}
  */
let serve = (response, fname, mime) => {
  let fs = require('fs');

  fs.readFile(fname, (err, data) => {
    if (err) {
      console.log('檔案讀取錯誤');
    }
    else {
      response.writeHead(200, {
        'Content-Type': mime
      });

      response.write(data);
      response.end();
    }
  });
};

http.createServer((request, response) => {
  // 取得 node.js 的 fs 模組
  let fs = require('fs');
  let postData = ''; // POST 資料

  // 利用 'data' event 消耗掉 data chunk;
  // 'end' event 才會被 fired
  request.on('data', (chunk) => {
    postData += chunk;

    console.log(
      ` 接收的 POST data ⽚段 : [${chunk}].`
    );
  });

  request.on('end', () => {
     if (request.url in routingTable) {
       let obj = routingTable[request.url];

       serve(response, obj.url, obj.mime);
     }
     else {
       console.log(' 未定義的存取: ' + request.url);

       response.end();
     }
  });
}).listen(8088);

// log message to Console
console.log('伺服器啓動，連線 url:  http://127.0.0.1:8088/');

// index.js
