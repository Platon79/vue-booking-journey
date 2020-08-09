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
    const { holiday, rooms, availableFlights, passengers, holidayExtras } = accomodationData;
    this.updateHolidaysDetails(holiday);
    this.updateAllRoomsData(rooms);
    this.updateAllFlights(availableFlights);
    this.initPsssengers(passengers);
    this.updateExtraSets(holidayExtras);
  },

  methods: {
    ...mapActions('bookingJourney', [
      'updateHolidaysDetails',
    ]),
    ...mapActions('bookingJourney/rooms', {
      updateAllRoomsData: 'setAllData',
    }),
    ...mapActions('bookingJourney/flights', {
      updateAllFlights: 'updateAllFlights',
    }),
    ...mapActions('bookingJourney/guestDetails', {
      initPsssengers: 'initPsssengers',
    }),
    ...mapActions('bookingJourney/extras', {
      updateExtraSets: 'updateExtraSets',
    }),
  },
};
</script>
