import axios from 'axios';
import commonJS from '../common/common';
import {Toast} from 'we-vue';
//baseURL:基础url前缀
const baseURL=commonJS.uploadPath;
let requestObj=axios.create({
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: baseURL,

  // `headers` are custom headers to be sent
  // headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 10000,
  withCredentials:true,
});

// 拦截request
requestObj.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 拦截响应response，并做一些错误处理
requestObj.interceptors.response.use(function (response) {
   var code=response.data.code;
   //未登录则返回登录界面
   if(code=='10002'){
	   var commonPath=window.location.href.replace(window.location.hash,'#/login');
	   window.location.href=commonPath;
   }
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

//axios请求
function request(options){
    requestObj.request({
      // `url` is the server URL that will be used for the request
      url:options.url,

      // `method` is the request method to be used when making the request
      method: options.method, // default
      params:options.params,
    }).then(function (response){
        var code=response.data.code;
        //成功 20000
        if(code=='20000'){
            options.success&&options.success(response);
        }else{//失败
            Toast(response.data.message);
        }
    }).catch(function (err){
        console.log(err);
    });
}

export default request;
