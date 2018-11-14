// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Notify from 'vue2-notify'

import App from './App'
import store from './store'

import {i18n} from '@/i18n-setup'

Vue.use(BootstrapVue)
Vue.use(Notify, {visibility: 3000, permanent: true, position: 'bottom-right'})
Vue.use(require('vue-moment'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  },
  created() {
    this.$store.commit('auth/LOAD')
    i18n.locale = this.$store.getters['auth/language'] || 'en';
  }
})
