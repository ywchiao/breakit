/**
 *  @file       index.js
 *  @brief      The entry file of BreakIt.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       10/11/2018 created.
 *  @date       11/08/2018 last modified.
 *  @version    0.1.0
 *  @since      0.1.0
 *  @copyright  MIT, © 2018 Yiwei Chiao
 *  @details
 *
 *  The entry file of BreakIt.
 */
'use strict';

let ball = {
  _elapsed: 0,

  x: 320,

  y: 240,

  offX: -2,

  offY: 2,

  paint: function (ctx) {
    ctx.save();

    ctx.fillStyle = 'red';

    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();

    ctx.restore();
  },

  update: function (drifts) {
    this._elapsed += drifts;
   
    while (this._elapsed > 16) {
      this.x += this.offX;
      this.y += this.offY;

      if (this.x < 20 || this.x > 620) {
        this.offX = - this.offX;
      }

      if (this.y < 20 || this.y > 460) {
        this.offY = - this.offY;
      }

      this._elapsed -= 16;
    }
  }
};

class Brick {
  constructor (x, y, color) {
    this._x = x;
    this._y = y;

    this._width = 64;
    this._height = 16;

    this._color = color;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  paint (ctx) {
    ctx.save();

    ctx.fillStyle = this._color;
    ctx.fillRect(this._x, this._y, this._width, this._height);

    ctx.restore();
  }
};

class Paddle {
  constructor (x, y) {
    this._x = x;
    this._y = y;

    this._width = 96;
    this._height = 16;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  move (offset) {
    this._x += offset;
  }

  paint (ctx) {
    ctx.save();

    ctx.fillStyle = 'midnightblue';
    ctx.fillRect(this._x, this._y, this._width, this._height);

    ctx.restore();
  } 
};

let breakIt = {
  _lastUpdate: null,

  _paused: false,

  _bricks: [],
  
  _paddle: null,

  _loop: function (ticks) {
    if (!this._startAt) {
      this._startAt = ticks;
    };

    this.update(ticks);
    this.paint();

    if (!this._paused) {
      this._tickHandler = requestAnimationFrame(this._loop.bind(this));
    }
  },

  movePaddle: function (offset) {
    if (!this._paused) {
      this._paddle.move(offset);
    };
  },

  paint: function () {
    // 取得能在 canvas 上繪圖的 context2d 物件
    let ctx = document.querySelector('canvas').getContext('2d');

    // 將圖紙填滿背景色
    ctx.fillStyle = 'mintcream';
    ctx.fillRect(0, 0, 640, 480);

    ctx.strokeStyle = 'slateblue';
    ctx.strokeRect(4, 4, 632, 472);

    // 繪出磚塊
    this._bricks.forEach(brick => {
      brick.paint(ctx);
    });
   
    // 繪出擊球板
    this._paddle.paint(ctx);

    // 繪球
    ball.paint(ctx);
  },

  pause: function () {
    this._paused = true;

    cancelAnimationFrame(this._tickHandler);
  },

  reset: function () {
    let width = 8;
    let height = 5;

    for (let x = 0; x < width; x ++) {
      for (let y = 0; y < height; y++) {
        this._bricks.push(new Brick(
          (x * 80) + 8,
          (y * 24) + 10,
          `rgb(${Math.floor(255 - 42.5 * x)}, ${Math.floor(255 - 42.5 * y)}, 0)`
        ));
      }
    }

    this._paddle = new Paddle(272, 454);

    this.paint();
  },

  start: function () {
    this._paused = false;
    this._lastUpdate = null;

    this._tickhandler = requestAnimationFrame(this._loop.bind(this));
  },

  update: function (ticks) {
    if (this._lastUpdate) {
      ball.update(ticks - this._lastUpdate);
    };

    this._lastUpdate = ticks;
  }
};

const gameFooter = () => {
  let footer = document.createElement('footer');
  footer.className = 'card-footer';

  const captions = ['開始', '暫停', '結束'];

  captions.forEach((text, idx) => {
    const btn = document.createElement('button');
    btn.className = 'ctrl-button';

    btn.textContent = text;
    btn.value = idx;

    switch (idx) {
      case 0:
        btn.addEventListener('click', e => {
          breakIt.start();
        });

        break;

      case 1:
      case 2:
        btn.addEventListener('click', e => {
          breakIt.pause();
        });

        break;
    }

    footer.appendChild(btn);
  });

  return footer;
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

  // 設定繪圖圖紙的寬高
  gameCanvas.width = 640;
  gameCanvas.height = 480;

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

  gameDesktop.appendChild(gameFooter());

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

  desktop.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        breakIt.movePaddle(-4);
        break;

      case 'ArrowRight':
        breakIt.movePaddle(4);
        break;

      default:
        console.log(`wrong key.`);
    };
  });

  breakIt.reset();
});

// index.js
