<template>
  <div class="container">
    <el-form
      ref="reissueJDWSForm"
      :model="reissueJDWSForm"
      :rules="editJDWSRules"
      label-width="80px"
      size="mini"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="申请单位"
            prop="sqdw"
          >
            <el-cascader
              v-model="reissueJDWSForm.sqdw"
              :value="reissueJDWSForm.sqdw"
              :options="entrustWorkUnitOption"
              :show-all-levels="false"
              :props="{value:'xzdid',label:'xzdmc',emitPath:false}"
              style="width: 100%"
              placeholder="请选择申请单位名称"
              filterable
              clearable
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.xzdmc }}</span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="申请人员"
            prop="sqr_name"
          >
            <el-input
              v-model="reissueJDWSForm.sqr_name"
              :value="reissueJDWSForm.sqr_name"
              clearable
              disabled
              placeholder="请输入申请人"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="申请时间"
            prop="sQ_DATE"
          >
            <el-date-picker
              v-model="reissueJDWSForm.sQ_DATE"
              style="width:100%"
              disabled
              :value="reissueJDWSForm.sQ_DATE"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="文书名称"
            prop="jdwsmc"
          >
            <el-input
              v-model="reissueJDWSForm.jdwsmc"
              :value="reissueJDWSForm.jdwsmc"
              clearable
              placeholder="请输入鉴定文书名称"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="文书编号"
            prop="jdwsbh"
          >
            <el-input
              v-model="reissueJDWSForm.jdwsbh"
              :value="reissueJDWSForm.jdwsbh"
              clearable
              placeholder="请输入鉴定文书编号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="申请事由"
            prop="sqsy"
          >
            <el-input
              v-model="reissueJDWSForm.sqsy"
              :value="reissueJDWSForm.sqsy"
              clearable
              placeholder="请输入申请事由"
            />
            <div class="tipStyle">
              <span>本单位已经收到由浙江省东阳市公安司法鉴定中心签发的</span>
              <span
                v-if="reissueJDWSForm.sqsy==='' "
                style="color:red;text-decoration:underline;"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span
                v-else
                style="color:red;text-decoration:underline;"
              >{{ reissueJDWSForm.sqsy }}</span>
              <span>案（事）件的鉴定文书，因工作疏忽遗失，特申请补发。</span>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="(row.status==='0' && !isExamine) || row.status==='已发文'">
        <el-col
          :span="8"
          :offset="16"
        >
          <el-button
            type="primary"
            size="mini"
            @click="submitApply"
          >{{ isReissue?'修改':'提交申请' }}</el-button>
        </el-col>
      </el-row>
      <el-row
        v-if="(isExamine && step==='0' && iswt) || (isExamine && iswt)"
        :gutter="20"
      >
        <el-divider />
        <el-col :span="24">
          <el-form-item
            label="申请单位意见"
            label-width="92px"
          >
            <el-input
              v-model="reissueJDWSForm.sqdwyj"
              type="textarea"
              :rows="3"
              :value="reissueJDWSForm.sqdwyj"
              clearable
              placeholder="请输入申请单位意见"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="10"
          style="margin-top:8px"
        >
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-edit"
            @click="dialogSignatureVisible=true"
          >审核签名
          </el-button>
        </el-col>
        <el-col
          :span="5"
          style="margin-top:8px"
        >
          <el-image :src="reissueJDWSForm.sqdwyJ_QZ_url">
            <div
              slot="error"
              class="image-slot"
              style="display: flex;justify-content: center;align-items: center;font-size:13px"
            >
              未签名
            </div>
          </el-image>
        </el-col>
        <el-col
          v-if="row.status==='0' || !iswt"
          :span="9"
          style="margin-top:8px"
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
      <el-row
        v-if="isExamine && step==='1'&& !iswt"
        :gutter="20"
      >
        <el-divider />
        <el-col :span="24">
          <el-form-item label="室负责人意见">
            <el-input
              v-model="reissueJDWSForm.szryj"
              type="textarea"
              :rows="3"
              :value="reissueJDWSForm.szryj"
              clearable
              placeholder="请输入室负责人意见"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="10"
          style="margin-top:8px"
        >
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
          :span="5"
          style="margin-top:8px"
        >
          <el-image :src="reissueJDWSForm.szryJ_QZ_url">
            <div
              slot="error"
              class="image-slot"
              style="display: flex;justify-content: center;align-items: center;font-size:13px"
            >
              未签名
            </div>
          </el-image>
        </el-col>
        <el-col
          v-if="row.status==='0' || !iswt"
          :span="9"
          style="margin-top:8px"
        >
          <el-button
            size="mini"
            type="success"
            @click="adopt"
          >
            通过
          </el-button>
        </el-col>
      </el-row>
      <el-row
        v-if="isExamine && step==='2'&& !iswt"
        :gutter="20"
      >
        <el-divider />
        <el-col :span="24">
          <el-form-item label="中心领导意见">
            <el-input
              v-model="reissueJDWSForm.zxldyj"
              type="textarea"
              :rows="3"
              :value="reissueJDWSForm.zxldyj"
              clearable
              placeholder="请输入中心领导意见"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="10"
          style="margin-top:8px"
        >
          <el-button
            type="primary"
            plain
            size="mini"
            icon="el-icon-edit"
            @click="dialogSignatureVisible=true"
          >审核签名
          </el-button>
        </el-col>
        <el-col
          :span="5"
          style="margin-top:8px"
        >
          <el-image :src="reissueJDWSForm.zxldyJ_QZ_url">
            <div
              slot="error"
              class="image-slot"
              style="display: flex;justify-content: center;align-items: center;font-size:13px"
            >
              未签名
            </div>
          </el-image>
        </el-col>
        <el-col
          v-if="row.status==='0' || !iswt"
          :span="9"
          style="margin-top:8px"
        >
          <el-button
            size="mini"
            type="success"
            @click="adopt"
          >
            通过
          </el-button>
        </el-col>
      </el-row>
      <el-dialog
        title="签名"
        :visible.sync="dialogSignatureVisible"
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
    </el-form>
  </div>
