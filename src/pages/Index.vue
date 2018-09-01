<template>
    <div class="index">
        <p>用户统计</p>
        <div class="hr"></div>
        <div class="firstwrap">
            <div class="userNum">
                <div class="left">用户数：</div>
                <div class="right">
                    <div class="table">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            stripe
                            :header-cell-style="getRowClass">
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
                    </div>
                </div>
            </div>
            <div class="userNum">
                    <!-- start顶部搜索按钮 -->
                    <div class="topSearch">
                        <el-row>
                            <el-col :span="20">
                                <el-form inline :model="formInline" class="demo-form-inline" size="mini" label-width="82px">
                                        <el-form-item label="注册日期：">
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
                                          <el-form-item label="积分数：">
                                                <el-input clearable v-model="formInline.minscore"></el-input>
                                                <span>-</span>
                                                <el-input clearable v-model="formInline.maxscore"></el-input>
                                            </el-form-item>
                                            <el-form-item label="金币：">
                                                <el-input clearable v-model="formInline.mincoin"></el-input>
                                                <span>-</span>
                                                <el-input clearable v-model="formInline.maxcoin"></el-input>
                                            </el-form-item>
                                        </el-form>
                            </el-col>
                            <el-col :span="4" style="text-align: right">
                                <el-button type="primary" size="mini" @click="search">查询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- end顶部搜索按钮 -->
            </div>
            <div class="userNum">
                <div class="left">用户数：</div>
                <div class="right">
                    <div class="table">
                        <el-table
                            ref="multipleTable"
                            :data="tableData1"
                            tooltip-effect="dark"
                            style="width: 100%"
                            stripe
                            :header-cell-style="getRowClass">
                            <el-table-column
                            v-for="(item,index) in tableList1"
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
            <div class="userNum">
                <div class="left">注册地用户数：</div>
                <div class="right">
                    <div class="table">
                        <el-table
                            max-height="300"
                            ref="multipleTable"
                            :data="tableData2"
                            tooltip-effect="dark"
                            style="width: 100%"
                            stripe
                            :header-cell-style="getRowClass">
                            <el-table-column
                            v-for="(item,index) in tableList2"
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
        <div class="hr1"></div>
        <p class="title">帖子统计</p>
        <div class="hr"></div>
        <div class="seconedWrap firstwrap">
            <div class="userNum">
                <div class="left">帖子：</div>
                <div class="right">
                    <div class="table">
                        <el-table
                            ref="multipleTable"
                            :data="tableData3"
                            tooltip-effect="dark"
                            style="width: 100%"
                            stripe
                            :header-cell-style="getRowClass">
                            <el-table-column
                            v-for="(item,index) in tableList3"
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
            <div class="userNum">
                    <!-- start顶部搜索按钮 -->
                    <div class="topSearch">
                        <el-row>
                            <el-col :span="20">
                                <el-form inline :model="formInline1" class="demo-form-inline" size="mini" label-width="82px">
                                        <el-form-item label="发帖日期：">
                                            <el-date-picker
                                            v-model="formInline1.date"
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
                            <el-col :span="4" style="text-align: right">
                                <el-button type="primary" size="mini" @click="search1">查询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- end顶部搜索按钮 -->
            </div>
            <div class="userNum">
                <div class="content">
                    <div class="left">
                        <p class="noticeTitle">未审核<span>({{uncheckTopicNum}})</span></p>
                        <div class="table">
                            <el-table
                                ref="multipleTable"
                                :data="tableData4"
                                tooltip-effect="dark"
                                style="width: 100%"
                                stripe
                                :header-cell-style="getRowClass">
                                <el-table-column
                                v-for="(item,index) in tableList4"
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
                    <div class="right">
                         <p class="noticeTitle">审核<span>({{checkedTopicNum}})</span></p>
                         <div class="table">
                            <el-table
                                ref="multipleTable"
                                :data="tableData5"
                                tooltip-effect="dark"
                                style="width: 100%"
                                stripe
                                :header-cell-style="getRowClass">
                                <el-table-column
                                v-for="(item,index) in tableList5"
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
            <div class="userNum">
                 <div class="table">
                        <el-table
                            ref="multipleTable"
                            :data="tableData6"
                            tooltip-effect="dark"
                            style="width: 100%"
                            stripe
                            :header-cell-style="getRowClass">
                            <el-table-column
                            v-for="(item,index) in tableList6"
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
        <div class="hr1"></div>
        <p class="title">渔乐币统计</p>
        <div class="hr"></div>
        <p class="allNum">娱乐币：娱乐币总量<span>({{allCoin}})</span></p>
        <div class="userNum">
                <!-- start顶部搜索按钮 -->
                <div class="topSearch">
                    <el-row>
                        <el-col :span="20">
                            <el-form inline :model="formInline2" class="demo-form-inline" size="mini" label-width="82px">
                                    <el-form-item label="日期：">
                                        <el-date-picker
                                        v-model="formInline2.date"
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
                        <el-col :span="4" style="text-align: right">
                            <el-button type="primary" size="mini" @click="search2">查询</el-button>
                            <el-button size="mini" @click="exported">导出</el-button>
                        </el-col>
                    </el-row>
                </div>
                <!-- end顶部搜索按钮 -->

                 <div class="table table1">
                    <el-table
                        ref="multipleTable"
                        max-height="300"
                        :data="tableData7"
                        tooltip-effect="dark"
                        style="width: 100%"
                        stripe
                        :header-cell-style="getRowClass">
                         <el-table-column
                        type="index"
                        width="50"
                        header-align="right"
                        align="right"
                        :index="index"
                        label="编号">
                        </el-table-column>
                        <el-table-column
                        v-for="(item,index) in tableList7"
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
    </div>
