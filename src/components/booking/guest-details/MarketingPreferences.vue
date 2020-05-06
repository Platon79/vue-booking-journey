<template>
  <div class="bj-card__form-row">
    <div class="bj-card__form-label">
      Would you like to receive future offers, promotions and news from Neilson holidays?
      <p>
        Your details will not be shared with third parties, and you can unsubscribe at any time.
        <a href="/privacy-policy" target="_blank" class="bj-card__info-icon" />
      </p>
    </div>

    <div class="bj__marketing-checkboxes">
      <Checkbox
        v-for="item in marketingOptions"
        v-model="mutableMarketingPreferences"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Checkbox from '@/components/shared/Checkbox.vue';

export default {
  components: {
    Checkbox,
  },

  computed: {
    ...mapState('bookingJourney/guestDetails', [
      'marketingPreferences',
      'marketingOptions',
    ]),
    mutableMarketingPreferences: {
      get() {
        return this.marketingPreferences;
      },
      set(val) {
        this.updateMarketingPreferences({
          payload: val,
        });
      },
    },
  },

  methods: {
    ...mapActions('bookingJourney/guestDetails', [
      'updateMarketingPreferences',
    ]),
  },
};
</script>
