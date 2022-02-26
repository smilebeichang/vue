<template>
  <el-card class="questions-new">
    <div slot="header" class="header">试题{{ queryObj ? '修改' : '录入' }}</div>
    <el-form
      ref="refForm"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="学科：" prop="subjectID">
        <el-select
          class="w400"
          v-model="formData.subjectID"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="v in subjectList"
            :key="v.value"
            :label="v.label"
            :value="v.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="目录：" prop="catalogID">
        <el-select
          class="w400"
          v-model="formData.catalogID"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="v in secondaryDirectoryListing"
            :key="v.value"
            :label="v.label"
            :value="v.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业：" prop="enterpriseID">
        <el-select
          class="w400"
          v-model="formData.enterpriseID"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="v in enterpriseList"
            :key="v.id"
            :label="v.company"
            :value="v.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市：" prop="city">
        <el-select
          v-model="formData.province"
          placeholder="请选择"
          clearable
          style="width: 195px; margin-right: 10px"
        >
          <el-option
            v-for="(v, i) in provincesSY"
            :key="i"
            :label="v.city"
            :value="v.city"
          ></el-option>
        </el-select>
        <el-select
          v-model="formData.city"
          placeholder="请选择"
          clearable
          style="width: 195px"
        >
          <el-option
            v-for="(v, i) in citys"
            :key="i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="方向：" prop="direction">
        <el-select
          class="w400"
          v-model="formData.direction"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="(v, i) in direction"
            :key="i"
            :label="v"
            :value="v"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型：" prop="questionType">
        <el-radio
          style="width: 100px"
          v-model="formData.questionType"
          v-for="v in questionType"
          :key="v.value"
          :label="v.value"
          >{{ v.label }}
        </el-radio>
      </el-form-item>
      <el-form-item label="难度：" prop="difficulty">
        <el-radio
          style="width: 100px"
          v-model="formData.difficulty"
          v-for="v in difficulty"
          :key="v.value"
          :label="v.value"
          >{{ v.label }}
        </el-radio>
      </el-form-item>
      <el-form-item label="题干：" prop="question">
        <quill-editor
          v-model="formData.question"
          ref="myQuillEditor"
          :options="editorOption"
        >
          <!-- @blur="onEditorBlur($event) 失去焦点事件"
          @focus="onEditorFocus($event)" 获得焦点事件
          @change="onEditorChange($event)" 内容改变事件 -->
        </quill-editor>
      </el-form-item>
      <el-form-item label="选项：" v-if="formData.questionType !== 3">
        <div v-if="formData.questionType === 1">
          <el-row v-for="item in formData.options" :key="item.code">
            <el-radio v-model="optionResults" :label="item.code">
              {{ item.code }}：
              <el-input v-model="item.title" placeholder="请输入内容" />
            </el-radio>
          </el-row>
        </div>
        <el-checkbox-group
          v-else-if="formData.questionType === 2"
          v-model="optionResults"
        >
          <el-row v-for="item in formData.options" :key="item.code">
            <el-checkbox :label="item.code">
              {{ item.code }}：
              <el-input v-model="item.title" placeholder="请输入内容" />
            </el-checkbox>
          </el-row>
        </el-checkbox-group>
        <el-button type="danger" @click="optionsNum++">
          +增加选项与答案
        </el-button>
      </el-form-item>
      <el-form-item label="解析视频：">
        <el-input
          class="w400"
          v-model="formData.videoURL"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="答案解析：" prop="answer">
        <quill-editor
          v-model="formData.answer"
          ref="myQuillEditor2"
          :options="editorOption"
        >
          <!-- @blur="onEditorBlur($event) 失去焦点事件"
          @focus="onEditorFocus($event)" 获得焦点事件
          @change="onEditorChange($event)" 内容改变事件 -->
        </quill-editor>
      </el-form-item>
      <el-form-item label="题目备注：">
        <el-input
          class="w400"
          type="textarea"
          :rows="2"
          v-model="formData.remarks"
          placeholder="请输入内容"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="试题标签：" prop="tags">
        <el-select
          class="w400"
          v-model="formData.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择标签"
        >
          <el-option
            v-for="(v, i) in tagList"
            :key="i"
            :label="v.label"
            :value="v.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          确认{{ queryObj ? '编辑' : '提交' }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 难度 题型 方向
