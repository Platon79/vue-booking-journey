<template>
  <div class="flight-card__cell">
    <div class="flight-card__cell-head">
      <div class="flight-card__number">
        <span class="icon" />
        {{ boundInfo.flightNo }}
      </div>
      <div class="flight-card__company">
        <img :src="boundInfo.logoUrl" alt="">
      </div>
    </div>
    <div class="flight-card__cell-body">
      <div class="flight-card__cell-date">
        <span class="icon" />
        <strong>{{ label }} - </strong>
        <span>{{ boundInfo.depDate }}</span>
      </div>
      <div class="flight-card__route">
        <div class="flight-card__route-cell">
          <div class="flight-card__route-way">Departure</div>
          <div class="flight-card__route-place">
            {{ boundInfo.depName }}
          </div>
          <time>{{ boundInfo.depTime }}</time>
        </div>
        <div class="flight-card__route-cell-arrow" />
        <div class="flight-card__route-cell">
          <div class="flight-card__route-way">Arrival</div>
          <div class="flight-card__route-place">{{ boundInfo.arrName }}</div>
          <time>{{ boundInfo.arrTime }}</time>
        </div>
      </div>
      <div v-if="showLuggage" class="flight-card__luggage">
        <span class="icon" />
        {{ boundInfo.luggageAllowance }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Outbound',
    },
    boundInfo: {
      type: Object,
      required: true,
      default: () => ({
        carrierName: '',
        flightNo: '',
        depName: '',
        depDate: '',
        depTime: '',
        arrName: '',
        arrDate: '',
        arrTime: '',
        logoUrl: '',
      }),
    },
    showLuggage: {
      type: Boolean,
      default: false,
    },
  },

  // computed: {
  //   depTime() {
  //     const arr = this.boundInfo.depDate.split(' at ');
  //     return arr.length === 2 ? arr[1] : '';
  //   },
  //   arrTime() {
  //     const arr = this.boundInfo.arrDate.split(' at ');
  //     return arr.length === 2 ? arr[1] : '';
  //   },
  // },
};
</script>
