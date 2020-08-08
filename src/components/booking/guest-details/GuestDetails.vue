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
          {{ getPersonAgeLabel(person) }}
          {{ person.ageBasedIndex }}
        </strong>
        <template v-if="person.isLeadPassenger">
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
          :value="person"
          @changePassenger="updatePassengerField"
          @validationFired="scrollToFirstError"
        />
        <LeadPassengerFields v-if="person.isLeadPassenger" />
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
            :key="item.id"
            :value="item.id"
            :label="item.name"
            v-model="mutableSpecialRequests"
          />
        </div>

        <div ref="collapseBlock" class="bj__guests-other">
          <div class="bj__guests-other-trigger" @click="toggleCollapse">More <span class="caret" /></div>

          <div :class="{opened: otherOpened}" class="bj__guests-other-body">
            <JumpedTextarea v-model="mutableSpecialRequestText" :max-symbols="150" label="Other" />
          </div>
        </div>
      </template>
    </PersonCard>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import debounce from 'lodash/debounce';
import Checkbox from '@/components/shared/Checkbox.vue';
import JumpedTextarea from '@/components/shared/Textarea.vue';
import PersonCard from './PersonCard.vue';
import PersonForm from './PersonFrom.vue';
import LeadPassengerFields from './LeadPassengerFields.vue';

export default {
  components: {
    PersonCard,
    PersonForm,
    Checkbox,
    JumpedTextarea,
    LeadPassengerFields,
  },

  data: () => ({
    otherOpened: false,
  }),

  computed: {
    ...mapState('bookingJourney/guestDetails', [
      'passengers',
      'specialRequests',
      'specialRequestText',
      'specialRequestsOptions',
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
    ]),
    toggleCollapse() {
      this.otherOpened = !this.otherOpened;
    },
    getPersonAgeLabel(person) {
      if (person.isAdult) {
        return 'Adult';
      }
      return person.isInfant ? 'Infant' : 'Child';
    },
    scrollToFirstError: debounce(() => {
      // @todo: add scroll to ferst error
    }, 100),
  },
};
</script>
