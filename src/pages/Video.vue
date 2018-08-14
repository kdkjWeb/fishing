<template>
    <div class="video">
        <!-- start视频搜索 -->
        <div class="top" :style="{height: heightTop + 'px'}"></div>
        <!-- end视频搜索 -->

        <!-- start分割线 -->
        <div class="hr"></div>
        <!-- end分割线 -->

        <!-- start底部选项卡 -->
        <div class="bottom" :style="{height: heightBottom + 'px'}">
            <div class="bottom_btn">
                <el-row>
                  <el-col :span="12">
                      <el-button :type="btnIndex == 0 ? primary : ''" size="mini" @click="btnClick(0)">评论</el-button>
                      <el-button :type="btnIndex == 1 ? primary : ''" size="mini" @click="btnClick(1)">评论回复</el-button>
                      <el-button :type="btnIndex == 2 ? primary : ''" size="mini" @click="btnClick(2)">点赞明细</el-button>
                      <el-button :type="btnIndex == 3 ? primary : ''" size="mini" @click="btnClick(3)">打赏明细</el-button>
                  </el-col>
                  <el-col :span="12" class="right" v-if="btnIndex ==0||btnIndex==1">
                      <el-button type="primary" size="mini">审核</el-button>
                      <el-button size="mini">取消审核</el-button>
                      <el-button size="mini">删除</el-button>
                  </el-col>
                </el-row>
            </div>

            <!-- start底部的表格 -->
            <!-- end底部表格 -->
        </div>
        <!-- end底部选项卡 -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            heightTop: '',
            heightBottom: '', 
            primary: 'primary',
            btnIndex: 0
        }
    },
    created(){
        this.heightTop = (window.innerHeight - 95) * 0.55 - 30;
        this.heightBottom = (window.innerHeight - 95) * 0.45;
    },
    mounted(){
        window.addEventListener('resize',()=>{
            this.heightTop = (window.innerHeight - 95) * 0.55 - 30;
            this.heightBottom = (window.innerHeight - 95) * 0.45;
        })
    },
    methods: {
        btnClick(index){
            this.btnIndex = index;
            switch(index){
                case 0: 
                console.log(0)
                break;
                case 1: 
                console.log(1)
                break;
                case 2: 
                console.log(2)
                break;
                case 3: 
                console.log(3)
                break;
            }
        }
    }
}
</script>

<style scoped>
.top{
    width: 100%;
    background: red;
}
.bottom{
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
}
.hr{
    position: relative;
    left: -20px;
    width: calc(100% + 40px);
    height: 30px;
    background: rgb(66, 71, 91); 
}
.right{
    text-align: right;
}
</style>
