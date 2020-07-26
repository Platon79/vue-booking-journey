import { NAV_ROOMS_STEP } from '../../../constants';

export default {
  namespaced: true,

  state: {
    roomsData: {},
    initialRooms: [],
    draftRooms: [],
    upgradeRooms: [],
  },

  getters: {
    draftRoomsDetails: (state) => state.draftRooms.map((room) => {
      const details = state.roomsData[room.id];
      return details
        ? { ...room, ...details }
        : room;
    }),
  },

  mutations: {
    setRoomsData: (state, payload) => {
      state.roomsData = payload;
    },
    setInitialRooms: (state, payload) => {
      state.initialRooms = payload;
    },
    setDraftRooms: (state, payload) => {
      state.draftRooms = payload;
    },
    setUpgradeRooms: (state, payload) => {
      state.upgradeRooms = payload;
    },
  },

  actions: {
    setAllData: ({ commit }, { roomsData, initialRooms, upgradeRooms }) => {
      commit('setRoomsData', roomsData);
      commit('setInitialRooms', initialRooms);
      commit('setDraftRooms', initialRooms);
      commit('setUpgradeRooms', upgradeRooms);
    },
    setDraftRooms: ({ commit }, payload) => {
      commit('setDraftRooms', payload);
    },
    saveData: ({ commit, rootState }) => {
      const nav = rootState.bookingJourney.navigation.map((el) => ({
        ...el,
        completed: el.stepName === NAV_ROOMS_STEP ? true : el.completed,
      }));
      commit('bookingJourney/updateNavigation', nav, { root: true });
      // send data to the server
    },
  },
};
