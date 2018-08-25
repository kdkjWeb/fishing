<template>
  <div id="post">
    <div id="lists">
      <!-- start顶部搜索按钮 -->
      <div class="topSearch">
        <el-row>
          <el-col :span="14">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
              <el-form-item label="标题：" >
                <el-input clearable placeholder="标题" v-model="formInline.title"></el-input>
              </el-form-item>
              <el-form-item label="作者：">
                <el-input clearable  placeholder="作者" v-model="formInline.publisherName"></el-input>
              </el-form-item>
              <el-form-item label="备注：" >
                <el-input clearable  placeholder="备注" v-model="formInline.remark"></el-input>
              </el-form-item>
              <el-form-item label="状态：">
                <el-select  placeholder="状态" clearable v-model="formInline.status">
                  <el-option label="审核" value="1"></el-option>
                  <el-option label="未审" value="0"></el-option>
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
           :row-class-name="tableRowClassName"
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
              width="30">
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
              :header-align="item.align"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
          <div class="aboutNum">
            <div> <span>合计：{{total}}</span><span>{{allNum.clickNum}}</span><span>{{allNum.collects}}</span><span>{{allNum.commentNum}}</span></div>
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

      <!-- start弹出框 -->
      <el-dialog
        title="视频"
        :visible.sync="dialogVisible"
        top="8vh"
        width="925px">
        <div class="dialog_content">
          <el-form label-position="right" ref="form" :rules="rules"  label-width="110px" :model="form" size="mini">
            <el-row>
              <el-col :span="24">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="圈子：" prop="title">
                      <el-input v-model="form.title"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="编号：" prop="number">
                      <el-input v-model="form.number" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="置顶：" >
                      <el-select  v-model="form.isTop" placeholder="置顶">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="精华：" >
                      <el-select v-model="form.isBest" placeholder="精华">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="状态：" prop="status">
                      <el-select v-model="form.status" placeholder="状态">
                        <el-option label="审核" value="1"></el-option>
                        <el-option label="未审" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="排序号：" prop="sort">
                      <el-input v-model="form.sort"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="帖子类型：" prop="topicType"  >
                      <el-input v-model="form.topicType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="浏览数：">
                      <el-input v-model="form.viewNum" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="评论数：">
                      <el-input v-model="form.commentNum" disabled></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="8">

                    <el-form-item label="视频分类：" prop="videoCategoryId"  ref="videoCategoryId">
                      <el-select v-model="form.videoCategoryId" placeholder="可见类型">
                        <el-option
                          v-for="(item,index) in videoList"
                          :label="item.codeName"
                          :value="item.codeName"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="收藏数：">
                      <el-input v-model="form.collects" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="点赞数：">
                      <el-input v-model="form.clickNum" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="打赏金额：" >
                      <el-input v-model="form.reward" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="备注：">
                  <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-col :span="16">
                <el-row>
                  <el-col :span="12">


                      <el-form-item label="创建人：" >
                        <el-select v-model="form.publisher"  filterable>
                          <el-option
                            v-for="(item,index) in userList"
                            :label="item.nickname"
                            :value="item.cId"
                            :key="index"></el-option>
                        </el-select>
                      </el-form-item>

                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="建立时间：">
                      <el-input v-model="form.publishTime" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="修改人：" >
                      <el-input v-model="form.modifierName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="建立时间：">
                      <el-input v-model="form.modifyTime" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="16" v-if="videoShow">
                <div class="video">
                  <video :src="video.contentUrl" :poster="video.thumbUrl?video.thumbUrl:'../../static/images/header.jpg'" width="300" height="240" controls></video>
                </div>
              </el-col>

              <el-col :span="24" v-else>
                <span class="uploadTitle">上传视频：</span>
                <el-upload
                  class="avatar-uploader"
                  accept="image/jpeg,image/png"
                  :action="`${this.$store.state.baseUrl}/common/uploadOssVideo`"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-success="handleVideoSuccess"
                  :headers="myHeaders"
                  name="video"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :before-upload="beforeUploadVideo"
                  :on-progress="uploadVideoProcess">
                  <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:10px;"></el-progress>
                  <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>

          </el-form>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancel('form')">取 消</el-button>
            <el-button size="mini" type="primary" @click="comfirm('form')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- end弹出框 -->

    </div>
    <div style="height: 30px;background: #42475B;margin:10px 0;margin-left: -20px;"></div>
    <div id="comment">
      <div class="topSearch" style="margin-bottom: 10px;">
        <el-row>
          <el-col :span="14">
            <!--<el-button type="primary" size="mini" @click="commentClick">评论</el-button>-->
            <el-button type="primary"  size="mini" @click="commentReplyClick">评论回复</el-button>
            <el-button size="mini" @click="pointOfDetailClick">点赞明细</el-button>
            <el-button size="mini" @click="praiseTheDetailClick">打赏明细</el-button>
          </el-col>

          <el-col :span="10" class="right" v-if="commentShow">
            <el-button type="primary" size="mini" @click="offComments" :disabled="disabled">审核</el-button>
            <el-button size="mini" @click="offComments"  :disabled="!disabled">取消审核</el-button>
            <el-button size="mini" @click="delComment">删除</el-button>
          </el-col>
        </el-row>
      </div>

      <div style="padding-right: 20px;">
        <div class="table1">
          <el-table
            max-height="height"
            ref="multiple"
            :data="commentData"
            tooltip-effect="dark"
            style="width: 100%"
            stripe
            :header-cell-style="getRowClass"
            @selection-change="selectionChange">
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
              v-for="(item,index) in commentList"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              :header-align="item.align"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    components: {
      ElCol,
      ElRow},
    data(){
      return{
        height: '',
        video: '',
        allNum: {
          commentNum: 0,   //评论总数
          collects: 0,    //收藏总数
          clickNum: 0   //点赞总数
        },
        rowIndex: '',

        //查询
        formInline:{
          status: '',
          title:'',
          remark:'',
          publisherName:'',
          date:'',
        },
        //增加
        topicCircle:'',
        titleName:'发送圈子：',
        dialogVisible:false,
        isShow:true,
        videoList:[],  //视频分类
        form:{
          title:'',  //标题、圈子
          isTop:'',  //是否置顶
          isBest:'',  //精华
          status:'',  //状态
          sort:null,  //排序号
          topicType:'',//帖子类型
          viewNum:'',  //浏览数
          commentNum:'',  //评论数
          reward:'',   //打赏金额
          videoCategoryId:'',  //视频分类
          remark:'',  //备注
          modifierName: '',   //修改人
          publisherName: '',   //创建人
          topicContentList:[], //视频
          publisher:''
        },
        topicContentArr:[
          {
            contentType:1,
            content:'.....',
            sort:0
          }
        ],
        userList:[],
        myHeaders: {     //上传图片携带token
          token: ''
        },
        addIsShow:true,
        videoFlag:false,
        videoUploadPercent:null,
        videoPath:'',
        videoShow:false,
        circleId:'',
        rules:{
          title: [
            { required: true, message: '请输入圈子名称', trigger: 'blur' },
          ],
          videoCategoryId:[
            {required: true, message: '请选择视频分类', trigger: 'change' },
          ]
        },
        multipleSelection: [],   //存放勾选的数据
        multipleComment:[],
        currentPage: 1, //当前第几页
        pageSize: 30,   //每页显示多少条
        total: null,   //总共多少条数据
        tableData:[],  //帖子列表
        commentData:[],  //评论列表
        commentShow:true,
        disabled: false,
        tableList: [   //表格的头部配置
          {prop: 'title', label: '标题', width: '200', align: ''},
          {prop: 'status', label: '状态', width: '60', align: ''},
          {prop: 'isTop', label: '置顶', width: '50', align: ''},
          {prop: 'isBest', label: '精华', width: '50', align: ''},
          {prop: 'topicType', label: '类型', width: '50', align: ''},
          {prop: 'sort', label: '排序号', width: '80', align: 'right'},
          {prop: 'viewNum', label: '浏览', width: '60', align: 'right'},
          {prop: 'commentNum', label: '评论', width: '60', align: 'right'},
          {prop: 'collects', label: '收藏', width: '60', align: 'right'},
          {prop: 'clickNum', label: '点赞', width: '60', align: 'right'},
          {prop: 'isVisibleCategoryId', label: '打赏', width: '60', align: 'right'},
          {prop: 'publisherName', label: '作者', width: '', align: ''},
          {prop: 'publishTime', label: '发布时间', width: '160', align: 'right'},
          {prop: 'modifyTime', label: '修改时间', width: '160', align: 'right'},
          {prop: 'remark', label: '备注', width: '', align: ''},
        ],
        commentList: [   //表格的头部配置
          {prop: 'status', label: '状态', width: '100', align: ''},
          {prop: 'sort', label: '楼层', width: '100', align: ''},
          {prop: 'type', label: '评论类型', width: '100', align: ''},
          {prop: 'replies', label: '回复数', width: '100', align: ''},
          {prop: 'likedNum', label: '点赞数', width: '100', align: 'right'},
          {prop: 'content', label: '评论内容', width: '100', align: ''},
          {prop: 'userId', label: '评论人(昵称)', width: '150', align: ''},
          {prop: 'cdate', label: '评论时间', width: '100', align: ''},
          {prop: 'location', label: '发帖地址', width: '', align: 'right'},
          {prop: 'modifier', label: '手机号', width: '100', align: ''},
          {prop: 'modifyTime', label: '用户类别', width: '', align: 'right'},
        ],
      }
    },
    methods:{
      //根据不同状态添加样式
      tableRowClassName({row, rowIndex}) {
          if(row.status === '审核'){
              return 'success-row';
          }else if(row.status === '未审'){
              return 'warning-row';
          }else{
              return '';
          }
    },


      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1个文件`);
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
      //获取用户  /user/getMoreUserInfo
      getUser(){
        this.$get('/user/getUserNameList',{}).then(res=>{
          if(res.code == 0){
            this.userList = res.data
          }
        })
      },

      //获取所有视频列表 /basicTopic/queryCommon
      getPostList(pageSize,pageNum){
        this.$post('/videoTopic/queryPageByWeb',{
          pageSize: pageSize? pageSize : 30,
          pageNum: pageNum ? pageNum : 1,
          status: this.formInline.status? this.formInline.status:null,
          title:this.formInline.title? this.formInline.title:null,
          remark:this.formInline.remark? this.formInline.remark:null,
          publisherName:this.formInline.publisherName? this.formInline.publisherName:null,
          publishTime: this.formInline.date?  `${this.dataTransform(this.formInline.date[0])} 00:00:00` : null,
          publishTime2: this.formInline.date?  `${this.dataTransform(this.formInline.date[1])} 23:59:59` : null,
        }).then(res=>{
          if(res.code == 0){
            this.tableData = res.data.list
            this.allNum.commentNum = this.allNum.collects = this.allNum.clickNum = 0;
            if(res.data.list) {
              res.data.list.forEach((val)=>{
                val.status  = val.status ? '审核' : '未审';
                val.isTop = val.isTop? '是':'';
                val.isBest = val.isBest? '是':'';
                console.log(val.topicType)
                switch (val.topicType){
                  case '1':
                      val.topicType = '标准';
                      break;
                  case '2':
                      val.topicType = '钓位';
                      break;
                  case '3':
                      val.topicType = '鱼情';
                      break;
                  case '4':
                      val.topicType = '视频';
                      break;
                  case '5':
                      val.topicType = '随便说说';
                      break;
                }

                //合计
                this.allNum.commentNum += val.commentNum;
                this.allNum.collects += val.collects;
                this.allNum.clickNum += val.clickNum;
              })

              this.$nextTick(function(){
                this.checked();//每次更新了数据，触发这个函数即可。
              })
            }
            this.total = res.data.total;
          }
        })
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
              this.commentReplyClick();
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

        for(var i= 0; i<this.tableData.length; i++){
          if(this.tableData[i].cId == this.multipleSelection[0].cId){
            this.commentReplyClick( );
            break;
          }
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
        this.currentPage = 1;
        this.getPostList()
      },

      //新增
      add(){
        this.imageUrl = '';
        this.videoPath = '';
        this.dialogVisible = true;
        this.form = {};
        this.videoShow = false;
        this.circleId = '';
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

      //获取视频分类  /sysCategory/queryByCategory

      getVideoClassification(){
          this.$post('/sysCategory/queryByCategory',{
              category:31
          }).then(res=>{
            console.log(res)
            this.videoList = res.data
          })
      },

      //点击确定   /basicTopic/addBasicTopic   /basicTopic/updateBasicTopic
      comfirm(form){

        this.$refs[form].validate((valid)=>{
          let url = this.circleId ? '/videoTopic/updateVideoTopic' : 'videoTopic/addVideoTopicByRole'    //如果this.circleId存在，那就是调修改接口，否则就是新增接口
          if(valid){
            this.$post(url,{
              cId: this.circleId ? this.circleId : null,
              title:this.form.title,  //标题、圈子
              isTop:this.form.isTop,  //是否置顶
              isBest:this.form.isBest,  //精华
              status:this.form.status,  //状态
              sort:this.form.sort,  //排序号
              viewNum:this.form.viewNum,  //浏览数
              publisher:this.form.publisher,  //浏览数
              videoCategoryId:this.form.videoCategoryId,
              remark:this.form.remark,   //打赏金额
              topicContentList:this.form.topicContentList
            }).then(res=>{
              this.dialogVisible = false;
              if(res.code == 0){
                this.videoUploadPercent = 0;
                this.$message({
                  message:res.msg,
                  type: 'success',
                });
                this.getPostList();
              }else{
                this.$message({
                  message: res.msg,
                  type: 'warning'
                });
                this.circleId = ''

              }

            })
          }
        })
      },

      //点击取消
      cancel(form){
        this.$refs[form].resetFields();
        this.dialogVisible = false;
      },

      //删除
      deleted(){
        if(this.multipleSelection.length != 1){
          this.$message({
            message: '请选择一条需要删除的数据！',
            type: 'warning'
          });
          return;
        }

        let id = this.multipleSelection[0].cId;   //保存选中的数据的cId
        this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('/videoTopic/falseDeleteBasicTopic',{
            topicId: id
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
                }
              })
              //表格第一行默认选中
              this.$nextTick(()=>{
                    this.checked();
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

//      //修改
      edit(){
       if(this.multipleSelection.length != 1){
         this.$message({
           message: '请选择一条需要修改的数据！',
           type: 'warning'
         });
         return;
       }
       this.dialogVisible = true;
       this.videoShow = true;
       this.circleId = this.multipleSelection[0].cId;   //获取每条圈子的id,用来判断点击弹出框的确认是新增还是修改
       this.$get('videoTopic/queryById',{
         topicId: this.circleId
       }).then(res=>{
         console.log(res)
         if(res.code == 0){
           this.form = res.data;
           this.form.title = res.data.title;
           this.form.number = this.rowIndex;
           this.form.isTop = res.data.isTop + '';
           this.form.isBest = res.data.isBest + '';
           this.form.status = res.data.status + '';
           this.video = this.form.topicContentList[0];
         }
       })
      },

      //导出
      exportd(){
            let path = this.$store.state.baseUrl;
            let href = path + 'videoTopic/downloadVideoTopic'
            let json = {};


            Object.keys(this.formInline).forEach((key,index)=>{
                if(this.formInline[key] != '' && key != 'date'){
                    json[key] = this.formInline[key]
                }else if(this.formInline.date.length > 0 && key == 'date'){
                    json.publishTime =  `${this.dataTransform(this.formInline.date[0])} 00:00:00`;
                    json.publishTime2 =  `${this.dataTransform(this.formInline.date[1])} 23:59:59`;
                }
            })

            if(Object.keys(json).length == 0){
                 href = href + '?' + 'pageSize' + '=' +0 + '&pageNum' + '=' +1
            }else{
                href = href + '?'+ 'pageSize' + '=' +0;
                Object.keys(json).forEach((key,index) => {
                if(json[key] != ''){
                    href = href+'&'+key+'='+json[key];
                }
            });
            }

            // console.log(href)
            location.href = href;
      },



      //评论回复
      commentReplyClick(){
        this.commentShow = true;
        this.commentList = [   //表格的头部配置
          {prop: 'status', label: '状态', width: '100', align: ''},
          {prop: 'sortStr', label: '楼层', width: '100', align: ''},
          {prop: 'type', label: '评论类型', width: '100', align: ''},
          {prop: 'recommendNum', label: '回复数', width: '100', align: 'right'},
          {prop: 'likedNum', label: '点赞数', width: '100', align: 'right'},
          {prop: 'content', label: '评论内容', width: '100', align: ''},
          {prop: 'userId', label: '评论人', width: '150', align: ''},
          {prop: 'cdate', label: '评论时间', width: '180', align: 'right'},
          {prop: 'location', label: '发帖地址', width: '', align: ''},
          {prop: 'commentUser.phone', label: '手机号', width: '120', align: 'right'},
          {prop: 'commentUser.role', label: '用户类别', width: '', align: ''},
        ]
        this.$post('/comments/getCommentList',{
          pid:this.multipleSelection[0].cId,
          type:4
        }).then(res=>{
            console.log(res)
          res.data.forEach((val)=>{
            //判读审核、取消审核按钮哪一个可以点
            val.status = val.status==1? '正常':'禁用';
            val.userId = val.commentUser.nickname;

            switch(val.type){
              case 1:
                val.type = '帖子评论';
                break;
              case 2:
                val.type = '店铺评论';
                break;
              case 11:
                val.type = '帖子评论的回复';
                break;
              case 21:
                val.type = '店铺评论的回复';
                break;
            };

            switch(val.commentUser.role){
              case 0:
                val.commentUser.role = '超级管理员';
                break;
              case 1:
                val.commentUser.role = '管理员';
                break;
              case 2:
                val.commentUser.role = '钓友';
                break;
              case 3:
                val.commentUser.role = '农家乐';
                break;
              default:
                val.commentUser.role = '渔具店';
                break;
            };
          })
          this.commentData = res.data;

          this.$nextTick(function(){
            this.check();//每次更新了数据，触发这个函数即可。
          })

        })

      },

      //点赞明细
      pointOfDetailClick(){
        this.commentShow = false;
        this.commentList = [   //表格的头部配置
          {prop: 'userId', label: '点赞人', width: '100', align: ''},
          {prop: 'cdate', label: '点赞时间', width: '180', align: 'right'},
          {prop: 'phone', label: '手机号', width: '120', align: 'right'},
          {prop: 'role', label: '用户类别', width: '100', align: ''},
          {prop: '', label: '', width: '', align: ''}
        ]

        this.$post('liked/getAllLList',{
          commentId: this.multipleSelection[0].cId,
          type:4
        }).then(res=>{
          if(res.code == 0){
            res.data.list.forEach((val)=>{
              switch(val.role){
                case 0:
                  val.role = '超级管理员';
                  break;
                case 1:
                  val.role = '管理员';
                  break;
                case 2:
                  val.role = '钓友';
                  break;
                case 3:
                  val.role = '农家乐';
                  break;
                default:
                  val.role = '渔具店';
                  break;
              };
            })
            this.commentData = res.data.list;

            this.$nextTick(function(){
              this.check();//每次更新了数据，触发这个函数即可。
            })
          }
        })
      },

      //打赏明细
      praiseTheDetailClick(){
        this.commentShow = false;
        this.commentList = [   //表格的头部配置
          {prop: 'payer', label: '打赏人', width: '100', align: ''},
          {prop: 'num', label: '打赏金额', width: '100', align: 'right'},
          {prop: 'cdate', label: '打赏时间', width: '180', align: 'right'},
          {prop: 'phone', label: '手机号', width: '120', align: 'right'},
          {prop: 'type', label: '用户类别', width: '100', align: ''},
          {prop: '', label: '', width: '', align: ''}
        ];

        this.$post('scorecoin/getAllCoinList',{
          topicId:this.multipleSelection[0].cId,
          type:'打赏'
        }).then(res=>{
          res.data.list.forEach((val)=> {
            switch (val.role) {
              case 0:
                val.role = '超级管理员';
                break;
              case 1:
                val.role = '管理员';
                break;
              case 2:
                val.role = '钓友';
                break;
              case 3:
                val.role = '农家乐';
                break;
              default:
                val.role = '渔具店';
                break;
            }
          })
          this.commentData = res.data.list;
          this.$nextTick(function(){
            this.check();//每次更新了数据，触发这个函数即可。
          })

        })
      },

      //多选框选中之后存放的数据
      selectionChange(val){
        this.multipleComment = val;
        // 强制要求复选框只能选择一个，大于等于2个的时候把第一个取消选中
        if(this.multipleComment.length == 2){
          for(var i= 0; i<this.commentData.length; i++){
            if(this.commentData[i].cId == this.multipleComment[0].cId){
              this.$refs.multiple.toggleRowSelection(this.commentData[i],false);
              break;
            }
          }
        }
        //虽然是多选框，但是产品设计每次只能选着一个
        if(this.multipleComment.length == 1){
          for(var i= 0; i<this.commentData.length; i++){
            if(this.commentData[i].cId == this.multipleComment[0].cId){
              break;
            }
          }
        }


        if(this.multipleComment[0] != undefined){
              if(this.multipleComment[0].status == '正常'){
                  this.disabled = false;
                }else if(this.multipleComment[0].status == '禁用'){
                  this.disabled = true;
                }
            }
      },

      //默认选择一行
      check(){
        this.$refs.multiple.toggleRowSelection(this.commentData[0],true);

        if(this.multipleComment[0] != undefined){
             if(this.multipleComment[0].status == '正常'){
                this.disabled = false;
              }else if(this.multipleComment[0].status == '禁用'){
                this.disabled = true;
              }
           }
      },

      //审核、取消审核
      offComments(){
        let id = this.multipleComment[0].cId;   //保存选中的数据的cId
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
              //获取所有评论列表
              this.commentReplyClick();

              this.$message({
                type: 'success',
                message: '审核状态更改成功！'
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

      //删除
      delComment(){
        let id = this.multipleComment[0].cId;   //保存选中的数据的cId

        this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('comments/delComments',{
            id: id
          }).then(res=>{
            if(res.code == 0){
              this.commentData.forEach((val,index)=>{
                if(val.cId == id){
                  this.commentData.splice(index,1)
                  this.total -=1;
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  //表格第一行默认选中
                  this.$nextTick(()=>{
                    this.check();
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

      //删除内容
      deleteImage(index){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.topicContentArr.forEach((val,num)=>{
            if(index == num){
              console.log(val,index)
              this.topicContentArr.splice(index,1);
            }
          })
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

      //上传视频
      beforeUploadVideo(file) {
        const isLt10M = file.size / 1024 / 1024  < 50;
        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb','video/x-ms-wmv'].indexOf(file.type) == -1) {
          this.$message.error('请上传正确的视频格式');
          return false;
        }
        if (!isLt10M) {
          this.$message.error('上传视频大小不能超过50MB哦!');
          return false;
        }
      },
      // 上传进度显示：
      uploadVideoProcess(event, file, fileList){
        this.videoFlag = true;
        this.videoUploadPercent = Number(file.percentage.toFixed(0));
      },
      //上传成功
      handleVideoSuccess(res, file){
        this.videoUploadPercent = 100;
        this.videoPath = URL.createObjectURL(file.raw);
//        this.form.videoUrl = res.data;

        this.$message({
          message:'上传视频成功',
          type: 'success',
        });

        this.form.topicContentList=[{
          contentType:3,
          content:res.data,
          sort:1
        }]
      },
    },
    created(){
      this.height = window.innerHeight - 674;
    },
    mounted(){
      window.addEventListener('resize', ()=>{
             this.height = window.innerHeight - 674;
        })
      if(this.$store.state.token){
        this.myHeaders.token = this.$store.state.token
      }
      //获取所有帖子列表 /basicTopic/queryCommon
      this.getPostList();
      //表格第一行默认选中
      this.checked();

      //获取用户  /user/getMoreUserInfo
      this.getUser()

      this.getVideoClassification();
      this.check();
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
  #post  .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px ;
    border-left: 2px solid #2693fa;
    padding-left: 8px;
  }
  #post  .el-date-editor--datetime input{
    width: 184.66px;
  }

  #post  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  #post .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #post .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 140px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  #post  .avatar {
    width: 140px;
    height: 80px;
    display: block;
  }
  #post .el-upload__tip{
    /*text-align: right;*/
    margin-left:80px;
  }
  #post .el-table th, .el-table tr{
    /*background: #EFEFEF;*/
  }

  #post.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #post.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #post .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }

   #post .el-table .warning-row {
    /* background:#3399fb; */
    color: red;
  }

  #post .el-table .success-row {
     background: #fff;
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
  .table1{
        border: 1px solid #ddd;
    background: red;
  }
  .dialog_content{
    width: 100%;
  }
  .page{
    text-align: right;
    margin: 20px 0 0px;
  }
  #post span.uploadTitle{
    float: left;
    line-height: 100px;
    padding-right: 15px;
    width:100px;
    display: inline-block;
    text-align: right;
  }
  .aboutNum{
    width: 810px;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .aboutNum span:nth-child(1){
    padding-left: 10px;
  }
  .aboutNum span:nth-child(2),.aboutNum span:nth-child(3),.aboutNum span:nth-child(4){
    display: inline-block;
    width: 60px;
    float: right;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;
  }


.video{
    width: 300px;
    height: 240px;
    margin: 0 auto;
  }
</style>
