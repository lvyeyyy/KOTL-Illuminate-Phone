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
          style="height:100%"
        >
          <el-col
            :span="8"
            style="height:100%;text-align:left"
          >
            <el-button
              type="text"
              icon="el-icon-arrow-left"
              @click="backList"
            >上一步</el-button>
          </el-col>
          <el-col :span="8">确认委托信息</el-col>
          <el-col
            :span="8"
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
      ref="entrustForm"
      class="my-form"
      :model="entrustForm"
      :rules="rules"
      label-position="right"
      label-width="100px"
    >
      <el-row class="formStyle">
        <el-col :span="23">
          <el-form-item
            label="鉴定单位"
            prop="JDDW"
            style="margin-top:15px"
          >
            <el-cascader
              v-model="entrustForm.JDDW"
              :value="entrustForm.JDDW"
              :options="optionList.identificationWorkUnitOption"
              :show-all-levels="false"
              :props="{value:'xzdid',label:'xzdmc',emitPath:false}"
              style="width: 100%"
              placeholder="请选择鉴定单位名称"
              clearable
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.xzdmc }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="委托单位"
            prop="WTDW"
          >
            <el-cascader
              v-model="entrustForm.WTDW"
              :value="entrustForm.WTDW"
              :options="optionList.identificationWorkUnitOption"
              :show-all-levels="false"
              :props="{value:'xzdid',label:'xzdmc',emitPath:false}"
              style="width: 100%"
              placeholder="请选择委托单位名称"
              clearable
              @change="changeWTDW()"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.xzdmc }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="委托时间"
            prop="WTDATE"
          >
            <el-date-picker
              v-model="entrustForm.WTDATE"
              type="datetime"
              placeholder="选择委托时间"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="委托人一"
            prop="WT_OPERDM_ONE"
          >
            <UserSelect
              v-model="entrustForm.WT_OPERDM_ONE"
              :value="entrustForm.WT_OPERDM_ONE"
              user-label="委托人一"
              clearable
              :option-list="optionList.entrustPeopleOption"
              @on-value-change="val => entrustForm.WT_OPERDM_ONE = val"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="职务"
            prop="WTR1_ZW"
          >
            <el-select
              v-model="entrustForm.WTR1_ZW"
              :value="entrustForm.WTR1_ZW"
              clearable
              placeholder="请选择职务"
              style="width: 100%"
            >
              <el-option
                v-for="item in optionList.dutyList"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbmc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="证件类型"
            prop="WTR1_ZJLB"
          >
            <el-select
              v-model="entrustForm.WTR1_ZJLB"
              :value="entrustForm.WTR1_ZJLB"
              clearable
              placeholder="请选择证件类型"
              style="width: 100%"
            >
              <el-option
                v-for="item in optionList.zjlbList"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbmc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="证件号"
            prop="WTR1_ZJH"
          >
            <el-input
              v-model="entrustForm.WTR1_ZJH"
              :value="entrustForm.WTR1_ZJH"
              clearable
              placeholder="证件号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="联系电话"
            prop="WTR1_LXFS"
          >
            <el-input
              v-model="entrustForm.WTR1_LXFS"
              :value="entrustForm.WTR1_LXFS"
              clearable
              placeholder="联系电话"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="委托人二"
            prop="WT_OPERDM_TWO"
          >
            <UserSelect
              v-model="entrustForm.WT_OPERDM_TWO"
              :value="entrustForm.WT_OPERDM_TWO"
              user-label="委托人二"
              clearable
              :option-list="optionList.entrustPeopleOption"
              @on-value-change="val => entrustForm.WT_OPERDM_TWO = val"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="职务"
            prop="WTR2_ZW"
          >
            <el-select
              v-model="entrustForm.WTR2_ZW"
              :value="entrustForm.WTR2_ZW"
              clearable
              placeholder="请选择职务"
              style="width: 100%"
            >
              <el-option
                v-for="item in optionList.dutyList"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbmc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="证件类型"
            prop="WTR2_ZJLB"
          >
            <el-select
              v-model="entrustForm.WTR2_ZJLB"
              :value="entrustForm.WTR2_ZJLB"
              clearable
              placeholder="请选择证件类型"
              style="width: 100%"
            >
              <el-option
                v-for="item in optionList.zjlbList"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbmc"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="证件号"
            prop="WTR2_ZJH"
          >
            <el-input
              v-model="entrustForm.WTR2_ZJH"
              :value="entrustForm.WTR2_ZJH"
              clearable
              placeholder="证件号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="联系电话"
            prop="WTR2_LXFS"
          >
            <el-input
              v-model="entrustForm.WTR2_LXFS"
              :value="entrustForm.WTR2_LXFS"
              clearable
              placeholder="联系电话"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="鉴定专业"
            prop="JDZY"
          >
            <el-select
              v-model="entrustForm.JDZY"
              :value="entrustForm.JDZY"
              clearable
              disabled
              placeholder="请选择鉴定专业"
            >
              <el-option
                v-for="item of optionList.identificationTypeOption"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbid"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="鉴定类别"
            prop="JDLB"
          >
            <el-select
              v-model="entrustForm.JDLB"
              :value="entrustForm.JDLB"
              clearable
              placeholder="鉴定类别"
            >
              <el-option
                v-for="item of optionList.identificationCategoryOption"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbid"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="鉴定子类别"
            prop="JDPROJECT"
          >
            <el-select
              v-model="entrustForm.JDPROJECT"
              :value="entrustForm.JDPROJECT"
              clearable
              multiple
              collapse-tags
              placeholder="鉴定子类别"
            >
              <el-option
                v-for="item of optionList.identificationSubCategoryOption"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbid"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="鉴定要求"
            prop="JDYQ"
          >
            <el-select
              v-model="entrustForm.JDYQ"
              :value="entrustForm.JDYQ"
              placeholder="请选择方法检验要求"
              clearable
              multiple
              collapse-tags
            >
              <el-option
                v-for="item of optionList.requirementsOption"
                :key="item.lbid"
                :label="item.lbmc"
                :value="item.lbid"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="原鉴定情况"
            prop="JDACCOUNT"
          >
            <el-input
              v-model="entrustForm.JDACCOUNT"
              :value="entrustForm.JDACCOUNT"
              clearable
              placeholder="原鉴定情况"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出具告知单"
            prop="issueNotice"
          >
            <div>
              <el-switch
                v-model="entrustForm.issueNotice"
                :value="entrustForm.issueNotice"
                active-value="1"
                disabled
                inactive-value="0"
              />
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出具鉴定报告"
            prop="issueReport"
          >
            <el-switch
              v-model="entrustForm.issueReport"
              :value="entrustForm.issueReport"
              active-value="1"
              disabled
              inactive-value="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="23">
          <el-form-item
            label="鉴定方法"
            prop="JD_METHOD"
          >
            <el-select
              v-model="entrustForm.JD_METHOD"
              :value="entrustForm.JD_METHOD"
              clearable
            >
              <el-option
                label="使用鉴定中心推荐方法"
                value="1"
              />
              <el-option
                label="委托单位指定的方法"
                value="2"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          v-if="entrustForm.JD_METHOD==='2'"
          :span="23"
        >
          <el-form-item
            label="指定的方法"
            prop="ZD_METHOD"
          >
            <el-input
              v-model="entrustForm.ZD_METHOD"
              :value="entrustForm.ZD_METHOD"
              clearable
              placeholder="指定方法"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="btnRow">
        <el-col
          :span="24"
          style="text-align:center"
        >
          <el-button
            :disabled="submitDisabled"
            style="width:95%;"
            :type="submitButtonColor"
            @click="submitEntrustForm('entrustForm')"
          >{{ submitButtonText }}
            <i
              v-if="submitDisabled"
              class="el-icon-loading"
            />
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// function clientGetToken() {
//   //   return client.getToken()
//   return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3YW5nbWluIiwianRpIjoiNGY4ZWU2YjktZDllZi00NzcwLTk1OWMtYjdkOGQyNjM3YTdmIiwiaWF0IjoiMjAyMi8xMC8xMiA4OjQ0OjQxIiwibmFtZWlkIjoiNzc2IiwibmJmIjoxNjY1NTM1NDgxLCJleHAiOjE2NjU1MzcyODEsImlzcyI6Imp3dF91c2VyIiwiYXVkIjoiand0X2F1ZGllbmNlIn0.C-vJa4lWaxY5RLm_U1_g4q5LDfkEZKCCo9utgLugLSw'
// }
// function clientGetCaseId() {
//   // return client.getCaseid()
//   return '3284'
// }
// function clientGetWtId() {
//   // return client.getWtid()
//   return '3304'
// }

