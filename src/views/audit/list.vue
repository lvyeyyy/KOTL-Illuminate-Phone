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
      style="margin:110px 0 0 0;height:100%;height:calc(100% - 115px)"
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
              <div style="font-size:12px;color: #9c9898;">委托时间</div>
              <div class="timeClass">{{ scope.row.wtdate }}</div>
              <div style="font-size:12px;color: #9c9898;margin-top:5px">委托单位</div>
              <div class="timeClass">{{ scope.row.wtdw_name }}</div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div style="font-size:12.5px;color:#8e8b8b;margin-left:33%;width: 65%;text-align: center;">{{ scope.row.sl_year_xh }}</div>
              <div
                class="auditBtn"
                :style="{color:reviewButton(scope.row).type}"
              >{{ reviewButton(scope.row).text }}</div>
              <div style="width: 60%;margin-left: 35%;font-size: 12px;text-align: center;">{{ scope.row.status }}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
function clientGetToken() {
  return client.getToken()
  // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiN2Q2NmVjZTQtYzM2MC00MGQ0LWFkNDUtMWVhOWVhYTc5MmFmIiwiaWF0IjoiMjAyMi8xMC8yMSAxMTowMjoxOSIsIm5hbWVpZCI6Ijc3NiIsIm5iZiI6MTY2NjMyMTMzOSwiZXhwIjoxNjY2MzIzMTM5LCJpc3MiOiJqd3RfdXNlciIsImF1ZCI6Imp3dF9hdWRpZW5jZSJ9.EPbwnQiHyparCDzhLWeZjqiK0XHqe3kimfI41ZJwzl0'
}

import { getEntrustList } from '@/api/entrust'
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
        acceptStatus: '',
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
        jdzy: '2',
        pageIndex: 1,
        pageSize: 10,
        postStatus: '',
        preAuditStatus: '',
        secondAuditor: '',
        sl_jdr: '',
        sl_operdm: '',
        sldate: [],
        sortName: 'wtdate',
        sortOrder: 'desc',
        thirdAuditor: '',
        wtAuditStatus: '',
        wt_operdm: '',
        wtbh: '',
        wtdate: [],
        wtdw: ''
      },
      pickerOptions: datePeriodPickerOptions
    }
  },
  created() {
    this.tokentest = clientGetToken()
    var tokentest = this.tokentest
    this.$store.commit('user/SET_TOKEN2', tokentest)
    this.getEntrustList()
  },
  methods: {
    // 获取委托表格数据
    getEntrustList() {
      this.tableLoading = true
      getEntrustList(this.queryEntrustForm).then(response => {
        this.entrustTableData = this.entrustTableData.concat(response.data.rows)
        this.totalPage = Math.ceil(response.data.total / 10)
        this.tableLoading = false
      })
    },
    // 预审核按钮属性
    reviewButton(row) {
      switch (parseInt(row.preauditstatus)) {
        case this.$store.getters.PRE_AUDIT_STATUS.NOT:
          return { text: '未预审核', disabled: true, icon: '', type: '' }
        case this.$store.getters.PRE_AUDIT_STATUS.PENDING:
          return { text: '待预审核', disabled: false, icon: 'el-icon-bell', type: '#E6A23C' }
        case this.$store.getters.PRE_AUDIT_STATUS.FAILED:
          return { text: '未通过', disabled: false, icon: 'el-icon-close', type: '#F56C6C' }
        case this.$store.getters.PRE_AUDIT_STATUS.PASSED:
          return { text: '已预审核', disabled: false, icon: 'el-icon-check', type: '#67C23A' }
        default:
          return { text: '未预审核', disabled: true, icon: '', type: '' }
      }
    },
    // 划到底部加载下一页数据
    load() {
      if (this.queryEntrustForm.pageIndex < this.totalPage) {
        this.queryEntrustForm.pageIndex++
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
    rowClick(row, column, event) {
      // console.log(row)
      // this.$router.push({ path: '/preaudit/ajinfo', query: { caseId: row.ajid, entrustId: row.wtid } })
      // console.log('row', row.ajid)
      // 跳到确认案件信息
      client.lookInfo(row.ajid, row.wtid)
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