</template>

<script>

export default {
    data(){
        return {
            allCoin: '',   //娱乐币总量
            uncheckTopicNum: '',   //未审核总帖子
            checkedTopicNum: '',   //已审核总帖子
            currentPage: 1, //当前第几页
            pageSize: 30,   //每页显示多少条
            total: 0,
             tableList: [   //表格的头部配置   //用户数1表头
              {prop: 'userNum', label: '总注册用户', width: '90', align: 'right'},
              {prop: 'todayNum', label: '今日注册用户', width: '110', align: 'right'},
              {prop: 'topicUserNum', label: '发帖用户', width: '80', align: 'right'},
              {prop: 'bestUserNum', label: '精华用户', width: '80', align: 'right'},
              {prop: '', label: '', width: '', align: ''},
            ],
            tableData: [],  //用户数1数据
                
            
            tableList1: [   //表格的头部配置    //用户数2表头
              {prop: 'userNum', label: '总注册用户', width: '90', align: 'right'},
              {prop: 'topicUserNum', label: '发帖用户', width: '80', align: 'right'},
              {prop: 'bestUserNum', label: '精华用户', width: '80', align: 'right'},
              {prop: '', label: '', width: '', align: ''},
            ],
            tableData1: [],   //用户数2数据

            tableList2: [   //表格的头部配置    //注册地用户数表头
              {prop: 'sort', label: '排名', width: '60', align: 'right'},
              {prop: 'city', label: '注册地', width: '100', align: 'left'},
              {prop: 'num', label: '注册用户', width: '80', align: 'right'},
              {prop: '', label: '', width: '', align: ''},
            ],
            tableData2: [],   //注册地用户数数据

             tableList3: [   //表格的头部配置    //帖子表头
              {prop: 'uncheckTopicNum', label: '未审核总帖子', width: '120', align: 'right'},
              {prop: 'checkedTopicNum', label: '已审核总帖子', width: '120', align: 'right'},
              {prop: 'comments', label: '总回复数', width: '100', align: 'right'},
              {prop: 'likes', label: '总点赞数', width: '100', align: 'right'},
              {prop: 'views', label: '总阅读数', width: '100', align: 'right'},
              {prop: 'messages', label: '消息', width: '100', align: 'right'},
              {prop: 'unReadMessage', label: '未读消息', width: '100', align: 'right'},
              {prop: 'shopComments', label: '渔具店和农家乐评论数', width: '160', align: 'right'},
              {prop: '', label: '', width: '', align: ''},
            ],
            tableData3: [],   //帖子数据
               
            

        tableList4: [   //表格的头部配置    //未审核
            {prop: 'uncheckTopics', label: '帖子', width: '120', align: 'right'},
            {prop: 'uncheckPoints', label: '钓位', width: '120', align: 'right'},
            {prop: 'uncheckFishs', label: '鱼情', width: '100', align: 'right'},
            {prop: 'uncheckVideos', label: '视频', width: '100', align: 'right'},
            {prop: '', label: '', width: '', align: ''},
        ],
        tableData4: [],    //未审核数据
       
        


        tableList5: [   //表格的头部配置    //审核
            {prop: 'checkedTopics', label: '帖子', width: '120', align: 'right'},
            {prop: 'checkedPoints', label: '钓位', width: '120', align: 'right'},
            {prop: 'checkedFishs', label: '鱼情', width: '100', align: 'right'},
            {prop: 'checkedVideos', label: '视频', width: '100', align: 'right'},
            {prop: 'checkedBests', label: '精华', width: '100', align: 'right'},
            {prop: '', label: '', width: '', align: ''},
        ],
        tableData5: [],    //审核数据
        
        


        
        tableList6: [   //表格的头部配置    //帖子统计最下面的表格
            {prop: 'comments', label: '回复数', width: '80', align: 'right'},
            {prop: 'likes', label: '点赞数', width: '80', align: 'right'},
            {prop: 'views', label: '阅读数', width: '80', align: 'right'},
            {prop: 'messages', label: '消息', width: '80', align: 'right'},
            {prop: 'unReadMessage', label: '未读消息', width: '80', align: 'right'},
            {prop: 'shopComments', label: '渔具店和农家乐评论数', width: '160', align: 'right'},
            {prop: '', label: '', width: '', align: ''},
        ],
        tableData6: [],   //帖子统计最下面的数据
         
        tableList7: [   //娱乐币统计
             {prop: 'getter', label: '昵称', width: '100', align: ''},
             {prop: 'cdate', label: '日期', width: '160', align: 'right'},
             {prop: 'type', label: '操作', width: '120', align: ''},
             {prop: 'num', label: '金币', width: '80', align: 'right'},
            {prop: '', label: '', width: '', align: ''},
        ],
        tableData7: [],   //娱乐币的数据


        formInline: {    //第一个搜索框字段
                date: '',
                minscore: '',
                maxscore: '',
                mincoin: '',
                maxcoin: ''
            },
        formInline1: {    //第二个帖子搜索框字段
                date: '',
            },
        formInline2: {    //娱乐币搜索框字段
                date: '',
            }
        }
    },
    methods: {
          //设置表头的背景颜色
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:#EFEFEF'
        } else {
          return ''
        }
      },

    /**用户统计start */
    
    //获取第一个用户数
    getFirstUserNum(){
        this.$get('/user/getUsersNum',{}).then(res=>{
            if(res.code == 0){
                let obj = {};
                obj.userNum = res.data.userNum;
                obj.todayNum = res.data.todayNum;
                obj.topicUserNum = res.data.topicUserNum;
                obj.bestUserNum = res.data.bestUserNum;
                this.tableData.push(obj)
            }
        })
    },

    //获取第二个用户数
    getSeconedUserNum(){
        this.$get('/user/getUsersNum',{
            startdt: this.formInline.date ? `${this.dataTransform(this.formInline.date[0])} 00:00:00` : null,
            enddt: this.formInline.date ?  `${this.dataTransform(this.formInline.date[0])} 23:59:59`: null,
            minscore: this.formInline.minscore ? this.formInline.minscore : null,
            maxscore: this.formInline.maxscore ? this.formInline.maxscore : null,
            mincoin: this.formInline.mincoin ? this.formInline.mincoin : null,
            maxcoin: this.formInline.maxcoin ? this.formInline.maxcoin : null,
        }).then(res=>{
            if(res.code == 0){
                let obj = {};
                obj.userNum = res.data.userNum;
                obj.topicUserNum = res.data.topicUserNum;
                obj.bestUserNum = res.data.bestUserNum;
                if(this.tableData1.length == 0){
                     this.tableData1.push(obj)
                }else{
                     this.tableData1.splice(0,1,obj)
                }
            }
        })
    },

     //用户统计查询
      search(){
          let reg = new RegExp('^[0-9]+$')
            if((!reg.test(this.formInline.minscore)&&this.formInline.minscore!= '')||(!reg.test(this.formInline.maxscore)&&this.formInline.maxscore!= '')||(!reg.test(this.formInline.mincoin)&&this.formInline.mincoin!= '')||(!reg.test(this.formInline.maxcoin)&&this.formInline.maxcoin!= '')){
                this.$message({
                message: '请输入正整数',
                type: 'warning'
                });
                return;
            }
             
             
           //  console.log(reg.test(this.formInline.minscore))
          //   console.log((!reg.test(this.formInline.minscore)&&this.formInline.minscore!= ''))
           this.getSeconedUserNum();
           this.getAreaNum();
      },


      //获取注册地用户
      getAreaNum(){
          this.$get('/user/getCityUserNum',{
            startdt: this.formInline.date ? `${this.dataTransform(this.formInline.date[0])} 00:00:00` : null,
            enddt: this.formInline.date ?  `${this.dataTransform(this.formInline.date[0])} 23:59:59`: null,
          }).then(res=>{
              if(res.code == 0){
                  this.tableData2 = res.data;
              }
          })
      },

    /**用户统计end */


    /**帖子统计start */
    
    //查询帖子总统计
    getPostNum(){
        this.$get('/basicTopic/queryTotalTopicCountForRole',{}).then(res=>{
            if(res.code == 0){
                this.tableData3 = res.data;
            }
        })
    },

    //根据条件查询帖子
    getPostList(){
        this.$post('/basicTopic/queryTopicCountByDateForRole',{
            beginTime: this.formInline1.date ? `${this.dataTransform(this.formInline1.date[0])} 00:00:00` : null,
            endTime: this.formInline1.date ?  `${this.dataTransform(this.formInline1.date[0])} 23:59:59`: null,
        }).then(res=>{
            this.checkedTopicNum = res.data[0].checkedTopicNum;   //已审核总帖子
            this.uncheckTopicNum = res.data[0].uncheckTopicNum;   //未审核总帖子

            let obj = {};    //未审核
            obj.uncheckTopics = res.data[0].uncheckTopics;
            obj.uncheckPoints = res.data[0].uncheckPoints;
            obj.uncheckFishs = res.data[0].uncheckFishs;
            obj.uncheckVideos = res.data[0].uncheckVideos;
            if(this.tableData4.length == 0){
                    this.tableData4.push(obj)
            }else{
                    this.tableData4.splice(0,1,obj)
            }

              let obj1 = {};    //已审核
            obj1.checkedTopics = res.data[0].checkedTopics;
            obj1.checkedPoints = res.data[0].checkedPoints;
            obj1.checkedFishs = res.data[0].checkedFishs;
            obj1.checkedVideos = res.data[0].checkedVideos;
            obj1.checkedBests = res.data[0].checkedBests;
            if(this.tableData5.length == 0){
                    this.tableData5.push(obj1)
            }else{
                    this.tableData5.splice(0,1,obj1)
            }


              let obj2 = {};    //已审核、未审核下面的表格
            obj2.comments = res.data[0].comments;
            obj2.likes = res.data[0].likes;
            obj2.views = res.data[0].views;
            obj2.messages = res.data[0].messages;
            obj2.unReadMessage = res.data[0].unReadMessage;
            obj2.shopComments = res.data[0].shopComments;
            if(this.tableData6.length == 0){
                    this.tableData6.push(obj2)
            }else{
                    this.tableData6.splice(0,1,obj2)
            }

        })
    },

    search1(){
        this.getPostList();
    },

    /**帖子统计end */




    /***鱼乐币统计start */
    
    //娱乐币统计条件查询
    getCoinList(pageSize,pageNum){
        this.$post('/scorecoin/getAllCoinList',{
                pageSize: pageSize ? pageSize : 30,
                pageNum: pageNum ? pageNum : 1,
                cdate: this.formInline2.date ? `${this.dataTransform(this.formInline2.date[0])} 00:00:00` : null,
                enddate: this.formInline2.date ?  `${this.dataTransform(this.formInline2.date[0])} 23:59:59`: null,
            }).then(res=>{
                if(res.code == 0){
                    this.tableData7 = res.data.list;
                    this.total = res.data.total;
                }
            })
    },
    //获取娱乐币总量
    getAllCoin(){
        //获取娱乐币总量
        this.$get('/scorecoin/getAllCoins').then(res=>{
            if(res.code == 0){
                this.allCoin = res.data;
            }
        })
    },
    //搜索
    search2(){
        this.getCoinList();
    },
    //导出
    exported(){
          let path = this.$store.state.baseUrl;
            let href = path + '/scorecoin/downloadAllCoinList'
            let json = {};


            Object.keys(this.formInline2).forEach((key,index)=>{
                if(this.formInline2[key] != '' && key != 'date'){
                    json[key] = this.formInline2[key]
                }else if(this.formInline2.date.length > 0 && key == 'date'){
                    json.cdate =  `${this.dataTransform(this.formInline2.date[0])} 00:00:00`;
                    json.enddate =  `${this.dataTransform(this.formInline2.date[1])} 23:59:59`;
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
            console.log(href)

            location.href = href; 
    },

    /***娱乐币统计end */










     
       //每页显示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
            this.getCoinList(val,this.currentPage);
        },
        //当前第几页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getCoinList(this.pageSize,val)
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
        index(index){
            return (this.currentPage - 1)*this.pageSize + index + 1;
        },
    },
    created(){
        //获取第一个用户数
        this.getFirstUserNum();
        //获取第二个用户数
        this.getSeconedUserNum();
        //获取地区注册用户
        this.getAreaNum();
        //查询帖子总统计
        this.getPostNum();
        //根据条件查询帖子
        this.getPostList();
        //根据条件查询娱乐币统计
        this.getCoinList();
        //获取娱乐币总数
        this.getAllCoin();    
    }
}
</script>


