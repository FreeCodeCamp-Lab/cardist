const start = Date.now();
const fs = require('fs');
const EOL = require('os').EOL;
const render = require('./render');

let id = 0;

const result = require('./list.json')
async function make() {
    for(let k in result){
        await render(result[k].name,result[k].id);
        console.log(result[k].name);
    }
}

make().then((v)=>{
    console.log('Time Used: '+(Date.now()-start)+' ms');
}).catch((v)=>{
    console.log(v);
});