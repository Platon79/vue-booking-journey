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
          <!-- <div v-for="room in getBookingRoomsDetails" :key="room.roomNumber" class="bj-sidebar__item">
            <div class="bj-sidebar__label">Room {{ room.roomNumber }}</div>
            <div class="bj-sidebar__room-value">
              {{ room.description }}
            </div>
          </div> -->
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
    nextStepLabel() {
      return this.nextStep.label;
    },
  },

  methods: {
    ...mapActions('bookingJourney/rooms', {
      saveRoomsData: 'saveData',
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
          this.$router.push('/booking/guest-details');
          break;
        case NAV_GUEST_DETAILS_STEP:
          this.$router.push('/booking/extras');
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
