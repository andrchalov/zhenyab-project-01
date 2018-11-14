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
    console.log(error)

    switch(error.response.status) {
      case 401:
        store.dispatch('auth/logout')
        break;
      case 500:
        Vue.$notify('Internal server error', 'error')
      default:
        // do nothing
    }

    return Promise.reject(error);
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
