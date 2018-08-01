<template>
    <div class="circle">
        <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="14">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="圈子：">
                            <el-input clearable v-model="formInline.name" placeholder="圈子"></el-input>
                        </el-form-item>
                        <el-form-item label="详细地址：">
                            <el-input clearable v-model="formInline.address" placeholder="详细地址"></el-input>
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
        title="圈子-圈子详情"
        :visible.sync="dialogVisible"
        top="8vh"
        width="870px"
        :before-close="closeDialog">
        <div class="dialog_content">
            <el-form label-position="right" ref="form" :rules="rules"  label-width="100px" :model="form" size="mini">

                <el-row>
                    <el-col :span="16">
                        <el-row>
                        <el-col :span="24">
                            <el-form-item label="圈子：" prop="circleName">
                                <el-input v-model="form.circleName"></el-input>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="12">
                            <el-form-item label="编号：" prop="number">
                                <el-input v-model="form.number" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="状态：" prop="status">
                                <el-select v-model="form.status" placeholder="圈子分类">
                                <el-option label="正常" value="1"></el-option>
                                <el-option label="已关闭" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                       <el-col :span="12">
                            <el-form-item label="排序号：" prop="sort">
                                <el-input v-model="form.sort"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="圈子分类：" prop="codeName" ref="codeName1">
                                <el-select v-model="form.codeName" placeholder="圈子分类">
                                <el-option :label="item.codeName" :value="item.cId" v-for="item in codeNameList" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                       <el-col :span="12">
                            <el-form-item label="评论数：" prop="commentCount">
                                <el-input v-model="form.commentCount" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型：" prop="kind" ref="kind1">
                                <el-select v-model="form.kind" placeholder="类型">
                                <el-option label="官方" value="官方"></el-option>
                                <el-option label="个人" value="个人"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="7"  :offset="1">
                        <span class="uploadTitle">上传图标：</span>
                        <el-upload
                        class="avatar-uploader"
                        accept="image/jpeg,image/png"
          
                        :action="`${this.$store.state.baseUrl}common/uploadOssPic`"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        name="picture"
                        :before-upload="beforeAvatarUpload"
                        :headers="myHeaders"   
                        auto-upload
                        :on-error="upError">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只支持jpg/png类型，且不超过2M</div>
                        </el-upload>
                    </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="16">
                           <el-row>
                            <el-col :span="12">
                                <el-form-item label="阅读数：" prop="viewCount">
                                    <el-input v-model="form.viewCount" :disabled="disabled"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="省：" prop="provinceId">
                                    <el-select v-model="form.provinceId" placeholder="请选择省份" @change="chooseProvince">
                                    <el-option :label="item.codeName" :value="item.cId" v-for="item in provinceList" :key="item.cId"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                           </el-row>
                      </el-col>
                      <el-col :span="8">
                            <el-form-item label="市：" prop="cityId">
                                <el-select v-model="form.cityId" placeholder="请选择市"  @change="chooseArea">
                                <el-option :label="item.codeName" :value="item.cId" v-for="item in cityList" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="16">
                           <el-row>
                            <el-col :span="12">
                                <el-form-item label="成员数：" prop="memberCount">
                                    <el-input v-model="form.memberCount" :disabled="disabled"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="县：" prop="areaId">
                                    <el-select v-model="form.areaId" placeholder="县" @change="chooseCountry">
                                    <el-option :label="item.codeName" :value="item.cId" v-for="item in areaList" :key="item.cId"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                           </el-row>
                      </el-col>
                      <el-col :span="8">
                            <el-form-item label="乡：" prop="countryId">
                                <el-select v-model="form.countryId" placeholder="乡">
                                 <el-option :label="item.codeName" :value="item.cId" v-for="item in countryList" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="16">
                           <el-row>
                            <el-col :span="12">
                                <el-form-item label="经度：" prop="longitude">
                                    <el-input v-model="form.longitude"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="纬度：" prop="latitude">
                                      <el-input v-model="form.latitude"></el-input>
                                </el-form-item>
                            </el-col>
                           </el-row>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="16">
                           <el-row>
                            <el-col :span="12">
                                <el-form-item label="创建人：" prop="creator">
                                    <el-input v-model="form.creator" :disabled="disabled"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="创建时间：" prop="createTime">
                                    <el-date-picker
                                        :disabled="disabled"
                                        v-model="form.createTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        default-time="12:00:00">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                           </el-row>
                      </el-col>
                      <el-col :span="8">
                            <el-form-item label="管理人：" prop="manager">
                                <el-select v-model="form.manager" placeholder="管理人">
                                 <el-option :label="item.nickname" :value="item.cId" v-for="item in managerList" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>
                     <el-row>
                      <el-col :span="16">
                           <el-row>
                            <el-col :span="12">
                                <el-form-item label="修改人：" prop="modifier">
                                    <el-input v-model="form.modifier" :disabled="disabled"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="修改时间：" prop="modifyTime">
                                    <el-date-picker
                                        :disabled="disabled"
                                        v-model="form.modifyTime"
                                        type="datetime"
                                        placeholder="选择日期时间"
                                        default-time="12:00:00">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                           </el-row>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                          <el-form-item label="地址：" prop="location">
                                      <el-input v-model="form.location"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="24">
                          <el-form-item label="简介：" prop="intro">
                                      <el-input type="textarea" v-model="form.intro"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="24">
                          <el-form-item label="备注：" prop="remark">
                                      <el-input type="textarea" v-model="form.remark"></el-input>
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
            disabled: false,
            myHeaders: {
                    token: ''
                },
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
            managerList: [],   //管理人列表
            formInline: {   //圈子、详细地址、创建时间的表单
            name: '',
            address: '',
            date: ''
            },
            form:{
                circleName: '',  //圈子
                number: '',   //编号
                status: '1',   //状态
                sort: '',   //排序号
                codeName: '',   //圈子分类
                commentCount: '',  //评论数
                kind: '',   //类型
                viewCount: '',   //阅读数
                provinceId: '',  //省份
                cityId: '',   //市
                memberCount: '',  //成员数
                areaId: '',   //县
                countryId: '',  //乡
                longitude: '',  //经度
                latitude: '',   //维度
                creator: '',   //创建人
                createTime: '',   //创建时间
                manager: '',   //管理人
                modifier: '',   //修改人
                modifyTime: '',   //修改时间
                location: '',   //地址
                intro: '',   //简介
                remark: '',    //备注
                icon: ''   //图标
   
                        // provinceId: this.form.provinceName,
                        // cityId: this.form.cityName,
                        // areaId: this.form.areaName,
                        // countryId: this.form.countryName,
            },
            tableList: [   //表格的头部配置
                {prop: 'circleName', label: '圈子', width: '120', align: ''},
                {prop: 'status', label: '状态', width: '80', align: ''},
                {prop: 'kind', label: '类型', width: '80', align: ''},
                {prop: 'codeName', label: '圈子分类', width: '80', align: ''},
                {prop: 'sort', label: '排序号', width: '80', align: 'right'},
                {prop: 'commentCount', label: '评论', width: '80', align: 'right'},
                {prop: 'viewCount', label: '阅读', width: '80', align: 'right'},
                {prop: 'memberCount', label: '成员', width: '100', align: 'right'},
                {prop: 'location', label: '详细地址', width: '', align: ''},
                {prop: 'manager', label: '管理人', width: '100', align: ''},
                {prop: 'creator', label: '创建人', width: '100', align: ''},
                {prop: 'createTime', label: '创建时间', width: '155', align: 'right'},
                {prop: 'modifier', label: '修改人', width: '100', align: ''},
                {prop: 'modifyTime', label: '修改时间', width: '150', align: 'right'},
                {prop: 'remark', label: '备注', width: '', align: ''}
            ],
            tableData: [],//表格的数据
            rules: {
                circleName: [
                      { required: true, message: '请输入圈子名称', trigger: 'blur' },
                      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                  codeName: [
                    { required: true, message: '请选择圈子分类', trigger: 'change' }
                ],
                    kind: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
            }
        }
    },
    methods:{
        //获取圈子列表
        getCircleList(pageSize,pageNum){
            this.$post('circle/queryByRecord',{
                pageSize: pageSize ? pageSize : 10,
                pageNum: pageNum ? pageNum : 1,
                circleName: this.formInline.name ? this.formInline.name : null,
                location: this.formInline.address ? this.formInline.address : null,
                createTime: this.formInline.date ? this.dataTransform(this.formInline.date[0]) : null,
                createTime2: this.formInline.date ? this.dataTransform(this.formInline.date[1]) : null,
            }).then(res=>{
                if(res.code == 0){
                  //  this.tableData = res.data.list;
                    if(res.data.list.length <= 0){   //如果后面没返回数据就直接赋值
                        this.tableData = res.data.list;
                    }else{   //返回数据之后进行数据处理
                        let arr = res.data.list;
                        arr.forEach((e,index) => {
                           arr[index].manager = e.manager ? e.manager.nickname : '';
                           arr[index].creator = e.creator ? e.creator.nickname : '';
                           arr[index].modifier = e.modifier ? e.modifier.nickname : '';
                           arr[index].status = e.status ? '正常' : '已关闭';
                        //    arr[index].createTime = e.createTime.split(' ')[0];
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
            this.getCircleList();
        },
        //新增
        add(){
            this.dialogVisible = true;

            //新增有些字段禁止填写
            this.disabled = true;

            // this.$refs['form'].resetFields();


            this.$refs['codeName1'].clearValidate();
            this.$refs['kind1'].clearValidate();
            this.form = {};
            this.imageUrl = '';
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
                    this.$get('circle/deleteCircle',{
                        circleId: id
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
            this.disabled = true;
            this.circleId = this.multipleSelection[0].cId;   //获取每条圈子的id,用来判断点击弹出框的确认是新增还是修改
            

            if(this.circleId){
                let data = this.multipleSelection[0];
                this.form = data;
                this.form.number = this.rowIndex;
                this.imageUrl = this.form.icon;
            }

        },
        //导出
        exportd(){

        },
        //多选框选中之后存放的数据
        handleSelectionChange(val){
             this.multipleSelection = val;
             console.log(this.multipleSelection)

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
        //弹出框的确认按钮
        comfirm(formName){
            
            if(!this.form.icon){
                this.$message({
                message: '请上传新圈子的图标！',
                type: 'warning'
                });

                return;
            }


            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let url = this.circleId ? 'circle/updateCircle' : 'circle/addCircle'    //如果this.circleId存在，那就是调修改接口，否则就是新增接口
                    this.$post(url,{
                        cId: this.circleId ? this.circleId : null,
                        circleName: this.form.circleName,
                        status: this.form.status == '正常' ? 1 : this.form.status,   //因为修改回显如果状态不改变，那么传给后台的会是’正常‘汉字，需要进行转换成1，否则就是正常的
                        sort: this.form.sort,
                        circleCategoryId: this.form.codeName,
                        kind: this.form.kind,
                        provinceId: this.form.provinceName,
                        cityId: this.form.cityName,
                        areaId: this.form.areaName,
                        countryId: this.form.countryName,
                        longitude: this.form.longitude,
                        latitude: this.form.latitude,
                        managerId: this.form.manager,
                        location: this.form.location,
                        intro: this.form.intro,
                        remark: this.form.remark,
                        icon: this.form.icon
                    }).then(res=>{
                        if(res.code == 0){
                            //隐藏dialog框
                            this.dialogVisible = false;
                            //提示添加成功
                            this.$message({
                            message: res.msg,
                            type: 'success'
                            });
                             //重新获取圈子列表
                            this.getCircleList();

                            // 清空表单和图片
                            // this.$refs['form'].resetFields();
                            // this.imageUrl = ''
                        }else{
                            this.$message({
                            message: res.msg,
                            type: 'warning'
                            });
                        }
                    })
                }else{
                    return false;
                }
            })
        },
        //弹出框的取消按钮
        cancel(formName){
            this.dialogVisible = false;
            // this.$refs[formName].resetFields();
            // this.imageUrl = '';
            this.disabled = false;
        },


        //关闭dialog弹出框
        closeDialog(done){
              this.dialogVisible = false;
              this.disabled = false;
            //   this.$refs[formName].resetFields();
            //   this.imageUrl = '';
        　　/*this.$confirm('确认关闭？')
        　　.then(_ => {
        　　done();
            location.reload();
        })
        .catch(_ => { });*/
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
             provinceId: this.form.provinceId
         }).then(res=>{
             this.cityList = res.data
         })
     },
     //获取县级列表
     chooseArea(){
         //根据城市id获取县级
         this.$get('area/queryByCityId',{
             cityId: this.form.cityId
         }).then(res=>{
             this.areaList = res.data;
         })
     },
     //获取乡镇
     chooseCountry(){
         //根据县级id获取乡镇列表
         this.$get('country/queryByCityId',{
             areaId: this.form.areaId
         }).then(res=>{
             this.countryList = res.data;
         })
     },
    //获取管理人列表
    getMangerList(){
        this.$post('user/getUserList',{
            role: 1
        }).then(res=>{
            if(res.code == 0){
                this.managerList = res.data.list
            }
        })
    },


     /**start上传图片 */
      handleAvatarSuccess(res, file) {
          console.log(file)
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

        /*const isSize = new Promise(function(resolve, reject) {
            let _URL = window.URL || window.webkitURL;
            let img = new Image();
            img.onload = function() {
                let volid = img.width / img.height;
                volid == 1 ? resolve() : reject();
            }
            img.src = _URL.createObjectURL(file);
        }).then(() => {
            return file;
        }, () => {
            this.$message.error('上传图标长宽必须相等');
            return Promise.reject();
        });


        return (isJPG || isPNG) && isLt2M && isSize;*/


        return (isJPG || isPNG) && isLt2M
      },
      //上传图片失败
      upError(err){
        if(err){
             this.$message.error('上传图标失败');
        }
      }
     /**end上传图片 */
    },


    mounted(){
        //获取圈子列表
        this.getCircleList()
        //表格第一行默认选中
        this.checked();

        if(this.$store.state.token){
            this.myHeaders.token = this.$store.state.token
        }
        console.log(this.myHeaders.token )
    },
    watch: {
        dialogVisible: function(val){
            let that = this;
            if(val){
                console.log(1)
                //调用圈子分类函数
                that.getCodeName();
                //获取省份
                that.getProvince();
                //获取管理人列表
                that.getMangerList();
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
.circle .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px ;
    border-left: 2px solid #2693fa;
    padding-left: 8px;
}
.circle .el-date-editor--datetime input{
    width: 176.66px;
}



.circle .avatar-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
}
.circle .avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
.circle .avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 140px;
height: 140px;
line-height: 140px;
text-align: center;
}
.circle .avatar {
width: 140px;
height: 140px;
display: block;
}

.circle .el-upload__tip{
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
.circle span.uploadTitle{
    float: left;
    line-height: 150px;
    padding-right: 15px;
}
</style>
