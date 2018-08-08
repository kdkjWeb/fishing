<template>
       <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="14">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item :label="inputA.label">
                            <el-input clearable v-model="formInline.name" :placeholder="inputA.placeholder"></el-input>
                        </el-form-item>
                       <el-form-item :label="inputB.label" v-if="inputB">
                            <el-input clearable v-model="formInline.name" :placeholder="inputB.placeholder"></el-input>
                        </el-form-item>
                        <el-form-item :label="inputC.label" v-if="inputC">
                            <el-input clearable v-model="formInline.name" :placeholder="inputC.placeholder"></el-input>
                        </el-form-item>
                        <el-form-item label="状态：">
                                <el-select v-model="formInline.status" placeholder="状态" clearable>
                                <el-option label="正常" value="1"></el-option>
                                <el-option label="已关闭" value="0"></el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label="访问时间：">
                            <el-date-picker
                            v-model="formInline.date"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </el-form-item>
                        </el-form>
                </el-col>

                <el-col :span="10" class="right">
                    <el-button type="primary" size="mini" @click="search">查询</el-button>
                    <el-button size="mini" @click="exportd">导出</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- end顶部搜索按钮 -->
</template>

<script>
export default {
    props: {
        inputA: {
            type: Object,
            default: null
        },
        inputA: {
            type: Object,
            default: null
        },
        inputA: {
            type: Object,
            default: null
        }
    },
    data(){
        return{
            formInline: {   //圈子、详细地址、创建时间的表单
                name: '',
                address: '',
                date: ''
            },
        }
    },
    methods:{
        //查询
        search(){

        },
        //导出
        exportd(){

        }
    }
}
</script>

<style>
.topSearch .el-form-item__content{
    width: 100px;
}
.topSearch .el-date-editor{
    width: 220px;
}
.right{
    text-align: right;
}
</style>
