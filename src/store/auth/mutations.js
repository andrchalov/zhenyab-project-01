// Auth module
// mutations

export default {
  LOAD(state) {
    state.accessToken = sessionStorage.getItem('accessToken')
    state.country = sessionStorage.getItem('country')
    state.language = sessionStorage.getItem('language')
    state.tokenType = sessionStorage.getItem('tokenType')
  },
  SAVE(state) {
    if (state.accessToken) {
      sessionStorage.setItem('accessToken', state.accessToken)
    } else {
      sessionStorage.removeItem('accessToken')
    }

    if (state.country) {
      sessionStorage.setItem('country', state.country)
    } else {
      sessionStorage.removeItem('country')
    }

    if (state.language) {
      sessionStorage.setItem('language', state.language)
    } else {
      sessionStorage.removeItem('language', state.language)
    }

    if (state.tokenType) {
      sessionStorage.setItem('tokenType', state.tokenType)
    } else {
      sessionStorage.removeItem('tokenType', state.tokenType)
    }
  },
  SET(state, {accessToken, country, language, tokenType}) {
    state.accessToken = accessToken
    state.country = country
    state.language = language
    state.tokenType = tokenType
  },
  CLEAR(state) {
    state.accessToken = null
    state.country = null
    state.language = null
    state.tokenType = null
  }
}
