<!---
  @file       intro.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       12/06/2018 created.
  @date       12/06/2018 last modified.
  @version    0.1.0
  @copyright  CC-BY, © 2018 Yiwei Chiao
-->

# `switched` 檔案服務

 目前 `index.js` 利用 `switch` 指令來依據使用者要求，傳回不同的檔案內容到
 瀏覽器端。程式碼片段類似下面的型態：

```javascript
19. request.on('end', () => {
20.   switch (request.url) {
21.     case '/':
22.       fs.readFile('../htdocs/index.html', (err, data) => {
23.         if (err) {
24.           console.log(' 檔案讀取錯誤 ');
25.         }
26.         else {
27.           response.writeHead(200, {
28.             'Content-Type': 'text/html'
29.           });
30.
31.           // 傳送回應內容。
32.           response.write(data);
33.           response.end();
34.         }
35.       });
36.
37.       break;
38.
39.     case '/assets/css/styles.css':
40.       fs.readFile('../htdocs/assets/css/styles.css', (err, data) => {
41.         if (err) {
42.           console.log(' 檔案讀取錯誤 ');
43.         }
44.         else {
45.           response.writeHead(200, {
46.             'Content-Type': 'text/css'
47.           });
48.
49.           // 傳送回應內容。
50.           response.write(data);
51.           response.end();
52.         }
53.       });
54.
55.       break;
56.
57.     case '/js/index.js':
58.       fs.readFile('../htdocs/js/index.js', (err, data) => {
59.         if (err) {
60.           console.log(' 檔案讀取錯誤 ');
61.         }
62.         else {
63.           response.writeHead(200, {
64.             'Content-Type': 'application/javascript'
65.           });
66.
67.           // 傳送回應內容。
68.           response.write(data);
69.           response.end();
70.         }
71.       });
72.
73.       break;
74.
75.     default:
76.       console.log(` 未定義的存取 : ${request.url}`);
77.
78.       response.end();
79.
80.       break;
81.   }
82. });
```

 原則上就是依第 `76` 行回報的**未定義的存取**，增加 `switch` 陳述裡的
 `case` 分支，回應相對應的**檔案內容**。看起來不差，可是如果，多一個要求，就
 多一段 `case` 陳述，對複雜一點的網站來說，可能很快就會耗盡我們的腦容量
 來追踪。

 我們需要一個**聰明點**的方法。

[MIME_type]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
[breakit]: https://github.com/ywchiao/breakit.git

<!-- intro.md -->
