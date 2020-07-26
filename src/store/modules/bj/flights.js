import { NAV_FLIGHTS_STEP } from '../../../constants';

export default {
  namespaced: true,

  state: {
    allFlights: [],
  },

  getters: {
    currentFlight: (state) => state.allFlights.filter((el) => el.chosenFlight)[0],
    availableFlight: (state) => state.allFlights.filter((el) => !el.chosenFlight),
  },

  mutations: {
    updateAllFlights: (state, payload) => {
      state.allFlights = payload;
    },
    updateCurrentFlight: (state, code) => {
      state.allFlights = state.allFlights.map((el) => ({
        ...el,
        chosenFlight: el.code === code,
      }));
    },
  },

  actions: {
    updateAllFlights: ({ commit }, payload) => {
      commit('updateAllFlights', payload);
    },
    selectNewFlight: ({ commit }, code) => {
      commit('updateCurrentFlight', code);
    },
    saveData: ({ commit, rootState }) => {
      const nav = rootState.bookingJourney.navigation.map((el) => ({
        ...el,
        completed: el.stepName === NAV_FLIGHTS_STEP ? true : el.completed,
      }));
      commit('bookingJourney/updateNavigation', nav, { root: true });
      // send data to the server
    },
  },
};
