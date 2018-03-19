const fs = require('fs');
const EOL = require('os').EOL;

const list = fs.readFileSync('./tmp').toString().split(EOL);

let result = [];

for(let k in list){
    let row = list[k].split('\t');
    result.push({
        id: row[0],
        name: row[1],
        mobile: row[2],
    });
    //break;
}
fs.writeFileSync('./list.json', JSON.stringify(result,null,2));