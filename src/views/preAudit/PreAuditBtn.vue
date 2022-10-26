<template>
  <div>
    <el-row style="position:fixed;bottom:3%;left:1%;width:100%">
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
    </el-row>
  </div>
</template>

<script>
import { updateAuditWt, getEntrustInfoByEntrustID } from '@/api/entrust'
export default {
  props: {
    entrustId: { type: String, default: '' }
  },
  data() {
    return {
      preAuditStatus: undefined,
      acceptStatus: undefined
    }
  },
  computed: {
    successButtonState() {
      if (this.acceptStatus === this.$store.getters.ACCEPT_STATUS.PASSED) {
        return true
      } else if (this.preAuditStatus === this.$store.getters.PRE_AUDIT_STATUS.PENDING) {
        return false
      } else {
        return this.preAuditStatus === this.$store.getters.PRE_AUDIT_STATUS.PASSED
      }
    },
    failButtonState() {
      if (this.acceptStatus === this.$store.getters.ACCEPT_STATUS.PASSED) {
        return true
      } else if (this.preAuditStatus === this.$store.getters.PRE_AUDIT_STATUS.PENDING) {
        return false
      } else {
        return this.preAuditStatus === this.$store.getters.PRE_AUDIT_STATUS.FAILED
      }
    }
  },
  created() {
    getEntrustInfoByEntrustID(this.entrustId).then(response => {
      this.preAuditStatus = response.data[0].preauditstatus
      this.acceptStatus = response.data[0].acceptstatus
    })
  },
  methods: {
    // 点击按钮
    reviewEntrust(mark) {
      const passed = this.$store.getters.PRE_AUDIT_STATUS.PASSED
      this.$confirm(mark === passed ? '是否确认通过预审核？' : '是否确认不通过预审核？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateAuditWt(this.entrustId, mark).then(response => {
          this.$message.success(mark === passed ? '已通过预审核' : '已不通过预审核')
          this.preAuditStatus = mark
        })
      }).catch(() => {
        this.$message.info('已取消')
      })
    }
  }
}
</script>

<style>
</style>
