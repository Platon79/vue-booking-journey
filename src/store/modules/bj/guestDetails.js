import { NAV_GUEST_DETAILS_STEP } from '../../../constants';

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
      $invalid: false,
      $validationTrigger: false,
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

  getters: {
    isDataValid: (state) => {
      let invalid = false;
      state.passengers.forEach((el) => {
        if (el.$invalid) {
          invalid = true;
        }
      });
      if (state.leadPassengerData.$invalid) {
        invalid = true;
      }
      return !invalid;
    },
  },

  mutations: {
    updatePassengers: (state, payload) => {
      state.passengers = payload;
    },
    updateLeadPassengerData: (state, payload) => {
      state.leadPassengerData = payload;
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
    initPsssengers: ({ dispatch }, payload) => {
      let adultIndex = 0;
      let childIndex = 0;
      let infantIndex = 0;
      const passengers = payload.map((person) => {
        const newPerson = {
          ...person,
          $invalid: false,
          $validationTrigger: false,
        };
        if (newPerson.isAdult) {
          adultIndex += 1;
          return {
            ...newPerson,
            ageBasedIndex: adultIndex,
          };
        }
        if (newPerson.isInfant) {
          infantIndex += 1;
          return {
            ...newPerson,
            ageBasedIndex: infantIndex,
          };
        }
        childIndex += 1;
        return {
          ...newPerson,
          ageBasedIndex: childIndex,
        };
      });
      dispatch('updatePassengers', passengers);
    },
    updatePassengers: ({ commit }, payload) => {
      commit('updatePassengers', payload);
    },
    updateLeadPassengerData: ({ commit }, payload) => {
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
    triggerValidation: ({ state, commit }) => {
      const newPassengers = state.passengers.map((el) => {
        if (el.$invalid) {
          return {
            ...el,
            $validationTrigger: !el.$validationTrigger,
          };
        }
        return { ...el };
      });
      commit('updatePassengers', newPassengers);
      if (state.leadPassengerData.$invalid) {
        commit('updateLeadPassengerData', {
          ...state.leadPassengerData,
          $validationTrigger: !state.leadPassengerData.$validationTrigger,
        });
      }
    },
    saveData: ({ commit, rootState }) => {
      const nav = rootState.bookingJourney.navigation.map((el) => ({
        ...el,
        completed: el.stepName === NAV_GUEST_DETAILS_STEP ? true : el.completed,
      }));
      commit('bookingJourney/updateNavigation', nav, { root: true });
      // send data to the server
    },
  },
};
