<!---
  @file       router.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       11/10/2017 created.
  @date       11/29/2018 last modified.
  @version    0.1.0
  @copyright  CC-BY, © 2017-2019 Yiwei Chiao
-->

# 簡介

 目前 `index.js` 利用 `switch` 指令來依據使用者要求，傳回不同的檔案內容到
 瀏覽器端。程式碼片段類似下面的型態：

```javascript
19.  request.on('end', () => {
20.    switch (request.url) {
21.      case '/':
22.        fs.readFile('../htdocs/index.html', (err, data) => {
23.          if (err) {
24.             console.log('檔案讀取錯誤');
25.          }
26.          else {
27.            response.writeHead(200, {
28.              'Content-Type': 'text/html'
29.            });
30.
31.            response.write(data);
32.            response.end();
33.          }
34.        });
35.
36.        break;
37.
38.      case '/assets/css/styles.css':
39.        fs.readFile('../htdocs/assets/css/styles.css', (err, data) => {
40.          if (err) {
41.            console.log('檔案讀取錯誤');
42.          }
43.          else {
44.            response.writeHead(200, {
45.              'Content-Type': 'text/css'
46.            });
47.
48.            response.write(data);
49.            response.end();
50.          }
51.        });
52.
53.        break;
54.
55.      case '/assets/png/SokobanClone_byVellidragon.png':
56.        fs.readFile(
57.          '../htdocs/assets/png/SokobanClone_byVellidragon.png',
58.          (err, data) => {
59.            if (err) {
60.              console.log('檔案讀取錯誤');
61.            }
62.            else {
63.              response.writeHead(200, {
64.                'Content-Type': 'image/png'
65.              });
66.
67.              response.write(data);
68.              response.end();
69.            }
70.          }
71.        );
72.
73.        break;
74.            
75.      default:
76.        console.log('未定義的存取: ' + request.url);
77.
78.        response.end();
79.
80.        break;
81.     }
```

 原則上就是依第 `76` 行回報的**未定義的存取**，增加 `switch` 陳述裡的
 `case` 分支，回應相對應的**檔案內容**。看起來不差，可是如果，多一個要求，就
 多一段 `swtich case` 陳述，對複雜一點的網站來說，可能很快就會耗盡我們的腦容量
 來追踪。

 我們需要一個**聰明點**的方法。

## 抽離獨立函式

 首先注意到，第 `22~34`, `39~51` 和 `56~71` 的程式碼**基本上**完全相同，
 只有 `fs.readFile(...)` 的檔名參數和 `response.writeHead(....)` 的
 `Content-Type` 參數不同。這並不意外，因為這些程式碼本來就是 `22~34` 行程式
 碼的複製品 (copy)。可以想見，如果再增加 `case`，可能也只是再增加一份 `22~34`
 的 copy 而已。

 所以，第一步可以將 `22~34` 抽離成一個獨立的函式 (function)，如下。

```javascript
/**
  * 利用 http.ServerResponse 物件回傳檔案內容
  *
  * @name serve
  * @function
  * @param response - http.ServerResponse 物件
  * @param fname - 要回傳的檔案名
  * @param datatype - 回傳檔案內容的 Mine-Type
  * @returns {undefined}
  */
let serve = (response, fname, datatype) => {
  let fs = require('fs');

  fs.readFile(fname, (err, data) => {
    if (err) {
      console.log('檔案讀取錯誤');
    }
    else {
      response.writeHead(200, {
        'Content-Type': datatype
      });

      response.write(data);
      response.end();
    }
  });
};
```

 上面的程式碼定義了一個新的函數，稱為 `serve`，它需要三 (3) 個參數，分別是 `http.ServerResponse`, 檔案名稱 (`fname`) 和資料的 Mine-Type。可以自到
 函式的內容就是原始 `switch case` 裡的內容。有了這個函數，原來的 `switch` 可以改寫成：

```javascript
    switch (request.url) {
      case '/':
        serve(response, '../htdocs/index.html', 'text/html');

        break;

      case '/assets/css/styles.css':
        serve(response, '../htdocs/assets/css/styles.css', 'text/css');

        break;

      case '/assets/png/SokobanClone_byVellidragon.png':
        serve(
          response,
          '../htdocs/assets/png/SokobanClone_byVellidragon.png',
          'image/png'
        );

        break;

      default:
        console.log('未定義的存取: ' + request.url);

        response.end();

        break;
    }
```

 如此，大幅簡化了 `switch` 陳述。

 完整的 `index.js` 如下：

