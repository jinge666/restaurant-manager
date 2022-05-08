import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

import store from '@/store/index.js'
 Vue.prototype.$store = store

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 引入全局混入
import restaurant from './maxin/index.js'
Vue.mixin(restaurant)

App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})

// http拦截器
import httpInterceptor from '@/common/http.interceptor.js'
httpInterceptor.install(app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
httpApi.install(app)


app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif