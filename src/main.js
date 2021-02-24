import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(VueGeolocation)

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
console.log(process.env.VUE_APP_URL)
console.log(process.env.VUE_APP_URL2)
console.log(process.env.VUE_APP_URL3)
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDwAJVaGUX7xthQXx4HMEdOjd1CCM0t9Og',
    libraries: 'places' // This is required
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
