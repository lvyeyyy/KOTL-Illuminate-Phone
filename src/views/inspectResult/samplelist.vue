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
            ref="queryInspectionForm"
            :model="queryInspectionForm"
            label-width="125px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item
                  label="鉴定人"
                  prop="inspectionPeople"
                  label-width="70px"
                >
                  <UserSelect
                    v-model="queryInspectionForm.OPERDM"
                    :value="queryInspectionForm.OPERDM"
                    user-label="鉴定人"
                    clearable
                    :option-list="identificationPeopleOption"
                    @on-value-change="val => queryInspectionForm.OPERDM = val"
                  />
                </el-form-item>
              </el-col>
              <el-divider />
              <el-col
                :span="19"
                style="padding-right:0"
              >
                <el-form-item
                  label="录入时间"
                  prop="inspectionInputDateTime"
                  label-width="70px"
                >
                  <el-date-picker
                    v-model="queryInspectionForm.INPUT_DATE"
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
      style="margin-top:110px"
    >
      <el-col :span="24">
        <el-card class="middle-card">
          <el-button
            size="mini"
            plain
            type="primary"
            style="width:100%"
            @click="ckresult"
          >查看案件检验结论</el-button>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="margin-top:5px;height:calc(100% - 170px)"
    >
      <el-card class="my-card">
        <el-table
          v-el-table-infinite-scroll="load"
          v-loading="tableLoading"
          :height="`100%`"
          :data="inspectionTableData"
          :infinite-scroll-immediate="false"
          @row-click="rowClick"
        >
          <el-table-column width="220">
            <template slot-scope="scope">
              <div style="font-size:15px;margin-bottom:5px">{{ scope.row.jcybbh }}</div>
              <div style="font-size:12px;color: #9c9898;">检验时间</div>
              <div class="timeClass">{{ scope.row.input_date }}</div>
              <div style="font-size:12px;color: #9c9898;margin-top:5px">方法名称</div>
              <div class="timeClass">{{ scope.row.latter_part }}</div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div style="font-size:12.5px;color:#8e8b8b;margin-left:33%;width: 65%;text-align: center;">{{ scope.row.appraisementid }}</div>
              <div style="font-size:15px;margin-left:33%;width: 65%;text-align: center;color: #85aaf1;">{{ scope.row.jcybname }}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-dialog
      title="鉴定报告结论"
      :visible.sync="resultDialog"
      width="94%"
      append-to-body
      destroy-on-close
      :lock-scroll="false"
    >
      <el-row v-if="jyConclusion.length>0">
        <el-col
          :span="24"
          style="margin-left:8px;font-size:15px"
        >
          进样结论
        </el-col>
        <el-col style="margin-top:5px">
          <el-alert
            :title="jyConclusion[0].result ||'未知'"
            :type="getAlertType(jyConclusion[0].result)"
            :closable="false"
            :description="jyConclusion[0].conclusion || '未填写结论'"
          />
        </el-col>
      </el-row>
      <el-row v-else>
        <el-col>
          <el-alert
            title="该提取暂无进样"
            type="warning"
            :closable="false"
          />
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :span="24"
          style="margin:10px 0 0 8px;font-size:15px"
        >
          最终结论
        </el-col>
        <el-col style="margin-top:5px">
          <el-alert
            :title="jyLastConslusion.result ||'未知'"
            :type="getAlertType(jyLastConslusion.result)"
            :closable="false"
            :description="jyLastConslusion.conclusion || '未填写结论'"
          />
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      title="检验结论"
      :visible.sync="allresultDialog"
      width="94%"
      append-to-body
      destroy-on-close
      :lock-scroll="false"
    >
      <el-input
        v-model="entrustConclusionForm.conclusion"
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
  // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiNGY4ZWU2YjktZDllZi00NzcwLTk1OWMtYjdkOGQyNjM3YTdmIiwiaWF0IjoiMjAyMi8xMC8xMiA4OjQ0OjQxIiwibmFtZWlkIjoiNzc2IiwibmJmIjoxNjY1NTM1NDgxLCJleHAiOjE2NjU1MzcyODEsImlzcyI6Imp3dF91c2VyIiwiYXVkIjoiand0X2F1ZGllbmNlIn0.C-vJa4lWaxY5RLm_U1_g4q5LDfkEZKCCo9utgLugLSw'
}
function clientGetOjdzy() {
  return client.getJdzy()
  // return '2'
}
function clientGetOTaskId() {
  return client.getWtid()
  // return '3319'
}

