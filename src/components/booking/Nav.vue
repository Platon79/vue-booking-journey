<template>
  <nav class="bj-nav">
    <ul>
      <li v-for="(item, index) in navigation" :key="item.stepName">
        <a
          :href="item.link"
          :class="{
            _filled: item.completed,
            _current: isCurrent(item.stepName),
            _next: isNext(item.stepName),
            _disabled: !item.availableToGo
          }"
        >
          <i v-if="item.completed" class="icon-tick-circled" />
          <span class="bj-nav__link-name">{{ item.label }}</span>
          <span class="bj-nav__link-index">{{ index + 1 }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('bookingJourney', [
      'currentStep',
      'nextStep',
      'navigation',
    ]),
  },

  methods: {
    isCurrent(stepName) {
      return stepName === this.currentStep;
    },
    isNext(stepName) {
      return stepName === this.nextStep;
    },
  },
};
</script>
