<template>
  <el-form
    ref="sampleForm"
    :model="sampleForm"
    :rules="sampleRules"
    label-position="right"
    label-width="79px"
  >
    <el-row>
      <el-col :span="24">
        <el-form-item
          label="检材名称"
          prop="sampleName"
        >
          <el-input
            v-model="sampleForm.sampleName"
            :value="sampleForm.sampleName"
            clearable
            placeholder="名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="检材类型"
          prop="sampleType"
        >
          <el-select
            v-model="sampleForm.sampleType"
            :value="sampleForm.sampleType"
            clearable
            placeholder="类型"
          >
            <el-option
              v-for="option of optionList.sampleTypeOption"
              :key="option.lbid"
              :label="option.lbmc"
              :value="option.lbid"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="样本编号"
          prop="sampleNum"
        >
          <el-input
            v-model="sampleForm.sampleNum"
            :value="sampleForm.sampleNum"
            clearable
            disabled
            placeholder="样本编号"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="检材数量"
          prop="sampleSum"
        >
          <el-input
            v-model="sampleForm.sampleSum"
            :value="sampleForm.sampleSum"
            label="检材数量"
          >
            <el-select
              slot="append"
              v-model="sampleForm.sampleSumUnit"
              :value="sampleForm.sampleSumUnit"
              allow-create
              style="width: 130px"
              placeholder="请选择数量单位"
            >
              <el-option
                v-for="option of optionList.sumUnitOption"
                :key="option.lbmc"
                :label="option.lbmc"
                :value="option.lbmc"
              />
            </el-select>
          </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="检材性状"
          prop="sampleTraits"
        >
          <el-input
            v-model="sampleForm.sampleTraits"
            :value="sampleForm.sampleTraits"
            clearable
            placeholder="性状"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="被鉴定人"
          prop="appraisedPeople"
        >
          <el-select
            v-model="sampleForm.appraisedPeople"
            :value="sampleForm.appraisedPeople"
            clearable
            placeholder="被鉴定人"
          >
            <el-option
              v-for="option of optionList.appraisedPeopleOption"
              :key="option.bjdrid"
              :label="option.name"
              :value="option.bjdrid"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="检材包装"
          prop="samplePackagingMaterial"
        >
          <el-input
            v-model="sampleForm.samplePackagingMaterial"
            :value="sampleForm.samplePackagingMaterial"
            clearable
            placeholder="检材包装"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="检材提取方法"
          prop="sampleMethods"
          label-width="96px"
        >
          <el-input
            v-model="sampleForm.sampleMethods"
            :value="sampleForm.sampleMethods"
            clearable
            placeholder="检材提取方法"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="检材提取部位"
          prop="sampleParts"
          label-width="96px"
        >
          <el-input
            v-model="sampleForm.sampleParts"
            :value="sampleForm.sampleParts"
            clearable
            placeholder="检材提取部位"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="鉴定专业"
          prop="identificationType"
        >
          <el-select
            v-model="sampleForm.identificationType"
            :value="sampleForm.identificationType"
            clearable
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
      <el-col :span="24">
        <el-form-item
          label="鉴定类别"
          prop="identificationCategory"
        >
          <el-select
            v-model="sampleForm.identificationCategory"
            :value="sampleForm.identificationCategory"
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
      <el-col :span="24">
        <el-form-item
          label="鉴定子类别"
          prop="identificationSubCategory"
          label-width="93px"
        >
          <el-select
            v-model="sampleForm.identificationSubCategory"
            :value="sampleForm.identificationSubCategory"
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
      <el-col :span="24">
        <el-form-item
          label="鉴定要求"
          prop="identificationRequirements"
        >
          <el-select
            v-model="sampleForm.identificationRequirements"
            :value="sampleForm.identificationRequirements"
            placeholder="请选择鉴定要求"
            collapse-tags
            clearable
            multiple
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
      <el-col :span="24">
        <el-form-item
          label="检材备注"
          prop="sampleRemark"
        >
          <el-input
            v-model="sampleForm.sampleRemark"
            :value="sampleForm.sampleRemark"
            clearable
            placeholder="检材备注"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="委托描述是否一致"
          prop="WTMS"
          label-width="125px"
        >
          <el-select
            v-model="sampleForm.WTMS"
            :value="sampleForm.WTMS"
            placeholder="委托描述是否一致"
          >
            <el-option
              v-for="item of optionList.WTMSList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="检材是否已由相关专业检验或预处理"
          prop="JCYCL"
          label-width="236px"
        >
          <el-select
            v-model="sampleForm.JCYCL"
            :value="sampleForm.JCYCL"
            placeholder="检材是否已由相关专业检验或预处理"
          >
            <el-option
              v-for="item of optionList.JCYCLList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="检材外包装情况"
          prop="BZQK"
          label-width="110px"
        >
          <el-select
            v-model="sampleForm.BZQK"
            :value="sampleForm.BZQK"
            placeholder="检材外包装情况"
          >
            <el-option
              v-for="item of optionList.BZQKList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="提取日期"
          prop="tq_date"
        >
          <el-date-picker
            v-model="sampleForm.tq_date"
            class="dataPicker"
            type="date"
            placeholder="选择日期时间"
            :picker-options="pickerOptions"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="是否备样"
          prop="isyb"
        >
          <el-switch
            v-model="sampleForm.isyb"
            :value="sampleForm.isyb"
            active-value="99"
            inactive-value="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="检材图片"
          prop="sampleImages"
        >
          <el-upload
            :action="uploadImgUrl"
            list-type="picture-card"
            :headers="uploadHeaders"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleUploadSuccess"
            :file-list="sampleForm.sampleImages"
          >
            <i class="el-icon-plus">上传</i>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      style="margin-top:5px"
    >
      <el-col :span="12">
        <el-button
          v-if="isEdit"
          type="danger"
          style="width:100%"
          :disabled="isclick"
          @click="handleDeleteButton"
        >删除
        </el-button>
        <el-button
          v-if="!isEdit"
          type="info"
          @click="importYcMb"
        >导入乙醇定性定量模板
        </el-button>
      </el-col>
      <el-col
        :span="isEdit?12:10"
        style="float:right"
      >
        <el-button
          type="primary"
          style="width:100%;"
          :disabled="(isclick&&submitButtonText==='修改')||submieDisabled"
          :loading="loading"
          @click="handleSubmitButton"
        >{{ submitButtonText }}
        </el-button>
      </el-col>
    </el-row>
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
      width="90%"
    >
      <img
        width="100%"
        :src="previewPictureUrl"
        alt=""
      >
    </el-dialog>
  </el-form>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getAppraisedPeopleListByEntrustID, getSampleInfoBySampleID, getEntrustInfoByEntrustID, getAcceptInfoByEntrustId, deleteSample, updateSample, addSample } from '@/api/entrust'
