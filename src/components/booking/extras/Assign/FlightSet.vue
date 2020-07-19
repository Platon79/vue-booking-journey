<template>
  <Collapse :price="selectedExtrasAmount" name="Flight extras" class="opened">
    <Extra
      v-for="extra in extras"
      :key="extra.identifier"
      :extra="extra"
      @updatePassengers="updatePassengers"
    />
  </Collapse>
</template>

<script>
import { mapActions } from 'vuex';
import Collapse from '@/components/shared/Collapse.vue';
import Extra from './Extra.vue';

export default {
  components: {
    Extra,
    Collapse,
  },

  props: {
    extras: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    selectedExtrasAmount() {
      const amount = this.extras.reduce((acc, nextVal) => acc + nextVal.pricePerPerson * nextVal.count, 0);
      return String(amount);
    },
  },

  methods: {
    ...mapActions('bookingJourney/flightOptions', [
      'updateSingleExtra',
    ]),
    ...mapActions('bookingJourney/extras', [
      'updateFlightExtrasArr',
    ]),
    updatePassengers({ val, extra }) {
      this.updateSingleExtra({
        val: {
          ...extra,
          skiLevelValue: val,
          passengers: Object.keys(val).map(el => +el),
        },
        extraIdentifier: extra.identifier,
        setId: extra.setKey,
      });
    },
  },
};
</script>
