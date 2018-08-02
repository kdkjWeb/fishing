import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/Login'],resolve)
    },{
      path: '/',
      component: resolve => require(['@/components/Home.vue'],resolve),
      redirect: '/circle',
      children: [
        {
          path: '/index',
          name: 'index',
          component: resolve => require(['@/pages/Index.vue'],resolve) 
        },{
          path: '/circle',
          name: 'circle',
          component: resolve => require(['@/pages/Circle.vue'],resolve)
        },{
          path: '/post',
          name: 'post',
          component: resolve=>require(['@/pages/Post.vue'],resolve)
        },{
          path: '/video',
          name: 'video',
          component: resolve=>require(['@/pages/Video.vue'],resolve)
        },{
          path: '/rating',
          name: 'rating',
          component: resolve=>require(['@/pages/Rating.vue'],resolve)
        },{
          path: '/fishingGround',
          name: 'fishingGround',
          component: resolve=>require(['@/pages/FishingGround.vue'],resolve)
        },{
          path: '/setting',
          name: 'setting',
          component: resolve=>require(['@/pages/Setting.vue'],resolve)
        },{
          path: '/user',
          name: 'user',
          component: resolve=>require(['@/pages/user.vue'],resolve)
        },{
          path: '/area',
          name: 'area',
          component: resolve=>require(['@/pages/Area.vue'],resolve)
        }
      ]
    }
  ]
})



// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
  store.commit('setToken', window.sessionStorage.getItem('token'))
}


