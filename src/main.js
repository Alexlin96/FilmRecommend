import Vue from 'vue'
import commonJS from './common/common';


//引入mintUI
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'

//引入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';

//引入we-vue
// import WeVue from 'we-vue'
// import 'we-vue/lib/style.css'

import TableComponent from './components/table'


//Vue.use(MintUI);

Vue.use(iView);

//Vue.use(WeVue);

Vue.component('table-component',TableComponent);

//过滤器
Vue.filter('dateFormat', function (value) {
    var date = new Date(value);
    return commonJS.formatDate(date, "yyyy-MM-dd");
});

Vue.filter('datetimeFormat', function (value) {
	var date = new Date(value);
	return commonJS.formatDate(date, "yyyy-MM-dd hh:mm:ss");
});

Vue.filter('imagePath', function (value) {
    if(value){
        return commonJS.basePath+value;
    }else{
        return require('./assets/frontend/common/noImage.png');
    }

});



import App from './App.vue'
import router from './router/index'
import axios from 'axios'
Vue.prototype.$http = axios; //把axios对象挂到Vue原型上
axios.defaults.withCredentials = true

//import VueAMap from 'vue-amap';

// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//     key: 'aac5e17ea31c77f34e07e8d0d3355a5c',
//     plugin: ['AMap.Geolocation','AMap.Geocoder','AMap.Walking','AMap.Driving']
// });

Vue.config.productionTip = false

//Vue实例化  
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
