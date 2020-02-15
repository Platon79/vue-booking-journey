import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import BookingLayout from '../components/booking/BookingLayout.vue';
import Rooms from '../components/booking/rooms/Rooms.vue';

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
    children: [
      {
        path: 'rooms',
        name: 'Rooms',
        component: Rooms,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
