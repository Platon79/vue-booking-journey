import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../components/Home.vue';
import BookingLayout from '../components/booking/BookingLayout.vue';
import Rooms from '../components/booking/rooms/Rooms.vue';
import Flights from '../components/booking/flights/Flights.vue';
import GuestDetails from '../components/booking/guest-details/GuestDetails.vue';
import Extras from '../components/booking/extras/Extras.vue';
import Payment from '../components/booking/payment/Payment.vue';
import {
  NAV_ROOMS_STEP,
  NAV_EXTRAS_STEP,
  NAV_GUEST_DETAILS_STEP,
  NAV_FLIGHTS_STEP,
  NAV_PAYMENT_STEP,
} from '../constants';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/booking',
    name: 'BookingLayout',
    component: BookingLayout,
    redirect: {
      name: 'Rooms',
    },
    children: [
      {
        path: 'rooms',
        name: 'Rooms',
        component: Rooms,
        meta: {
          stepName: NAV_ROOMS_STEP,
        },
      },
      {
        path: 'flights',
        name: 'Flights',
        component: Flights,
        meta: {
          stepName: NAV_FLIGHTS_STEP,
        },
      },
      {
        path: 'guest-details',
        name: 'GuestDetails',
        component: GuestDetails,
        meta: {
          stepName: NAV_GUEST_DETAILS_STEP,
        },
      },
      {
        path: 'extras',
        name: 'Extras',
        component: Extras,
        meta: {
          stepName: NAV_EXTRAS_STEP,
        },
      },
      {
        path: 'payment',
        name: 'Payment',
        component: Payment,
        meta: {
          stepName: NAV_PAYMENT_STEP,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.stepName) {
    store.dispatch('bookingJourney/updateNavCurrentStep', to.meta.stepName);
  }
  next();
});

export default router;
