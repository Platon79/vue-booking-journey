import moment from 'moment';
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
    currentStep: 'FUNNEL_ROOM_OPTIONS',
    nextStep: 'FUNNEL_FLIGHT_OPTIONS',
    navigation: [
      {
        completed: true,
        label: 'Rooms',
        link: '/booking/room-options',
        submitUrl: '/api/booking/room-options',
        availableToGo: true,
        stepName: 'FUNNEL_ROOM_OPTIONS',
      },
      {
        completed: false,
        label: 'Flights',
        link: '/booking/flight-options',
        submitUrl: '/api/booking/flight-options',
        availableToGo: true,
        stepName: 'FUNNEL_FLIGHT_OPTIONS',
      },
      {
        completed: false,
        label: 'Guest details',
        link: '/booking/guest-details',
        submitUrl: '/api/booking/guest-details',
        availableToGo: true,
        stepName: 'FUNNEL_GUEST_DETAILS',
      },
      {
        completed: false,
        label: 'Extras',
        link: '/booking/extras',
        submitUrl: '/api/booking/extras',
        availableToGo: false,
        stepName: 'FUNNEL_EXTRAS',
      },
      {
        completed: false,
        label: 'Payment',
        link: '/booking/payment',
        submitUrl: '/api/booking/payment',
        availableToGo: false,
        stepName: 'FUNNEL_PAYMENT',
      },
    ],
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
  },

  mutations: {
    updateHolidaysDetails: (state, payload) => {
      state.holidaysDetails = payload;
    },
  },

  actions: {
    updateHolidaysDetails: ({ commit }, payload) => {
      commit('updateHolidaysDetails', payload);
    },
  },
};
