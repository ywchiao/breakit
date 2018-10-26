/**
 *  @file       index.js
 *  @brief      The entry file of BreakIt.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       10/11/2018 created.
 *  @date       10/26/2018 last modified.
 *  @version    0.1.0
 *  @since      0.1.0
 *  @copyright  MIT, © 2018 Yiwei Chiao
 *  @details
 *
 *  The entry file of BreakIt.
 */
'use strict';

// 繪出 *擊球板* (paddle)
let paintPaddle = function (ctx) {
  ctx.save();

  ctx.fillStyle = 'midnightblue';
  ctx.fillRect(288, 454, 64, 16);

  ctx.restore();
};

// 繪出 *磚塊* (paddle)
let paintBricks = function (ctx) {
  ctx.save();

  let width = 12;
  let height = 8;

  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y++) {
      ctx.fillStyle =
        `rgb(${Math.floor(255 - 42.5 * x)}, ${Math.floor(255 - 42.5 * y)}, 0)`;

      ctx.fillRect((x * 52) + 10, (y * 20) + 10, 48, 16);
    }
  }

  ctx.restore();
};

// 重繪 *遊戲盤面*
let paint = function (ctx) {
  // 將圖紙填滿背景色
  ctx.fillRect(0, 0, 640, 480);

  ctx.strokeStyle = 'slateblue';
  ctx.strokeRect(4, 4, 632, 472);

  // 繪出磚塊
  paintBricks(ctx);
 
  // 繪出擊球板
  paintPaddle(ctx);
};

/**
 * breakit 程式進入點
 *
 * @callback
 * @param 'load' : DOM 事件名
 * @returns {undefined}
 */
window.addEventListener('load', () => {
  console.log("breakit.js loaded");

  // 準備承載 *遊戲標題* (title) 的 HTML 元素
  let gameTitle = document.createElement('span');
  gameTitle.textContent = 'BreakIt!';

  // 準備承載 *遊戲版頭* (header) 的 HTML 元素
  let gameHeader = document.createElement('header');
  gameHeader.className = 'card-header';

  // 將 *遊戲標題* 放上 *遊戲版頭*
  gameHeader.appendChild(gameTitle);

  // 準備 *遊戲盤面* 的繪圖圖紙 (canvas)
  let gameCanvas = document.createElement('canvas');

  // 取得能在 canvas 上繪圖的 context2d 物件
  let ctxPaint = gameCanvas.getContext('2d');

  // 設定繪圖圖紙的寬高
  gameCanvas.width = 640;
  gameCanvas.height = 480;

  // 設定圖紙背景色
  ctxPaint.fillStyle = 'mintcream';

  // 繪出基本遊戲盤面
  paint(ctxPaint);

  // 準備承載 *遊戲內容* 的 HTML 元素
  let gameContent = document.createElement('article');
  gameContent.className = 'card-content';

  // 將 *遊戲盤面* 放上 *遊戲內容* 容器
  gameContent.appendChild(gameCanvas);

  // 準備 *遊戲桌面* 的 HTML 元素
  let gameDesktop = document.createElement('section');
  gameDesktop.className = 'card';

  // 將 *遊戲版頭* 放上 *遊戲桌面*
  gameDesktop.appendChild(gameHeader);

  // 將 *遊戲內容* 放上 *遊戲桌面*
  gameDesktop.appendChild(gameContent);

  // 將 *遊戲桌面* 放上 *網頁*
  let desktop = document.querySelector('.site-body')
  desktop.appendChild(gameDesktop);
 
  /**
   * 滑鼠游標移動追踪
   *
   * @callback
   * @param 'mousemove' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  desktop.addEventListener('mousemove', (e) => {
    document.getElementById('cursor-x').textContent = e.clientX;
    document.getElementById('cursor-y').textContent = e.clientY;
  });
});

// index.js
