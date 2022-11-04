<template>
  <div style="height:100%">
    <el-row class="fixRow">
      <el-col
        :span="24"
        style="height:100%"
      >
        <el-card
          shadow="always"
          class="my-card"
          style="height:100%;text-align:left"
        >
          <el-col
            v-if="active!==0"
            :span="7"
            style="height:100%;text-align:left"
          >
            <el-button
              type="text"
              icon="el-icon-arrow-left"
              @click="backList"
            >上一步</el-button>
          </el-col>
          <el-col
            :span="active!==0?10:14"
            :style="active!==0?'text-align:center':'text-align:right'"
          >{{ stepList[active].name }}</el-col>
          <el-col
            :span="active!==0?7:10"
            style="height:100%;text-align:right"
          >
            <el-button
              type="text"
              @click="goClick"
            >下一步<i class="el-icon-arrow-right" /></el-button>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="active === 0">
      <CaseInfo
        v-if="active === 0"
        :case-id="caseId"
        :entrust-id="entrustId"
      />
    </el-row>
    <el-row
      v-if="active === 1"
      style="height:100%"
    >
      <WtInfo
        :case-id="caseId"
        :entrust-id="entrustId"
      />
    </el-row>
    <el-row
      v-if="active === 2"
      style="height:100%"
    >
      <BjdrInfo :entrust-id="entrustId" />
    </el-row>
    <el-row
      v-if="active === 3"
      style="height:100%"
    >
      <JcInfo :entrust-id="entrustId" />
    </el-row>
    <el-row
      v-if="active === 4"
      style="height:100%"
    >
      <AuditInfo :entrust-id="entrustId" />
      <EntrustBtn />
    </el-row>
  </div>
</template>

<script>
function clientGetToken() {
  return client.getToken()
  // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsdnllIiwianRpIjoiMWJiNWUxYTAtYjNmNC00YTkxLWE3NDQtZTgwMjI5MmI4ZGY0IiwiaWF0IjoiMjAyMi8xMC8yNiAxMTo0NDo0MiIsIm5hbWVpZCI6IjczOCIsIm5iZiI6MTY2Njc1NTg4MiwiZXhwIjoxNjY2NzU3NjgyLCJpc3MiOiJqd3RfdXNlciIsImF1ZCI6Imp3dF9hdWRpZW5jZSJ9.XZKayBYxU24URTTGZ3dFyiw6HlQSSsZGfZoKFh_AbMU'
}
function clientGetCaseId() {
  return client.getAjid()
  // return '3295'
}
function clientGetWtId() {
  return client.getWtid()
  // return '3337'
}
import CaseInfo from '../entrust/caseInfo.vue'
import WtInfo from '../preAudit/entrustInfo.vue'
import BjdrInfo from '../preAudit/bdjrInfo.vue'
import JcInfo from '../preAudit/jcInfo.vue'
import AuditInfo from '../preAudit/auditInfo.vue'
import EntrustBtn from '../entrust/EntrustBtn.vue'

export default {
  components: { CaseInfo, WtInfo, BjdrInfo, JcInfo, AuditInfo, EntrustBtn },
  data() {
    return {
      active: 0,
      caseId: '',
      entrustId: '',
      stepList: [
        { name: '案件信息' },
        { name: '填写委托信息' },
        { name: '添加被鉴定人' },
        { name: '添加检材样本' },
        { name: '提交预审核' }
      ]
    }
  },
  created() {
    this.tokentest = clientGetToken()
    var tokentest = this.tokentest
    this.$store.commit('user/SET_TOKEN2', tokentest)
    this.caseId = clientGetCaseId()
    this.entrustId = clientGetWtId()
  },
  methods: {
    goClick() {
      if (this.active === this.stepList.length - 1) {
        console.log('最后一项')
      } else {
        this.active++
      }
    },
    backList() {
      if (this.active === 0) {
        console.log('第一项')
      } else {
        this.active--
      }
    }
  }
}
</script>

<style scoped>
::v-deep .el-form-item {
  margin-bottom: 0;
}
::v-deep .el-input__inner {
  font-size: 13px;
  height: 33px;
  line-height: 33px;
}
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-input {
  width: 100%;
}
::v-deep .el-card__body {
  padding: 10px;
}
.fixRow {
  position: fixed;
  width: 100%;
  top: 0;
  text-align: center;
  z-index: 99;
}
::v-deep .el-row {
  width: 100%;
}
::v-deep .el-divider--horizontal {
  margin: 10px 0;
}
::v-deep .my-card .el-card__body {
  height: 100%;
}
::v-deep .el-button--text {
  margin-top: -10%;
}
::v-deep .el-col {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
::v-deep .el-button {
  padding: 9px 20px;
  font-size: 13px;
}
</style>
