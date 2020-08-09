<template>
  <Collapse :price="String(extrasAmount)" :name="set.name" :default-opened="opened">
    <div class="bj-flight__extras-wrap">
      <p v-html="set.description" />

      <div class="bj-flight__extras-grid">
        <ExtraCard
          v-for="extra in set.extras"
          :key="extra.identifier"
          :name="extra.name"
          :description="extra.description"
          :price="extra.pricePerPerson"
          :max-value="extra.maxNumber"
          :show-max-value="!extra.isParty"
          :limit-message="limitMessage(extra.maxNumber)"
          :value="extra.count"
          :label="extra.weekLabel"
          class="bj-flight__extras-item"
          @input="(val) => updateSelectedExtras(val, extra.identifier)"
        />
      </div>
    </div>
  </Collapse>
</template>

<script>
import { mapState } from 'vuex';
import forIn from 'lodash/forIn';
import Collapse from '@/components/shared/Collapse.vue';
import ExtraCard from '@/components/shared/ExtraCard.vue';

export default {
  components: {
    Collapse,
    ExtraCard,
  },

  props: {
    set: {
      type: Object,
      required: true,
    },
    opened: {
      type: Boolean,
      default: true,
    },
  },

  data: () => ({
    skiLevels: [],
  }),

  computed: {
    ...mapState('bookingJourney', {
      isWinter: (state) => state.holidaysDetails.isWinter,
    }),
    ...mapState('bookingJourney/guestDetails', [
      'passengers',
    ]),
    ...mapState('bookingJourney/extras', [
      'skiLevelsOptions',
    ]),
    extrasAmount() {
      let amount = 0;
      forIn(this.set.extras, (extra) => {
        amount += extra.count * extra.pricePerPerson;
      });
      return amount;
    },
  },

  methods: {
    updateSelectedExtras(val, identifier) {
      this.$emit('updateSingleExtra', {
        val,
        extraIdentifier: identifier,
        setId: this.set.id,
      });
    },
    limitMessage(maxNumber) {
      return maxNumber === this.passengers.length
        ? 'Hmm… that’s more extras than you have people!'
        : 'Oops, there’s not enough of those for your party…';
    },
    showLevelsPopup() {
      this.$emit('showLevelsPopup');
    },
  },
};
</script>
