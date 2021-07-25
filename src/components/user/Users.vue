<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="msg_state" label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.msg_state"
            @change="userStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEditUser(scope.row)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 8, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import '@/mock/users'
import { getUsers } from '@/axios'

export default defineComponent({
  setup () {
    const userList = ref([])
    const total = ref(0)
    const queryInfo = ref({
      query: '',
      pagenum: 1,
      pagesize: 5
    })
    // 获取用户数据
    const getUserList = () => {
      const result = getUsers(queryInfo.value)
      result.then(data => {
        const { users, totalpages, code } = data
        if (code === 200) {
          userList.value = users
          total.value = totalpages
        }
        // console.log('data', data)
      })
    }
    onMounted(() => {
      getUserList()
    })
    // 改变每页记录数
    const handleSizeChange = (newSize) => {
      queryInfo.value.pagesize = newSize
      getUserList()
    }
    // 改变页数
    const handleCurrentChange = (newPage) => {
      queryInfo.value.pagenum = newPage
      getUserList()
    }
    // 监听状态改变
    const userStateChange = (user) => {
      console.log(user)
    }
    // 删除用户
    const handleEditUser = (user) => {
      console.log(user)
    }
    return {
      userList,
      handleSizeChange,
      handleCurrentChange,
      queryInfo,
      total,
      userStateChange,
      handleEditUser
    }
  }
})
</script>

<style lang="css" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-card {
  box-shadow: 0 1px 1px #ddd;
}
.el-table {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
