/**
 *  @file       index.js
 *  @brief      The entry file of BreakIt.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       10/11/2018 created.
 *  @date       11/23/2018 last modified.
 *  @version    0.1.0
 *  @since      0.1.0
 *  @copyright  MIT, © 2018 Yiwei Chiao
 *  @details
 *
 *  The entry file of BreakIt.
 */
'use strict';

const DELTA_TIME = (1 / 60) * 1000;
const OFFSET = 2;
const STATE = {
  GAMING: 0,

  LEVEL_CLEAR: 1,

  GAME_OVER: 2
}

const LINE = {
  intersection: (x1, len1, x2, len2) => {
    return Math.min(x1 + len1, x2 + len2) - Math.max(x1, x2);
  }
};

class Rect {
  constructor(x = 0, y = 0, width = 1, height = 1) {
    this._x = x;
    this._y = y;

    this._width = width;
    this._height = height;
  }

  get x () {
    return this._x;
  }

  get y () {
    return this._y;
  }

  get width () {
    return this._width;
  }

  get height () {
    return this._height;
  }

  relocate(x, y) {
    this._x = x;
    this._y = y;
  }
};

class Ball {
  constructor(x, y, radius = 6) {
    this._x = x;
    this._y = y;

    this._radius = radius;
    this._diameter = 2 * radius;

    this._offX = -OFFSET;
    this._offY = OFFSET;
  }

  get x () {
    return this._x;
  }

  get y () {
    return this._y;
  }

  get r () {
    return this._radius;
  }

  get diameter () {
    return this._diameter;
  }

  get width () {
    return this._diameter;
  }

  get height () {
    return this._diameter;
  }

  collideWith(rect) {
    return (
      LINE.intersection(this.x, this.width, rect.x, rect.width) > 0 &&
      LINE.intersection(this.y, this.height, rect.y, rect.height) > 0
    );
  }

  paint(ctx) {
    ctx.save();

    ctx.fillStyle = 'red';

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
    ctx.closePath();

    ctx.fill();

    ctx.restore();
  }

  relocate(x, y) {
    this._x = x;
    this._y = y;
  }

  revertX () {
    this._offX = - this._offX;
  }

  revertY () {
    this._offY = - this._offY;
  }

  turnEast () {
    this._offX = OFFSET;
  }

  turnWest () {
    this._offX = -OFFSET;
  }

  turnNorth () {
    this._offY = -OFFSET;
  }

  turnSouth () {
    this._offY = OFFSET;
  }

  update(drifts) {
    this.relocate(this.x + this._offX, this.y + this._offY);
  }
};

class Brick {
  constructor (x, y, color) {
    this._x = x;
    this._y = y;

    this._width = 64;
    this._height = 16;

    this._border = [
      new Rect(this._x, this._y, this._width, 1),
      new Rect(this._x, this._y, 1, this._height),
      new Rect(this._x, this._y + this._height, this._width, 1),
      new Rect(this._x + this._width, this._y, 1, this._height),
    ];

    this._color = color;
  }

  get x () {
    return this._x;
  }

  get y () {
    return this._y;
  }

  get width () {
    return this._width;
  }

  get height () {
    return this._height;
  }

  get borderNorth () {
    return this._border[0]
  }

  get borderWest () {
    return this._border[1]
  }

  get borderSouth () {
    return this._border[2]
  }

  get borderEast () {
    return this._border[3]
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

    this._border = [
      new Rect(this._x, this._y, this._width, 1),
      new Rect(this._x, this._y, 1, this._height),
      new Rect(this._x, this._y + this._height, this._width, 1),
      new Rect(this._x + this._width, this._y, 1, this._height),
    ];
  }

  get x () {
    return this._x;
  }

  get y () {
    return this._y;
  }

  get width () {
    return this._width;
  }

  get height () {
    return this._height;
  }

  get borderNorth () {
    return this._border[0]
  }

  get borderWest () {
    return this._border[1]
  }

  get borderSouth () {
    return this._border[2]
  }

  get borderEast () {
    return this._border[3]
  }

  move (offset) {
    this.relocate(this.x + offset, this.y);
  }

  paint (ctx) {
    ctx.save();

    ctx.fillStyle = 'midnightblue';
    ctx.fillRect(this._x, this._y, this._width, this._height);

    ctx.restore();
  } 

  relocate (x, y) {
    this._x = x;
    this._y = y;

    this._border[0].relocate(this._x, this._y);
    this._border[1].relocate(this._x, this._y);
    this._border[2].relocate(this._x, this._y + this._height);
    this._border[3].relocate(this._x + this._width, this._y);
  }
};

