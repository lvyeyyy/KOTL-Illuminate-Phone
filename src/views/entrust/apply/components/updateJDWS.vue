<template>
  <div>
    <el-tag
      v-for="(pdf, index) in paginatedPDFs"
      :key="index"
      style="margin:3px 0 0 3px"
      :effect="changeTagEffect(index)"
      @click="tagClick(index)"
    >{{ (index+1)+'.'+pdf.name }}</el-tag>
    <el-row style="height:calc(100vh - 155px);overflow-y:scroll">
      <!-- <div id="pdfdemo" /> -->
      <Pdf
        v-for="i in numPages"
        :key="i"
        :src="pdfList"
        :page="i"
        style="margin-top:3px;box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);"
      />
    </el-row>
  </div>
</template>

<script>
import { modifyapproval } from '../../../../api/word'
// import Pdfh5 from 'pdfh5'
// import 'pdfh5/css/pdfh5.css'
import Pdf from 'vue-pdf'

export default {
  components: { Pdf },
  props: {
    row: { type: Object, required: true }
  },
  data: function () {
    return {
      loading: true,
      paginatedPDFs: [],
      // pdfh5: null,
      currentIndex: 0,
      pdfList: '',
      numPages: 1
    }
  },
  created() {
    this.modifyapproval()
  },
  mounted() {
    window.refresh = this.refresh
  },
  methods: {
    modifyapproval: function () {
      this.loading = true
      this.paginatedPDFs = []
      modifyapproval(this.row.id).then(Response => {
        this.paginatedPDFs = Response.data
        this.pdfList = this.paginatedPDFs[0].wslj
        console.log(this.pdfList)
        const src = Pdf.createLoadingTask(this.pdfList)
        src.promise.then(pdf => {
          this.numPages = pdf.numPages
          // console.log(pdf.numPages)
        })
        // this.$nextTick(() => {
        //   //  实例化
        //   this.pdfh5 = new Pdfh5('#pdfdemo', {
        //     zoomEnable: true,
        //     tapZoomFactor: 1.5,
        //     pdfurl: this.paginatedPDFs[0].wslj// 这里就是pdf的路径
        //   })
        // })
        this.loading = false
      })
    },
    tagClick(index) {
      this.pdfList = this.paginatedPDFs[index].wslj
      const src = Pdf.createLoadingTask(this.pdfList)
      src.promise.then(pdf => {
        this.numPages = pdf.numPages
      })
      // //  实例化
      // this.pdfh5 = new Pdfh5('#pdfdemo', {
      //   zoomEnable: true,
      //   tapZoomFactor: 1.5,
      //   pdfurl: this.paginatedPDFs[index].wslj// 这里就是pdf的路径
      // })
      this.currentIndex = index
    },
    changeTagEffect(index) {
      if (index === this.currentIndex) {
        return 'dark'
      } else {
        return 'light'
      }
    },
    refresh() {
      this.modifyapproval()
    }
  }
}
</script>

<style>
</style>
