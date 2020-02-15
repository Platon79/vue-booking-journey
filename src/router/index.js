import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import BookingLayout from '../components/booking/BookingLayout.vue';
import Rooms from '../components/booking/rooms/Rooms.vue';
import Flights from '../components/booking/flights/Flights.vue';
import GuestDetails from '../components/booking/guest-details/GuestDetails.vue';
import Extras from '../components/booking/extras/Extras.vue';
import Payment from '../components/booking/payment/Payment.vue';

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
      },
      {
        path: 'flights',
        name: 'Flights',
        component: Flights,
      },
      {
        path: 'guest-details',
        name: 'GuestDetails',
        component: GuestDetails,
      },
      {
        path: 'extras',
        name: 'Extras',
        component: Extras,
      },
      {
        path: 'payment',
        name: 'Payment',
        component: Payment,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
