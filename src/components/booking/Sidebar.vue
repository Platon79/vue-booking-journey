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
        <div class="bj-sidebar__collapse-title _room">
          Rooms
          <span class="caret" />
        </div>
        <div class="bj-sidebar__collapse-content">
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
        <template v-else>Continue to {{ nextStepName }}</template> -->
        Continue to {{ nextStepName }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('bookingJourney', [
      'holidaysDetails',
      'currentStep',
    ]),
    ...mapGetters('bookingJourney', [
      'getFormatedDurationString',
    ]),
  },

  data: () => ({
    submitLoader: false,
    nextStepName: 'Flights',
  }),

  methods: {
    mobileOpenSidebar() {},
    handleSubmitClick() {
      switch (this.currentStep) {
        case 'FUNNEL_ROOM_OPTIONS':
          this.$router.push('/booking/flights');
          break;
        default:
          break;
      }
    },
  },
};
</script>
