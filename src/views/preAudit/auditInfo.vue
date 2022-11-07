<template>
  <div style="height:100%">
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
  </div>
</template>

<script>
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
  },
  created() {
    this.getEntrustWordData()
  },
  methods: {
    // 获取信息
    getEntrustWordData() {
      getEntrustWordDataByEntrustId(this.entrustId).then(res => {
        this.entrustWordInfoForm = res.data
      })
    }
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
::v-deep .el-row .el-col {
  margin-top: 15px;
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