```javascript
'use strict';

let http = require('http');

/**
  * 利用 http.ServerResponse 物件回傳檔案內容
  *
  * @name serve
  * @function
  * @param response - http.ServerResponse 物件
  * @param fname - 要回傳的檔案名
  * @param datatype - 回傳檔案內容的 Mine-Type
  * @returns {undefined}
  */
let serve = (response, fname, datatype) => {
  let fs = require('fs');

  fs.readFile(fname, (err, data) => {
    if (err) {
      console.log('檔案讀取錯誤');
    }
    else {
      response.writeHead(200, {
        'Content-Type': datatype
      });

      response.write(data);
      response.end();
    }
  });
};

http.createServer((request, response) => {
  let fs = require('fs');

  let postData = '';

  // 利用 'data' event 消耗掉 data chunk;
  // 'end' event 才會被 fired
  request.on('data', (chunk) => {
    postData += chunk;

    console.log(
      '接收的 POST data 片段: [' + chunk + '].'
    );
  });

  request.on('end', () => {
    switch (request.url) {
      case '/':
        serve(response, '../htdocs/index.html', 'text/html');

        break;

      case '/assets/css/styles.css':
        serve(response, '../htdocs/assets/css/styles.css', 'text/css');

        break;

      case '/assets/png/SokobanClone_byVellidragon.png':
        serve(
          response,
          '../htdocs/assets/png/SokobanClone_byVellidragon.png',
          'image/png'
        );

        break;

      default:
        console.log('未定義的存取: ' + request.url);

        response.end();

        break;
    }
  });
}).listen(8088);

// log message to Console
console.log('伺服器啓動，連線 url:  http://127.0.0.1:8088/');

// index.js
```

## 建立**路由表** (routing table)

 將 `serve()` 函數獨立出去後，`index.js` 是有了大幅改善，但還是不能滿意。
 因為，還是要為新的 `request.url` 增加新的 `switch case`；還是在增加腦子的
 負荷。

 重新審視 `switch case` 陳述，可以注意到，`switch case` 的用途不過是用來將
 `request.url` 對應到真正的**檔案內容**和檔案內容的*Mine-Type*，沒有其它的
 用途。而如果只是為了作**對應** (mapping)，有個更古老，好用的方法來處理，
 **查表** (table lookup)。這裡，借用電腦網路的名詞，就稱這個將要建立的**表**
 是一個**路由表** (routing table)。

 下面是建立出來的路由表：

```javascript
const routingTable = {
  '/': {
      url: '../htdocs/index.html',
      type: 'text/html'
    },
  '/assets/css/styles.css': {
      url: '../htdocs/assets/css/styles.css',
      type: 'text/css'
    },
  '/assets/png/SokobanClone_byVellidragon.png': {
      url: '../htdocs/assets/png/SokobanClone_byVellidragon.png',
      type: 'image/png'
    },
};
```

 如上表顯示的，所謂的 **routing table** 在程式裡其實就是一個普通的
 [JavaScript][mdnJavaScript] 物件 (object)；只不過這個**物件**的**屬性**
 (property) 設計過，每一個**屬性**的名稱都對應一個不同的 `request.url`，而
 它的**屬性值** (value) 則是另一個簡單的物件，記錄了真實的檔案位置和對應的
 *Mine-Type*。

 有了 `routingTable` 的協助，`request.on('end')` 的程式片段可以改寫如下：

```javascript
   request.on('end', () => {
     if (request.url in routingTable) {
       let obj = routingTable[request.url];

       serve(response, obj.url, obj.type);
     }
     else {
       console.log('未定義的存取: ' + request.url);

       response.end();
     }
   });
```

 原來的 `switch` 陳述不見了，而且更棒的是，如果有新的 `request.url` 出現，這裡不用作任何事情，只需要去修改 `routingTable` 的定義就行了。

