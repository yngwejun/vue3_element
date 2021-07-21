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
