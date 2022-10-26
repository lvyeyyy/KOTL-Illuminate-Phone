<template>
  <el-form
    ref="appraisedPeopleForm"
    :model="appraisedPeopleForm"
    :rules="appraisedPeopleRules"
    label-position="right"
    label-width="68px"
  >
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="姓名"
          prop="NAME"
        >
          <el-input
            v-model="appraisedPeopleForm.NAME"
            :value="appraisedPeopleForm.NAME"
            clearable
            placeholder="姓名"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="性别"
          prop="SEX"
        >
          <el-select
            v-model="appraisedPeopleForm.SEX"
            :value="appraisedPeopleForm.SEX"
            clearable
            tabindex="6"
            placeholder="请选择性别"
            style="width: 100%"
          >
            <el-option
              v-for="sexItem in optionList.sexOption"
              :key="sexItem.value"
              :label="sexItem.label"
              :value="sexItem.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="身份证"
          prop="SFCODE"
        >
          <el-input
            v-model="appraisedPeopleForm.SFCODE"
            :value="appraisedPeopleForm.SFCODE"
            clearable
            placeholder="身份证号码"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="年龄"
          prop="AGE"
        >
          <el-input
            v-model="appraisedPeopleForm.AGE"
            type="number"
            min="1"
            :value="appraisedPeopleForm.AGE"
            clearable
            placeholder="年龄"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="生日"
          prop="BIRTH_DATE"
        >
          <el-date-picker
            v-model="appraisedPeopleForm.BIRTH_DATE"
            type="date"
            placeholder="选择生日"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          class="phoneClass"
          label="电话"
          prop="TELEPHONE"
        >
          <el-input
            v-model="appraisedPeopleForm.TELEPHONE"
            :value="appraisedPeopleForm.TELEPHONE"
            clearable
            placeholder="电话"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="职业"
          prop="PROFESSION"
        >
          <el-input
            v-model="appraisedPeopleForm.PROFESSION"
            :value="appraisedPeopleForm.PROFESSION"
            clearable
            placeholder="职业"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="学历"
          prop="EDUCATION"
        >
          <el-input
            v-model="appraisedPeopleForm.EDUCATION"
            :value="appraisedPeopleForm.EDUCATION"
            clearable
            placeholder="学历"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="户籍"
          prop="NATIVE_PLACE"
        >
          <el-input
            v-model="appraisedPeopleForm.NATIVE_PLACE"
            :value="appraisedPeopleForm.NATIVE_PLACE"
            clearable
            placeholder="户籍"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="现居住地"
          prop="ADDRESS"
        >
          <el-input
            v-model="appraisedPeopleForm.ADDRESS"
            :value="appraisedPeopleForm.ADDRESS"
            clearable
            placeholder="现居住地"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="工作地点"
          prop="WORK_ADDRESS"
        >
          <el-input
            v-model="appraisedPeopleForm.WORK_ADDRESS"
            :value="appraisedPeopleForm.WORK_ADDRESS"
            clearable
            placeholder="工作地点"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row style="margin-top:5px">
      <el-col
        v-if="isEdit"
        :span="12"
        style="text-align:center"
      >
        <el-button
          style="width:92%;margin:0 auto"
          type="danger"
          @click="handleDeleteButton"
        >删除
        </el-button>
      </el-col>
      <el-col
        :span="isEdit?12:24"
        style="text-align:center"
      >
        <el-button
          type="primary"
          :disabled="submieDisabled"
          style="width:98%;margin:0 auto"
          @click="handleSubmitButton"
        >{{ submitButtonText }}
          <i
            v-if="submieDisabled"
            class="el-icon-loading"
          />
        </el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
// function clientGetToken() {
//   //   return client.getToken()
//   return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiOGExN2NkMGMtYWNmOC00NmNlLThlMmEtOWMxYmMxY2QyMzFjIiwiaWF0IjoiMjAyMi8xMC8xMSA4OjQwOjExIiwibmFtZWlkIjoiNzc2IiwibmJmIjoxNjY1NDQ4ODExLCJleHAiOjE2NjU0NTA2MTEsImlzcyI6Imp3dF91c2VyIiwiYXVkIjoiand0X2F1ZGllbmNlIn0.PtD34pabAnmUDbMXhSpuY9FrqwqJ8Ws_F23P7JappZA'
// }

import { getBjdrInfoByID, addAppraisedPeople, updateAppraisedPeople, deleteAppraisedPeople } from '@/api/entrust'
import { getSexByIdCode, getBirthdayByIdCode } from '@/utils/tool'
import { validateIdCard } from '@/utils/validate'

