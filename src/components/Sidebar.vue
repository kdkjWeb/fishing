<!--左侧菜单栏组件-->
<template>
    <div :class="collapse ? 'sidebar_collapse':'sidebar'">
        <!-- start菜单栏是否折叠按钮 -->
        <div class="slide">
            <span class="iconfont icon-webicon03-copy" @click="colapaseChange"></span>
        </div>
        <!-- end菜单栏是否折叠按钮 -->

        <!-- start菜单栏 -->
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" :collapse="collapse" :collapse-transition="false" router  background-color="#42475b" text-color="#fff">
            <template v-for="item in routerItem">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                      <template slot="title">
                          <i class="iconfont" :class="item.icon"></i><span slot="title">{{item.title}}</span>
                      </template>
                      <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                          {{subItem.title}}
                      </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i class="iconfont" :class="item.icon"></i><span slot="title">{{item.title}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <!-- end菜单栏 -->
    </div>
</template>

<script>
import bus from './bus.js'   //引入公共中间件
export default {
    data(){
        return{
            collapse: false,   //菜单栏是否折叠
            routerItem: [
                {
                    icon: 'icon-shangsheng4',
                    index: 'index',
                    title: '运营统计'
                },{
                    icon: 'icon-text',
                    index: 'post',
                    title: '帖子'
                },{
                    icon: 'icon-xiaoxi',
                    index: 'CommentReply',
                    title: '评论回复'
                },{
                    icon: 'icon-dianzan3',
                    index: 'GiveUp',
                    title: '点赞'
                },{
                    icon: 'icon-dashang',
                    index: 'Reward',
                    title: '打赏'
                },{
                    icon: 'icon-shipin2',
                    index: 'video',
                    title: '视频'
                },{
                    icon: 'icon-quanzi',
                    index: 'circle',
                    title: '圈子'
                },{
                    icon: 'icon-dengji1',
                    index: 'rating',
                    title: '等级'
                },{
                    icon: 'icon-diaofa',
                    index: 'fishingGround',
                    title: '钓场'
                },{
                    icon: 'icon-fenlei',
                    index: 'setting',
                    title: '分类设置'
                },{
                    icon: 'icon-yonghu',
                    index: 'user',
                    title: '用户'
                },{
                    icon: 'icon-weizhi',
                    index: 'area',
                    title: '区域'
                },{
                    icon: 'icon-search',
                    index: '9',
                    title: '查询',
                    subs: [
                        {
                            index: 'MineCollection',
                            title: '我的收藏'
                        },{
                            index: 'JoinCircle',
                            title: '加入圈子'
                        },{
                            index: 'Visitorsrecord',
                            title: '访客记录'
                        },{
                            index: 'Minefollow',
                            title: '我的关注'
                        },{
                            index: 'BeenFishGround',
                            title: '去过钓场'
                        },{
                            index: 'SignIn',
                            title: '签到'
                        },
                        /*{
                            index: 'SignUser',
                            title: '签到用户'
                        },*/
                        {
                            index: 'Wallet',
                            title: '钱包'
                        },{
                            index: 'GoldNotes',
                            title: '金币记录'
                        },{
                            index: 'IntegralRecord',
                            title: '积分记录'
                        },{
                            index: 'IntegralRule',
                            title: '积分规则'
                        },{
                            index: 'PostCircle',
                            title: '帖子圈子'
                        },{
                            index: 'WaterLevel',
                            title: '水位'
                        },{
                            index: 'WaterSituation',
                            title: '水情'
                        },
                        /*{
                            index: 'RechargeRecord',
                            title: '充值记录'
                        }*/
                    ]
                }
            ]
        }
    },
    computed:{
        onRoutes(){
            // console.log(this.$route)
            return this.$route.path.replace('/','')
        }
    },
    methods: {
        //点击菜单栏是否折叠按钮
        colapaseChange(){
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse)
        }
    }
}
</script>

<style>
.el-menu-vertical-demo i.iconfont{
    /* color: #fff; */
    font-size: 20px;
    padding-right: 6px;
    vertical-align: middle;
}
.el-submenu ul.el-menu li.el-menu-item:last-child{
    margin-bottom: 50px;
}
</style>



<style scoped>
.el-menu{
    border: none;
}
.sidebar{
    position: fixed;
    left: 0;
    top: 50px;
    z-index: 99;
    width: 175px;
    height: 100%;
    background: #42475b;
    overflow-y: auto;
    transition: all .3s ease-in;
}
.sidebar_collapse{
    position: fixed;
    left: 0;
    top: 50px;
    z-index: 99;
    width: 65px;
    height: 100%;
    background: #42475b;
    overflow-y: auto;
    transition: all .3s ease-in;
}
.slide{
    width: 100%;
    height: 30px;
    background-color: #4b5064;
    text-align: center;
    line-height: 30px;
    color: #fff;
}
.slide span{
    font-size: 20px;
    cursor: pointer;
}


</style>
