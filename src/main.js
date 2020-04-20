
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import fetch from "./assets/js/http.js"
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/css/mystyle.css'
import store from './store/store'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)//点击图片放大效果
import 'babel-polyfill'

Vue.prototype.$axios = axios
Vue.prototype.http = fetch.http

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.baseUrl;
Vue.use(Vant);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
