
const gd = require('node-gd');
const path = require('path');
const pic = path.resolve('./pic.jpg');
const font = path.resolve('./font.tff');
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
        
        for(let k in chs){
        
          if(/[a-zA-Z\s]/.test(chs[k])){
            length += 0.4;
          }else{
            length += 1;
          }
        }
        
        let fontSize = Number.parseInt(180/length);

        img.stringFT(txtColor, __dirname + '/font.ttf', fontSize, 0, 420, 1040, name);
        img.saveJpeg(__dirname +'/pic/' + id + '.jpg', (err) => {
          img.destroy();
          resolved(__dirname +'/pic/' + id + '.jpg');
        });
      }
    });
  });
}

module.exports = render;