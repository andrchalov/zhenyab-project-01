// Auth module

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  accessToken: null,
  country: null,
  language: null,
  tokenType: null
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
