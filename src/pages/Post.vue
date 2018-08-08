<template>
  <div id="post">
    <div id="lists">
      <!-- start顶部搜索按钮 -->
      <div class="topSearch">
        <el-row>
          <el-col :span="14">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
              <el-form-item label="标题：">
                <el-input clearable placeholder="圈子"></el-input>
              </el-form-item>
              <el-form-item label="作者：">
                <el-input clearable  placeholder="详细地址"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input clearable  placeholder="详细地址"></el-input>
              </el-form-item>
              <el-form-item label="状态：">
                <el-select  placeholder="状态" clearable>
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="已关闭" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="创建时间：">
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
            <el-button size="mini" @click="add">新增</el-button>
            <el-button size="mini" @click="deleted">删除</el-button>
            <el-button size="mini" @click="edit">修改</el-button>
            <el-button size="mini" @click="exportd">导出</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- end顶部搜索按钮 -->

      <!-- start表格 -->
      <div style="padding-right: 20px;">
        <div class="table">
          <el-table
            height="300"
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
            <div> <span>合计：{{total}}</span></div>
          </div>
        </div>

        <!-- start分页 -->
        <div class="page" >
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
      <!-- end表格 -->
    </div>
    <div style="height: 30px;background: #42475B;margin:10px 0;margin-left: -20px;"></div>
    <div id="comment">
      <!--<div class="topSearch" style="margin-bottom: 10px;">-->
        <!--<el-row>-->
          <!--<el-col :span="14">-->
            <!--<el-button type="primary" size="mini" @click="search">评论</el-button>-->
            <!--<el-button size="mini" @click="add">评论回复</el-button>-->
            <!--<el-button size="mini" @click="deleted">点赞明细</el-button>-->
            <!--<el-button size="mini" @click="edit">打赏明细</el-button>-->
          <!--</el-col>-->

          <!--<el-col :span="10" class="right">-->
            <!--<el-button type="primary" size="mini" @click="search">审核</el-button>-->
            <!--<el-button size="mini" @click="add">取消审核</el-button>-->
            <!--<el-button size="mini" @click="deleted">删除</el-button>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->

      <!--<div style="padding-right: 20px;">-->
        <!--<div class="table">-->
          <!--<el-table-->
            <!--height="300"-->
            <!--ref="multipleTable"-->
            <!--:data="commentData"-->
            <!--tooltip-effect="dark"-->
            <!--style="width: 100%"-->
            <!--stripe-->
            <!--:header-cell-style="getRowClass"-->
            <!--@selection-change="handleSelectionChange">-->
            <!--<el-table-column-->
              <!--type="selection"-->
              <!--width="55">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--type="index"-->
              <!--width="50"-->
              <!--header-align="center"-->
              <!--align="right"-->
              <!--:index="index"-->
              <!--label="编号">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--width="100"-->
              <!--header-align="center"-->
              <!--label="用户图标">-->
              <!--<template slot-scope="scope">-->
                <!--<div style="width:50px;height:50px;">-->
                  <!--<img :src="scope.row.iconUrl" style="width:100%;">-->
                <!--</div>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column-->
              <!--v-for="(item,index) in commentList"-->
              <!--:key="index"-->
              <!--:prop="item.prop"-->
              <!--:label="item.label"-->
              <!--:width="item.width"-->
              <!--:align="item.align"-->
              <!--header-align="center"-->
              <!--:show-overflow-tooltip="true"-->
            <!--&gt;-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--<div class="aboutNum">-->
            <!--<div> <span>合计：{{total}}</span></div>-->
          <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash; start分页 &ndash;&gt;-->
        <!--<div class="page" >-->
          <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page.sync="currentPage"-->
            <!--:page-sizes="[30, 50, 80, 100]"-->
            <!--:page-size="pageSize"-->
            <!--layout="total, sizes, prev, pager, next, jumper"-->
            <!--:total="total"-->
            <!--background>-->
          <!--</el-pagination>-->
        <!--</div>-->
        <!--&lt;!&ndash; end分页 &ndash;&gt;-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {
      data(){
          return{
            formInline:{
              status: '',

            },
            multipleSelection: [],   //存放勾选的数据
            currentPage: 1, //当前第几页
            pageSize: 30,   //每页显示多少条
            total: null,   //总共多少条数据
            tableData:[],  //帖子列表
            commentData:[],  //评论列表
            tableList: [   //表格的头部配置
              {prop: 'cityName', label: '标题', width: '100', align: ''},
              {prop: 'status', label: '状态', width: '100', align: ''},
              {prop: 'isTop', label: '置顶', width: '100', align: ''},
              {prop: 'isBest', label: '精华', width: '100', align: ''},
              {prop: 'orderBy', label: '排序号', width: '100', align: ''},
              {prop: 'viewNum', label: '浏览', width: '100', align: 'right'},
              {prop: 'commentNum', label: '评论', width: '120', align: 'right'},
              {prop: 'collects', label: '收藏', width: '100', align: 'right'},
              {prop: 'clickNum', label: '点赞', width: '150', align: 'right'},
              {prop: 'isVisibleCategoryId', label: '打赏', width: '100', align: 'right'},
              {prop: 'authorId', label: '作者', width: '', align: 'right'},
              {prop: 'publishTime', label: '发布时间', width: '100', align: 'right'},
              {prop: 'modifyTime', label: '修改时间', width: '', align: 'right'},
              {prop: 'remark', label: '备注', width: '', align: ''},
            ],
            commentList: [   //表格的头部配置
              {prop: 'status', label: '编号', width: '100', align: ''},
              {prop: 'status', label: '状态', width: '100', align: ''},
              {prop: 'type', label: '楼层', width: '100', align: ''},
              {prop: 'type', label: '评论类型', width: '100', align: ''},
              {prop: 'type', label: '回复数', width: '100', align: ''},
              {prop: 'level', label: '点赞数', width: '100', align: 'right'},
              {prop: 'name', label: '不赞数', width: '120', align: ''},
              {prop: 'score', label: '评论内容', width: '100', align: ''},
              {prop: 'coin', label: '评论人', width: '150', align: ''},
              {prop: 'creator', label: '评论时间', width: '100', align: ''},
              {prop: 'creatTime', label: '发帖地址', width: '', align: 'right'},
              {prop: 'modifier', label: '手机号', width: '100', align: ''},
              {prop: 'modifyTime', label: '用户类型', width: '', align: 'right'},
            ],
          }
      },
    methods:{

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
      //获取所有帖子列表 /basicTopic/queryCommon
      getPostList(pageSize,pageNum){
        this.$post('/basicTopic/queryCommon',{
          pageSize: pageSize? pageSize : 30,
          pageNum: pageNum ? pageNum : 1,
        }).then(res=>{
            if(res.code == 0){
                console.log(res)
              this.tableData = res.data.list
              res.data.list.forEach((val)=>{
                val.status  = val.status ? '正常' : '已关闭';
              })
              this.total = res.data.total;
            }
        })
      },
      //多选框选中之后存放的数据
      handleSelectionChange(val){
        this.multipleSelection = val;
        // 强制要求复选框只能选择一个，大于等于2个的时候把第一个取消选中
        console.log(this.multipleSelection)
        if(this.multipleSelection.length == 2){
            alert(1)
          for(var i= 0; i<this.tableData.length; i++){
            if(this.tableData[i].cId == this.multipleSelection[0].cId){
              this.$refs.multipleTable.toggleRowSelection(this.tableData[i],false);
              break;
            }
          }
        }
        //虽然是多选框，但是产品设计每次只能选着一个
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
      //每页显示多少条数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getPostList(val,this.currentPage);
      },
      //当前第几页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getRatingList(this.pageSize,val)
      },
      //查询
      search(){

      },
      //新增
      add(){

      },
      //删除
      deleted(){

      },
      //修改
      edit(){

      },
      //导出
      exportd(){

      }
    },
    mounted(){
      //获取所有帖子列表 /basicTopic/queryCommon
      this.getPostList()

//      if(this.$store.state.token){
//        this.myHeaders.token = this.$store.state.token
//      }
      //表格第一行默认选中
      this.checked();

    },


  }
