/**
 *  @file       binding.js
 *  @brief      The main entry of Binding.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       09/21/2017 created.
 *  @date       09/28/2018 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, © 2017-2018 Yiwei Chiao
 *  @details
 *
 *  The Binding's entry: main.
 */
'use strict';

const fs = require('fs');

/**
 * 接受一個 config 檔的名稱，傳回一個 binding 物件。
 *
 * @name config
 * @function
 * @param config - 設定檔 (configuration file) 檔名
 * @returns {Object}
 */

const getChapters = doc => {
  return fs.readdirSync(doc).filter(
    d => fs.statSync(doc + '/' + d).isDirectory()
  )
};

const book = '../doc';

const linkUrl = /\[([\w.]+)\]: *(https?:\/\/[\w-_.()#\/]+$)/;
const refUrl = /\[(\^[\w.]+)\]: *(https?:\/\/[\w-_.()#\/]+$)/;
const refTag = /(\[\^[\w.]+\])/g;
let inComments = false;
let isLF = false;

const urlLinks = {};
const urlRefs = {};
const refDefs = [];

const isCmtClosing = line => {
  return line.match(/-->$/);
}

const isCmtOpening = line => {
  return line.match(/^<!---/);
}

const isRefUrl = line => {
  let refDef = false;

  let ref = line.match(refUrl);

  if (ref) {
    urlRefs[ref[1]] = ref[2]

    refDef = true;
  }

  return refDef;
};

const isLinkUrl = line => {
  let refDef = false;

  let link = line.match(linkUrl);

  if (link) {
    urlLinks[link[1]] = link[2]

    refDef = true;
  }

  return refDef;
};

const removeDupRef = line => {
//  let tag = line.match(refTag);
  let txt = line;
  let tag = null;

  while ((tag = refTag.exec(line)) !== null) {
    if (refDefs.includes(tag[1])) {
      line = line.replace(refTag, '');
    }
    else {
      refDefs.push(tag[1]);
    }
  }

  return line;
};

const binding = chap => {
  let toc = JSON.parse(
    fs.readFileSync(book + '/' + chap + '/toc.json'),
  );
  
  let oName = book + '/' + chap + '/md/' + 'chapter_' + chap + '.md';

  try {
    fs.renameSync(oName, oName + '.old');
  }
  catch (e) {
    // old file not exist; do nothing.
  }

  const date = (new Date()).toISOString().replace(
    /(\d+)-(\d+)-(\d+).*/,
    "$2/$3/$1"
  );

  const comments = [
    '<!---\n',
    `  @file       chapter_${chap}.md\n`,
    `  @date       ${date} created.\n`,
    '  @copyright  CC-BY, (C) 2017 Yiwei Chiao\n',
    '  @detail\n',   
    '    This file is machine-generated. DONOT MODIFY IT DIRECTLY.\n',
    '-->\n',
  ]

  let f = fs.openSync(book + '/' + chap + '/md/chapter_' + chap + '.md', 'a');

  for (let line in comments) {
    fs.writeSync(f, comments[line], 'utf8');
  }

  toc.section.forEach(sec => {
    let txt = fs.readFileSync(book + '/' + chap + '/md/' + sec + '.md', 'utf8').split('\n');

    for (let line in txt) {
      if (inComments) {
        if (isCmtClosing(txt[line])) {
          inComments = false;
        }

        continue;
      }

      if (isCmtOpening(txt[line])) {
        if (!(isCmtClosing(txt[line]))) {
          inComments = true;
        }

        continue;
      }

      if (isLinkUrl(txt[line])) {
        continue;
      }

      if (isRefUrl(txt[line])) {
        continue;
      }

      if (isLF) {
        if (txt[line].length == 0) {
          continue;
        }
        else {
          isLF = false;
        }
      }

      let text = txt[line];

      if (text.length == 0) {
        isLF = true;
      }
      else {
        text = removeDupRef(text);
      }

      fs.writeSync(f, text + '\n', 'utf8');
    } // od
  });

  for (let key in urlLinks) {
    fs.writeSync(f, `[${key}]: ${urlLinks[key]}\n`, 'utf8');
  }

  for (let key in urlRefs) {
    fs.writeSync(f, `[${key}]: ${urlRefs[key]}\n`, 'utf8');
  }

  fs.writeSync(f, `\n<!--- chapter_${chap}.md -->`, 'utf8');

  fs.closeSync(f);
};

getChapters(book).forEach(chap => {
  binding(chap);
});

// binding.js
