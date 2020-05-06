<template>
  <div class="bj-card">
    <div :class="{ _bordered: bordered }" class="bj-card__head">
      <div class="bj-card__head-left">
        <slot name="headerLeft" />
      </div>
    </div>
    <div class="bj-card__body">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bordered: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
