<template>
  <div style="height:100%">
    <!-- <el-row class="fixRow">
      <el-col
        :span="24"
        style="height:100%"
      >
        <el-card
          shadow="always"
          class="my-card"
          style="height:100%;text-align:left"
        >
          <el-col
            :span="15"
            style="text-align:right"
          >确认案件信息</el-col>
          <el-col
            :span="9"
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
    <el-form
      ref="caseForm"
      class="my-form"
      :model="caseForm"
      :rules="rules"
      label-position="right"
      label-width="100px"
    >
      <!-- v-role="[$store.getters.ROLES_TYPE.ENTRUST_PERSON,$store.getters.ROLES_TYPE.ACCEPT_PERSON]" -->
      <el-row
        :gutter="20"
        class="formStyle"
      >
        <el-col :span="23">
          <el-form-item
            style="margin-top:15px"
            label="打防管控编号"
            prop="DFGKBH"
          >
            <el-input
              v-model="caseForm.DFGKBH"
              :value="caseForm.DFGKBH"
              clearable
              placeholder="请填写打防管控编号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="现场勘验编号"
            prop="kindID"
          >
            <el-input
              v-model="caseForm.kindID"
              :value="caseForm.kindID"
              clearable
              placeholder="现场勘验编号"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col
          v-if="jdzy === $store.getters.MAJOR_TYPE.DNA"
          :span="5"
          style="margin-left:5px;margin-top:3px"
        >
          <el-button
            type="primary"
            plain
            @click="read"
          >读取</el-button>
        </el-col> -->
        <el-col :span="23">
          <el-form-item
            label="案件名称"
            prop="AJNAME"
          >
            <el-input
              v-model="caseForm.AJNAME"
              :value="caseForm.AJNAME"
              clearable
              placeholder="请填写案件名称"
              :maxlength="caseNameMaxLength"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="案发时间"
            prop="CASE_DATE"
          >
            <el-date-picker
              v-model="caseForm.CASE_DATE"
              type="date"
              placeholder="选择案发时间"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="案件性质"
            prop="AJXZ"
          >
            <el-select
              v-model="caseForm.AJXZ"
              :value="caseForm.AJXZ"
              clearable
              placeholder="请选择案件性质"
            >
              <el-option
                v-for="item of optionList.caseNatureOption"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbid"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="案件类型"
            prop="AJLX"
          >
            <el-select
              v-model="caseForm.AJLX"
              :value="caseForm.AJLX"
              :popper-append-to-body="false"
              clearable
              placeholder="请选择案件类型"
            >
              <el-option
                v-for="item of optionList.caseTypeOption"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbid"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <!--案发地址-->
          <el-form-item
            label="案发地址"
            prop="ADDRESS"
          >
            <el-input
              v-model="caseForm.ADDRESS"
              :value="caseForm.ADDRESS"
              clearable
              placeholder="案发地址"
            />
          </el-form-item>
          <!--案发地址 end-->
        </el-col>
        <el-col :span="23">
          <!--简要案情-->
          <el-form-item
            label="简要案情"
            prop="AJACCOUNT"
          >
            <el-input
              v-model="caseForm.AJACCOUNT"
              :value="caseForm.AJACCOUNT"
              :rows="3"
              clearable
              placeholder="请填写简要案情"
              type="textarea"
              :maxlength="caseAccountMaxLength"
              show-word-limit
            />
          </el-form-item>
          <!--简要案情 end-->
        </el-col>
      </el-row>
      <el-row class="btnRow">
        <el-col
          :span="12"
          style="text-align:center"
        >
          <el-button
            style="width:95%;"
            :disabled="loading"
            :type="submitButtonColor"
            @click="submitForm('caseForm')"
          >{{ submitButtonText }}
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// function clientGetToken() {
//   return client.getToken()
//   // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiOTVhNDJmMDItMzRiMi00MTk5LWIyOGYtODFkODUyNjg2NWQxIiwiaWF0IjoiMjAyMi8xMC8xNyA5OjAyOjA5IiwibmFtZWlkIjoiNzc2IiwibmJmIjoxNjY1OTY4NTI5LCJleHAiOjE2NjU5NzAzMjksImlzcyI6Imp3dF91c2VyIiwiYXVkIjoiand0X2F1ZGllbmNlIn0.yIWmnuZdvm0BMoCSxhKJdu1gr1HS6cMIv-mwtwqr82M'
// }
// function clientGetCaseId() {
//   // return client.getAjid()
//   return '3295'
// }
// function clientGetOTaskId() {
//   // return client.getWtid()
//   return '3337'
// }
// // 再传个鉴定专业
// function clientGetOjdzy() {
//   // return client.getJdzy()
//   return '2'
// }
import moment from 'moment'
import { disabledDate } from '@/utils/tool'
import { getAllCaseNatureSelectOption, getAllCaseTypeSelectOption } from '@/api/selectOption'
import { getCaseInfoByCaseID, updateCase, ajxxreadxcserver } from '@/api/case'
export default {
  props: {
    // jdzy: { type: String, default: '' },
    caseId: { type: String, default: '' },
    entrustId: { type: String, default: '' }
  },
  data() {
    return {
      caseNameMaxLength: 100,
      caseAccountMaxLength: 400,
      caseForm: {
        // 案件ID
        AJID: '',
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
      rules: {
        AJNAME: [
          { required: true, message: '请输入案件名称', trigger: 'change' },
          { max: this.caseNameMaxLength, message: '案件名称不能超过20字', trigger: 'change' }
        ],
        // DFGKBH: [{ required: true, trigger: 'change', validator: validateMethod }],
        // kindID: [{ required: true, trigger: 'change', validator: validateMethod }],
        AJLX: [{ required: this.isAjxz, message: '请选择案件类型', trigger: 'change' }],
        AJXZ: [{ required: this.mandatory && this.isAjxz, message: '请选择案件性质', trigger: 'change' }],
        CASE_DATE: [{ required: true, message: '请选择案发时间', trigger: 'change' }],
        ADDRESS: [{ required: true, message: '请输入案发地址', trigger: 'change' }],
        AJACCOUNT: [
          { required: true, message: '请输入简要案情', trigger: 'change' },
          { max: this.caseAccountMaxLength, message: '简要案情不能超过100字', trigger: 'change' }
        ]
      },
      pickerOptions: disabledDate,
      optionList: {
        caseTypeOption: [],
        caseNatureOption: []
      },
      // caseId: '',
      // entrustId: '',
      // jdzy: '',
      isSave: false,
      loading: false
    }
  },
  computed: {
    submitButtonColor() {
      return this.isSave ? 'success' : 'primary'
    },
    submitButtonText() {
      if (this.isSave) {
        return '已修改'
      } else {
        return '修改'
      }
    }
  },
  watch: {
    'caseForm.CASE_DATE'() {
      this.getCaseAccount()
    },
    'caseForm.ADDRESS'() {
      this.getCaseAccount()
    }
  },
  created() {
    // this.tokentest = clientGetToken()
    // var tokentest = this.tokentest
    // this.$store.commit('user/SET_TOKEN2', tokentest)
    // this.caseId = clientGetCaseId()
    // this.entrustId = clientGetOTaskId()
    // this.jdzy = clientGetOjdzy()
    this.getAllCaseNatureList()
    this.getAllCaseTypeList()
    this.getCaseInfo()
  },
  methods: {
    getCaseInfo() {
      getCaseInfoByCaseID(this.caseId).then(response => {
        this.caseForm.AJID = this.caseId
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
    // 获取案件性质下拉列表
    getAllCaseNatureList() {
      getAllCaseNatureSelectOption().then(response => {
        this.optionList.caseNatureOption = response.data
      })
    },
    // 获取案件类别下拉列表
    getAllCaseTypeList() {
      getAllCaseTypeSelectOption().then(response => {
        this.optionList.caseTypeOption = response.data
      })
    },
    // 提交表单
    submitForm(formName) {
      this.loading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.caseForm.kindID = this.caseForm.kindID.replace(/\s*/g, '')
          if (this.caseForm.AJACCOUNT.substring(this.caseForm.AJACCOUNT.length - 1) === '。') {
            this.caseForm.AJACCOUNT = this.caseForm.AJACCOUNT.slice(0, this.caseForm.AJACCOUNT.length - 2)
          }
          updateCase(this.caseForm).then(response => {
            this.$message.success('修改成功！')
            this.isSave = true
            this.loading = false
          }).catch(() => {
            this.$message.error('修改失败！')
            this.isSave = false
            this.loading = false
          })
        } else {
          this.$message.error('请按照要求填写表单')
          this.loading = false
        }
      })
    },
    getCaseAccount() {
      this.caseForm.AJACCOUNT = moment(this.caseForm.CASE_DATE).format('YYYY年M月D日') + '在' + this.caseForm.ADDRESS
    },
    // backList() {
    //   this.$router.push('/audit/list')
    // },
    // goClick() {
    //   this.$router.push({ path: '/preaudit/wtinfo', query: { caseId: this.caseId, entrustId: this.entrustId } })
    //   // this.$router.push('/preaudit/wtinfo')
    // },
    // 读取
    read() {
      if (!this.caseForm.kindID) {
        this.$message({
          message: '请输入现场勘验编号',
          type: 'warning'
        })
      } else {
        const obj = {
          mType: '0',
          kindId: this.caseForm.kindID,
          wtTd: ''
        }
        ajxxreadxcserver(obj).then(res => {
          if (res.success) {
            // 案件名称
            this.caseForm.AJNAME = res.data[0].ajname
            // 打防管控编号
            this.caseForm.DFGKBH = res.data[0].dfgkbh
            // 案发日期
            this.caseForm.CASE_DATE = res.data[0].case_date
            // 案发地址
            this.caseForm.ADDRESS = res.data[0].address
            // 简要案情
            this.caseForm.AJACCOUNT = res.data[0].ajaccount
          } else {
            this.$message.error(res.msg)
          }
        })
      }
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
.fixRow {
  position: fixed;
  width: 100%;
  top: 0;
  text-align: center;
  z-index: 99;
}
.my-form {
  height: 100%;
  overflow-y: scroll;
  padding: 14% 0 17% 0;
}
.formStyle {
  margin-left: 0 !important;
  height: 100%;
  overflow-y: scroll;
}
.btnRow {
  position: fixed;
  bottom: 3%;
  width: 30%;
}
::v-deep .el-row {
  width: 100%;
}
::v-deep .el-divider--horizontal {
  margin: 10px 0;
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
.el-col.tips {
  font-size: 12px;
  color: rgb(234, 12, 12);
  margin-top: 8px;
  padding-left: 10px !important;
}
::v-deep .el-textarea__inner {
  font-size: 13px;
}
</style>
<style>
.el-select-dropdown__item {
  font-size: 13px;
  height: 30px;
  line-height: 30px;
}
</style>
