<template>
  <nav class="bj-nav">
    <ul>
      <li v-for="(item, index) in navigation" :key="item.stepName">
        <router-link
          :to="item.link"
          :class="{
            _filled: item.completed,
            _current: isCurrent(item.link),
            _next: isNext(item.link),
            _disabled: !item.availableToGo
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
import { mapState } from 'vuex';

export default {
  data: () => ({
    currentStep: null,
    nextStep: null,
  }),

  computed: {
    ...mapState('bookingJourney', [
      'navigation',
    ]),
  },

  mounted() {
    this.currentStep = this.$store.getters['bookingJourney/currentStep'](this.$route.path).link;
    this.nextStep = this.$store.getters['bookingJourney/nextStep'](this.$route.path).link;
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
