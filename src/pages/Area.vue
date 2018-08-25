<template>
    <div class="area">
         <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="24">
                    <el-button :type="btnIndex == 0 ? 'primary' : ''"  size="mini" @click="increase(0)">新增同级</el-button>
                    <el-button :type="btnIndex == 1 ? 'primary' : ''" size="mini" @click="increase(1)">新增下级</el-button>
                    <el-button :type="btnIndex == 2 ? 'primary' : ''" size="mini" @click="increase(2)">修改</el-button>
                    <el-button :type="btnIndex == 3 ? 'primary' : ''" size="mini" @click="del" :disabled="disabled">删除</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- end顶部搜索按钮 -->

        <div class="content" :style="{height: height + 'px'}">
            <div class="left_wrap">
                <!-- <el-tree :data="provinceList" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
                 <el-tree
                    ref="tree"
                    :data="provinceList"
                    node-key="cId"
                    accordion
                    highlight-current
                    :props="defaultProps"
                    @node-click="handleNodeClick"
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
                     <el-button size="mini" type="primary" @click="save">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            btnIndex: 0,
            disabled: false,
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
          //保存当前点击选中的这条数据
        this.checkData = data;
        //如果输入框有值需要清空
        if(this.form.des){
            this.form.des = '';
            this.form.creatTime = '';
            this.form.creator = '';
            this.form.modifyTime = '';
            this.form.modifier = '';
        }
        //如果他下面有子集，禁止点击删除按钮
        if(this.checkData.childList.length>0){
                this.disabled = true;
            }else{
                this.disabled = false;
            }
      },

    
        //点击删除按钮
        del() {
        //按钮选中状态
        this.btnIndex = 3;

        this.$confirm('此操作将删除该区域, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$get('region/deleteRegion',{
                regionId: this.checkData.cId
            }).then(res=>{
                if(res.code == 0){
                    this.getProvince();
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
            })

          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },


        //点击新增同级、新增下级、修改按钮
      increase(level) {
        //按钮选中状态
        this.btnIndex = level;
        if(Object.keys(this.checkData).length <= 0){
            this.$message({
            type: 'warning',
            message: '请选择一个节点!'
          });
          return;
        }
          if(level === 0) {
              //新增同级清空输入框
            this.form = {}
          } else if(level === 1) {
              //新增下级清空输入框
              this.form = {}
          } else if(level === 2) {
               //点击修改数据回显
                this.form.des = this.checkData.regionName;
                this.form.creatTime = this.checkData.creatTime;
                this.form.creator = this.checkData.creator;
                this.form.modifyTime = this.checkData.modifyTime;
                this.form.modifier = this.checkData.modifier;

          }
       },

       //保存按钮
       save(){
           if(!this.form.des){
               this.$message({
                message: '请填写描述',
                type: 'warning'
                });
                return;
           }
           if(this.btnIndex == 0){
               //新增同级
                this.$post('region/addRegion',{
                    parentId: this.checkData.parentId ? this.checkData.parentId : null,
                    regionName: this.form.des 
                }).then(res=>{
                    this.getProvince();
                    if(res.code == 0){
                        this.$message({
                            type: 'success',
                            message: '添加区域成功!'
                        });
                    }
                })
           }else if(this.btnIndex == 1){
               //新增下级
                this.$post('region/addRegion',{
                    parentId: this.checkData.cId,
                    regionName: this.form.des 
                }).then(res=>{
                  this.getProvince();
                    if(res.code == 0){
                        this.$message({
                            type: 'success',
                            message: '添加区域成功!'
                        });
                    }
                })
           }else if(this.btnIndex == 2){
               //修改
               this.$post('region/updateRegion',{
                   cId: this.checkData.cId,
                   regionName: this.form.des 
               }).then(res=>{
                   if(res.code == 0){
                       this.getProvince();
                       this.$message({
                            type: 'success',
                            message: '修改区域成功!'
                        });
                   }
               })
           }
       },


      //获取区域列表
     getProvince(){
         this.$get('region/queryTrees',{}).then(res=>{
             this.provinceList = res.data;
             this.$nextTick(()=>{
                 this.checkArr.push(this.provinceList[0].cId);
                 this.checkData = this.provinceList[0];
                 this.$refs.tree.setCurrentKey(this.checkArr[0]); // treeBox 元素的ref   value 绑定的node-key

                 if(this.checkData.childList.length>0){
                     this.disabled = true;
                 }else{
                     this.disabled = false;
                 }
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
.area .topSearch{
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
   padding-right: 100px;
}
.btn{
    text-align: center;
    margin-left: -80px;
}
</style>
