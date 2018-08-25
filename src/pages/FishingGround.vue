<template>
    <div class="fishingGround">
        <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="14">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="钓场：">
                            <el-input clearable v-model="formInline.name" placeholder="钓场"></el-input>
                        </el-form-item>
                        <el-form-item label="详细地址：">
                            <el-input clearable v-model="formInline.location" placeholder="详细地址"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间：">
                            <el-date-picker
                            v-model="formInline.cdate"
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
                :header-align="item.align"
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
        title="钓场-钓场详情"
        :visible.sync="dialogVisible"
        top="8vh"
        width="870px">
        <div class="dialog_content">
            <el-form label-position="right" :rules="rules" ref="form" label-width="100px" :model="form" size="mini">

                <el-row>
                    <el-col :span="16">
                        <el-row>
                        <el-col :span="24">
                            <el-form-item label="钓场名称：" prop="name" ref="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="12">
                            <el-form-item label="编号：">
                                <el-input v-model="form.number" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="状态：">
                                <el-select v-model="form.status" placeholder="圈子分类">
                                <el-option label="正常" value="1"></el-option>
                                <el-option label="已关闭" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                       <el-col :span="12">
                            <el-form-item label="排序号：">
                                <el-input v-model="form.position"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="审核状态：">
                                <el-select v-model="form.ispass" placeholder="审核状态">
                                <el-option label="待审核" value="0"></el-option>
                                <el-option label="通过" value="1"></el-option>
                                <el-option label="不通过" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                       <el-col :span="12">
                            <el-form-item label="钓场电话：" prop="phone" ref="phone">
                                <el-input v-model.number="form.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="圈子分类：" prop="type" ref="type">
                                <el-select v-model="form.type" placeholder="圈子分类">
                                <el-option :label="item.codeName" :value="item.cId" v-for="item in codeNameList" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        </el-row>
                         <el-row>
                       <el-col :span="12">
                            <el-form-item label="是否免费：">
                                <el-select v-model="form.needPay" placeholder="是否免费">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="类型：">
                                <el-select v-model="form.ownertype" placeholder="类型">
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
                        :headers="myHeaders"   
                        auto-upload
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只支持jpg/png类型，且不超过2M</div>
                        </el-upload>
                    </el-col>
                    </el-row>
                    

                    <el-row>
                      <!-- <el-col :span="8">
                          <el-form-item label="评论数：">
                                <el-input v-model="form.commentCount"></el-input>
                            </el-form-item>
                      </el-col> -->
                      <el-col :span="24">
                           <el-form-item label="有什么鱼：" prop="fishType" ref="fishType">
                                <el-select v-model="form.fishType" multiple  placeholder="有什么鱼">
                                <el-option v-for="item in fishList" :label="item.codeName"  :value="item.codeName" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                         <el-form-item label="帖子数：">
                            <el-input v-model="form.topicNum" :disabled="disabled"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="16">
                           <el-form-item label="允许钓法："  prop="fishingType" ref="fishingType">
                                <el-select v-model="form.fishingType" multiple  placeholder="允许钓法">
                                <el-option v-for="item in fishMethodList" :label="item.codeName"  :value="item.codeName" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                           <el-form-item label="成员数：">
                                <el-input v-model="form.attentionNum" :disabled="disabled"></el-input>
                            </el-form-item>
                      </el-col>
                      <el-col :span="16">
                           <el-form-item label="禁止钓法：">
                                <el-select v-model="form.forbiddenFishing" multiple placeholder="禁止钓法">
                                <el-option v-for="item in fishMethodList" :label="item.codeName"  :value="item.codeName" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                           <el-form-item label="经度：">
                                <el-input v-model="form.longitude"></el-input>
                            </el-form-item>
                      </el-col>
                      <el-col :span="16">
                           <el-form-item label="允许饵料：" prop="baits" ref="baits">
                                <el-select v-model="form.baits" multiple placeholder="允许饵料">
                                <el-option v-for="item in baitList" :label="item.codeName"  :value="item.codeName" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                          <el-form-item label="纬度：">
                                <el-input v-model="form.latitude"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="16">
                           <el-form-item label="禁止饵料：">
                                <el-select v-model="form.forbiddenBaits" multiple placeholder="禁止饵料">
                                <el-option v-for="item in baitList" :label="item.codeName"  :value="item.codeName" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="省：" prop="provinceId">
                            <el-select v-model="form.provinceId" placeholder="请选择省份" @change="chooseProvince(form.provinceId)">
                            <el-option :label="item.regionName" :value="item.cId" v-for="item in provinceList" :key="item.cId"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="市：" prop="cityId">
                                <el-select v-model="form.cityId" placeholder="请选择市"  @change="chooseArea(form.cityId)">
                                <el-option :label="item.regionName" :value="item.cId" v-for="item in cityList" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="县：" prop="areaId">
                            <el-select v-model="form.areaId" placeholder="请选择区县" @change="chooseCountry(form.areaId)">
                            <el-option :label="item.regionName" :value="item.cId" v-for="item in areaList" :key="item.cId"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="乡：">
                            <el-select v-model="form.countryId" placeholder="请选择乡镇">
                                <el-option :label="item.regionName" :value="item.cId" v-for="item in countryList" :key="item.cId"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                          <el-form-item label="创建人：">
                            <el-input v-model="form.cUser" :disabled="disabled"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="创建时间：">
                            <el-date-picker
                                :disabled="disabled"
                                v-model="form.cdate"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="12:00:00">
                            </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="管理人：">
                            <el-select v-model="form.manager" placeholder="管理人" filterable>
                                <el-option :label="item.nickname" :value="item.cId" v-for="item in managerList" :key="item.cId"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                          <el-form-item label="修改人：">
                            <el-input v-model="form.updater" :disabled="disabled"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                           <el-form-item label="修改时间：">
                                <el-date-picker
                                   :disabled="disabled"
                                    v-model="form.updateDate"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    default-time="12:00:00">
                                </el-date-picker>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="24">
                          <el-form-item label="收费详情：">
                                      <el-input v-model="form.payDetails"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="24">
                          <el-form-item label="地址：" prop="location" ref="location">
                                      <el-input v-model="form.location"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="24">
                          <el-form-item label="简介：">
                                      <el-input type="textarea" v-model="form.detailsRule"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="24">
                          <el-form-item label="备注：">
                                      <el-input type="textarea" v-model="form.remark"></el-input>
                          </el-form-item>
                      </el-col>
                    </el-row>
            </el-form>

        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancel">取 消</el-button>
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
            disabled: false,   //是否禁止填写
            myHeaders: {     //上传图片携带token
                    token: ''
                },
            height: null,
            dialogVisible: false,   //弹出框是否显示
            imageUrl: '',  //上传图片显示
            multipleSelection: [],   //存放勾选的数据
            currentPage: 1, //当前第几页
            pageSize: 10,   //每页显示多少条
            total: null,   //总共多少条数据
            circleId: '',    //修改，删除保存的id
            rowIndex: '',   //每一行的编号
            codeNameList: [],   //圈子分类
            fishList: [],   //鱼类分类
            fishMethodList: [],   //有什么钓法
            baitList: [],   //饵料列表
            provinceList: [],  //省份
            cityList: [],   //市
            areaList: [],    //县级
            countryList: [],   //乡镇
            managerList: [],   //管理人列表
            formInline: {   //圈子、详细地址、创建时间的表单
            name: '',
            location: '',
            cdate: ''
            },
            form:{
                name: '',  //钓场名称
                number: '',   //编号
                status: '1',   //状态    
                position: '',   //排序号
                ispass: '',    //审核状态
                phone: '',   //钓场电话
                type: '',   //圈子分类
                ownertype: '',   //类型
                needPay: '',   //是否收费
                icon: '',
                topicNum: '',   //帖子数
                longitude: '',   //经度
                latitude: '',   //维度
                provinceId: '',  //省份
                cityId: '',   //市
                areaId: '',   //县
                countryId: '',  //乡
                manager: '',   //管理人
                location: '',   //详细地址
                payDetails: '',   //收费详情
                detailsRule: '',   //简介
                attentionNum: '',   //成员数
                cUser: '',   //创建人
                cdate: '',   //创建时间
                remark: '',   //备注
                updater: '',   //修改人
                updateDate: '',   //修改时间

                fishType: [],   //有什么鱼
                fishingType: [],  //允许钓法
                forbiddenFishing: [],   //禁止钓法
                forbiddenBaits: [],   //禁止饵料
                baits: []   //允许饵料
            },
            tableList: [   //表格的头部配置
                {prop: 'name', label: '钓场', width: '90', align: '',align1: 'left'},
                {prop: 'ispass', label: '审核状态', width: '90', align: ''},
                {prop: 'type', label: '类型', width: '80', align: ''},
                {prop: 'type', label: '钓场分类', width: '80', align: ''},
                {prop: 'position', label: '排序号', width: '70', align: 'right'},
                {prop: 'topicNum', label: '贴子', width: '80', align: 'right'},
                {prop: 'attentionNum', label: '成员', width: '80', align: 'right'},
                {prop: 'location', label: '详细地址', width: '', align: ''},
                {prop: 'manager', label: '管理人', width: '100', align: ''},
                {prop: 'cUser', label: '创建人', width: '100', align: ''},
                {prop: 'cdate', label: '创建时间', width: '120', align: 'right'},
                {prop: 'updater', label: '修改人', width: '100', align: ''},
                {prop: 'updateDate', label: '修改时间', width: '160', align: 'right'},
                {prop: 'remark', label: '备注', width: '', align: ''}
            ],
            tableData: [],   //表格的数据
            rules: {
                name: [
                      { required: true, message: '请输入钓场名称', trigger: 'blur' },
                      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '电话号码不能为空', trigger: 'blur'},
                    { type: 'number', message: '电话号码必须为数字值', trigger: 'blur'}
                ],
                fishType:[
                    { required: true, message: '有什么鱼不能为空', trigger: 'change'},
                ],
                fishingType: [
                    { required: true, message: '允许钓法不能为空', trigger: 'change'},
                ],
                baits: [
                    { required: true, message: '允许饵料不能为空', trigger: 'change'},
                ],
                location: [
                    { required: true, message: '详细地址不能为空', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择圈子分类', trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        //获取钓场列表
        getGroundList(pageSize,pageNum){
            this.$post('fishplace/managerGetList',{
                pageSize: pageSize ? pageSize : 30,
                pageNum: pageNum ? pageNum : 1,
                name: this.formInline.name ? this.formInline.name : null,
                location: this.formInline.location ? this.formInline.location : null,
                cdate: this.formInline.cdate ? `${this.dataTransform(this.formInline.cdate[0])} 00:00:00` : null,
                enddate: this.formInline.cdate ? `${this.dataTransform(this.formInline.cdate[1])} 23:59:59`: null,
            }).then(res=>{
                if(res.code == 0){
                    if(res.data.list.length <=0){
                        this.tableData = res.data.list;
                        this.total = 0;
                    }else{
                        let arr =  res.data.list;
                        arr.forEach((e,index)=>{
                            if(e.ispass == 0){
                               arr[index].ispass = '待审核'
                            }else if(e.ispass == 1){
                                arr[index].ispass = '通过'
                            }else{
                                arr[index].ispass = '不通过'
                            }

                            this.tableData = JSON.parse(JSON.stringify(arr))
                            this.total = res.data.total;
                        })
                    }

                      this.$nextTick(function(){
                        this.checked();//每次更新了数据，触发这个函数即可。
                    })

                     /*this.tableData = res.data.list;
                     this.$nextTick(function(){
                        this.checked();//每次更新了数据，触发这个函数即可。
                    })
                    this.total = res.data.total;*/
                }
            })
        },
        //查询
        search(){
            this.currentPage = 1;
            this.getGroundList();
        },
        //新增
        add(){
            this.dialogVisible = true;
             //新增有些字段禁止填写
            this.disabled = true;
            

                 //点击新增清空表单
                for(var i in this.form){
                if(i == 'status'){  //遇到默认项跳过，执行下面的循环
                    continue;
                }else if(this.form[i] != ''){
                  
                    this.$nextTick(() => {
                            this.$refs['name'].resetField();
                            this.$refs['phone'].resetField();
                            this.$refs['type'].resetField();
                            this.$refs['fishType'].resetField();
                            this.$refs['fishingType'].resetField();
                            this.$refs['baits'].resetField();
                            this.$refs['location'].resetField();

                            //将对象还原   shabisheji
                            Object.keys(this.form).forEach((key)=>{
                                if(key == 'fishType' || key == 'fishingType' || key == 'forbiddenFishing' || key == 'forbiddenBaits' || key == 'baits'){
                                    this.form[key] = []
                                }else if(key == 'status'){
                                    this.form[key] = '1'
                                }else{
                                    this.form[key] = ''
                                }
                            })
                            this.imageUrl = '';
                        });

                    
                }
                }

        

            this.circleId = '';
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

               this.$confirm('此操作将永久删除该钓场, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$get('fishplace/deleteFishPlace',{
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
        //修改
        edit(){
            /*if(this.multipleSelection.length != 1){
                this.$message({
                message: '请选择一条需要修改的数据！',
                type: 'warning'
                });
                return;
            }*/
            this.dialogVisible = true;
            this.disabled = true;
            this.circleId = this.multipleSelection[0].cId;   //获取每条圈子的id,用来判断点击弹出框的确认是新增还是修改
    
            this.$get('fishplace/getFishPlaceById',{
                id: this.circleId
            }).then(res=>{
                this.form = res.data;
                this.form.phone = parseInt(this.form.phone);


                this.form.fishType = this.form.fishType ? this.form.fishType.split(',') : [];
                this.form.fishingType = this.form.fishingType ? this.form.fishingType.split(',') : [];
                this.form.baits = this.form.baits ? this.form.baits.split(',') : [];

                this.form.forbiddenBaits = this.form.forbiddenBaits ? this.form.forbiddenBaits.split(',') : [];
                this.form.forbiddenFishing = this.form.forbiddenFishing ? this.form.forbiddenFishing.split(',') : [];

                this.form.number = this.rowIndex;
                this.imageUrl = this.form.iconUrl;

            })

        },
        //判断是不是一个数组
        isArray(o){
            return Object.prototype.toString.call(o) == '[object Array]'
        },
        //导出
        exportd(){
            let path = this.$store.state.baseUrl;
            let href = path + 'fishplace/downloadFishPlaceList'
            let json = {};

            Object.keys(this.formInline).forEach((key,index)=>{
                if(this.formInline[key] != '' && key != 'cdate'){
                    json[key] = this.formInline[key]
                }else if(this.formInline.cdate.length > 0 && key == 'cdate'){
                    json.cdate =  `${this.dataTransform(this.formInline.cdate[0])} 00:00:00`;
                    json.enddate =  `${this.dataTransform(this.formInline.cdate[1])} 23:59:59`;
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
            this.getGroundList(val,this.currentPage);
        },
        //当前第几页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getGroundList(this.pageSize,val)
        },
        //弹出框的确认按钮
        comfirm(formName){
            //必须上传图标
            /*if(!this.form.icon){
                this.$message({
                message: '请上传钓场的图标！',
                type: 'warning'
                });

                return;
            }*/


                 this.$refs[formName].validate((valid)=>{
                if(valid){
                    let url = this.circleId ? 'fishplace/updateFishplace' : 'fishplace/addFishplace'    //如果this.circleId存在，那就是调修改接口，否则就是新增接口
                    // let status = (this.form.status == '正常' ||this.form.status == '1') ? 1 : 0;
                    this.$post(url,{
                        cId: this.circleId ? this.circleId : null,
                        name: this.form.name,
                        status: this.form.status,
                        ispass: this.form.ispass,
                        phone: this.form.phone,
                        type: this.form.type,
                        ownertype: this.form.ownertype,
                        needPay: this.form.needPay,
                        fishType: this.form.fishType.join(','),
                        fishingType: this.form.fishingType.join(','),
                        forbiddenFishing: this.form.forbiddenFishing.join(','),
                        forbiddenBaits: this.form.forbiddenBaits.join(','),
                        baits: this.form.baits.join(','),
                        longitude: this.form.longitude,
                        latitude: this.form.latitude,
                        provinceId: this.form.provinceId,
                        cityId: this.form.cityId,
                        areaId: this.form.areaId,
                        countryId: this.form.countryId,
                        manager: this.form.manager,
                        payDetails: this.form.payDetails,
                        location: this.form.location,
                        remark: this.form.remark,
                        detailsRule: this.form.detailsRule,
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
                            this.getGroundList();

                           this.circleId = ''
                        }else{
                            this.$message({
                            message: res.msg,
                            type: 'warning'
                            });
                            this.circleId = ''
                        }
                    })
                }else{
                    return false;
                }
            })
        },
        //弹出框的取消按钮
        cancel(){
            this.dialogVisible = false;
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
     //获取圈子分类列表
     getCodeName(){
         this.$post('sysCategory/queryByCategory',{
             category: 32
         }).then(res=>{
             this.codeNameList = res.data;
         })
     },
     //获取鱼类分类
     getFishList(){
         this.$post('sysCategory/queryByCategory',{
             category: 35
         }).then(res=>{
            this.fishList = res.data;
         })
     },
     //获取有什么钓法
     getFishMethodList(){
         this.$post('sysCategory/queryByCategory',{
             category: 33
         }).then(res=>{
            this.fishMethodList = res.data;
         })
     },
     //获取有什么饵料
     getBaitList(){
         this.$post('sysCategory/queryByCategory',{
             category: 34
         }).then(res=>{
            this.baitList = res.data;
         })
     },


     //获取省份列表
     getProvince(){
         this.$get('/region/queryTrees',{}).then(res=>{
              if(res.code == 0){
                this.provinceList = res.data;
              }
          })
     },
     //获取市列表
     chooseProvince(id){
        //根据省份id获取城市
          this.provinceList.forEach((val)=>{
            if(id == val.cId){
                this.cityList = val.childList;
                 this.form.cityId = '';
                this.form.areaId = '';
                this.form.countryId = '';
            }
        })
     },
     //获取县级列表
     chooseArea(id){
         //根据城市id获取县级
           this.cityList.forEach((val)=>{
              if(id == val.cId){
                this.areaList = val.childList;
                this.form.areaId = '';
               this.form.countryId = '';
              }
          })
     },
     //获取乡镇
     chooseCountry(id){
         //根据县级id获取乡镇列表
        this.areaList.forEach((val)=>{
              if(id == val.cId){
                this.countryList = val.childList;
             this.form.countryId = '';
              }
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
        //获取圈子列表
        this.getGroundList()
        //表格第一行默认选中
        this.checked();
           //获取省份
        this.getProvince();


         window.addEventListener('resize', ()=>{
             this.height = window.innerHeight - 240;
        })

        if(this.$store.state.token){
            this.myHeaders.token = this.$store.state.token
        }
    },
    created(){
         this.height = window.innerHeight - 240;
    },
    watch: {
        dialogVisible: function(val){
            let that = this;
            if(val){
                //调用圈子分类函数
                this.getCodeName();
                  //获取鱼类分类
                this.getFishList();
                //有什么钓法
                this.getFishMethodList();
                //有什么饵料
                this.getBaitList();
           
                //获取管理人列表
                this.getMangerList();
            }
        },
          form:{
            handler(value,oldVal){
                if(value.provinceId){
                    this.provinceList.forEach((val)=>{
                        if(value.provinceId == val.cId){
                            this.cityList = val.childList;
                    
                        }
                    })
                };
                if(value.cityId){
                     this.cityList.forEach((val)=>{
                        if(value.cityId == val.cId){
                            this.areaList = val.childList;
                        }
                    })
                };
                if(value.areaId){
                    this.areaList.forEach((val)=>{
                        if(value.areaId == val.cId){
                            this.countryList = val.childList;
                        }
                    })
                }
            }
        }
    }
}
</script>


<style>
.fishingGround .topSearch .el-form-item__content{
    width: 100px;
}
.fishingGround .topSearch .el-date-editor{
    width: 220px;
}
.fishingGround .table .el-table .el-table__body-wrapper{
    overflow-y: scroll;
}
.fishingGround .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px ;
    border-left: 2px solid #2693fa;
    padding-left: 8px;
}
.fishingGround .el-date-editor--datetime input{
    width: 176.66px;
}
.fishingGround .el-select{
    width: 100%;
}



.fishingGround .avatar-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
}
.fishingGround .avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
.fishingGround .avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 140px;
height: 140px;
line-height: 140px;
text-align: center;
}
.fishingGround .avatar {
width: 140px;
height: 140px;
display: block;
}

.fishingGround .el-upload__tip{
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
.fishingGround span.uploadTitle{
    float: left;
    line-height: 150px;
    padding-right: 15px;
}
</style>

