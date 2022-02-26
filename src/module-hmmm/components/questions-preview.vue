<template>
  <div class="questions-preview">
    <el-row>
      <el-col :span="6">【题型】：{{ dataObj.questionType }}</el-col>
      <el-col :span="6">【编号】：{{ dataObj.id }}</el-col>
      <el-col :span="6">【难度】：{{ dataObj.difficulty }}</el-col>
      <el-col :span="6">【标签】：{{ dataObj.tags }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="6">【学科】：{{ dataObj.subjectName }}</el-col>
      <el-col :span="6">【目录】：{{ dataObj.directoryName }}</el-col>
      <el-col :span="6">【方向】：{{ dataObj.direction }}</el-col>
    </el-row>
    <hr />
    <el-row>
      【题干】：
      <div class="ti-gan" v-html="dataObj.question"></div>
    </el-row>
    <div class="duo-xuan">
      <el-row v-if="dataObj.questionType !== '简答'">
        {{ dataObj.questionType }}题 选项：（以下选中的选项为正确答案）
      </el-row>
      <el-row v-for="v in dataObj.options" :key="v.id">
        <el-radio
          v-if="dataObj.questionType === '单选'"
          disabled
          v-model="v.isRight"
          :label="1"
        >
          {{ v.code }}：{{ v.title }}
        </el-radio>
        <el-checkbox
          v-if="dataObj.questionType === '多选'"
          disabled
          :checked="Boolean(v.isRight)"
        >
          {{ v.code }}：{{ v.title }}
        </el-checkbox>
      </el-row>
    </div>
    <hr />
    <el-row>
      【参考答案】：<el-button
        :disabled="dataObj.videoURL === null || dataObj.videoURL === ''"
        type="danger"
        @click="showVideo = true"
      >
        {{
          dataObj.videoURL === null || dataObj.videoURL === ''
            ? '无视频'
            : '视频答案解析'
        }}
      </el-button>
      <div>
        <video
          v-if="showVideo"
          :src="dataObj.videoURL"
          controls="controls"
        ></video>
      </div>
    </el-row>
    <hr />
    <el-row> 【答案解析】： <span v-html="dataObj.answer"></span> </el-row>
    <hr />
    <el-row> 【题目备注】： {{ dataObj.remarks }} </el-row>
  </div>
</template>

<script>
import { difficulty, questionType } from '@/api/hmmm/constants'
import { detail } from '@/api/hmmm/questionsListSY'
export default {
  name: 'QuestionsPreview',
  components: {},
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      dataObj: {},
      showVideo: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      const { data } = await detail({ id: this.id })
      // data.questionType
      // data.difficulty
      // data.catalogID
      difficulty.forEach((item) => {
        if (item.value === data.difficulty - 0) {
          data.difficulty = item.label
        }
      })
      questionType.forEach((item) => {
        if (item.value === data.questionType - 0) {
          data.questionType = item.label
        }
      })
      this.dataObj = data
    }
  }
}
</script>

<style scoped lang="less">
.questions-preview {
  .el-row {
    padding: 10px;
  }
  .ti-gan {
    color: blue;
  }
}
</style>
