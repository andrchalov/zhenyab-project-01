// Auth module
// actions

import axios from 'axios'

export default {
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
          commit('SET', response.data)
          commit('SAVE')
        },
        error => {
          return Promise.reject(error.response.data)
        }
      )
  },
  logout({commit, dispatch}) {
    commit('CLEAR')
    commit('SAVE')

    location.reload()
  }
}