import elTableInfiniteScroll from 'el-table-infinite-scroll'
import { datePeriodPickerOptions } from '@/utils/tool'
import { getPeopleListByGroupIdList } from '@/api/selectOption'
import { getInspectionList, acquireInspectInstrumentConclusion, acquireFinallyConclusion } from '@/api/identification'
import UserSelect from '@/components/UserSelect/index'

export default {
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  components: { UserSelect },
  data() {
    return {
      inspectionTableData: [],
      tableLoading: false,
      totalPage: 0,
      jdzyId: '',
      queryInspectionForm: {
        // 委托编号
        wtid: '',
        // 鉴定人
        OPERDM: '',
        // 鉴定状态
        STATE: '',
        // 录入时间
        INPUT_DATE: [],
        // 分页参数
        planId: '',
        // 每页条数
        pageSize: 10,
        // 当前页数
        pageIndex: 1,
        // 排序字段
        sortName: 'INPUT_DATE',
        // 正序倒序
        sortOrder: 'desc'
      },
      identificationPeopleOption: [],
      pickerOptions: datePeriodPickerOptions,
      resultDialog: false,
      jyConclusion: [],
      jyLastConslusion: [],
      allresultDialog: false,
      entrustConclusionForm: {
        result: '',
        conclusion: '',
        // 检出物名称
        detection: undefined
      }
    }
  },
  created() {
    this.tokentest = clientGetToken()
    var tokentest = this.tokentest
    this.$store.commit('user/SET_TOKEN2', tokentest)
    this.jdzyId = clientGetOjdzy()
    this.queryInspectionForm.wtid = clientGetOTaskId()
    getPeopleListByGroupIdList([this.$store.getters.ROLES_TYPE.INSPECTORS], this.jdzyId).then(response => {
      this.identificationPeopleOption = response.data[0].users
    })
    this.getInspectionList()
  },
  methods: {
    // 获取表格数据
    getInspectionList() {
      this.tableLoading = true
      getInspectionList(this.queryInspectionForm).then(response => {
        this.totalPage = Math.ceil(response.data.total / 10)
        this.inspectionTableData = this.inspectionTableData.concat(response.data.rows)
        this.tableLoading = false
        // 查询委托最终结论
        acquireFinallyConclusion(this.queryInspectionForm.wtid).then(response => {
          if (response.data !== null) {
            this.entrustConclusionForm = response.data
          } else {
            this.inspectionTableData.forEach(item => {
              if (item.conclusion !== '' && item.conclusion !== null) {
                this.entrustConclusionForm.conclusion += (item.conclusion + '\n')
              }
            })
          }
        })
      })
    },
    // 划到底部加载下一页数据
    load() {
      if (this.queryInspectionForm.pageIndex < this.totalPage) {
        this.queryInspectionForm.pageIndex++
        this.getInspectionList()
      } else if (this.queryInspectionForm.pageIndex === this.totalPage && this.totalPage !== 1) {
        this.$message.info('已经到底了~')
      }
    },
    // 查询表格数据
    query() {
      this.queryInspectionForm.pageIndex = 1
      this.inspectionTableData = []
      this.getInspectionList()
    },
    // 点击选择日期不调用输入法
    elDatePickerOnFocus() {
      document.activeElement.blur()
    },
    rowClick(row) {
      acquireInspectInstrumentConclusion(row.appraisementid).then(response => {
        this.jyConclusion = response.data
      })
      this.jyLastConslusion = row
      this.resultDialog = true
    },
    // 警告条颜色
    getAlertType(text) {
      switch (text) {
        case '阴性':
          return 'success'
        case '阳性':
          return 'error'
        default:
          return 'info'
      }
    },
    ckresult() {
      this.allresultDialog = true
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
::v-deep .el-dialog__title {
  font-size: 15px;
}
::v-deep .el-dialog__header,
::v-deep .el-dialog__body {
  padding: 10px 20px;
}
::v-deep .middle-card .el-card__body {
  padding: 10px;
}
::v-deep .el-alert {
  padding-left: 0;
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
// .el-range__icon {
//   display: none;
// }
</style>
