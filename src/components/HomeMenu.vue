<template>
  <el-aside :width="asideWidth" style="background-color: #272727;height: 100%;">
    <div class="toggle-btn" @click="toggleCollapse">|||</div>
    <el-menu
      :uniqueOpened="true"
      class="el-menu-vertical-demo"
      text-color="#fff"
      background-color="#272727"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      :collapse="collapseMode"
      :collapse-transition="false"
      router
    >
      <!-- 一级菜单 -->
      <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
        <template #title>
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item :index="child.path" v-for="child in item.children" :key="child.id">
          <template #title>
            <i class="el-icon-menu"></i>
            <span>{{ child.name }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'

export default defineComponent({
  setup () {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    // 默认情况下el-menu是展开的
    const collapseMode = ref<boolean>(false)
    // 侧边栏的宽度
    const asideWidth = ref<string>('200px')
    // 菜单的折叠与展开效果
    const toggleCollapse = () => {
      // 改变折叠模式的boolean值
      collapseMode.value = !collapseMode.value
      // 调整el-aside的宽度，菜单折叠时变为el-menu的宽度
      collapseMode.value === false ? asideWidth.value = '200px' : asideWidth.value = '64px'
    }
    // 左侧菜单数据
    const menuList = [
      { id: '1', name: '用户管理', icon: 'el-icon-user', children: [{ id: '1-1', name: '用户列表', path: '/users' }] },
      { id: '2', name: '商品管理', icon: 'el-icon-goods', children: [{ id: '2-1', name: '商品列表', path: '/goods' }, { id: '2-2', name: '商品分类', path: '/goodscate' }] },
      { id: '3', name: '订单管理', icon: 'el-icon-s-order', children: [{ id: '3-1', name: '订单列表', path: '/orders' }] },
      { id: '4', name: '数据统计', icon: 'el-icon-pie-chart', children: [{ id: '4-1', name: '统计信息', path: '/statdata' }] }
    ]
    return {
      handleOpen,
      handleClose,
      menuList,
      toggleCollapse,
      collapseMode,
      asideWidth
    }
  }
})
</script>

<style lang="scss" scoped>
.toggle-btn {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu {
  border: none;
}
</style>