</script>

<style>
  #post .topSearch .el-form-item__content{
    width: 100px;
  }
  #lists .topSearch  .el-date-editor{
    width: 220px;
  }
  #post .topSearch  .el-table{
    overflow-y: scroll;
  }
  #post .rating .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px ;
    border-left: 2px solid #2693fa;
    padding-left: 8px;
  }
  #post .rating .el-date-editor--datetime input{
    width: 176.66px;
  }

  #post .rating .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #post .rating .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #post .rating .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  #post .rating .avatar {
    width: 140px;
    height: 80px;
    display: block;
  }
  #post  .rating .el-upload__tip{
    text-align: right;
  }
  #post .el-table th, .el-table tr{
    /*background: #EFEFEF;*/
  }
</style>
<style scoped>
  #post{
    width: calc(100% - -20px);
  }
  #lists{
    height:50%;
  }
  .topSearch{
    padding-right: 20px;
  }
.topSearch .right{
  text-align: right;
}
.table{
  border: 1px solid #ddd;
}
.dialog_content{
  width: 100%;
}
.page{
  text-align: right;
  margin: 20px 0 0px;
}
.rating span.uploadTitle{
  float: left;
  line-height: 100px;
  padding-right: 15px;
}
.aboutNum{
  width: 785px;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
  box-sizing: border-box;
}
.aboutNum span:nth-child(1){
  padding-left: 10px;
}
</style>