import { difficulty, questionType, direction } from '@/api/hmmm/constants'
import { provincesSY } from '@/api/hmmm/citys'
// 学科 目录
import {
  getSubjectList,
  getDirectoryList,
  enterpriseList,
  getTagsList,
  addItem,
  detail,
  update
} from '@/api/hmmm/questionsListSY'
export default {
  name: 'QuestionsNew',
  data () {
    return {
      labelPosition: 'right', // label 向右对齐
      queryObj: this.$route.query,
      formData: {
        subjectID: '', // 学科 id
        catalogID: '', // 目录 id
        enterpriseID: '', // 企业ID
        province: '', // 企业所在地省份
        city: '', // 企业所在城市
        direction: '', // 方向
        questionType: 1, // 试题类型
        difficulty: 1, // 难度
        question: '', // 题干
        options: [],
        // { isRight: true, code: 'A', title: '', img: '' },
        // { isRight: false, code: 'B', title: '', img: '' },
        videoURL: '',
        answer: '',
        remarks: '', // 题目备注
        tags: '' // 标签名称
      },
      formRules: {
        // subjectID: [],
        // catalogID: [],
        // enterpriseID: [],
        // city: [],
        // direction: [],
        // questionType: [],
        // difficulty: [],
        // question: [],
        // answer: [],
        // tags: []
        subjectID: [this.checkRequired('学科')],
        catalogID: [this.checkRequired('目录')],
        enterpriseID: [this.checkRequired('企业')],
        city: [this.checkRequired('城市')],
        direction: [this.checkRequired('方向')],
        questionType: [this.checkRequired('题型')],
        difficulty: [this.checkRequired('难度')],
        question: [this.checkRequired('题干')],
        answer: [this.checkRequired('答案解析')],
        tags: [this.checkRequired('试题标签', 'blur')]
      },
      serialNumber: 65, // ascll A
      optionsNum: 4, // 默认选项数量

      /* optionResults 选项结果
       * 先判断 optionResults 是否为数组
       * 1. 是数组,把 optionResults.value 和 options.item.code 做比较
       * 2. 不是数组把 optionResults 和 options.item.code 做比较
       * 结果为 true 的 item.isRight = true
       * 最后发送表单请求
       */
      optionResults: [],
      subjectList: [], // 分类列表
      secondaryDirectoryListing: [], // 二级目录列表
      enterpriseList: [], // 企业列表
      provincesSY, // 城市列表
      citys: [], // 城市数据
      direction,
      questionType,
      difficulty,
      tagList: [],
      editorOption: {
        modules: {
          toolbar: [
            'bold',
            'italic',
            'underline',
            'strike',
            { list: 'ordered' },
            { list: 'bullet' },
            'blockquote',
            'code-block',
            'image',
            'link'
            //  ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
            //  ['blockquote', 'code-block'], //引用，代码块
            //  [{'header': 1}, {'header': 2}], // 标题，键值对的形式；1、2表示字体大小
            //  [{'list': 'ordered'}, {'list': 'bullet'}], //列表
            //  [{'script': 'sub'}, {'script': 'super'}], // 上下标
            //  [{'indent': '-1'}, {'indent': '+1'}], // 缩进
            //  [{'direction': 'rtl'}], // 文本方向
            //  [{'size': ['small', false, 'large', 'huge']}], // 字体大小
            //  [{'header': [1, 2, 3, 4, 5, 6, false]}], //几级标题
            //  [{'color': []}, {'background': []}], // 字体颜色，字体背景颜色
            //  [{'font': []}], //字体
            //  [{'align': []}], //对齐方式
            //  ['clean'], //清除字体样式
            //  ['image', 'video'], //上传图片、上传视频
            //  ['link'] // 链接
          ]
        },
        placeholder: '输入内容...'
      } // 编辑器配置项
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    },
    editor2 () {
      return this.$refs.myQuillEditor2.quill
    }
  },
  methods: {
    async getCourseList () {
      const { data } = await getSubjectList()
      this.subjectList = data
    },
    async getSecondaryDirectory () {
      const { subjectID } = this.formData
      const { data } = await getDirectoryList({ subjectID })
      this.secondaryDirectoryListing = data
    },
    async getEnterpriseList () {
      const { data } = await enterpriseList()
      this.enterpriseList = data.items
    },
    async getTagsList () {
      const { data } = await getTagsList()
      this.tagList = data
    },
    checkRequired (value, trigger = ['blur', 'change']) {
      return { required: true, message: `${value}不能为空`, trigger }
    },
    async onSubmit () {
      await this.$refs.refForm.validate()
      /* optionResults 选项结果
       * 先判断 optionResults 是否为数组
       * 1. 是数组,把 optionResults.value 和 options.item.code 做比较
       * 2. 不是数组把 optionResults 和 options.item.code 做比较
       * 结果为 true 的 item.isRight = true
       * 最后发送表单请求
       */
      if (Array.isArray(this.optionResults)) {
        // 是数组
        this.optionResults.forEach((value) => {
          this.formData.options.forEach((item) => {
            item.isRight = value === item.code ? true : item.isRight
          })
        })
      } else {
        this.formData.options.forEach((item) => {
          item.isRight = this.optionResults === item.code
        })
      }
      this.formData.tags = this.formData.tags.join(',')
      this.formData.questionType += ''
      this.formData.difficulty += ''
      // 如果有 id 就是编辑调用 update() 否则就是新增调用 addItem()
      const { status } = await (this.queryObj?.id
        ? update(this.formData)
        : addItem(this.formData))
      // const { status } = await addItem(this.formData) update
      status === 200 &&
        this.$router.push(
          this.queryObj?.or === 'choice'
            ? '/questions/choice'
            : '/questions/list'
        )
    },
    async getDetail () {
      const { data } = await detail({ id: this.queryObj.id })
      this.formData = data
      this.formData.questionType -= 0
      this.formData.difficulty -= 0
      const arr = []
      data.options.forEach((item) => {
        if (item.isRight) {
          arr.push(item.code)
        }
      })
      this.optionResults = this.formData.questionType === 1 ? arr.join() : arr
      this.formData.tags = this.formData.tags.split(',')
    }
  },
  created () {
    this.getCourseList()
    this.getSecondaryDirectory()
    this.getEnterpriseList()
    this.getTagsList()
    this.serialNumber = 65
    for (let i = 0; i < this.optionsNum; i++) {
      // String.fromCharCode(this.serialNumber)
      this.formData.options.push({
        isRight: false,
        code: String.fromCharCode(this.serialNumber++),
        title: '',
        img: ''
      })
    }
    this.queryObj?.id && this.getDetail()
  },
  mounted () {
    this.editor.container.style.height = '200px'
    this.editor2.container.style.height = '200px'
  },
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
    },
    optionsNum (val, oldVal) {
      for (let i = 0; i < val - oldVal; i++) {
        this.formData.options.push({
          isRight: false,
          code: String.fromCharCode(this.serialNumber++),
          title: '',
          img: ''
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.questions-new,
.el-row {
  margin: 10px;
  .header {
    font-size: 20px;
  }
  .w400 {
    width: 400px;
  }
}
</style>
