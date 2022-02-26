<template>
  <div>
    <el-card class="card">
      <!-- 上部搜索 -->
      <el-row type="flex" justify="start">
        <!-- 关键字输入框 -->
        <el-col :span="18">
          <el-form label-width="80px" :inline="true" :model="pagelist">
            <el-form-item label="关键字">
              <el-input
                style="width: 240px"
                placeholder="请输入关键字"
                v-model.trim="pagelist.keyword"
                @keyup.enter.native="getSearch"
              ></el-input>
            </el-form-item>
            <!-- 状态选择框 -->
            <el-form-item label="状态">
              <el-select placeholder="请选择" v-model="pagelist.state">
                <el-option label="已启用" :value="1"></el-option>
                <el-option label="已禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-button @click="clearSearch">清除</el-button>
            <el-button type="primary" @click="getSearch">搜索</el-button>
          </el-form>
        </el-col>
        <el-col :span="4" :push="4"
          ><el-button
            type="success"
            icon="el-icon-edit"
            @click="showDialog = true"
            >新增技巧</el-button
          ></el-col
        >
      </el-row>
      <!-- 中间警告栏 -->
      <el-alert type="info" :closable="false" show-icon>
        数据一共{{ total }}条</el-alert
      >
      <!-- 下面表格区域 -->
      <el-table :data="tableData" style="width: 100%" class="elTable">
        <el-table-column
          type="index"
          width="60"
          label="序号"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="文章标题"
          width="350"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="visits"
          label="阅读数"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="录入人"
          width="280"
          align="center"
        >
        </el-table-column>
        <el-table-column label="录入时间" width="300" align="center">
          <template v-slot="{ row }">
            {{ row.createTime | parseTimeSy }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="200" prop="state" align="center">
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template v-slot="{ row }">
            <el-button type="text" @click="btnPreview(row.id)">预览</el-button>
            <el-button type="text" @click="editState(row)">
              {{ row.state === '已启用' ? '禁用' : '启用' }}
            </el-button>
            <el-button
              type="text"
              @click="editData(row.id)"
              :disabled="row.state === '已启用'"
              >修改</el-button
            ><el-button
              type="text"
              @click="delData(row.id)"
              :disabled="row.state === '已启用'"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-row type="flex" justify="end" class="fenye">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="currentChange"
          :current-page="pagelist.page"
          :page-sizes="[10, 20, 30]"
          :page-size="pagelist.pagesize"
          layout="  total,prev, pager, next, sizes,jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <!-- 底部弹出层 -->
    <el-dialog :visible="showDialog" title="新增学科" @close="btnNo">
      <el-form
        label-width="80px"
        ref="pagelist"
        :model="pagelist"
        size="medium"
        :rules="rules"
      >
        <el-form-item label="文章名称" style="width: 350px" prop="tagName">
          <el-input v-model="pagelist.title"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <quill-editor
            ref="text"
            v-model="pagelist.articleBody"
            :options="editorOption"
            style="height: 300px"
          />
        </el-form-item>
        <el-form-item label="视频地址" class="tupian">
          <el-input v-model="pagelist.videoURL" placeholder="请输入地址" />
        </el-form-item>
      </el-form>

      <!-- footer插槽 -->
      <template>
        <el-row type="flex" justify="end">
          <el-col :span="16">
            <el-button size="small" @click="btnNo">取消</el-button>
            <el-button type="primary" size="small" @click="btnOk"
              >确定</el-button
            >
          </el-col>
        </el-row>
      </template>
    </el-dialog>
    <!-- 还有个底部弹层 -->
    <el-dialog :visible="showDia" title="预览文章" @close="btnNoo" width="60%">
      <div>
        <h1 v-html="pagelist.title"></h1>
        <span>{{ pagelist.createTime | parseTimeSy }}</span>
        <span>{{ pagelist.username }}</span>
        <i class="el-icon-view">{{ pagelist.visits }}</i>
        <div v-html="pagelist.articleBody" class="beijing"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  list,
  remove,
  detail,
  update,
  add,
  changeState
} from '../../api/hmmm/articles'
import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.snow.css'

export default {
  components: { quillEditor },
  data () {
    return {
      // 验证
      rules: {
        tagName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      },
      showDia: false,
      showDialog: false,
      tableData: [],
      pagelist: {
        page: 1,
        pagesize: 10,
        // title: '',
        // articleBody: '',
        // videoURL: '',
        keyword: '',
        // id: null,
        // state: null,
        creatorTime: '',
        // username: '',

        visits: null,
        articleBody: '',
        createTime: '',
        creatorID: null,
        id: null,
        state: null,
        title: '',
        username: '',
        videoURL: ''
      },
      total: null,
      // 富文本校验规则
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }]
          ]
        }
      }
    }
  },
  created () {
    this.list()
  },
  methods: {
    currentChange (newNum) {
      console.log(newNum, '页码')
      this.pagelist.page = newNum // 将当前页码赋值给当前的最新的页码
      this.list()
    },
    handleSizeChange (newVal) {
      this.pagelist.pagesize = newVal
      this.list()

      console.log(newVal, '页数')
    },
    async list () {
      const { data } = await list({
        page: this.pagelist.page,
        pagesize: this.pagelist.pagesize,
        keyword: this.pagelist.keyword
      })
      console.log(data)
      this.tableData = data.items
      this.total = data.counts
      this.tableData.map(function (val) {
        // console.log(val)
        if (val.state - 0 === 0) {
          val.state = '已禁用'
        } else if (val.state - 0 === 1) {
          val.state = '已启用'
        }
      })
    },
    // 获取搜索框的内容
    getSearch () {
      console.log(this.pagelist.title)
      this.list()
      this.pagelist.keyword = ''
    },
    clearSearch () {
      this.pagelist.keyword = ''
      this.list()
    },
    // 删除列表功能
    async delData (id) {
      try {
        await this.$confirm('确认删除吗')
        // console.log(id)
        const newData = await remove({ id })
        console.log(newData, 22222)
        this.list()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑数据
    async editData (id) {
      this.showDialog = true
      const { data } = await detail({ id })
      console.log(data)
      this.pagelist.title = data.title
      this.pagelist.articleBody = data.articleBody
    },
    // 确认按钮
    async btnOk (id) {
      console.log(id)
      try {
        await this.$refs.pagelist.validate()
        if (this.pagelist.id) {
          await update(this.pagelist)
        } else {
          // 新增
          await add(this.pagelist)
        }
        this.list()
        this.$message.success('操作成功')
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    // 取消按钮
    btnNo () {
      this.pagelist = {}

      this.showDialog = false
    },
    // 切换状态(启用/禁用)
    async editState (row) {
      try {
        await changeState({
          id: row.id,
          state: row.state === '已启用' ? 0 : 1
        })
        row.state = row.state === 1 ? '已启用' : '已禁用'
        this.$message.success('操作成功')
        this.list()
      } catch (e) {
        this.$message.error('请求错误!')
      }
    },
    // 预览按钮
    async btnPreview (id) {
      this.showDia = true
      // const { data } = await detail({ id })
      // console.log(data)
      // this.pagelist.title = data.title
      // this.pagelist.articleBody = data.articleBody
      // this.pagelist.createTime = data.createTime
      // this.pagelist.username = data.username
      // this.pagelist.visits = data.visits

      this.pagelist = { ...this.tableData.find((v) => v.id === id) }
    },
    btnNoo () {
      this.showDia = false
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
.el-icon-view {
  padding-left: 20px;
}
.beijing {
  margin-top: 10px;
  background-color: #f5f5f5;
  border-top: 2px dashed #cccccc;
  padding: 20px;
}
</style>
