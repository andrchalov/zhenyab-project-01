import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import authModule from './auth'
import accountModule from './account'
import userModule from './user'

Vue.use(Vuex)

axios.defaults.baseURL = process.env['VUE_APP_API_URL']

axios.interceptors.request.use(
  config => {
    if (store.getters['auth/accessToken']) {
      config.headers['Authorization'] = 'Bearer '+store.getters['auth/accessToken']
    }

    if (store.getters['auth/language'] && store.getters['auth/country']) {
      config.headers['Accept-Language'] = store.getters['auth/language']+'_'+store.getters['auth/country']
    }

    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch('auth/logout')
    }
  }
)

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    account: accountModule,
    user: userModule
  }
})

export default store
