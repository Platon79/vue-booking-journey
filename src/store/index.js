import Vue from 'vue';
import Vuex from 'vuex';
import bookingJourney from './modules/bj/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bookingJourney,
  },
});