import { getAllIdentificationTypeSelectOption, getIdentificationRequirementsList, getNumberUnitSelectOption, getAllSampleTypeSelectOption, getAllJdLbByJdZy, getAllJdZLb } from '@/api/selectOption'
export default {
  props: {
    entrustId: { type: String, require: true, default: '' },
    sampleId: { type: String, require: true, default: '' },
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
    const validateCheckSampleSum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入样品数量'))
      } else if (this.sampleForm.sampleSumUnit === '') {
        callback(new Error('请选择样品数量单位'))
      } else {
        callback()
      }
    }
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
      ACCEPTSTATUS: undefined,
      value3: '',
      jdyqFlag: true,
      submieDisabled: false,
      uploadImgUrl: window.api.VUE_APP_IP + window.api.VUE_APP_BASE_API + '/jcYbHandler/uploadYbImage',
      // 由于上传图片不使用通用的 request，所以需要单独拼一下 Headers
      uploadHeaders: { Authorization: getToken() },
      dialogCameraVisible: false,
      dialogVisible: false,
      previewPictureUrl: '',
      identificationRequirementsList: [],
      sampleForm: {
        // 委托
        entrustId: '',
        // 检材名称
        sampleName: '',
        // 检材样本编号
        sampleNum: '',
        // 检材数量
        sampleSum: '',
        // 检材数量单位
        sampleSumUnit: '',
        // 检材性状
        sampleTraits: '',
        // 检材包装
        samplePackagingMaterial: '',
        // 检材提取部位
        sampleParts: '',
        // 检材提取方法
        sampleMethods: '',
        // 检材类型
        sampleType: '',
        // 被鉴定人
        appraisedPeople: '',
        // 检材备注
        sampleRemark: '',
        // 鉴定专业
        identificationType: '',
        // 鉴定类别
        identificationCategory: '',
        // 鉴定子类别
        identificationSubCategory: [],
        // 鉴定要求
        identificationRequirements: '',
        // 检材图片
        sampleImages: [],
        // 图片类型（0：为普通检材图片）
        sampleImgType: 0,
        // 检材提取日期
        tq_date: undefined,
        // 是否备样
        isyb: '0',
        // 委托描述是否一致
        WTMS: 1,
        // 检材是否已由相关专业检验或预处理
        JCYCL: 0,
        // 检材外包装情况
        BZQK: 0
      },
      sampleRules: {
        sampleName: [{ required: true, message: ' ', trigger: 'change' }],
        // sampleSum: [{ required: true, message: '请输入样品数量', trigger: 'change' }],
        sampleSum: [{ required: true, trigger: 'blur', validator: validateCheckSampleSum }],
        sampleTraits: [{ required: false, message: ' ', trigger: 'change' }],
        samplePackagingMaterial: [{ required: true, message: ' ', trigger: 'change' }],
        sampleParts: [{ required: false, message: ' ', trigger: 'change' }],
        sampleMethods: [{ required: false, message: ' ', trigger: 'change' }],
        sampleType: [{ required: false, message: ' ', trigger: 'change' }],
        identificationType: [{ required: true, message: ' ', trigger: 'change' }],
        identificationCategory: [{ required: true, message: ' ', trigger: 'change' }],
        identificationSubCategory: [{ required: true, message: ' ', trigger: 'change' }],
        identificationRequirements: [{ required: true, message: ' ', trigger: 'change' }],
        tq_date: [{ required: true, message: ' ', trigger: 'change' }]
      },
      optionList: {
        sampleTypeOption: [],
        appraisedPeopleOption: [],
        // 鉴定专业下拉选项
        identificationTypeOption: [],
        // 鉴定类别下拉选项
        identificationCategoryOption: [],
        // 鉴定子类别下拉选项
        identificationSubCategoryOption: [],
        // 鉴定
        identificationOption: [],
        sumUnitOption: [],
        requirementsOption: [],
        WTMSList: [
          {
            label: '否',
            value: 0
          }, {
            label: '是',
            value: 1
          }
        ],
        JCYCLList: [
          {
            label: '否',
            value: 0
          }, {
            label: '是',
            value: 1
          }
        ],
        BZQKList: [
          {
            label: '包装完好',
            value: 0
          }, {
            label: '未密封',
            value: 1
          }, {
            label: '破损',
            value: 2
          }
        ]
      },
      flag: false,
      isclick: true,
      loading: false
    }
  },
  computed: {
    isEdit() {
      return this.sampleId !== ''
    },
    submitButtonText() {
      return this.isEdit ? '修改' : '添加'
    }
  },
  watch: {
    entrustId() {
      this.onload()
    },
    sampleId(val) {
      if (val !== '0') {
        this.onload()
      }
    },
    // 鉴定专业改变时的监听事件
    'sampleForm.identificationType'(val) {
      this.sampleForm.identificationCategory = ''
      if (val !== '') {
        this.getAllIdentificationCategoryList()
        this.getAllSampleTypeList(() => { })
      }
    },
    // 鉴定类别改变时的监听事件
    'sampleForm.identificationCategory'(val) {
      this.sampleForm.identificationSubCategory = ''
      if (val !== '') {
        this.getAllIdentificationSubCategoryList()
      }
    },
    // 鉴定子项目改变时的监听事件
    'sampleForm.identificationSubCategory'(val) {
      this.sampleForm.identificationRequirements = ''
      this.identificationRequirementsList = []
      if (this.jdyqFlag) {
        if (val.length > 0) {
          this.getIdentificationRequirements()
        }
      }
    },
    // 检材单位改变时的监听事件
    'sampleForm.sampleSumUnit'(val) {
      if (val === '份') {
        this.sampleForm.sampleSum = this.sampleForm.sampleSum.replace('约', '')
      }
    }
  },
  created() {
    this.sampleForm.sampleName = '血液'
    this.sampleForm.sampleSum = '约1'
    this.sampleForm.samplePackagingMaterial = '试管密封包装'
    // 获取鉴定专业选项
    this.getAllIdentificationTypeList()
    // 获取鉴定要求列表
    getIdentificationRequirementsList().then(response => {
      this.optionList.requirementsOption = response.data
    })
    this.getNumberUnitList()
    this.getAllSampleTypeList(() => {
      this.onload()
    })
    this.getAcceptInfoByEntrustId()
  },
  methods: {
    onload() {
      this.$refs['sampleForm'].resetFields()
      this.sampleForm.sampleImages = []
      getAppraisedPeopleListByEntrustID(this.entrustId || this.sampleForm.entrustId).then(response => {
        this.optionList.appraisedPeopleOption = response.data
      })
      // 如果是修改状态，那就获取原数据
      if (this.isEdit) {
        getSampleInfoBySampleID(this.sampleId).then(response => {
          const sampleInfo = response.data[0]
          this.sampleForm.entrustId = ''
          this.sampleForm.sampleName = sampleInfo.name
          this.sampleForm.sampleNum = sampleInfo.jcybbh
          this.sampleForm.tq_date = sampleInfo.tq_date
          // this.sampleForm.sampleSum = parseInt(sampleInfo.tq_number)
          this.sampleForm.sampleSum = sampleInfo.tq_number
          this.sampleForm.sampleSumUnit = sampleInfo.quantity_unit
          this.sampleForm.sampleTraits = sampleInfo.jcybxz
          this.sampleForm.samplePackagingMaterial = sampleInfo.packing
          this.sampleForm.sampleParts = sampleInfo.tq_position
          this.sampleForm.sampleMethods = sampleInfo.tq_method
          this.sampleForm.sampleType = sampleInfo.yblx
          this.sampleForm.sampleRemark = sampleInfo.remarks
          this.sampleForm.appraisedPeople = sampleInfo.bjdrid
          this.sampleForm.sampleImages = sampleInfo.images.filter(img => img.imgtype === '1')
          this.sampleForm.identificationType = sampleInfo.jdzy
          this.sampleForm.isyb = sampleInfo.isyb
          this.sampleForm.WTMS = parseInt(sampleInfo.wtms)
          this.sampleForm.JCYCL = parseInt(sampleInfo.jcycl)
          this.sampleForm.BZQK = parseInt(sampleInfo.bzqk)
          this.$nextTick(_ => {
            this.sampleForm.identificationCategory = sampleInfo.jdlb
            this.$nextTick(_ => {
              this.jdyqFlag = false
              this.sampleForm.identificationSubCategory = sampleInfo.identification
              this.$nextTick(_ => {
                this.sampleForm.identificationRequirements = Array.from(new Set(sampleInfo.jdyq))
                this.jdyqFlag = true
              })
            })
          })
        })
      } else {
        this.getEntrustInfo()
      }
    },
    getEntrustInfo() {
      getEntrustInfoByEntrustID(this.entrustId).then(response => {
        if (response.data.length !== 0) {
          this.sampleForm.identificationType = response.data[0].jdzy
          this.$nextTick(_ => {
            this.sampleForm.identificationCategory = response.data[0].jdlb
            this.$nextTick(_ => {
              this.jdyqFlag = false
              this.sampleForm.identificationSubCategory = response.data[0].identification
              this.$nextTick(_ => {
                this.sampleForm.identificationRequirements = response.data[0].jdyq
                this.jdyqFlag = true
              })
            })
          })
        }
      })
    },
    // 获取鉴定专业下拉列表
    getAllIdentificationTypeList() {
      getAllIdentificationTypeSelectOption().then(response => {
        this.optionList.identificationTypeOption = response.data
      })
    },
    // 获取数量单位列表
    getNumberUnitList() {
      getNumberUnitSelectOption().then(response => {
        this.optionList.sumUnitOption = response.data
      })
    },
    // 获取检材类别下拉列表
    getAllSampleTypeList(callBack) {
      getAllSampleTypeSelectOption(this.sampleForm.identificationType).then(response => {
        this.optionList.sampleTypeOption = response.data
        callBack()
      })
    },
    // 根据委托ID获取受理信息
    getAcceptInfoByEntrustId() {
      getAcceptInfoByEntrustId(this.entrustId).then(response => {
        this.ACCEPTSTATUS = response.data[0].acceptstatus
        this.handleClick()
      })
    },
    // 获取鉴定类别下拉列表
    getAllIdentificationCategoryList() {
      getAllJdLbByJdZy(this.sampleForm.identificationType).then(response => {
        this.optionList.identificationCategoryOption = response.data
      })
    },
    // 获取鉴定子类别下拉列表
    getAllIdentificationSubCategoryList() {
      getAllJdZLb(this.sampleForm.identificationCategory).then(response => {
        this.optionList.identificationSubCategoryOption = response.data
      })
    },
    handlePictureCardPreview(file) {
      this.previewPictureUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      this.sampleForm.sampleImages.splice(this.sampleForm.sampleImages.indexOf(file), 1)
    },
    // 上传图片成功后的事件
    handleUploadSuccess(response, file, fileList) {
      this.sampleForm.sampleImages.push(response.data)
      // this.$message('请点击修改按钮才可保存检材照片！')
      this.$alert('请点击修改按钮才可保存检材照片！', '提示', {
        confirmButtonText: '确定'
      })
    },
    handleDeleteButton() {
      this.$confirm('是否要删除此样本？', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.sampleId) {
          deleteSample(this.sampleId, this.entrustId).then(response => {
            this.$message.success('删除成功')
            this.updateSuccessCallBack()
          })
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    // 导入乙醇定性定量模板
    importYcMb() {
      this.sampleForm.samplePackagingMaterial = '外用专用信封封装'
      this.sampleForm.sampleMethods = '医用抗凝管提取'
      this.sampleForm.sampleName = 'XXX的血液一支'
      this.sampleForm.sampleSum = '约5'
      this.sampleForm.sampleSumUnit = 'mL'
      this.sampleForm.sampleType = this.optionList.sampleTypeOption.find(item => item.lbmc === '血液').lbid
    },
    // 提交检材点击事件
    handleSubmitButton() {
      if (this.flag === false) {
        this.$refs['sampleForm'].validate((valid) => {
          if (valid) {
            this.flag = true
            const sampleInfo = {
              JCYBID: this.sampleId,
              WTID: this.entrustId || this.sampleForm.entrustId,
              NAME: this.sampleForm.sampleName,
              // TQ_NUMBER: this.sampleForm.sampleSum.replace(/约/g, ''),
              TQ_NUMBER: this.sampleForm.sampleSum,
              QUANTITY_UNIT: this.sampleForm.sampleSumUnit,
              JCYBXZ: this.sampleForm.sampleTraits,
              TQ_DATE: this.sampleForm.tq_date,
              PACKING: this.sampleForm.samplePackagingMaterial,
              TQ_POSITION: this.sampleForm.sampleParts,
              TQ_METHOD: this.sampleForm.sampleMethods,
              YBLX: this.sampleForm.sampleType,
              BJDRID: this.sampleForm.appraisedPeople,
              REMARKS: this.sampleForm.sampleRemark,
              IMAGEKEYS: this.sampleForm.sampleImages,
              IMGTYPE: this.sampleForm.sampleImgType,
              JDZY: this.sampleForm.identificationType,
              JDLB: this.sampleForm.identificationCategory,
              identificationSubCategory: this.sampleForm.identificationSubCategory,
              identificationRequirements: this.sampleForm.identificationRequirements,
              isyb: this.sampleForm.isyb,
              WTMS: this.sampleForm.WTMS,
              JCYCL: this.sampleForm.JCYCL,
              BZQK: this.sampleForm.BZQK
            }
            // if (sampleInfo.TQ_NUMBER.slice(0, 1) !== '约') {
            //   sampleInfo.TQ_NUMBER = '约' + sampleInfo.TQ_NUMBER
            // }
            this.loading = true
            this.submieDisabled = true
            if (this.isEdit) {
              updateSample(sampleInfo).then(response => {
                this.submieDisabled = false
                this.loading = false
                this.$message.success('修改成功')
                this.updateSuccessCallBack(response)
              }).catch((e) => {
                this.submieDisabled = false
                this.loading = false
                this.$message.error('修改失败')
                this.cancelDeleteCallBack(e)
              })
            } else {
              addSample(sampleInfo).then(response => {
                this.submieDisabled = false
                this.loading = false
                this.$message.success('添加成功')
                this.updateSuccessCallBack(response)
              }).catch((e) => {
                this.submieDisabled = false
                this.loading = false
                this.$message.error('添加失败')
                this.cancelDeleteCallBack(e)
              })
            }
          }
        })
      }
    },
    handleClick() {
      if (this.isdisabled === false || this.ACCEPTSTATUS === 0) {
        this.isclick = false
      } else {
        if (this.ACCEPTSTATUS !== 0) {
          this.isclick = true
        }
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
::v-deep .el-input--suffix .el-input__inner {
  padding-right: 0;
}
::v-deep .el-input__inner {
  padding: 0 15px;
}
::v-deep .dataPicker .el-input__inner {
  padding: 0 25px;
}
::v-deep .el-input-group__append .el-input__inner {
  padding: 0;
}
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-input-group__append .el-select {
  width: 86px !important;
  font-size: 12px;
}
/* ::v-deep .el-input-group--append .el-input__inner {
  width: 44px;
} */
::v-deep .el-upload--picture-card {
  width: 126px;
  height: 126px;
}
</style>
<style>
.el-message-box {
  width: 90% !important;
}
.el-select-dropdown {
  width: 90% !important;
}
.el-picker-panel__sidebar {
  display: none;
}
.el-picker-panel {
  left: 0 !important;
  width: 90% !important;
}
.el-picker-panel__body {
  margin-left: 0 !important;
}
.el-dialog__headerbtn {
  top: 1%;
  font-size: 23px;
}
.el-upload--picture-card {
  display: none;
}
</style>
