import pickBy from 'lodash/pickBy';
import cloneDeep from 'lodash/cloneDeep';
import { getSelectedExtraArr } from '@/utils';

export default {
  namespaced: true,

  state: {
    currentView: 'select',
    skiLevelsOptions: [],
    extraSets: {},
    openedPassengerLevelsPopup: '',
  },

  getters: {
    // Ski levels
    skiLevelsOptionsObject: (state) => {
      const obj = {};
      state.skiLevelsOptions.forEach((el) => {
        obj[el.tid] = el;
      });
      return obj;
    },
    skiLevelsOptionsObjectByLevelCode: (state) => {
      const obj = {};
      state.skiLevelsOptions.forEach((el) => {
        obj[el.levelCode] = el;
      });
      return obj;
    },

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

    // Flights related
    flightExtrasArr: (state, getters, rootState) => (
      getSelectedExtraArr(rootState.bookingJourney.flightOptions.extraSets)
    ),
    selectedExtrasArrayWithFlight: (state, getters) => [
      ...getters.extrasArraySelected,
      ...getters.flightExtrasArr,
    ],

    // Checkers
    isSelectedExtrasAssigned: (state, getters) => {
      let value = true;
      getters.extrasArraySelected.forEach((extra) => {
        if (extra.isAssignable && extra.count !== Object.keys(extra.skiLevelValue).length) value = false;
      });
      getters.flightExtrasArr.forEach((extra) => {
        if (extra.count !== extra.passengers.length) value = false;
      });
      return value;
    },
    isExtrasChanged: (state, getters) => {
      const selectedInitial = getters.initialExtrasArr.filter((el) => el.count);
      if (selectedInitial.length !== getters.extrasArraySelected.length) return true;
      for (let i = 0; i < selectedInitial.length; i += 1) {
        if (selectedInitial[i].count !== getters.extrasArraySelected[i].count) return true;
        const initalIdsAmount = selectedInitial[i].passengers.reduce((acc, val) => acc + val, 0);
        const currentIdsAmount = getters.extrasArraySelected[i].passengers.reduce((acc, val) => acc + val, 0);
        if (initalIdsAmount !== currentIdsAmount) return true;
      }
      return false;
    },
  },

  mutations: {
    updateCurrentView: (state, payload) => {
      state.currentView = payload;
    },
    updateExtraSets: (state, payload) => {
      state.extraSets = payload;
    },
    updateSkiLevelsOptions: (state, payload) => {
      state.skiLevelsOptions = payload;
    },
    updateOpenedPassengerLevelsPopup: (state, payload) => {
      state.openedPassengerLevelsPopup = payload;
    },
  },

  actions: {
    updateCurrentView: ({ commit }, payload) => {
      commit('updateCurrentView', payload);
    },
    updateSkiLevelsOptions: ({ commit }, payload) => {
      commit('updateSkiLevelsOptions', payload);
    },
    updateOpenedPassengerLevelsPopup: ({ commit }, payload) => {
      commit('updateOpenedPassengerLevelsPopup', payload);
    },
    updateSingleExtraCount: ({ state, commit }, { val, setId, extraIdentifier }) => {
      const newExtraSets = cloneDeep(state.extraSets);
      newExtraSets[setId].extras[extraIdentifier].count = val;
      if (!val) {
        newExtraSets[setId].extras[extraIdentifier].skiLevelValue = {};
        newExtraSets[setId].extras[extraIdentifier].passengers = [];
      }
      commit('updateExtraSets', newExtraSets);
    },
    // Update skiLevelValue and passengers fields
    updateSingleExtraSkiLevels: ({ state, commit }, { val, setId, extraIdentifier }) => {
      const newExtraSets = cloneDeep(state.extraSets);
      newExtraSets[setId].extras[extraIdentifier].skiLevelValue = val;
      newExtraSets[setId].extras[extraIdentifier].passengers = Object.keys(val).map(el => +el);
      commit('updateExtraSets', newExtraSets);
    },
  },
};
