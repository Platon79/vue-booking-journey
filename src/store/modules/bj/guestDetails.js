export default {
  namespaced: true,

  state: {
    passengers: [],
    specialRequests: [],
    specialRequestText: '',
    marketingPreferences: [],
    specialRequestsOptions: [],
    marketingOptions: [
      {
        label: 'By Email',
        value: 'email',
      },
      {
        label: 'By post',
        value: 'post',
      },
      {
        label: 'By SMS',
        value: 'tel',
      },
    ],
  },

  mutations: {
    updatePassengers: (state, payload) => {
      state.passengers = payload;
    },
    updateSpecialRequests: (state, payload) => {
      state.specialRequests = payload;
    },
    updateSpecialRequestText: (state, payload) => {
      state.specialRequestText = payload;
    },
    updateMarketingPreferences: (state, payload) => {
      state.marketingPreferences = payload;
    },
    updateSpecialRequestsOptions: (state, payload) => {
      state.specialRequestsOptions = payload;
    },
  },

  actions: {
    updatePassengerField: ({ state, commit }, { index, fieldName, value }) => {
      const newPassengers = state.passengers.map((person) => ({
        ...person,
        [fieldName]: index === person.index ? value : person[fieldName],
      }));
      commit('updatePassengers', newPassengers);
    },
    updateSpecialRequests: ({ commit }, { payload, isInitial }) => {
      commit('updateSpecialRequests', payload);
      if (isInitial) commit('updateInitialSpecialRequests', payload);
    },
    updateSpecialRequestsOptions: ({ commit }, payload) => {
      commit('updateSpecialRequestsOptions', payload);
    },
    updateSpecialRequestText: ({ commit }, { payload, isInitial }) => {
      commit('updateSpecialRequestText', payload);
      if (isInitial) commit('updateInitialSpecialRequestText', payload);
    },
    updateMarketingPreferences: ({ commit }, { payload, isInitial }) => {
      commit('updateMarketingPreferences', payload);
      if (isInitial) commit('updateInitialMarketingPreferences', payload);
    },
  },
};
