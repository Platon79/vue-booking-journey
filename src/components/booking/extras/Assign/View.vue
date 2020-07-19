<template>
  <div class="bj-extras__view">
    <p class="bj-extras__desc">Make your holiday even more memorable with some of our fantastic extras on offer. </p>

    <ExtraSet v-for="set in extraSetsArrayOrderedSelected" :key="set.id" :set="set" />

    <FlightExtraSet v-if="flightExtrasArr.length" :extras="flightExtrasArr" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ExtraSet from './Set.vue';
import FlightExtraSet from './FlightSet.vue';

export default {
  components: {
    ExtraSet,
    FlightExtraSet,
  },

  computed: {
    ...mapGetters('bookingJourney/extras', [
      'flightExtrasArr',
      'extraSetsArrayOrderedSelected',
    ]),
  },
};
</script>
