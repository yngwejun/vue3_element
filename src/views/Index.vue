<template>
  <div class="index">
    <el-container style="height: 100%;border: 1px solid #eee;">
      <el-header style="height: 50px;background-color: #545C64;">
        <div>
          <img src="../assets/logo.png" alt="logo">
          <span>后台管理系统</span>
        </div>
        <el-button class="sign-out">退出</el-button>
      </el-header>
      <el-container>
          <el-aside width="200px" style="background-color: #545C64;height: 100%;">
          <el-menu
            :uniqueOpened="true"
            class="el-menu-vertical-demo"
            text-color="#fff"
            background-color="#545c64"
            active-text-color="#ffd04b"
            @open="handleOpen"
            @close="handleClose"
            >
            <el-submenu index="1">
              <template #title><i class="el-icon-message"></i>用户管理</template>
              <el-menu-item-group>
                <template #title>分组一</template>
                <el-menu-item index="1-1">选项一</el-menu-item>
                <el-menu-item index="1-2">选项二</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template #title><i class="el-icon-menu"></i>商品管理</template>
              <el-menu-item-group>
                <template #title>分组一</template>
                <el-menu-item index="2-1">选项一</el-menu-item>
                <el-menu-item index="2-2">选项二</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组二">
                <el-menu-item index="2-3">选项一</el-menu-item>
                <el-menu-item index="2-4">选项二</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template #title><i class="el-icon-message"></i>订单管理</template>
              <el-menu-item-group>
                <template #title>分组一</template>
                <el-menu-item index="3-1">选项一</el-menu-item>
                <el-menu-item index="2-2">选项二</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template #title><i class="el-icon-message"></i>数据统计</template>
              <el-menu-item-group>
                <template #title>分组一</template>
                <el-menu-item index="4-1">选项一</el-menu-item>
                <el-menu-item index="4-2">选项二</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>内容区域</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { VueCookies } from 'vue-cookies'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const cookies = inject<VueCookies>('$cookies')
    const token = cookies?.get('token')
    console.log('token', token)
    const router = useRouter()
    const goto = () => {
      router.push('/login')
    }
    if (token === null) {
      goto()
    }
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleClose,
      handleOpen,
      goto
    }
  }
})
</script>

<style lang="scss" scoped>
  .index {
    height: 100%;
  }
  .header-content {
    height: 50px;
  }
  .logo {
    width: 30px;
  }
.r {
  text-align: right;
}
.grid-content {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  div {
    display: flex;
    align-items: center;
    img {
      height: 30px;
    }
    span {
      margin-left: 10px;
    }
  }
}
.sign-out {
  background-color: #99A9BF;
  color: #fff;
  &:hover{
    color: blue;
  }
}
</style>
