<template>
  <el-card class="container questions">
    <el-row class="header">
      <el-button type="success" @click="$router.push('/questions/new')"
        >新增试题</el-button
      >
    </el-row>
    <el-form
      :model="formData"
      label-position="right"
      label-width="80px"
      class="demo-form-inline"
    >
      <!-- 第一行 -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="学科">
            <el-select v-model.number="formData.subjectID" placeholder="请选择">
              <el-option
                v-for="v in subjectList"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="二级目录">
            <el-select v-model.number="formData.catalogID" placeholder="请选择">
              <el-option
                v-for="v in secondaryDirectoryListing"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="标签">
            <el-select v-model.number="formData.tags" placeholder="请选择">
              <el-option
                v-for="v in tagsList"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="关键字">
            <el-input
              v-model.trim="formData.keyword"
              class="w200"
              placeholder="根据题干搜索"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="试题类型">
            <el-select
              v-model.number="formData.questionType"
              placeholder="请选择"
            >
              <el-option
                v-for="v in questionType"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="难度">
            <el-select
              v-model.number="formData.difficulty"
              placeholder="请选择"
            >
              <el-option
                v-for="v in difficulty"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="方向">
            <el-select v-model="formData.direction" placeholder="请选择">
              <el-option
                v-for="v in direction"
                :key="v"
                :label="v"
                :value="v"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="录入人">
            <el-select v-model.number="formData.creatorID" placeholder="请选择">
              <el-option
                v-for="v in userList"
                :key="v.id"
                :label="v.username"
                :value="v.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 第三行 -->
      <el-row>
        <el-col :span="6">
          <el-form-item label="题目备注">
            <el-input
              v-model.trim="formData.remarks"
              class="w200"
              placeholder="审批人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业简称">
            <el-input
              v-model.trim="formData.shortName"
              class="w200"
              placeholder="审批人"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="城市" class="flex50">
            <el-select v-model="formData.province" placeholder="请选择">
              <el-option
                v-for="v in provincesSY"
                :key="v.city"
                :label="v.city"
                :value="v.city"
              ></el-option>
            </el-select>
            <el-select v-model="formData.city" placeholder="请选择">
              <el-option
                v-for="v in citys"
                :key="v"
                :label="v"
                :value="v"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button @click="remove" class="left156" size="small"
            >清除
          </el-button>
          <el-button @click="searchBtn" size="small" type="primary">
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-alert :title="'当前有' + counts + '条数据'" type="info" show-icon>
      </el-alert>
    </el-row>
    <!-- 表格  -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="number" label="试题编号"></el-table-column>
      <el-table-column prop="subject" label="学科"></el-table-column>
      <el-table-column prop="catalog" label="目录"></el-table-column>
      <el-table-column prop="questionType" label="题型"></el-table-column>
      <el-table-column label="题干" min-width="280px">
        <template slot-scope="{ row }">
          <div v-html="row.question"></div>
        </template>
      </el-table-column>
      <el-table-column label="录入时间" width="155px">
        <template slot-scope="{ row }">
          {{ row.addDate | parseTimeSy }}
        </template>
      </el-table-column>
      <el-table-column prop="difficulty" label="难度"></el-table-column>
      <el-table-column
        prop="creator"
        label="录入人"
        width="90px"
      ></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="{ row }">
          <el-button
            plain
            type="primary"
            icon="el-icon-view"
            circle
            @click=";(preview = true), (currentId = row.id)"
          ></el-button>
          <el-button
            plain
            type="success"
            icon="el-icon-edit"
            circle
            @click="$router.push(`/questions/new?id=${row.id}&or=list`)"
          ></el-button>
          <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteItem(row.id)"
          ></el-button>
          <el-button
            plain
            type="warning"
            icon="el-icon-check"
            circle
            @click="choice(row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="formData.page"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="formData.pagesize"
      layout="prev, pager, next, sizes, jumper"
      :total="counts"
    >
    </el-pagination>
    <!-- 删除/加入精选弹出层 -->
    <el-dialog
      title="提示"
      :visible.sync="dialog.visible"
      width="30%"
      :before-close="dialogClose"
    >
      <el-alert
        class="whiteBGC"
        :title="dialog.title"
        :type="dialog.type"
        show-icon
        :closable="false"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="dialogPerform"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 题目预览弹出层 -->
    <el-dialog title="题目预览" :visible.sync="preview" width="80%">
      <questions-preview v-if="preview" :id="currentId"></questions-preview>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="preview = false">关闭</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { difficulty, questionType, direction } from '@/api/hmmm/constants'
