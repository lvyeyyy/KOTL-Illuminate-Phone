<template>
  <div id="app">
    <el-row style="margin-top:10px">
      <el-col
        :span="2"
        style="margin:0 17px 0 10px"
      >
        <el-button
          style="width:100%"
          @click="upPage"
        >
          <i
            class="el-icon-arrow-left"
            style="margin-left:-7px"
          />
        </el-button>
      </el-col>
      <el-col :span="16">
        <el-select
          v-model="value"
          placeholder="请选择"
        >
          <el-option
            v-for="item in selectData"
            :key="item.wsid"
            :label="item.name"
            :value="item.wsid"
          />
        </el-select>
      </el-col>
      <el-col
        :span="2"
        style="margin-left:5px"
      >
        <el-button
          style="width:100%"
          @click="downPage"
        >
          <i
            class="el-icon-arrow-right"
            style="margin-left:-7px"
          />
        </el-button>
      </el-col>
    </el-row>
    <div id="demo" />
  </div>
</template>
<script>
import Pdfh5 from 'pdfh5'
import 'pdfh5/css/pdfh5.css'
export default {
  name: 'App',
  props: {
    pdfUrl: { type: String, required: true },
    selectData: { type: Array, required: true }
  },
  data() {
    return {
      pdfh5: null,
      propsUrl: '',
      value: ' ',
      temp: undefined
    }
  },
  watch: {
    value(val) {
      this.propsUrl = this.selectData.filter(item => item.wsid === val)[0].url
      this.pdfh5 = new Pdfh5('#demo', {
        zoomEnable: true,
        tapZoomFactor: 1.5,
        pdfurl: this.propsUrl
      })
    },
    temp(index) {
      this.value = this.selectData[index].wsid
    }
  },
  created() {
    this.propsUrl = this.pdfUrl
    this.value = this.selectData.filter(item => item.url === this.propsUrl)[0].wsid
  },
  mounted() {
    // 实例化
    this.pdfh5 = new Pdfh5('#demo', {
      zoomEnable: true,
      tapZoomFactor: 1.5,
      pdfurl: this.propsUrl// 这里就是pdf的路径
    })
    // 监听完成事件
    // this.pdfh5.on('complete', function (status, msg, time) {
    //   console.log('状态：' + status + '，信息：' + msg + '，耗时：' + time + '毫秒，总页数：' + this.totalNum)
    // })
  },
  methods: {
    // 上一份文书
    upPage() {
      this.temp = this.selectData.findIndex((item) => item.wsid === this.value)
      if (this.temp === 0) {
        this.$message.info('已是第一份文书！')
        this.temp = 0
      } else {
        this.temp--
      }
    },
    // 下一份文书
    downPage() {
      this.temp = this.selectData.findIndex((item) => item.wsid === this.value)
      if (this.temp === this.selectData.length - 1) {
        this.$message.info('已是最后一份文书！')
        this.temp = this.selectData.length - 1
      } else {
        this.temp++
      }
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  width: 100%;
}
</style>
