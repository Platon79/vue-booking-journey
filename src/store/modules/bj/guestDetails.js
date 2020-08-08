export default {
  namespaced: true,

  state: {
    passengers: [],
    specialRequests: [],
    specialRequestText: '',
    specialRequestsOptions: [
      { id: 1, name: 'Mini Bar' },
      { id: 2, name: 'Split Beds' },
      { id: 3, name: 'TV' },
      { id: 4, name: 'Radio' },
      { id: 5, name: 'Stroller' },
    ],
    marketingPreferences: [],
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
    leadPassengerData: {
      contactNumber: '',
      email: '',
      addressCity: '',
      addressCountry: '',
      addressCounty: '',
      addressLine1: '',
      addressLine2: '',
      addressPostcode: '',
    },
  },

  mutations: {
    updatePassengers: (state, payload) => {
      state.passengers = payload;
    },
    updateLeadPassengerData: (state, payload) => {
      state.leadPassenger = payload;
    },
    updateSpecialRequests: (state, payload) => {
      state.specialRequests = payload;
    },
    updateSpecialRequestText: (state, payload) => {
      state.specialRequestText = payload;
    },
    updateSpecialRequestsOptions: (state, payload) => {
      state.specialRequestsOptions = payload;
    },
    updateMarketingPreferences: (state, payload) => {
      state.marketingPreferences = payload;
    },
  },

  actions: {
    updatePassengers: ({ commit }, payload) => {
      commit('updatePassengers', payload);
    },
    updateLeadPassengerData: ({ commit }, { payload }) => {
      commit('updateLeadPassengerData', payload);
    },
    updatePassengerField: ({ state, commit }, { index, fieldName, value }) => {
      const newPassengers = state.passengers.map((person) => ({
        ...person,
        [fieldName]: index === person.index ? value : person[fieldName],
      }));
      commit('updatePassengers', newPassengers);
    },
    updateSpecialRequests: ({ commit }, { payload }) => {
      commit('updateSpecialRequests', payload);
    },
    updateSpecialRequestText: ({ commit }, { payload }) => {
      commit('updateSpecialRequestText', payload);
    },
    updateSpecialRequestsOptions: ({ commit }, payload) => {
      commit('updateSpecialRequestsOptions', payload);
    },
    updateMarketingPreferences: ({ commit }, { payload }) => {
      commit('updateMarketingPreferences', payload);
    },
    saveData: () => {

    },
  },
};
