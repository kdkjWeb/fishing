<template>
    <div class="giveUp">
         <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="16">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="标题：">
                            <el-input clearable v-model="formInline.title" placeholder="标题"></el-input>
                        </el-form-item>
                        <el-form-item label="内容：">
                            <el-input clearable v-model="formInline.content" placeholder="内容"></el-input>
                        </el-form-item>
                        <el-form-item label="评论人：">
                            <el-input clearable v-model="formInline.people" placeholder="评论人"></el-input>
                        </el-form-item>
                         <el-form-item label="帖子状态：">
                            <el-select clearable v-model="formInline.postStatus" placeholder="帖子状态">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="禁用" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="评论状态：">
                            <el-select clearable v-model="formInline.status" placeholder="评论状态">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="禁用" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="评论时间：">
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

                <el-col :span="8" class="right">
                    <el-button type="primary" size="mini" @click="search">查询</el-button>
                    <el-button size="mini" @click="offComments" :disabled="disabled">审核</el-button>
                    <el-button size="mini" @click="offComments" :disabled="!disabled">取消审核</el-button>
                    <el-button size="mini" @click="deleted">删除</el-button>
                    <el-button size="mini" @click="exportd">导出</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- end顶部搜索按钮 -->

         <!-- start表格 -->
        <div class="table">
            <el-table
                :max-height="height"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                stripe
                :header-cell-style="getRowClass"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                type="index"
                width="50"
                header-align="center"
                align="right"
                :index="index"
                label="编号">
                </el-table-column>
                <el-table-column
                v-for="(item,index) in tableList"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :align="item.align"
                header-align="center"
                :show-overflow-tooltip="true"
                >
                </el-table-column>
            </el-table>
             <div class="aboutNum">
                <div> <span>合计：{{total}}</span><span>{{allNum.viewCount}}</span><span>{{allNum.commentCount}}</span></div>
            </div>
        </div>
        <!-- end表格 -->

        
        <!-- start分页 -->
        <div class="page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[30, 50, 80, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background>
            </el-pagination>
        </div>
        <!-- end分页 -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            disabled: false,
            allNum: {
                commentCount: 0,   //总回复数
                viewCount: 0,    //总点赞数
            },
            height: null,
            formInline: {   
                title: '',   //标题
                content: '',   //内容
                people: '',    //评论人
                postStatus: '',    //帖子状态
                status: '',   //评论状态
                date: '',    //时间
            },
            tableList: [   //表格的头部配置
                {prop: 'provinceName', label: '帖子标题', width: '120', align: ''},
                {prop: 'cityName', label: '帖子状态', width: '80', align: ''},
                {prop: 'status', label: '评论状态', width: '80', align: ''},
                {prop: 'areaName', label: '评论类型', width: '80', align: ''},
                {prop: 'recommendNum', label: '回复数', width: '70', align: 'right'},
                {prop: 'likedNum', label: '点赞数', width: '70', align: 'right'},
                {prop: 'content', label: '评论内容', width: '200', align: ''},
                {prop: 'userId', label: '评论人', width: '100', align: ''},
                {prop: 'cdate', label: '评论时间', width: '160', align: 'right'},
                {prop: 'location', label: '发帖地址', width: '180', align: ''},
                {prop: 'countryName', label: '手机号', width: '110', align: 'right'},
                {prop: 'countryId', label: '用户类别', width: '110', align: ''},
                {prop: '', label: '', width: '', align: ''}
            ],
            tableData: [],//表格的数据
            multipleSelection: [],   //选中之后存放的数据
            currentPage: 1, //当前第几页
            pageSize: 30,   //每页显示多少条
            total: 0,   //总共多少条数据
        }
    },
    methods: {
        //获取所有点赞列表
        getAllCmtsList(pageSize,pageNum){
            this.$post('comments/getAllCmtsList',{
                pageSize: pageSize ? pageSize : 30,
                pageNum: pageNum ? pageNum : 1,
                provinceName: this.formInline.title ? this.formInline.title : null,
                content: this.formInline.content ? this.formInline.content : null,
                userId: this.formInline.people ? this.formInline.people : null,
                cityName: this.formInline.postStatus ? this.formInline.postStatus : null,
                status: this.formInline.status ? this.formInline.status : null,
                cdate: this.formInline.date ? `${this.dataTransform(this.formInline.date[0])} 00:00:00` : null,
                enddate: this.formInline.date ?  `${this.dataTransform(this.formInline.date[1])} 23:59:59`: null,
            }).then(res=>{
                if(res.code == 0){
                    if(res.data.list.length <= 0){
                        this.tableData = res.data.list;
                        this.total = 0;
                        this.allNum.commentCount = this.allNum.viewCount = 0;   //dom每次更新数据都清零
                    }else{
                        let arr = res.data.list;
                        arr.forEach((e,index)=>{
                            arr[index].status = e.status == 1 ? '正常' : '禁用';
                            arr[index].cityName = e.cityName == 1 ? '正常' : '禁用';
                            if(e.countryId == 0){
                                arr[index].countryId = '超级管理员'
                            }else if(e.countryId == 1){
                                arr[index].countryId = '管理员'
                            }else if(e.countryId == 2){
                                arr[index].countryId = '钓友'
                            }else if(e.countryId == 3){
                                arr[index].countryId = '农家乐'
                            }else{
                                arr[index].countryId = '渔具店'
                            }
                        })
                        this.tableData = JSON.parse(JSON.stringify(arr));
                        this.total = res.data.total;
                         this.$nextTick(function(){
                            this.checked();//每次更新了数据，触发这个函数即可。

                            // 每次dom数据更新以后重新计算总数
                            this.allNum.commentCount = this.allNum.viewCount = 0;   //dom每次更新数据都清零
                            this.tableData.forEach((val,index)=>{

                                this.allNum.commentCount +=parseInt(val.recommendNum);
                                this.allNum.viewCount +=parseInt(val.likedNum);
                            })
                        })
                    }


                      this.$nextTick(function(){
                            this.checked();//每次更新了数据，触发这个函数即可。

                              //判读审核、取消审核按钮哪一个可以点
                            if(this.tableData[0].status == '正常'){
                                this.disabled = false;
                            }else if(this.tableData[0].status == '禁用'){
                                this.disabled = true;
                            }
                        })
                }
            })
        },
        //查询
        search(){
            this.getAllCmtsList();
        },
        //导出
        exportd(){

        },
        //删除
        deleted(){
              let id = this.multipleSelection[0].cId;   //保存选中的数据的cId

              this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$get('comments/delComments',{
                        id: id
                    }).then(res=>{
                        if(res.code == 0){
                            this.tableData.forEach((val,index)=>{
                                if(val.cId == id){
                                    this.tableData.splice(index,1)
                                    this.total -=1;
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    //表格第一行默认选中
                                    this.$nextTick(()=>{
                                         this.checked();
                                    })
                                }
                            })
                        }
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                });
        },
        
        //审核、取消审核
        offComments(){
            let id = this.multipleSelection[0].cId;   //保存选中的数据的cId

            this.$confirm('此操作将更改评论审核状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    console.log(1)
                    this.$get('comments/offComments',{
                        id: id
                    }).then(res=>{
                        if(res.code == 0){

                             this.$message({
                                type: 'success',
                                message: '审核状态更改成功！'
                            });
                            //获取所有评论列表
                            this.getAllCmtsList();
                        }
                    })
                    console.log(2)
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                });



                /*this.$get('comments/offComments',{
                        id: id
                    }).then(res=>{
                        if(res.code == 0){
                           console.log(res)
                        }
                    })*/
        },

        //多选框选中之后存放的数据
        handleSelectionChange(val){
             this.multipleSelection = val;
             
        
            // 强制要求复选框只能选择一个，大于等于2个的时候把第一个取消选中
            if(this.multipleSelection.length == 2){
                     for(var i= 0; i<this.tableData.length; i++){
                    if(this.tableData[i].cId == this.multipleSelection[0].cId){
                        this.$refs.multipleTable.toggleRowSelection(this.tableData[i],false);


                        console.log(this.tableData[i+1])

                        //判读审核、取消审核按钮哪一个可以点
                        if(this.tableData[i+1].status == '正常'){
                                this.disabled = false;
                            }else if(this.tableData[i+1].status == '禁用'){
                                this.disabled = true;
                            }

                        break;
                    }
                }
            }



            //虽然是多选框，但是产品设计每次只能选着一个,换页的时候重新计算序列编号
            if(this.multipleSelection.length == 1){
                for(var i= 0; i<this.tableData.length; i++){
                    if(this.tableData[i].cId == this.multipleSelection[0].cId){
                        this.rowIndex = (this.currentPage - 1)*this.pageSize + i + 1;
                        break;
                    }
                }
            }


            

        },
        //默认选中第一行
        checked(){
              //首先el-table添加ref="multipleTable"引用标识
            this.$refs.multipleTable.toggleRowSelection(this.tableData[0],true);
            if(this.currentPage == 1){
                this.rowIndex = 1;
            }
      },
        //设置表头的背景颜色
      getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background:#EFEFEF'
            } else {
                return ''
            }
        },
     //设置表格索引序号
     index(index){
         return (this.currentPage - 1)*this.pageSize + index + 1;
     },
      //每页显示多少条数据
     handleSizeChange(val) {
            this.pageSize = val;
            this.getAllCmtsList(val,this.currentPage);
        },
        //当前第几页
      handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllCmtsList(this.pageSize,val)
        },
        //标准时间格式转换
      dataTransform(date){
        if(date){
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            // var h = date.getHours();
            // var minute = date.getMinutes();
            // minute = minute < 10 ? ('0' + minute) : minute;
            // var second = date.getSeconds();	
            // second = second < 10 ? ('0' + second) : second;
            // return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;

            return y + '-' + m + '-' + d;
        }
      }
    },
    created(){
         this.height = window.innerHeight - 240;
    },
    mounted(){
        //表格第一行默认选中
        this.checked();
        //获取所有评论列表
        this.getAllCmtsList();

        window.addEventListener('resize', ()=>{
             this.height = window.innerHeight - 240;
        })
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
.giveUp .table .el-table .el-table__body-wrapper{
    overflow-y: scroll;
}

.giveUp .el-date-editor--datetime input{
    width: 176.66px;
}
/* .giveUp .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px ;
    border-left: 2px solid #2693fa;
    padding-left: 8px;
}
.giveUp .el-upload__tip{
    text-align: right;
} */
</style>


<style scoped>
.topSearch .right{
    text-align: right;
}
.table{
    border: 1px solid #ddd;
}
.page{
    text-align: right;
    margin: 10px 0 5px;
}


.giveUp .aboutNum{
    width: 605px;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    box-sizing: border-box;
}
.giveUp .aboutNum span:nth-child(1){
    padding-left: 10px;
}
.giveUp .aboutNum span:nth-child(2),.giveUp .aboutNum span:nth-child(3),.giveUp .aboutNum span:nth-child(4){
    display: inline-block;
    width: 70px;
    float: right;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>