class Window {
  constructor (width, height) {
    this._x = 0;
    this._y = 0;

    this._width = width;
    this._height = height;

    this._border = [
      new Rect(this._x, this._y, this._width, 12),
      new Rect(this._x, this._y, 12, this._height),
      new Rect(this._x, this._y + this._height, this._width, 12),
      new Rect(this._x + this._width, this._y, 12, this._height),
    ];
  }

  get x () {
    return this._x;
  }

  get y () {
    return this._y;
  }

  get width () {
    return this._width;
  }

  get height () {
    return this._height;
  }

  get borderNorth () {
    return this._border[0]
  }

  get borderWest () {
    return this._border[1]
  }

  get borderSouth () {
    return this._border[2]
  }

  get borderEast () {
    return this._border[3]
  }
};

class BreakIt {
  constructor () {
    this._width = 8;
    this._height = 5;

    this._bricks = [];

    for (let x = 0; x < this._width; x ++) {
      for (let y = 0; y < this._height; y++) {
        this._bricks.push(new Brick(
          (x * 80) + 8,
          (y * 24) + 10,
          `rgb(${Math.floor(255 - 42.5 * x)}, ${Math.floor(255 - 42.5 * y)}, 0)`
        ));
      }
    }

    this._ball = new Ball(320, 240);
    this._paddle = new Paddle(272, 454);

    this._score = 0;
    this._life = 3;
    this._gameState = STATE.GAMING;

    this._window = new Window(640, 480);
  }

  get bricks () {
    return this._bricks;
  }

  get paddle () {
    return this._paddle;
  }

  get paused () {
    return (this._lastUpdate == null);
  }

  set context (ctx) {
    this._ctx = ctx;
  }

  gameOver () {
    let ctx = this._ctx;

    ctx.save();
    
    ctx.font = '64px serif';
    ctx.fillStyle = 'red';
    ctx.fillText('G.a.m.e. O.v.e.r.!', 112, 200);

    ctx.restore();

    this._gameState = STATE.GAME_OVER;
  }

  _loop (ticks) {
    if (!this._startAt) {
      this._startAt = ticks;
    };

    this.update(ticks);

    this.paint();

    if (this._gameState == STATE.LOST_LIFE) {
      this._gameState = STATE.GAMING;

      this._life --;

      if (this._life == 0) {
        this.gameOver();

        this.pause();
      }
      else {
        this.reset();
      }
    }
    else if (this._gameState == STATE.LEVEL_CLEAR) {
      this.newLevel();

      this.reset();
    }

    this.status();

    if (!this.paused) {
      this._tickHandler = requestAnimationFrame(this._loop.bind(this));
    }
  }

  movePaddle (offset) {
    if (!this.paused) {
      this._paddle.move(offset);
    };
  }

  newLevel () {
    for (let x = 0; x < this._width; x ++) {
      for (let y = 0; y < this._height; y++) {
        this._bricks.push(new Brick(
          (x * 80) + 8,
          (y * 24) + 10,
          `rgb(${Math.floor(255 - 42.5 * x)}, ${Math.floor(255 - 42.5 * y)}, 0)`
        ));
      }
    }
  }

  paint () {
    let ctx = this._ctx;

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
    this._ball.paint(ctx);
  }

  pause () {
    this._lastUpdate = null;

    cancelAnimationFrame(this._tickHandler);
  }

  reset () {
    this._elapsed = 0;

    this._ball = new Ball(320, 240);
    this._paddle = new Paddle(272, 454);

    this._gameState = STATE.GAMING;

    this.paint();

    this.pause();
  }

  start () {
    this._tickhandler = requestAnimationFrame(this._loop.bind(this));
  }

  status () {
    document.getElementById('score').textContent = this._score;
    document.getElementById('ball-count').textContent = this._life;
    document.getElementById('brick-count').textContent = this._bricks.length;
  }

