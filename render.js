
const gd = require('node-gd');
const path = require('path');
const pic = path.resolve('./react.jpeg');
const fs = require('fs');

async function render(name, id) {
  name = decodeURIComponent(name);
  return new Promise((resolved, rejected) => {

    gd.openJpeg(pic, (err, img) => {
      if (err) {
        resolved(error.OPEN_FILE_ERROR);
      } else {
        let txtColor = img.colorAllocate(255, 255, 255);
        let x = 420;
        let length = 0;
        let chs = name.split('')

        for (let k in chs) {
          //英文字符算 0.55
          if (/[a-zA-Z\s]/.test(chs[k])) {
            length += 0.55;
          } else {
            length += 1;
          }
        }
        //计算出字号
        let fontSize = Number.parseInt(180 / length);

        //计算出左边距
        let xOffset = Number.parseInt(530 - fontSize * (chs.length / 2)) - 20;
        xOffset = (xOffset < 420) ? 420 : xOffset;
      
      
        img.stringFT(txtColor, __dirname + '/font_react2.ttf', fontSize, 0, xOffset, 1110, name);
        img.saveJpeg(__dirname + '/pic/' + id + '.jpg', (err) => {
          img.destroy();
          resolved(__dirname + '/pic/' + id + '.jpg');
        });
      }
    });
  });
}

module.exports = render;