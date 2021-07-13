<template>
  <div class="container">
    <div class="sign-in">
      <!-- 登录 -->
      <el-form
        class="form login-form clear-fix"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email" type="text" placeholder="请输入邮箱地址" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="loginForm.pass" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row gutter="10px">
            <el-col :span="12">
              <el-button
                type="primary"
                class="form-btn submit-btn"
                @click="submitForm"
                v-if="!successMode"
                >
                提交
              </el-button>
              <el-button
                type="success"
                v-else
                class="form-btn"
                >
                登录成功
              </el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                class="form-btn reset-btn"
                @click="resetForm()"
                >
                重置
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 找回密码 -->
        <div class="tiparea">
          <p>
            忘记密码?
            <el-link type="primary">找回密码</el-link>
          </p>
        </div>
      </el-form>
    </div>
    <div class="sign-up"></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, unref } from 'vue'
import { useRouter } from 'vue-router'

// 对密码和邮箱进行类型限制
interface loginData {
  email: string;
  pass: string;
}

export default defineComponent({
  setup () {
    const loginForm = ref<loginData>({
      email: '',
      pass: ''
    })
    const router = useRouter()
    const loginFormRef = ref()
    // 自定义验证规则
    const validatePass = (rule, value, callback) => {
      //  密码只能由大小写英文字母或数字开头，且由大小写英文字母_.组成
      const reg = /^[A-Za-z0-9][A-Za-z0-9_.]{5,14}$/
      console.log('reg', value.match(reg))
      if (!value.match(reg)) {
        callback(new Error('密码由字母或数字开头，且只能为字母,数字,下划线及（.）'))
      } else {
        callback()
      }
    }
    // 定义校验规则
    const loginRules = reactive({
      email: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
      ],
      pass: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 15, message: '密码位数只能在6~15之间', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
      ]
    })
    // 是否登录成功
    const successMode = ref<boolean>(false)
    // 重置表单
    const resetForm = () => {
      // 笨办法这么写：
      // loginForm.value.email = ''
      // loginForm.value.pass = ''
      // 明眼人这么写：
      const form = unref(loginFormRef)
      form.resetFields()
    }
    // 路由跳转
    const goto = () => {
      router.push('/')
    }
    // 表单提交
    const submitForm = async () => {
      const form = unref(loginFormRef)
      if (!form) {
        return
      }
      try {
        await form.validate()
        successMode.value = true
        // 路由跳转
        goto()
      } catch (err) {
        console.log(err)
      }
    }
    return {
      loginFormRef,
      loginForm,
      loginRules,
      resetForm,
      submitForm,
      successMode,
      goto
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.form {
  width: 360px;
  padding: 20px;
  border-radius: 10px;
}

.tiparea {
  float: right;
  a {
    color: blue;
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
}

.form {
  border: 1px solid #ddd;
}

.clear-fix::after {
  display: table;
  content: "";
  overflow: hidden;
  clear: both;
}

.login-form {
  box-shadow: 5px 5px 5px 5px darken(#145885, 0.1);
}
.form-btn {
  width: 48%;
}
.reset-btn {
  float: right;
}
.sign-in {
  background: url('../assets/login.jpg') no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
}
.el-form {
  position: absolute;
  right: 200px;
  top: 200px;
  background-color: #fff;
}
</style>
