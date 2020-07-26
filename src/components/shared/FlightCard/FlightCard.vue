<template>
  <div :class="wrapClasses" class="flight-card-wrap">
    <div class="flight-card__row">
      <Cell :bound-info="outbound" :show-luggage="!luggageIsSame" label="Outbound" class="_outbound" />
      <Cell :bound-info="inbound" :show-luggage="!luggageIsSame" label="Inbound" class="_inbound" />
    </div>
    <div v-if="luggageIsSame || showSelectBtn" class="flight-card__footer">
      <div v-if="luggageIsSame" class="flight-card__luggage">
        <span class="icon" />
        {{ outbound.luggageAllowance }}
      </div>
      <div v-if="showSelectBtn" class="flight-card__footer-price">
        <template v-if="!selected">
          <span>Total price</span>
          <strong>
            <template v-if="overPayment >= 0">+</template>
            <template v-else>-</template>
            £{{ Math.abs(overPayment) }}
          </strong>
        </template>
        <button
          :class="{ 'icon-tick-circled': selected, 'is-loading': loader }"
          class="btn btn--default"
          @click="handleSelectClick"
        >
          <Loader v-if="loader === code" class="loader" white />
          <template v-else>{{ selected ? 'Selected' : 'Select' }}</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from './Cell.vue';
import Loader from '../Loader.vue';

const boundStructure = {
  carrierName: '',
  flightNo: '',
  depName: '',
  depDate: '',
  depTime: '',
  arrName: '',
  arrDate: '',
  arrTime: '',
  logoUrl: '',
};

export default {
  components: {
    Loader,
    Cell,
  },

  props: {
    outbound: {
      type: Object,
      default: () => boundStructure,
    },
    inbound: {
      type: Object,
      default: () => boundStructure,
    },
    code: {
      type: String,
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
    overPayment: {
      type: Number,
      default: 0,
    },
    showSelectBtn: {
      type: Boolean,
      default: true,
    },
    loader: {
      default: null,
      validator: (prop) => typeof prop === 'string' || prop === null,
    },
  },

  computed: {
    luggageIsSame() {
      return this.outbound.luggageAllowance === this.inbound.luggageAllowance;
    },
    wrapClasses() {
      return {
        _luggageIsSame: this.luggageIsSame,
        _withoutFooter: !this.luggageIsSame && !this.showSelectBtn,
      };
    },
  },

  methods: {
    handleSelectClick() {
      if (this.selected) return;
      debugger
      this.$emit('flightSelectClick', this.code);
    },
  },
};
</script>
