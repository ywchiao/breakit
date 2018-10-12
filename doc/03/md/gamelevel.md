<!---
  @file       intro.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       12/15/2017 created.
  @date       10/11/2018 last modified.
  @version    0.2.0
  @since      0.1.0
  @copyright  CC-BY, © 2017-2018 Yiwei Chiao
-->

# [Canvas][mdnCanvas] 繪圖

```javascript
'use strict';

/**
 * sokoban 關卡描述
 *
 *  #    牆壁 (wall)
 *  @    玩家 (player)
 *  $    箱子 (box)
 *  .    目標點 (goal)
 *  +    玩家站在目標點上 (player on goal square)
 *  *    箱子在目標點上 (box on goal square)
 *  空白 地板 (floor)
 */
let levels = {
  'level_0': [
    "############",
    "#         .#",
    "#          #",
    "#          #",
    "#   ####   #",
    "#          #",
    "#          #",
    "#    $     #",
    "#    @     #",
    "#          #",
    "#          #",
    "############"
  ],

  'level_1': [
     "------------",
     "------------",
     "--#######---",
     "--# ..$ #---",
     "--# # $ #---",
     "--# # # #---",
     "--# $@# #---",
     "--#.$   #---",
     "--#.#####---",
     "--###-------",
     "------------",
     "------------"
   ],
};

/**
 * 準備繪圖用的 sprites。
 *
 * @returns sprites 集合物件。
 */
let sprites = ((spriteSheet) => {
  let baseX = 0;
  let baseY = 6 * 64;

  let tileset = new Image();
  tileset.src = spriteSheet;

  let tile = (tileset, sx, sy, ctx) => {
    ctx.drawImage(
      tileset,
      sx, sy, 32, 32,
      0, 0, 32, 32
    );
  };

  return {
    box: tile.bind(null, tileset, baseX, baseY),
    boxOnGoal: tile.bind(null, tileset, baseX + 32, baseY),
    wall: tile.bind(null, tileset, baseX + 64, baseY),

    floor: tile.bind(null, tileset, baseX, baseY + 32),
    goal: tile.bind(null, tileset, baseX + 32, baseY + 32),
    grass: tile.bind(null, tileset, baseX + 64, baseY + 32),

    faceRight: tile.bind(null, tileset, baseX, baseY + 64),
    faceDown: tile.bind(null, tileset, baseX + 32, baseY + 64),

    faceUp: tile.bind(null, tileset, baseX, baseY + 96),
    faceLeft: tile.bind(null, tileset, baseX + 32, baseY + 96),
  };
})('SokobanClone_byVellidragon.png');

/**
 * 依遊戲狀態，繪出盤面
 *
 * @param 'ctx' : 繪圖 context 物件
 * @returns {undefined}
 */
let drawGameBoard = (ctx, gameState) => {
  let height = gameState.level.length;

  for (let x = 0; x < height; x ++) {
    for (let y = 0; y < height; y ++) {
      ctx.save();
      ctx.translate(32*x, 32*y);

      switch (gameState.level[y].charAt(x)) {
        case '#': 
          sprites.wall(ctx);

          break;

        case '$': 
          sprites.box(ctx);

          break;

        case '@':
          sprites.floor(ctx);
          sprites.faceUp(ctx);

          break;

        case ' ':
          sprites.floor(ctx);

          break;

        case '.':
          sprites.goal(ctx);

          break;

        case'*':
          sprites.boxOnGoal(ctx);

          break;

        case'+':
          sprites.goal(ctx);
          sprites.faceUp(ctx);

          break;

        case'-':
          sprites.grass(ctx);

          break;

        default:
          console.log('Wrong map data');
      }

      ctx.restore();
    };
  };
};

/**
 * sokoban 程式進入點
 *
 * @callback
 * @param 'load' : DOM 事件名
 * @returns {undefined}
 */
window.addEventListener('load', () => {
  console.log("Sokoban.js loaded");

  let gameTitle = document.createElement('span');
  gameTitle.textContent = 'Sokoban';

  let gameHeader = document.createElement('header');
  gameHeader.className = 'card_header';

  gameHeader.appendChild(gameTitle);

  let sokobanCanvas = document.createElement('canvas');
  let ctxPaint = sokobanCanvas.getContext('2d');

  // 設定繪圖圖紙的寬高
  sokobanCanvas.width = 32*12
  sokobanCanvas.height = 32*12;

  // 將圖紙埴滿背景色
  ctxPaint.fillStyle = 'mintcream';
  ctxPaint.fillRect(0, 0, sokobanCanvas.width, sokobanCanvas.height);

  // 準備一支可以畫 _斷續線_ 的畫筆
  ctxPaint.strokeStyle = 'black';
  // 斷續線由連續 4px，再空白 4px構成
  ctxPaint.setLineDash([4, 4]);

  // 開始記録格線的 paths
  ctxPaint.beginPath();

  // 畫 12 條鉛直斷續線
  for (var c = 1; c < 12; c ++) {
    ctxPaint.moveTo(c * 32, 0);
    ctxPaint.lineTo(c * 32, 32*12);
  }

  // 畫 12 條水平斷續線
  for (var r = 1; r < 12; r ++) {
    ctxPaint.moveTo( 0, r * 32);
    ctxPaint.lineTo(640, r * 32);
  }

  // 繪出格線
  ctxPaint.stroke();

  let sokobanBoard = document.createElement('div');
  sokobanBoard.style.gridArea = '1 / 2 / 4 / 5';

  sokobanBoard.appendChild(sokobanCanvas);

  let gameBoard = document.createElement('article');
  gameBoard.className = 'card_content';

  gameBoard.appendChild(sokobanBoard);

  let gameDesktop = document.createElement('section');
  gameDesktop.className = 'card';

  gameDesktop.appendChild(gameHeader);
  gameDesktop.appendChild(gameBoard);

  let desktop = document.querySelector('.site_body')
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
    document.getElementById('cursor_x').textContent = e.clientX;
    document.getElementById('cursor_y').textContent = e.clientY;
  });

  drawGameBoard(ctxPaint, { level: levels.level_0 });
});
```

[chrome]: https://www.google.com.tw/chrome
[firefox]: https://www.mozilla.org/zh-TW/firefox/
[jade]: http://jade-lang.com/
[jinja]: http://jinja.pocoo.org/
[mdnCanvas]: https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API
[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[mdnDOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[mdnHTML5]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[mdnJavaScript]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[mdnSVG]: https://developer.mozilla.org/zh-TW/docs/Web/SVG
[mdnXML]: https://developer.mozilla.org/en-US/docs/XML_introduction
[nodejs]: https://nodejs.org
[PHP]: https://secure.php.net/
[Python]: https://www.python.org/
[Ruby]: https://www.ruby-lang.org/zh_tw/
[sokoban]: https://github.com/ywchiao/sokoban.git
[twig]: https://twig.symfony.com/
[wikiERuby]: https://en.wikipedia.org/wiki/ERuby
[wikiJSP]: https://en.wikipedia.org/wiki/JavaServer_Pages
[wikiTemplatEngine]: https://en.wikipedia.org/wiki/Template_processor

<!-- intro.md -->
