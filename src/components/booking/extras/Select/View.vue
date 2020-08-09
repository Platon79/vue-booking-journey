<template>
  <div class="bj-extras__view">
    <p class="bj-extras__desc">Make your holiday even more memorable with some of our fantastic extras on offer.</p>

    <ExtraSet
      v-for="(set, index) in extraSetsArrayOrdered"
      :key="set.id"
      :set="set"
      :need-level-filter="true"
      :opened="isSetOpened(set, index)"
      @updateSingleExtra="updateSingleExtra"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import ExtraSet from './Set.vue';

export default {
  components: {
    ExtraSet,
  },

  computed: {
    ...mapState('bookingJourney', {
      isWinter: (state) => state.holidaysDetails.isWinter,
    }),
    ...mapGetters('bookingJourney', [
      'navigationObject',
    ]),
    ...mapGetters('bookingJourney/extras', [
      'extraSetsArrayOrdered',
      'extrasArraySelected',
    ]),
    isFirstPageVisit() {
      return !this.navigationObject.EXTRAS.completed;
    },
    selectedExtrasAmount() {
      return this.extrasArraySelected.length;
    },
  },

  methods: {
    ...mapActions('bookingJourney/extras', [
      'updateSingleExtraCount',
    ]),
    updateSingleExtra(val) {
      this.updateSingleExtraCount(val);
    },
    setHasSelectedExtras(set) {
      let result = false;
      Object.values(set.extras).forEach((el) => {
        if (el.count) result = true;
      });
      return result;
    },
    isSetOpened(set, index) {
      if (this.selectedExtrasAmount > 0) {
        return this.setHasSelectedExtras(set);
      }
      return index === 0;
    },
  },
};
</script>
