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
        >
          <el-table-column width="190">
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
              <div style="font-size:12.5px;color:#8e8b8b;margin-left:33%;width: 70%;text-align: center;">{{ scope.row.sl_year_xh }}</div>
              <div style="width: 70%;margin-left: 35%;font-size: 12px;text-align: center;">{{ scope.row.status }}</div>
              <el-button
                size="mini"
                type="primary"
                style="margin-left:35%"
                @click="wtBtnClick(scope.row)"
              >委托步骤</el-button>
              <el-button
                size="mini"
                style="margin-left:35%;margin-top:3px"
                :disabled="getPrintDisabled(scope.row)"
                :type="getPrintStatus(scope.row)"
                @click="print(scope.row)"
              >查看文书</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-dialog
      v-if="dialogPrintVisible"
      title="查看鉴定文书"
      :visible.sync="dialogPrintVisible"
      width="98%"
      class="DialogStyle"
      top="10px"
      :close-on-click-modal="false"
    >
      <LookJYBG
        :row="row"
        :entrust-id="entrustId"
        :jdzy-id="rowJDZY"
        :lq-status="rowLqStatus"
      />
    </el-dialog>
  </div>
</template>

<script>
function clientGetToken() {
  //   return client.getToken()
  return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiODhhODQ5ZjktNjMwYi00YzEwLTljMjAtYThkZDhhNDNkYTU4IiwiaWF0IjoiMjAyMi8xMC8yNiAxNDoyNTo0MyIsIm5hbWVpZCI6Ijc3NiIsIm5iZiI6MTY2Njc2NTU0MywiZXhwIjoxNjY2NzY3MzQzLCJpc3MiOiJqd3RfdXNlciIsImF1ZCI6Imp3dF9hdWRpZW5jZSJ9.xKMreCSTipw_PdcyG19VUY-bXW60FWzNwc1Q6FQwdIU'
}
import { datePeriodPickerOptions } from '@/utils/tool'
import { getEntrustList } from '@/api/entrust'
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import LookJYBG from '../entrust/LookJYBG.vue'

export default {
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  components: { LookJYBG },
  data() {
    return {
      queryEntrustForm: {
        // 委托编号
        wtbh: '',
        // 受理序号
        SLXH: '',
        // 委托鉴定单位
        wtdw: '',
        // 检验状态
        INSPECTSTATUS: '',
        // 委托人
        wt_operdm: '',
        // 委托时间
        wtdate: [],
        // 案件名称
        ajname: '',
        // 鉴定专业
        identificationType: '',
        // 鉴定类别
        jdlb: '',
        // 鉴定专业
        jdzy: '',
        // 鉴定子类别
        jdzlb: '',
        // 受理人
        sl_operdm: '',
        // 鉴定人
        sl_jdr: '',
        // 受理时间
        sldate: [],
        // 预审核状态
        preAuditStatus: '',
        // 委托方领导审核状态
        wtAuditStatus: '',
        // 受理状态
        acceptStatus: '',
        // 检验状态
        // inspectStatus: '',
        // 审核状态
        auditStatus: '',
        // 发文状态
        postStatus: '',
        // 授权签字人（复核人）
        authPerson: '',
        // 一审人
        firstAuditor: '',
        // 二审人
        secondAuditor: '',
        // 三审人
        thirdAuditor: '',
        // 四审人
        forthAuditor: '',
        // 审核步骤
        auditStep: '',
        // 分页参数
        // 每页条数
        pageSize: 10,
        // 当前页数
        pageIndex: 1,
        // 排序字段
        sortName: 'wtdate',
        // 正序倒序
        sortOrder: 'desc',
        // 是否出具告知单
        issueNotice: NaN,
        // 是否出具检验报告
        issueReport: NaN,
        // 检材受理状态
        jcyB_SL_STATE: '',
        // 被鉴定人
        bjdrname: ''
      },
      entrustTableData: [],
      tableLoading: false,
      pickerOptions: datePeriodPickerOptions,
      totalPage: 0,
      entrustId: '',
      rowJDZY: '',
      rowLqStatus: '',
      row: undefined,
      dialogPrintVisible: false
    }
  },
  created() {
    this.tokentest = clientGetToken()
    var tokentest = this.tokentest
    this.$store.commit('user/SET_TOKEN2', tokentest)
    this.getEntrustList()
  },
  methods: {
    // 点击选择日期不调用输入法
    elDatePickerOnFocus() {
      document.activeElement.blur()
    },
    // 获取委托表格数据
    getEntrustList() {
      this.tableLoading = true
      getEntrustList(this.queryEntrustForm).then(response => {
        // console.log('11', response.data)
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
    getPrintDisabled(row) {
      return row.poststatus !== this.$store.getters.POST_STATUS.PASSED
    },
    getPrintStatus(row) {
      if (row.lq_status === '0') {
        if (row.poststatus === this.$store.getters.POST_STATUS.PENDING) {
          return 'info'
        } else {
          return 'success'
        }
      } else {
        return 'danger'
      }
    },
    print(row) {
      // console.log('row.wt_operdm_one', this.$store.state.user.operdm)
      // if (row.wt_operdm_one === this.$store.state.user.operdm || row.wt_operdm_two === this.$store.state.user.operdm) {
      this.entrustId = row.wtid
      this.rowJDZY = row.jdzy
      this.rowLqStatus = row.lq_status
      this.row = row
      this.dialogPrintVisible = true
      // } else {
      //   this.$message.info('您不是该案件的委托人，无权查看！')
      // }
    },
    wtBtnClick(row) {
      console.log('111', row)
      //  跳到案件信息页面 传ajid
      //   this.$router.push('/entrust/submit/' + row.ajid + '/' + row.wtid + '/' + row.jdzy + '/1')
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
// .auditBtn {
//   margin-left: 36%;
//   padding: 5px 8px;
//   font-size: 14px;
//   width: 62%;
//   text-align: center;
// }
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 0 !important;
}
::v-deep .topCard .el-card__body {
  padding-top: 0;
}
::v-deep .DialogStyle > .el-dialog .el-dialog__body {
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
// .rightInfo {
//   font-size: 12.5px;
//   color: #85aaf1;
//   width: 126%;
//   text-align: center;
// }
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
