<!---
  @file       object.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       11/01/2018 created.
  @date       11/01/2018 last modified.
  @version    0.1.0
  @since      0.1.0
  @copyright  CC-BY, © 2018 Yiwei Chiao
-->

## [JavaScript][mdnJavaScript] 的**物件** (*object*)

  先看遊戲內用來擊落磚塊的**球** (*ball*) 的程式碼，共 `44` 行：

```javascript
 1. let ball = {
 2.   _elapsed: 0,
 3.
 4.   x: 320,
 5.
 6.   y: 240,
 7.
 8.   offX: -2,
 9.
10.   offY: 2,
11.
12.   paint: function (ctx) {
13.     ctx.save();
14.
15.     ctx.fillStyle = 'red';
16.
17.     ctx.beginPath();
18.     ctx.arc(this.x, this.y, 6, 0, 2 * Math.PI, true);
19.     ctx.closePath();
20.
21.     ctx.fill();
22.
23.     ctx.restore();
24.   },
25.
26.   update: function (drifts) {
27.     this._elapsed += drifts;
28.
29.     while (this._elapsed > 16) {
30.       this.x += this.offX;
31.       this.y += this.offY;
32.
33.       if (this.x < 20 || this.x > 620) {
34.         this.offX = - this.offX;
35.       }
36.
37.       if (this.y < 20 || this.y > 460) {
38.         this.offY = - this.offY;
39.       }
40.
41.       this._elapsed -= 16;
42.     }
43.   }
44. };
```

  這 `44` 行程式碼建立了一個**物件實體** (*object instance*)，並可
  以利用變數 `ball` 來存取這個物件實體 (*instance*)。

### Object literal

  先將 `44` 行程式碼簡化成如下兩行：

```JavaScript
 1. let ball = {
      ...
44. };
```

  上面的程式碼建立了一個 [JavaScript][mdnJavaScript] 的**物件**
  (*object*)，同時將這個物件的**參考** (*reference*)**指定**
  (*assign*) 給同時宣告的變數 *ball* 儲存。

  具體的說，在 [JavaScript][mdnJavaScript] 裡，除了數字 (如
  `1`, `3.1415` 等) 之類的純量 (scalar) 外，**所有**的程式元素都是
  **物件** (*object*)，包括**函數** (*function*) 都是物件。

  最簡單建構一個物件的方法是寫 `{}`，然後將它指定給某個變數，如前
  所示。

  這種建構物件的方法，稱為 *object literals*。*Object literal* 的
  優點是寫完了立刻可以用，不必另外再去呼叫**建構函數** (*constructor*)
  來建立物件**實體** (instance)。

  相對的，除非另外處理，否則利用 *object literal* 建立的物件實體
  (*instance*) 傾向就是這**唯一一個**實體；程式並不需要第二個或更
  多的實體存在。

### Object properties

  `{}` 只定義了一個**空**物件，因為在 `{` 和 `}` 之間，沒有寫任何
  東西。要讓 `{}` 物件有作用，必需替它加上一些**物件屬性**
  (*object property*)。*Object literal* 裡的**屬性** (*property*) 是
  一個用 `:` 隔開的 `key: value` 配對 (*pair*)；不同的**屬性**
  (*property*) 間再利用 `,` 分隔；如下所示：

```javascript
 1. let ball = {
 2.   _elapsed: 0,
 3.
 4.   x: 320,
 5.
 6.   y: 240,
 7.
 8.   offX: -2,
 9.
10.   offY: 2,
11.
12.   paint: function (ctx) {
        ...
24.   },
25.
26.   update: function (drifts) {
        ...
43.   }
44. };
```

  *ball* 物件定義 `_elapsed`, `x`, `y`, ..., `update` 等 7 (七) 個
  屬性。

  而因為 [JavaScript][mdnJavaScript] 裡，所有元素
  (除了**純量** *scalar*)，全部都是**物件**；所以不像 `C++/C#/Java`
  等語言，物件的內部成員有分**屬性** (*property*)和**方法** (*method*)；
  [JavaScript][mdnJavaScript] 物件的內部成員全部都只有：
  **屬性** (*property*)；只不過某些屬性**剛好**是**函數**，所以可以
  被呼叫執行而已。如同 `ball` 裡的 `paint` 和 `update` 屬性。

### Object properties 存取

  物件屬性的存取和其它語言相同，利用 `.` 運算子；

```JavaScript
  ball.x = 10;
```

  如果那個屬性值是個函數物件，而且要呼叫執行，就和其它語言呼叫物件
  方法相同，使用 `()` 運算子：

```JavaScript
  ball.paint();
```

### Object properties 存取控制

  [JavaScript][mdnJavaScript] 的**物件屬性** (object property) 全部
  都是**公開** (*public*) 的；不像 `C++/C#/Java` 有
  `public/protected/private` 之類的存取控制關鍵字。

  有時為了備忘或作警示之用，會在屬性名稱前加上 `_` 符號，指出這個
  屬性是為了物件**內部使用**；不應在物件外直接存取。如程式碼列表裡
  的第 2 行：

```JavaScript
 2.   _elapsed: 0,
```

  但那純粹是程式碼寫作的一種**慣例** (*convention*)；沒有任何語言
  層級的強制力。

[github]: https://github.com
[mdnCanvas2D]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
[mdnCSS]: https://developer.mozilla.org/en-US/docs/Web/CSS
[mdnDOM]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[mdnHTML5]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[mdnJavaScript]: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript
[mdnSVG]: https://developer.mozilla.org/kab/docs/Web/SVG
[mdnWebGL]: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
[breakit]: https://github.com/ywchiao/breakit.git

<!-- object.md -->
