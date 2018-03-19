const request = require('request');
const lists = require('./list.json');
const apikey = "XX"
const fs = require('fs');

function postSms(text, mobile) {
    const url = '#';//"https://sms.yunpian.com/v2/sms/batch_send.json";
    const post_data = {
        'apikey': apikey,
        'mobile': mobile,
        'text': text,
    };
    
    return new Promise((resolved,rejected)=>{
        request.post(url, { form: post_data }, (err, httpResponse, body) => {
            if (err) {
                console.error('upload failed:', err);
                rejected(err);
            }
            //console.log('Upload successful!  Server responded with:', body);
            resolved('ok');
        });
    });
}
(async function(){
    let err = [];
    for (let k in lists) {
        let item = lists[k];
        let text = `【FCC成都】你报名的《Web前端大会》将于周日举行，记得准时参加~ 详情请点击: http://i.web-conf.tk/${item.id}`
        let r = await postSms(text, item.mobile);
        if(r!='ok'){
            err.push(item);
        }
        console.log(`${r} ; ${item.mobile}`);
    }
    fs.writeFileSync('./err.json', JSON.stringify(err,null,2));
})();