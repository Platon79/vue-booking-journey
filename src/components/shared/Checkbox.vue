<template>
  <label :class="{active: isActive, disabled: isDisabled}" class="custom-checkbox">
    <input ref="input" :checked="checked" type="checkbox" @change="change">
    <span class="custom-checkbox__box">
      <span class="custom-checkbox__check" />
    </span>
    <span class="custom-checkbox__label">
      {{ label }}<template v-if="required">*</template>
    </span>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'model',
    event: 'change',
  },

  props: {
    label: {
      type: String,
      required: true,
      default: 'Label',
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    // Amount of elements can be in model
    maxLength: {
      type: Number,
      default: Infinity,
    },
    model: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    checked() {
      return this.model.indexOf(this.value) !== -1;
    },
    isActive() {
      return this.model.indexOf(this.value) !== -1;
    },
    isDisabled() {
      return !this.isActive && this.model.length >= this.maxLength;
    },
  },

  mounted() {
    this.$refs.input.checked = this.isActive;
  },

  methods: {
    change($event) {
      const { checked } = $event.srcElement;
      const valueIndex = this.model.indexOf(this.value);
      const includeValue = valueIndex !== -1;
      const newModel = [...this.model];
      if (checked && !includeValue) {
        newModel.push(this.value);
      } else if (!checked && includeValue) {
        newModel.splice(valueIndex, 1);
      }
      this.$emit('change', newModel);
    },
  },
};
</script>
