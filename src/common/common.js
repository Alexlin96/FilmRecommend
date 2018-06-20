let deviceType=1,
    //uploadPath='http://118.24.85.14:8080/fooSystem/',
    uploadPath='http://localhost:8088/fooSystem/',
    basePath=uploadPath+"attachments/";
//时间格式转换 
function formatDate(timestamp, fmt) {
    var date=new Date(timestamp);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export default {
    deviceType:deviceType,
    basePath:basePath,
    uploadPath:uploadPath,
    formatDate:formatDate,
};