<template>
  <div style="height:100%">
    <el-row
      :gutter="20"
      style="width:100%;margin:0"
    >
      <el-col
        :span="24"
        style="padding:0"
      >
        <el-card class="topCard">
          <el-form
            ref="queryApplyForm"
            :model="queryApplyForm"
            label-width="125px"
          >
            <el-row :gutter="20">
              <el-col
                :span="24"
                style="border-bottom:1px solid #e3dada"
              >
                <el-form-item
                  class="borderStyle"
                  label="申请类型"
                  prop="classifiedType"
                  label-width="70px"
                >
                  <el-select
                    v-model="queryApplyForm.classifiedType"
                    placeholder="请选择类型"
                    clearable
                  >
                    <el-option
                      v-for="item in optionList.typeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col
                :span="19"
                style="border-bottom:1px solid #e3dada"
              >
                <el-form-item
                  class="borderStyle"
                  label="申请时间"
                  prop="SQDATE"
                  label-width="70px"
                >
                  <el-date-picker
                    v-model="queryApplyForm.SQDATE"
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
                style="margin-top:1.5%;"
              >
                <el-button
                  plain
                  size="mini"
                  type="primary"
                  style="width:100%"
                  @click="query"
                >查询
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      :style="innerStyle"
    >
      <el-card class="my-card">
        <el-table
          v-el-table-infinite-scroll="load"
          v-loading="tableLoading"
          :height="`100%`"
          :data="applyTableData"
          :infinite-scroll-immediate="false"
        >
          <el-table-column width="180">
            <template slot-scope="scope">
              <div style="font-size:15px;margin-bottom:5px">{{ scope.row.ajname }}</div>
              <div style="font-size:12px;color: #9c9898;margin-top:-5px">申请人 <span style="color: #6e6c6c;">{{ scope.row.sqrname }}</span></div>
              <div style="font-size:12px;color: #9c9898;margin-top:-5px">申请时间</div>
              <div class="timeClass">{{ scope.row.sq_date }}</div>
              <div style="font-size:12px;color: #9c9898;">状态</div>
              <div class="timeClass">{{ formatStatus(scope.row.status) }}</div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-row style="width:126%;text-align:center">
                <el-button
                  size="mini"
                  type="primary"
                  style="width:57%"
                  @click="editWS(scope.row)"
                >查看
                </el-button>
              </el-row>
              <el-row style="width:126%;text-align:center">
                <el-button
                  size="mini"
                  style="margin-top:5px;width:57%"
                  :disabled="scope.row.status==='4'"
                  :type="scope.row.status==='4'?'success':'primary'"
                  @click="finishApply(scope.row)"
                >{{ scope.row.status==='4'?'已完成':'完成' }}
                </el-button>
              </el-row>
              <el-row style="width:126%;text-align:center">
                <el-button
                  size="mini"
                  style="margin-top:5px;width:57%"
                  :disabled="scope.row.status!=='4'"
                  type="warning"
                  @click="sendMessage(scope.row)"
                >短信通知
                </el-button>
              </el-row>
              <div style="font-size:12px;color: #9c9898;margin-top:5px;text-align:center;width:126%">{{ scope.row.classifiedtype==='1'?'文书修改':'文书补发' }}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-dialog
      v-if="dialogEditJDWSVisible"
      title="申请修改鉴定文书"
      :visible.sync="dialogEditJDWSVisible"
      append-to-body
      width="95%"
      destroy-on-close
    >
      <editJDWS
        :row="row"
        :is-examine="isExamine"
        :is-edit="true"
        :iswt="true"
        :operdm="operdm"
        :username="username"
        :signpicture="signpicture"
        :signpictureid="signpictureid"
        :edit-success-call-back="editSuccessCallBack"
      />
    </el-dialog>
    <el-dialog
      v-if="dialogReissueJDWSVisible"
      title="申请补发鉴定文书"
      :visible.sync="dialogReissueJDWSVisible"
      append-to-body
      width="95%"
      destroy-on-close
    >
      <reissueJDWS
        :row="row"
        :is-examine="isExamine"
        :is-reissue="true"
        :iswt="true"
        :operdm="operdm"
        :username="username"
        :signpicture="signpicture"
        :signpictureid="signpictureid"
        :reissue-success-call-back="reissueSuccessCallBack"
      />
    </el-dialog>
    <el-dialog
      v-if="dialogFinshJDWSVisible"
      title="完成修改鉴定文书申请"
      :visible.sync="dialogFinshJDWSVisible"
      append-to-body
      width="95%"
      destroy-on-close
    >
      <finishEditJDWS
        :row="row"
        :operdm="operdm"
        :signpicture="signpicture"
        :signpictureid="signpictureid"
        :finish-edit-success-call-back="finishEditSuccessCallBack"
      />
    </el-dialog>
    <el-dialog
      v-if="dialogFinshJDWSVisible2"
      title="完成补发鉴定文书申请"
      :visible.sync="dialogFinshJDWSVisible2"
      append-to-body
      width="95%"
      destroy-on-close
    >
      <finishReissueJDWS
        :row="row"
        :operdm="operdm"
        :signpicture="signpicture"
        :signpictureid="signpictureid"
        :finish-reissue-success-call-back="finishReissueSuccessCallBack"
      />
    </el-dialog>
    <el-dialog
      v-if="dialogUpdateJDWSVisible"
      title="查看鉴定文书"
      :visible.sync="dialogUpdateJDWSVisible"
      append-to-body
      width="95%"
      top="15px"
      destroy-on-close
    >
      <updateJDWS
        :row="row"
        :update-success-call-back="updateSuccessCallBack"
      />
    </el-dialog>
  </div>