</template>

<script>
import { add_modifyword, update_modifyword } from '@/api/word'
import { getAllUnitSelectOption } from '@/api/selectOption'
import Signature from '@/components/Signature/PhoneIndex.vue'
import { uploadImage } from '@/api/entrust'

export default {
  components: { Signature },
  props: {
    row: { type: Object, required: true },
    isReissue: { type: Boolean, default: false },
    isExamine: { type: Boolean, default: false },
    operdm: { type: String, require: true, default: '' },
    username: { type: String, require: true, default: '' },
    signpicture: { type: String, default: '' },
    signpictureid: { type: String, default: '' },
    sqdwid: { type: String, default: '' },
    reissueSuccessCallBack: {
      type: Function, default: function (response) {
      }
    },
    // 判断是否从委托进入
    iswt: { type: Boolean, default: false }
  },
  data: function () {
    return {
      dialogSignatureVisible: false,
      isShowEntrustSignature: false,
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
      entrustWorkUnitOption: [],
      reissueJDWSForm: {
        id: this.isReissue ? this.row.id : undefined,
        wtid: this.row.wtid,
        classifiedType: '2',
        // 申请单位
        sqdw: parseInt(this.sqdwid),
        // 申请人
        sqr_name: this.username,
        // 申请人
        sqr: this.operdm,
        // 申请时间
        sQ_DATE: new Date(),
        // 鉴定文书编号
        jdwsbh: undefined,
        // 鉴定文书名称
        jdwsmc: '',
        // 申请事由
        sqsy: '',
        // 申请单位意见
        sqdwyj: undefined,
        // 申请单位意见_签字
        sqdwyJ_QZ: undefined,
        // 申请单位意见_签字url
        sqdwyJ_QZ_url: undefined,
        // 申请单位意见_人
        sqdwyJ_OPERDM: undefined,
        // 申请单位意见_时间
        sqdwyJ_DATE: undefined,
        // 室负责人意见
        szryj: undefined,
        // 室负责人意见_签字
        szryJ_QZ: undefined,
        // 室负责人意见_签字url
        szryJ_QZ_url: undefined,
        // 室负责人意见_人
        szryJ_OPERDM: undefined,
        // 室负责人意见_时间
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
      editJDWSRules: {
        sqdw: [{ required: true, message: ' ', trigger: 'change' }],
        sqr: [{ required: true, message: ' ', trigger: 'change' }],
        sqr_name: [{ required: true, message: ' ', trigger: 'change' }],
        sQ_DATE: [{ required: true, message: ' ', trigger: 'change' }],
        jdwsbh: [{ required: true, message: ' ', trigger: 'change' }],
        jdwsmc: [{ required: true, message: ' ', trigger: 'change' }],
        sqsy: [{ required: true, message: ' ', trigger: 'change' }]
      }
    }
  },
  computed: {
    step: function () {
      return this.row.status
    }
  },
  created() {
    this.getUnitList()
    if (this.isReissue) {
      this.reissueJDWSForm.sqdw = parseInt(this.row.sqdw)
      this.reissueJDWSForm.sqr_name = this.row.sqrname
      this.reissueJDWSForm.sqr = this.row.sqr
      this.reissueJDWSForm.sQ_DATE = this.row.sq_date
      this.reissueJDWSForm.jdwsbh = this.row.jdwsbh
      this.reissueJDWSForm.jdwsmc = this.row.jdwsmc
      this.reissueJDWSForm.sqsy = this.row.sqsy
      if (this.iswt) {
        this.reissueJDWSForm.sqdwyj = this.row.sqdwyj
        this.reissueJDWSForm.sqdwyJ_QZ_url = this.row.sqbmyj_qz_url
      }
    }
  },
  methods: {
    uploadSignatureImage(blob) {
      const formData = new FormData()
      formData.append('file', blob)
      uploadImage(formData).then(response => {
        this.dialogSignatureVisible = false
        if (this.step === '0') {
          this.reissueJDWSForm.sqdwyJ_QZ_url = response.data.url
          this.reissueJDWSForm.sqdwyJ_QZ = response.data.img_id
        } else if (this.step === '1') {
          this.reissueJDWSForm.szryJ_QZ_url = response.data.url
          this.reissueJDWSForm.szryJ_QZ = response.data.img_id
        } else if (this.step === '2') {
          this.reissueJDWSForm.zxldyJ_QZ_url = response.data.url
          this.reissueJDWSForm.zxldyJ_QZ = response.data.img_id
        }
      })
    },
    uploadPicture: function () {
      this.dialogSignatureVisible = false
      if (this.step === '0') {
        this.reissueJDWSForm.sqdwyJ_QZ_url = this.signpicture
        this.reissueJDWSForm.sqdwyJ_QZ = this.signpictureid
      } else if (this.step === '1') {
        this.reissueJDWSForm.szryJ_QZ_url = this.signpicture
        this.reissueJDWSForm.szryJ_QZ = this.signpictureid
      } else if (this.step === '2') {
        this.reissueJDWSForm.zxldyJ_QZ_url = this.signpicture
        this.reissueJDWSForm.zxldyJ_QZ = this.signpictureid
      }
    },
    adopt: function () {
      if (this.step === '0') {
        if (this.reissueJDWSForm.sqdwyJ_QZ === '' || this.reissueJDWSForm.sqdwyJ_QZ === undefined) {
          this.$message.info('请签名！')
        } else {
          this.$confirm('是否通过审核?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.reissueJDWSForm.status = '1'
            this.reissueJDWSForm.sqdwyJ_OPERDM = this.operdm
            this.reissueJDWSForm.sqdwyJ_DATE = new Date()
            update_modifyword(this.reissueJDWSForm).then(response => {
              this.$message.success('审核成功！')
              this.reissueSuccessCallBack()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      } else if (this.step === '1') {
        if (this.reissueJDWSForm.szryJ_QZ === '' || this.reissueJDWSForm.szryJ_QZ === undefined) {
          this.$message.info('请签名！')
        } else {
          this.$confirm('是否通过审核?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.reissueJDWSForm.status = '2'
            this.reissueJDWSForm.szryJ_OPERDM = this.operdm
            this.reissueJDWSForm.szryJ_DATE = new Date()
            update_modifyword(this.reissueJDWSForm).then(response => {
              this.$message.success('审核成功！')
              this.reissueSuccessCallBack()
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      } else if (this.step === '2') {
        if (this.reissueJDWSForm.zxldyJ_QZ === '' || this.reissueJDWSForm.zxldyJ_QZ === undefined) {
          this.$message.info('请签名！')
        } else {
          this.$confirm('是否通过审核?', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            this.reissueJDWSForm.status = '3'
            this.reissueJDWSForm.zxldyJ_OPERDM = this.operdm
            this.reissueJDWSForm.zxldyJ_DATE = new Date()
            update_modifyword(this.reissueJDWSForm).then(response => {
              this.$message.success('审核成功！')
              this.reissueSuccessCallBack()
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
      this.$refs['reissueJDWSForm'].validate((valid) => {
        if (valid) {
          if (this.isReissue) {
            update_modifyword(this.reissueJDWSForm).then(response => {
              this.$message.success('提交成功')
              this.reissueSuccessCallBack()
            })
          } else {
            this.$confirm('是否提交申请修改鉴定文书申请?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {
              add_modifyword(this.reissueJDWSForm).then(response => {
                this.$message.success('提交成功')
                this.reissueSuccessCallBack()
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
    // 获取单位下拉列表
    getUnitList: function () {
      getAllUnitSelectOption().then(response => {
        this.entrustWorkUnitOption = response.data
      })
    }
  }
}
</script>
<style>
.el-message-box {
  width: 96% !important;
}
.el-message-box__wrapper {
  /* top: 30% !important; */
  left: 15px !important;
}
.el-cascader__dropdown {
  left: 0 !important;
}
.el-cascader-panel {
  display: block !important;
}
.el-cascader-menu:nth-of-type(1) {
  height: 46px !important;
}
.el-cascader-menu:nth-of-type(2) {
  height: 106px !important;
}
.el-select-dropdown__item {
  font-size: 13px;
  height: 30px;
  line-height: 30px;
}
</style>
<style lang="scss" scoped>
.el-button {
  width: 100%;
}
// ::v-deep .el-form-item__content {
//   line-height: 20px;
// }
::v-deep .el-input__inner {
  font-size: 12px;
  height: 28px;
  line-height: 28px;
}
::v-deep .el-input__prefix {
  display: none;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 15px;
}
.tipStyle {
  margin-left: -80px;
  line-height: 1.8;
  font-size: 12px;
  margin-top: 5px;
}
::v-deep .el-form-item--mini.el-form-item {
  margin-bottom: 3px;
}
::v-deep .el-divider {
  height: 1.5px;
  margin: 5px 0px 8px;
}
</style>
