<template>
  <div>
    <div v-if="!isFourAuditor">
      <el-row :gutter="20">
        <el-col :span="24">
          <canvas id="canvas" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-button
            size="mini"
            type="danger"
            @click="draw.clear()"
          >重写
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button
            size="mini"
            type="primary"
            @click="save"
          >保存
          </el-button>
        </el-col>
        <el-col :span="10">
          <el-button
            size="mini"
            type="info"
            @click="signaturePhoto"
          >使用签字图片
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div v-if="isFourAuditor">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-input
            v-model="pin"
            placeholder="请输入PIN码"
          />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button
            type="primary"
            @click="save"
          >确定
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Draw from './Draw'
import { getStampImg, initAppUserNegotiate, checkAppUserInited, signPdfPretreatment } from '../../api/pdf'
export default {
  name: 'Signature',
  props: {
    jdzyId: { type: String, required: false, default: '2' },
    isFourAuditor: { type: Boolean, default: false },
    signpicture: { type: String, default: '' }
  },
  data() {
    return {
      pin: undefined,
      imageUrl: undefined,
      canvas: undefined,
      draw: undefined,
      point: {}
    }
  },
  watch: {
    jdzyId(newVal, oldVal) {
      return newVal
    }
  },
  mounted() {
    // 笔签
    this.init(true)
    // 鼠标签
    // this.init(false)
  },
  created() {
    this.isFourAuditor = false
    if (this.isFourAuditor) {
      checkAppUserInited()
      getStampImg().then(response => {
        if (response.code === 100) {
          if (response.data.indexOf('data:image/png;base64,') !== 0) {
            this.imageUrl = 'data:image/png;base64,' + response.data
          } else {
            this.imageUrl = response.data
          }
        } else {
          this.$message.warning('获取印章图片失败。')
        }
      })
    }
  },
  methods: {
    init(isMobile) {
      this.canvas = document.getElementById('canvas')
      this.draw = new Draw(this.canvas, 0, isMobile)
    },
    save() {
      if (this.isFourAuditor) {
        signPdfPretreatment(this.pin).then(response => {
          this.$emit('on-save', this.draw.dataURLtoBlob(this.imageUrl))
        })
      } else {
        this.$emit('on-save', this.draw.dataURLtoBlob(this.draw.getPNGImage()))
      }
    },
    signaturePhoto() {
      // this.$confirm('此操作将使用系统中个人中心的签字图片, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      if (this.signpicture === '' || this.signpicture === undefined) {
        this.$message.info('个人中心中没有签字图片，请先上传！')
      } else {
        this.$emit('on-picture', true)
      }
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消'
      //   })
      // })
    },
    checkAppUserInited() {
      return new Promise((resolve, reject) => {
        checkAppUserInited().then(response => {
          if (response.code === 100) {
            if (response.data) {
              // 已经初始化
              resolve()
            } else {
              // 未初始化，开始初始化
              this.$prompt('请输入 Pin 码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(({ value }) => {
                initAppUserNegotiate(value).then(response => {
                  resolve()
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消输入'
                })
              })
            }
          } else {
            this.$message.error(response.errMsg)
            reject()
          }
        })
      })
    }
  }
}
</script>

<style scoped
       lang="scss">
canvas {
  border: 2px dashed #d3d3d3;
  width: 100% !important;
  height: 200px !important;
}

.el-button {
  width: 100%;
  height: 34px;
}

.el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}
.el-message-box {
  width: 100%;
}
</style>
