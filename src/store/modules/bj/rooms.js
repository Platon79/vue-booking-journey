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

    // Action to save passed data on server
    // Will be done in future
    saveData: () => {},
  },
};
