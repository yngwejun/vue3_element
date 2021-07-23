import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: '/wellcome',
    children: [
      {
        path: '/wellcome',
        component: () => import('../components/WellCome.vue')
      },
      {
        path: '/users',
        component: () => import('../components/user/Users.vue')
      },
      {
        path: '/goods',
        component: () => import('../components/goods/Goods.vue')
      },
      {
        path: '/goodscate',
        component: () => import('../components/goods/GoodsCate.vue')
      },
      {
        path: '/orders',
        component: () => import('../components/order/Orders.vue')
      },
      {
        path: '/statdata',
        component: () => import('../components/statdata/StatData.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/login',
    name: 'LoginRegister',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
