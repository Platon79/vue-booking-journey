<template>
  <div class="input-jumped">
    <input
      ref="input"
      :id="id || false"
      v-model="mutableValue"
      :type="type"
      :placeholder="placeholder"
      :class="{ _filled: mutableValue }"
    >
    <label @click="focusInput">
      {{ label }} <span v-if="required" class="input-jumped__star">*</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
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
    focusInput() {
      this.$refs.input.focus();
    },
  },
};
</script>
