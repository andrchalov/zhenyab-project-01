import axios from 'axios'

const fetch = ({}, {account_id}) => {
  return axios.get('/account/users/'+account_id)
    .then(
      response => {
        return response.data
      }
    )
}

const add = ({dispatch}, data) => {
  return axios.post('/user', data)
    .then(
      response => {
        dispatch('fetch')
      }
    )
}

const edit = ({dispatch}, data) => {
  return axios.put('/user', data)
    .then(
      response => {
        dispatch('fetch')
      }
    )
}

export default {
  fetch,
  add,
  edit
}
