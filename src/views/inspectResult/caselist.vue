<template>
  <div style="height:100%">
    <el-row
      :gutter="20"
      style="width:100%"
    >
      <el-col
        :span="24"
        style="padding:0;margin-bottom:5px"
      >
        <el-card class="topCard">
          <el-form
            ref="queryEntrustForm"
            :model="queryEntrustForm"
            label-width="125px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item
                  label="受理编号"
                  prop="SLXH"
                  label-width="70px"
                >
                  <el-input
                    v-model="queryEntrustForm.SLXH"
                    :value="queryEntrustForm.SLXH"
                    clearable
                    placeholder="受理编号"
                  />
                </el-form-item>
              </el-col>
              <el-divider />
              <el-col :span="19">
                <el-form-item
                  label="委托时间"
                  prop="wtdate"
                  label-width="70px"
                >
                  <el-date-picker
                    v-model="queryEntrustForm.wtdate"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="center"
                    size="mini"
                    style="width: 100%"
                    @focus="elDatePickerOnFocus"
                  />
                </el-form-item>
              </el-col>
              <el-col
                :span="5"
                style="margin-top:3%"
              >
                <el-button
                  plain
                  size="mini"
                  type="primary"
                  @click="query"
                >查询
                </el-button>
              </el-col>
              <el-divider />
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="margin:110px 0 0 0;height:calc(100% - 115px)"
    >
      <el-card class="my-card">
        <el-table
          v-el-table-infinite-scroll="load"
          v-loading="tableLoading"
          :height="`100%`"
          :data="entrustTableData"
          :infinite-scroll-immediate="false"
          @row-click="rowClick"
        >
          <el-table-column width="180">
            <template slot-scope="scope">
              <div style="font-size:15px;margin-bottom:5px">{{ scope.row.ajname }}</div>
              <div style="font-size:12px;color: #9c9898;">受理时间</div>
              <div class="timeClass">{{ scope.row.sl_date }}</div>
              <div style="font-size:12px;color: #9c9898;margin-top:5px">委托单位</div>
              <div class="timeClass">{{ scope.row.wtdw_name }}</div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div style="font-size:12.5px;color:#8e8b8b;margin-left:33%;width: 65%;text-align: center;">{{ scope.row.sl_year_xh }}</div>
              <div class="rightInfo">送检人&nbsp;{{ scope.row.wt_operdm_one_name }}</div>
              <div class="rightInfo">受理人&nbsp;{{ scope.row.sl_operdm_name }}</div>
              <div style="width: 60%;margin-left: 35%;font-size: 12px;text-align: center;">{{ scope.row.status }}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-dialog
      title="案件检验结果"
      :visible.sync="resultDialog"
      width="94%"
      append-to-body
      destroy-on-close
      :lock-scroll="false"
    >
      <el-input
        v-model="jyconclusion"
        type="textarea"
        autosize
        placeholder="检验结论"
      />
    </el-dialog>
  </div>
</template>

<script>
function clientGetToken() {
  return client.getToken()
  // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiOTVhNDJmMDItMzRiMi00MTk5LWIyOGYtODFkODUyNjg2NWQxIiwiaWF0IjoiMjAyMi8xMC8xNyA5OjAyOjA5IiwibmFtZWlkIjoiNzc2IiwibmJmIjoxNjY1OTY4NTI5LCJleHAiOjE2NjU5NzAzMjksImlzcyI6Imp3dF91c2VyIiwiYXVkIjoiand0X2F1ZGllbmNlIn0.yIWmnuZdvm0BMoCSxhKJdu1gr1HS6cMIv-mwtwqr82M'
}
function clientGetOjdzy() {
  return client.getJdzy()
  // return '2'
}

import { getEntrustList } from '@/api/entrust'
import { acquireFinallyConclusion } from '@/api/identification'
import { datePeriodPickerOptions } from '@/utils/tool'
import elTableInfiniteScroll from 'el-table-infinite-scroll'

