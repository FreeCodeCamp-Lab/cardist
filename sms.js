const request = require('request');
const lists = require('./list.json');
const smsConfig = require('./sms_config');
const apikey = smsConfig.APP_KEY;
const fs = require('fs');


function postSms(text, mobile) {
    const url = smsConfig.URL;
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
        let text = `【FCC成都】《React技术专场活动》将于本月31号周六举行，记得准时参加~详情点击:http://i.web-conf.tk/${item.id}`
        // console.log(text.length);
        let r = await postSms(text, item.mobile);
        if(r!='ok'){
            err.push(item);
        }
        console.log(`${r} ;${item.id}; ${item.mobile}`);
    }
    fs.writeFileSync('./err.json', JSON.stringify(err,null,2));
})();