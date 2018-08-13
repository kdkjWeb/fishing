<template>
    <div class="area">
         <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="24">
                    <el-button type="primary" size="mini">新增同级</el-button>
                    <el-button size="mini">新增下级</el-button>
                    <el-button size="mini">修改</el-button>
                    <el-button size="mini">删除</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- end顶部搜索按钮 -->

        <div class="content">
            <div class="left_wrap">
                <el-tree :data="provinceList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="right_wrap">
                <el-form label-position="right" label-width="80px" :model="form" size="mini">
                <el-form-item label="描述：">
                    <el-input v-model="form.des"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                    v-model="form.date1"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="修改时间">
                    <el-date-picker
                    v-model="form.date2"
                    type="datetime"
                    placeholder="选择日期时间"
                    default-time="12:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="创建人：">
                    <el-input v-model="form.des"></el-input>
                </el-form-item>
                <el-form-item label="修改人：">
                    <el-input v-model="form.des"></el-input>
                </el-form-item>
                <!-- <el-form-item>
                    <el-button size="mini">保存</el-button>
                </el-form-item> -->
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
            provinceList: [],   //省份
            form: {
                des: '',
                date1: '',
                date2: '',
            },
             treeData: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                    label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                    label: '三级 3-2-1'
                    }]
                }]
                }],
            defaultProps: {
            children: 'children',
            label: 'codeName'
            }
        }
    },
     methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      //获取省份列表
     getProvince(){
         this.$get('province/queryAll',{}).then(res=>{
             this.provinceList = res.data;
             console.log(this.provinceList)
         })
     },
    },
    created() {
        this.getProvince();
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
}
.content .left_wrap,.content .right_wrap{
    flex: 1;
}

.content .left_wrap{
   padding-left: 50px;
   box-sizing: border-box;
}
.btn{
    text-align: center;
    margin-left: -80px;
}
</style>
