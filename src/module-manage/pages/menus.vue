<template>
  <div class="app-container">
    <!-- 菜单管理 -->
    <el-card>
      <el-row type="flex" justify="end" class="addBtn">
        <el-button type="success" @click="menuDialog"
          ><i class="el-icon-edit"></i>添加菜单</el-button
        >
      </el-row>
      <el-table
        :data="menuList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'childs' }"
        :header-cell-style="{
          'background-color': '#fafafa',
          'border-bottom': '1px #ccc solid'
        }"
      >
        <!-- code: "base" id: 28 pid: null title: "后台框架" -->
        <!-- , hasChildren: 'hasChildren' -->
        <el-table-column label="标题" width="180">
          <template v-slot="{ row }">
            <i
              :class="
                row.childs
                  ? 'el-icon-folder-opened'
                  : row.is_point
                  ? 'el-icon-view'
                  : 'el-icon-tickets'
              "
            />{{ row.title }}
          </template>
        </el-table-column>
        <el-table-column min-width="500px" prop="code" label="代码权限点">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              class="small-btn"
              @click="editMenu(row.id)"
            ></el-button>
            <el-button
              @click="removeMenu(row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              class="small-btn"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <MenuAdd
      :dialogFormVisible.sync="dialogFormVisible"
      ref="menuRef"
      @newDataes="newDataes"
    ></MenuAdd>
  </div>
</template>

<script>
import MenuAdd from '../components/menu-add.vue'
import { list, remove, update } from '@/api/base/menus'
import { Message } from 'element-ui'
export default {
  computed: {},
  data () {
    return {
      dialogFormVisible: false,
      defaultProps: {
        label: 'title', // 表示 从这个属性显示内容
        children: 'childs'
      },
      menuList: [] // 菜单数据
    }
  },
  components: {
    MenuAdd
  },
  created () {
    this.list()
  },
  methods: {
    // 编辑菜单
    async newDataes (menu) {
      await update(menu)
      await this.list()
      this.dialogFormVisible = false
      Message.success('编辑成功')
    },
    // 编辑菜单数据回写
    editMenu (id) {
      this.$refs.menuRef.handle_Edit_data(id)
    },
    // 删除菜单
    async removeMenu (id) {
      await this.$confirm('你确定要删除这个菜单吗?')
      await remove({ id })
      this.list()
      Message.success('删除成功')
    },
    // 点击新增弹窗调用子组件方法
    menuDialog () {
      this.$refs.menuRef.handleResetForm()
      this.dialogFormVisible = true
    },
    // 递归处理树形图第三层points转childs数据
    menuHandle (arr) {
      arr.forEach((item) => {
        if (item.childs?.length) {
          this.menuHandle(item.childs)
        } else if (item.points?.length) {
          item.childs = item.points
        }
      })
    },
    // 获取页面数据
    async list () {
      const { data } = await list()
      // 递归处理数据
      this.menuHandle(data)
      this.menuList = data
    }
  }
}
</script>

<style scoped lang="less">
.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px !important;
  line-height: 60px !important;
}
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
.addBtn {
  margin-bottom: 20px;
}

/deep/ .el-icon-arrow-right {
  display: none;
}
[class^='el-icon'] {
  margin-right: 5px;
}
/deep/ .el-tree-node__content {
  border-top: 1px solid !important;
}
/deep/ .el-table__expand-icon {
  display: none !important;
}
</style>