export default {
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  data() {
    return {
      entrustTableData: [],
      tableLoading: false,
      totalPage: 0,
      queryEntrustForm: {
        INSPECTSTATUS: '',
        SLXH: '',
        acceptStatus: 1,
        ajname: '',
        auditStatus: '',
        auditStep: '',
        authPerson: '',
        bjdrname: '',
        firstAuditor: '',
        forthAuditor: '',
        identificationType: '',
        issueNotice: NaN,
        issueReport: NaN,
        jcyB_SL_STATE: '',
        jdlb: '',
        jdzlb: '',
        jdzy: '',
        pageIndex: 1,
        pageSize: 10,
        postStatus: '',
        preAuditStatus: '',
        secondAuditor: '',
        sl_jdr: '',
        sl_operdm: '',
        sldate: [],
        sortName: 'SL_YEAR_XH',
        sortOrder: 'desc',
        thirdAuditor: '',
        wtAuditStatus: '',
        wt_operdm: '',
        wtbh: '',
        wtdate: [],
        wtdw: ''
      },
      pickerOptions: datePeriodPickerOptions,
      resultDialog: false,
      jyconclusion: ''
    }
  },
  created() {
    this.tokentest = clientGetToken()
    var tokentest = this.tokentest
    this.$store.commit('user/SET_TOKEN2', tokentest)
    this.queryEntrustForm.jdzy = clientGetOjdzy()
    if (this.queryEntrustForm.jdzy === this.$store.getters.MAJOR_TYPE.DNA) {
      this.queryEntrustForm.INSPECTSTATUS = '2'
    }
    this.getEntrustList()
  },
  methods: {
    // 获取委托表格数据
    getEntrustList() {
      this.tableLoading = true
      getEntrustList(this.queryEntrustForm).then(response => {
        if (this.queryEntrustForm.jdzy === this.$store.getters.MAJOR_TYPE.LH) {
          response.data.rows = response.data.rows.filter(item => item.inspectstatus !== 0)
        }
        this.entrustTableData = this.entrustTableData.concat(response.data.rows)
        this.totalPage = Math.ceil(response.data.total / 10)
        this.tableLoading = false
      })
    },
    // 划到底部加载下一页数据
    load() {
      if (this.queryEntrustForm.pageIndex < this.totalPage) {
        this.queryEntrustForm.pageIndex = this.queryEntrustForm.pageIndex + 1
        this.getEntrustList()
      } else if (this.queryEntrustForm.pageIndex === this.totalPage && this.totalPage !== 1) {
        this.$message.info('已经到底了~')
      }
    },
    // 查询表格数据
    query() {
      this.queryEntrustForm.pageIndex = 1
      this.entrustTableData = []
      this.getEntrustList()
    },
    // 点击选择日期不调用输入法
    elDatePickerOnFocus() {
      document.activeElement.blur()
    },
    rowClick(row) {
      if (this.queryEntrustForm.jdzy === this.$store.getters.MAJOR_TYPE.LH) {
        // 点击行跳转到该委托ID下的检材列表，传鉴定专业和委托ID
        client.lookjcList(row.jdzy, row.wtid)
        // this.$router.push({ path: '/samplelist', query: { jdzyId: row.jdzy, entrustId: row.wtid } })
      } else if (this.queryEntrustForm.jdzy === this.$store.getters.MAJOR_TYPE.DNA) {
        acquireFinallyConclusion(row.wtid).then(res => {
          if (res.data.conclusion) {
            this.resultDialog = true
            this.jyconclusion = res.data.conclusion
          } else {
            this.$message.info('该案件暂未提交检验结果！')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table__header-wrapper {
  display: none;
}
::v-deep .el-table__body-wrapper {
  overflow-y: scroll !important;
}
.timeClass {
  font-size: 13px;
  color: #6e6c6c;
  line-height: 1;
}
::v-deep .el-table td {
  padding: 15px 0;
}
.auditBtn {
  margin-left: 36%;
  padding: 5px 8px;
  font-size: 14px;
  width: 62%;
  text-align: center;
}
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 0 !important;
}
::v-deep .topCard .el-card__body {
  padding-top: 0;
}
::v-deep .topCard {
  position: fixed;
  z-index: 1;
}
::v-deep .my-card .el-card__body {
  padding-top: 0;
  padding-bottom: 0;
  height: 100%;
}
.my-card {
  height: 100%;
}
::v-deep .el-form-item__label {
  font-size: 13px;
  font-weight: normal;
  color: #9c9898;
}
::v-deep .el-input__inner {
  border: none;
  padding: 0 !important;
  text-align: left;
  font-size: 12px;
}
::v-deep .el-form-item {
  margin-bottom: 0;
  padding: 1% 0 0 1%;
}
::v-deep .el-divider--horizontal {
  margin: 12% 0 0 4%;
  background-color: #eee;
  width: 93%;
}
.rightInfo {
  font-size: 12.5px;
  color: #85aaf1;
  width: 126%;
  text-align: center;
}
::v-deep .el-dialog__title {
  font-size: 16px;
}
::v-deep .el-dialog__header {
  padding: 10px 20px 10px;
}
::v-deep .el-dialog__body {
  padding: 20px;
}
::v-deep .el-dialog__headerbtn {
  top: 2%;
  font-size: 23px;
}
</style>
<style lang="scss">
.el-picker-panel {
  line-height: 1;
  width: 100% !important;
  left: 0;
  font-size: 12px;
}
.el-input--small {
  font-size: 12px !important;
}
.el-date-range-picker__header div {
  font-size: 13px !important;
  margin-left: 19px !important;
  margin-right: 0 !important;
}
.el-picker-panel__icon-btn {
  width: 8px;
  height: 10px;
}
.el-picker-panel__body {
  margin: 0 !important;
  min-width: 0 !important;
}
.el-picker-panel__sidebar {
  display: none;
}
.el-picker-panel__shortcut {
  padding: 0;
}
.el-date-table td {
  padding: 0 !important;
}
</style>
