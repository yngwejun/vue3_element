<template>
  <div class="index">
    <el-container style="height: 100%;border: 1px solid #ddd;">
      <el-header style="height: 50px;background-color: #474747;">
        <div>
          <img src="../assets/logo.png" alt="logo">
          <span>后台管理系统</span>
        </div>
        <el-button class="sign-out">退出</el-button>
      </el-header>
      <el-container>
        <HomeMenu/>
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { VueCookies } from 'vue-cookies'
import { useRouter } from 'vue-router'
import HomeMenu from '@/components/HomeMenu.vue'

export default defineComponent({
  components: {
    HomeMenu
  },
  setup () {
    const cookies = inject<VueCookies>('$cookies')
    const token = cookies?.get('token')
    // console.log('token', token)
    const router = useRouter()
    const goto = () => {
      router.push('/login')
    }
    if (token === null) {
      goto()
    }
    return {
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
.el-main {
  background-color: #eee;
}
</style>
