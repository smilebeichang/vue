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
                  v-model="searchPermissions"
                ></el-input>
              </el-col>

              <el-button @click="clearSearch">清除</el-button>

              <el-button type="primary" @click="searchFn">搜索</el-button>
            </el-row>
            <el-row>
              <el-col>
                <el-button
                  type="success"
                  class="add-button"
                  @click="dialogFormVisible = true"
                  ><i class="el-icon-edit"></i>新增权限组</el-button
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
        ref="multipleTable"
        :data="permissionsList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :header-cell-style="{
          'background-color': '#FAFAFA',
          'border-bottom': '1px solid #ccc'
        }"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="日期" sortable align="left">
          <template v-slot="{ row }">
            {{ row.update_date | parseTimeSy }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="操作"
          show-overflow-tooltip
          align="center"
        >
          <template v-slot="{ row }">
            <el-row type="flex" justify="center">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                class="small-btn"
                @click="editFn(row.id)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                class="small-btn"
                @click="delFn(row.id)"
              ></el-button
            ></el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row type="flex" justify="end">
        <PageTool
          :total="total"
          :paginationPage="addPermissions.page"
          :paginationPagesize="addPermissions.pagesize"
          @pageChange="pageChange"
          @pageSizeChange="pageSizeChange"
        ></PageTool>
      </el-row>
    </el-card>
    <!-- 弹窗 -->
    <PermissionsAdd
      :dialogFormVisible.sync="dialogFormVisible"
      @addPermissios="addPermissios"
      ref="refPerssions"
    ></PermissionsAdd>
  </div>
</template>

<script>
import { list, add } from '@/api/base/permissions'
import PermissionsAdd from '../components/permissions-add.vue'
import PageTool from '../components/page-tool.vue'
import { Message } from 'element-ui'
export default {
  name: 'qwe',
  data () {
    return {
      searchPermissions: '',
      total: 0, // 数据数量
      permissionsList: [],
      addPermissions: {
        page: 1,
        pagesize: 10
      },
      // 控制弹窗显示与否
      dialogFormVisible: false
    }
  },

  created () {
    this.list()
  },

  methods: {
    // 清除搜索,并且重置表单
    clearSearch () {
      this.searchPermissions = ''
      this.list()
    },
    // 搜索筛选
    searchFn () {
      if (this.searchPermissions) {
        this.permissionsList = this.permissionsList.filter(
          (item) => item.title === this.searchPermissions
        )
      } else {
        this.list()
      }
    },
    // 子传父，分页单页面显示条数改变触发
    pageSizeChange (pagesize) {
      this.addPermissions.pagesize = pagesize
      this.list()
    },
    // 子传父，分页单页面页码改变触发
    pageChange (page) {
      this.addPermissions.page = page
      this.list()
    },
    // 父传子删除数据
    delFn (id) {
      this.$refs.refPerssions.delPerssions(id)
    },
    editFn (id) {
      // 编辑弹窗
      this.$refs.refPerssions.editPerssions(id)
    },
    // 添加权限
    async addPermissios (title, permissions) {
      await add({ title, permissions })
      this.list()
      this.dialogFormVisible = false
      Message.success('新增成功')
    },
    // 获取权限组
    async list () {
      const { data } = await list(this.addPermissions)
      this.permissionsList = data.list
      this.total = data.counts
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  components: {
    PageTool,
    PermissionsAdd
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
  .el-table {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .small-btn {
    width: 36px;
  }
}
</style>
