import pickBy from 'lodash/pickBy';
import cloneDeep from 'lodash/cloneDeep';

export default {
  namespaced: true,

  state: {
    currentView: 'select',
    extraSets: {},
  },

  getters: {
    // Sets
    extraSetsArray: (state) => Object.values(state.extraSets),
    extraSetsArrayOrdered: (state, getters) => getters.extraSetsArray.sort((a, b) => a.weight - b.weight),
    extraSetsArrayOrderedSelected: (state, getters) => {
      const arr = [];
      getters.extraSetsArrayOrdered.forEach((set) => {
        const selectedExtrasObj = pickBy(set.extras, (extra) => extra.count);
        if (Object.values(selectedExtrasObj).length) {
          arr.push({
            ...set,
            extras: selectedExtrasObj,
          });
        }
      });
      return arr;
    },

    // Extras
    extrasArray: (state, getters) => {
      const arr = [];
      getters.extraSetsArray.forEach((set) => {
        Object.values(set.extras).forEach((extra) => {
          arr.push(extra);
        });
      });
      return arr;
    },
    extrasArraySelected: (state, getters) => getters.extrasArray.filter((extra) => extra.count),

    // Checkers
    isSelectedExtrasAssigned: (state, getters) => {
      let value = true;
      getters.extrasArraySelected.forEach((extra) => {
        if (extra.isAssignable && extra.count !== extra.passengers.length) value = false;
      });
      return value;
    },
  },

  mutations: {
    updateCurrentView: (state, payload) => {
      state.currentView = payload;
    },
    updateExtraSets: (state, payload) => {
      state.extraSets = payload;
    },
  },

  actions: {
    updateExtraSets: ({ commit }, payload) => {
      commit('updateExtraSets', payload);
    },
    updateCurrentView: ({ commit }, payload) => {
      commit('updateCurrentView', payload);
    },
    updateSingleExtraCount: ({ state, commit }, { val, setId, extraIdentifier }) => {
      const newExtraSets = cloneDeep(state.extraSets);
      newExtraSets[setId].extras[extraIdentifier].count = val;
      if (!val) {
        newExtraSets[setId].extras[extraIdentifier].passengers = [];
      }
      commit('updateExtraSets', newExtraSets);
    },
    // Update skiLevelValue and passengers fields
    updateSingleExtraPassengers: ({ state, commit }, { val, setId, extraIdentifier }) => {
      const newExtraSets = cloneDeep(state.extraSets);
      newExtraSets[setId].extras[extraIdentifier].passengers = val;
      commit('updateExtraSets', newExtraSets);
    },
  },
};