## 簡化路由表

 最後再回頭看一眼剛定義的 `routingTable`。注意到除了 `'/'` 對應到
 `'../htdocs/index.html'`，使得 `request.url` 和**真實**的 `url` 不同
 之外，另外兩組的 `request.url` 和**真實**的 `url` 幾乎完全相同。這有個重大
 的缺點：
 * 將網站的內部結構以 url 的型式暴露在外。

 `request.url` 基本上就是使用者在瀏覽器網址列上輸入的網址，或 `.html` 裡記錄
 的 `url link`。讓它和網站上的目錄結構作完整的對應，等於告訴使用者網站的架構
 安排是什麼樣子。讓網站暴露在不必要的風險中。

 還好，`routingTable` 本身就是個對應表，修改這個表就可以解決問題。而修改的
 目標，除了斷離 `request.url` 和**真實** url 的字面聯繫外，當然也希望簡化
 使用者的麻煩。所以，簡化的方向在 `request.url` 上。

 先看修改過的 `routingTable`。

```javascript
const routingTable = {
  '/': {
      url: '../htdocs/index.html',
      type: 'text/html'
    },
  '/styles.css': {
      url: '../htdocs/assets/css/styles.css',
      type: 'text/css'
    },
  '/SokobanClone_byVellidragon.png': {
      url: '../htdocs/assets/png/SokobanClone_byVellidragon.png',
      type: 'image/png'
    },
};
```

簡單說，就是將 `request.url` 裡的路徑資訊**移除**。而相對應的，需要修改 `index.html`。而這一部份就留作練習。

最後，附上到目前為止，完整的 `index.js` 檔。

```javascript
 1. 'use strict';
 2.
 3. let http = require('http');
 4.
 5. const routingTable = {
 6.   '/': {
 7.       url: '../htdocs/index.html',
 8.       type: 'text/html'
 9.     },
10.   '/styles.css': {
11.       url: '../htdocs/assets/css/styles.css',
12.       type: 'text/css'
13.     },
14.   '/SokobanClone_byVellidragon.png': {
15.       url: '../htdocs/assets/png/SokobanClone_byVellidragon.png',
16.       type: 'image/png'
17.     },
18. };
19.
20. /**
21.   * 利用 http.ServerResponse 物件回傳檔案內容
22.   *
23.   * @name serve
24.   * @function
25.   * @param response - http.ServerResponse 物件
26.   * @param fname - 要回傳的檔案名
27.   * @param datatype - 回傳檔案內容的 Mine-Type
28.   * @returns {undefined}
29.   */
30. let serve = (response, fname, datatype) => {
31.   let fs = require('fs');
32.
33.   fs.readFile(fname, (err, data) => {
34.     if (err) {
35.       console.log('檔案讀取錯誤');
36.     }
37.     else {
38.       response.writeHead(200, {
39.         'Content-Type': datatype
40.       });
41.
42.       response.write(data);
43.       response.end();
44.     }
45.   });
46. };
47.
48. http.createServer((request, response) => {
49.   let fs = require('fs');
50.
51.   let postData = '';
52.
53.   // 利用 'data' event 消耗掉 data chunk;
54.   // 'end' event 才會被 fired
55.   request.on('data', (chunk) => {
56.     postData += chunk;
57.
58.     console.log(
59.       '接收的 POST data 片段k: [' + chunk + '].'
60.     );
61.   });
62.
63.   request.on('end', () => {
64.     if (request.url in routingTable) {
65.       let obj = routingTable[request.url];
66.
67.       serve(response, obj.url, obj.type);
68.     }
69.     else {
70.       console.log('未定義的存取: ' + request.url);
71.
72.       response.end();
73.     }
74.   });
75. }).listen(8088);
76.
77. // log message to Console
78. console.log('伺服器啓動，連線 url:  http://127.0.0.1:8088/');
79.
80. // index.js
```

## 問題與練習

 修改 `htdocs/index.html` 使得目前版本的 `index.js` 還是可以正常顯示內容。

[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[mdnHTML5]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[mdnJavaScript]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[nodejs]: https://nodejs.org
[http_inmsg]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[scriptingLanguage]: https://en.wikipedia.org/wiki/Scripting_language
[shellScript]: https://en.wikipedia.org/wiki/Shell_script
[sokoban]: https://en.wikipedia.org/wiki/Sokoban
[sokoban.js]: https://github.com/ywchiao/sokoban.js.git

<!-- router.md -->
