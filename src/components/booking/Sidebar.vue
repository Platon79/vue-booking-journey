<template>
  <div class="bj-sidebar">
    <div class="bj-sidebar__top">
      <div class="bj-sidebar__price-label">Total price</div>
      <div class="bj-sidebar__price-value">£{{ '1280' }}</div>
      <div class="bj-sidebar__price-pp">£{{ '640' }} pp</div>

      <div class="bj-sidebar__m-trigger" @click="mobileOpenSidebar" />
    </div>
    <div class="bj-sidebar__bottom">
      <div class="bj-sidebar__place">{{ holidaysDetails.accommodationName }}</div>
      <div class="bj-sidebar__city">
        {{ holidaysDetails.destinationResort }}, {{ holidaysDetails.destinationRegion }}
      </div>

      <div class="bj-sidebar__collapse">
        <div class="bj-sidebar__collapse-title _room" @click="changeActiveMenu('rooms')">
          Rooms
          <span class="caret" />
        </div>
        <div class="bj-sidebar__collapse-content" :class="{active: activeMenu === 'rooms'}">
          <div class="bj-sidebar__item">
            <div class="bj-sidebar__label">Duration</div>
            <div class="bj-sidebar__room-value">
              {{ getFormatedDurationString }} <span>{{ holidaysDetails.duration }} nights</span>
            </div>
          </div>
          <div v-for="(room, index) in draftRoomsDetails" :key="room.id" class="bj-sidebar__item">
            <div class="bj-sidebar__label">Room {{ index + 1 }}</div>
            <div class="bj-sidebar__room-value">
              {{ room.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="bj-sidebar__collapse">
        <div class="bj-sidebar__collapse-title _flights" @click="changeActiveMenu('flights')">
          Flights
          <span class="caret" />
        </div>
        <div class="bj-sidebar__collapse-content" :class="{active: activeMenu === 'flights'}">
          <div v-if="currentFlight" class="bj-sidebar__item">
            <div class="bj-sidebar__label">Outbound</div>
            <div class="bj-sidebar__flight-row1">
              {{ currentFlight.flights.depRoute.depDate }}
            </div>
            <div class="bj-sidebar__flight-row2">
              <span>{{ currentFlight.flights.depRoute.depTime }} {{ currentFlight.flights.depRoute.depCode }}</span>
              <span>{{ currentFlight.flights.depRoute.arrTime }} {{ currentFlight.flights.depRoute.arrCode }}</span>
            </div>
          </div>
          <div v-if="currentFlight" class="bj-sidebar__item">
            <div class="bj-sidebar__label">Inbound</div>
            <div class="bj-sidebar__flight-row1">
              {{ currentFlight.flights.retRoute.depDate }}
            </div>
            <div class="bj-sidebar__flight-row2">
              <span>{{ currentFlight.flights.retRoute.depTime }} {{ currentFlight.flights.retRoute.depCode }}</span>
              <span>{{ currentFlight.flights.retRoute.arrTime }} {{ currentFlight.flights.retRoute.arrCode }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bj-sidebar__submit">
      <button
        class="btn btn--default"
        @click="handleSubmitClick"
      >
        <!-- <OverlayScaleLoader v-if="submitLoader" class="loader" white />
        <template v-else>Continue to {{ nextStepLabel }}</template> -->
        Continue to {{ nextStepLabel }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import {
  NAV_ROOMS_STEP,
  NAV_FLIGHTS_STEP,
  NAV_GUEST_DETAILS_STEP,
  NAV_EXTRAS_STEP,
} from '@/constants';

export default {
  data: () => ({
    submitLoader: false,
    activeMenu: null,
  }),

  computed: {
    ...mapState('bookingJourney', [
      'holidaysDetails',
      'currentStepName',
      'navigation',
    ]),
    ...mapGetters('bookingJourney', [
      'getFormatedDurationString',
      'nextStep',
    ]),
    ...mapGetters('bookingJourney/rooms', [
      'draftRoomsDetails',
    ]),
    ...mapGetters('bookingJourney/flights', [
      'currentFlight',
    ]),
    ...mapGetters('bookingJourney/guestDetails', {
      isGuestDataValid: 'isDataValid',
    }),
    nextStepLabel() {
      return this.nextStep.label;
    },
  },

  methods: {
    ...mapActions('bookingJourney/rooms', {
      saveRoomsData: 'saveData',
    }),
    ...mapActions('bookingJourney/flights', {
      saveFlightsData: 'saveData',
    }),
    ...mapActions('bookingJourney/guestDetails', {
      triggerGuestDetailsValidation: 'triggerValidation',
      saveGuestDetailsData: 'saveData',
    }),
    changeActiveMenu(val) {
      if (this.activeMenu !== val) {
        this.activeMenu = val;
      } else {
        this.activeMenu = null;
      }
    },
    mobileOpenSidebar() {},
    handleSubmitClick() {
      switch (this.currentStepName) {
        case NAV_ROOMS_STEP:
          this.saveRoomsData();
          this.$router.push('/booking/flights');
          break;
        case NAV_FLIGHTS_STEP:
          this.saveFlightsData();
          this.$router.push('/booking/guest-details');
          break;
        case NAV_GUEST_DETAILS_STEP:
          if (this.isGuestDataValid) {
            this.saveGuestDetailsData();
            this.$router.push('/booking/extras');
          } else {
            this.triggerGuestDetailsValidation();
          }
          break;
        case NAV_EXTRAS_STEP:
          this.$router.push('/booking/payment');
          break;
        default:
          break;
      }
    },
  },
};
</script>