import { hasRoles, disabledDate } from '@/utils/tool'
import { getAllUnitSelectOption, getgroupuserbyzydw, getduty, getcardtype, getAllIdentificationTypeSelectOption, getAllJdLbByJdZy, getAllJdZLb, getIdentificationRequirementsList, getJdYq } from '@/api/selectOption'
import { getEntrustInfoByEntrustID, updateEntrust } from '@/api/entrust'
import UserSelect from '@/components/UserSelect/index'
export default {
  components: { UserSelect },
  props: {
    caseId: { type: String, default: '' },
    entrustId: { type: String, default: '' }
  },
  data() {
    return {
      // entrustId: '',
      // 委托表单
      entrustForm: {
        // 委托类型  (对应wt-tb表中ajtype字段 0代表其他专业委托，1代表dna专业案件委托，3代表dna失踪人口委托)
        AJTYPE: '',
        // 案件编号
        AJID: '',
        // 委托鉴定工作单位
        JDDW: '',
        // 委托单位
        WTDW: parseInt(this.$store.state.user.xzdid),
        // 委托时间
        WTDATE: new Date(),
        // 委托人1
        WT_OPERDM_ONE: hasRoles(this.$store.getters.ROLES_TYPE.ENTRUST_PERSON) ? this.$store.state.user.operdm : '',
        // 委托人2
        WT_OPERDM_TWO: '',
        // 鉴定专业
        JDZY: '',
        // 鉴定类别
        JDLB: '',
        // 鉴定子类别
        JDPROJECT: [],
        // 鉴定要求
        JDYQ: '',
        // 鉴定要求备注
        JDYQ_BZ: '提取和恢复数据',
        // 是否出具告知单
        issueNotice: '0',
        // 是否出具检验报告
        issueReport: '0',
        // 鉴定情况
        JDACCOUNT: '无',
        // 鉴定方法
        JD_METHOD: '1',
        // 指定方法
        ZD_METHOD: '',
        // 委托人1职务
        WTR1_ZW: '',
        // 委托人1证件类型
        WTR1_ZJLB: '',
        // 委托人1证件号
        WTR1_ZJH: '',
        // 委托人2职务
        WTR2_ZW: '',
        // 委托人2证件类型
        WTR2_ZJLB: '',
        // 委托人2证件号
        WTR2_ZJH: '',
        // 委托人1联系方式
        WTR1_LXFS: '',
        // 委托人2联系方式
        WTR2_LXFS: ''
      },
      rules: {
        AJTYPE: [{ required: true, message: '请选择委托类型', trigger: 'change' }],
        JDDW: [{ required: true, message: '请选择鉴定单位', trigger: 'change' }],
        WTDW: [{ required: true, message: '请选择委托单位', trigger: 'change' }],
        WTDATE: [{ type: 'date', required: true, message: '请选择委托时间', trigger: 'change' }],
        WT_OPERDM_ONE: [{ required: true, trigger: 'change' }],
        WT_OPERDM_TWO: [{ required: true, trigger: 'change' }],
        JDACCOUNT: [{ required: true, message: '请输入鉴定情况', trigger: 'change' }],
        JDZY: [{ required: true, message: '请选择鉴定专业', trigger: 'change' }],
        JDLB: [{ required: true, message: '请选择鉴定类别', trigger: 'change' }],
        JDPROJECT: [{ required: true, message: '请选择鉴定子类别', trigger: 'change' }],
        JDYQ: [{ required: true, message: '请输入鉴定要求', trigger: 'blur' }],
        JDYQ_BZ: [{ required: false, message: '请输入鉴定要求备注', trigger: 'blur' }],
        JD_METHOD: [{ required: true, message: '请选择鉴定方法', trigger: 'change' }],
        ZD_METHOD: [{ required: true, message: '请输入指定的方法', trigger: 'change' }],
        LD_OPINION: [{ required: false, message: '请输入委托单位领导意见', trigger: 'change' }]
      },
      optionList: {
        identificationWorkUnitOption: [],
        entrustPeopleOption: [],
        dutyList: [],
        zjlbList: [],
        identificationTypeOption: [],
        identificationCategoryOption: [],
        identificationSubCategoryOption: [],
        requirementsOption: []
      },
      pickerOptions: {
        disabledDate
      },
      submitDisabled: false,
      isSave: false,
      jdyqFlag: true
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
    // 鉴定类别改变时的监听事件
    'entrustForm.JDLB'(val) {
      this.entrustForm.JDPROJECT = []
      if (val !== '') {
        this.getAllIdentificationSubCategoryList(_ => {
        })
      }
    },
    // 鉴定子项目改变时的监听事件
    'entrustForm.JDPROJECT'(val) {
      this.entrustForm.JDYQ = ''
      if (this.jdyqFlag) {
        if (val.length > 0) {
          this.getIdentificationRequirements()
        }
      }
    },
    // 委托单位改变时的监听事件
    'entrustForm.WTDW'(val) {
      this.getEntrustPeopleList()
    },
    // 委托单位改变时的监听事件
    'entrustForm.WT_OPERDM_ONE'(val) {
      this.getInfo(val)
    },
    'entrustForm.WT_OPERDM_TWO'(val) {
      this.getInfoTwo(val)
    }
  },
  created() {
    // this.tokentest = clientGetToken()
    // var tokentest = this.tokentest
    // this.$store.commit('user/SET_TOKEN2', tokentest)
    this.entrustForm.AJID = this.caseId
    // this.entrustId = this.$route.query.entrustId
    this.entrustForm.JDDW = 5
    this.entrustForm.issueNotice = '1'
    this.entrustForm.issueReport = '1'
    this.getUnitList()
    this.getEntrustInfoByEntrustID()
    this.getduty()
    this.getcardtype()
    this.getAllIdentificationTypeList()
    this.getIdentificationRequirementsList()
  },
  methods: {
    // 根据委托编号获取委托详细信息
    getEntrustInfoByEntrustID() {
      getEntrustInfoByEntrustID(this.entrustId).then(response => {
        const entrustInfo = response.data[0]
        this.entrustForm.AJTYPE = entrustInfo.ajtype
        this.entrustForm.WTID = this.entrustId
        this.entrustForm.JDDW = parseInt(entrustInfo.jddw)
        this.entrustForm.WTDW = parseInt(entrustInfo.wtdw)
        this.entrustForm.WTDATE = new Date(entrustInfo.wtdate)
        this.entrustForm.WT_OPERDM_ONE = entrustInfo.wt_operdm_one
        this.entrustForm.WT_OPERDM_TWO = entrustInfo.wt_operdm_two
        this.entrustForm.JDZY = entrustInfo.jdzy
        this.$nextTick(_ => {
          this.jdyqFlag = false
          this.entrustForm.JDLB = entrustInfo.jdlb
          // this.getAllIdentificationSubCategoryList(_ => {
          // })
          this.$nextTick(_ => {
            this.entrustForm.JDPROJECT = entrustInfo.identification
            this.$nextTick(_ => {
              this.entrustForm.JDYQ = Array.from(new Set(entrustInfo.jdyq))
              this.jdyqFlag = true
            })
          })
        })
        this.entrustForm.issueNotice = entrustInfo.issuenotice
        this.entrustForm.issueReport = entrustInfo.issuereport
        this.entrustForm.JDACCOUNT = entrustInfo.jdaccount
        this.entrustForm.JD_METHOD = entrustInfo.jd_method
        this.entrustForm.JDYQ_BZ = entrustInfo.jdyq_bz
        this.$nextTick(_ => {
          this.entrustForm.ZD_METHOD = entrustInfo.zd_method
        })
        this.entrustForm.LD_OPINION = entrustInfo.ld_opinion
        this.entrustForm.WTR1_ZW = entrustInfo.wtr1_zw
        this.entrustForm.WTR1_ZJLB = entrustInfo.wtr1_zjlb
        this.entrustForm.WTR1_ZJH = entrustInfo.wtr1_zjh
        this.entrustForm.WTR2_ZW = entrustInfo.wtr2_zw
        this.entrustForm.WTR2_ZJLB = entrustInfo.wtr2_zjlb
        this.entrustForm.WTR2_ZJH = entrustInfo.wtr2_zjh
        this.entrustForm.WTR1_LXFS = entrustInfo.wtr1_lxfs
        this.entrustForm.WTR2_LXFS = entrustInfo.wtr2_lxfs
        this.getAllIdentificationCategoryList()
      })
    },
    // 获取单位下拉列表
    getUnitList() {
      getAllUnitSelectOption().then(response => {
        this.optionList.identificationWorkUnitOption = response.data
        this.getEntrustPeopleList()
      })
    },
    changeWTDW() {
      this.entrustForm.WT_OPERDM_ONE = ''
      this.entrustForm.WT_OPERDM_TWO = ''
      this.getEntrustPeopleList()
    },
    // 获取委托人员下拉列表
    getEntrustPeopleList() {
      getgroupuserbyzydw([this.$store.getters.ROLES_TYPE.ENTRUST_PERSON], '', this.entrustForm.WTDW).then(response => {
        this.optionList.entrustPeopleOption = response.data[0].users
        if (!this.entrustId) {
          this.getInfo(this.$store.state.user.operdm)
        }
      })
    },
    getInfo(val) {
      for (let i = 0; i <= this.optionList.entrustPeopleOption.length - 1; i++) {
        if (val === this.optionList.entrustPeopleOption[i].operdm) {
          if (this.optionList.dutyList.find(item => item.lbid === this.optionList.entrustPeopleOption[i].post)) {
            this.entrustForm.WTR1_ZW = this.optionList.dutyList.find(item => item.lbid === this.optionList.entrustPeopleOption[i].post).lbmc
          }
          if (this.optionList.zjlbList.find(item => item.lbid === this.optionList.entrustPeopleOption[i].zjlb)) {
            this.entrustForm.WTR1_ZJLB = this.optionList.zjlbList.find(item => item.lbid === this.optionList.entrustPeopleOption[i].zjlb).lbmc
          }
          this.entrustForm.WTR1_ZJH = this.optionList.entrustPeopleOption[i].zjh
          this.entrustForm.WTR1_LXFS = this.optionList.entrustPeopleOption[i].telephone
        }
      }
    },
    getInfoTwo(val) {
      for (let i = 0; i <= this.optionList.entrustPeopleOption.length - 1; i++) {
        if (val === this.optionList.entrustPeopleOption[i].operdm) {
          if (this.optionList.dutyList.find(item => item.lbid === this.optionList.entrustPeopleOption[i].post)) {
            this.entrustForm.WTR2_ZW = this.optionList.dutyList.find(item => item.lbid === this.optionList.entrustPeopleOption[i].post).lbmc
          }
          if (this.optionList.zjlbList.find(item => item.lbid === this.optionList.entrustPeopleOption[i].zjlb)) {
            this.entrustForm.WTR2_ZJLB = this.optionList.zjlbList.find(item => item.lbid === this.optionList.entrustPeopleOption[i].zjlb).lbmc
          }
          this.entrustForm.WTR2_ZJH = this.optionList.entrustPeopleOption[i].zjh
          this.entrustForm.WTR2_LXFS = this.optionList.entrustPeopleOption[i].telephone
        }
      }
    },
    // 获取职务下拉列表
    getduty() {
      getduty().then(response => {
        this.optionList.dutyList = response.data
      })
    },
    // 获取证件类型
    getcardtype() {
      getcardtype().then(response => {
        this.optionList.zjlbList = response.data
      })
    },
    // 获取鉴定专业下拉列表
    getAllIdentificationTypeList() {
      getAllIdentificationTypeSelectOption().then(response => {
        this.optionList.identificationTypeOption = response.data
      })
    },
    // 获取鉴定类别下拉列表
    getAllIdentificationCategoryList() {
      if (this.entrustForm.JDZY !== '') {
        getAllJdLbByJdZy(this.entrustForm.JDZY).then(response => {
          this.optionList.identificationCategoryOption = response.data
        })
      }
    },
    // 获取鉴定子类别下拉列表
    getAllIdentificationSubCategoryList(callback) {
      getAllJdZLb(this.entrustForm.JDLB).then(response => {
        this.optionList.identificationSubCategoryOption = response.data
        if (response.data.length === 1 && this.entrustForm.JDPROJECT.length === 0) {
          this.entrustForm.JDPROJECT.push(this.optionList.identificationSubCategoryOption[0].lbid)
        }
        callback()
      })
    },
    // 获取鉴定要求下拉列表
    getIdentificationRequirementsList() {
      getIdentificationRequirementsList().then(response => {
        this.optionList.requirementsOption = response.data
      })
    },
    // 提交表单
    submitEntrustForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.entrustForm.AJTYPE = '0'
          this.submitDisabled = true
          updateEntrust(this.entrustForm).then(response => {
            this.$message.success('修改成功')
            this.isSave = true
            this.submitDisabled = false
          }).catch(() => {
            this.$message.success('修改失败')
            this.isSave = false
            this.submitDisabled = false
          })
        } else {
          this.$message.error('请按照要求填写表单')
        }
      })
    },
    // 根据鉴定子项目获取鉴定要求
    getIdentificationRequirements() {
      this.entrustForm.JDYQ = []
      this.entrustForm.JDPROJECT.forEach(item => {
        getJdYq(item).then(response => {
          response.data.forEach(JDYQItem => {
            if (this.entrustForm.JDYQ.indexOf(JDYQItem.lbid) === -1) {
              this.entrustForm.JDYQ.push(JDYQItem.lbid)
            }
          })
        })
      })
    }
    // backList() {
    //   this.$router.go(-1)
    // },
    // goClick() {
    //   this.$router.push({ path: '/preaudit/bdjrinfo', query: { entrustId: this.$route.query.entrustId } })
    // }
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
.btnRow {
  position: fixed;
  bottom: 3%;
  width: 50% !important;
  z-index: 99;
}
.formStyle {
  height: 100%;
  overflow-y: scroll;
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
/* ::v-deep .el-form {
  margin-top: 40px;
} */
::v-deep .el-divider--horizontal {
  margin: 10px 0;
}
::v-deep .my-card .el-card__body {
  height: 100%;
}
::v-deep .el-button--text {
  margin-top: -10%;
}
.my-form {
  height: 100%;
  overflow-y: scroll;
  padding: 14% 0 17% 0;
}
::v-deep .el-button {
  padding: 9px 20px;
  font-size: 13px;
}
</style>
<style>
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
.el-date-editor {
  width: 100% !important;
}
.el-select-dropdown__item {
  font-size: 13px;
  height: 30px;
  line-height: 30px;
}
</style>
