<template>
  <div class="bj__guests">
    <h1 class="bj__h1">
      Guest details

      <div class="bj__guests-required-label">
        <span>*</span> Required
      </div>
    </h1>

    <PersonCard v-for="person in passengers" :key="person.index">
      <template slot="headerLeft">
        <strong>
          {{ getPersonAgeName(person) }}
          {{ person.ageBasedIndex }}
        </strong>
        <template v-if="person.leadPassenger">
          – Lead passenger
          <span class="bj__guests-question">
            <div class="bj__guests-question-popup">
              The lead passenger is responsible for payment of the booking and is the only person who can make changes,
              such as adding a guest or making a name change.
            </div>
          </span>
        </template>
        <template v-if="!person.isAdult">– {{ person.age }} years</template>
      </template>

      <template slot="default">
        <PersonForm
          v-if="person.leadPassenger"
          ref="leadPassenger"
          :value="person"
          @changePassenger="updatePassengerField"
          @validationFired="scrollToFirstError"
        />
        <PersonForm
          v-else
          :value="person"
          @changePassenger="updatePassengerField"
          @validationFired="scrollToFirstError"
        />
      </template>
    </PersonCard>

    <PersonCard :bordered="false">
      <template slot="headerLeft">
        <strong>Any special request?</strong>
        <p>Our teams in resort will deal with your request, but please note that they can’t be guaranteed.</p>
      </template>

      <template slot="default">
        <div class="bj__guests-checkboxes">
          <Checkbox
            v-for="item in specialRequestsOptions"
            :key="item.code"
            :value="item.code"
            :label="item.name"
            v-model="mutableSpecialRequests"
          />
        </div>

        <div ref="collapseBlock" class="bj__guests-other">
          <div class="bj__guests-other-trigger" @click="toggleCollapse">More <span class="caret" /></div>

          <div ref="collapseBody" class="bj__guests-other-body" >
            <JumpedTextarea v-model="mutableSpecialRequestText" :max-symbols="150" label="Other" />
          </div>
        </div>
      </template>
    </PersonCard>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import xor from 'lodash/xor';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import Checkbox from '@/components/shared/Checkbox.vue';
import JumpedTextarea from '@/components/shared/Textarea.vue';
import PersonCard from './PersonCard.vue';
import PersonForm from './PersonFrom.vue';

export default {
  components: {
    PersonCard,
    PersonForm,
    Checkbox,
    JumpedTextarea,
  },

  data: () => ({

  }),

  computed: {
    ...mapState('bookingJourney', [
      'savingComplete',
    ]),
    ...mapState('bookingJourney/guestDetails', [
      'passengers',
      'specialRequests',
      'specialRequestText',
      'marketingPreferences',

      'specialRequestsOptions',

      'initialPassengers',
      'initialSpecialRequests',
      'initialSpecialRequestText',
      'initialMarketingPreferences',
    ]),
    mutableSpecialRequests: {
      get() {
        return this.specialRequests;
      },
      set(val) {
        this.updateSpecialRequests({
          payload: val,
        });
      },
    },
    adultCount() {
      return this.passengers.filter((item) => item.isAdult).length;
    },
    mutableSpecialRequestText: {
      get() {
        return this.specialRequestText;
      },
      set(val) {
        this.updateSpecialRequestText({
          payload: val || '',
        });
      },
    },
  },

  methods: {
    ...mapActions('bookingJourney/guestDetails', [
      'updatePassengerField',
      'updateSpecialRequests',
      'updateSpecialRequestText',
      'fillPassengers',
    ]),
    toggleCollapse() {
      // const { collapseBody, collapseBlock } = this.$refs;

      // if ($(collapseBlock).hasClass('_opened')) {
      //   $(collapseBody).slideUp();
      // } else {
      //   $(collapseBody).slideDown(400, () => {
      //     $('html, body').animate({
      //       scrollTop: 9999,
      //     }, 2000);
      //   });
      // }
      // $(collapseBlock).toggleClass('_opened');
    },
    getPersonAgeName(person) {
      if (person.isAdult) {
        return 'Adult';
      }
      return person.isInfant ? 'Infant' : 'Child';
    },
    isDataChanged() {
      if (this.initialSpecialRequestText !== this.specialRequestText) return true;
      if (xor(this.initialSpecialRequests, this.specialRequests).length) return true;
      if (xor(this.initialMarketingPreferences, this.marketingPreferences).length) return true;
      if (!this.comparePassengers()) return true;
      return false;
    },
    comparePassengers() {
      let result = true;
      this.initialPassengers.forEach((el, index) => {
        // Getting rid of help data to compare only valueble data
        const { $invalid, $validationTrigger, ...realInitPassenger } = el;
        const {
          $invalid: newInvalid,
          $validationTrigger: newTrigger,
          ...realCurrentPassenger
        } = this.passengers[index];
        if (!isEqual(realInitPassenger, realCurrentPassenger)) result = false;
      });
      return result;
    },
    scrollToFirstError: debounce(() => {
      // const $firstInvalidEl = $('.bj-card__form-input._error').first();
      // $('html, body').animate({
      //   scrollTop: $firstInvalidEl.offset().top - $('.site-header__bj').height() - 50,
      // }, 500);
    }, 100),
  },
};
</script>
