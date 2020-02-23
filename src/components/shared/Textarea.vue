<template>
  <div :class="{ '_max-length': maxSymbols }" class="input-jumped">
    <div class="input-jumped__wrap">
      <textarea
        v-model="mutableValue"
        :placeholder="placeholder"
        :maxlength="maxSymbols"
        :class="{ _filled: mutableValue }"
      />
      <label>
        {{ label }} <span v-if="required" class="input-jumped__star">*</span>
      </label>
      <div v-if="maxSymbols" class="textarea-jumped__symbols">
        {{ mutableValue.length }}/{{ maxSymbols }}
      </div>
    </div>
    <div v-if="maxSymbols" class="textarea-jumped__symbols-warning">
      {{ maxSymbols }} characters max.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
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
    maxSymbols: {
      type: Number,
      default: 0,
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
