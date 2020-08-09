<template>
  <div class="bj-extras__view">
    <p class="bj-extras__desc">Make your holiday even more memorable with some of our fantastic extras on offer. </p>

    <ExtraSet v-for="set in extraSetsArrayOrderedSelected" :key="set.id" :set="set" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ExtraSet from './Set.vue';

export default {
  components: {
    ExtraSet,
  },

  computed: {
    ...mapGetters('bookingJourney/extras', [
      'extraSetsArrayOrderedSelected',
    ]),
  },
};
</script>
