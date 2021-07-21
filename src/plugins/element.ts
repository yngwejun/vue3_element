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
