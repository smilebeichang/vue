<template>
  <el-card class="box-card">
    <el-form :model="form" label-width="80px" size="small">
      <el-form-item class="demo-form" label="标签名称">
        <el-input v-model="form.tags"></el-input>
      </el-form-item>
      <el-form-item class="demo-form" label="城市">
        <el-select
          placeholder="请选择"
          v-model="form.value"
          @change="getCityInfo"
        >
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区" class="demo-form">
        <el-select placeholder="请选择" v-model="form.cityModel">
          <el-option
            v-for="item in cityOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业简称" class="demo-form">
        <el-input v-model="form.shortName"></el-input>
      </el-form-item>
      <el-form-item label="状态" class="demo-form">
        <el-select
          style="width: 100%"
          placeholder="请选择"
          v-model="form.state"
        >
          <el-option label="启用" :value="1"> </el-option>
          <el-option label="禁止" :value="0"> </el-option>
        </el-select>
      </el-form-item>
      <template>
        <el-form-item class="demo-form" style="text-align: left">
          <el-button size="small" @click="btnClose">清除</el-button>
          <el-button size="small" type="primary" @click="searchInfo"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item
          style="width: 50%; display: inline-block; text-align: right"
        >
          <el-button
            type="success"
            size="small"
            icon="el-icon-edit"
            @click="btnAddList"
            >新增用户</el-button
          >
        </el-form-item>
      </template>
    </el-form>

    <el-alert
      :title="`共${total}条记录`"
      type="info"
      :closable="false"
      show-icon
    >
    </el-alert>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号"> </el-table-column>
      <el-table-column prop="number" label="企业编号"> </el-table-column>
      <el-table-column prop="shortName" label="企业简称"> </el-table-column>
      <el-table-column prop="tags" label="标签"> </el-table-column>
      <el-table-column prop="creatorID" label="创建者"> </el-table-column>
      <el-table-column prop="addDate" label="创建日期"> </el-table-column>
      <el-table-column prop="remarks" label="备注"> </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          {{ scope.row.state === 1 ? '启用' : '禁用' }}
        </template></el-table-column
      >
      <el-table-column label="操作" width="180px">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            circle
            @click="updateList(row)"
          ></el-button>
          <el-tooltip
            class="item"
            effect="dark"
            :content="row.state === 1 ? '禁用' : '启用'"
            placement="top-start"
          >
            <el-button
              @click="changestatus(row)"
              plain
              :type="row.state === 1 ? 'warning' : 'success'"
              :icon="row.state === 1 ? 'el-icon-close' : 'el-icon-check'"
              circle
            ></el-button>
          </el-tooltip>
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            circle
            @click="delList(row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      :current-page="form.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="form.pagesize"
      layout="prev, pager, next,sizes,jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog
      :title="`${showText}用户`"
      class="AddList"
      :visible.sync="dialogVisible"
      width="60%"
      @close="btnCancel"
    >
      <el-form
        ref="AddformRef"
        :rules="AddformRef"
        :model="Addform"
        label-width="80px"
      >
        <el-form-item
          prop="shortName"
          label="企业名称"
          class="form-item"
          label-width="120px"
        >
          <el-input v-model="Addform.shortName"></el-input>
        </el-form-item>
        <el-form-item
          prop="company"
          label="所属公司"
          class="form-item"
          label-width="120px"
        >
          <el-input v-model="Addform.company"></el-input>
          https://www.tianyancha.com （在此可查询所属公司全称及简称）
        </el-form-item>
        <el-form-item
          label="城市地区"
          class="demo-form"
          style="margin-left: 60px; display: inline-block"
          label-width="120px"
          prop="province"
        >
          <el-select
            @change="changeCity"
            placeholder="请选择"
            v-model="Addform.province"
            style="width: 100px"
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display: inline-block" prop="city">
          <el-select
            placeholder="请选择"
            style="width: 100px"
            v-model="Addform.city"
          >
            <el-option
              v-for="item in cityOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="方向(企业标签)"
          class="form-item"
          label-width="120px"
          prop="tags"
        >
          <el-input v-model="Addform.tags"></el-input>
        </el-form-item>
        <el-form-item label="备注" class="form-item" label-width="120px">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="Addform.remarks"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="btnOk">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  getList,
  delList,
  actionState,
  updateList,
  addList,
  editList
} from '../../api/companys/list'
import { provinces, citys } from '../../api/hmmm/citys.js'
export default {
  data () {
    return {
      cityOptions: [],
      form: {
        page: 1,
        pagesize: 10,
        tags: '',
        shortName: '',
        value: '',
        cityModel: '',
        state: null
      },
      options: [],

      total: 0,
      tableData: [],
      map: [],
      dialogVisible: false,
      Addform: {
        province: '',
        city: '',
        shortName: '',
        company: '',
        tags: '',
        remarks: ''
      },
      province: '',
      city: '',

      AddformRef: {
        shortName: [
          { required: true, message: '企业简称不能为空', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '所属公司不能为空', trigger: 'blur' }
        ],
        province: [
          {
            required: true,
            message: '所属城市不能为空',
            trigger: 'change'
          }
        ],
        city: [
          {
            required: true,
            message: '所属地区不能为空',
            trigger: 'change'
          }
        ],
        tags: [{ required: true, message: '请输入标签', trigger: 'blur' }],
        remark: [{ required: true, message: '备注不能为空', trigger: 'blur' }]
      },
      actionopen: '' // 修改开启
    }
  },

  created () {
    this.getCompanysList()
    this.getprovinceList()
  },
  computed: {
    showText () {
      return this.Addform.id ? '编辑' : '创建'
    }
  },
  methods: {
    async btnOk () {
      this.$refs.AddformRef.validate()
      if (this.Addform.id) {
        this.Addform.isFamous = Boolean(this.Addform.isFamous)
        console.log(this.Addform)
        const res = await editList(this.Addform)
        console.log(res)
        this.getCompanysList()
        this.$message.success('更新成功')
      } else {
        this.Addform.isFamous = Boolean(this.Addform.isFamous)
        await addList(this.Addform)
        this.getCompanysList()
        this.$message.success('更新成功')
      }

      this.dialogVisible = false
    },

    searchInfo () {
      console.log(this.form.state)
      this.getCompanysList()
    },
    getprovinceList () {
      this.options = provinces()
      console.log(provinces())
    },
    changeCity () {
      const addcity = this.Addform.province
      this.cityOptions = citys(addcity)
      console.log(this.cityOptions)
      this.Addform.city = this.cityOptions[0]
      console.log(this.Addform.city)
    },
    getCityInfo () {
      const city = this.form.value
      this.cityOptions = citys(city)
      this.form.cityModel = this.cityOptions[0]
      console.log(this.form.cityModel)
    },
    btnClose () {
      this.form = {
        page: 1,
        pagesize: 10,
        tags: '',
        shortName: '',
        value: '',
        cityModel: '',
        state: ''
      }
      this.cityOptions = []
      this.options = []
      this.getprovinceList()
      this.getCityInfo()
    },
    async getCompanysList () {
      const { data } = await getList(this.form)
      this.tableData = data.items
      this.total = data.counts
    },
    handleSizeChange (newSize) {
      this.form.pagesize = newSize
      this.getCompanysList()
    },
    handleCurrentChange (newPage) {
      this.form.page = newPage
      this.getCompanysList()
    },
    async delList (id) {
      try {
        await this.$confirm('确定要删除该数据吗')
        await delList(id)
        this.getCompanysList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    async changestatus (row) {
      const confirmResult = await this.$confirm(
        `已成功${row.state == 1 ? '禁用' : '启用'}, 是否继续?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)

      if (confirmResult !== 'confirm') {
        return this.$message.info('您取消了操作')
      }
      try {
        await actionState({
          id: row.id,
          state: row.state === 1 ? 0 : 1
        })
        row.state = row.state === 1 ? 0 : 1
        this.$message.success(`已成功${row.state == 1 ? '禁用' : '启用'}`)
      } catch (error) {
        this.$message('设置状态失败!')
      }
    },
    async updateList (row) {
      this.dialogVisible = true
      const { data } = await updateList(row.id)
      console.log(data)
      this.Addform = data
      // this.Addform.value = res.data.province
      // this.Addform.cityModel = res.data.city
      console.log(this.Addform)
    },
    btnAddList () {
      this.dialogVisible = true
    },
    btnCancel () {
      this.$refs.AddformRef.resetFields()
      this.dialogVisible = false
      this.Addform = {
        province: '',
        city: '',
        shortName: '',
        company: '',
        tags: '',
        remarks: ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin: 20px;
}
.demo-form {
  width: 25%;
  display: inline-block;
}

.form-item {
  width: 80%;
  margin-left: 50px;
}
.dialog-footer {
  padding-right: 33%;
}
</style>