</template>

<script>
function clientGetToken() {
  return client.getToken()
  // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiOTYzNWY5NjItMTE4Ny00Njg4LTk5ZmYtZGE5NTA4MmM0NDc2IiwiaWF0IjoiMjAyMi8xMS84IDE0OjAxOjE2IiwibmFtZWlkIjoiNzc2IiwibmJmIjoxNjY3ODg3Mjc2LCJleHAiOjE2Njc4ODkwNzYsImlzcyI6Imp3dF91c2VyIiwiYXVkIjoiand0X2F1ZGllbmNlIn0.bt1TeyS5H-EOQ8w1KK9XiI9bEFPybvTe40QmA4YIfjI'
}
function clientGetOperdm() {
  return client.getOperdm()
  // return '776'
}
function clientGetUsername() {
  return client.getRealname()
  // return '王敏'
}
function clientGetSignpicture() {
  return client.getSignature()
  // return 'http://192.168.0.88:8040//LHS/UserSign/2022/10/27/6826e2302240c858c78d72c9b44f939e.PNG'
}
function clientGetSignpictureid() {
  return client.getSignatureid()
  // return '26387'
}

import { datePeriodPickerOptions } from '@/utils/tool'
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import { acquiremodifyword, sendsms_modifyword } from '@/api/word'
import editJDWS from './components/editJDWS.vue'
import reissueJDWS from './reissueJDWS.vue'
import finishEditJDWS from './components/finish.vue'
import finishReissueJDWS from './components/finish2.vue'
import updateJDWS from './components/updateJDWS.vue'

