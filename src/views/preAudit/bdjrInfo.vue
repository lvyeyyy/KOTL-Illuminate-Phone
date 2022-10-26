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
            :span="7"
            style="height:100%;text-align:left"
          >
            <el-button
              type="text"
              icon="el-icon-arrow-left"
              @click="backList"
            >上一步</el-button>
          </el-col>
          <el-col :span="10">确认被鉴定人信息</el-col>
          <el-col
            :span="7"
            style="height:100%;text-align:right"
          >
            <el-button
              type="text"
              @click="goClick"
            >下一步<i class="el-icon-arrow-right" /></el-button>
          </el-col>
        </el-card>
      </el-col>
    </el-row> -->
    <el-row class="middleRow">
      <el-col
        v-for="(item, index) in appraisedPeopleList"
        :key="index"
        class="infoClass"
        :span="24"
      >
        <el-card
          style="position:relative"
          @click.native="clikCard(item)"
        >
          <el-row style="font-size:12px;position:absolute;top:10%;left:3%">
            {{ '被鉴定人' + (index + 1) + '/' + appraisedPeopleList.length }}
          </el-row>
          <el-row style="text-align:center">
            <el-col :span="24">{{ item.name }} </el-col>
            <el-col
              :span="24"
              style="font-size:15px;color: #9c9898;margin-top:5px"
            >{{ item.sex==='1'?'男':item.sex==='2'?'女':'未知' }}</el-col>
            <el-col
              :span="24"
              style="font-size:15px;color: #9c9898;margin-top:5px"
            >{{ item.sfcode }}</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="btnRow">
      <el-col
        :span="24"
        style="text-align:center"
      >
        <el-button
          type="primary"
          style="width:95%;"
          @click="addBjdr"
        >添加
        </el-button>
      </el-col>
    </el-row>
    <el-dialog
      v-if="BjdrDialog"
      title="操作被鉴定人信息"
      :visible.sync="BjdrDialog"
      width="94%"
      append-to-body
      destroy-on-close
      class="bjdrClass"
      :lock-scroll="false"
    >
      <BjdrInfo
        :entrustid="entrustId"
        :bjdrid="BjdrId"
        :update-success-call-back="updateSuccessCallBack"
        :cancel-delete-call-back="cancelDeleteCallBack"
      />
    </el-dialog>
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
import BjdrInfo from '@/components/PreAuditInfo/BjdrInfo'
import { getAppraisedPeopleListByEntrustID } from '@/api/entrust'
export default {
  components: { BjdrInfo },
  props: {
    entrustId: { type: String, default: '' }
  },
  data() {
    return {
      // entrustId: '',
      appraisedPeopleList: [],
      BjdrDialog: false,
      BjdrId: ''
    }
  },
  created() {
    // this.tokentest = clientGetToken()
    // var tokentest = this.tokentest
    // this.$store.commit('user/SET_TOKEN2', tokentest)
    // this.entrustId = this.$route.query.entrustId
    // this.entrustId = '3337'
    this.getAppraisedPeopleList()
  },
  methods: {
    // 获取全部的被鉴定人
    getAppraisedPeopleList() {
      getAppraisedPeopleListByEntrustID(this.entrustId).then(response => {
        this.appraisedPeopleList = response.data
      })
    },
    // 点击card
    clikCard(item) {
      this.BjdrDialog = true
      this.BjdrId = item.bjdrid
    },
    updateSuccessCallBack() {
      this.BjdrDialog = false
      this.getAppraisedPeopleList()
    },
    addBjdr() {
      this.BjdrId = ''
      this.BjdrDialog = true
    },
    cancelDeleteCallBack() {
      this.BjdrDialog = false
    }
    // backList() {
    //   this.$router.go(-1)
    // },
    // goClick() {
    //   this.$router.push({ path: '/preaudit/jcinfo', query: { entrustId: this.$route.query.entrustId } })
    // }
  }
}
</script>

<style scoped>
::v-deep .topCard .el-card__body {
  padding: 10px;
  height: 100%;
}
::v-deep .el-button--text {
  margin-top: -10%;
}
.fixRow {
  position: fixed;
  width: 100%;
  top: 0;
  text-align: center;
  z-index: 99;
}
.middleRow {
  height: calc(100% - 60px);
  overflow-y: scroll;
  padding: 18% 15px 5px 15px;
}
::v-deep .el-dialog {
  margin-top: 8vh !important;
}
::v-deep .el-dialog__title {
  font-size: 16px;
}
::v-deep .el-dialog__header,
::v-deep .el-dialog__body {
  padding: 10px 20px;
}
.infoClass {
  margin-top: 5px;
  padding: 0 10px;
}
.infoClass:nth-of-type(1) {
  margin-top: 0;
}
.btnRow {
  position: fixed;
  bottom: 3%;
  width: 50% !important;
}
::v-deep .el-divider--horizontal {
  margin: 10px 0;
}
/* .my-form {
  margin-top: 11%;
  height: calc(100% - 120px);
  overflow-y: scroll;
} */
::v-deep .el-dialog__headerbtn {
  top: 1%;
  font-size: 23px;
}
::v-deep .el-button {
  padding: 9px 20px;
  font-size: 13px;
}
</style>
<style>
.bjdrClass > .el-dialog .el-dialog__body {
  padding: 0 20px 10px 20px;
}
</style>
