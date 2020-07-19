<template>
  <Collapse :price="selectedExtrasAmount" :name="set.name" class="opened">
    <Extra
      v-for="extra in set.extras"
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
    set: {
      type: Object,
      required: true,
    },
  },

  computed: {
    selectedExtrasAmount() {
      const amount = Object.values(this.set.extras).reduce((acc, nextVal) => acc + nextVal.pricePerPerson, 0);
      return String(amount);
    },
  },

  methods: {
    ...mapActions('bookingJourney/extras', [
      'updateSingleExtraSkiLevels',
    ]),
    updatePassengers({ val, extra }) {
      this.updateSingleExtraSkiLevels({
        val,
        extraIdentifier: extra.identifier,
        setId: this.set.id,
      });
    },
  },
};
</script>
