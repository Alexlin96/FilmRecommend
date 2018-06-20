import Vue from 'vue'
import VueRouter from 'vue-router'
import commonJS from '../common/common';
//路由跳转主要分为2个大部分  (1)前台=== index   （2）后台管理  ==== management
// 每个大部分下面有很多子级路由
Vue.use(VueRouter)
let router = new VueRouter({
    routes: [ {
        path: '/',
        redirect: '/index'
    },{
      path: '/index',
      component: resolve => require(['../view/frontend/index.vue'], resolve),
      name: '首页',
      meta: {
        showNav: true
      }
    },{
        path: '/scenicSpot',
        component: resolve => require(['../view/frontend/scenicSpot.vue'], resolve),
        name: '精彩电影',
        meta: {
            showNav: true
        }
    },{
        path: '/route',
        component: resolve => require(['../view/frontend/route.vue'], resolve),
        name: '电影查询',
        meta: {
            showNav: true
        }
    },{
	    path: '/recommend',
	    component: resolve => require(['../view/frontend/recommend.vue'], resolve),
	    name: '电影推荐',
	    meta: {
		    showNav: true
	    }
    },{
	    path: '/food',
	    component: resolve => require(['../view/frontend/food.vue'], resolve),
	    name: '用户',
	    meta: {
		    showNav: true
	    }
    },{
	    path: '/likeList/:id',
	    component: resolve => require(['../view/frontend/likeList.vue'], resolve),
	    name: '收藏列表',
	    meta: {
		    showNav: true
	    }
    },{
        path: '/book/:id',
        component: resolve => require(['../view/frontend/book.vue'], resolve),
        name: '订票',
        meta: {
            showNav: true
        }
    },{
        path: '/pay/:data',
        component: resolve => require(['../view/frontend/pay.vue'], resolve),
        name: '支付',
        meta: {
            showNav: true
        }
    },{
        path: '/management',
        component: resolve => require(['../view/management/main.vue'], resolve),
        children:[{
            path: 'source',
            component: resolve => require(['../view/management/source.vue'], resolve),
            name: '电影管理',
            meta: {
                showNav: false
            }
        },{
            path: 'user',
            component: resolve => require(['../view/management/user.vue'], resolve),
            name: '用户管理',
            meta: {
                showNav: false
            }
        },{
            path: 'screenings',
            component: resolve => require(['../view/management/screenings.vue'], resolve),
            name: '场次管理',
            meta: {
                showNav: false
            }
        },{
            path: 'message',
            component: resolve => require(['../view/management/message.vue'], resolve),
            name: '影厅管理',
            meta: {
                showNav: false
            }
        },],
        name: 'management',
        meta: {
            showNav: false
        }
    },{
        path: '/login',
        component: resolve => require(['../view/management/login.vue'], resolve),
        name: '登录',
        meta: {
            showNav: true
        }
    },{
        path: '/register',
        component: resolve => require(['../view/management/register.vue'], resolve),
        name: '注册',
        meta: {
            showNav: true
        }
    },{
        path: '*',
        redirect: '/index'
    }]
})

// 路由钩子，判断是否登录，如果没有登录，就返回登录页面
// 路由守卫 to：即将要进入的目标 路由对象   from：当前导航正要离开的路由  next：
// router.beforeEach((to, from, next) => {
//     let pattern=new RegExp("/management/");
//     if(pattern.test(to.path)){
//         commonJS.deviceType=2;
//     }else{
//         commonJS.deviceType=1;
//     }
//     next();
// });

export default router
