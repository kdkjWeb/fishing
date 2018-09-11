<template>
  <div class="rating">
    <!-- start顶部搜索按钮 -->
    <div class="topSearch">
      <el-row>
        <el-col :span="14">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item label="状态：">
              <el-select v-model="formInline.status" placeholder="状态" clearable>
                <el-option label="支付成功" value="1"></el-option>
                <el-option label="申请提现" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型：">
              <el-select v-model="formInline.topicType" placeholder="类型" clearable>
                <el-option label="钓友" value="钓友"></el-option>
                <el-option label="农家乐" value="农家乐"></el-option>
                <el-option label="渔具店" value="渔具店"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单号：">
              <el-input clearable v-model="formInline.serialNumber" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="微信号：">
              <el-input clearable v-model="formInline.wechat" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="手机号：">
              <el-input clearable v-model="formInline.phone" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="申请时间：">
              <el-date-picker
                v-model="formInline.applyDate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="支付时间：" style="margin-left: 120px;">
              <el-date-picker
                v-model="formInline.paymentDate"
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
          <el-button size="mini" @click="payment">支付</el-button>

        </el-col>
      </el-row>
    </div>
    <!-- end顶部搜索按钮 -->

    <!-- start表格 -->
    <div class="table">
      <el-table
        :row-class-name="tableRowClassName"
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
          width="30">
        </el-table-column>
        <el-table-column
          type="index"
          width="50"
          header-align="right"
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
          :header-align="item.align1"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
      <div class="aboutNum">
        <div> <span>合计：{{total}}</span></div>
      </div>
    </div>
    <!-- end表格 -->

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
</template>

