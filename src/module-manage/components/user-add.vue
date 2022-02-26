<template>
  <!-- ////新增用户弹窗 -->
  <div class="add-form">
    <el-dialog
      :title="pageTitle"
      @close="handleClose"
      :visible="dialogFormVisible"
    >
      <el-form
        :rules="ruleInline"
        ref="dataForm"
        :model="formBase"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left: 120px"
      >
        <el-form-item :label="$t('table.username')" prop="username">
          <el-input v-model="formBase.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.email')" prop="email">
          <el-input v-model="formBase.email"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('table.paddword')"
          prop="password"
          v-if="formBase.password != undefined"
        >
          <el-input v-model="formBase.password"></el-input>
        </el-form-item>

        <!-- 角色 -->
        <el-form-item :label="$t('table.role')" prop="role">
          <el-input v-model="formBase.role"></el-input>
        </el-form-item>
        <!-- 权限组 -->
        <el-form-item
          :label="$t('table.permissionUser')"
          prop="permission_group_id"
        >
          <el-select class="filter-item" v-model="formBase.permission_group_id">
            <el-option
              v-for="item in PermissionGroupsList"
              :value="item.id"
              :key="item.key"
              :label="item.title"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('table.phone')" prop="phone">
          <el-input v-model="formBase.phone"></el-input>
        </el-form-item>

        <!-- 头像上传下一个版本再做 -->
        <!-- <el-form-item :label="$t('table.avatar')" prop="avatar">
            <el-upload
              class="upload-demo"
              :action="importFileUrl"
              :on-change="handleChange"
              :file-list="fileList" accept="image/jpeg,image/gif,image/png,image/bmp"
              :before-upload="beforeAvatarUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>-->
        <el-form-item :label="$t('table.introduction')">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="Please input"
            v-model="formBase.introduction"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createData">{{
          $t('table.confirm')
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { detail, update, add } from '@/api/base/users'
export default {
  name: 'usersAdd',
  props: [
    'dialogFormVisible', // 控制弹窗的布尔值
    // 'text',
    'pageTitle',
    'PermissionGroupsList',
    'formBase'
    // 'ruleInline'
  ],
  data () {
    return {
      // pageTitle: '新增用户',
      // 校验规则
      ruleInline: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        email: [{ required: true, trigger: 'blur', message: '邮箱不能为空' }],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { min: 6, max: 16, trigger: 'blur', message: '密码不满足6~16位' }
        ],
        phone: [
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  methods: {
    // 弹层显示
    dialogFormV () {
      this.dialogFormVisible = true
    },
    // 弹层隐藏
    dialogFormH () {
      this.dialogFormVisible = false
    },
    // 退出
    handleClose () {
      this.$refs.dataForm.resetFields()
      this.$emit('update:dialogFormVisible', false)
      this.$emit('closeClear')
    },

    // 表单提交
    async createData () {
      try {
        // 校验表单规则
        await this.$refs.dataForm.validate()
        if (this.formBase.id) {
          // 子传父编辑
          this.$emit('updateConfirmModal', this.formBase)
        } else {
          // 子传父新增
          await this.$emit('addConfirmModal', this.formBase)
        }
        // 点击确定时,子传父进行数据提交

        // 子传父关闭弹窗
        this.$emit('update:dialogFormVisible', false)
      } catch (error) {
        console.log(error)
      }
    }
  },
  // 挂载结束

  mounted: function () {},
  // 创建完毕状态
  created () {},
  // 组件更新
  updated: function () {}
}
</script>
<style>
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-form-item--medium {
  margin-bottom: 22px;
}
.el-dialog__footer {
  text-align: center;
}
</style>
