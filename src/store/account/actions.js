import axios from 'axios'

export default {
  fetch({commit}) {
    return axios.get('/account')
      .then(
        response => {
          response.data.forEach((value, key) => {
            if (!value.enabled) {
              value['_rowVariant'] = 'danger'
            }
          })

          commit('LIST_UPDATED', response.data)
        }
      )
  },
  add({dispatch}, data) {
    return axios.post('/account', data)
      .then(
        response => {
          dispatch('fetch')
        }
      )
  },
  edit({dispatch}, data) {
    return axios.put('/account', data)
      .then(
        response => {
          dispatch('fetch')
        }
      )
  }
}
