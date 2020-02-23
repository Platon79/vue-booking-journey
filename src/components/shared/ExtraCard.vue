<template>
  <div :class="{_selected: extraSelected}" class="extra-item-container">
    <div class="extra-item">
      <div v-if="label" class="extra-item__label">
        {{ label }}
      </div>
      <div class="extra-item__content">
        <div class="extra-item__content-row">
          <div class="extra-item__name">
            {{ name }}
          </div>
          <div v-if="price === 0" class="extra-item__price">
            Free
          </div>
          <div v-else class="extra-item__price">
            £{{ formattedPrice }}
          </div>
        </div>
        <div class="extra-item__description">
          {{ description }}
        </div>
        <div class="extra-item__footer">
          <div class="extra-item__counter">
            <Counter
              v-model="mutableValue"
              :max-value="maxValue"
              :show-max-value="showMaxValue"
              @unavailableIncreaseAttempt="showMsg"
            />
          </div>
          <div v-if="showCounterMsg" class="extra-item__counter-msg">
            {{ limitMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { moneyConventer } from '@/utils';
import Counter from './Counter.vue';

export default {
  name: 'ExtraItem',

  components: {
    Counter,
  },

  props: {
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    maxValue: {
      type: Number,
      default: Infinity,
    },
    showMaxValue: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    limitMessage: {
      type: String,
      default: 'Oops, there’s not enough of those for your party...',
    },
  },

  data: () => ({
    showCounterMsg: false,
  }),

  computed: {
    extraSelected() {
      return this.value > 0;
    },
    mutableValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.showCounterMsg = false;
        this.$emit('input', val);
      },
    },
    formattedPrice() {
      const initPrice = this.value ? this.price * this.value : this.price;
      return moneyConventer(initPrice);
    },
  },

  methods: {
    showMsg() {
      this.showCounterMsg = true;
    },
  },
};
</script>
