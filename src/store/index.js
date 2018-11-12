import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import accountModule from './account'

Vue.use(Vuex)

axios.defaults.baseURL = process.env['VUE_APP_API_URL']
axios.defaults.headers['Content-Type'] = 'multipart/form-data'

axios.defaults.transformRequest = [
  function(data, headers) {
    if (data && headers['Content-Type'] == 'multipart/form-data') {
      let formData = new FormData();
      Object.keys(data).forEach(attr => {
        formData.append(attr, data[attr]);
      });
      return formData;
    } else {
      return data
    }
  }
]

export default new Vuex.Store({
  modules: {
    account: accountModule
  },
  state: {
    // accessToken: null,
    accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNTQyMDQxNTI2LCJleHAiOjE1NDIxMjc5MjZ9.FrhwQTtgn8ookt73Bm63iDx0omU9JbG0zoKLWb5IQBfwLoHlaEDe9acXCV9ev0t1IT3txVmYzD7IHDAbIQ7PUw',
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
    init({state}) {
      axios.defaults.headers['Authorization'] = 'Bearer '+state.accessToken
      axios.defaults.headers['Accept-Language'] = state.language+'_'+state.country
    },
    login({commit}, data) {
      return axios.post('/auth/login', data)
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
