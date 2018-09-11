// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;

import VueAMap from 'vue-amap'
//地图
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'ca208937a063f6cb5e5b4acb3f44c505',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
});



// import '@/assets/reset.css'    //重置样式公共文件

//引用阿里图标
// import '@/assets/font/iconfont.css'

//封装axios的get和post方法

import Server from './server/index.js'
Vue.prototype.$get = Server.get;
Vue.prototype.$post = Server.post;
// Vue.prototype.$export = Server.exported;


import store from './store/store'

import 'babel-polyfill'

//路由拦截
router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){
    next();
  }else{
    if(store.state.token){
      next()
    }else{
      next({path: '/login'});
    }
  }
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
