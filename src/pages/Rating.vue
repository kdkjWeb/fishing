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
                                <el-select v-model="formInline.status" placeholder="状态">
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
            <!-- <div class="aboutNum">
                <div>合计： <span>{{total}}</span></div>
            </div> -->
        </div>
        <!-- end表格 -->

        <!-- start分页 -->
        <div class="page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[10, 50, 80, 100]"
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
                        <el-form-item label="编号：">
                            <el-input v-model="form.number"></el-input>
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
                        action="http://192.168.20.158:8080/common/uploadOssPic"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        name="picture"
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
                       <el-input v-model="form.level"></el-input>
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
                     <el-form-item label="升级分值：">
                        <el-input v-model="form.score"></el-input>
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
                          <el-input v-model="form.cUser"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="创建时间：">
                          <el-date-picker
                              v-model="form.creatTime"
                              type="datetime"
                              placeholder="选择日期时间"
                              default-time="12:00:00">
                          </el-date-picker>
                      </el-form-item>
                  </el-col>
                  </el-row>
                   <el-row>
                    <el-col :span="12">
                        <el-form-item label="修改人：">
                            <el-input v-model="form.modifyUser"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="修改时间：">
                            <el-date-picker
                                v-model="form.modifyTime"
                                type="datetime"
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
            dialogVisible: false,   //弹出框是否显示
            imageUrl: '',  //上传图片显示
            multipleSelection: [],   //存放勾选的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
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
                level:''  //等级
            },
          rules:{
            name:[
              { required: true, message: '等级名称不能为空，请输入', trigger: 'blur' }
            ],
            type:[
              { required: true, message: '类型不能为空，请选择', trigger: 'change' }
            ],
            level:[
              { required: true, message: '等级不能为空，请输入', trigger: 'blur' }
            ]
          },
            tableList: [   //表格的头部配置
                {prop: 'status', label: '状态', width: '100', align: ''},
                {prop: 'type', label: '类型', width: '100', align: ''},
                {prop: 'level', label: '等级', width: '100', align: 'right'},
                {prop: 'name', label: '名称', width: '120', align: ''},
                {prop: 'type', label: '用户分组', width: '120', align: ''},   //userGroup  用户分组跟类型是一样的
                {prop: 'score', label: '升级分值', width: '100', align: ''},
                {prop: 'coin', label: '娱乐币奖励', width: '150', align: ''},
                {prop: 'icon', label: '用户图标', width: '100', align: ''},
                {prop: 'creator', label: '创建人', width: '100', align: ''},
                {prop: 'creatTime', label: '创建时间', width: '', align: 'right'},
                {prop: 'modifier', label: '修改人', width: '100', align: ''},
                {prop: 'modifyTime', label: '修改时间', width: '', align: 'right'},
            ],
            tableData: []//表格的数据
        }
    },
    methods:{
        //获取等级列表
        getRatingList(pageSize,pageNum){
            this.$post('levelRule/queryByRecord',{
                pageSize: pageSize ? pageSize : 10,
                pageNum: pageNum ? pageNum : 1,
                type: '1',
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
            this.getRatingList();
        },
        //新增
        add(){
            this.dialogVisible = true;
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
        //修改
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

            this.form = data;
            this.form.number = this.rowIndex;
            // this.form.status = data.status == '正常' ? 1 : 0;

        },
        //导出
        exportd(){

        },
        //多选框选中之后存放的数据
        handleSelectionChange(val){
             this.multipleSelection = val;
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
            this.getCircleList(val,this.currentPage);
        },
        //当前第几页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getCircleList(this.pageSize,val)
        },


        //弹出框的确认按钮  /levelRule/addLevelRule
        comfirm(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$post('/levelRule/addLevelRule',this.form).then(res=>{
                if(res.code == 0){
                    this.$refs[formName].resetFields();
                    this.dialogVisible = false;
                    this.$message({
                      message:res.msg,
                      type: 'success',
                    });

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
            this.dialogVisible = false;
            this.$refs[form].resetFields();
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
     //获取圈子分类列表
     getCodeName(){
         this.$post('sysCategory/queryByCategory',{
             category: 32
         }).then(res=>{
             this.codeNameList = res.data;
         })
     },
     //获取省份列表
     getProvince(){
         this.$get('province/queryAll',{}).then(res=>{
             this.provinceList = res.data
         })
     },
     //获取市列表
     chooseProvince(){
        //根据省份id获取城市
         this.$get('city/queryByProvinceId',{
             provinceId: this.form.provinceName
         }).then(res=>{
             this.cityList = res.data
         })
     },
     //获取县级列表
     chooseArea(){
         //根据城市id获取县级
         this.$get('area/queryByCityId',{
             cityId: this.form.cityName
         }).then(res=>{
             this.areaList = res.data;
         })
     },
     //获取乡镇
     chooseCountry(){
         //根据县级id获取乡镇列表
         this.$get('country/queryByCityId',{
             areaId: this.form.areaName
         }).then(res=>{
             this.countryList = res.data;
         })
     },

     /**start上传图片 */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
        //获取等级列表
        this.getRatingList()
        //表格第一行默认选中
        this.checked();
    },
    watch: {
        dialogVisible: function(val){
            let that = this;
            if(val){
                //调用圈子分类函数
                that.getCodeName();
                //获取省份
                that.getProvince();
            }
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
.topSearch .el-table{
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
    margin: 10px 0 40px;
}
.rating span.uploadTitle{
    float: left;
    line-height: 100px;
    padding-right: 15px;
}
</style>