<script>
  import Axios from 'axios'

  export default {
    data(){
      return{

        formInline: {
          topicType: '',
          status: '',
          serialNumber:'',
          wechat:'',
          phone:'',
          applyDate:'',
          paymentDate:''
        },
        height:0,
        currentPage: 1, //当前第几页
        pageSize: 30,   //每页显示多少条
        total: null,   //总共多少条数据
        tableList: [   //表格的头部配置
          {prop: 'status', label: '状态', width: '100', align: 'left',},
          {prop: 'serialNumber', label: '提现编号', width: '120', align: 'right'},
          {prop: 'nickname', label: '申请人', width: '100', align: 'left'},
          {prop: 'wechat', label: '微信号', width: '100', align: 'right'},
          {prop: 'phone', label: '手机号', width: '120', align: 'right'},
          {prop: 'userType', label: '类型', width: '100', align: 'left'},
          {prop: 'leftCoin', label: '当前个人余额', width: '150', align: 'right'},
          {prop: 'coinNum', label: '提现金币', width: '160', align: 'right'},
          {prop: 'amount', label: '提现金额', width: '160', align: 'right'},
          {prop: 'applyTime', label: '申请时间', width: '160', align: 'right'},
          {prop: 'payer', label: '支付人', width: '100', align: 'left'},
          {prop: 'finishTime', label: '支付时间', width: '160', align: 'right'},
          {prop: '', label: '', width: '', align: ''},
        ],
        tableData: []//表格的数据
      }
    },
    methods:{

      //根据不同状态添加样式
      tableRowClassName({row, rowIndex}) {
        if(row.status === '支付成功'){
          return 'success-row';
        }else if(row.status === '申请提现'){
          return 'warning-row';
        }else{
          return '';
        }
      },

      //获取所有提现列表  /getCash/getGetCashList
      getPutForward(pageSize,pageNum){
        this.$post('/getCash/getGetCashList',{
          pageSize: pageSize? pageSize : 30,
          pageNum: pageNum ? pageNum : 1,
          status: this.formInline.status? this.formInline.status: null,
          serialNumber: this.formInline.serialNumber? this.formInline.serialNumber: null,
          userType: this.formInline.topicType? this.formInline.topicType: null,
          wechat: this.formInline.wechat? this.formInline.wechat: null,
          phone: this.formInline.phone? this.formInline.phone: null,
          applyTime: this.formInline.applyDate? `${this.dataTransform(this.formInline.applyDate[0])} 00:00:00` : null,
          applyEndTime: this.formInline.applyDate ? `${this.dataTransform(this.formInline.applyDate[1])} 00:00:00`: null,
          finishTime: this.formInline.paymentDate ? `${this.dataTransform(this.formInline.paymentDate[0])} 00:00:00`: null,
          finishEndTime: this.formInline.paymentDate ? `${this.dataTransform(this.formInline.paymentDate[1])} 00:00:00` : null,
        }).then(res=>{
            if(res.code == 0){
              this.tableData = res.data.list;
              this.tableData.forEach((val)=>{
                val.status = val.status == 1? '支付成功':'申请提现'
              })
            }else{
              this.$message({
                type: 'waring',
                message: res.msg
              });
            }


            this.$nextTick(function() {
              this.checked();//每次更新了数据，触发这个函数即可。
            })
        })
      },
      //查询
      search(){
        this.currentPage = 1;
        this.getPutForward();
      },

      //导出
      exportd(){
        let path = this.$store.state.baseUrl;
        let href = path + 'getCash/downloadAllLList';
        let json = {};

        Object.keys(this.formInline).forEach((key,index)=>{
          if(this.formInline[key] != '' && key != 'date'){
            json[key] = this.formInline[key];
          }
        })

        if(Object.keys(json).length == 0){
          href = href + '?' + 'pageSize' + '=' +0 + '&pageNum' + '=' +1;
        }else{
          href = href + '?'+ 'pageSize' + '=' + 0;
          Object.keys(json).forEach((key,index) => {
            if(json[key] != ''){
              href = href+'&'+key+'='+json[key];
            }
          });
        }

//        Axios.get(href,{
//            header:{
//                token:this.$store.state.token
//            },
//          params:{
//            pageSize:0,
//            pageNum:1
//          }
//        }).then(res=>{
//          location.href = href + '?' + 'pageSize' + '=' +0 + '&pageNum' + '=' +1;
//          Axios.defaults.headers['token'] = this.$store.state.token;
//        })

         location.href = href;
      },

      //支付  /getCash/payCash
      payment(){
        if (this.multipleSelection[0].status == '支付成功') {
          this.$message({
            type: 'waring',
            message: '已支付！'
          });
        } else {
          this.$confirm(' 是否支付?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then((res) => {
                this.$get('/getCash/payCash', {
                  cashId: this.multipleSelection[0].cId
                }).then(res => {
                  this.$message({
                    type: 'success',
                    message: '支付成功!'
                  });
                })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消支付'
            });
          });
        }
      },

      //多选框选中之后存放的数据
      handleSelectionChange(val){
        this.multipleSelection = val;
        // 强制要求复选框只能选择一个，大于等于2个的时候把第一个取消选中
        if(this.multipleSelection.length == 2){
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

      //每页显示多少条数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.getPutForward(val,this.currentPage);
      },

      //当前第几页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getPutForward(this.pageSize,val)
      },

      //默认选中第一行
      checked(){
        //首先el-table添加ref="multipleTable"引用标识
        this.$refs.multipleTable.toggleRowSelection(this.tableData[0],true);
        if(this.currentPage == 1){
          this.rowIndex = 1;
        }
      },
      //标准时间格式转换
      dataTransform(date){
        if(date){
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          return y + '-' + m + '-' + d;
        }else{
          return null;
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

    },
    mounted(){
      window.addEventListener('resize', ()=>{
        this.height = window.innerHeight - 240;
      })

      //获取提现列表
      this.getPutForward();
      //表格第一行默认选中
      this.checked();
    },
    created() {
      //页面加载时获取屏幕高度
      this.height = window.innerHeight - 240;
    },
  }
</script>


<style>
  .rating .topSearch .el-form-item__content{
    width: 100px;
  }
  .rating .topSearch .el-date-editor{
    width: 220px;
  }
  .rating .table .el-table .el-table__body-wrapper{
    overflow-y: scroll;
  }
  .rating .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px ;
    border-left: 2px solid #2693fa;
    padding-left: 8px;
  }
  .rating .el-date-editor--datetime input{
    width: 176.66px;
  }

  .rating .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .rating .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .rating .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .rating .avatar {
    width: 140px;
    height: 80px;
    display: block;
  }

  .rating .el-upload__tip{
    text-align: right;
  }

  .rating .el-table .warning-row {
    /* background:#3399fb; */
    color: red;
  }

  .rating .el-table .success-row {
    background: #fff;
  }
</style>

<style scoped>
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
