<template>
  <div style="padding:10px 10px 5px 10px">
    <el-row
      :gutter="20"
      :style="{height:height+'px',overflow:'auto'}"
    >
      <el-col :span="24">
        <el-card
          shadow="hover"
          class="cardCard"
          :style="{height:height2+'px',overflow:'scroll'}"
        >
          <div
            slot="header"
            style="font-size:15px;padding: 8px 15px;"
          >
            <i
              class="el-icon-s-order"
              style="margin-left:-5px;color:#85AAF1"
            />
            文书预览
          </div>
          <PhonePaginatedPDF
            :entrust-id="entrustId"
            :audit="auditStatus"
            :jdzy-id="jdzyId"
            @child-event="parentEvent"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row
      v-if=" auditStatus === $store.getters.AUDIT_STATUS.FAILED"
      :gutter="20"
    >
      <el-col :span="24">
        <el-card
          shadow="hover"
          class="txtCard"
          style="margin-top:6px"
        >
          <div
            slot="header"
            style="font-size:15px"
          >
            <i
              class="el-icon-s-release"
              style="margin-left:-5px;color:#85AAF1"
            />
            退回理由
          </div>
          <span style="font-size:13px;color:red;font-weight:bold">{{ `${auditfailedreason},请重新提交审核！` }}</span>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      v-if="auditStatus === $store.getters.AUDIT_STATUS.PENDING"
      :gutter="20"
    >
      <el-col :span="24">
        <el-card
          shadow="hover"
          style="margin-top:6px"
          class="wtshClass"
        >
          <div
            slot="header"
            style="font-size:15px"
          >
            <i
              class="el-icon-s-check"
              style="margin-left:-5px;color:#85AAF1"
            />
            <span style="font-size:15px">委托审核</span>
            <div style="float:right;display:flex;font-size:13px;margin-top:2px;color:#85AAF1">{{ `「 ${tipText} 」` }}</div>
          </div>
          <el-form>
            <el-row
              v-if="auditStep===$store.getters.AUDIT_STEP.FORTH"
              style="margin-bottom:0"
              :gutter="20"
            >
              <el-col
                :span="24"
                style="padding:0 10px;"
              >
                <el-form-item>
                  <el-input
                    v-model="auditOpinion"
                    :value="auditOpinion"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入审核意见"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row
              v-if="auditStep!==$store.getters.AUDIT_STEP.FORTH"
              :gutter="20"
            >
              <el-col :span="24">
                <el-input
                  v-model="memo"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                />
                <span
                  v-if="auditfailedreason!==''"
                  style="color:red;font-size:12px"
                >注：上次退回理由为【{{ auditfailedreason }}】</span>
              </el-col>
            </el-row>
            <el-row
              v-if="auditStep===$store.getters.AUDIT_STEP.PROCESSAUDITOR"
              style="margin-top:15px;font-size:14px"
              :gutter="20"
            >
              <el-col
                :span="5"
                style="margin-top:10px"
              >发文号:</el-col>
              <el-col
                :span="19"
                style="margin-left:-10px;padding-right:0"
              >
                <el-input
                  v-model="posT_XH"
                  type="number"
                  min="1"
                />
              </el-col>
              <span style="color:red; margin-top:10px;font-size:12px;"> {{ title }}</span>
            </el-row>
            <el-row
              :gutter="20"
              style="margin-top:5px"
            >
              <el-col
                :span="11"
                :offset="1"
              >
                <el-button
                  size="mini"
                  type="success"
                  plain
                  style="width:100%;height:34px;font-size:14px;"
                  @click="clickAuditEntrustButtonHandler"
                >通过审核
                </el-button>
              </el-col>
              <el-col :span="11">
                <el-button
                  size="mini"
                  type="danger"
                  plain
                  style="width:100%;height:34px;font-size:14px"
                  @click="clickFailedAuditEntrustButtonHandler"
                >不通过审核
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      class="signatureClass"
      title="签名"
      :visible.sync="dialogSignatureVisible"
      width="100%"
      append-to-body
      destroy-on-close
      :lock-scroll="false"
      @opened="isShowSignature=true"
      @close="isShowSignature=false"
    >
      <Signature
        v-if="isShowSignature"
        :is-four-auditor="isFourAuditor"
        :jdzy-id="jdzyId"
        @on-save="uploadImage"
        @on-picture="uploadPicture"
      />
    </el-dialog>
  </div>
