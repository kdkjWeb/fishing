<template>
    <div class="area">
         <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" size="mini" @click="increase(1)">新增同级</el-button>
                    <el-button size="mini" @click="increase(2)">新增下级</el-button>
                    <el-button size="mini" @click="increase(3)">修改</el-button>
                    <el-button size="mini" @click="del">删除</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- end顶部搜索按钮 -->

        <div class="content" :style="{height: height + 'px'}">
            <div class="left_wrap">
                <!-- <el-tree :data="provinceList" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
                 <el-tree
                    :data="provinceList"
                    node-key="cId"
                    accordion
                    highlight-current
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    @current-change="handleCurrentClick"
                    :default-expanded-keys="checkArr"
                    >
                    <span slot-scope="{ node, data }">
                        <span class="iconfont icon-2"></span>
                        <span>{{ node.label}}</span>
                    </span>
                    </el-tree>
            </div>
            <div class="right_wrap">
                <el-form label-position="right" label-width="100px" :model="form" size="mini">
                <el-form-item label="描述：">
                    <el-input v-model="form.des"></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker
                    disabled
                    v-model="form.creatTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="修改时间：">
                    <el-date-picker
                    disabled
                    v-model="form.modifyTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="创建人：">
                    <el-input v-model="form.creator" disabled></el-input>
                </el-form-item>
                <el-form-item label="修改人：">
                    <el-input v-model="form.modifier" disabled></el-input>
                </el-form-item>
                </el-form>
                <div class="btn">
                     <el-button size="mini" type="primary">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            checkId: '',
            checkArr: [],
            checkData: {},
            height: null,
            provinceList: [],   //省份
            form: {
                des: '',
                creatTime: '',
                creator: '',
                modifyTime: '',
                modifier: ''
            },
            
            defaultProps: {
            children: 'childList',
            label: 'regionName'
            }
        }
    },
     methods: {
      handleNodeClick(data) {


          this.checkData = data;
        // console.log(data);
        // this.form.des = data.codeName;
        // this.form.creatTime = data.creatTime;
        // this.form.creator = data.creator;
        // this.form.modifyTime = data.modifyTime;
        // this.form.modifier = data.modifier;
      },

      handleCurrentClick(data2, node) {//点击节点，获取当前节点信息
      console.log(data2)
        this.checkId = data2.cId;
        
        console.log("this.checkId= ", this.checkId);
        },


        del() {
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
console.log("删除 ", this.checkId);

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },


      increase(level) {
        if(Object.keys(this.checkData).length <= 0){
            this.$message({
            type: 'warning',
            message: '请选择一个节点!'
          });
          return;
        }
        if (level === 1) {
             console.log("增加同级 ");
          } else if(level === 2) {
             console.log("增加下级 ",);

          } else if(level === 3) {
             console.log("修改 ", );

          }
       },


      //获取区域列表
     getProvince(){
         this.$get('region/queryTrees',{}).then(res=>{
             this.provinceList = res.data;
             console.log(this.provinceList)
             this.$nextTick(()=>{
                 this.checkArr.push(this.provinceList[0].cId);
                 this.checkData = this.provinceList[0];
             })
         })
     },
    },
    created() {
        this.getProvince();

        this.height = window.innerHeight - 180;
    },
    mounted(){
         window.addEventListener('resize', ()=>{
             this.height = window.innerHeight - 180;
        })
    }
}
</script>


<style>
.area .el-input__inner{
    width: 220px;
}
.area .el-form {
    margin-top: 100px;
    margin-left: 50%;
    transform: translateX(-50%);
}
.area .el-tree-node__expand-icon{
    display: none;
}
.area .iconfont{
    color: #ffcd2c;
    font-size: 20px;
    padding-right: 5px;
}
</style>

<style scoped>
.area{
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
}
.topSearch{
    margin-bottom: 20px;
}
.content{
    display: flex;
    display: -webkit-flex;
    width: 100%;
    overflow: hidden;
     box-sizing: border-box;
}
.content .left_wrap,.content .right_wrap{
    flex: 1;
}

.content .left_wrap{
   padding-left: 50px;
   box-sizing: border-box;
   overflow: auto;
}
.btn{
    text-align: center;
    margin-left: -80px;
}
</style>
