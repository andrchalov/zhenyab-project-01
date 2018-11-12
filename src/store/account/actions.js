import axios from 'axios'

const fetch = ({commit}) => {
  return axios.get('/account')
    .then(
      response => {
        commit('LIST_UPDATED', response.data)
      }
    )
}

const add = ({dispatch}, data) => {
  return axios.post('/account', data)
    .then(
      response => {
        dispatch('fetch')
      }
    )
}

export default {
  fetch,
  add,
  // update
}
