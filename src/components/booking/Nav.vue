<template>
  <nav class="bj-nav">
    <ul>
      <li v-for="(item, index) in navigation" :key="item.stepName">
        <router-link
          :to="item.link"
          :class="{
            _filled: item.completed,
            _current: isCurrent(item.stepName),
            _next: isNext(item.stepName),
            _disabled: !availableToGo(item.stepName)
          }"
        >
          <i v-if="item.completed" class="icon-tick-circled" />
          <span class="bj-nav__link-name">{{ item.label }}</span>
          <span class="bj-nav__link-index">{{ index + 1 }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState('bookingJourney', [
      'navigation',
      'currentStepName',
    ]),
    ...mapGetters('bookingJourney', [
      'nextStepName',
      'prevSteps',
    ]),
  },

  methods: {
    isCurrent(stepName) {
      return stepName === this.currentStepName;
    },
    isNext(stepName) {
      return stepName === this.nextStepName;
    },
    availableToGo(stepName) {
      const prevSteps = this.prevSteps(stepName);
      let available = true;
      prevSteps.forEach((navItem) => {
        if (!navItem.completed) {
          available = false;
        }
      });
      return available;
    },
  },
};
</script>
