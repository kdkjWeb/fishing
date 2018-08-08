<!--主要模板搭建-->
<template>
    <div class="home">
        <!-- 头部组件 -->
        <v-head></v-head>

        <!-- 左侧菜单栏组件 -->
        <vSidebar></vSidebar>

        <!-- 内容区域 -->
        <div id="content_wrap" :class="collapse? 'content_collapse' : 'content_box'">
            <!-- 页面切换标签页组件 -->
            <!-- <vTags></vTags> -->

            <!-- 路由内容区域 -->
            <div class="content">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue'    //引入头部组件
import vSidebar from './Sidebar.vue'   //引入左侧菜单栏组件
import vTags from './Tags'   //引入页面切换标签组件
import bus from '../components/bus.js'   //引入中间件
export default {
    components: {
        // 祖册组件
        vHead,vSidebar,vTags
    },
    data() {
        return {
            collapse: false,    //菜单栏折叠，内容区域是否跟着折叠
        }
    },
    created(){
        //内容区域是否折叠
        bus.$on('collapse', flag=>{
            this.collapse = flag
        })




    },

}
</script>

<style scoped>
.content_box{
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 175px;
    transition: all .3s ease-in;
    overflow-y: auto;
    /*background:pink;*/
}
.content_collapse{
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 0;
    left: 65px;
    transition: all .3s ease-in;
    overflow-y: auto;
}
/* .content::before{
    content: '';
    display: block;
    width: 100%;
    height: 40px;
} */

.content{
    padding: 25px 20px 20px;
}



.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