</template>

<script>
function clientGetToken() {
  return client.getToken()
  // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiMjE3YWZjN2QtNjJlMC00MDJkLWEwNGYtYTFlNGM0OGQ3MDAxIiwiaWF0IjoiMjAyMi85LzIxIDg6NDM6MDMiLCJuYW1laWQiOiI3MzciLCJuYmYiOjE2NjM3MjA5ODMsImV4cCI6MTY2MzcyMjc4MywiaXNzIjoiand0X3VzZXIiLCJhdWQiOiJqd3RfYXVkaWVuY2UifQ.kTkoV-VKU52ZRJheP4D7YCgkCLyF8RuOT9jWaeP1e7A'
}

function clientGetOTaskId() {
  return client.getWtid()
  // return '3156'
}
function clientGetOjdzy() {
  return client.getJdzy()
  // return '2'
}

import { getEntrustInfoByEntrustID, getpostxhbywtid, updateAuditStatusByEntrustId, getpin } from '@/api/entrust'
import PhonePaginatedPDF from '@/components/WordButton/PhonePDF'
import { uploadImage } from '@/api/entrust'
import Signature from '@/components/Signature/PhoneIndex'

export default {
  components: {
    PhonePaginatedPDF,
    Signature
  },
  data() {
    return {
      entrustId: '',
      jdzyId: '',
      // 受理鉴定人
      sl_jdr: '',
      auditfailedreason: '',
      auditfailedreasonDialog: '',
      // 一检人姓名
      fristAuditorName: '',
      // 复核人姓名
      secondAuditorName: '',
      threeAuditor: '',
      // 三检人姓名
      threeAuditorName: '',
      // 授权签字人姓名
      thirdAuditorName: '',
      // 程序审核人姓名
      processAuditorName: '',
      // 领导姓名
      forthAuditorName: '',
      caseId: '',
      auditStatus: undefined,
      auditStep: undefined,
      // 领导审核人
      forthauditor: '',
      // 判断是否需要领导审核
      issuereport: false,
      // 发文号
      posT_XH: '',
      // 发文号获取失败提示
      title: '',
      imgsrc: '',
      tokentest: '',
      auditOpinion: '',
      memo: '',
      // 鉴定书的文书id
      jdsWsid: undefined,
      firstmemo: undefined,
      secondmemo: undefined,
      authmemo: undefined,
      thirdmemo: undefined,
      dialogSignatureVisible: false,
      isShowSignature: false,
      isPin: undefined,
      auditSignatureImageId: 0
    }
  },
  computed: {
    height() {
      const height = document.body.clientHeight - 160
      return height
    },
    height2() {
      const height2 = document.body.clientHeight - 165
      return height2
    },
    auditStepText() {
      switch (this.auditStep) {
        case this.$store.getters.AUDIT_STEP.FIRST:
          return `一审 ${this.fristAuditorName}`
        case this.$store.getters.AUDIT_STEP.SECOND:
          return `复核人 ${this.secondAuditorName}`
        case this.$store.getters.AUDIT_STEP.THIRD:
          return `授权签字 ${this.thirdAuditorName}`
        case this.$store.getters.AUDIT_STEP.FORTH:
          return `领导终审 ${this.forthauditor}`
        case this.$store.getters.AUDIT_STEP.THREE:
          return `三审 ${this.threeAuditorName}`
        case this.$store.getters.AUDIT_STEP.PROCESSAUDITOR:
          return `程序审核人 ${this.processAuditorName}`
        default:
          return '未知'
      }
    },
    tipText() {
      switch (this.auditStatus) {
        case this.$store.getters.AUDIT_STATUS.PENDING:
          return this.auditStepText + '  待审核'
        case this.$store.getters.AUDIT_STATUS.PASSED:
          return this.auditStepText + '  已审核'
        case this.$store.getters.AUDIT_STATUS.FAILED:
          return this.auditStepText + '  未通过审核'
        default:
          return this.auditStepText + '  未知'
      }
    },
    isFourAuditor() {
      this.getpin()
      if ((this.auditStep === this.$store.getters.AUDIT_STEP.FORTH) && (this.isPin === '1')) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    // 设置动态token
    this.tokentest = clientGetToken()
    var tokentest = this.tokentest
    this.$store.commit('user/SET_TOKEN2', tokentest)
    this.entrustId = clientGetOTaskId()
    var entrustId = this.entrustId
    this.jdzyId = clientGetOjdzy()
    this.getpin()
    // 查询委托信息
    getEntrustInfoByEntrustID(entrustId).then(response => {
      this.sl_jdr = response.data[0].sl_jdr
      this.imgsrc = response.data[0].wtfiles
      this.auditfailedreason = response.data[0].auditfailedreason
      this.fristAuditorName = response.data[0].firstauditor_name
      this.secondAuditorName = response.data[0].secondauditor_name
      this.threeAuditor = response.data[0].threeauditor
      this.threeAuditorName = response.data[0].threeauditor_name
      this.thirdAuditorName = response.data[0].thirdauditor_name
      this.processAuditorName = response.data[0].processauditor_name
      this.forthAuditorName = response.data[0].forthauditor_name
      this.caseId = response.data[0].ajid
      this.auditStatus = parseInt(response.data[0].auditstatus)
      this.auditStep = parseInt(response.data[0].auditstep)
      this.forthauditor = response.data[0].forthauditor
      this.issuereport = (response.data[0].issuereport === '1')
      // alert(response.data[0].ajname)
      if (parseInt(response.data[0].auditstep) === this.$store.getters.AUDIT_STEP.PROCESSAUDITOR) {
        getpostxhbywtid(parseInt(this.entrustId)).then(response => {
          if (!response.success) {
            this.posT_XH = 1
            this.title = '发文号获取失败！'
          } else {
            this.posT_XH = response.data
          }
        })
      }
    })
  },
  methods: {
    // 获得鉴定文书的wsid
    parentEvent(wsid) {
      this.jdsWsid = wsid
    },
    // 不通过审核退回
    clickFailedAuditEntrustButtonHandler() {
      this.$confirm('是否确定退回？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then(() => {
        this.auditEntrust(this.$store.getters.AUDIT_STATUS.FAILED, 0)
      }).catch(() => {
        this.$message.info('已取消退回')
      })
    },
    auditEntrust(auditStatus, isSign) {
      let auditStep = this.auditStep
      // 如果状态是待审核，则代表上一级审核通过。
      if (auditStatus === this.$store.getters.AUDIT_STATUS.PENDING) {
        // 如果审核步骤不是领导终审
        if (auditStep !== this.$store.getters.AUDIT_STEP.FORTH) {
          // 如果审核步骤是三审
          if (this.auditStep === this.$store.getters.AUDIT_STEP.THREE) {
            auditStep = this.$store.getters.AUDIT_STEP.THREE
            // 如果审核步骤是授权签字人，东阳通过审核后面是程序审核人步骤是6
          } else if (this.auditStep === this.$store.getters.AUDIT_STEP.THIRD) {
            auditStep = this.$store.getters.AUDIT_STEP.FORTH
          } else if (this.auditStep === this.$store.getters.AUDIT_STEP.PROCESSAUDITOR) {
            auditStep = this.$store.getters.AUDIT_STEP.PROCESSAUDITOR
          } else {
            auditStep++
          }
        } else {
          // 如果是领导终审，则为最后一级审核，状态改为通过
          auditStatus = this.$store.getters.AUDIT_STATUS.PASSED
        }
      } else if (auditStatus === this.$store.getters.AUDIT_STATUS.FAILED) {
        auditStep = this.$store.getters.AUDIT_STEP.NOT
        auditStatus = this.$store.getters.AUDIT_STATUS.FAILED
      }

      if (this.auditStep === this.$store.getters.AUDIT_STEP.FIRST) {
        this.firstmemo = this.memo
      } else if (this.auditStep === this.$store.getters.AUDIT_STEP.SECOND) {
        this.secondmemo = this.memo
      } else if (this.auditStep === this.$store.getters.AUDIT_STEP.THIRD) {
        this.authmemo = this.memo
      } else if (this.auditStep === this.$store.getters.AUDIT_STEP.THREE) {
        this.thirdmemo = this.memo
      }
      updateAuditStatusByEntrustId(this.entrustId, auditStatus, auditStep, this.auditSignatureImageId, this.auditOpinion, this.memo, this.firstmemo, this.secondmemo, this.authmemo, isSign, this.posT_XH).then(_ => {
        if (auditStatus === this.$store.getters.AUDIT_STATUS.PASSED && auditStep === this.$store.getters.AUDIT_STEP.FORTH) {
          this.$message.success(this.auditStepText + '通过，可以发文。')
          client.submitCheckState(auditStatus)
        } else if (auditStatus === this.$store.getters.AUDIT_STATUS.NOT) {
          this.$message.info('未提交审核')
          client.submitCheckState(auditStatus)
        } else if (auditStatus === this.$store.getters.AUDIT_STATUS.FAILED) {
          this.$message.info('审核不通过，已退回！')
          client.submitCheckState(auditStatus)
        } else if (auditStatus === this.$store.getters.AUDIT_STATUS.PENDING) {
          this.$message.success(this.auditStepText + '通过，已经自动提交下一级审核。')
          client.submitCheckState(auditStatus)
        }
      })
    },
    // 点击通过审核
    clickAuditEntrustButtonHandler() {
      this.dialogSignatureVisible = true
    },
    // 查询是否需要输入PIN码
    getpin() {
      getpin().then(response => {
        this.isPin = response.data
      })
    },
    // 上传签名图片
    uploadImage(blob) {
      const formData = new FormData()
      formData.append('file', blob)
      uploadImage(formData).then(response => {
        this.auditSignatureImageId = response.data.img_id
        this.dialogSignatureVisible = false
        this.auditEntrust(this.$store.getters.AUDIT_STATUS.PENDING, 0)
      })
    },
    // 使用个人中心签字图片
    uploadPicture() {
      this.dialogSignatureVisible = false
      this.auditEntrust(this.$store.getters.AUDIT_STATUS.PENDING, 1)
    }
  }
}
</script>

<style scoped>
::v-deep .el-form-item {
  margin-bottom: 0;
}
::v-deep .toppCard .el-card__body {
  padding: 0 20px 20px 20px;
}
.cardCard {
  margin-top: 5px;
}
::v-deep .cardCard .el-card__body {
  padding: 0;
  margin-top: 29px;
}
::v-deep .cardCard .el-card__header {
  padding: 2px;
  position: fixed;
  z-index: 9;
  top: 10px;
  width: 93%;
  background-color: #fff;
}
::v-deep .el-card__header {
  padding: 8px 15px;
}
.headerBtn {
  top: 17px;
  position: absolute;
  z-index: 5;
  right: 17px;
}
::v-deep .el-dialog__headerbtn {
  top: 5px;
  right: 9px;
  font-size: 29px;
}
::v-deep .el-dialog__body {
  padding: 0 10px 10px 10px;
}
::v-deep .wtshClass .el-card__body {
  padding: 5px;
}
</style>
<style>
.el-message-box {
  width: 98% !important;
}
</style>
