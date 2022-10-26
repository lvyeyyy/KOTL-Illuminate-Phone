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
          <el-steps
            :active="active"
            align-center
          >
            <el-step
              v-for="(item,index) in stepList"
              :key="index"
            >
              <div
                slot="title"
                class="step-text"
                @click="hadleClick(index)"
              >
                {{ item.name }}
              </div>
            </el-step>
          </el-steps>
          <!-- <el-col
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
            :span="active!==0?10:15"
            :style="active!==0?'text-align:center':'text-align:right'"
          >{{ stepList[active].name }}</el-col> -->
          <!-- <el-col
            v-if="active!==stepList.length - 1"
            :span="active!==0?7:9"
            style="height:100%;text-align:right"
          >
            <el-button
              type="text"
              @click="goClick"
            >下一步<i class="el-icon-arrow-right" /></el-button>
          </el-col> -->
        </el-card>
      </el-col>
    </el-row>
    <el-row v-if="active === 0">
      <CaseInfo
        v-if="active === 0"
        :case-id="caseId"
        :entrust-id="entrustId"
      />
      <el-row style="width:45%;margin-left:52%;position: fixed;bottom: 3%;">
        <el-col :span="24">
          <el-button
            style="width:100%"
            type="success"
            @click="goClick"
          >下一步</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row
      v-if="active === 1"
      style="height:100%"
    >
      <WtInfo
        :case-id="caseId"
        :entrust-id="entrustId"
      />
      <el-row style="width:45%;margin-left:52%;position: fixed;bottom: 3%;">
        <el-col :span="24">
          <el-button
            style="width:100%"
            type="success"
            @click="goClick"
          >下一步</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row
      v-if="active === 2"
      style="height:100%"
    >
      <BjdrInfo :entrust-id="entrustId" />
      <el-row style="width:45%;margin-left:52%;position: fixed;bottom: 3%;">
        <el-col :span="24">
          <el-button
            style="width:100%"
            type="success"
            @click="goClick"
          >下一步</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row
      v-if="active === 3"
      style="height:100%"
    >
      <JcInfo :entrust-id="entrustId" />
      <el-row style="width:45%;margin-left:52%;position: fixed;bottom: 3%;">
        <el-col :span="24">
          <el-button
            style="width:100%"
            type="success"
            @click="goClick"
          >下一步</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row
      v-if="active === 4"
      style="height:100%"
    >
      <AuditInfo :entrust-id="entrustId" />
      <PreAuditBtn :entrust-id="entrustId" />
    </el-row>
  </div>
</template>

<script>
function clientGetToken() {
  return client.getToken()
  // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiYjMxZmRjYzAtMjBkMC00YmJkLTkzN2ItMDdhOWM2ZjVmNTVkIiwiaWF0IjoiMjAyMi8xMC8yNSA4OjU3OjM1IiwibmFtZWlkIjoiNzc2IiwibmJmIjoxNjY2NjU5NDU1LCJleHAiOjE2NjY2NjEyNTUsImlzcyI6Imp3dF91c2VyIiwiYXVkIjoiand0X2F1ZGllbmNlIn0.O7FqO2g8dSvSxlrnrwH2K_L3whZyrgybvDBmZr_doqE'
}
function clientGetCaseId() {
  return client.getAjid()
  // return '3295'
}
function clientGetWtId() {
  return client.getWtid()
  // return '3337'
}

// function clientGetOjdzy() {
//   // return client.getJdzy()
//   return '2'
// }

import CaseInfo from '../preAudit/caseInfo.vue'
import WtInfo from '../preAudit/entrustInfo.vue'
import BjdrInfo from '../preAudit/bdjrInfo.vue'
import JcInfo from '../preAudit/jcInfo.vue'
import AuditInfo from '../preAudit/auditInfo.vue'
import PreAuditBtn from '../preAudit/PreAuditBtn.vue'

export default {
  components: { CaseInfo, WtInfo, BjdrInfo, JcInfo, AuditInfo, PreAuditBtn },
  data() {
    return {
      active: 0,
      caseId: '',
      entrustId: '',
      // jdzy: '',
      stepList: [
        { name: '案件信息' },
        { name: '委托信息' },
        { name: '被鉴定人信息' },
        { name: '检材信息' },
        { name: '审核' }
      ]
    }
  },
  created() {
    this.tokentest = clientGetToken()
    var tokentest = this.tokentest
    this.$store.commit('user/SET_TOKEN2', tokentest)
    this.caseId = clientGetCaseId()
    this.entrustId = clientGetWtId()
    // this.jdzy = clientGetOjdzy()
  },
  methods: {
    goClick() {
      if (this.active === this.stepList.length - 1) {
        console.log('最后一项')
      } else {
        this.active++
      }
    },
    // backList() {
    //   if (this.active === 0) {
    //     console.log('第一项')
    //   } else {
    //     this.active--
    //   }
    // },
    hadleClick(index) {
      this.active = index
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
  height: 57px;
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
  padding: 5px 0;
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
::v-deep .el-step__title {
  font-size: 12px;
  line-height: 2.5;
}
::v-deep .el-step__icon.is-text {
  border: 1px solid;
}
::v-deep .el-step__icon {
  width: 20px;
  height: 20px;
  font-size: 12px;
}
</style>
