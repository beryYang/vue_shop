import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import Login from '../components/Login.vue'
// 导入主页
import Home from '../components/Home.vue'
// 导入欢迎组件
import Welcome from '../components/Welcome.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: '/login' },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// to 将要去的文件
// from 代表访问的路径
// next 放行
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
