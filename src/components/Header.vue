<!-- 头部导航 -->
<template>
    <div class="header">
        <!-- start logo图片 -->
        <div class="logo"></div>
        <!-- end logo图片 -->

        <!-- start 标题 -->
        <h1 class="title">渔乐系统管理平台</h1>
        <!-- end 标题 -->

        <!-- start 右侧模块 -->
        <div class="right_model">
            <div class="search">
                <div class="search_input">
                     <input type="text" placeholder="搜索"/>
                     <span class="iconfont icon-sousuo"></span>
                </div>
                <!--<div class="msg_num">-->
                    <!--<span class="iconfont icon-tixing"></span>-->
                    <!--<span class="num">16</span>-->
                <!--</div>-->
            </div>
            <!--<div class="notice">支持与服务</div>-->
            <div class="user" @click="downList">
                <img src="../../static/images/header.jpg" alt="">
                <div class="down">
                    <span class="userName">{{userName}}</span>
                    <span class="iconfont icon-down"></span>
                    <transition name="fade">
                        <ul class="down_list" v-if="show">
                            <li v-for="(item,index) in userList" :key="index"  @click="downClick(index)"><span class="iconfont" :class="item.icon"></span><a href="#">{{item.title}}</a></li>
                        </ul>
                    </transition>
                </div>
            </div>
        </div>
        <!-- end 右侧模块 -->
    </div>
</template>

<script>
import bus from './bus.js'
export default {
    data(){
       return{
            show: false,
            userName: '',
            userList: [
//                {
//                    icon: 'icon-fcstubiao18',
//                    title: '修改用户信息'
//                },{
//                    icon: 'icon-qingkong',
//                    title: '清空缓存'
//                },{
//                    icon: 'icon-tianjiarenyuan',
//                    title: '添加管理员'
//                },{
//                    icon: 'icon-liebiao',
//                    title: '管理员列表'
//                },{
//                    icon: 'icon-rizhi-copy',
//                    title: '管理员日志'
//                },{
//                    icon: 'icon-jiaose',
//                    title: '角色管理'
//                },
              {
                    icon: 'icon-084tuichu',
                    title: '安全退出'
                }
            ]
       }
    },
    methods: {
        downList(){
            this.show = !this.show;
            bus.$emit('headerShow',this.show)
        },

        //点击下拉列表的每一个选项
        downClick(index){
            switch(index){
                case this.userList.length-1:    //点击安全退出
                // console.log(1)
                this.$get('/logout',{}).then(res=>{
                    if(res.code == 0){
                        //删除localStorage的数据
                        localStorage.removeItem('userInfo')

                        //跳转到登录页面
                        this.$router.push({
                            path: '/login'
                        })
                    }
                })
                break;
            }
        }
    },
    mounted(){
        this.userName = JSON.parse(localStorage.getItem('userInfo')).nickname;
    }

}
</script>

<style scoped>
.header{
    width: 100%;
    height: 50px;
    background: #383d41;
}
.logo{
    float: left;
    width: 127px;
    height: 100%;
    border-right: 1px solid #2c3135;
    background-image: url(../assets/images/header_logo.png);
    background-repeat: no-repeat;
    background-position: center;
}
.title{
    float: left;
    line-height: 50px;
    padding-left: 20px;
    color: #fff;
    font-size: 16px;
}
.right_model{
    float: right;
    height: 100%;
    width: 625px;
}
.search{
    float: left;
    width: 302px;
    height: 100%;
    padding: 10px 0;
    border-right: 1px solid #2c3135;
    box-sizing: border-box;
}
.search_input{
    float: left;
    position: relative;
    height: 30px;
    width: 218px;
    outline: none;
    border: none;
}
.search_input input{
    background: #505559;
    padding-left: 12px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
      color: #fff;
}
.search_input span.iconfont{
    position: absolute;
    right: 0;
    top: 3px;
    padding: 0 10px 0 12px;
    border-left: 1px solid #6c7175;
    color: #fff;
    font-weight: 400;
    cursor: pointer;
}
.msg_num{
    float: left;
}
.msg_num span.iconfont{
    font-size: 25px;
    line-height: 30px;
    padding-left: 18px;
    color: #fff;
}
.num{
    position: relative;
    top: -3px;
    display: inline-block;
    padding: 0 6px;
    border-radius: 4px;
    background: #ff9c0a;
    text-align: center;
    line-height: 20px;
    color: #fff;
}


.notice{
    float: left;
    width: 101px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-right: 1px solid #2c3135;
}


.user{
    float: left;
    width: 220px;
    height: 100%;
}
.user img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 5px 20px 0 25px;
    float: left;
}
.down{
    position: relative;
    float: left;
    line-height: 50px;
    /* padding-right: 30px; */
    cursor: pointer;
}
.down .userName{
    /* color: #fff;
    display: inline-block;
    width: 90px;
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px; */

    color: #fff;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
    max-width: 90px;
}
.down .iconfont{
    position: relative;
    top: -11px;
    left: -2px;
    font-size: 20px;
    color: #fff;
}
.down_list{
    position: absolute;
    /* right: -20px; */
    left: -96px;
    top: 50px;
    z-index: 199;
    width: 230px;
    box-shadow: 0 0 3px rgba(86,96,117,.3);
    border: 1px solid #ddd;
    box-sizing: border-box;
    background: rgba(255,255,255,.7)
}
.down_list>li{
    line-height: 40px;
    /* box-sizing: border-box; */
}
.down_list>li>a{
    color: #000;
}
.down_list>li:nth-child(2){
    border-bottom: 1px solid #ddd;
}
.down_list>li:nth-child(5){
    border-bottom: 1px solid #ddd;
}
.down_list>li span.iconfont{
    position: relative;
    top: 1px;
    vertical-align: middle;
    font-size: 16px;
    padding-right: 8px;
    padding-left: 20px;
    color: #000;
}
.down_list>li:hover{
    background: #ccc;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
