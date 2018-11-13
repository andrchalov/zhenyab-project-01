import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import accountModule from './account'
import userModule from './user'

Vue.use(Vuex)

axios.defaults.baseURL = process.env['VUE_APP_API_URL']

axios.interceptors.request.use(
  config => {
    if (store.state.accessToken) {
      config.headers['Authorization'] = 'Bearer '+store.state.accessToken
      config.headers['Accept-Language'] = store.state.language+'_'+store.state.country
    }

    return config
  },
  error => Promise.reject(error)
);

const store = new Vuex.Store({
  modules: {
    account: accountModule,
    user: userModule
  },
  state: {
    // accessToken: null,
    accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNTQyMTQyMjQ2LCJleHAiOjE1NDIyMjg2NDZ9.uZP1QKSrfCNxBti_t1GkTgQkqt4JfZtgeK5wUprccbtDeYxizBhN4pQ0a7GDlGCSbIJWOTUFX0w-SwaZS-il5A',
    country: 'US',
    language: 'en',
    tokenType: null
  },
  getters: {
    accessToken: state => state.accessToken,
    country: state => state.country,
    language: state => state.language,
    tokenType: state => state.tokenType
  },
  actions: {
    login({commit}, data) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        transformRequest: [
          function(data, headers) {
            let formData = new FormData();
            Object.keys(data).forEach(attr => {
              formData.append(attr, data[attr]);
            });
            return formData;
          }
        ]
      }

      return axios.post('/auth/login', data, config)
        .then(
          response => {
            commit('LOGGED_IN', response.data)
          },
          error => {
            return Promise.reject(error.response.data)
          }
        )
    }
  },
  mutations: {
    LOGGED_IN(state, value) {
      state.accessToken = value.accessToken
      state.country = value.country
      state.language = value.language
      state.tokenType = value.tokenType
    }
  }
})

export default store
