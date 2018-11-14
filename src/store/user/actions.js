import axios from 'axios'

export default {
  fetch({}, {account_id}) {
    return axios.get('/account/users/'+account_id)
      .then(
        response => {
          response.data.forEach((value) => {
            if (!value.enabled) {
              value['_rowVariant'] = 'danger'
            }
          })

          return response.data
        }
      )
  },
  add({dispatch}, data) {
    return axios.post('/user', data)
  },
  edit({dispatch}, data) {
    return axios.put('/user', data)
  },
  remove({dispatch}, {id}) {
    return axios.delete('/user/'+id)
  }
}
