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
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="全部"></el-tab-pane>
      <el-tab-pane label="待审核" name="待审核"></el-tab-pane>
      <el-tab-pane label="通过" name="通过"></el-tab-pane>
      <el-tab-pane label="拒绝" name="拒绝"></el-tab-pane>
    </el-tabs>
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
      <el-table-column prop="chkState" label="审核状态"></el-table-column>
      <el-table-column prop="chkRemarks" label="审核意见"></el-table-column>
      <el-table-column prop="chkUser" label="审核人"></el-table-column>
      <el-table-column prop="publishState" label="发布状态"></el-table-column>
      <el-table-column class="link" label="操作" width="200px" fixed="right">
        <template slot-scope="{ row }">
          <el-link
            :underline="false"
            type="primary"
            @click=";(preview = true), (currentId = row.id)"
            >预览
          </el-link>
          <el-link
            :underline="false"
            :type="row.chkState !== '待审核' ? 'info' : 'primary'"
            :disabled="row.chkState !== '待审核'"
            @click=";(auditDialog = true), (currentId = row.id)"
            >审核
          </el-link>
          <el-link
            :underline="false"
            :type="row.publishState === '已发布' ? 'info' : 'primary'"
            :disabled="row.publishState === '已发布'"
            @click="$router.push(`/questions/new?id=${row.id}&or=choice`)"
            >修改
          </el-link>
          <el-link
            :underline="false"
            type="primary"
            @click="shelvesFn(row.id, row.publishState)"
            >{{ row.publishState === '已发布' ? '下架' : '上架' }}
          </el-link>
          <el-link
            :underline="false"
            @click="deleteItem(row.id)"
            :type="row.publishState === '已发布' ? 'info' : 'primary'"
            :disabled="row.publishState === '已发布'"
            >删除
          </el-link>
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
    <!-- 待审核弹出层 -->
    <el-dialog
      class="auditDialog"
      title="题目审核"
      :visible.sync="auditDialog"
      :before-close="handleClose"
      width="40%"
    >
      <el-radio v-model="auditObj.chkState" :label="1">通过</el-radio>
      <el-radio v-model="auditObj.chkState" :label="2">拒绝</el-radio>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入审核意见"
        v-model="auditObj.chkRemarks"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="auditFn"> 确 定 </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { difficulty, questionType, direction } from '@/api/hmmm/constants'
import { provincesSY } from '@/api/hmmm/citys'
import {
  getChoiceDataList,
  getSubjectList,
  getDirectoryList,
  getTagsList,
  getUserList,
  remove,
  choicePublish,
  choiceCheck
} from '@/api/hmmm/questionsListSY'
import QuestionsPreview from '../components/questions-preview'
export default {
  name: 'QuestionsChoice',
  components: { QuestionsPreview },
  props: {},
  data () {
    return {
      activeName: '全部', // 全部 待审核 通过 拒绝
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
        city: '', // 企业所在城市
        chkState: '' // 0 待审核 1 通过 2 拒绝 核状态
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
      isPublishState: null,
      preview: false, // 预览弹出层,
      auditObj: { chkState: 1, chkRemarks: '' },
      auditDialog: false
    }
  },
  methods: {
    async getDataList (form) {
      let newForm = {}
      for (const k in form) {
        if (form[k] !== '') newForm = { ...newForm, [k]: form[k] }
      } // 过滤掉内容是空的 k
      const { data } = await getChoiceDataList(newForm)
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
        /* 已发布 已发布 === 1
         * 已下架 已发布 === 0 && 待审核 === 1
         * 待发布 已发布 === 0 && 待审核 !== 1
         */
        v.publishState =
          v.publishState === 1
            ? '已发布'
            : v.publishState === 0 && v.chkState === 1
              ? '已下架'
              : '待发布'

        v.chkState =
          v.chkState === 0
            ? '待审核'
            : v.chkState === 1
              ? '已审核'
              : v.chkState === 2
                ? '已拒绝'
                : '未知'
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
        city: '', // 企业所在城市
        chkState: '' // 0 待审核 1 通过 2 拒绝 核状态
      }
    },
    deleteItem (id) {
      this.dialog = {
        visible: true,
        title: '此操作将永久删除该题目, 是否继续?',
        type: 'warning'
      }
      this.currentId = id
      this.isPublishState = null
    },
    shelvesFn (id, falg) {
      this.dialog = {
        visible: true,
        title: `您确认${falg === '已发布' ? '下架' : '上架'}这道题目吗?`,
        type: 'warning'
      }
      this.currentId = id
      this.isPublishState = falg === '已发布' ? 0 : 1
      console.log(this.isPublishState)
    },
    dialogPerform () {
      if (this.isPublishState === null) {
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
        choicePublish({
          id: this.currentId,
          publishState: this.isPublishState
        }).then(({ data }) => {
          this.$message({
            message: data.success
              ? this.isPublishState
                ? '上架成功'
                : '下架成功'
              : '操作失败',
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
    },
    handleClick (tab) {
      this.formData.chkState =
        tab.name === '待审核'
          ? 0
          : tab.name === '通过'
            ? 1
            : tab.name === '拒绝'
              ? 2
              : ''
      console.log(tab.name)
      this.getDataList({
        page: this.formData.page,
        pagesize: this.formData.pagesize,
        chkState: this.formData.chkState
      })
    },
    async auditFn () {
      const { data } = await choiceCheck({
        ...this.auditObj,
        id: this.currentId
      })

      this.$message({
        message: data.success ? '审核成功' : '操作失败',
        type: data.success ? 'success' : 'error'
      })
      this.getDataList(this.formData)
      this.auditDialog = false
      this.auditObj = { chkState: 1, chkRemarks: '' }
    },
    handleClose () {
      this.auditDialog = false
      this.auditObj = { chkState: 1, chkRemarks: '' }
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
  .el-link {
    margin-right: 8px;
  }
  .auditDialog /deep/ .el-dialog__footer {
    text-align: right;
  }
  .el-textarea {
    margin-top: 20px;
  }
}
</style>
