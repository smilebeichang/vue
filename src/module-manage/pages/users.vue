<template>
  <div class="app-container">
    <el-card>
      <el-form>
        <el-form-item>
          <el-row type="flex" justify="space-between">
            <el-row type="flex">
              <el-col>
                <el-input
                  placeholder="根据用户名搜索"
                  v-model="searchUser"
                ></el-input>
              </el-col>

              <el-button @click="clearSearch">清除</el-button>

              <el-button type="primary" @click="searchFn">搜索</el-button>
            </el-row>
            <el-row>
              <el-col>
                <!-- 新增用户按钮 -->
                <el-button
                  type="success"
                  class="add-button"
                  @click="dialogFormVisible = true"
                  ><i class="el-icon-edit"></i>新增用户</el-button
                >
              </el-col>
            </el-row>
          </el-row>
        </el-form-item>
      </el-form>

      <el-alert
        :title="`共${total}条记录`"
        type="info"
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-table
        :data="userList"
        style="width: 100%"
        :header-cell-style="{
          'background-color': '#FAFAFA',
          'border-bottom': '1px solid #ccc'
        }"
      >
        <el-table-column
          align="center"
          fixed
          prop="id"
          label="序号"
          width="200"
        >
        </el-table-column>
        <el-table-column align="center" prop="email" label="邮箱">
        </el-table-column>
        <el-table-column align="left" prop="phone" label="联系电话" width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="用户名"
          width="150"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="permission_group_title"
          label="权限组名称"
        >
        </el-table-column>
        <el-table-column align="center" prop="role" label="角色" width="120">
        </el-table-column>
        <el-table-column
          width="150"
          label="操作"
          show-overflow-tooltip
          align="center"
        >
          <!-- 插槽获取行id -->
          <template v-slot="{ row }">
            <el-row type="flex" justify="center">
              <!-- 编辑按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                class="small-btn"
                @click="editUser(row.id)"
              ></el-button>
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                class="small-btn"
                @click="delUser(row.id)"
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <PageTool
          :total="total"
          :paginationPage="users.page"
          :paginationPagesize="users.pagesize"
          @pageChange="pageChange"
          @pageSizeChange="pageSizeChange"
        ></PageTool>
      </el-row>
    </el-card>
    <!-- 用户页面新增权限组弹窗 -->
    <UserAdd
      :dialogFormVisible.sync="dialogFormVisible"
      :formBase="formBase"
      @addConfirmModal="addSubmitForm"
      @updateConfirmModal="updateSubmitForm"
      :PermissionGroupsList="PermissionGroupsList"
      @closeClear="closeClear"
      :pageTitle="showTitle"
    ></UserAdd>
  </div>
</template>

<script>
import { parseTimeSy } from '@/filters/index'
import { simple } from '@/api/base/permissions'
import { list, add, remove, detail, update } from '@/api/base/users'
import PageTool from '../components/page-tool.vue'
import UserAdd from '../components/user-add.vue'
import { Message } from 'element-ui'
export default {
  computed: {
    showTitle () {
      return this.formBase.id ? '编辑用户' : '新增用户'
    }
  },
  name: 'USER',
  data () {
    return {
      last_update_time: '',
      create_time: '',
      // 搜索用户名
      searchUser: '',
      // 权限组简单列表
      PermissionGroupsList: [],
      // 父传子表单
      formBase: {
        username: '', // 用户名
        email: '', // 邮箱
        password: '', // 密码
        role: '', // 角色
        permission_group_id: [], // 权限组名称
        phone: '', // 电话
        introduction: '' // 介绍
      },
      //  获取简单列表数据
      userList: [],
      // 请求参数
      users: {
        page: 1,
        pagesize: 10
      },
      // 总条目
      total: 0,
      // 控制弹窗显示和隐藏的布尔值
      dialogFormVisible: false
    }
  },

  created () {
    this.list()
    this.simple()
  },

  methods: {
    // 点击关闭弹窗的时候清空表单
    closeClear () {
      this.formBase = {
        username: '', // 用户名
        email: '', // 邮箱
        password: '', // 密码
        role: '', // 角色
        permission_group_id: [], // 权限组名称
        phone: '', // 电话
        introduction: '' // 介绍
      }
    },
    // 清除搜索,并且重置表单
    clearSearch () {
      this.searchUser = ''
      this.list()
    },
    // 搜索筛选
    searchFn () {
      if (this.searchUser) {
        this.userList = this.userList.filter(
          (item) => item.username === this.searchUser
        )
      } else {
        this.list()
      }
    },
    // 编辑,点击确定更新数据
    async updateSubmitForm (formData) {
      await update({
        ...formData,
        create_time: this.create_time,
        last_update_time: this.last_update_time
      })
      this.list()
      this.dialogFormVisible = false
      Message.success('编辑成功')
    },
    // 编辑,实现数据的回写
    async editUser (id) {
      const { data } = await detail(id)
      this.create_time = parseTimeSy(data.create_time)
      this.last_update_time = parseTimeSy(data.last_update_time)
      this.formBase = data
      this.dialogFormVisible = true
    },
    // 删除角色
    async delUser (id) {
      try {
        await this.$confirm('你确定要删除吗？')
        await remove(id)
        this.list()
      } catch (error) {
        console.log(error)
      }
    },
    // 子传父，分页单页面显示条数改变触发
    pageSizeChange (pagesize) {
      this.users.pagesize = pagesize
      this.list()
    },
    // 子传父，分页单页面页码改变触发
    pageChange (page) {
      this.users.page = page
      this.list()
    },
    // 调用接口获取权限组简单列表
    async simple () {
      const { data } = await simple()
      this.PermissionGroupsList = data
    },
    // 弹窗点击确定触发事件
    async addSubmitForm (formData) {
      // 调用接口获取请求
      await add(formData)
      this.list()
    },
    // 获取简单列表
    async list () {
      const { data } = await list(this.users)
      this.userList = data.list
      this.total = data.counts
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  components: {
    PageTool, // 分页组件
    UserAdd // 新增权限组弹窗组件
  }
}
</script>

<style scoped lang="less">
.el-card {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  transition: 0.3s;
  .el-input__inner {
    height: 32px;
  }
  .el-input {
    width: 200px;
    margin-right: 15px;
  }
  .el-button {
    width: 56px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 15px !important;
  }
  .add-button {
    width: 109px;
    height: 36px;
  }
  .small-btn {
    width: 36px;
  }
  .el-table {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
