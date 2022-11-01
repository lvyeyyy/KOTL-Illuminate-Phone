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
            label="修改情况人"
            prop="xgqK_OPERDM"
          >
            <UserSelect
              v-model="finishForm.xgqK_OPERDM"
              :value="finishForm.xgqK_OPERDM"
              user-label="修改情况人"
              clearable
              filterable
              :option-list="optionList.entrustPeopleOption"
              @on-value-change="val => finishForm.xgqK_OPERDM = val"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="修改情况时间"
            prop="xgqK_DATE"
          >
            <el-date-picker
              v-model="finishForm.xgqK_DATE"
              :value="finishForm.xgqK_DATE"
              type="date"
              style="width:100%;"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="修改情况"
            prop="xgqk"
          >
            <el-input
              v-model="finishForm.xgqk"
              type="textarea"
              :rows="4"
              :value="finishForm.xgqk"
              clearable
              placeholder="请输入修改情况"
            />
          </el-form-item>
        </el-col>
        <el-col
          v-if="row.status!=='4'"
          style="margin-top:8px"
        >
          <el-row>
            <el-col :span="9">
              <el-button
                type="primary"
                plain
                icon="el-icon-edit"
                size="mini"
                @click="dialogSignatureVisible=true"
              >审核签名
              </el-button>
            </el-col>
            <el-col
              :span="6"
              style="margin-top:-10px"
            >
              <el-image :src="finishForm.xgqK_QZ_url">
                <div
                  slot="error"
                  class="image-slot"
                  style="display: flex;justify-content: center;align-items: center;margin-top:15px;font-size:13px"
                >
                  未签名
                </div>
              </el-image>
            </el-col>
            <el-col :span="9">
              <el-button
                type="primary"
                size="mini"
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
      width="100%"
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
    finishEditSuccessCallBack: {
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
        // 委托id
        wtid: this.row.wtid,
        // 修改情况
        xgqk: undefined,
        // 修改情况人
        xgqK_OPERDM: this.operdm,
        // 修改情况时间
        xgqK_DATE: new Date(),
        // 修改情况_签字
        xgqK_QZ: undefined,
        // 修改情况_签字
        xgqK_QZ_url: undefined,
        status: '4',
        id: this.row.id
      },
      optionList: {
        entrustPeopleOption: []
      },
      rules: {
        xgqK_DATE: [{ required: true, message: '请选择修改情况时间', trigger: 'change' }],
        xgqK_OPERDM: [{ required: true, message: '请选择修改情况人', trigger: 'change' }],
        xgqk: [{ required: true, message: '请输入修改情况', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getEntrustPeopleList()
    if (this.row.status === '4') {
      this.finishForm.xgqk = this.row.xgqk
      this.finishForm.xgqK_OPERDM = this.row.xgqk_operdm
      this.finishForm.xgqK_DATE = this.row.xgqk_date
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
      this.finishForm.xgqK_QZ_url = this.signpicture
      this.finishForm.xgqK_QZ = this.signpictureid
    },
    uploadSignatureImage(blob) {
      const formData = new FormData()
      formData.append('file', blob)
      uploadImage(formData).then(response => {
        this.dialogSignatureVisible = false
        this.finishForm.xgqK_QZ_url = response.data.url
        this.finishForm.xgqK_QZ = response.data.img_id
      })
    },
    submit: function () {
      if (this.finishForm.xgqK_QZ_url && this.finishForm.xgqK_QZ) {
        this.$refs['finishForm'].validate((valid) => {
          if (valid) {
            this.$confirm('是否完成修改鉴定文书申请?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {
              update_modifyword(this.finishForm).then(response => {
                this.$message.success('提交成功')
                this.finishEditSuccessCallBack()
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
::v-deep .el-form-item--mini.el-form-item {
  margin-bottom: 3px;
}
::v-deep .el-dialog__body {
  padding: 0 10px 15px 10px;
}
::v-deep .el-dialog__title {
  font-size: 16px;
}
::v-deep .el-dialog__header {
  padding: 10px 20px 10px;
}
::v-deep .el-dialog__headerbtn {
  top: 2%;
  font-size: 23px;
}
</style>
