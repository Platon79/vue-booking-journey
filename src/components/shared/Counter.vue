<template>
  <div class="counter">
    <button :class="{disabled: mutableValue === 0}" class="counter__cell counter__btn" @click="decrease">-</button>
    <div class="counter__cell counter__value">{{ mutableValue }}</div>
    <button :class="{disabled: mutableValue >= maxValue}" class="counter__cell counter__btn" @click="increase">
      +
    </button>
    <span v-if="showLimit" class="counter__limit">
      {{ mutableValue }}
      <template v-if="showMaxValue">/{{ maxValue }}</template>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: Infinity,
    },
    showLimit: {
      type: Boolean,
      default: true,
    },
    showMaxValue: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    mutableValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },

  methods: {
    decrease() {
      if (this.mutableValue === 0) return;
      this.mutableValue -= 1;
    },
    increase() {
      if (this.mutableValue >= this.maxValue) {
        this.$emit('unavailableIncreaseAttempt');
      } else {
        this.mutableValue += 1;
      }
    },
  },
};
</script>
