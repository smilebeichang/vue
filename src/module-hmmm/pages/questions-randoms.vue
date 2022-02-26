<template>
  <div>
    <el-card class="card">
      <!-- 上部搜索 -->
      <el-row type="flex" justify="start">
        <!-- 关键字输入框 -->
        <el-col :span="20">
          <el-form label-width="80px">
            <el-form-item label="关键字">
              <el-input
                style="width: 240px"
                placeholder="根据编号搜索"
                v-model="keyword"
                @keyup.enter.native="getInput"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <el-button @click="clearInput">清除</el-button>
            <el-button type="primary" @click="getInput">搜索</el-button>
          </el-row>
        </el-col>
      </el-row>
      <!-- 中间警告栏 -->
      <el-alert type="info" :closable="false" style="heigth: 20px" show-icon
        >数据一共{{ total }}条</el-alert
      >
      <!-- table表格区域 -->
      <el-table :data="tableData" style="width: 100%" class="elTable">
        <el-table-column prop="id" label="编号" width="220"> </el-table-column>
        <el-table-column label="题型" width="60" prop="questionType">
        </el-table-column>
        <el-table-column label="题目编号" width="200" prop="questionIDs">
          <template v-slot="{ row }">
            <div v-for="(item, index) in row.questionIDs" :key="index">
              <p @click="tiaozhuan(item.id)" class="ptiao">{{ item.number }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="录入时间" width="200" prop="addTime">
        </el-table-column>
        <el-table-column label="答题时间(s)" width="300" prop="totalSeconds">
        </el-table-column>
        <el-table-column label="正确率(%)" width="300" prop="accuracyRate">
        </el-table-column>
        <el-table-column label="录入人" width="300" prop="userName">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="{ row }"
            ><el-button
              type="danger"
              :plain="true"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="removeRandoms(row)"
            ></el-button
          ></template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-row type="flex" justify="end" class="fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout=" total, prev, pager, next, sizes,jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- <el-dialog :visible="showDialog" title="题目预览" width="60%">

    </el-dialog> -->
    <questionPrev
      :questionItem="questionItem"
      :dialogVisible="dialogVisible"
      @close="dialogVisible = false"
    ></questionPrev>
  </div>
</template>

<script>
import { randoms, removeRandoms, detail } from '../../api/hmmm/questions'
import questionPrev from '../components/questions-prev.vue'

export default {
  components: { questionPrev },
  data () {
    return {
      questionItem: {},
      dialogVisible: false,
      page: 1,
      pagesize: 10,
      tableData: [],
      total: 0,
      keyword: ''
    }
  },
  created () {
    this.randoms()
  },
  methods: {
    handleSizeChange (pagesize) {
      console.log(pagesize)
      this.pagesize = pagesize
    },
    handleCurrentChange (page) {
      console.log(page)
      this.page = page // 将当前页码赋值给当前的最新的页码
      this.randoms()
    },
    // 主题列表获取
    async randoms () {
      const { data } = await randoms({
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.keyword
      })
      console.log(data)
      this.tableData = data.items
      this.total = data.counts
      this.tableData.map(function (val) {
        // console.log(val)
        if (val.questionType === '2') {
          val.questionType = '多选'
        } else if (val.questionType === '3') {
          val.questionType = '简答'
        } else if (val.questionType === '1') {
          val.questionType = '单选'
        }
      })
    },
    // 删除列表数据
    async removeRandoms (data) {
      try {
        await this.$confirm('确定删除列表数据')
        const newData = await removeRandoms(data)
        console.log(newData, 111111)
        this.randoms()
        this.$message.success('删除数据成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 获取输入框内容
    getInput () {
      console.log(this.keyword)
      this.randoms()
      this.keyword = ''
    },
    // 清除输入框内容
    clearInput () {
      this.keyword = ''
    },
    // 链接跳转
    async tiaozhuan (id) {
      try {
        const { data } = await detail({ id })
        console.log(data)
        this.questionItem = data
        this.dialogVisible = true
      } catch (error) {
        this.$message.info('数据未找到')
        return error
      }
    }
  }
}
</script>

<style scoped lang="less">
.card {
  margin: 10px;
}
.elTable {
  margin-top: 20px;
}
.fenye {
  margin-top: 10px;
}
.ptiao {
  color: blue;
}
</style>
