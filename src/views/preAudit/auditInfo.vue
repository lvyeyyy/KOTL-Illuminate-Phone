<template>
  <div style="height:100%">
    <!-- <el-row class="fixRow">
      <el-col
        :span="24"
        style="height:100%"
      >
        <el-card
          shadow="always"
          class="topCard"
          style="height:100%"
        >
          <el-col
            :span="11"
            style="height:100%;text-align:left"
          >
            <el-button
              type="text"
              icon="el-icon-arrow-left"
              @click="backList"
            >上一步</el-button>
          </el-col>
          <el-col
            :span="13"
            style="text-align:left"
          >审核</el-col>
        </el-card>
      </el-col>
    </el-row> -->
    <el-row
      class="middleRow"
      style="font-weight:bold"
    >
      <el-col :span="24">（一）委托单位：<span class="noBold">{{ entrustWordInfoForm.WTDWNAME }}</span></el-col>
      <el-col :span="24">（二）送检人：<span class="noBold">{{ entrustWordInfoForm.ONENAME }}、{{ entrustWordInfoForm.TWONAME }}</span></el-col>
      <el-col :span="24">（三）受理日期：<span class="noBold">{{ !!entrustWordInfoForm.SL_DATE ? SL_DATE : '未受理' }}</span></el-col>
      <el-col :span="24">（四）案（事）件情况摘要：</el-col>
      <el-col
        :span="24"
        class="noBold paddStyle"
      >{{ entrustWordInfoForm.AJACCOUNT }}</el-col>
      <el-col :span="24">（五）检材和样本：</el-col>
      <div>
        <el-col
          v-for="(sample, sampleIndex) in entrustWordInfoForm.YBBH"
          :key="sampleIndex"
          :span="24"
          class="noBold paddStyle"
        >
          {{ '(' + (sampleIndex + 1) + '): ' + sample }}
        </el-col>
      </div>
      <el-col :span="24">（六）鉴定要求：</el-col>
      <div>
        <el-col
          v-for="(jdyq, jdyqIndex) in entrustWordInfoForm.JDYQ"
          :key="jdyqIndex"
          :span="24"
          class="noBold paddStyle"
        >
          {{ '(' + (jdyqIndex + 1) + '): ' + jdyq }}
        </el-col>
      </div>
      <el-col :span="24">（七）检验开始日期：<span class="noBold">{{ !!entrustWordInfoForm.SL_DATE ? SL_DATE : '未受理' }}</span></el-col>
      <el-col :span="24">（八）检验地点：<span class="noBold">{{ entrustWordInfoForm.JDDWNAME }}</span></el-col>
    </el-row>
    <!-- <el-row style="position:fixed;bottom:3%;left:1%;width:100%">
      <el-col :span="12">
        <el-button
          style="width:95%"
          type="danger"
          :disabled="failButtonState"
          @click="reviewEntrust($store.getters.PRE_AUDIT_STATUS.FAILED)"
        >不通过预审核
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          style="width:95%"
          type="success"
          :disabled="successButtonState"
          @click="reviewEntrust($store.getters.PRE_AUDIT_STATUS.PASSED)"
        >通过预审核
        </el-button>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// function clientGetToken() {
//   //   return client.getToken()
//   return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiNGY4ZWU2YjktZDllZi00NzcwLTk1OWMtYjdkOGQyNjM3YTdmIiwiaWF0IjoiMjAyMi8xMC8xMiA4OjQ0OjQxIiwibmFtZWlkIjoiNzc2IiwibmJmIjoxNjY1NTM1NDgxLCJleHAiOjE2NjU1MzcyODEsImlzcyI6Imp3dF91c2VyIiwiYXVkIjoiand0X2F1ZGllbmNlIn0.C-vJa4lWaxY5RLm_U1_g4q5LDfkEZKCCo9utgLugLSw'
// }
// function clientGetWtId() {
//   // return client.getWtid()
//   return '3337'
// }
import { getEntrustWordDataByEntrustId } from '@/api/entrust'
import { parseTime } from '@/utils/tool'
export default {
  props: {
    entrustId: { type: String, default: '' }
  },
  data() {
    return {
      tokentest: '',
      // entrustId: '',
      entrustWordInfoForm: {},
      preAuditStatus: undefined,
      acceptStatus: undefined
    }
  },
  computed: {
    SL_DATE() {
      return parseTime(this.entrustWordInfoForm.SL_DATE, '{y}年{m}月{d}日')
    }
    // successButtonState() {
    //   if (this.acceptStatus === this.$store.getters.ACCEPT_STATUS.PASSED) {
    //     return true
    //   } else if (this.preAuditStatus === this.$store.getters.PRE_AUDIT_STATUS.PENDING) {
    //     return false
    //   } else {
    //     return this.preAuditStatus === this.$store.getters.PRE_AUDIT_STATUS.PASSED
    //   }
    // },
    // failButtonState() {
    //   if (this.acceptStatus === this.$store.getters.ACCEPT_STATUS.PASSED) {
    //     return true
    //   } else if (this.preAuditStatus === this.$store.getters.PRE_AUDIT_STATUS.PENDING) {
    //     return false
    //   } else {
    //     return this.preAuditStatus === this.$store.getters.PRE_AUDIT_STATUS.FAILED
    //   }
    // }
  },
  created() {
    // this.tokentest = clientGetToken()
    // var tokentest = this.tokentest
    // this.$store.commit('user/SET_TOKEN2', tokentest)
    // this.entrustId = clientGetWtId()
    // this.entrustId = this.$route.query.entrustId
    // getEntrustInfoByEntrustID(this.entrustId).then(response => {
    //   this.preAuditStatus = response.data[0].preauditstatus
    //   this.acceptStatus = response.data[0].acceptstatus
    // })
    this.getEntrustWordData()
  },
  methods: {
    // 获取信息
    getEntrustWordData() {
      getEntrustWordDataByEntrustId(this.entrustId).then(res => {
        this.entrustWordInfoForm = res.data
      })
    }
    // 点击按钮
    // reviewEntrust(mark) {
    //   const passed = this.$store.getters.PRE_AUDIT_STATUS.PASSED
    //   this.$confirm(mark === passed ? '是否确认通过预审核？' : '是否确认不通过预审核？', '提示', {
    //     confirmButtonText: '确认',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     updateAuditWt(this.entrustId, mark).then(response => {
    //       this.$message.success(mark === passed ? '已通过预审核' : '已不通过预审核')
    //       this.preAuditStatus = mark
    //     })
    //   }).catch(() => {
    //     this.$message.info('已取消')
    //   })
    // },
    // backList() {
    //   this.$router.go(-1)
    // }
  }
}
</script>

<style scoped>
.fixRow {
  position: fixed;
  width: 100%;
  top: 0;
  text-align: center;
  z-index: 99;
}
::v-deep .topCard .el-card__body {
  padding: 10px;
  height: 100%;
}
::v-deep .el-divider--horizontal {
  margin: 10px 0;
}
::v-deep .el-button--text {
  margin-top: -10%;
}
::v-deep .el-row .el-col {
  margin-top: 15px;
}
::v-deep .fixRow .el-col {
  margin-top: 0px;
}
.middleRow {
  padding: 14% 0 10px 0;
  font-size: 15px;
  height: calc(100% - 60px);
  overflow-y: scroll;
}
::v-deep .el-button {
  padding: 9px 20px;
  font-size: 13px;
}
.noBold {
  font-weight: normal;
}
.noBold.paddStyle {
  padding: 0 10px !important;
}
</style>
<style>
.el-message-box {
  width: 90% !important;
}
</style>
