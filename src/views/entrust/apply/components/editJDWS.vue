<template>
  <div class="container">
    <el-form
      ref="editJDWSForm"
      :model="editJDWSForm"
      :rules="editJDWSRules"
      label-width="78px"
      size="mini"
    >
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
        >
          <el-form-item
            label="文书编号"
            prop="posT_XH"
          >
            <el-input
              v-model="editJDWSForm.posT_XH"
              :value="editJDWSForm.posT_XH"
              clearable
              placeholder="请输入修改鉴定文书编号"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
        >
          <el-form-item
            label="申请人员"
            prop="sqr_name"
          >
            <el-input
              v-model="editJDWSForm.sqr_name"
              :value="editJDWSForm.sqr_name"
              clearable
              disabled
              placeholder="请输入申请人"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="8"
          :xl="8"
        >
          <el-form-item
            label="申请时间"
            prop="sQ_DATE"
          >
            <el-date-picker
              v-model="editJDWSForm.sQ_DATE"
              disabled
              style="width:100%;"
              :value="editJDWSForm.sQ_DATE"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="详细内容"
            prop="xgnr"
          >
            <el-input
              v-model="editJDWSForm.xgnr"
              type="textarea"
              :rows="3"
              :value="editJDWSForm.xgnr"
              clearable
              placeholder="请输入修改详细内容"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="修改理由"
            prop="xgly"
          >
            <el-input
              v-model="editJDWSForm.xgly"
              type="textarea"
              :rows="3"
              :value="editJDWSForm.xgly"
              clearable
              placeholder="请输入修改理由"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="parseInt(row.status)<0 ">
        <span
          v-if="row.status==='-1'"
          style="color:red;font-size:12px"
        >委托方领导不予通过，不通过意见：{{ row.sqbmyj }}</span>
        <span
          v-if="row.status==='-2'"
          style="color:red;font-size:12px"
        >室负责人不予通过，不通过意见：{{ row.szryj }}</span>
        <span
          v-if="row.status==='-3'"
          style="color:red;font-size:12px"
        >中心领导不予通过，不通过意见：{{ row.zxldyj }}</span>
      </el-row>
      <el-row v-if="(row.status==='0' && !isExamine) || row.status==='已发文'">
        <el-col
          :span="24"
          style="text-align:center;"
        >
          <el-button
            type="primary"
            size="mini"
            style="width:66%;margin-top:5px"
            @click="submitApply"
          >{{ isEdit?'修改':'提交申请' }}</el-button>
        </el-col>
      </el-row>
      <el-row
        v-if="(isExamine && step==='0' && iswt) || (isExamine && iswt)"
        :gutter="20"
      >
        <el-divider />
        <el-col :span="24">
          <el-form-item
            label="申请部门意见"
            label-width="92px"
          >
            <el-input
              v-model="editJDWSForm.sqbmyj"
              type="textarea"
              :rows="3"
              :value="editJDWSForm.sqbmyj"
              clearable
              placeholder="请输入申请部门意见"
            />
          </el-form-item>
        </el-col>
        <el-row>
          <el-col
            :span="9"
            style="margin-top:8px"
          >
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              size="mini"
              style="margin-left:5%"
              @click="dialogSignatureVisible=true"
            >审核签名
            </el-button>
          </el-col>
          <el-col
            :span="5"
            style="margin-left:5%"
          >
            <el-image :src="editJDWSForm.sqbmyJ_QZ_url">
              <div
                slot="error"
                class="image-slot"
                style="display: flex;justify-content: center;align-items: center;margin-top:15px;font-size:13px"
              >
                未签名
              </div>
            </el-image>
          </el-col>
        </el-row>
        <el-row style="margin-top:8px;display:flex;justify-content: space-between;">
          <el-col
            v-if="row.status==='0' || !iswt"
            :span="11"
          >
            <el-button
              type="danger"
              size="mini"
              @click="NoAdopt"
            >
              不通过
            </el-button>
          </el-col>
          <el-col
            v-if="row.status==='0' || !iswt"
            :span="11"
          >
            <el-button
              type="success"
              size="mini"
              @click="adopt"
            >
              通过
            </el-button>
          </el-col>
        </el-row>
      </el-row>
      <el-row
        v-if="isExamine && step==='1' && !iswt"
        :gutter="20"
      >
        <el-divider />
        <el-col :span="24">
          <el-form-item
            label="室主任意见"
            label-width="82px"
          >
            <el-input
              v-model="editJDWSForm.szryj"
              type="textarea"
              :rows="3"
              :value="editJDWSForm.szryj"
              clearable
              placeholder="请输入室主任意见"
            />
          </el-form-item>
        </el-col>
        <el-row>
          <el-col
            :span="9"
            style="margin-top:8px"
          >
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              size="mini"
              style="margin-left:5%"
              @click="dialogSignatureVisible=true"
            >审核签名
            </el-button>
          </el-col>
          <el-col
            :span="5"
            style="margin-left:5%"
          >
            <el-image :src="editJDWSForm.szryJ_QZ_url">
              <div
                slot="error"
                class="image-slot"
                style="display: flex;justify-content: center;align-items: center;margin-top:15px;font-size:13px"
              >
                未签名
              </div>
            </el-image>
          </el-col>
        </el-row>
        <el-row style="margin-top:8px;display:flex;justify-content: space-between;">
          <el-col
            v-if="row.status==='0' || !iswt"
            :span="11"
          >
            <el-button
              type="danger"
              size="mini"
              @click="NoAdopt"
            >
              不通过
            </el-button>
          </el-col>
          <el-col
            v-if="row.status==='0' || !iswt"
            :span="11"
          >
            <el-button
              type="success"
              size="mini"
              @click="adopt"
            >
              通过
            </el-button>
          </el-col>
        </el-row>
      </el-row>
      <el-row
        v-if="isExamine && step==='2' && !iswt"
        :gutter="20"
      >
        <el-divider />
        <el-col :span="24">
          <el-form-item
            label="中心领导意见"
            label-width="96px"
          >
            <el-input
              v-model="editJDWSForm.zxldyj"
              type="textarea"
              :rows="3"
              :value="editJDWSForm.zxldyj"
              clearable
              placeholder="请输入中心领导意见"
            />
          </el-form-item>
        </el-col>
        <el-row>
          <el-col
            :span="9"
            style="margin-top:8px"
          >
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
              size="mini"
              style="margin-left:5%"
              @click="dialogSignatureVisible=true"
            >审核签名
            </el-button>
          </el-col>
          <el-col
            :span="5"
            style="margin-left:5%"
          >
            <el-image :src="editJDWSForm.zxldyJ_QZ_url">
              <div
                slot="error"
                class="image-slot"
                style="display: flex;justify-content: center;align-items: center;margin-top:15px;font-size:13px"
              >
                未签名
              </div>
            </el-image>
          </el-col>
        </el-row>
        <el-row style="margin-top:8px;display:flex;justify-content: space-between;">
          <el-col
            v-if="row.status==='0' || !iswt"
            :span="11"
          >
            <el-button
              type="danger"
              size="mini"
              @click="NoAdopt"
            >
              不通过
            </el-button>
          </el-col>
          <el-col
            v-if="row.status==='0' || !iswt"
            :span="11"
          >
            <el-button
              type="success"
              size="mini"
              @click="adopt"
            >
              通过
            </el-button>
          </el-col>
        </el-row>
      </el-row>
    </el-form>
    <el-dialog
      title="签名"
      :visible.sync="dialogSignatureVisible"
      fullscreen
      class="signClassStyle"
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
        :close-success-callback="closeSuccessCallback"
        @on-save="uploadSignatureImage"
        @on-picture="uploadPicture()"
      />
    </el-dialog>
  </div>
