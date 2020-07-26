import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import store from './store';
import router from './router';
import './scss/index.scss';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
