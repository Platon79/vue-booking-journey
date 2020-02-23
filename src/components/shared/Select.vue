<template>
  <div :class="{_filled: mutableValue}" class="jupmed-select">
    <select ref="select" v-model="mutableValue">
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.val" :value="option.val">
        {{ option.label }}
      </option>
    </select>
    <label v-if="label">
      {{ label }} <span v-if="required" class="input-jumped__star">*</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
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
};
</script>
