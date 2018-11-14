import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {i18n} from '@/i18n-setup'

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
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: DefaultContainer,
      redirect: '/accounts',
      children: [
        {
          path: 'accounts',
          meta: { label: i18n.t('accounts') },
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Accounts,
              meta: {
                requiresAuth: true
              }
            },
            {
              path: ':account_id/users',
              name: 'Users',
              component: Users,
              meta: {
                label: 'Users',
                requiresAuth: true
              },
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['auth/accessToken']) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(!store.getters['auth/accessToken']){
      next()
    } else {
      next({ path: '/accounts'})
    }
  } else {
    next()
  }
});

export default router
