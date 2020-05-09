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
    initPassengers: ({ commit }, payload) => {
      const leadPassenger = payload.find(el => el.leadPassenger);
      let leadIsFound = !!leadPassenger;
      let adultIndex = 0;
      const childAges = {};
      const infantAges = {};

      const getYoungerPassengersCount = (type, currentIndex, currentAge) => {
        const index = payload.reduce((acc, value) => {
          if (currentIndex === value.index) return acc;
          if (type === 'infant' && value.isInfant && value.age < currentAge) {
            return acc + 1;
          }
          if (type === 'child' && !value.isAdult && !value.isInfant && value.age < currentAge) {
            return acc + 1;
          }
          return acc;
        }, 1);
        if (type === 'infant') {
          if (Object.prototype.hasOwnProperty.call(infantAges, currentAge)) {
            infantAges[currentAge] += 1;
          } else {
            infantAges[currentAge] = 0;
          }
          return index + infantAges[currentAge];
        }
        if (Object.prototype.hasOwnProperty.call(childAges, currentAge)) {
          childAges[currentAge] += 1;
        } else {
          childAges[currentAge] = 0;
        }
        return index + childAges[currentAge];
      };
      const passengers = payload.map((person) => {
        const draft = {
          ...person,
          title: person.title || '',
          dateOfBirth: person.dateOfBirth
            ? moment(person.dateOfBirth, 'YYYY-MM-DD').format('DD/MM/YYYY').replace(/\//g, ' / ')
            : '',
          contactNumber: person.contactNumber || '',
          $invalid: false,
          $validationTrigger: false,
        };
        // Index for showing on the page and sidebar
        if (person.isAdult) {
          adultIndex += 1;
          draft.ageBasedIndex = adultIndex;
        } else if (person.isInfant) {
          draft.ageBasedIndex = getYoungerPassengersCount('infant', person.index, person.age);
        } else {
          draft.ageBasedIndex = getYoungerPassengersCount('child', person.index, person.age);
        }
        // If lead person wasn't found make first adult as lead
        if (!leadIsFound && person.isAdult) {
          leadIsFound = true;
          draft.leadPassenger = true;
          draft.contactNumber = '';
          draft.contactNumberType = 'mobile';
          draft.email = '';
          draft.addressCity = '';
          draft.addressCountry = '';
          draft.addressCounty = '';
          draft.addressLine1 = '';
          draft.addressLine2 = '';
          draft.addressPostcode = '';
        }
        return draft;
      });
      const orderedPassengers = passengers.sort((a, b) => {
        if (a.isAdult && b.isAdult) return a.index - b.index;
        if (a.isAdult) return -1;
        if (b.isAdult) return 1;
        return a.age - b.age;
      });
      commit('updatePassengers', orderedPassengers);
    },
  },
};
