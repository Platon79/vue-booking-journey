<template>
  <div class="bj-extras">
    <h1 class="bj__h1">
      <span :class="{_link: currentView === 'assign'}" @click.prevent="openSelect"><i>> </i>Select extras</span>
      <span
        :class="{_link: currentView === 'select', _disabled: disableAssign}"
        @click.prevent="openAssign"
      >
        <i>> </i>Assign Extras
      </span>
    </h1>

    <div class="bj-extras__views">
      <SelectView v-show="currentView === 'select'" />
      <AssignView v-show="currentView === 'assign'" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import SelectView from './Select/View.vue';
import AssignView from './Assign/View.vue';

export default {
  components: {
    SelectView,
    AssignView,
  },

  computed: {
    ...mapState('bookingJourney/extras', [
      'currentView',
    ]),
    ...mapGetters('bookingJourney/extras', [
      'isExtrasChanged',
      'extrasArraySelected',
      'flightExtrasArr',
    ]),
    disableAssign() {
      return !this.extrasArraySelected.length && !this.flightExtrasArr.length;
    },
  },

  mounted() {
    // const { skiLevels } = window.drupalSettings.neilson_booking_funnel;
    // this.updateSkiLevelsOptions(skiLevels);
  },

  methods: {
    ...mapActions('bookingJourney/extras', [
      'updateSkiLevelsOptions',
      'updateCurrentView',
    ]),
    openSelect() {
      this.updateCurrentView('select');
    },
    openAssign() {
      if (!this.disableAssign) this.updateCurrentView('assign');
    },
  },
};
</script>
