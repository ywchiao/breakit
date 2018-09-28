<!---
  @file       tools.md
  @author     Yiwei Chiao (ywchiao@gmail.com)
  @date       09/21/2017 created.
  @date       09/28/2018 last modified.
  @version    0.1.0
  @copyright  CC-BY, © 2017-2018 Yiwei Chiao
-->

# 開發工具

  [BreakIt][][^breakit] 使用
  [Node.js][nodejs][^nodejs] 撰寫。[Node.js][nodejs] 本身是一個龐雜的
  生態系 (eco-system)，如果之前沒有開發過 [Node.js][nodejs] 的專案，我們
  需要先安排好它的工作環境。基本上，我們會需要以下的工具 (tools)：

## [Node.js][nodejs]:

  Javascript/[ECMAScript][][^ECMAScript] 的工作的運作引擎。

## [Babel][babeljs][^babeljs]:

  Javascript 的 transpiler；Javascript 在 2009~2011 年間迎來了期待
  已久的真正意義上的標準化改變，但是既存的程式需要維護，瀏覽器 (browser) 的
  支援需要時間趕上。於是我們需要一個能將以新版 Javascript
  ([ECMAScript][] 6/7) 語言撰寫的程式**轉譯** (transpile)
  成瀏覽器/[Node.js][nodejs] 能理解的 Javascript 的工具。

  [Babel][babeljs] 就是這樣的一個工具。

## [rollup.js][rollupjs][^rollupjs]:

  [rollup.js][rollupjs] 是一個能將多個 .js 檔案打包 (pack) 成單一檔案，
  節省瀏覽器下載時間的工具；類似的工具早期有 [browserify][][^browserify]，
  近期當紅有 [webpack][][^webpack] 等。

  [BreakIt][breakit] 採用 [rollup.js][rollupjs]。

  開始時提過了，[Node.js][nodejs] 擁有一個龐雜的**生態系**，不同的問題常常
  都有多個不同的解決方案可供選擇，沒有對錯，只是要小心亂花迷眼。

## [git][][^git]:

  [git][] 是 [Linus Torvalds][torvalds][^torvalds] (是，就是 Linux
  Kernel 的原作者) 給現代的程式設計師 (programmer) 的另一個禮物；一個功能
  強大而又易用的**版本管理系統** ([Version Control System][vcs][^vcs])。

  在 [BreakIt][breakit] 專案裡，我們將使用 [git][] 來管控專案的發展。

## [GitHub][github][^github]:

  [GitHub][github] 不是一個工具，它是一個網站，一個雲服務。

  顧名思義，[GitHub][github] 是以 [git][] 為基礎架設的網路服務；
  無論如何，它是目前最熱的開源軟體集散地；包括**臉書** (Facebook)，
  **領英** (Linkedin)，**亞馬遜** (Amazon)，**谷歌** (Google)，
  所謂的 *FLAG* 就業首選，和**蘋果** (Apple)，**微軟** (Microsoft)
  都將它們開源的軟體放在 [GitHub][github] 上，就可以知道它的熱門程度。

  對程式設計師而言，因為 [GitHub][github] 承載了大量的開源專案，所以已成為
  學習，分享，交流，認識世界同時也被世界看到的場域。所以，儘早加入這個程式設計
  師的社群網絡，對程式設計師的職涯發展絶對是正向的影響。

  [BreakIt][breakit] 的源碼當然也放在 [GitHub][github] 上。
  對開源軟體而言，[GitHub][github] 的服務是**免費** 的；而我們的練習專案
  當然是開源的。所以實在沒有理由不去登錄一個 [GitHub][github] 的帳號。

  隨著專案的進展，我們也將慢慢地熟悉 [git][]/[GitHub][github] 的使用。

## [Atom][atom][^atom] (選擇性):

  [Atom][atom] 是 [GitHub][github] 推出的，以 [Node.js][nodejs] 打造的開源
  文字編輯器 (editor)；v1.21 版之後，更和 Facebook 合作將它擴張成一個完整的
  [IDE][ide][^ide]。

  關於 [Node.js][nodejs]/Javascript 可以作些什麼，[Atom][atom] 作了一個強而
  有力的見証；類似的，微軟 (Microsoft) 推出了以
  [Node.js][nodejs]/[TypeScript][typescript][^typescript]
  (微軟版 Javascript) 開發的 [VS Code][vscode][^vscode]。

## [terser][][^terser] (選擇性):

  [terser][] 是以 Javascript 撰寫的 Javascript 程式碼混淆工具，
  最小化工具，壓縮工具，最佳化工具。

  因為瀏覽器端執行的 Javascript 程式需要由伺服端下載，所以程式的大小愈小愈好，
  如此可以減少網路流量的使用，加快下載速度。[terser][] 就是為這個目的
  設計的工具，透過移除不會使用到的程式碼，變數改名，程式碼壓縮等動作，產生的結
  果和原始輸入可以有三到四倍的差異。

[atom]: https://atom.io
[babeljs]: https://babeljs.io
[breakit]: https://github.com/ywchiao/breakit
[browserify]: http://browserify.org
[ECMAScript]: https://en.wikipedia.org/wiki/ECMAScript
[git]: https://git-scm.com
[github]: https://github.com
[ide]: https://en.wikipedia.org/wiki/Integrated_development_environment
[nodejs]: https://nodejs.org
[rollupjs]: https://rollupjs.org
[terser]: https://github.com/terser-js/terser
[torvalds]: https://en.wikipedia.org/wiki/Linus_Torvalds
[typescript]: https://www.typescriptlang.org
[vcs]: https://en.wikipedia.org/wiki/Version_control
[vscode]: https://github.com/Microsoft/vscode
[webpack]: https://webpack.github.io

[^atom]: https://atom.io
[^babeljs]: https://babeljs.io
[^breakit]: https://github.com/ywchiao/breakit
[^browserify]: http://browserify.org
[^ECMAScript]: https://en.wikipedia.org/wiki/ECMAScript
[^git]: https://git-scm.com
[^github]: https://github.com
[^ide]: https://en.wikipedia.org/wiki/Integrated_development_environment
[^nodejs]: https://nodejs.org
[^rollupjs]: https://rollupjs.org
[^terser]: https://github.com/terser-js/terser
[^torvalds]: https://en.wikipedia.org/wiki/Linus_Torvalds
[^typescript]: https://www.typescriptlang.org
[^vcs]: https://en.wikipedia.org/wiki/Version_control
[^vscode]: https://github.com/Microsoft/vscode
[^webpack]: https://webpack.github.io

<!--- tools.md -->
