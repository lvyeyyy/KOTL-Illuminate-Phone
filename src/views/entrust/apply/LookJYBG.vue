<template>
  <div v-loading="isShow">
    <el-row
      v-if="lqStatus==='0'"
      :gutter="10"
      style="margin-left:0"
    >
      <el-row>
        <span style="font-size:12px;color:red">如您已打印检验报告，请点击领取完成！！！</span>
      </el-row>
      <el-row style="margin-top:5px">
        <el-col :span="11">
          <el-button
            style="width:100%;"
            type="success"
            size="mini"
            @click="receive"
          >领取完成</el-button>
        </el-col>
        <el-col :span="11">
          <el-button
            v-if="row.poststatus===$store.getters.POST_STATUS.PASSED"
            style="width:100%;margin-left:10px"
            type="primary"
            size="mini"
            @click="editJDWS"
          >修改鉴定文书</el-button>
        </el-col>
      </el-row>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div id="pdfdemo" />
      </el-col>
    </el-row>
    <el-dialog
      title="签名"
      :visible.sync="dialogSignatureVisible"
      width="100%"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
    >
      <Signature
        v-if="dialogSignatureVisible"
        :jdzy-id="jdzyId"
        :signpicture="signpicture"
        @on-save="uploadEntrustSignatureImage"
        @on-picture="uploadPicture"
      />
    </el-dialog>
    <el-dialog
      v-if="dialogEditJDWSVisible"
      title="申请修改鉴定文书"
      :visible.sync="dialogEditJDWSVisible"
      append-to-body
      width="95%"
      destroy-on-close
    >
      <editJDWS
        :row="row"
        :is-edit="false"
        :iswt="true"
        :is-examine="false"
        :operdm="operdm"
        :username="username"
        :signpicture="signpicture"
        :signpictureid="signpictureid"
        :edit-success-call-back="editSuccessCallBack"
      />
    </el-dialog>
  </div>
</template>

<script>
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'
import { queryDocument, uploadImage, updatelq } from '@/api/entrust'
import Signature from '@/components/Signature/PhoneIndex'
import editJDWS from './components/editJDWS.vue'

export default {
  components: { Signature, editJDWS },
  props: {
    entrustId: { type: String, require: true, default: undefined },
    jdzyId: { type: String, require: true, default: undefined },
    lqStatus: { type: String, require: true, default: undefined },
    row: { type: Object, require: true, default: undefined },
    operdm: { type: String, require: true, default: '' },
    username: { type: String, require: true, default: '' },
    signpicture: { type: String, default: '' },
    signpictureid: { type: String, default: '' }
  },
  data() {
    return {
      pdfh5: null,
      pdfList: [],
      isShow: false,
      dialogSignatureVisible: false,
      dialogEditJDWSVisible: false
    }
  },
  created() {
    this.queryDocument()
  },
  methods: {
    // 查询检验报告
    queryDocument() {
      this.isShow = true
      queryDocument(this.entrustId, this.$store.getters.DOCUMENT_STEP.AUDIT).then(response => {
        let temp = []
        this.pdfList = []
        if (response.data.length !== 0) {
          temp = response.data
          let index = 0
          for (let i = 0; i < temp.length; i++) {
            if (temp[i].type === '鉴定文书') {
              if (temp[i].editioN_NUM > index) {
                index = i
              }
            }
          }
          this.pdfList = (temp[index].url + '#toolbar=0')
          //  实例化
          this.pdfh5 = new Pdfh5('#pdfdemo', {
            zoomEnable: true,
            tapZoomFactor: 1.5,
            pdfurl: this.pdfList// 这里就是pdf的路径
          })
          this.isShow = false
        }
      })
    },
    receive() {
      this.dialogSignatureVisible = true
    },
    // 使用签字
    uploadEntrustSignatureImage(blob) {
      const formData = new FormData()
      formData.append('file', blob)
      uploadImage(formData).then(response => {
        const temp = {
          wtid: this.entrustId,
          lQ_STATUS: '1',
          LQ_SIGNNAME: response.data.img_id
        }
        updatelq(temp).then(response => {
          this.$message.success('领取成功，请打印！')
          this.dialogSignatureVisible = false
        })
      })
    },
    // 使用个人中心的签字图片
    uploadPicture() {
      if (this.signpictureid !== undefined) {
        const temp = {
          wtid: this.entrustId,
          lQ_STATUS: '1',
          LQ_SIGNNAME: this.signpictureid
        }
        updatelq(temp).then(response => {
          this.$message.success('领取成功，请打印！')
          this.dialogSignatureVisible = false
        })
      } else {
        this.$message.info('您还未在个人中心上传签字图片，请上传后使用此功能！')
      }
    },
    // 点击修改鉴定文书
    editJDWS() {
      this.dialogEditJDWSVisible = true
    },
    editSuccessCallBack() {
      this.dialogEditJDWSVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  font-size: 13px;
}
::v-deep .el-dialog .el-dialog__title {
  font-size: 15px;
}
::v-deep .el-dialog__body {
  padding: 0 10px 15px 10px;
}
::v-deep .el-dialog__headerbtn {
  font-size: 22px;
  top: 2%;
}
::v-deep .el-dialog__header {
  padding: 10px 20px 10px;
}
</style>
<style>
.el-message-box {
  width: 98% !important;
}
</style>