</template>

<script>
import { add_modifyword, update_modifyword, notpass_modifyword } from '@/api/word'
import Signature from '../../../../components/Signature/PhoneIndex.vue'
import { uploadImage, getjdwsbh } from '@/api/entrust'

export default {
  components: { Signature },
  props: {
    row: { type: Object, required: true },
    isEdit: { type: Boolean, default: false },
    isExamine: { type: Boolean, default: false },
    operdm: { type: String, require: true, default: '' },
    username: { type: String, require: true, default: '' },
    signpicture: { type: String, default: '' },
    signpictureid: { type: String, default: '' },
    editSuccessCallBack: {
      type: Function, default: function (response) {
      }
    },
    closeDialogCallBack: {
      type: Function, default: function (response) {
      }
    },
    // 判断是否从委托进入
    iswt: { type: Boolean, default: false }
  },
  data: function () {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      editJDWSForm: {
        id: this.isEdit ? this.row.id : undefined,
        wtid: this.row.wtid,
        classifiedType: '1',
        // 申请人
        sqr_name: this.username,
        // 申请人
        sqr: this.operdm,
        // 申请时间
        sQ_DATE: new Date(),
        // 修改鉴定文书编号
        posT_XH: undefined,
        // 修改详细内容
        xgnr: undefined,
        // 修改理由
        xgly: undefined,
        // 申请部门意见
        sqbmyj: undefined,
        // 申请部门意见_签字
        sqbmyJ_QZ: undefined,
        // 申请部门意见_签字url
        sqbmyJ_QZ_url: undefined,
        // 申请部门意见_人
        sqbmyJ_OPERDM: undefined,
        // 申请部门意见_时间
        sqbmyJ_DATE: undefined,
        // 室主任意见
        szryj: undefined,
        // 室主任意见_签字
        szryJ_QZ: undefined,
        // 室主任意见_签字url
        szryJ_QZ_url: undefined,
        // 室主任意见_人
        szryJ_OPERDM: undefined,
        // 室主任意见_时间
        szryJ_DATE: undefined,
        // 中心领导意见
        zxldyj: undefined,
        // 中心领导意见_签字
        zxldyJ_QZ: undefined,
        // 中心领导意见_签字url
        zxldyJ_QZ_url: undefined,
        // 中心领导意见_人
        zxldyJ_OPERDM: undefined,
        // 中心领导意见_时间
        zxldyJ_DATE: undefined,
        // 状态
        status: undefined
      },
      isShowEntrustSignature: false,
      dialogSignatureVisible: false,
      editJDWSRules: {
        sqr: [{ required: true, message: ' ', trigger: 'change' }],
        sqr_name: [{ required: true, message: ' ', trigger: 'change' }],
        sQ_DATE: [{ required: true, message: ' ', trigger: 'change' }],
        posT_XH: [{ required: true, message: ' ', trigger: 'change' }],
        xgnr: [{ required: true, message: ' ', trigger: 'change' }],
        xgly: [{ required: true, message: ' ', trigger: 'change' }]
      }
    }
  },
  computed: {
    step: function () {
      return this.row.status
    }
  },
  created() {
    if (this.isEdit) {
      this.editJDWSForm.sqr_name = this.row.sqrname
      this.editJDWSForm.sqr = this.row.sqr
      this.editJDWSForm.sQ_DATE = this.row.sq_date
      this.editJDWSForm.posT_XH = this.row.post_xh
      this.editJDWSForm.xgnr = this.row.xgnr
      this.editJDWSForm.xgly = this.row.xgly
      if (this.iswt) {
        this.editJDWSForm.sqbmyj = this.row.sqbmyj
        this.editJDWSForm.sqbmyJ_QZ_url = this.row.sqbmyj_qz_url
      }
    } else {
      this.getjdwsbh()
    }
  },
  methods: {
    // 查询文书编号
    getjdwsbh: function () {
      getjdwsbh(this.row.wtid).then(response => {
        this.editJDWSForm.posT_XH = response.data
      })
    },
    uploadSignatureImage(blob) {
      const formData = new FormData()
      formData.append('file', blob)
      uploadImage(formData).then(response => {
        this.dialogSignatureVisible = false
        if (this.step === '0') {
          this.editJDWSForm.sqbmyJ_QZ_url = response.data.url
          this.editJDWSForm.sqbmyJ_QZ = response.data.img_id
        } else if (this.step === '1') {
          this.editJDWSForm.szryJ_QZ_url = response.data.url
          this.editJDWSForm.szryJ_QZ = response.data.img_id
        } else if (this.step === '2') {
          this.editJDWSForm.zxldyJ_QZ_url = response.data.url
          this.editJDWSForm.zxldyJ_QZ = response.data.img_id
        }
      })
    },
    uploadPicture: function () {
      this.dialogSignatureVisible = false
      if (this.step === '0') {
        this.editJDWSForm.sqbmyJ_QZ_url = this.signpicture
        this.editJDWSForm.sqbmyJ_QZ = this.signpictureid
      } else if (this.step === '1') {
        this.editJDWSForm.szryJ_QZ_url = this.signpicture
        this.editJDWSForm.szryJ_QZ = this.signpictureid
      } else if (this.step === '2') {
        this.editJDWSForm.zxldyJ_QZ_url = this.signpicture
        this.editJDWSForm.zxldyJ_QZ = this.signpictureid
      }
    },
    adopt: function () {
      if (this.step === '0') {
        if (this.editJDWSForm.sqbmyJ_QZ === '' || this.editJDWSForm.sqbmyJ_QZ === undefined) {
          this.$message.info('请签名！')
        } else {
          this.$confirm('是否通过审核?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.editJDWSForm.status = '1'
            this.editJDWSForm.sqbmyJ_OPERDM = this.operdm
            this.editJDWSForm.sqbmyJ_DATE = new Date()
            update_modifyword(this.editJDWSForm).then(response => {
              this.$message.success('审核成功！')
              this.editSuccessCallBack()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      } else if (this.step === '1') {
        if (this.editJDWSForm.szryJ_QZ === '' || this.editJDWSForm.szryJ_QZ === undefined) {
          this.$message.info('请签名！')
        } else {
          this.$confirm('是否通过审核?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.editJDWSForm.status = '2'
            this.editJDWSForm.szryJ_OPERDM = this.operdm
            this.editJDWSForm.szryJ_DATE = new Date()
            update_modifyword(this.editJDWSForm).then(response => {
              this.$message.success('审核成功！')
              this.editSuccessCallBack()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      } else if (this.step === '2') {
        if (this.editJDWSForm.zxldyJ_QZ === '' || this.editJDWSForm.zxldyJ_QZ === undefined) {
          this.$message.info('请签名！')
        } else {
          this.$confirm('是否通过审核?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.editJDWSForm.status = '3'
            this.editJDWSForm.zxldyJ_OPERDM = this.operdm
            this.editJDWSForm.zxldyJ_DATE = new Date()
            update_modifyword(this.editJDWSForm).then(response => {
              this.$message.success('审核成功！')
              this.editSuccessCallBack()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      }
    },
    // 不通过
    NoAdopt: function () {
      if (this.step === '0') {
        if (this.editJDWSForm.sqbmyj === '' || this.editJDWSForm.sqbmyj === undefined) {
          this.$message.info('请输入意见！')
        } else {
          this.$confirm('是否不通过审核?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            notpass_modifyword(this.row.id, this.row.status, this.editJDWSForm.sqbmyj, '0').then(response => {
              this.$message.success('操作成功！')
              this.editSuccessCallBack()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      } else if (this.step === '1') {
        if (this.editJDWSForm.szryj === '' || this.editJDWSForm.szryj === undefined) {
          this.$message.info('请输入意见！')
        } else {
          this.$confirm('是否不通过审核?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            notpass_modifyword(this.row.id, this.row.status, this.editJDWSForm.szryj, '0').then(response => {
              this.$message.success('操作成功！')
              this.editSuccessCallBack()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      } else if (this.step === '2') {
        if (this.editJDWSForm.zxldyj === '' || this.editJDWSForm.zxldyj === undefined) {
          this.$message.info('请输入意见！')
        } else {
          this.$confirm('是否不通过审核?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            notpass_modifyword(this.row.id, this.row.status, this.editJDWSForm.zxldyj, '0').then(response => {
              this.$message.success('操作成功！')
              this.editSuccessCallBack()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      }
    },
    submitApply: function () {
      this.$refs['editJDWSForm'].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            update_modifyword(this.editJDWSForm).then(response => {
              this.$message.success('提交成功')
              this.editSuccessCallBack()
              this.closeDialogCallBack()
            })
          } else {
            this.$confirm('是否提交申请修改鉴定文书申请?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {
              add_modifyword(this.editJDWSForm).then(response => {
                this.$message.success('提交成功')
                this.editSuccessCallBack()
                this.closeDialogCallBack()
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
        } else {
          this.$message.info('请填写完整！')
        }
      })
    },
    closeSuccessCallback() {
      this.dialogSignatureVisible = false
    }
  }
}
</script>

<style scoped
       lang="scss">
.el-button {
  width: 100%;
}
::v-deep .el-divider {
  height: 1.5px;
  margin: 5px 0px 8px;
}
::v-deep .el-input__prefix {
  display: none;
}
::v-deep .el-form-item--mini.el-form-item {
  margin-bottom: 3px;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 15px;
}
::v-deep .el-dialog__body {
  padding: 15px 10px 0px 10px;
}
::v-deep .el-dialog__title {
  font-size: 16px;
}
::v-deep .el-dialog__header {
  display: none !important;
  padding: 10px 20px 10px;
}
::v-deep .el-dialog__headerbtn {
  top: 2%;
  font-size: 23px;
}
</style>