<style>
.index .el-form{
    width: 100%;
}
</style>

<style scoped>
.index .el-input{
    width: 100px !important;
}
.index .el-input__inner{
    width: 100px !important;
}
.index .el-date-editor{
    width: 200px !important;
}
.index .el-form-item__content{
    width: '';
}



.index .hr{
    width: 100%;
    height: 4px;
    background-color: #ffa835;
    margin-top: 3px;
    margin-bottom: 8px;
}
.index .hr1{
    position: relative;
    left: -20px;
    width: calc(100% + 40px);
    height: 30px;
    background: #42475b;
}
.index .title{
    padding-top: 20px;
}
.table{
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
}
.userNum{
    /* width: 100%; */
     margin-bottom: 20px; 
     overflow: hidden;
}



.firstwrap .userNum:nth-child(1){
    height: 100px;
}
.firstwrap .userNum:nth-child(2){
    height: 50px;
    width: 100%;
    border-top: 2px solid #eee;
    padding-top: 15px;
    margin-bottom: 0px;
}
.firstwrap .userNum:nth-child(3){
    height: 100px;
    border-bottom: 2px solid #eee;
    padding-bottom: 15px;
}
.seconedWrap .userNum:nth-child(3){
    height: 140px;
    border-bottom: 2px solid #eee;
    padding-bottom: 15px;
}

.left{
    float: left;
    width: 100px;
    font-size: 14px;
}
.right{
    float: right;
    width: calc(100% - 100px);
}



.topSearch{
    width: 100%;
}
.topSearch .right{
    text-align: right;
}


.seconedWrap .content{
    width: 100%;
    height: 100%;
}
.seconedWrap .content div.left{
    float: left;
    width: 40%;
    height: 130px;
}
.seconedWrap .content div.right{
    float: right;
    width: 50%;
    height: 100%;
}


.noticeTitle{
    text-align: center;
    padding-bottom: 8px;
}
.allNum{
    padding-bottom: 8px;
    border-bottom: 2px solid #eee;
    margin-bottom: 20px;
}

.page{
    text-align: right;
    margin: 10px 0 5px;
}

/* .index .table1 .el-table .el-table__body-wrapper{
    overflow-y: scroll;
    background: red;
} */
</style>
