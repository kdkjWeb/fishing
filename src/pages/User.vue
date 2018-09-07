<template>
    <div class="user">
        <!-- start顶部搜索按钮 -->
        <div class="topSearch">
            <el-row>
                <el-col :span="14">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="昵称：">
                            <el-input clearable v-model="formInline.nickname" placeholder="昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <el-input clearable v-model="formInline.phone" placeholder="手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="用户类别：">
                                <el-select clearable v-model="formInline.role" placeholder="用户类别">
                                <el-option label="超级管理" value="0"></el-option>
                                <el-option label="管理" value="1"></el-option>
                                <el-option label="钓友" value="2"></el-option>
                                <el-option label="农家乐" value="3"></el-option>
                                <el-option label="渔具店" value="4"></el-option>
                                </el-select>
                        </el-form-item>
                         <el-form-item label="状态：">
                            <el-select clearable v-model="formInline.status" placeholder="状态">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="禁用" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建时间：">
                            <el-date-picker
                            v-model="formInline.cDate"
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
        title="用户"
        :visible.sync="dialogVisible"
        top="8vh"
        width="870px">
        <div class="dialog_content">
            <el-form label-position="right" label-width="100px" :model="form" ref="form" :rules="rules"  size="mini">

                <el-row>
                    <el-col :span="16">

                        <el-row>
                        <el-col :span="12">
                            <el-form-item label="编号：">
                                <el-input v-model="form.number" :disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="论坛ID：">
                                <el-input v-model="form.forumId" :disabled="disabled2"></el-input>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                       <el-col :span="12">
                            <el-form-item label="昵称：" prop="nickname" ref="nickname">
                                <el-input v-model="form.nickname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                             <el-form-item label="车贴编号：">
                                <el-input v-model="form.motorcade"></el-input>
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="12">
                            <el-form-item label="状态：">
                                <el-select v-model="form.status" placeholder="状态">
                                <el-option label="正常" value="1"></el-option>
                                <el-option label="禁用" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别：">
                                <el-select v-model="form.gender" placeholder="性别">
                                <el-option label="男" value="1"></el-option>
                                <el-option label="女" value="0"></el-option>
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
                        :on-error="upError"
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
                      <el-col :span="8">
                          <el-form-item label="用户组：">
                            <el-select v-model="form.rank" placeholder="请选择用户组">
                            <el-option :label="item.name" :value="item.name" v-for="item in rankList" :key="item.cId"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="密码：" prop="password" ref="password" :error="errMsg1">
                            <el-input  type="password" v-model="form.password" :disabled="isPas"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                     <el-row>
                      <el-col :span="8">
                          <el-form-item label="手机号：" prop="phone" ref="phone" :error="errMsg">
                            <el-input v-model="form.phone" :disabled="disabled1"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="生日：">
                            <!-- <el-input v-model="form.birthday"></el-input> -->
                            <el-date-picker
                                v-model="form.birthday"
                                type="date"
                                :picker-options="pickerOptions"
                                placeholder="选择出生日期">
                             </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="微信：">
                            <el-input v-model="form.wechat"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                     <el-row>
                      <el-col :span="8">
                          <el-form-item label="电话：" prop="seatPhone">
                            <el-input v-model.number="form.seatPhone"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="QQ：" prop="qq">
                            <el-input v-model.number="form.qq"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="微信显示：">
                                <el-select v-model="form.showWechat" placeholder="微信显示">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>
                     <el-row>
                      <el-col :span="8">
                           <el-form-item label="电话显示：">
                                <el-select v-model="form.showPhone" placeholder="电话显示">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                      <el-col :span="8">
                         <el-form-item label="QQ显示：">
                                <el-select v-model="form.showQq" placeholder="QQ显示">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                      <el-col :span="8">
                         <el-form-item label="认证方式：">
                                <el-select v-model="form.checkWay" placeholder="请选择认证方式">
                                <el-option :label="item.name" :value="item.name" v-for="item in checkList" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                          <el-form-item label="用户类别：">
                                <el-select v-model="form.role" placeholder="用户类别"  :disabled="disabled2">
                                <el-option label="超级管理" value="0"></el-option>
                                <el-option label="管理" value="1"></el-option>
                                <el-option label="钓友" value="2"></el-option>
                                <el-option label="农家乐" value="3"></el-option>
                                <el-option label="渔具店" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                      <el-col :span="8">
                           <el-form-item label="等级：">
                            <el-input v-model="form.level" :disabled="disabled1"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="是否免审：">
                                <el-select v-model="form.trusted" placeholder="是否免审">
                                <el-option label="免审" value="1"></el-option>
                                <el-option label="审核" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row>

                     <!-- <el-row>
                      <el-col :span="8">
                          <el-form-item label="对象鱼：">
                               <el-select v-model="form.targetFish" multiple  placeholder="对象鱼">
                                <el-option v-for="item in fishList" :label="item.codeName"  :value="item.codeName" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                      <el-col :span="8">
                         <el-form-item label="钓法：">
                                <el-select v-model="form.fishWay" multiple placeholder="钓法">
                                <el-option v-for="item in fishMethodList" :label="item.codeName"  :value="item.codeName" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="饵料：">
                                <el-select v-model="form.bait" multiple placeholder="饵料">
                                <el-option v-for="item in baitList" :label="item.codeName"  :value="item.codeName" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                    </el-row> -->
                    <el-row>
                      <el-col :span="24">
                             <el-form-item label="地址：">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                      <el-row>
                      <el-col :span="6">
                           <el-form-item label="省：" prop="provinceId">
                            <el-select v-model="form.province" placeholder="请选择省份" @change="chooseProvince(form.province)">
                            <el-option :label="item.regionName" :value="item.regionName" v-for="item in provinceList" :key="item.cId"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="市：" prop="cityId">
                                <el-select v-model="form.city" placeholder="请选择市"  @change="chooseArea(form.city)">
                                <el-option :label="item.regionName" :value="item.regionName" v-for="item in cityList" :key="item.cId"></el-option>
                                </el-select>
                            </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item label="县：" prop="areaId">
                            <el-select v-model="form.area" placeholder="请选择区县" @change="chooseCountry(form.area)">
                            <el-option :label="item.regionName" :value="item.regionName" v-for="item in areaList" :key="item.cId"></el-option>
                            </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                         <el-form-item label="乡：" prop="countryId">
                                <el-select v-model="form.country" placeholder="请选择乡镇">
                                 <el-option v-for="item in countryList" :label="item.regionName" :value="item.regionName" :key="item.cId"></el-option>
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
                      <el-col :span="8">
                           <el-form-item label="纬度：">
                            <el-input v-model="form.latitude"></el-input>
                        </el-form-item>
                      </el-col>
                        <el-col :span="8">
                          <el-form-item label="最后登录：">
                             <el-date-picker
                              :disabled="disabled"
                                v-model="form.lastLoginTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="12:00:00">
                            </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                           <el-form-item label="注册时间：">
                            <el-date-picker
                             :disabled="disabled"
                                v-model="form.cDate"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="12:00:00">
                            </el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="修改人：">
                            <el-input v-model="form.updatePeople" :disabled="disabled"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                          <el-form-item label="修改时间：">
                            <el-date-picker
                                :disabled="disabled"
                                v-model="form.updateTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="12:00:00">
                            </el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                          <el-form-item label="邀请码：" :error="errMsg2">
                            <el-input v-model="form.invitedCode" placeholder="请输入邀请码" :disabled="disabled2"></el-input>
                          </el-form-item>
                      </el-col>
                      <!-- <el-col :span="3" :offset="1">
                          <el-button size="mini" type="primary"  :disabled="disabled2" @click="invitationCode">生成邀请码</el-button>
                      </el-col> -->
                    </el-row>
                    <el-row v-if="circleId">
                        <el-col :span="12">
                            <el-form-item label="用户横幅：">
                                <el-upload
                                class="avatar-uploader"
                                accept="image/jpeg,image/png"
                                :action="`${this.$store.state.baseUrl}common/uploadOssPic`"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess1"
                                :on-error="upError1"
                                name="picture"
                                :headers="myHeaders"
                                auto-upload
                                :before-upload="beforeAvatarUpload1">
                                <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div slot="tip" class="el-upload__tip">只支持jpg/png类型，且不超过2M,图片比例：4.4:1</div>
                                </el-upload>
                            </el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                          <el-form-item label="简介：">
                                      <el-input type="textarea" v-model="form.description"></el-input>
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
            num:'',
            errMsg: '',
            errMsg1: '',
            errMsg2: '',
            disablesAdd: false,
            isPas: true,
            height: null,
            disabled3: false,
            disabled: false,   //是否禁止填写
            disabled1: false,   //是否禁止填写
            disabled2: true,   //是否禁止填写
            dialogVisible: false,   //弹出框是否显示
            imageUrl: '',  //上传图片显示
            imageUrl1: '',
            multipleSelection: [],   //存放勾选的数据
            currentPage: 1, //当前第几页
            pageSize: 30,   //每页显示多少条
            total: null,   //总共多少条数据
            circleId: '',
            rowIndex: '',   //每一行的编号
            myHeaders: {     //上传图片携带token
                    token: ''
                },
            provinceList: [],  //省份
            cityList: [],   //市
            areaList: [],    //县级
            countryList: [],   //乡镇
            baitList: [],   //饵料列表
            fishMethodList: [],   //有什么钓法
            fishList: [],   //鱼类分类
            rankList: [],    //头衔
            checkList: [],   //认证方式
            formInline: {   //圈子、详细地址、创建时间的表单
                nickname: '',
                phone: '',
                role: '',
                status: '',
                cDate: ''
            },
            form:{
                number: '',   //编号
                icon: '',   //图标
                bannerIcon: '',
                forumId: '',   //论坛id
                nickname: '',    //昵称
                motorcade: '',   //车贴编号
                status: '1',   //状态
                gender: '0',    //性别
                rank: '',   //头衔
                password: '',    //密码
                phone: '',    //手机号
                birthday: '',    //生日
                wechat: '',   //微信
                seatPhone: '',   //电话
                qq: '',   //qq
                showWechat: '',   //微信显示
                showPhone: '',   //电话显示
                showQq: '',   //qq显示
                role: '',   //用户类型
                level: '',   //等级
                checkWay: '',  //认证方式
                trusted: '0',   //是否免审
                invitedCode: '5435',    //邀请码
                // targetFish: [],   //对象鱼
                // fishWay: [],   //钓法
                // bait: [],   //饵料
                address: '',   //地址
                province: '',  //省份
                city: '',   //市
                area: '',   //县
                country: '',  //乡
                longitude: '',   //经度
                latitude: '',   //纬度
                lastLoginTime: '',   //最后登录
                cDate: '',   //注册时间
                updatePeople: '',   //修改人
                updateTime: '',   //修改时间
                description: '',   //简介
                remark: '',  //备注
            },
            tableList: [   //表格的头部配置
                {prop: 'status', label: '状态', width: '80', align: ''},
                {prop: 'forumId', label: '论坛ID', width: '80', align: 'right'},
                {prop: 'motorcade', label: '车贴编号', width: '80', align: 'right'},
                {prop: 'phone', label: '手机号', width: '120', align: 'right'},
                {prop: 'nickname', label: '昵称', width: '120', align: ''},
                {prop: 'token', label: '级别', width: '80', align: ''},
                {prop: 'role', label: '用户类别', width: '80', align: ''},
                {prop: 'rank', label: '用户组', width: '180', align: ''},   //level等级数字   token等级数字对应的汉字
                {prop: 'gender', label: '性别', width: '60', align: ''},
                {prop: 'birthday', label: '生日', width: '120', align: 'right'},
                {prop: 'seatPhone', label: '电话', width: '120', align: 'right'},
                {prop: 'address', label: '住址', width: '130', align: ''},
                {prop: 'remark', label: '备注', width: '150', align: ''},
                {prop: 'cDate', label: '注册时间', width: '100', align: 'right'},
                {prop: 'cDate', label: '创建时间', width: '100', align: 'right'},
                {prop: 'updatePeople', label: '修改人', width: '80', align: ''},
                {prop: 'updateTime', label: '修改时间', width: '100', align: 'right'},

            ],
            tableData: [],    //表格的数据
            rules: {
                nickname: [
                      { required: true, message: '请输入昵称', trigger: 'blur' },
                      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                /*password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],*/
                /*phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {pattern:  /^1[3|4|5|6|8|7|9][0-9]\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],*/
                /*seatPhone: [
                    { required: false, type: 'number', message: '电话必须为数字值', trigger: 'blur'}
                ],
                qq: [
                    { required: false, type: 'number', message: '电话必须为数字值', trigger: 'blur'}
                ]*/
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6
                }
                },
        }
    },
    methods:{
        //生成邀请码
        /*invitationCode(){
          
             for(var i=0; i<4; i++){
                 this.num+=Math.floor(Math.random()*10);
             }
        
            this.form.invitedCode = this.num;
           
            
        },*/
          //根据不同状态添加样式
      tableRowClassName({row, rowIndex}) {
          if(row.status === '正常'){
              return 'success-row';
          }else if(row.status === '禁用'){
              return 'warning-row';
          }else{
              return '';
          }
    },

        //获取用户列表
        getUserList(pageSize,pageNum){
            this.$post('user/getUserList',{
                pageSize: pageSize ? pageSize : 30,
                pageNum: pageNum ? pageNum : 1,
                nickname: this.formInline.nickname ?  this.formInline.nickname : null,
                phone: this.formInline.phone ? this.formInline.phone : null,
                role: this.formInline.role ? this.formInline.role : null,
                status: this.formInline.status ? this.formInline.status : null,
                cDate: this.formInline.cDate ? `${this.dataTransform(this.formInline.cDate[0])} 00:00:00` : null,
                enddate: this.formInline.cDate ?  `${this.dataTransform(this.formInline.cDate[0])} 23:59:59`: null,

            }).then(res=>{
               if(res.code == 0){
                    if(res.data.list <=0){
                    this.tableData = res.data.list;
                    this.total = res.data.total;
                    }else{
                        let arr = res.data.list;
                        arr.forEach((e,index)=>{
                           arr[index].status = e.status == 0? '禁用' : '正常'
                           if(e.gender != undefined){
                               arr[index].gender = e.gender == 0 ? '女' : '男'
                           }

                           if(e.role == 0){
                               arr[index].role = '超级管理'
                           }else if(e.role == 1){
                               arr[index].role = '管理'
                           }else if(e.role == 2){
                               arr[index].role = '钓友'
                           }else if(e.role == 3){
                               arr[index].role = '农家乐'
                           }else{
                                arr[index].role = '渔具店'
                           }
                             this.tableData = JSON.parse(JSON.stringify(arr))
                             this.total = res.data.total;
                        })


                        this.$nextTick(()=>{
                            this.checked();//每次更新了数据，触发这个函数即可。
                        })
                    }


                }
            })
        },
        //查询
        search(){
            this.currentPage = 1;
            this.getUserList();
        },
        //新增
        add(){
            this.dialogVisible = true;
            this.circleId = '';
            this.disabled = true;
            this.disabled1 = false;
            this.disabled3 = true;
            this.disabled2 = true;
            this.isPas = false;
            //点击新增清空表单
                for(var i in this.form){
                if(i == 'status'){  //遇到默认项跳过，执行下面的循环
                    continue;
                }else if(this.form[i] != ''){

                    this.$nextTick(() => {
                            this.$refs['nickname'].resetField();
                            this.$refs['phone'].resetField();
                            this.$refs['password'].resetField();

                            //将对象还原   shabisheji
                            Object.keys(this.form).forEach((key)=>{
                                if(key == 'targetFish' || key == 'fishWay' || key == 'bait'){
                                    this.form[key] = []
                                }else if(key == 'status'){
                                    this.form[key] = '1'
                                }else if(key == 'gender'){
                                    this.form[key] = '0'
                                }else if(key == 'trusted'){
                                    this.form[key] = '0'
                                }else{
                                    this.form[key] = ''
                                }
                            })
                            this.imageUrl = '';
                            this.imageUrl1 = '';
                        });


                }
            }
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
                    this.$get('user/onOffUser',{
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
            this.disabled1 = true;
            this.disabled2 = false;
            this.disabled3 = false;
            this.circleId = this.multipleSelection[0].cId;   //获取每条圈子的id,用来判断点击弹出框的确认是新增还是修改
            this.$get('user/getUserInfo',{
                id: this.circleId
            }).then(res=>{
                this.form = res.data;
                this.form.status = this.form.status + "";
                this.form.gender = this.form.gender + "";
                this.form.trusted = this.form.trusted + "";
                this.form.number = this.rowIndex;
                this.form.targetFish = this.form.targetFish ? this.form.targetFish.split(',') : [];
                this.form.fishWay = this.form.fishWay ? this.form.fishWay.split(',') : [];
                this.form.bait = this.form.bait ? this.form.bait.split(',') : [];
                this.imageUrl = res.data.iconUrl;
                this.imageUrl1 = res.data.bannerIconUrl;

                if(res.data.role == 1 || res.data.role == 0){
                    this.isPas = false;
                }else{
                    this.isPas = true;
                }

                if(res.data.role){
                    this.getrankList(res.data.role)
                }


            })

        },
        //获取头衔
        getrankList(rank){
            if(rank == 2){
                rank = 4;
            }else if(rank == 3){
                rank = 2;
            }else if(rank == 4){
                rank = 3;
            }
            this.$get('levelRule/queryByType',{
                type: rank
            }).then(res=>{
                if(res.code == 0){
                    this.rankList = res.data;
                }
            })
        },
        //获取认证方式
        getcheckList(){
            this.$get('levelRule/queryByType',{
                type: 9
            }).then(res=>{
                if(res.code == 0){
                    this.checkList = res.data;
                }
            })
        },
        //导出
        exportd(){
            let path = this.$store.state.baseUrl;
            let href = path + 'user/downloadUserList'
            let json = {};

            Object.keys(this.formInline).forEach((key,index)=>{
                if(this.formInline[key] != '' && key != 'cDate'){
                    json[key] = this.formInline[key]
                }else if(this.formInline.cDate.length > 0 && key == 'cDate'){
                    json.cDate =  `${this.dataTransform(this.formInline.cDate[0])} 00:00:00`;
                    json.enddate =  `${this.dataTransform(this.formInline.cDate[1])} 23:59:59`;
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
            this.getUserList(val,this.currentPage);
        },
        //当前第几页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getUserList(this.pageSize,val)
        },
        //弹出框的确认按钮
        comfirm(formName){
             if(!this.form.icon){
                this.$message({
                message: '请上传新的用户图标！',
                type: 'warning'
                });

                return;
            }
            if(!this.circleId && this.form.phone == ''){
                let reg = /^1[3|4|5|6|8|7|9][0-9]\d{8}$/;
                if(!reg.test(this.form.phone)){
                    this.errMsg = '请输入正确的手机号';
                }
                return;
            }else{
                this.errMsg = ''
            }
             if(!this.circleId && this.form.password == ''){
                this.errMsg1 = '请输入密码'
                return;
            }else{
                this.errMsg1 = ''
            }

            var reg=new RegExp("^[0-9]{4}$");
            if(!reg.test(this.form.invitedCode) && this.form.invitedCode && this.circleId){
                this.errMsg2 = '请输入4位数字邀请码'
                return
            }else{
                this.errMsg2 = ''
            }

            this.$refs[formName].validate((valid)=>{
                if(valid){
                    let url = this.circleId ? 'user/updateUserByManager' : 'user/addManager'    //如果this.circleId存在，那就是调修改接口，否则就是新增接口
                    let role;
                    if(this.form.role == 0 ||  this.form.role == '超级管理'){
                        role = 0;
                    }else if(this.form.role == 1 ||  this.form.role == '管理'){
                        role = 1;
                    }else if(this.form.role == 2 ||  this.form.role == '钓友'){
                        role = 2;
                    }else if(this.form.role == 3 ||  this.form.role == '农家乐'){
                        role = 3;
                    }else{
                        role = 4;
                    }
                    this.$post(url,{
                        cId: this.circleId ? this.circleId : null,
                        forumId: this.form.forumId,
                        nickname: this.form.nickname,
                        motorcade: this.form.motorcade,
                        status:  this.form.status,  //因为修改回显如果状态不改变，那么传给后台的会是’正常‘汉字，需要进行转换成1，否则就是正常的
                        gender: this.form.gender,
                        rank: this.form.rank,
                        password: this.form.password,
                        phone: this.form.phone,
                        birthday: this.form.birthday,
                        wechat: this.form.wechat,
                        seatPhone: this.form.seatPhone,
                        qq: this.form.qq,
                        showWechat: this.form.showWechat,
                        showPhone: this.form.showPhone,
                        showQq: this.form.showQq,
                        role: role,
                        checkWay: this.form.checkWay,
                        trusted: this.form.trusted,
                        invitedCode: this.form.invitedCode,
                        // level: this.form.level,
                        // targetFish: (this.form.targetFish.length > 0) ? this.form.targetFish.join(',') : '',
                        // fishWay: (this.form.fishWay.length > 0) ? this.form.fishWay.join(',') : '',
                        // bait: (this.form.bait.length > 0) ? this.form.bait.join(',') : '',
                        address: this.form.address,
                        province: this.form.province,
                        city: this.form.city,
                        area: this.form.area,
                        country: this.form.country,
                        longitude: this.form.longitude,
                        latitude: this.form.latitude,
                        lastLoginTime: this.form.lastLoginTime,
                        cDate: this.form.cDate,
                        updatePeople: this.form.updatePeople,
                        updateTime: this.form.updateTime,
                        description: this.form.description,
                        remark: this.form.remark,
                        icon: this.form.icon,
                        bannerIcon: this.form.bannerIcon
                    }).then(res=>{
                        if(res.code == 0){
                            //隐藏dialog框
                            this.dialogVisible = false;
                            //提示添加成功
                            this.$message({
                            message: res.msg,
                            type: 'success'
                            });

                             //获取用户列表
                           this.getUserList()

                        }else if(res.code == 500){
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
         console.log(id)
        //根据省份id获取城市
          this.provinceList.forEach((val)=>{
            if(id == val.regionName){
                this.cityList = val.childList;
                 this.form.city = '';
                this.form.area = '';
                this.form.country = '';
            }
        })
     },
     //获取县级列表
     chooseArea(id){
         //根据城市id获取县级
           this.cityList.forEach((val)=>{
              if(id == val.regionName){
                this.areaList = val.childList;
                this.form.area = '';
               this.form.country = '';
              }
          })
     },
     //获取乡镇
     chooseCountry(id){
         //根据县级id获取乡镇列表
        this.areaList.forEach((val)=>{
              if(id == val.regionName){
                this.countryList = val.childList;
              }
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
       //获取鱼类分类
     getFishList(){
         this.$post('sysCategory/queryByCategory',{
             category: 35
         }).then(res=>{
            this.fishList = res.data;
         })
     },


     /**start上传图片 */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.icon = file.response.data;
        if(res.code == 602){
            this.$message.error(res.msg);
            setTimeout(()=>{
                this.$router.push({
                    name: 'login'
                })
            },1500)
            }
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
      },







      handleAvatarSuccess1(res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw);
        console.log(this.imageUrl1)
        this.form.bannerIcon = file.response.data;
        console.log(this.form.bannerIcon)
        if(res.code == 602){
            this.$message.error(res.msg);
            setTimeout(()=>{
                this.$router.push({
                    name: 'login'
                })
            },1500)
            }
      },
      beforeAvatarUpload1(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('请选择我们支持的格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLt2M
      },
      //上传图片失败
      upError1(err){
        if(err){
             this.$message.error('上传图标失败');
        }
      }
     /**end上传图片 */
    },
    mounted(){
        //获取用户列表
        this.getUserList()
        //表格第一行默认选中
        this.checked();

        window.addEventListener('resize', ()=>{
             this.height = window.innerHeight - 240;
        })

        if(this.$store.state.token){
            this.myHeaders.token = this.$store.state.token
        }


        //判断是不是最高管理员登录，是就可以新增，反之不行
        if(JSON.parse(localStorage.getItem('userInfo')).nickname != 'admin'){
            this.disablesAdd = true;
        }
    },
    created(){
         this.height = window.innerHeight - 240;
    },
    watch: {
        dialogVisible: function(val){
            let that = this;
            if(val){
                //获取省份
                that.getProvince();
                //获取有什么钓法
                that.getFishMethodList();
                //获取有什么饵料
                that.getBaitList();
                //获取鱼有什么分类
                that.getFishList();
                //获取认证方式
                that.getcheckList();
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
.user .topSearch .el-form-item__content{
    width: 100px;
}
.user .topSearch .el-date-editor{
    width: 220px;
}
.user .table .el-table .el-table__body-wrapper{
    overflow-y: scroll;
}
.user .el-dialog .el-dialog__header .el-dialog__title{
    font-size: 14px ;
    border-left: 2px solid #2693fa;
    padding-left: 8px;
}
.user .el-dialog .el-date-editor .el-input__inner{
    width: 176.66px;
}
.user .el-date-editor--datetime input{
    width: 176.66px;
}
.user .el-select{
    width: 100%;
}



.user .avatar-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
}
.user .avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
.user .avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 120px;
height: 120px;
line-height: 120px;
text-align: center;
}
.user .avatar {
width: 120px;
height: 120px;
display: block;
}

.user .el-upload__tip{
    text-align: left;
}


 .user .el-table .warning-row {
    /* background:#3399fb; */
    color: red;
  }

  .user .el-table .success-row {
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
    margin: 10px 0 40px;
}
.user span.uploadTitle{
    float: left;
    line-height: 130px;
    padding-right: 15px;
}
</style>

