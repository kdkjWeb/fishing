<template>
    <div class="giveUp">
         <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="14">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="帖子：">
                            <el-input clearable v-model="formInline.topicTitle" placeholder="帖子"></el-input>
                        </el-form-item>
                        <el-form-item label="圈子：">
                            <el-input clearable v-model="formInline.placeName" placeholder="圈子"></el-input>
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
            height: null,
            formInline: {   //圈子、详细地址、创建时间的表单
               topicTitle: '',
               placeName: ''
            },
            tableList: [   //表格的头部配置
                {prop: 'topicTitle', label: '帖子标题', width: '120', align: ''},
                {prop: 'topicType', label: '帖子类型', width: '100', align: ''},
                {prop: 'cType', label: '类型', width: '80', align: 'right'},
                {prop: 'placeName', label: '圈子名字', width: '80', align: 'right'},
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
        getAllCoinList(pageSize,pageNum){
            this.$post('basicTopic/querySendPlaceByRecordWeb',{
                pageSize: pageSize ? pageSize : 30,
                pageNum: pageNum ? pageNum : 1,
                topicTitle: this.formInline.topicTitle ? this.formInline.topicTitle : null,
                placeName: this.formInline.placeName ? this.formInline.placeName : null
            }).then(res=>{
                if(res.code == 0){
                  
                        if(res.data.list.length<0){
                            this.tableData = res.data.list;
                            this.total = 0;
                        }else{
                            let arr = res.data.list;
                            arr.forEach((e,index)=>{
                                arr[index].cType = e.cType == 0 ? '圈子' : '钓场';
                                if(e.topicType == 1){
                                    arr[index].topicType = '标准长贴'
                                }else if(e.topicType == 2){
                                    arr[index].topicType = '钓位'
                                }else if(e.topicType == 3){
                                    arr[index].topicType = '鱼情'
                                }else{
                                    arr[index].topicType = '随便说说'
                                }
                            })
                            this.tableData = JSON.parse(JSON.stringify(arr));
                            this.total = res.data.total;
                        }
                       
            
                      this.$nextTick(function(){
                            this.checked();//每次更新了数据，触发这个函数即可。
                        })
                }
            })
        },
        //查询
        search(){
            this.getAllCoinList();
        },
        //导出
        exportd(){

        },
        //多选框选中之后存放的数据
        handleSelectionChange(val){
             this.multipleSelection = val;
             
        
            // 强制要求复选框只能选择一个，大于等于2个的时候把第一个取消选中
            if(this.multipleSelection.length == 2){
                console.log(1)
                     for(var i= 0; i<this.tableData.length; i++){
                    if(this.tableData[i].cId == this.multipleSelection[0].cId){
                        this.$refs.multipleTable.toggleRowSelection(this.tableData[i],false);
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
            this.getAllCoinList(val,this.currentPage);
        },
        //当前第几页
      handleCurrentChange(val) {
            this.currentPage = val;
            this.getAllCoinList(this.pageSize,val)
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
        //获取所有打赏列表
        this.getAllCoinList();

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
</style>