export default {
  components: { editJDWS, reissueJDWS, finishEditJDWS, finishReissueJDWS, updateJDWS },
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  },
  data() {
    return {
      applyTableData: [],
      tableLoading: false,
      totalPage: 0,
      queryApplyForm: {
        // 申请人
        sqr: '',
        // 发文号
        posT_XH: '',
        // 申请时间
        SQDATE: [],
        // 申请类型
        classifiedType: '',
        // 每页条数
        pageSize: 10,
        // 当前页数
        pageIndex: 1,
        // status: '3'
        status: '3,4'
      },
      optionList: {
        entrustPeopleOption: [],
        typeList: [{
          value: '1',
          label: '文书修改'
        }, {
          value: '2',
          label: '文书补发'
        }
        ]
      },
      pickerOptions: datePeriodPickerOptions,
      isExamine: false,
      dialogEditJDWSVisible: false,
      dialogReissueJDWSVisible: false,
      dialogFinshJDWSVisible: false,
      dialogFinshJDWSVisible2: false,
      dialogUpdateJDWSVisible: false,
      row: undefined,
      operdm: '',
      username: '',
      signpicture: '',
      signpictureid: '',
      offsetHeight: 0
    }
  },
  computed: {
    innerStyle: function () {
      return {
        'margin-top': this.offsetHeight + 'px',
        'margin-left': 0,
        'margin-right': 0,
        'padding-top': '5px',
        height: `calc(100% - ${this.offsetHeight}px)`
      }
    }
  },
  created() {
    this.tokentest = clientGetToken()
    var tokentest = this.tokentest
    this.$store.commit('user/SET_TOKEN2', tokentest)
    this.operdm = clientGetOperdm()
    this.username = clientGetUsername()
    this.signpicture = clientGetSignpicture()
    this.signpictureid = clientGetSignpictureid()
    this.getApplyList()
  },
  mounted() {
    this.offsetHeight = document.getElementsByClassName('topCard')[0].offsetHeight
  },
  methods: {
    // 短信通知
    sendMessage: function (row) {
      this.$confirm('是否短信通知申请人已完成申请?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        sendsms_modifyword(row.id).then(response => {
          this.$message.success('通知成功！')
          this.getApplyList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 查看
    ckApply(row) {
      this.row = row
      this.isExamine = false
      if (row.classifiedtype === '1') {
        this.dialogEditJDWSVisible = true
      } else {
        this.dialogReissueJDWSVisible = true
      }
    },
    // 修改
    editWS: function (row) {
      this.row = row
      this.dialogUpdateJDWSVisible = true
    },
    finishApply(row) {
      this.row = row
      if (row.classifiedtype === '1') {
        this.dialogFinshJDWSVisible = true
      } else {
        this.dialogFinshJDWSVisible2 = true
      }
    },
    // 获取委托表格数据
    getApplyList() {
      this.tableLoading = true
      acquiremodifyword(this.queryApplyForm).then(response => {
        this.applyTableData = this.applyTableData.concat(response.data.rows)
        this.totalPage = Math.ceil(response.data.total / 10)
        this.tableLoading = false
      })
    },
    // 格式化状态
    formatStatus(status) {
      if (status === '0') {
        return '待委托方领导审核'
      } else if (status === '1') {
        return '委托方领导已审核'
      } else if (status === '2') {
        return '鉴定中心授权人已审核'
      } else if (status === '3') {
        return '鉴定中心领导已审核'
      } else if (status === '4') {
        return '检验人完成'
      } else if (status === '-1') {
        return '委托方领导不予通过'
      } else if (status === '-2') {
        return '鉴定中心授权人不予通过'
      } else if (status === '-3') {
        return '鉴定中心领导不予通过'
      } else {
        return '未知状态'
      }
    },
    // 划到底部加载下一页数据
    load() {
      if (this.queryApplyForm.pageIndex < this.totalPage) {
        this.queryApplyForm.pageIndex = this.queryApplyForm.pageIndex + 1
        this.getApplyList()
      } else if (this.queryApplyForm.pageIndex === this.totalPage && this.totalPage !== 1) {
        this.$message.info('已经到底了~')
      }
    },
    // 查询表格数据
    query() {
      this.queryApplyForm.pageIndex = 1
      this.applyTableData = []
      this.getApplyList()
    },
    // 点击选择日期不调用输入法
    elDatePickerOnFocus() {
      document.activeElement.blur()
    },
    editSuccessCallBack() {
      this.dialogEditJDWSVisible = false
      this.applyTableData = []
      this.getApplyList()
    },
    reissueSuccessCallBack() {
      this.dialogReissueJDWSVisible = false
      this.applyTableData = []
      this.getApplyList()
    },
    finishEditSuccessCallBack() {
      this.dialogFinshJDWSVisible = false
      this.applyTableData = []
      this.getApplyList()
    },
    updateSuccessCallBack() {
      this.dialogUpdateJDWSVisible = false
      this.applyTableData = []
      this.getApplyList()
    },
    finishReissueSuccessCallBack() {
      this.dialogFinshJDWSVisible2 = false
      this.applyTableData = []
      this.getApplyList()
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-table__header-wrapper {
  display: none;
}
::v-deep .el-table__body-wrapper {
  overflow-y: scroll !important;
}
::v-deep .borderStyle .el-input__inner {
  border: none;
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
  width: 100%;
}
::v-deep .my-card .el-card__body {
  padding-top: 0;
  padding-bottom: 0;
  height: 100%;
}
.my-card {
  height: 100%;
}
::v-deep .borderStyle .el-form-item__label {
  font-size: 13px;
  font-weight: normal;
  color: #9c9898;
}
::v-deep .el-input__inner {
  text-align: left;
  font-size: 12px;
}
::v-deep .el-form-item {
  margin-bottom: 0;
}
::v-deep .diviStyle.el-divider--horizontal {
  margin: 12% 0 0 4%;
  background-color: #eee;
  width: 93%;
}
::v-deep .el-dialog__title {
  font-size: 15px;
}
::v-deep .el-dialog__header {
  padding: 10px 20px 10px;
}
::v-deep .el-dialog__body {
  padding: 0 10px 15px 10px;
}
::v-deep .el-form-item__label {
  font-size: 13px;
}
::v-deep .el-dialog__headerbtn {
  // top: 2%;
  margin-top: -3%;
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
