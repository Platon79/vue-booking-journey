<template>
  <div class="collapse-wrap">
    <div :class="{_disabled: disabled}" class="collapse__head" @click="toggleBody">
      <div v-if="!disabled" class="collapse__head-icon" />
      <div class="collapse__name">
        <span>
          <template v-if="name">{{ name }}</template>
          <slot v-else name="headName" />
        </span>
      </div>
      <div class="collapse__head-line" />
      <div v-if="price" class="collapse__price">£{{ formattedPrice }}</div>
    </div>

    <div ref="body" class="collapse__body">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
import { moneyConventer } from '@/utils/index';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    formattedPrice() {
      return moneyConventer(+this.price);
    },
  },

  methods: {
    toggleBody() {
      if (this.disabled) return;
      this.$el.classList.toggle('opened');
    },
  },
};
</script>
