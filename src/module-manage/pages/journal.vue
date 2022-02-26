<template>
  <el-card class="box-card">
    <el-alert title="共10条记录" type="info" :closable="false" show-icon>
    </el-alert>
    <el-table :data="tableData" style="width: 100%; margin-top: 15px">
      <el-table-column prop="type" label="操作类型"> </el-table-column>
      <el-table-column prop="author" label="操作人"> </el-table-column>
      <el-table-column prop="title" label="执行结果"> </el-table-column>
      <el-table-column prop="display_time" label="操作时间"> </el-table-column>
      <el-table-column prop="forecast" label="描述"> </el-table-column>
    </el-table>

    <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2]"
      :page-size="2"
      background
      layout=" prev, pager, next,sizes,jumper"
      :total="10"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      queryList: {
        page: 1,
        pagesize: 2
      },
      tableData: [],
      oldTableData: [
        {
          type: 'CN',
          author: '吕刚',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        },
        {
          type: 'CN',
          author: '鲁智深',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        },
        {
          type: 'CN',
          author: '大头',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        },
        {
          type: 'CN',
          author: '有大头',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        },
        {
          type: 'CN',
          author: '张三',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        },
        {
          type: 'CN',
          author: '李四',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        },
        {
          type: 'CN',
          author: '王五',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        },
        {
          type: 'CN',
          author: '赵六',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        },
        {
          type: 'EG',
          author: '孙七',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        },
        {
          type: 'CN',
          author: '小八',
          title: '改造支空传给外深专四日应先角它那。',
          display_time: '1983-12-12 18:26:08',
          forecast: '48.92'
        }
      ]
    }
  },

  created () {
    this.tableData = this.oldTableData.slice(0, 2)
  },

  methods: {
    handleSizeChange (newSize) {
      this.tableData = this.oldTableData.slice(newSize * 2 - 2, newSize * 2)
    },
    handleCurrentChange (newPage) {
      this.tableData = this.oldTableData.slice(newPage * 2 - 2, newPage * 2)
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin: 20px;
}
.el-table th.is-leaf {
  background: #e8e8e8;
}
</style>
