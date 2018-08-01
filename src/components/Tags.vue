<!--切换页面标签组件-->
<template>
        <div :class="collapse?'tags_collapse':'tags'">
            <!-- start左侧按钮 -->
            <div class="pre"><span @click="pre" class="iconfont icon-07jiantouxiangzuofill"></span></div>
            <!-- end左侧按钮 -->

            <!-- start放所有标签区域 -->
            <div class="all_tags" ref="allTags">
                <!-- 遍历所有标签，超出隐藏 -->
                <ul class="tags_list" ref="lagsList" style="left: 0">
                    <li v-for="item,index in routerList" :key="index">
                       <router-link class="tags_li_title" to="/about">{{item.title}}</router-link>
                        <span class="iconfont icon-guanbi"></span>
                    </li>
                </ul>
            </div>
            <!-- end放所有标签区域 -->

            <!-- start右侧按钮 -->
            <div class="next"> <span @click="next" class="iconfont icon-07jiantouxiangyoufill"></span></div>
            <!-- end右侧按钮 -->

            <!-- start操作标签功能 -->
            <div class="close_tags" @click="colseTags">
                <span>关闭操作</span>
                <span class="iconfont icon-down_arrows"></span>
                <transition name="fade">
                    <ul class="down_list" v-if="show">
                        <li @click="closeCurrent"><a href="#">关闭当前选项卡</a></li>
                        <li @click="closeOther"><a href="#">关闭其他选项卡</a></li>
                        <li @click="closeAll"><a href="#">关闭所有选项卡</a></li>
                    </ul>
                </transition>
            </div>
            <!-- end操作标签功能 -->
        </div>
</template>

<script>
import bus from './bus.js'    //中间件
export default {
    data(){
        return{
            tagsBoxW: 0,    //装标签最外面的盒子宽度
            allTagsW: 0,   //所有标签加起来的宽度
            Left: 0,   //装标签的盒子相对于父级在什么位置，初始为0
            speedW: 0,     //每次移动的距离

            collapse: false,   //菜单栏是否折叠
            show: false,   //操作功能是否显示
            routerList: [    //标签数组
                {
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页首页'
                },{
                    title: '首页首页首页首页首页'
                }, {
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页首页首页首页首页'
                },{
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页首页首页首页首页'
                }, {
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页首页首页首页首页'
                },{
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页首页首页首页首页'
                }, {
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页'
                },{
                    title: '首页首页首页首页首页'
                }
            ]
        }
    },
    created(){
        //内容区域是否折叠
        bus.$on('collapse', flag=>{
            this.collapse = flag
        })

        bus.$on('hDown', show=>{
            //传递过来的show表示如果头部的下拉菜单打开，那么tsgs标签页的下拉菜单必须关闭
            if(show){
                this.show = false
            }
        })
    },
    methods:{
        //打开关闭标签下拉栏
        colseTags(){
            this.show = !this.show;
        },
        //关闭当前标签
        closeCurrent(){

        },
        //关闭其他标签
        closeOther(){
            const curItem = this.routerList.filter(item=>{
                return item.path === this.$route.fullpath;
            })
            this.routerList = curItem;
        },
        //关闭所有标签
        closeAll(){
            this.routerList = [];
            this.$router.push('/')
        },
        //设置标签
        setTags(route){
            const isExist = this.routerList.some(item=>{
                return item.path === route.fullpath;
            })
            !isExist && this.routerList.push({
                title: route.meta.title,
                path: route.fullpath,
                name: route.matched[1].components.default.name
            })
            bus.$emit('tags',this.routerList)
        },
        //判断当前哪一个标签选中
        isActive(path){
            return path === this.$route.fullpath
        },

        //点击左侧箭头
        pre(){

            let allTagsW = this.$refs.allTags.offsetWidth;   //获取tags外面盒子的宽度
            let allW = 0;
            let speedW = 0;   //每次移动距离
            let endW = 0;
            let tagList = this.$refs.lagsList;
            let liArr = tagList.querySelectorAll('li');
           let Left = tagList.style.left;
            //获取所有tags的总宽度        
            for(var i=0; i<liArr.length; i++){
                allW += liArr[i].offsetWidth
                if(i<5){
                    speedW += liArr[i].offsetWidth;
                }
            }
            if(allW>allTagsW){
                 Left = parseInt(Left);
                  if((allW+Left)<allTagsW){
                      return
                  }
                 Left -= speedW;
                 tagList.style.left = Left + 'px'
                 
            }

        },

        // 点击右侧按钮
        next(){
            let Left = this.$refs.lagsList.style.left;
            Left = parseInt(Left) 
            let tagList = this.$refs.lagsList;
            let liArr = tagList.querySelectorAll('li');
            let speedW = 0;
            for(var i=0; i<liArr.length; i++){
                if(i<5){
                    speedW += liArr[i].offsetWidth;
                }
            }
            Left += speedW
            this.$refs.lagsList.style.left = Left + 'px'
            if(Left>=0){
                 this.$refs.lagsList.style.left = 0 + 'px'
                return
            }
        }
    }
}
</script>

<style>
.tags{
    position: fixed;
    left: 175px;
    top: 50px;
    width: calc(100% - 175px);
    height: 40px;
    background: #F5F5F5;
    border-bottom: solid 2px #2f4050;
    line-height: 40px;
    cursor: pointer;
    transition: all .3s ease-in;
}
.tags_collapse{
    position: fixed;
    left: 65px;
    top: 50px;
    width: calc(100% - 65px);
    height: 40px;
    background: #F5F5F5;
    border-bottom: solid 2px #2f4050;
    line-height: 40px;
    cursor: pointer;
    transition: all .3s ease-in;
}
.pre,.next{
    width: 40px;
    height: 40px;
    float: left;
    text-align: center;
    line-height: 40px;
}
.pre span.iconfont,.next span.iconfont{
    font-size: 25px;
    vertical-align: middle;
}
.all_tags{
    position: relative;
    width: calc(100% - 170px);
    height: 100%;
    float: left;
    overflow: hidden;
}
.close_tags{
    position: relative;
    text-align: center;
    font-size: 12px;
    float: right;
    width: 90px;
    height: 100%;
    line-height: 40px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
}
.close_tags span.iconfont{
    vertical-align: middle;
    padding-left: 5px;
    font-size: 12px;
}
.down_list{
    position: absolute;
    right: 0;
    top: 42px;
    box-shadow: 0 0 3px rgba(86,96,117,.3);
    z-index: 99;
    width: 140px;
}
.down_list li{
    background: #fff;
}
.down_list li a{
    color: #000;
}
.down_list li:hover{
    background: #F5F5F5;
}

.tags_list{
    position: absolute;
    width: 10000px;
    height: 100%;
    overflow: hidden;
    transition: all .5s ease-in-out;
}
.tags_list li{
    position: relative;
    float: left;
    border-left: 1px solid #ddd;
    padding: 0 15px;
    max-width: 130px;
    overflow: hidden;
}
.tags_list li a{
    color: #bbb;
}
.active{
    background: #39aef5;
    color: #fff;
}
.tags_list li:hover{
    background: #ddd;
}
.tags_li_title{
    padding-right: 10px;
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.tags_list li:last-child{
    border-right: 1px solid #ddd;
}
.tags_list li span.iconfont{
    position: absolute;
    right: 2px;
    top: 1px;
    padding-right: 5px;
    color: #5f5050;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
