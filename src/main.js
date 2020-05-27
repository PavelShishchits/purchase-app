import Vue from 'vue'
import App from './App.vue'
import './scss/main.scss'
import './registerServiceWorker'
import router from './router'
import store from './store'

// plugins
import vuetify from './plugins/vuetify';
import './plugins/vuelidate';

// helpers
import './helpers/index';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
