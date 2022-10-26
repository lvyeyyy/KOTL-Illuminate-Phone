<template>
  <div>
    <el-table
      v-loading="tableLoading"
      :data="paginatedPDFs"
      style="width: 100%"
      @row-click="rowClick"
    >
      <el-table-column
        prop="name"
        width="265"
      >
        <template slot-scope="scope">
          {{ `${scope.$index+1}.${scope.row.name}` }}
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="lookWs(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog
      v-if="phonePdfDialogVisible"
      fullscreen
      :visible.sync="phonePdfDialogVisible"
      width="100%"
      class="spedialog"
      :lock-scroll="false"
    >
      <PDFNew
        :pdf-url="pdfUrl"
        :select-data="paginatedPDFs"
      />
    </el-dialog> -->
  </div>
</template>

<script>
import { queryDocument } from '@/api/entrust'
// import PDFNew from '../WordButton/PDFNew.vue'

export default {
  name: 'PhonePDF',
  // components: { PDFNew },
  props: {
    entrustId: { type: String, required: true },
    jdzyId: { type: String, required: false, default: '2' }
  },
  data() {
    return {
      paginatedPDFs: [],
      mergePdfList: [],
      tableLoading: false,
      // phonePdfDialogVisible: false,
      pdfUrl: ''
    }
  },
  created() {
    this.serachWord()
  },
  mounted() {
    window.refresh = this.refresh
  },
  methods: {
    // 获得文书
    serachWord() {
      this.tableLoading = true
      this.paginatedPDFs = []
      let temp
      if (this.documentStep !== undefined) {
        temp = this.documentStep
      } else {
        temp = this.$store.getters.DOCUMENT_STEP.AUDIT
      }
      queryDocument(this.entrustId, temp).then(response => {
        if (response.data.length !== 0) {
          for (let i = 0; i < response.data.length; i++) {
            // 获得鉴定文书的wsid
            if (response.data[i].type === '鉴定文书') {
              this.$emit('child-event', response.data[i].wsid)
            }
            this.paginatedPDFs.push(response.data[i])
            this.mergePdfList.push(response.data[i])
          }
        }
        this.tableLoading = false
        // console.log('文书', this.paginatedPDFs)
      })
    },
    refresh() {
      this.serachWord()
    },
    // 查看文书
    lookWs(row) {
      // this.phonePdfDialogVisible = true
      // this.pdfUrl = row.url
      client.lookWsView(row.url, row.name)
    },
    rowClick(row, column, cell, event) {
      // client.lookWsView(row.url)
    }
  }
}
</script>

<style scoped
       lang="scss">
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
.el-image + .el-image {
  margin-left: 10px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
::v-deep th {
  padding-left: 10px;
  font-weight: normal;
}
::v-deep .el-table thead {
  display: none;
}
::v-deep .el-table__header {
  width: 350px;
}
::v-deep .el-table__row td {
  padding: 3px 0;
}
::v-deep .spedialog .el-dialog__body {
  padding: 0;
}
</style>

