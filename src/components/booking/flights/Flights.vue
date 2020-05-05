<template>
  <div class="bj-flight">
    <Collapse :disabled="true" name="Your chosen flight" class="opened">
      <FlightCard
        :outbound="currentFlight.flights.depRoute"
        :inbound="currentFlight.flights.retRoute"
        :selected="true"
        :show-select-btn="availableFlight.length !== 0"
      />
    </Collapse>

    <Collapse v-if="availableFlight.length" name="Alternative flights" class="opened">
      <FlightCard
        v-for="flight in availableFlight"
        :key="flight.flights.depRoute.flightNo"
        :code="flight.flights.depRoute.flightNo"
        :outbound="flight.flights.depRoute"
        :inbound="flight.flights.retRoute"
        :selected="false"
        :over-payment="flight.price - currentFlight.price"
        :loader="flightIsUpdating"
        @flightSelectClick="selectNewFlight"
      />
    </Collapse>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Collapse from '@/components/shared/Collapse.vue';
import FlightCard from '@/components/shared/FlightCard/FlightCard.vue';

export default {
  components: {
    Collapse,
    FlightCard,
  },

  computed: {
    ...mapState('bookingJourney/flights', [
      'flightIsUpdating',
    ]),
    ...mapGetters('bookingJourney/flights', [
      'currentFlight',
      'availableFlight',
    ]),
  },

  methods: {
    selectNewFlight() {},
  },
};
</script>
