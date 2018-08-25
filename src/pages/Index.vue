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
                                                <el-input clearable></el-input>
                                                <span>-</span>
                                                <el-input clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="金币：">
                                                <el-input clearable></el-input>
                                                <span>-</span>
                                                <el-input clearable></el-input>
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
                                <el-form inline :model="formInline" class="demo-form-inline" size="mini" label-width="82px">
                                        <el-form-item label="发帖日期：">
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
                            <el-col :span="4" style="text-align: right">
                                <el-button type="primary" size="mini" @click="search">查询</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- end顶部搜索按钮 -->
            </div>
            <div class="userNum">
                <div class="content">
                    <div class="left">
                        <p class="noticeTitle">未审核<span>(200)</span></p>
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
                         <p class="noticeTitle">审核<span>(500)</span></p>
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
        <p class="allNum">娱乐币：娱乐币总量<span>(200000)</span></p>
        <div class="userNum">
                <!-- start顶部搜索按钮 -->
                <div class="topSearch">
                    <el-row>
                        <el-col :span="20">
                            <el-form inline :model="formInline" class="demo-form-inline" size="mini" label-width="82px">
                                    <el-form-item label="日期：">
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
                        <el-col :span="4" style="text-align: right">
                            <el-button type="primary" size="mini" @click="search">查询</el-button>
                            <el-button size="mini" @click="search">导出</el-button>
                        </el-col>
                    </el-row>
                </div>
                <!-- end顶部搜索按钮 -->

                 <div class="table table1">
                    <el-table
                        ref="multipleTable"
                        max-height="300"
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
            currentPage: 1, //当前第几页
            pageSize: 30,   //每页显示多少条
            total: 200,
             tableList: [   //表格的头部配置   //用户数1表头
              {prop: 'title', label: '总注册用户', width: '100', align: 'right'},
              {prop: 'title1', label: '今日注册用户', width: '120', align: 'right'},
              {prop: 'title2', label: '发帖用户', width: '100', align: 'right'},
              {prop: 'title3', label: '精华用户', width: '100', align: 'right'},
              {prop: '', label: '', width: '', align: ''},
            ],
            tableData: [   //用户数1数据
                {
                    title: 100,
                    title1: 100,
                    title2: 100,
                    title3: 100,
                }
            ],
            tableList1: [   //表格的头部配置    //用户数2表头
              {prop: 'title', label: '注册用户', width: '100', align: 'right'},
              {prop: 'title1', label: '发帖用户', width: '100', align: 'right'},
              {prop: 'title2', label: '精华用户', width: '100', align: 'right'},
              {prop: '', label: '', width: '', align: ''},
            ],
            tableData1: [    //用户数2数据
                {
                    title: 100,
                    title1: 100,
                    title2: 100,
                }
            ],
            tableList2: [   //表格的头部配置    //注册地用户数表头
              {prop: 'title', label: '排名', width: '100', align: 'right'},
              {prop: 'title1', label: '注册地', width: '100', align: 'left'},
              {prop: 'title2', label: '注册用户', width: '100', align: 'right'},
              {prop: '', label: '', width: '', align: ''},
            ],
            tableData2: [    //注册地用户数数据
                {
                    title: 100,
                    title1: '成都',
                    title2: 100,
                }
            ],

             tableList3: [   //表格的头部配置    //帖子表头
              {prop: 'title', label: '未审核总帖子', width: '120', align: 'right'},
              {prop: 'title1', label: '已审核总帖子', width: '120', align: 'right'},
              {prop: 'title2', label: '总回复数', width: '100', align: 'right'},
              {prop: 'title3', label: '总点赞数', width: '100', align: 'right'},
              {prop: 'title4', label: '总阅读数', width: '100', align: 'right'},
              {prop: 'title5', label: '消息', width: '100', align: 'right'},
              {prop: 'title6', label: '未读消息', width: '100', align: 'right'},
              {prop: 'title7', label: '渔具店和农家乐评论数', width: '160', align: 'right'},
              {prop: '', label: '', width: '', align: ''},
            ],
            tableData3: [    //帖子数据
                {
                    title: 100,
                    title1: 100,
                    title2: 100,
                    title3: 100,
                    title4: 100,
                    title5: 100,
                    title6: 100,
                    title7: 100,
                }
            ],

        tableList4: [   //表格的头部配置    //未审核
            {prop: 'title', label: '帖子', width: '120', align: 'right'},
            {prop: 'title1', label: '钓位', width: '120', align: 'right'},
            {prop: 'title2', label: '鱼情', width: '100', align: 'right'},
            {prop: 'title3', label: '视频', width: '100', align: 'right'},
            {prop: '', label: '', width: '', align: ''},
        ],
        tableData4: [    //未审核数据
            {
                title: 100,
                title1: 100,
                title2: 100,
                title3: 100,
            }
        ],


        tableList5: [   //表格的头部配置    //审核
            {prop: 'title', label: '帖子', width: '120', align: 'right'},
            {prop: 'title1', label: '钓位', width: '120', align: 'right'},
            {prop: 'title2', label: '鱼情', width: '100', align: 'right'},
            {prop: 'title3', label: '视频', width: '100', align: 'right'},
            {prop: 'title4', label: '精华', width: '100', align: 'right'},
            {prop: '', label: '', width: '', align: ''},
        ],
        tableData5: [    //审核数据
            {
                title: 100,
                title1: 100,
                title2: 100,
                title3: 100,
                title4: 100,
            }
        ],


        
        tableList6: [   //表格的头部配置    //帖子统计最下面的表格
            {prop: 'title', label: '回复数', width: '120', align: 'right'},
            {prop: 'title1', label: '点赞数', width: '120', align: 'right'},
            {prop: 'title2', label: '阅读数', width: '100', align: 'right'},
            {prop: 'title3', label: '消息', width: '100', align: 'right'},
            {prop: 'title4', label: '未读消息', width: '100', align: 'right'},
            {prop: 'title5', label: '渔具店和农家乐评论数', width: '160', align: 'right'},
            {prop: '', label: '', width: '', align: ''},
        ],
        tableData6: [    //帖子统计最下面的数据
            {
                title: 100,
                title1: 100,
                title2: 100,
                title3: 100,
                title4: 100,
                title5: 100,
            }
        ],

            formInline: {
                date: '',
                name: ''
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
      //查询
      search(){
      },
       //每页显示多少条数据
        handleSizeChange(val) {
            this.pageSize = val;
        },
        //当前第几页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
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
    width: 190px !important;
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
