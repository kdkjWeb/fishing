<template>
  <div id="post">
    <div id="lists">
      <!-- start顶部搜索按钮 -->
      <div class="topSearch">
        <el-row>
          <el-col :span="16">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
              <el-form-item label="标题：" >
                <el-input clearable placeholder="标题" v-model="formInline.cityName"></el-input>
              </el-form-item>
              <el-form-item label="作者：">
                <el-input clearable  placeholder="作者" v-model="formInline.authorId"></el-input>
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
              <el-form-item label="类型：">
                        <el-select v-model="formInline.topicType" placeholder="类型" clearable >
                          <el-option label="标准" value="1"></el-option>
                          <el-option label="钓位" value="2"></el-option>
                          <el-option label="鱼情" value="3"></el-option>
                          <el-option label="随便说说" value="5"></el-option>
                        </el-select>
                    </el-form-item>
              <el-form-item label="发布时间：">
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
            <!--commentNum: 0,   //评论总数-->
            <!--collects: 0,    //收藏总数-->
            <!--clickNum: 0   //点赞总数-->
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
        title="帖子"
        :visible.sync="dialogVisible"
        top="8vh"
        width="925px">
        <!--<span slot="footer" class="dialog-footer">-->
        <div>
          <el-button size="mini" type="primary" @click="comfirm('form')">确 定</el-button>
          <el-button size="mini" @click="cancel('form')">取 消</el-button>
        </div>


        <!--</span>-->
        <div class="dialog_content">
          <el-form label-position="right" ref="form" :rules="rules"  label-width="110px" :model="form" size="mini">
            <el-row>
              <el-col :span="24" style="margin-top:10px;">
                <el-form-item label="标题：" prop="title" ref="title">
                  <el-input v-model="form.title"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div style="text-align: right;margin-bottom: 20px;" v-if="isImg">
                <el-button type="primary" size="mini" class="add" @click="addContent" v-if="addIsShow">+ 添加</el-button>
                <el-button-group v-else>
                  <el-button type="primary" size="mini" @click="addwords">文字</el-button>
                  <el-button type="primary" size="mini" @click="addImages">图片</el-button>
                </el-button-group>
              </div>

              <div v-for="(item,index) in topicContentArr" :key="index">

                <el-col :span="24" v-if="item.contentType==1" >
                  <el-row>
                    <el-col :span="23">
                      <el-form-item label="内容：" class="content"  >
                        <el-input type="textarea" v-model="topicContentArr[index].content" :value="item.content"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1" style="text-align: right;font-size: 18px;">
                      <i class="el-icon-delete" @click="deleteImage(index)" style="cursor:pointer"></i>
                    </el-col>
                  </el-row>
                </el-col>

                <div v-if="imagesShow">
                  <el-col :span="24" v-if="item.contentType==2" >
                    <el-row>
                      <el-col :span="23">
                        <div style="width: 600px;margin: 0 auto 20px;">
                          <img :src="item.contentUrl" style="width:100%;"/>
                        </div>
                      </el-col>
                      <el-col :span="1" style="text-align: right;font-size: 18px;">
                        <i class="el-icon-delete" @click="deleteImage(index)" style="cursor:pointer"></i>
                      </el-col>
                    </el-row>
                  </el-col>
                </div>

                <div  v-else>
                  <el-col :span="24" :offset="1"  v-if="item.contentType==2">
                    <!--<el-row>-->
                       <!--<el-col :span="22">-->
                         <span class="uploadTitle">上传图标：</span>
                         <el-upload
                           class="avatar-uploader"
                           accept="image/jpeg,image/png"
                           :action="$store.state.imagesUrl"
                           list-type="picture-card"
                           :show-file-list="true"
                           :on-success="handleAvatarSuccess"
                           :on-remove="handleRemove"
                           :headers="myHeaders"
                           name="picture"
                           :limit="1"
                           :on-exceed="handleExceed"
                           :before-upload="beforeAvatarUpload">
                           <i  class="el-icon-plus avatar-uploader-icon"></i>
                           <div slot="tip" class="el-upload__tip">只支持jpg/png类型</div>
                         </el-upload>
                       <!--</el-col>-->
                      <!--<el-col :span="1" style="text-align: right;font-size: 18px;">-->
                        <!--<i class="el-icon-delete" @click="deleteCom(index)" style="cursor:pointer"></i>-->
                      <!--</el-col>-->
                    <!--</el-row>-->
                  </el-col>
                </div>
              </div>
            </el-row>

            <el-row>
              <el-col :span="24">


                <el-row>
                  <el-col :span="8">
                    <el-form-item label="编号：" prop="number">
                      <el-input v-model="form.number" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="置顶：" >
                      <el-select  v-model="form.isTop" placeholder="置顶" :disabled="disabledStatus">
                        <el-option label="全局置顶" value="2"></el-option>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="精华：" >
                      <el-select v-model="form.isBest" placeholder="精华" :disabled="disabledStatus">
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
                    <el-form-item label="排序号：" prop="showSort" :error="errMsg">
                        <el-input v-model="form.showSort" placeholder="请输入数字（置顶大于排序号）"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="类型：" prop="topicType"  ref="topicType">
                        <el-select v-model="form.topicType" placeholder="状态" @change="getType">
                          <el-option label="标准" value="1"></el-option>
                          <el-option label="钓位" value="2"></el-option>
                          <el-option label="鱼情" value="3"></el-option>
                          <el-option label="随便说说" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="浏览数：" >
                      <el-input v-model="form.viewNum"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="评论数：" >
                      <el-input v-model="form.commentNum"  disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="打赏金额：" >
                      <el-input v-model="form.reward" disabled ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="收藏数：" >
                      <el-input v-model="form.collects" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="点赞数："  >
                      <el-input v-model="form.clickNum" disabled ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="可见类型：" :error="VisibleEorr">
                      <el-input v-model="form.isVisibleCategoryId"  placeholder="请填写数字" @blur="Visible"></el-input>
                      <!--<el-select v-model="form.isVisibleCategoryId" placeholder="可见类型">-->
                        <!--<el-option label="打赏" value="2"></el-option>-->
                        <!--<el-option label="自己" value="1"></el-option>-->
                        <!--<el-option label="全网" value="0"></el-option>-->
                      <!--</el-select>-->
                      <span style="color:#66b1ff">-1自己，0全网，0以上打赏</span>
                    </el-form-item>

                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="titleName" prop="topicCircleArr" class="topicCircle" :error="error">

                      <el-select  v-if="isShow"   v-model="topicCircleArr" multiple filterable  >
                        <el-option
                          v-for="(item,index) in circleList"
                          :label="item.circleName"
                          :value="item.cId"
                          :key="index">
                        </el-option>
                      </el-select>

                      <el-select  v-show="!isShow" v-model="topicCircle"  filterable >
                        <el-option
                          v-for="(data,index) in anglingSiteList"
                          :label="data.name"
                          :value="data.cId"
                          :key="index">
                        </el-option>
                      </el-select>

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="抄送圈子：">
                      <el-input  disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="省：">
                      <el-select v-model="form.provinceId" placeholder="省" @change="getCityList(form.provinceId)" >
                        <el-option
                          v-for="(item,index) in provinceList"
                          :label="item.regionName"
                          :value="item.cId"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="钓法：">

                      <el-select v-model="form.fishMethod" filterable multiple >
                        <el-option
                          v-for="(item,index) in categoryList"
                          :label="item.codeName"
                          :value="item.codeName"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="鱼类：">
                      <el-select v-model="form.fishType" filterable multiple >
                        <el-option
                          v-for="(item,index) in fishArr"
                          :label="item.codeName"
                          :value="item.codeName"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="市：">

                      <el-select v-model="form.cityId" placeholder="市" @change="getaAreaList(form.cityId)" filterable>
                        <el-option
                          v-for="(item,index) in cityList"
                          :label="item.regionName"
                          :value="item.cId"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="饵料类型：">
                      <el-select v-model="form.baitType" filterable multiple >
                        <el-option
                          v-for="(item,index) in typeArr"
                          :label="item.codeName"
                          :value="item.codeName"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                      <el-form-item label="上鱼时间：">
                        <el-date-picker
                        :disabled="isDesable"
                          v-model="form.fishOnTime"
                          type="datetime"
                          placeholder="选择日期时间"
                          default-time="12:00:00">
                        </el-date-picker>
                      </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="县：">
                      <el-select v-model="form.areaId" placeholder="县" @change="getCountryList(form.areaId)" filterable>
                        <el-option
                          v-for="(item,index) in areaList"
                          :label="item.regionName"
                          :value="item.cId"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="是否坐船：">
                      <el-select v-model="form.isGoBoat" placeholder="是否坐船" :disabled="isDesable">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="经度：">
                      <el-input v-model="form.latitude" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="乡：">
                      <el-select v-model="form.countryId" placeholder="乡" filterable>
                        <el-option
                          v-for="(item,index) in countryList"
                          :label="item.regionName"
                          :value="item.cId"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item label="农家乐：">
                      <el-select v-model="form.farmhouseQqId" placeholder="请选择" filterable>
                        <el-option
                          v-for="(item,index) in  agritalinmentList"
                          :label="item.nickname"
                          :value="item.forumId"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="关联可见类型：">
                      <el-input v-model="form.clickNum" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="纬度：">
                      <el-input v-model="form.longitude" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <el-form-item label="详细地址：">
                  <el-input v-model="form.location"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：">
                  <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="创建人：" >
                  <el-select v-model="form.authorId"  filterable :disabled="aduthorDisabled">
                    <el-option
                      v-for="(item,index) in userList"
                      :label="item.nickname"
                      :value="item.cId"
                      :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发布时间：" prop="remark">
                    <el-input v-model="form.publishTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="修改人：" >
                  <el-input v-model="form.modifierName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="修改时间：">
                  <el-input v-model="form.modifyTime" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>

        </div>

      </el-dialog>
      <!-- end弹出框 -->

    </div>
    <div style="height: 30px;background: #42475B;margin:10px 0;margin-left: -20px;"></div>
    <div id="comment">
      <div class="topSearch" style="margin-bottom: 10px;">
        <el-row>
          <el-col :span="14">
            <el-button type="primary"  size="mini" @click="commentReplyClick">评论回复</el-button>
            <el-button size="mini" @click="pointOfDetailClick">点赞明细</el-button>
            <el-button size="mini" @click="praiseTheDetailClick">打赏明细</el-button>
          </el-col>

          <el-col :span="10" class="right" v-if="commentShow">
            <el-button type="primary" size="mini" @click="offComments" :disabled="disabled">审核</el-button>
            <el-button size="mini" @click="offComments"  :disabled="!disabled">取消审核</el-button>
            <el-button size="mini" @click="delCimmebts">删除</el-button>
          </el-col>
        </el-row>
      </div>

      <div style="padding-right: 20px;">
        <div class="table">
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
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    components: {ElCol},
    data(){
          return{
              imgFlag:false,
            height: '',
            errMsg: '',
            isDesable: false,
            error:'',

            disabledStatus:false,  //判断状态禁用精选
            allNum: {
              commentNum: 0,   //评论总数
              collects: 0,    //收藏总数
              clickNum: 0   //点赞总数
            },
            myHeaders: {     //上传图片携带token
              token: ''
            },
            //查询
            formInline:{
              status: '0',
              cityName:'',
              remark:'',
              authorId:'',
              date:'',
              topicType: ''
            },
            //增加
            topicCircle:'',
            titleName:'发送圈子：',
            dialogVisible:false,
            circleList:[],  //圈子列表
            provinceList:[],  //省份列表
            cityList:[],   //城市列表
            areaList:[],   //区县列表
            countryList:[],  //乡镇列表
            anglingSiteList:[],  //钓场
            topicCircleArr:[],   //发送圈子
            isShow:true,
            imageUrl:'',   //图片路径
            form:{
              authorId:'',
              title:'',  //标题、圈子
              isTop:'',  //是否置顶
              isBest:'',  //精华
              status:'',  //状态
              topicType:'',  //类型
              commentNum:'',  //评论数
              collects:'',   //收藏数
              reward:'',   //打赏金币
              isVisibleCategoryId:0,  //是否可见
              topicCircleList:[],    //发送圈子
              fishMethod: [],      //钓法
              fishType: [],      //鱼类
              provinceId:'',    //省
              cityId:'',        //市
              areaId:'',        //县
              countryId:'',     //乡
              baitType: [],      //饵料类型
              isGoBoat:'',     //是否坐船
              longitude:'',     //经度
              farmhouseQqId:'',  //农家乐
              latitude:'',       //纬度
              location:'',     //详细地址
              remark:'',       //备注
              publishTime:'',  //发布时间
              content:'',   //内容
              showSort:'',  //排序号
              topicContentList:[],  //内容
              author:'',
              icon:'',
              videoUrl:'',
            },
            topicContentArr:[
              {
                contentType:1,
                content:'.....',
                sort:0,
                imageUrl:''
              }
            ],
            cont:0,  //计数
            contentShow:true,
            addIsShow:true,
            videoFlag:false,
            videoUploadPercent:null,
            videoPath:'',
            circleId:'',
            aduthorDisabled:false,  //修改时禁用创建人
            topicShow:true,  //判断类型是否是钓位和鱼情
            rules:{
              title: [
                { required: true, message: '请输入标题名称', trigger: 'blur' },
                {min:2,max:60, message:'最少2个字符，最多60个字符',trigger:'blur'}
              ],
              topicType:[
                { required: true, message: '请选择类型', trigger: 'change' },
              ],

              /*showSort: [{
                        type: 'number',
                        trigger: 'blur',
                        required: false,
                        message: '排序号必须为数字值'
                }]*/
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
            userList:[],
            categoryList:[],
            fishArr:[],
            typeArr:[],
            imagesArr:[

            ],
            agritalinmentList:[],  //农家乐
            VisibleEorr:'',  //可以类型
            imagesShow:false,
            isImg:false,  //点击修改时，不显示添加内容按钮
            tableList: [   //表格的头部配置
              {prop: 'status', label: '状态', width: '50', align: ''},
              {prop: 'isTop', label: '置顶', width: '60', align: ''},
              {prop: 'isBest', label: '精华', width: '60', align: ''},
              {prop: 'title', label: '标题', width: '300', align: ''},
              {prop: 'topicType', label: '类型', width: '80', align: ''},
              {prop: 'circleList', label: '发送圈子', width: '120', align: ''},
              {prop: 'circleList2', label: '钓场', width: '120', align: ''},
              {prop: 'authorName', label: '创建人', width: '100', align: ''},
              {prop: 'showSort', label: '排序号', width: '70', align: ''},
              {prop: 'viewNum', label: '浏览', width: '60', align: 'right'},
              {prop: 'commentNum', label: '评论', width: '60', align: 'right'},
              {prop: 'collects', label: '收藏', width: '60', align: 'right'},
              {prop: 'clickNum', label: '点赞', width: '60', align: 'right'},
              {prop: 'reward', label: '打赏', width: '60', align: 'right'},
              {prop: 'publishTime', label: '发布时间', width: '160', align: 'right'},
              {prop: 'modifierName', label: '修改人', width: '100', align: ''},
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
      tableRowClassName({row, rowIndex}) {
          if(row.status === '审核'){
              return 'success-row';
          }else if(row.status === '未审'){
              return 'warning-row';
          }else{
              return '';
          }
    },
      //删除图片
      handleRemove(file, fileList){
        this.topicContentArr.forEach((val,num)=>{
          if(val.contentType == 2){
               if(file.response.data == val.content){
                 this.$get('/common/deleteOssImage',{
                   filename:val.content
                 }).then(res=>{
                   if(res.code == 0){
                     this.$message({
                       type: 'success',
                       message: '删除成功!'
                     });
                     val.content = '';
                   }else{
                     this.$message({
                       type: 'warning',
                       message: res.msg
                     });
                   }
                 })
               }
          }
        })
      },
      //限制图片只能传一张
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1个文件，如果还想添加图片，请点击图片按钮添加`);
      },
      //设置表头的背景颜色
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#EFEFEF'
        } else {
          return ''
        }
      },

      //判断可见类型
      Visible(){
          if(/^[+]{0,1}(\d+)$/.test(this.form.isVisibleCategoryId) || this.form.isVisibleCategoryId == -1 || !this.form.isVisibleCategoryId){
            this.form.isVisibleCategoryId = parseInt(this.form.isVisibleCategoryId);
            this.VisibleEorr = '';
          }else{
            this.VisibleEorr = '请输入大于等于-1的整数';
          }

      },

      //获取用户  /user/getMoreUserInfo
      getUser(){
        this.$get('/user/getUserNameList',{}).then(res=>{
            if(res.code == 0){
              this.userList = res.data
            }
        })
      },

      //获取钓法  /sysCategory/queryByCategory
      getCategory(){
          this.$post('/sysCategory/queryByCategory',{
            category:33
          }).then(res=>{
              this.categoryList = res.data;
          })
      },
      //获取鱼类  /sysCategory/queryByCategory
      getFishList(){6
        this.$post('/sysCategory/queryByCategory',{
          category:35
        }).then(res=>{
          this.fishArr = res.data;
        })
      },

      //获取饵料类型  /sysCategory/queryByCategory
      getTypeList(){
        this.$post('/sysCategory/queryByCategory',{
          category:34
        }).then(res=>{
          this.typeArr = res.data;
        })
      },

      //通过类型判断发送圈子
      getType(){
        this.isDesable = true;
        this.isShow = true;
        this.topicCircle = '';
        this.error = '';
        this.form.fishMethod = [];     //钓法
        this.form.fishType = [];     //鱼类
        this.form.baitType = [];  //饲料
        this.form.isGoBoat = '';  //是否坐船
        if(this.form.topicType == 2 || this.form.topicType == 3){
          this.isShow = false;
          this.topicCircleArr = [];
          this.isDesable = false;
        }
       this.form.topicCircleList = [];
        this.getCircleList();
      },

      //获取所有发送圈子  /basicTopic/queryById
      getCircleList(){
        // this.anglingSiteList = [];
        // this.circleList = [];
        if(this.form.topicType == 2 || this.form.topicType == 3){
            this.titleName = '钓场：';
            this.$get('/fishplace/getSendFishPlaceList',{}).then(res=>{
              if(res.code == 0){
                this.anglingSiteList = res.data;
                let id = '';
                for(let i=0; i<this.anglingSiteList.length; i++){
                    if(this.anglingSiteList[i].cId == this.topicCircle){
                        id = this.anglingSiteList[i].cId;
                        break;
                    }else{
                      id = '';
                    }
                }
                this.topicCircle = id;
              }

            });
            return false;
          }else{
            this.titleName = '发送圈子：';
            this.$get('/circle/querySendCircle',{}).then(res=>{
              if(res.code == 0){
                this.circleList = res.data;
                this.topicCircleArr= [];
                for(let i=0; i<this.circleList.length; i++){
                  if(this.form.circleList){
                    for(let j=0; j<this.form.circleList.length; j++){
                      if(this.circleList[i].cId == this.form.circleList[j].cId){
                        this.topicCircleArr.push(this.form.circleList[j].cId);
                      }
                    }
                  }
                }
              }
            })
        }

      },

      //获取所有省份 /province/queryAll
      getProvinceList(){
          this.$get('/region/queryTrees',{}).then(res=>{
              if(res.code == 0){
                this.provinceList = res.data;
              }
          })
      },
      //获取所有市
      getCityList(id){
        this.provinceList.forEach((val)=>{
            if(id == val.cId){
                this.cityList = val.childList;
            }
        })
      },

      //获取所有县  areaList
      getaAreaList(id){
          this.cityList.forEach((val)=>{
              if(id == val.cId){
                this.areaList = val.childList;
              }
          })
      },

      //获取所有乡
      getCountryList(id){
        this.areaList.forEach((val)=>{
            if(id == val.cId){
              this.countryList = val.childList;
            }
        })
      },

      //获取所有农家乐 user/getUserListByRole
      getAgritainment(){
          this.$get('user/getUserListByRole',{
            role:3
          }).then(res=>{
              if(res.code == 0){
                this.agritalinmentList = res.data;
              }else{
                  this.$message({
                    type: 'warning',
                    message: res.msg
                  })
              }

          })
      },

      //设置表格索引序号
      index(index){
        return (this.currentPage - 1)*this.pageSize + index + 1;
      },

      //获取所有帖子列表 /basicTopic/queryCommon
      getPostList(pageSize,pageNum){
        this.$post('/basicTopic/queryCommenToWeb',{
          pageSize: pageSize? pageSize : 30,
          pageNum: pageNum ? pageNum : 1,
          status: this.formInline.status? this.formInline.status: null,
          title:this.formInline.cityName? this.formInline.cityName:null,
          remark:this.formInline.remark? this.formInline.remark:null,
          authorName:this.formInline.authorId? this.formInline.authorId:null,
          publishTime: this.formInline.date ? `${this.dataTransform(this.formInline.date[0])} 00:00:00` : null,
          publishTime2: this.formInline.date ? `${this.dataTransform(this.formInline.date[1])} 23:59:59` : null,
          topicType: this.formInline.topicType ? this.formInline.topicType : null,
        }).then(res=>{
            if(res.code == 0){
              if(res.data.list == undefined){   //如果后面没返回数据就直接赋值
                        this.tableData = res.data.list;
                        this.total = 0;
                        this.allNum.commentNum = this.allNum.collects = this.allNum.clickNum = 0;   //dom每次更新数据都清零
                    }else{   //返回数据之后进行数据处理
                        let arr = res.data.list;
                        arr.forEach((e,index)=>{
                            arr[index].status = e.status == 0 ? '未审' : '审核';
                            arr[index].isTop = e.isTop == 0 ? '' : (e.isTop == 1?  '是': '全局置顶');
                            arr[index].isBest = e.isBest == 0 ? '' : '是';

                            if(e.circleList != undefined){
                               let str = '';
                                e.circleList.forEach((e)=>{
                                  if(e.showType == 0){
                                      if(e.circleName){
                                        str += e.circleName+'、';
                                        arr[index].circleList = str.replace(/、$/gi,"");
                                      }else{
                                        arr[index].circleList = '';
                                      }

                                  }else if(e.showType == 1){

//                                      if(arr[index].circleList != '钓位' && arr[index].circleList != '鱼情'){
//                                        arr[index].circleList = ''
//                                      }
                                      if(arr[index].circleList == 'undefined'){
                                        arr[index].circleList = '';
                                      }

                                      if(e.circleName){
                                        arr[index].circleList2 = e.circleName;
                                      }
                                  }
                                })

                            }



                            if(e.topicType == 1){
                              arr[index].topicType  = '标准'
                            }else if(e.topicType == 2){
                              arr[index].topicType  = '钓位'
                            }else if(e.topicType == 3){
                              arr[index].topicType  = '鱼情'
                            }else if(e.topicType == 4){
                              arr[index].topicType  = '鱼情'
                            }else if(e.topicType == 5){
                              arr[index].topicType  = '随便说说'
                            }
                        })
                       this.tableData = JSON.parse(JSON.stringify(arr))
                         this.$nextTick(function(){
                            this.checked();//每次更新了数据，触发这个函数即可。

                            // 每次dom数据更新以后重新计算总数
                            this.allNum.commentNum = this.allNum.collects = this.allNum.clickNum = 0;   //dom每次更新数据都清零
                            this.tableData.forEach((val,index)=>{
                              if(val.commentNum){
                                this.allNum.commentNum += val.commentNum;
                              }
                              if(val.collects){
                                this.allNum.collects += val.collects;
                              }
                              if(val.clickNum){
                                this.allNum.clickNum += val.clickNum;
                              }
                            })
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
        this.getPostList(this.pageSize,val);
      },

      //查询
      search(){
        this.getPostList();
//        this.currentPage = 1;
      },

      //新增
      add(){
        this.cont = 0;
        this.isDesable = false;
        this.isImg = true;
        this.imageUrl = '';
        this.videoPath = '';
        this.dialogVisible = true;
        this.imagesShow = false;
        this.circleId = '';
        this.aduthorDisabled = false;
        this.topicCircle = '';
        this.$nextTick(()=>{
            this.$refs['topicType'].resetField();
            this.$refs['title'].resetField();
          //将对象还原   shabisheji
          Object.keys(this.form).forEach((key)=>{
              if(key == 'fishType' || key == 'fishMethod' || key == 'baitType'){
                  this.form[key] = []
              }else if(key == 'isVisibleCategoryId'){
                this.form[key] = 0;
              }else{
                this.form[key] = ''
              }
          })
        });
        this.topicCircleArr = [];
        this.topicContentArr=[
          {
            contentType:1,
            content:'',
            sort:0,
            imageUrl:''
          }
        ]

        console.log(this.topicContentArr)
      },

      /**start上传图片 */
      handleAvatarSuccess(res, file) {
        this.topicContentArr.forEach((val)=>{
              if(val.contentType == 2){
                console.log(val)
                  if(val.sort && !val.content){
                    this.topicContentArr[val.sort].content = file.response.data;
                    this.topicContentArr[val.sort].imageUrl = URL.createObjectURL(file.raw);
                  }


              }
        })

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
        return (isJPG || isPNG) && isLt2M;
      },

      //标准时间格式转换
      dataTransform(date){
        if(!this.circleId) {
          if (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
          } else {
            return null;
          }
        }
      },

      //点击确定   /basicTopic/addBasicTopic   /basicTopic/updateBasicTopic
      comfirm(form){

        this.form.topicCircleList = [];
        if(this.form.topicType == 2 || this.form.topicType == 3){
          if(this.topicCircle){
            this.form.topicCircleList=[{
              cType: 1,
              placeId:this.topicCircle
            }]
          }
        } else{
            this.topicCircleArr.forEach((val)=>{
                if(val){
                  let obj = {};
                  obj.cType = 0;
                  obj.placeId = val;
                  this.form.topicCircleList.push(obj)
                }
          })
        }
        if(this.form.topicType == 5 || this.form.topicType == 2 || this.form.topicType == 3){
          this.error = ''
        }else{
          if(this.form.topicCircleList.length == 0){
            this.error = '请选择发送圈子';
            return;
          }else{
            for(let i=0; i< this.form.topicCircleList.length; i++){
              if(this.form.topicCircleList[i].cType == 0){
                if(!this.form.topicCircleList[i].placeId){
                  this.error = '请选择发送圈子';
                  return;
                }else{
                  this.error = '';
                }
              }else{

                this.error = '';
//                if(!this.form.topicCircleList[i].placeId){
//                  this.error = '请选择钓场';
//                  return;
//                }else{
//                  this.error = '';
//                }
              }
            }
          }
        }

        this.$refs[form].validate((valid)=>{
          let url = this.circleId ? '/basicTopic/updateBasicTopic' : '/basicTopic/addBasicTopicByRole'    //如果this.circleId存在，那就是调修改接口，否则就是新增接口
          let contentFlag = true;  //判断内容是否为空，
            if(valid){
              //验证排序号
              if( (/^\d+$/.test(this.form.showSort)) || !this.form.showSort){
                this.errMsg = '';
               }else{
                this.errMsg = '请输入数字';
                return;
               }

               //判断内容
              this.topicContentArr.forEach((val)=>{

                if(val.contentType == 2){
//                  if(!val.content){
//                    contentFlag = false;
//                    this.$message({
//                      type: 'warning',
//                      message: '所有上传图标不能为空，请上传图片！'
//                    });
//                  }
                }else{
                  if(!val.content){
                    contentFlag = false;
                    this.$message({
                      type: 'warning',
                      message: '所有内容都不能为空，请输入内容！'
                    });
                  }else{
                    if(val.content.length < 15){
                      contentFlag = false;
                      this.$message({
                        type: 'warning',
                        message: '内容最少输入15个字符或以上！'
                      });
                    }
                  }
                }
              })

              if(contentFlag){
                this.$post(url,{
                  cId: this.circleId ? this.circleId : null,
                  title: this.form.title,  //标题、圈子
                  isTop:this.form.isTop,  //是否置顶
                  isBest:this.form.isBest,  //精华
                  status:this.form.status,  //状态
                  topicType:this.form.topicType,  //类型
                  isVisibleCategoryId:this.form.isVisibleCategoryId,  //是否可见
                  fishMethod: this.form.fishMethod.join(','),      //钓法
                  fishType:this.form.fishType.join(','),      //鱼类
                  provinceId:this.form.provinceId,    //省
                  cityId:this.form.cityId,        //市
                  areaId:this.form.areaId,        //县
                  countryId:this.form.countryId,     //乡
                  baitType:this.form.baitType.join(','),      //饵料类型
                  isGoBoat:this.form.isGoBoat,     //是否坐船
                  longitude:this.form.longitude,     //经度
                  farmhouseQqId:this.form.farmhouseQqId,  //农家乐
                  latitude:this.form.latitude,       //纬度
                  location:this.form.location,     //详细地址
                  remark:this.form.remark,       //备注
                  authorId:this.form.authorId,       //创建人
                  showSort:this.form.showSort,       //排序号
                  fishOnTime:this.form.fishOnTime? this.dataTransform(this.form.fishOnTime):null,  //上鱼时间
                  topicCircleList:this.form.topicCircleList,  //发送圈子
                  topicContentList:this.topicContentArr,  //内容
                  viewNum: this.form.viewNum
                }).then(res=>{
                  if(res.code == 0){
                    this.dialogVisible = false;
                    this.$message({
                      message:res.msg,
                      type: 'success',
                    });
                  }else if(res.code == 500){
                    this.dialogVisible = true;
                    this.$message({
                      message: res.msg,
                      type: 'warning'
                    });

                  }
                  this.getPostList();
                })
              }

            }
        })
      },

      //点击取消
      cancel(form){
        this.$refs[form].resetFields();
        this.dialogVisible = false;
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

        if(this.multipleSelection[0].status === '审核'){
          this.$message({
              type: 'warning',
              message: '该帖子已被审核，不允许删除!'
            });
            return;
        }

        this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$get('/basicTopic/deleteBasicTopic',{
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
            }else{
                  this.$message({
                      type: 'warning',
                      message: res.msg
                  });
                  this.getPostList();
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
          this.isImg = false;
          this.errMsg = '';
          this.error = '';

          this.imagesShow = true;
          this.topicContentArr = [];
          this.aduthorDisabled = true;
        if(this.multipleSelection.length != 1){
          this.$message({
            message: '请选择一条需要修改的数据！',
            type: 'warning'
          });
          return;
        }
        this.dialogVisible = true;
        this.circleId = this.multipleSelection[0].cId;   //获取每条圈子的id,用来判断点击弹出框的确认是新增还是修改
          if(this.multipleSelection[0].status == '审核'){
                this.disabledStatus  = false;
          }else{
            this.disabledStatus  = true;
          }

        this.$get('/basicTopic/queryByIdForRole',{
          topicId: this.circleId
        }).then(res=>{
            if(res.code == 0){
              this.form = res.data;
              this.form.number = this.rowIndex;

              this.form.isGoBoat = this.form.isGoBoat ? this.form.isGoBoat + '' : '';
              this.form.status = this.form.status + '';
              this.form.isTop = this.form.isTop + '';
              this.form.isBest = this.form.isBest + '';
              this.topicContentArr = this.form.topicContentList;
              this.form.fishType = this.form.fishType ? this.form.fishType.split(',') : [];
              this.form.baitType = this.form.baitType ? this.form.baitType.split(',') : [];
              this.form.fishMethod = this.form.fishMethod ? this.form.fishMethod.split(',') : [];

              // if(this.form.topicType == 5){
              //       this.isDesable = true;
              //   }else if(this.form.topicType == 2){
              //     this.isShow = false;
              //   }else{
              //     this.isShow = true;
              //     this.isDesable = false;
              //   }
              if(this.form.topicType == 2 || this.form.topicType == 3){
                this.getCircleList();
                this.titleName = '钓场：';
                this.isShow = false;
                this.isDesable = false;
                this.topicCircle = this.form.circleList[0].cId
              }else{
                this.topicCircleArr = [];
                this.titleName = '发送圈子：';
                this.isShow = true;
                this.isDesable = true;

//            if(this.form.circleList){
//              this.form.circleList.forEach((val)=>{
//
//                this.topicCircleArr.push(val.cId);
//              })
//            }

                this.getCircleList()
              }
            }else{
                this.$message({
                  type: 'warning',
                  message: res.msg
                })
            }

        })
      },

      //导出
      exportd(){
            let path = this.$store.state.baseUrl;
            let href = path + 'basicTopic/downloadBasicTopic'
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
        if(this.multipleSelection[0] != undefined){

            this.$post('/comments/getCommentList',{
            pid:this.multipleSelection[0].cId,
            type:1
        }).then(res=>{
         if(res.data != undefined){
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
         }
          this.commentData = res.data;
          this.$nextTick(function(){
            this.check();//每次更新了数据，触发这个函数即可。

          })

        })
        }



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

       if(this.multipleSelection[0] != undefined){
          this.$post('liked/getAllLListByTopic',{
            commentId: this.multipleSelection[0].cId,
              type:3
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
            }
        })
       }
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

        if(this.multipleSelection[0] != undefined){
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

          })
        }
      },

      //多选框选中之后存放的数据
      selectionChange(val){
        this.multipleComment = val;

        // 强制要求复选框只能选择一个，大于等于2个的时候把第一个取消选中
        if(this.multipleComment.length == 2){
          for(var i= 0; i<this.commentData.length; i++){
            if(this.commentData[i].cId == this.multipleComment[0].cId){
              this.$refs.multiple.toggleRowSelection(this.commentData[i],false);

              //判读审核、取消审核按钮哪一个可以点
              // if(this.commentData[i+1].status == '正常'){
              //   this.disabled = false;
              // }else if(this.commentData[i+1].status == '禁用'){
              //   this.disabled = true;
              // }
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
           this.multipleComment[0] = this.commentData[0];

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
      delCimmebts(){
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
       if(this.topicContentArr.length>1){
         this.$confirm('此操作将永久删除, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.topicContentArr.forEach((val,num)=>{
             if(index == num){
               if(val.contentType == 2 && val.content){
                 this.$get('/common/deleteOssImage',{
                   filename:val.content
                 }).then(res=>{
                   if(res.code == 0){
                     this.$message({
                       type: 'success',
                       message: '删除成功!'
                     });

                   }else{
                     this.$message({
                       type: 'warning',
                       message: res.msg
                     });
                   }
                 })
               }
               this.topicContentArr.splice(index,1);
               this.cont--;
             }
           })

         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });
       }else{
         this.$message({
           type: 'warning',
           message: '至少保留一个'
         });
       }

      },

//      //删除组件
//      deleteCom(sort){
//        this.topicContentArr = JSON.parse(JSON.stringify(this.topicContentArr));
//        for(let i=0; i<this.topicContentArr.length; i++){
//            if(i === sort){
//              this.topicContentArr.splice(1,1);
//                      this.cont--;
//                    break;
//            }
//        }
//      },

      //点击添加 文字、图片
      addContent(){
        this.addIsShow = false;
      },

      //添加文字
      addwords(){
        let flag = false;
        this.cont++;
        if(this.topicContentArr.length  == 0){
          flag = true;
        }else{
         /* for(let i=0; i<this.topicContentArr.length; i++){
           if(this.topicContentArr[i].content){
           flag  = true;
           }else{
           flag = false;
           this.cont--;
           }
           }*/

          this.topicContentArr.push({
            contentType:1,
            content:'',
            imageUrl:'',
            sort:this.cont
          });
        }

//        if(flag){
//          this.topicContentArr.push({
//            contentType:1,
//            content:'',
//            imageUrl:'',
//            sort:this.cont
//          });
//        }else{
//          this.$message('您内容或图片不能为空，请填写或上传后再添加！');
//        }
      },

      //添加图片
      addImages(){

        let flag = false;
        this.cont++;
        if(this.topicContentArr.length == 0){
            flag = true;
        }else{
          /*for(let i=0; i<this.topicContentArr.length; i++){
            if(this.topicContentArr[i].content){
              flag  = true;
            }else{
              flag = false;
              this.cont--;
            }
          }*/

          this.topicContentArr.push({
            contentType:2,
            content:'',
            sort:this.cont,
            isImg:false,
            imageUrl:''
          })

          console.log(this.topicContentArr);
        }

/*        if(flag){
          this.topicContentArr.push({
            contentType:2,
            content:'',
            sort:this.cont,
            isImg:false
          })
        }else{
          this.$message('您内容或图片不能为空，请填写或上传后再添加！');
        }*/
      },

    },
    watch: {
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
                };
            }
        }
    },
    created(){
      this.height = window.innerHeight - 674;
    },
    mounted(){
       window.addEventListener('resize', ()=>{
             this.height = window.innerHeight - 674;
        })

      //获取所有帖子列表 /basicTopic/queryCommon
      this.getPostList();
      //表格第一行默认选中
      this.checked();

      if(this.$store.state.token){
        this.myHeaders.token = this.$store.state.token
      }

      //获取所有发送圈子列表
      this.getCircleList();
      //获取所有省份
      this.getProvinceList();

      this.check();

      //获取用户  /user/getMoreUserInfo
        this.getUser();
      //获取钓法  /sysCategory/queryByCategory
      this.getCategory();
      //获取鱼类  /sysCategory/queryByCategory
      this.getFishList();
      //获取饵料类型  /sysCategory/queryByCategory
      this.getTypeList();
      //获取所有农家乐 user/getUserListByRole
      this.getAgritainment();
    }
  }
</script>




<style>
  #post .el-table .warning-row {
    /* background:#3399fb; */
    color: red;
  }

  #post .el-table .success-row {
background: #fff;
}

  .content>.el-form-item__label:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  .topicCircle>.el-form-item__label:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  .content{
    margin-top:10px;
  }
</style>

<style>
  #post .topSearch .el-form-item__content{
    width: 80px;
  }
  #lists .topSearch  .el-date-editor{
    width: 200px;
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
  #post span.uploadTitle{
  float: left;
  line-height: 100px;
  padding-right: 15px;
}
.aboutNum{
  width: 1281px;
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
  .addNodelist{
    float: right;
    margin-right:40px;
    margin-bottom:10px;
  }
</style>
