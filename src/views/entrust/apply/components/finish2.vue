<template>
  <div class="container">
    <el-form
      ref="finishForm"
      :model="finishForm"
      :rules="rules"
      :label-position="labelPosition"
      label-width="102px"
      size="mini"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="经办人"
            prop="jbr"
          >
            <UserSelect
              v-model="finishForm.jbr"
              :value="finishForm.jbr"
              user-label="补发情况人"
              clearable
              filterable
              :option-list="optionList.entrustPeopleOption"
              @on-value-change="val => finishForm.jbr = val"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="补发时间"
            prop="bF_DATE"
          >
            <el-date-picker
              v-model="finishForm.bF_DATE"
              :value="finishForm.bF_DATE"
              type="date"
              style="width:100%;"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="补发情况人"
            prop="bfqK_OPERDM"
          >
            <UserSelect
              v-model="finishForm.bfqK_OPERDM"
              :value="finishForm.bfqK_OPERDM"
              user-label="补发情况人"
              clearable
              filterable
              :option-list="optionList.entrustPeopleOption"
              @on-value-change="val => finishForm.bfqK_OPERDM = val"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="补发情况时间"
            prop="bfqK_DATE"
          >
            <el-date-picker
              v-model="finishForm.bfqK_DATE"
              style="width:100%;"
              :value="finishForm.bfqK_DATE"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="补发情况"
            prop="bfqk"
          >
            <el-input
              v-model="finishForm.bfqk"
              type="textarea"
              :rows="3"
              :value="finishForm.bfqk"
              clearable
              placeholder="请输入补发情况"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="row.status!=='4'">
          <el-row>
            <el-col
              :span="4"
              :offset="10"
            >
              <el-button
                type="primary"
                plain
                icon="el-icon-edit"
                @click="dialogSignatureVisible=true"
              >审核签名
              </el-button>
            </el-col>
            <el-col :span="4">
              <el-image :src="finishForm.bfqK_QZ_url">
                <div
                  slot="error"
                  class="image-slot"
                  style="display: flex;justify-content: center;align-items: center;margin-top:10px;"
                >
                  未签名
                </div>
              </el-image>
            </el-col>
            <el-col :span="6">
              <el-button
                type="primary"
                style="width:100%;"
                @click="submit"
              >提交</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col
          :span="6"
          :offset="18"
        >
          <el-button
            type="primary"
            style="width:100%;"
          >提交</el-button>
        </el-col>
      </el-row> -->
    </el-form>
    <el-dialog
      title="签名"
      :visible.sync="dialogSignatureVisible"
      width="644px"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
      @opened="isShowEntrustSignature=true"
      @close="isShowEntrustSignature=false"
    >
      <Signature
        v-if="dialogSignatureVisible"
        :jdzy-id="row.jdzy"
        :signpicture="signpicture"
        @on-save="uploadSignatureImage"
        @on-picture="uploadPicture()"
      />
    </el-dialog>
  </div>
</template>

<script>
import { update_modifyword } from '@/api/word'
import { getPeopleListByGroupIdList } from '@/api/selectOption'
import { formatGroupUserList } from '@/utils/tool'
import UserSelect from '@/components/UserSelect/index.vue'
import { uploadImage } from '@/api/entrust'
import Signature from '@/components/Signature/PhoneIndex.vue'

export default {
  components: { UserSelect, Signature },
  props: {
    row: { type: Object, required: true },
    operdm: { type: String, require: true, default: '' },
    signpicture: { type: String, default: '' },
    signpictureid: { type: String, default: '' },
    finishReissueSuccessCallBack: {
      type: Function, default: function (response) {
      }
    }
  },
  data: function () {
    return {
      dialogSignatureVisible: false,
      isShowEntrustSignature: false,
      // 表单标签位置
      labelPosition: 'right',
      finishForm: {
        // 经办人
        jbr: this.operdm,
        // 补发日期
        bF_DATE: new Date(),
        // 补发情况
        bfqk: undefined,
        // 补发情况人
        bfqK_OPERDM: this.operdm,
        // 补发情况时间
        bfqK_DATE: new Date(),
        // 补发情况_签字
        bfqK_QZ: undefined,
        // 补发情况_签字
        bfqK_QZ_url: undefined,
        status: '4',
        id: this.row.id
      },
      optionList: {
        entrustPeopleOption: []
      },
      rules: {
        jbr: [{ required: true, message: '请选择经办人', trigger: 'change' }],
        bF_DATE: [{ required: true, message: '请选择补发时间', trigger: 'change' }],
        bfqK_DATE: [{ required: true, message: '请选择补发情况时间', trigger: 'change' }],
        bfqK_OPERDM: [{ required: true, message: '请选择补发情况人', trigger: 'change' }],
        bfqk: [{ required: true, message: '请输入补发情况', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getEntrustPeopleList()
    if (this.row.status === '4') {
      this.finishForm.bfqk = this.row.bfqk
      this.finishForm.bfqK_OPERDM = this.row.bfqk_operdm
      this.finishForm.bfqK_DATE = this.row.bfqk_date
    }
  },
  methods: {
    // 获取委托人员下拉列表
    getEntrustPeopleList: function () {
      // 4 代表委托人
      getPeopleListByGroupIdList([this.$store.getters.ROLES_TYPE.ENTRUST_PERSON]).then(response => {
        this.optionList.entrustPeopleOption = formatGroupUserList(response.data)
      })
    },
    uploadPicture: function () {
      this.dialogSignatureVisible = false
      this.finishForm.bfqK_QZ_url = this.signpicture
      this.finishForm.bfqK_QZ = this.signpictureid
    },
    uploadSignatureImage(blob) {
      const formData = new FormData()
      formData.append('file', blob)
      uploadImage(formData).then(response => {
        this.dialogSignatureVisible = false
        this.finishForm.bfqK_QZ_url = response.data.url
        this.finishForm.bfqK_QZ = response.data.img_id
      })
    },
    submit: function () {
      if (this.finishForm.bfqK_QZ_url && this.finishForm.bfqK_QZ) {
        this.$refs['finishForm'].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交补发鉴定文书申请?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {
              update_modifyword(this.finishForm).then(response => {
                this.$message.success('提交成功')
                this.finishReissueSuccessCallBack()
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          } else {
            this.$message.info('请填写完整！')
          }
        })
      } else {
        this.$message.info('请签字！')
      }
    }
  }
}
</script>

<style scoped
       lang="scss">
/* ::v-deep .el-input__prefix {
  display: none !important;
} */
::v-deep .el-form-item--mini.el-form-item {
  margin-bottom: 3px;
}
</style>

