export default {
  namespaced: true,

  state: {
    allFlights: [],
    flightIsUpdating: null,
  },

  getters: {
    currentFlight: (state) => state.allFlights.filter((el) => el.chosenFlight)[0],
    availableFlight: (state) => state.allFlights.filter((el) => !el.chosenFlight),
  },

  mutations: {
    updateAllFlights: (state, payload) => {
      state.allFlights = payload;
    },
    updateCurrentFlight: (state, flightNo) => {
      state.allFlights = state.allFlights.map((el) => ({
        ...el,
        chosenFlight: el.flights.depRoute.flightNo === flightNo,
      }));
    },
    changeFlightLoader: (state, payload) => {
      state.flightIsUpdating = payload;
    },
  },

  actions: {
    updateAllFlights: ({ commit }, payload) => {
      commit('updateAllFlights', payload);
    },
    selectNewFlight: ({ state, commit }, payload) => {
      if (state.flightIsUpdating) return;
      commit('changeFlightLoader', payload);
      commit('updateCurrentFlight', payload);
      commit('changeFlightLoader', null);
    },
    // Action to save passed data on server
    // Will be done in future
    saveData: () => {},
  },
};
