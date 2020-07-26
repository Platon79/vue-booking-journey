import moment from 'moment';
import {
  NAV_ROOMS_STEP,
  NAV_FLIGHTS_STEP,
  NAV_GUEST_DETAILS_STEP,
  NAV_EXTRAS_STEP,
  NAV_PAYMENT_STEP,
} from '@/constants';
import rooms from './rooms';
import flights from './flights';
import guestDetails from './guestDetails';
import extras from './extras';
import payment from './payment';

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

export default {
  namespaced: true,

  modules: {
    rooms,
    flights,
    guestDetails,
    extras,
    payment,
  },

  state: {
    navigation: [
      {
        completed: true,
        label: 'Rooms',
        link: '/booking/rooms',
        availableToGo: true,
        stepName: NAV_ROOMS_STEP,
      },
      {
        completed: false,
        label: 'Flights',
        link: '/booking/flights',
        availableToGo: true,
        stepName: NAV_FLIGHTS_STEP,
      },
      {
        completed: false,
        label: 'Guest details',
        link: '/booking/guest-details',
        availableToGo: true,
        stepName: NAV_GUEST_DETAILS_STEP,
      },
      {
        completed: false,
        label: 'Extras',
        link: '/booking/extras',
        availableToGo: false,
        stepName: NAV_EXTRAS_STEP,
      },
      {
        completed: false,
        label: 'Payment',
        link: '/booking/payment',
        availableToGo: false,
        stepName: NAV_PAYMENT_STEP,
      },
    ],
    currentStepName: NAV_ROOMS_STEP,
    holidaysDetails: null,
  },

  getters: {
    getFormatedDurationString: (state) => {
      const { departureDate, duration } = state.holidaysDetails;
      if (!departureDate || !duration) return '';
      const start = moment(departureDate);
      const end = moment(departureDate).add(+duration, 'days');
      const getDay = (momentDate) => {
        const day = momentDate.date();
        return String(day).length === 1 ? `0${day}` : day;
      };
      if (start.year() !== end.year()) {
        return `${getDay(start)} ${months[start.month()]} ${start.year()} -
                ${getDay(end)} ${months[end.month()]} ${end.year()}`;
      }
      if (start.month() !== end.month()) {
        return `${getDay(start)} ${months[start.month()]} -
                ${getDay(end)} ${months[end.month()]} ${start.year()}`;
      }
      return `${getDay(start)} - ${getDay(end)} ${months[start.month()]} ${start.year()}`;
    },
    navigationObject: (state) => {
      const obj = {};
      state.navigation.forEach((navItem) => {
        obj[navItem.stepName] = navItem;
      });
      return obj;
    },
    currentStep: (state, getters) => getters.navigationObject[state.currentStepName],
    nextStepIndex: (state) => {
      const currentStepIndex = state.navigation.findIndex((el) => el.stepName === state.currentStepName);
      return currentStepIndex === state.navigation.length - 1
        ? currentStepIndex
        : currentStepIndex + 1;
    },
    nextStep: (state, getters) => state.navigation[getters.nextStepIndex],
    nextStepName: (state, getters) => getters.nextStep.stepName,
  },

  mutations: {
    updateHolidaysDetails: (state, payload) => {
      state.holidaysDetails = payload;
    },
    updateNavCurrentStep: (state, payload) => {
      state.currentStepName = payload;
    },
    updateNavigation: (state, payload) => {
      state.navigation = payload;
    },
  },

  actions: {
    updateHolidaysDetails: ({ commit }, payload) => {
      commit('updateHolidaysDetails', payload);
    },
    updateNavCurrentStep: ({ commit }, payload) => {
      commit('updateNavCurrentStep', payload);
    },
    updateNavigation: ({ commit }, payload) => {
      commit('updateNavigation', payload);
    },
  },
};
