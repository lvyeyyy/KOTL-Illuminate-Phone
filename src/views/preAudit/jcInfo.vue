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
          <el-col :span="10">确认检材信息</el-col>
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
        v-for="(item, index) in sampleList"
        :key="index"
        class="infoClass"
        :span="24"
      >
        <el-card
          style="position:relative"
          @click.native="clikCard(item)"
        >
          <el-row style="font-size:12px;position:absolute;top:10%;left:3%">
            {{ '检材' + (index + 1) + '/' + sampleList.length }}
          </el-row>
          <el-row>
            <el-col
              :span="24"
              style="font-size:18px;text-align:center;"
            >{{ item.name }}</el-col>
            <el-col
              :span="24"
              style="font-size: 13px;text-align:center;color: #9c9898;margin-top:5px"
            >{{ `${yblxText(item.yblx)} ${item.tq_number} ${item.quantity_unit}` }}</el-col>
            <el-col
              :span="24"
              style="font-size:14px;text-align:center;color: #9c9898;margin-top:5px"
            >{{ item.ajbh }}</el-col>
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
          style="width:95%"
          @click="addJc"
        >添加
        </el-button>
      </el-col>
    </el-row>
    <el-dialog
      v-if="JcDialog"
      title="操作检材信息"
      :visible.sync="JcDialog"
      width="94%"
      append-to-body
      destroy-on-close
      class="bjdrClass"
      :lock-scroll="false"
    >
      <JcInfo
        :entrust-id="entrustId"
        :sample-id="JcybId"
        :update-success-call-back="updateSuccessCallBack"
        :cancel-delete-call-back="cancelDeleteCallBack"
      />
      <!-- <JcInfo /> -->
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
import { getSampleListByEntrustID } from '@/api/entrust'
import { getAllSampleTypeSelectOption } from '@/api/selectOption'
import JcInfo from '@/components/PreAuditInfo/JcInfo'
export default {
  components: { JcInfo },
  props: {
    entrustId: { type: String, default: '' }
  },
  data() {
    return {
      // entrustId: '',
      sampleList: [],
      sampleTypeOption: [],
      JcDialog: false,
      JcybId: ''
    }
  },
  created() {
    // this.tokentest = clientGetToken()
    // var tokentest = this.tokentest
    // this.$store.commit('user/SET_TOKEN2', tokentest)
    // this.entrustId = this.$route.query.entrustId
    // this.entrustId = '3337'
    this.getSampleList(() => {
      this.getAllSampleTypeList()
    })
  },
  methods: {
    // 获取全部的检材
    getSampleList(callBack) {
      getSampleListByEntrustID(this.entrustId).then(response => {
        this.sampleList = response.data
        callBack()
      })
    },
    // 获取检材类别下拉列表
    getAllSampleTypeList() {
      getAllSampleTypeSelectOption(this.sampleList[0].jdzy).then(response => {
        this.sampleTypeOption = response.data
      })
    },
    yblxText(yblx) {
      if (this.sampleTypeOption.find(memo => memo.lbid === yblx)) {
        return this.sampleTypeOption.find(memo => memo.lbid === yblx).lbmc
      } else {
        return ''
      }
    },
    // 点击card
    clikCard(item) {
      this.JcDialog = true
      this.JcybId = item.jcybid
    },
    addJc() {
      this.JcybId = ''
      this.JcDialog = true
    },
    updateSuccessCallBack() {
      this.JcDialog = false
      this.getSampleList()
    },
    cancelDeleteCallBack() {
      this.JcDialog = false
    }
    // backList() {
    //   this.$router.go(-1)
    // },
    // goClick() {
    //   this.$router.push({ path: '/preaudit/auditinfo', query: { entrustId: this.$route.query.entrustId } })
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
::v-deep .el-button--text {
  margin-top: -10%;
}
::v-deep .el-divider--horizontal {
  margin: 10px 0;
}
::v-deep .topCard .el-card__body {
  padding: 10px;
}
.middleRow {
  padding: 18% 15px 5px 15px;
  height: calc(100% - 60px);
  overflow-y: scroll;
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
