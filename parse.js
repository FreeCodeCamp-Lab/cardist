const fs = require('fs');
const EOL = require('os').EOL;

const list = fs.readFileSync('./tmp.txt').toString().split(EOL);

let result = [];
let map = {};

for (let k in list) {
    let row = list[k].split('\t');
    if (map[row[2]] === true) {
        continue;
    }
    map[row[2]] = true;
    result.push({
        id: row[0],
        name: row[1],
        mobile: row[2],
    });
    //break;
}
fs.writeFileSync('./list.json', JSON.stringify(result, null, 2));