import room from './rooms';
import flights from './flights';
import guestDetails from './guestDetails';
import extras from './extras';
import payment from './payment';

export default {
  namespaced: true,

  modules: {
    room,
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
  },
};
