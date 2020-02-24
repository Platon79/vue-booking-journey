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
import accomodationData from '@/data';
import Navigation from './Nav.vue';
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Navigation,
    Sidebar,
  },

  created() {
    const { holiday } = accomodationData;
    this.updateHolidaysDetails(holiday);
  },

  methods: {
    ...mapActions('bookingJourney', [
      'updateHolidaysDetails',
    ]),
  },
};
</script>
