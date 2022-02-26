<template>
  <div class="container">
    <el-card>
      <!-- 搜索 -->
      <el-form label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="题库名称">
              <el-input v-model="subjectList.subjectName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button @click="delFn">清除</el-button>
            <el-button type="primary" @click="getList">搜索</el-button>
          </el-col>
          <el-col :span="12" class="btnRight">
            <el-button
              type="success"
              icon="el-icon-edit"
              @click="isDialog = true"
              >新增学科</el-button
            >
          </el-col>
        </el-row>
      </el-form>

      <el-alert
        :title="`数据一共${items}条`"
        type="info"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 表格 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          prop="type"
          label="题型"
          width="170"
        ></el-table-column>
        <el-table-column prop="pattern" label="模式" width="140"></el-table-column>

        <el-table-column prop="isFrontDisplay" label="前台是否显示2" width="140">
          <template slot-scope="scope">
            {{ scope.row.isFrontDisplay === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column prop="adi3_r" label="adi3的得分" width="140"></el-table-column>
        <el-table-column prop="tags" label="标签2" width="140"></el-table-column>
        <el-table-column
          prop="totals"
          label="题目数量"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="创作者"
          width="130"
        ></el-table-column>
        <el-table-column prop="addDate" label="创建日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.addDate | parseTimeByString }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <!-- tags -->
            <el-button
              class="btns"
              type="text"
              @click="
                $router.push(
                  `directorys?id=${scope.row.id}&name=${scope.row.subjectName}`
                )
              "
              >学科分类</el-button
            >
            <el-button
              class="btns"
              type="text"
              @click="
                $router.push(
                  `tags?id=${scope.row.id}&name=${scope.row.subjectName}`
                )
              "
              >学科标签</el-button
            >
            <el-button class="btns" type="text" @click="revise(scope.row)">修改</el-button>
            <el-button class="btns" type="text" @click="delRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="subjectList.page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="subjectList.pagesize"
        layout=" prev, pager, next,sizes, jumper"
        :total="items"
      >
      </el-pagination>
    </el-card>

    <!-- 弹出层 -->
    <el-dialog title="新增学科" :visible.sync="isDialog" width="30%">
      <el-row>
        <el-col>
          <el-form ref="roleForm" :model="ruleForm" :rules="rules">
            <el-form-item
              label="活动名称"
              label-width="80px"
              prop="subjectName"
            >
              <el-input
                v-model="ruleForm.subjectName"
                placeholder="请输入学科名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="delivery" class="item">
              <el-switch
                v-model="subjectList.isFrontDisplay"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
                ></el-switch
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialog = false">取消</el-button>
        <el-button type="primary" @click="btnOk">确认</el-button>
      </span>
    </el-dialog>

    <SubjectsAdd
      ref="subjectsadd"
      :data="currSubject"
      @updateList="updateList()"
    />
  </div>
</template>

<script>
import { list, add, remove } from '@/api/hmmm/subjects'
import SubjectsAdd from '../components/subjects-add'

export default {
  components: { SubjectsAdd },
  name: 'SubjectsList',
  data () {
    return {
      currSubject: {},
      switchs: true,
      subjectList: {
        page: 1, // 当前页数
        pagesize: 10, // 每页显示条数
        isFrontDisplay: 1
      },
      list: [], // 学科列表
      items: 0, // 数据条数
      inpVal: '',
      isDialog: false,
      isDelRoleDialog: false,
      ruleForm: {
        subjectName: ''
      },
      rules: {
        subjectName: [
          { required: true, message: '请输入学科名称', trigger: 'blur' }
        ]
      },

      // 修改
      formModel: {
        id: null,
        subjectName: null,
        isFrontDisplay: 1
      },
      // 修改验证
      formRules: {
        subjectName: [
          { required: true, message: '请输入学科名称', tirgger: 'blur' }
        ],
        isFrontDisplay: [
          { type: 'number', message: '请选择是否显示', tirgger: 'blur' }
        ]
      }
    }
  },
  methods: {
    updateList () {
      if (!this.currSubject.id) {
        this.requestParams.page = 1
      }
      this.getList()
    },
    // 打开弹出层
    revise (val) {
      this.currSubject = val
      this.$nextTick(() => {
        this.$refs.subjectsadd.open()
      })
    },
    // 删除
    async delRole (id) {
      await this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await remove(id)
      this.$message.success('删除成功')
      this.getList()
    },
    // 点击新增学科
    async btnOk () {
      try {
        console.log(1)
        await this.$refs.roleForm.validate()
        await add({
          subjectName: this.ruleForm.subjectName,
          isFrontDisplay: this.subjectList.isFrontDisplay
        })
        this.getList()
        this.$message.success('添加学科成功')
        this.isDialog = false
      } catch (err) {
        console.log(err)
      }
    },
    // 取消搜索
    delFn () {
      this.subjectList.subjectName = ''
    },
    // onSubmit(){},
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);1
      this.subjectList.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.subjectList.page = val
      this.getList()
    },
    async getList () {
      try {
        const { data } = await list(this.subjectList)
        console.log(data)
        this.list = data.items
        this.items = data.counts
        // this.$messgae.success('获取学科列表成功')
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped lang="less">
.btn {
  margin-left: 10px;
}
.el-alert {
  margin-bottom: 20px;
}
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
.btns {
  float: left;
}
.item {
  margin-left: 10px;
}
.btnRight {
  text-align: right;
}
</style>
