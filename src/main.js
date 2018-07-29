// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import miniToastr from 'mini-toastr'

import router from './router'
import store from './store'

import '@/assets/base.scss'
import '@/assets/accessible.scss'

Vue.config.productionTip = false

miniToastr.init()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
