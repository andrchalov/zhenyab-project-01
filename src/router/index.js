import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Login = () => import('@/views/Login')
const Accounts = () => import('@/views/Accounts')
const Users = () => import('@/views/Users')


Vue.use(Router)

const router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: DefaultContainer,
      redirect: '/accounts',
      children: [
        {
          path: 'accounts',
          name: 'Accounts',
          component: Accounts,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/account/:account_id/users',
          name: 'Users',
          component: Users
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.accessToken == null) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(store.state.accessToken == null){
      next()
    } else {
      next({ name: 'Accounts'})
    }
  } else {
    next()
  }
});

export default router
