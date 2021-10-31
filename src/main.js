import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'


Vue.config.productionTip = false
Vue.prototype.$axios = axios.create({
  baseURL: 'http://47.103.198.84:3060',
  timeout: 5000
})

Vue.prototype.$axios.interceptors.request.use(config => {
  let token = JSON.parse(window.localStorage.getItem("token"))
  if (token) {
      config.headers.token = token;    //将token放到请求头发送给服务器
      return config;
  }
}, error => {
  return Promise.reject(error);
});

new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
