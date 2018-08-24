<template>
    <div class="rating">
        <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="14">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="名称：">
                            <el-input clearable v-model="formInline.name" placeholder="名称"></el-input>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <el-select v-model="formInline.status" placeholder="状态" clearable>
                              <el-option label="正常" value="1"></el-option>
                              <el-option label="已关闭" value="0"></el-option>
                            </el-select>
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
                header-align="right"
                align="right"
                :index="index"
                label="编号">
                </el-table-column>
              <el-table-column
                width="100"
                header-align="center"
                label="用户图标">
                <template slot-scope="scope">
                  <div style="width:50px;height:50px; text-align: center;">
                    <img :src="scope.row.iconUrl" style="width:100%;">
                  </div>
                </template>
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

        <!-- start弹出框 -->
        <el-dialog
        title="等级-新增用户等级"
        :visible.sync="dialogVisible"
        top="8vh"
        width="600px">
        <div class="dialog_content">
            <el-form label-position="right" label-width="100px" ref="form"  :model="form" :rules="rules"  size="mini">

                <el-row>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="编号：" >
                            <el-input v-model="form.number" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                         <el-form-item label="状态：">
                            <el-select v-model="form.status" placeholder="状态">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="已关闭" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="11" :offset="1">
                        <span class="uploadTitle">上传图标：</span>
                        <el-upload
                        class="avatar-uploader"
                        accept="image/jpeg,image/png"
                        :action="`${this.$store.state.baseUrl}common/uploadOssPic`"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        name="picture"
                        :headers="myHeaders"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <!-- <div slot="tip" class="el-upload__tip">只支持jpg/png类型，且不超过2M</div> -->
                        </el-upload>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                     <el-form-item label="类型：" prop="type">
                       <el-select v-model="form.type" placeholder="类型">
                         <el-option label="钓友" value="1"></el-option>
                         <el-option label="农家乐" value="2"></el-option>
                         <el-option label="渔具店" value="3"></el-option>
                       </el-select>
                     </el-form-item>
                  </el-col>
                  <el-col :span="12">
                     <el-form-item label="等级：" prop="level">
                       <el-input v-model.number="form.level" min="0" max="100" placeholder="最高等级100"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                 <el-row>
                  <el-col :span="12">
                     <el-form-item label="等级名称：" prop="name">
                          <el-input v-model="form.name"></el-input>
                     </el-form-item>
                  </el-col>
                  <el-col :span="12">
                     <el-form-item label="升级分值：" prop="score">
                        <el-input v-model.number="form.score" placeholder="请输入数字"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                 <el-row>
                  <el-col :span="12">
                      <el-form-item label="用户类型：">
                            <el-select v-model="form.userType" placeholder="用户类型">
                            <el-option label="钓友" value="1"></el-option>
                            <el-option label="农家乐" value="2"></el-option>
                            <el-option label="渔具店" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
                  <el-col :span="12">
                     <el-form-item label="娱乐币奖励：">
                        <el-input v-model="form.coin"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="创建人：">
                          <el-input v-model="form.creator" disabled></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="创建时间：" >
                          <el-date-picker
                              v-model="form.creatTime"
                              type="datetime"
                              disabled
                              placeholder="选择日期时间"
                              default-time="12:00:00">
                          </el-date-picker>
                      </el-form-item>
                  </el-col>
                  </el-row>
                   <el-row>
                    <el-col :span="12">
                        <el-form-item label="修改人：">
                            <el-input v-model="form.modifier" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="修改时间：" >
                            <el-date-picker
                                v-model="form.modifyTime"
                                type="datetime"
                                disabled
                                placeholder="选择日期时间"
                                default-time="12:00:00">
                            </el-date-picker>
                        </el-form-item>
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
</template>

