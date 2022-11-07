<template>
  <div>
    <el-row style="margin-top:50px;padding-left:30px">
      <el-row class="rowStyle">
        <el-col
          :span="8"
          class="keyStyle"
        >案件编号</el-col>
        <el-col
          :span="16"
          class="valueStyle"
        >{{ caseForm.AJBH }}</el-col>
      </el-row>
      <el-row class="rowStyle">
        <el-col
          :span="8"
          class="keyStyle"
        >案件名称</el-col>
        <el-col
          :span="16"
          class="valueStyle"
        >{{ caseForm.AJNAME }}</el-col>
      </el-row>
      <el-row class="rowStyle">
        <el-col
          :span="8"
          class="keyStyle"
        >打防管控编号</el-col>
        <el-col
          :span="16"
          class="valueStyle"
        >{{ caseForm.DFGKBH }}</el-col>
      </el-row>
      <el-row class="rowStyle">
        <el-col
          :span="8"
          class="keyStyle"
        >现场勘验号</el-col>
        <el-col
          :span="16"
          class="valueStyle"
        >{{ caseForm.kindID }}</el-col>
      </el-row>
      <el-row class="rowStyle">
        <el-col
          :span="8"
          class="keyStyle"
        >案件类型</el-col>
        <el-col
          :span="16"
          class="valueStyle"
        >{{ caseForm.AJLX }}</el-col>
      </el-row>
      <el-row class="rowStyle">
        <el-col
          :span="8"
          class="keyStyle"
        >案件性质</el-col>
        <el-col
          :span="16"
          class="valueStyle"
        >{{ caseForm.AJXZ }}</el-col>
      </el-row>
      <el-row class="rowStyle">
        <el-col
          :span="8"
          class="keyStyle"
        >案发日期</el-col>
        <el-col
          :span="16"
          class="valueStyle"
        >{{ caseForm.CASE_DATE }}</el-col>
      </el-row>
      <el-row class="rowStyle">
        <el-col
          :span="8"
          class="keyStyle"
        >案发地址</el-col>
        <el-col
          :span="16"
          class="valueStyle"
        >{{ caseForm.ADDRESS }}</el-col>
      </el-row>
      <el-row class="rowStyle">
        <el-col
          :span="8"
          class="keyStyle"
        >简要案情</el-col>
        <el-col
          :span="16"
          class="valueStyle"
        >{{ caseForm.AJACCOUNT }}</el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { getCaseInfoByCaseID } from '@/api/case'

export default {
  props: {
    caseId: { type: String, default: '' },
    entrustId: { type: String, default: '' }
  },
  data() {
    return {
      // caseId: '',
      // entrustId: '',
      caseForm: {
        // 案件ID
        AJID: '',
        // 案件编号
        AJBH: '',
        // 案件名称
        AJNAME: '',
        // 打防管控编号
        DFGKBH: '',
        // 现场勘验编号
        kindID: '',
        // 案件类型
        AJLX: '',
        // 案件性质
        AJXZ: '',
        // 案发日期
        CASE_DATE: new Date(),
        // 案发地址
        ADDRESS: '',
        // 简要案情
        AJACCOUNT: ''
      },
      keyList: ['案件编号', '案件名称', '打防管控编号', '现场勘验号', '案件类型', '案件性质', '案发日期', '录入日期', '案发地址', '简要案情']
    }
  },
  created() {
    this.getCaseInfo()
  },
  methods: {
    getCaseInfo() {
      getCaseInfoByCaseID(this.caseId).then(response => {
        this.caseForm.AJID = this.caseId
        this.caseForm.AJBH = response.data[0].ajbh
        this.caseForm.AJNAME = response.data[0].ajname
        this.caseForm.DFGKBH = response.data[0].dfgkbh
        this.caseForm.kindID = response.data[0].kindid
        this.caseForm.AJLX = response.data[0].ajlx
        this.caseForm.AJXZ = response.data[0].ajxz
        this.caseForm.CASE_DATE = response.data[0].case_date
        this.caseForm.AJACCOUNT = response.data[0].ajaccount
        this.caseForm.ADDRESS = response.data[0].address
      })
    },
    goClcik() {
      this.$router.push({ path: '/preaudit/wtinfo', query: { caseId: this.caseId, entrustId: this.entrustId } })
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
::v-deep .el-row {
  width: 100%;
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
.rowStyle {
  border-bottom: 1px solid #ebe6e6;
  padding: 13px 0;
}
.keyStyle {
  font-size: 13px;
  color: #9c9898;
}
.valueStyle {
  font-size: 14px;
  color: #6e6c6c;
}
</style>
