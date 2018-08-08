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
        },{
          path: '/MineCollection',
          name: 'MineCollection',
          component: resolve=>require(['@/pages/MineCollection.vue'],resolve)
        },{
          path: '/JoinCircle',
          name: 'JoinCircle',
          component: resolve=>require(['@/pages/JoinCircle.vue'],resolve)
        },{
          path: '/Visitorsrecord',
          name: 'Visitorsrecord',
          component: resolve=>require(['@/pages/Visitorsrecord.vue'],resolve)
        },{
          path: '/Minefollow',
          name: 'Minefollow',
          component: resolve=>require(['@/pages/Minefollow.vue'],resolve)
        },{
          path: '/BeenFishGround',
          name: 'BeenFishGround',
          component: resolve=>require(['@/pages/BeenFishGround.vue'],resolve)
        },{
          path: '/SignIn',
          name: 'SignIn',
          component: resolve=>require(['@/pages/SignIn.vue'],resolve)
        },{
          path: '/SignUser',
          name: 'SignUser',
          component: resolve=>require(['@/pages/SignUser.vue'],resolve)
        },{
          path: '/Wallet',
          name: 'Wallet',
          component: resolve=>require(['@/pages/Wallet.vue'],resolve)
        },{
          path: '/GoldNotes',
          name: 'GoldNotes',
          component: resolve=>require(['@/pages/GoldNotes.vue'],resolve)
        },{
          path: '/IntegralRecord',
          name: 'IntegralRecord',
          component: resolve=>require(['@/pages/IntegralRecord.vue'],resolve)
        },{
          path: '/IntegralRule',
          name: 'IntegralRule',
          component: resolve=>require(['@/pages/IntegralRule.vue'],resolve)
        },{
          path: '/PostCircle',
          name: 'PostCircle',
          component: resolve=>require(['@/pages/PostCircle.vue'],resolve)
        },{
          path: '/WaterLevel',
          name: 'WaterLevel',
          component: resolve=>require(['@/pages/WaterLevel.vue'],resolve)
        },{
          path: '/WaterSituation',
          name: 'WaterSituation',
          component: resolve=>require(['@/pages/WaterSituation.vue'],resolve)
        },{
          path: '/RechargeRecord',
          name: 'RechargeRecord',
          component: resolve=>require(['@/pages/RechargeRecord.vue'],resolve)
        },{
          path: '/CommentReply',
          name: 'CommentReply',
          component: resolve=>require(['@/pages/CommentReply.vue'],resolve)
        },{
          path: '/GiveUp',
          name: 'GiveUp',
          component: resolve=>require(['@/pages/GiveUp.vue'],resolve)
        },{
          path: 'Reward',
          name: 'Reward',
          component: resolve=>require(['@/pages/Reward.vue'],resolve)
        }
      ]
    }
  ]
})



// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('token')) {
  store.commit('setToken', window.sessionStorage.getItem('token'))
}


