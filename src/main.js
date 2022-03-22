import App from './App.vue'
import router from './js/router.js'
import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