  update(ticks) {
    let lostLife = false;

    if (this._lastUpdate) {
      this._elapsed += (ticks - this._lastUpdate);

      while (this._elapsed > DELTA_TIME ) { // 1 / 60 ~= 16.66
        this._ball.update();

        // 如果球擊中 `遊戲視窗` 的 `下` 邊界
        if (this._ball.collideWith(this._window.borderSouth)) {
          this._gameState = STATE.LOST_LIFE;

          break;
        }

        // 如果球擊中 `遊戲視窗` 的 `上` 邊界
        if (this._ball.collideWith(this._window.borderNorth)) {
          this._ball.turnSouth();
        }

        // 如果球擊中 `遊戲視窗` 的 `左右` 邊界
        // 改變 `x` 軸的移動方向。
        if (this._ball.collideWith(this._window.borderEast)) {
          this._ball.turnWest();
        }

        if (this._ball.collideWith(this._window.borderWest)) {
          this._ball.turnEast();
        }

        // 檢查是否有擊中 `擊球板ˋ
        if (this._ball.collideWith(this._paddle)) {
          // 如果撞到 `擊球板` 的 `左右` 兩側，
          // 改變 `x` 軸的移動方向。
          if (this._ball.collideWith(this._paddle.borderEast)) {
            this._ball.turnEast();
          }

          if (this._ball.collideWith(this._paddle.borderWest)) {
            this._ball.turnWest();
          }

          // 如果撞到 `擊球板` 的 `上下` 兩側，
          // 改變 `y` 軸的移到方向。
          if (this._ball.collideWith(this._paddle.borderNorth)) {
            this._ball.turnNorth();
          }

          if (this._ball.collideWith(this._paddle.borderSouth)) {
            this._ball.turnSouth();
          }
        } 

        // 對所有的磚塊，進行 `碰撞檢查`
        for (let i = 0; i < this._bricks.length; i++) {
          let brick = this._bricks[i];

          // 檢查是否有擊中 `磚塊`
          if (this._ball.collideWith(brick)) {
            // `磚塊` 被擊中，將磚塊 `移除`
            this._bricks.splice(i, 1);

            // 增加分數
            this._score += 20;

            // 如果撞到 `磚塊` 的 `左右` 兩側，
            // 改變 `x` 軸的移動方向。
            if (
              this._ball.collideWith(brick.borderEast) ||
              this._ball.collideWith(brick.borderWest)
            ) {
              this._ball.revertX();
            } 
            
            // 如果撞到 `磚塊` 的 `上下` 兩側，
            // 改變 `y` 軸的移到方向。
            if (
              this._ball.collideWith(brick.borderNorth) ||
              this._ball.collideWith(brick.borderSouth)
            ) {
              this._ball.revertY();
            }

            // 破關?
            if (this._bricks.length == 0) {
              this._gameState = STATE.LEVEL_CLEAR;
            }

            break;
          }
        }

        this._elapsed -= DELTA_TIME;
      }
    };

    this._lastUpdate = ticks;
  }
};

const gameFooter = (breakIt) => {
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
        btn.addEventListener('click', e => {
          breakIt.pause();
        });

        break;

      case 2:
        btn.addEventListener('click', e => {
          breakIt.gameOver();
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

  let breakIt = new BreakIt();

  // 準備承載 *遊戲標題* (title) 的 HTML 元素
  let gameTitle = document.createElement('span');
  gameTitle.textContent = 'BreakIt!';

  // 準備承載 *球個數* 的 HTML 元素
  let ballPane = document.createElement('span');
  ballPane.className = 'float-right';
  ballPane.textContent = '剩下球數： '

  let ballCount = document.createElement('span');
  ballCount.textContent = '3';
  ballCount.id = 'ball-count';

  ballPane.appendChild(ballCount);

  // 準備承載 *磚塊個數* 的 HTML 元素
  let brickPane = document.createElement('span');
  brickPane.className = 'float-right';
  brickPane.textContent = '磚塊: ';

  let brickCount = document.createElement('span');
  brickCount.textContent = '20';
  brickCount.id = 'brick-count';

  brickPane.appendChild(brickCount);

  // 準備承載 *遊戲得分* 的 HTML 元素
  let scorePane = document.createElement('span');
  scorePane.className = 'float-right';
  scorePane.textContent = '目前得分： '

  let gameScore = document.createElement('span');
  gameScore.textContent = '200';
  gameScore.id = 'score';

  scorePane.appendChild(gameScore);

  // 準備承載 *遊戲時間* 的 HTML 元素
  let timerPane = document.createElement('span');
  timerPane.className = 'float-right';
  timerPane.textContent = '時間： '

  let timer = document.createElement('span');
  timer.id = 'timer';

  timerPane.appendChild(timer);

  // 準備承載 *遊戲版頭* (header) 的 HTML 元素
  let gameHeader = document.createElement('header');
  gameHeader.className = 'card-header';

  // 將 *遊戲標題* 放上 *遊戲版頭*
  gameHeader.appendChild(gameTitle);

  // 將 *剩餘球數* 放上 *遊戲版頭*
  gameHeader.appendChild(ballPane);

  // 將 *磚塊計數* 放上 *遊戲版頭*
  gameHeader.appendChild(brickPane);

  // 將 *遊戲得分* 放上 *遊戲版頭*
  gameHeader.appendChild(scorePane);

  // 將 *遊戲得分* 放上 *遊戲版頭*
  gameHeader.appendChild(timerPane);

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

  gameDesktop.appendChild(gameFooter(breakIt));

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
        breakIt.movePaddle(-7);
        break;

      case 'ArrowRight':
        breakIt.movePaddle(7);
        break;

      default:
        console.log(`wrong key.`);
    };
  });

  // 取得並設定能在 canvas 上繪圖的 context2d 物件
  breakIt.context = document.querySelector('canvas').getContext('2d');

  breakIt.reset();
});

// index.js