export default {
  props: {
    entrustid: { type: String, require: true, default: '' },
    bjdrid: { type: String, require: true, default: '' },
    // 更新成功后的 callback
    updateSuccessCallBack: {
      type: Function,
      default() { }
    },
    cancelDeleteCallBack: {
      type: Function,
      default() { }
    }
  },
  data() {
    return {
      appraisedPeopleForm: {
        // 检材持有人所属委托
        WTID: '',
        // 检材持有人编号
        BJDRID: '',
        // 检材持有人姓名
        NAME: '',
        // 检材持有人身份证号码
        SFCODE: '',
        // 检材持有人性别
        SEX: '',
        // 检材持有人年龄
        AGE: '',
        // 检材持有人生日
        BIRTH_DATE: '',
        // 检材持有人电话
        TELEPHONE: '',
        // 检材持有人职业
        PROFESSION: '',
        // 检材持有人学历
        EDUCATION: '',
        // 检材持有人户籍
        NATIVE_PLACE: '',
        // 检材持有人现居住地
        ADDRESS: '',
        // 检材持有人工作地点
        WORK_ADDRESS: ''
      },
      validator: this.validateIdCard,
      appraisedPeopleRules: {
        NAME: [{ required: true, message: ' ', trigger: 'change' }],
        SFCODE: [{ trigger: 'change', validator: this.validator }]
      },
      optionList: {
        sexOption: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
          { label: '未知', value: 3 }
        ]
      },
      submieDisabled: false,
      flag: false
    }
  },
  computed: {
    isEdit() {
      return this.bjdrid !== ''
    },
    submitButtonText() {
      return this.isEdit ? '修改' : '添加'
    }
  },
  watch: {
    // 通过身份证来获取性别和生日
    'appraisedPeopleForm.SFCODE'(val) {
      if (val.length === 18) {
        this.appraisedPeopleForm.SEX = getSexByIdCode(val)
        this.appraisedPeopleForm.BIRTH_DATE = getBirthdayByIdCode(val)
        this.appraisedPeopleForm.AGE = new Date().getFullYear() - parseInt(this.appraisedPeopleForm.SFCODE.substr(6, 4))
      } else {
        this.appraisedPeopleForm.SEX = ''
        this.appraisedPeopleForm.BIRTH_DATE = ''
        this.appraisedPeopleForm.AGE = ''
      }
    },
    appraisedPeopleId(val) {
      if (val !== '0') {
        this.onload()
      }
    }
  },
  created() {
    // this.tokentest = clientGetToken()
    // var tokentest = this.tokentest
    // this.$store.commit('user/SET_TOKEN2', tokentest)
    this.onload()
  },
  methods: {
    validateIdCard(rule, value, callback) {
      if (value === '') {
        callback()
        return { 'status': 1, 'msg': '校验通过' }
      } else {
        return validateIdCard(rule, value, callback)
      }
    },
    onload() {
      // 重置表单
      if (this.$refs['appraisedPeopleForm'] !== undefined) {
        this.$refs['appraisedPeopleForm'].resetFields()
      }
      this.appraisedPeopleForm.WTID = this.entrustid
      if (this.isEdit) {
        this.appraisedPeopleForm.BJDRID = this.bjdrid
        this.getBjdrInfoByID()
      }
    },
    getBjdrInfoByID() {
      getBjdrInfoByID(this.bjdrid).then(res => {
        const appraisedPeopleInfo = res.data[0]
        this.appraisedPeopleForm.NAME = appraisedPeopleInfo.name
        this.appraisedPeopleForm.SFCODE = appraisedPeopleInfo.sfcode
        this.appraisedPeopleForm.SEX = parseInt(appraisedPeopleInfo.sex)
        this.appraisedPeopleForm.TELEPHONE = appraisedPeopleInfo.telephone
        this.appraisedPeopleForm.PROFESSION = appraisedPeopleInfo.profession
        this.appraisedPeopleForm.EDUCATION = appraisedPeopleInfo.education
        this.appraisedPeopleForm.NATIVE_PLACE = appraisedPeopleInfo.native_place
        this.appraisedPeopleForm.ADDRESS = appraisedPeopleInfo.address
        this.appraisedPeopleForm.WORK_ADDRESS = appraisedPeopleInfo.work_address
        this.appraisedPeopleForm.AGE = appraisedPeopleInfo.age
      })
    },
    handleSubmitButton() {
      if (this.flag === false) {
        this.$refs['appraisedPeopleForm'].validate((valid) => {
          if (valid) {
            this.flag = true
            if (this.isEdit) {
              this.submieDisabled = true
              updateAppraisedPeople(this.appraisedPeopleForm).then(response => {
                this.$message.success('修改成功')
                this.submieDisabled = false
                this.updateSuccessCallBack()
              })
            } else {
              this.submieDisabled = true
              addAppraisedPeople(this.appraisedPeopleForm).then(response => {
                this.$message.success('添加成功')
                this.submieDisabled = false
                this.updateSuccessCallBack()
              })
            }
          }
        })
      }
    },
    handleDeleteButton() {
      this.$confirm('是否要删除此检材持有人？', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.bjdrid) {
          deleteAppraisedPeople(this.bjdrid, this.entrustid).then(response => {
            this.$message.success('删除成功')
            this.updateSuccessCallBack()
          })
        }
      }).catch(() => {
        this.$message.info('已取消删除')
        this.cancelDeleteCallBack()
      })
    }
  }
}
</script>

<style scoped>
::v-deep .el-form-item {
  margin-bottom: 0px;
}
::v-deep .el-input__inner {
  font-size: 13px;
  height: 33px;
  line-height: 33px;
}
::v-deep .el-date-editor {
  width: 100%;
}
::v-deep .el-date-editor .el-input__inner {
  padding-right: 0;
}
::v-deep .phoneClass .el-input__inner {
  padding-left: 10px;
  padding-right: 0;
}
::v-deep .el-button {
  padding: 9px 20px;
  font-size: 13px;
}
</style>
<style>
.el-message-box {
  width: 90% !important;
}
</style>