<script>
export default {
    data(){
        return{
            myHeaders: {     //上传图片携带token
                    token: ''
                },
            height:0,
            dialogVisible: false,   //弹出框是否显示
            imageUrl: '',  //上传图片显示
            multipleSelection: [],   //存放勾选的数据
            currentPage: 1, //当前第几页
            pageSize: 30,   //每页显示多少条
            total: null,   //总共多少条数据
            circleId: '',
            rowIndex: '',   //每一行的编号
            codeNameList: [],   //圈子分类
            provinceList: [],  //省份
            cityList: [],   //市
            areaList: [],    //县级
            countryList: [],   //乡镇
            formInline: {   //圈子、详细地址、创建时间的表单
              name: '',
              status: ''
            },
            form:{
                number: '',   //编号
                status: '',   //状态
                creatTime:'',   //创建时间
                cUser:'',     //创建人
                modifyTime:'',  //修改时间
                modifyUser:'',  //修改人
                coin:'',  //娱乐奖励金币
                type:'',  //类型
                userType:'',  //用户类型
                score:'',  //升级分值
                name:'',  //等级名称
                userPacote:'',  //用户分组
                level: null,  //等级
                icon: ''   //图标
            },
          rules:{
            name:[
              { required: true, message: '等级名称不能为空，请输入', trigger: 'blur' }
            ],
            type:[
              { required: true, message: '类型不能为空，请选择', trigger: 'change' }
            ],
            level:[
              { required: true, message: '等级不能为空，请输入', trigger: 'blur' },
              {pattern: /^([0-9][0-9]{0,1}|100)$/, message: '等级必须是数字0-100', trigger: 'blur' }
            ],
            score: [{
                type: 'number',
                trigger: 'blur',
                required: false,
                message: '升级分值必须为数字值'
            }]
          },
            tableList: [   //表格的头部配置
                {prop: 'status', label: '状态', width: '60', align: '',align1: 'left'},
                {prop: 'type', label: '类型', width: '80', align: '',align1: 'left'},
                {prop: 'level', label: '等级', width: '60', align: 'right',align1: 'right'},
                {prop: 'name', label: '名称', width: '100', align: '',align1: 'left'},
                {prop: 'score', label: '升级分值', width: '80', align: 'right',align1: 'right'},
                {prop: 'coin', label: '娱乐币奖励', width: '100', align: 'right',align1: 'right'},
                {prop: 'creator', label: '创建人', width: '100', align: '',align1: 'left'},
                {prop: 'creatTime', label: '创建时间', width: '160', align: 'right',align1: 'right'},
                {prop: 'modifier', label: '修改人', width: '100', align: '',align1: 'left'},
                {prop: 'modifyTime', label: '修改时间', width: '160', align: 'right',align1: 'right'},
                {prop: '', label: '', width: '', align: '',align1: ''},
            ],
            tableData: []//表格的数据
        }
    },
    methods:{
        //获取所有等级列表
        getRatingList(pageSize,pageNum){

            this.$post('levelRule/queryByRecord',{
                pageSize: pageSize? pageSize : 30,
                pageNum: pageNum ? pageNum : 1,
                name: this.formInline.name ? this.formInline.name : null,
                status: this.formInline.status ? this.formInline.status : null
            }).then(res=>{
                if(res.code == 0){
                  //  this.tableData = res.data.list;
                    if(res.data.list.length <= 0){   //如果后面没返回数据就直接赋值
                        this.tableData = res.data.list;
                    }else{   //返回数据之后进行数据处理
                        let arr = res.data.list;
                        arr.forEach((e,index) => {
                           arr[index].creator = e.creator ? e.creator.nickname : '';
                           arr[index].modifier = e.modifier ? e.modifier.nickname : '';
                           arr[index].status = e.status ? '正常' : '已关闭';
                            if(e.type == 1){
                                arr[index].type = '钓友'
                            }else if(e.type == 2){
                                arr[index].type = '渔具店'
                            }else{
                                arr[index].type = '农家乐'
                            }
                           this.tableData = JSON.parse(JSON.stringify(arr))
                        });
                         this.$nextTick(function(){
                            this.checked();//每次更新了数据，触发这个函数即可。
                        })
                    }
                    this.total = res.data.total;
                }
            })
        },
        //查询
        search(){
            this.currentPage = 1;
            this.getRatingList();
        },

//        新增
        add(){
            this.dialogVisible = true;
            this.disabled = true;
            this.form = {};
            this.imageUrl = '';
            this.circleId = ''
        },

      //标准时间格式转换
      dataTransform(date){
        if(date){
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          var minute = date.getMinutes();
          minute = minute < 10 ? ('0' + minute) : minute;
          var second = date.getSeconds();
          second = second < 10 ? ('0' + second) : second;
          return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        }else{
          return null;
        }
      },

      //弹出框的确认按钮  /levelRule/addLevelRule
      comfirm(formName){
        if(!this.form.icon){
          this.$message({
            message: '请上传等级的图标！',
            type: 'warning'
          });
          return;
        }

        this.$refs[formName].validate((valid) => {
          let url = this.circleId ? '/levelRule/updateLevelRule' : '/levelRule/addLevelRule'    //如果this.circleId存在，那就是调修改接口，否则就是新增接口
          let status = (this.form.status == '正常' ||this.form.status == '1') ? 1 : 0;
          let type  = (this.form.type == '钓友' || this.form.type == '1')? 1:(this.form.type == '农家乐' || this.form.type == '2')? 2 : 3


          if (valid) {
            this.$post(url,{
              cId: this.circleId ? this.circleId : null,
              number: this.form.number,   //编号
              status: status,   //状态
              cUser:this.form.cUser,     //创建人
              modifyUser:this.form.modifyUser,  //修改人
              coin:this.form.coin,  //娱乐奖励金币
              type: type,  //类型
              score:this.form.score,  //升级分值
              name:this.form.name,  //等级名称
              userPacote:this.form.userPacote,  //用户分组
              level:this.form.level,  //等级
              icon:this.form.icon   //图标
            }).then(res=>{
              if(res.code == 0){
                this.dialogVisible = false;
                this.$message({
                  message:res.msg,
                  type: 'success',
                });
                this.getRatingList();
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },

      //弹出框的取消按钮
      cancel(form){
        this.$refs[form].resetFields();
        this.form = {}
        this.dialogVisible = false;
      },

//        删除
        deleted(){
            if(this.multipleSelection.length != 1){
                this.$message({
                message: '请选择一条需要删除的数据！',
                type: 'warning'
                });
                return;
            }
            let id = this.multipleSelection[0].cId;   //保存选中的数据的cId

               this.$confirm('此操作将永久删除该圈子, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$get('levelRule/deleteLevelRule',{
                        levelRuleId: id
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
                        }
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                });
        },
//        修改
        edit(){

            if(this.multipleSelection.length != 1){
                this.$message({
                message: '请选择一条需要修改的数据！',
                type: 'warning'
                });
                return;
            }
            this.dialogVisible = true;
            this.circleId = this.multipleSelection[0].cId;   //获取每条圈子的id,用来判断点击弹出框的确认是新增还是修改

            let data = this.multipleSelection[0];

            // 修改圈子数据回显

          if(this.circleId){
            this.form = data;
            this.form.userType = this.form.type;
            this.form.number = this.rowIndex;
            this.imageUrl = this.form.iconUrl;
          }


        },
        //导出
        exportd(){
            let path = this.$store.state.baseUrl;
            let href = path + 'levelRule/downloadByType'
            let json = {};

            Object.keys(this.formInline).forEach((key,index)=>{
                if(this.formInline[key] != '' && key != 'date'){
                    json[key] = this.formInline[key]
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
            console.log(href)
           location.href = href;
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
            this.getRatingList(val,this.currentPage);
        },

        //当前第几页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getRatingList(this.pageSize,val)
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
            var h = date.getHours();
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            var second = date.getSeconds();
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
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


     /**start上传图片 */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
       this.form.icon = file.response.data;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('请选择我们支持的格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLt2M;
      }
     /**end上传图片 */
    },
    mounted(){
      window.addEventListener('resize', ()=>{
        this.height = window.innerHeight - 240;
      })

     if(this.$store.state.token){
            this.myHeaders.token = this.$store.state.token
        }

      //获取所有等级列表
      this.getRatingList()
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
