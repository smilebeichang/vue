<template>
  <div class="container">
    <el-card class="box-card">
      <el-breadcrumb class="elIcon" v-if="subjects.id && subjects.name">
        <el-breadcrumb-item>学科管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{
          subjects.id ? subjects.name : ''
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>目录管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="subjectFrom" :model="queryList" label-width="80px">
        <el-form-item label="目录名称" class="demo-form">
          <el-input
            class="inputCol"
            v-model="queryList.directoryName"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" class="demo-form">
          <el-select
            v-model="queryList.state"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="已启用" :value="1"> </el-option>
            <el-option label="已禁用" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-button
          style="margin: 0 0 0 50px"
          v-if="subjects.id && subjects.name"
          type="text"
          class="colright"
          icon="el-icon-back"
          @click="$router.back()"
          >返回学科</el-button
        >
        <el-button
          type="success"
          size="small"
          icon="el-icon-edit"
          style="margin: 0 0 0 50px"
          @click="editDialogVisible = true"
          >新增目录</el-button
        >
      </el-form>

      <el-button size="small" class="colInput" plain @click="resetInput"
        >清除</el-button
      >
      <el-button size="small" class="colInput" type="primary" @click="getList"
        >搜索</el-button
      >
      <el-alert
        style="margin-top: 15px"
        :title="`共${counts}条记录`"
        type="info"
        :closable="false"
        show-icon
      >
      </el-alert>
      <el-table :data="tableData" style="width: 100%; margin-top: 10px">
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="subjectName" label="所属学科"> </el-table-column>
        <el-table-column prop="directoryName" label="目录名称">
        </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期"> </el-table-column>
        <el-table-column prop="totals" label="面试题数量"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            {{ scope.row.state === 1 ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="{ row }">
            <el-button type="text" @click="editState(row)">{{
              row.state === 1 ? '禁用' : '启用'
            }}</el-button>
            <el-button
              type="text"
              :disabled="row.state === 1"
              @click="editDirectorys(row)"
              >修改</el-button
            >
            <el-button
              type="text"
              :disabled="row.state === 1"
              @click="removeDir(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="queryList.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryList.pagesize"
        layout="prev, pager, next,sizes,jumper"
        :total="counts"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 修改目录弹框 -->
    <el-dialog
      title="修改目录"
      :visible.sync="editDialogVisible"
      width="40%"
      @close="btnCancel"
    >
      <!-- 主体区域 -->
      <el-row>
        <el-col>
          <el-form
            :model="editDirectoryList"
            :rules="directorysFormRules"
            ref="directorysFormRef"
            label-width="80px"
            class="demo-ruleForm"
          >
            <el-form-item
              class="elform"
              label="所属学科"
              v-if="!subjects.id && !subjects.name"
            >
              <el-select
                v-model="editDirectoryList.value"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in addFrom"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="elform" label="目录名称" prop="directoryName">
              <el-input
                v-model="editDirectoryList.directoryName"
                placeholder="请输入目录名称"
                style="width: 100%"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="editDirForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  cutState,
  deleteList,
  addList,
  editList
} from '../../api/companys/directorys'
import { simple } from '../../api/hmmm/subjects'
export default {
  data () {
    return {
      infoId: '',
      editDirectoryList: {
        directoryName: '',
        value: ''
      },
      // 验证
      directorysFormRules: {
        directoryName: [
          { required: true, message: '请输入目录名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      queryList: {
        page: 1,
        pagesize: 10,
        directoryName: '',
        state: null
      },
      // 数据列表
      tableData: [],
      // 总条数
      counts: 0,
      addFrom: []
    }
  },
  computed: {
    subjects () {
      return this.$route.query || null
    }
  },

  // 侦听地址栏数据
  watch: {
    '$route.query' () {
      this.getList()
    }
  },
  created () {
    this.getList()
    this.getAddFrom()
  },
  methods: {
    // 点击修改
    editDirectorys (row) {
      this.editDirectoryList.value = row.subjectID
      console.log(row)
      this.infoId = row.id
      this.editDirectoryList.directoryName = row.directoryName
      this.editDialogVisible = true
    },
    async getAddFrom () {
      try {
        const { data } = await simple()
        console.log(data)
        this.addFrom = data
      } catch (e) {
        console.log(e)
      }
    },
    // 添加确定按钮
    async editDirForm () {
      if (this.infoId) {
        if (this.subjects.id && this.subjects.name) {
          await editList(this.infoId, {
            id: this.infoId,
            subjectID: +this.subjects.id,
            directoryName: this.editDirectoryList.directoryName
          })
          this.editDialogVisible = false
          this.getList()
          this.$message.success('更新目录成功')
        } else {
          await editList(this.infoId, {
            id: this.infoId,
            subjectID: this.editDirectoryList.value,
            directoryName: this.editDirectoryList.directoryName
          })
          this.editDialogVisible = false
          this.getList()
          this.$message.success('更新目录成功')
        }
      } else {
        if (this.subjects.id && this.subjects.name) {
          await addList({
            subjectID: +this.subjects.id,
            directoryName: this.editDirectoryList.directoryName
          })
          this.editDialogVisible = false
          this.getList()
          this.$message.success('新增目录成功')
        } else {
          await addList({
            subjectID: this.editDirectoryList.value,
            directoryName: this.editDirectoryList.directoryName
          })
          this.editDialogVisible = false
          this.getList()
          this.$message.success('新增目录成功')
        }
      }
    },

    // 切换状态
    async editState (row) {
      console.log(row)
      try {
        await cutState({
          id: row.id,
          state: row.state === 1 ? 0 : 1
        })
        this.$message.success('操作成功')
        row.state = row.state === 1 ? 0 : 1
      } catch (e) {
        this.$message.error('请求错误!')
      }
    },
    // 删除
    async removeDir (row) {
      const configRuselt = await this.$confirm(
        '此操作将永久删除该学科, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (configRuselt !== 'confirm') {
        return this.$message('您取消了删除操作!')
      }
      try {
        const { data } = await deleteList(row.id)
        console.log(data)
        this.$message.success('删除成功!')
        this.getList()
      } catch (e) {
        this.$message.error('删除失败!')
      }
    },
    // 清除
    resetInput () {
      this.queryList.directoryName = ''
      this.queryList.state = null
    },

    // 搜索

    async getList () {
      this.queryList.subjectID = this.subjects.id || null
      const { data } = await getList(this.queryList)
      this.tableData = data.items
      this.counts = data.counts
    },
    handleSizeChange (newSize) {
      this.queryList.pagesize = newSize
      this.getList()
    },
    handleCurrentChange (newPage) {
      this.queryList.page = newPage
      this.getList()
    },
    btnCancel () {
      this.editDirectoryList = {
        directoryName: '',
        value: ''
      }
      this.editDialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin: 20px;
}
.demo-form {
  width: 30%;
  display: inline-block;
}
.elIcon {
  margin-bottom: 15px;
}
</style>
