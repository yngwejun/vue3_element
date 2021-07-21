# vue3_element

## 登录

```sh
邮箱：admin@admin.com
密码：123456
cookie 有效时间10分钟
```

## 网页预览

https://yngwejun.github.io/vue3_element

## element.ts

```ts
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElRow,
  ElCol,
  ElAlert
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import { App } from 'vue'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubmenu,
  ElRow,
  ElCol,
  ElAlert
]

export default (app:App<Element>):void => {
  locale.use(lang)
  components.forEach(component => {
    app.use(component)
  })
  // app.use(ElButton).use(ElFormItem).use(ElForm).use(ElInput).use(ElLink).use(ElMain).use(ElMenu).use(ElHeader).use(ElContainer).use(ElAside)
}
```

## main.ts

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import VueCookies from 'vue-cookies'

const app = createApp(App)
// app.config.globalProperties.$cookies = VueCookies
app.provide('$cookies', VueCookies)
installElementPlus(app)
app.use(store).use(router).mount('#app')
```

## cookie

##### cookie模块
```ts
export function setCookies (cname:string, cvalue:string, secound:number):void {
  const d = new Date()
  d.setTime(d.getTime() + (secound * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires
}
export function getCookies (cname:string):string|undefined {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
    return ''
  }
}
```

##### vue-cookies的使用
###### main.ts中使用
引入
```sh
import VueCookies from 'vue-cookies'
```
使用
```ts
app.provide('$cookies', VueCookies)
```

###### vue组件中使用

引入
```js
import { VueCookies } from 'vue-cookies'
import { inject } from 'vue'
```
使用
```ts
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
  ```

  ## Mock.js

  ##### 安装
  ```sh
  npm i mockjs -S
  ```

  ##### 使用

  ###### mock模块
  ```js
  import Mock from 'mockjs'

Mock.mock('/users', 'post', req => {
  const body = JSON.parse(req.body)
  const user = body.user
  const email = user.email
  const password = user.password
  console.log('pwd', user)
  const token = 'ef45ge13te145'
  if (email === 'admin@admin.com' && password === '123456') {
    console.log('登录成功')
    user.username = 'admin'
    delete user.password
    return Mock.mock({
      code: 200,
      message: '登录成功',
      token,
      user
    })
  } else {
    return {
      code: 401,
      message: '用户名和密码不正确'
    }
  }
})
```

###### 在需要的组件中导入

```js
import '../mock/login.js'
```

## axios

##### login
```ts
import { setCookies } from '@/cookies'
import axios from 'axios'

export function login (
  email:string,
  password:string,
  goto:() => void,
  changeMode: (number) => void,
  getTip: (string) => void
):void {
  console.log(email, password)
  axios({
    url: '/users',
    method: 'post',
    data: {
      user: {
        email,
        password
      }
    },
    responseType: 'json'
  }).then(res => {
    const { token, code, user } = res.data
    if (code === 200) {
      const { username, email } = user
      setCookies('token', token, 60 * 10)
      setCookies('user', username, 60 * 10)
      setCookies('email', email, 60 * 10)
      changeMode(1)
      const timer = setTimeout(() => {
        goto()
        clearTimeout(timer)
      }, 1000)
    } else if (res.data.code === 401) {
      changeMode(2)
      // alert(res.data.message)
      // console.log('message', typeof res.data.message)
      getTip(res.data.message)
      // goto()
    }
    console.log(res.data)
  }, err => {
    console.log(err)
  })
}
```

## gh-pages

##### 安装包

```sh
npm install gh-pages --save-dev
```

##### pakeage.json配置

```json
"homepage": "https://yngwejun.github.io/vue3_element"
```
script字段

```json
"deploy": "gh-pages -d dist"
```

项目根目录下新建配置文件`vue.config.js`
描述：这样做是为了在gh-pages分支展示项目网页时在 `https://yngwejun.github.io`之后加上
`/vue3_element`,这样请求到的资源，路劲才正确。
```js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue3_element" : "/"
}
```

部署

```sh
npm run deploy
```