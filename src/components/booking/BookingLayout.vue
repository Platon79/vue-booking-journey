<template>
  <div class="bj">
    <header class="header">
      <Navigation />
    </header>
    <main class="bj-wrap">
      <div class="bj-content">
        <router-view />
      </div>
      <Sidebar />
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import accomodationData from '@/data.js';
import Navigation from './Nav.vue';
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Navigation,
    Sidebar,
  },

  created() {
    const { holiday, rooms, availableFlights } = accomodationData;
    this.updateHolidaysDetails(holiday);
    this.setAllRoomsData(rooms);
    this.updateAllFlights(availableFlights);
  },

  methods: {
    ...mapActions('bookingJourney', [
      'updateHolidaysDetails',
    ]),
    ...mapActions('bookingJourney/rooms', {
      setAllRoomsData: 'setAllData',
    }),
    ...mapActions('bookingJourney/flights', {
      updateAllFlights: 'updateAllFlights',
    }),
  },
};
</script>