import { provincesSY } from '@/api/hmmm/citys'
import {
  getDataList,
  getSubjectList,
  getDirectoryList,
  getTagsList,
  getUserList,
  remove,
  choiceAdd
} from '@/api/hmmm/questionsListSY'
import QuestionsPreview from '../components/questions-preview'
export default {
  name: 'Questions',
  components: { QuestionsPreview },
  props: {},
  data () {
    return {
      counts: 0, // 总数
      formData: {
        page: 1, // 当前页数
        pagesize: 5, // 页尺寸
        subjectID: '', // 学科 id
        catalogID: '', // 目录 id
        tags: '', // 标签名称
        keyword: '', // 关键字
        questionType: '', // 试题类型
        difficulty: '', // 难度
        direction: '', // 方向
        creatorID: '', // 录入人
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        province: '', // 企业所在地省份
        city: '' // 企业所在城市
      },
      subjectList: [], // 分类列表
      secondaryDirectoryListing: [], // 二级目录列表
      tagsList: [], // 标签列表
      questionType, // 类型
      difficulty, // 难度列表
      direction, // 方向列表
      userList: [], // 用户列表
      provincesSY, // 全国声城市数据
      citys: [], // 城市数据
      tableData: [], // 表格数据
      dialog: { visible: false, title: '', type: '' },
      currentId: '', // 当前 item 的 id
      preview: false // 预览弹出层
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    async getDataList (form) {
      let newForm = {}
      for (const k in form) {
        if (form[k]) newForm = { ...newForm, [k]: form[k] }
      } // 过滤掉内容是空的 k
      const { data } = await getDataList(newForm)
      data.items.forEach((v) => {
        this.difficulty.forEach((item) => {
          if (item.value === v.difficulty - 0) {
            v.difficulty = item.label
          }
        })
        this.questionType.forEach((item) => {
          if (item.value === v.questionType - 0) {
            v.questionType = item.label
          }
        })
      })
      this.tableData = data.items
      this.counts = data.counts
    },
    async getCourseList () {
      const { data } = await getSubjectList()
      this.subjectList = data
    },
    async getSecondaryDirectory () {
      const { subjectID } = this.formData
      const { data } = await getDirectoryList({ subjectID })
      this.secondaryDirectoryListing = data
    },
    async getTagsList () {
      const { data } = await getTagsList()
      this.tagsList = data
    },
    async getUserList () {
      const { data } = await getUserList()
      this.userList = data
    },
    handleSizeChange (pagesize) {
      this.formData.pagesize = pagesize
      this.getDataList({ page: this.formData.page, pagesize })
    },
    handleCurrentChange (page) {
      this.formData.page = page
      this.getDataList({ page, pagesize: this.formData.pagesize })
    },
    searchBtn () {
      this.getDataList(this.formData)
    },
    remove () {
      this.formData = {
        page: 1, // 当前页数
        pagesize: 5, // 页尺寸
        subjectID: '', // 学科 id
        catalogID: '', // 目录 id
        tags: '', // 标签名称
        keyword: '', // 关键字
        questionType: '', // 试题类型
        difficulty: '', // 难度
        direction: '', // 方向
        creatorID: '', // 录入人
        remarks: '', // 题目备注
        shortName: '', // 企业简称
        province: '', // 企业所在地省份
        city: '' // 企业所在城市
      }
    },
    deleteItem (id) {
      this.dialog = {
        visible: true,
        title: '此操作将永久删除该题目, 是否继续?',
        type: 'warning'
      }
      this.currentId = id
    },
    choice (id) {
      this.dialog = {
        visible: true,
        title: '此操作将该题目加入精选, 是否继续?',
        type: 'info'
      }
      this.currentId = id
    },
    dialogPerform () {
      if (this.dialog.type === 'warning') {
        // 删除
        remove({ id: this.currentId }).then(({ data }) => {
          this.$message({
            message: data.success ? '删除成功' : '删除失败',
            type: data.success ? 'success' : 'error'
          })
          this.getDataList({
            page: this.formData.page,
            pagesize: this.formData.pagesize
          })
        })
      } else {
        // 加入精选
        choiceAdd({ id: this.currentId, choiceState: 1 }).then(({ data }) => {
          this.$message({
            message: data.success ? '加入精选成功' : '操作失败',
            type: data.success ? 'success' : 'error'
          })
          this.getDataList({
            page: this.formData.page,
            pagesize: this.formData.pagesize
          })
        })
      }
      this.dialog = { visible: false, title: '', type: '' }
    },
    dialogClose () {
      this.dialog = { visible: false, title: '', type: '' }
    }
  },
  computed: {},
  watch: {
    formData: {
      deep: true,
      handler () {
        this.getSecondaryDirectory()
        this.provincesSY.forEach((v) => {
          if (v.city === this.formData.province) {
            this.citys = v.area
          }
        })
      }
    }
  },
  created () {
    this.getDataList({
      page: this.formData.page,
      pagesize: this.formData.pagesize
    })
    this.getCourseList()
    this.getTagsList()
    this.getUserList()
  }
}
</script>

<style scoped lang="less">
.questions {
  margin: 10px;
  .header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .w200 {
    width: 200px;
  }
  .flex50 /deep/ .el-form-item__content {
    display: flex;
    justify-content: space-between;
    width: 200px;
    .el-select {
      width: 95px;
    }
  }
  .left156 {
    margin-left: 156px;
  }
  .el-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .whiteBGC {
    background-color: #fff;
  }
}
</style>
