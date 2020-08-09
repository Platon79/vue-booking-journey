<template>
  <div class="extra-set-assign-card">
    <div v-if="!extra.isAssignable" class="extra-set-assign__not-assignable">
      {{ extra.name }}
    </div>

    <template v-else>
      <div :class="{'_without-label': !extra.weekLabel}" class="extra-set-assign__head">
        <div class="extra-set-assign__label">
          {{ extra.weekLabel ? extra.weekLabel : extra.name }}
        </div>

        <div :class="{_valid: isValid}" class="extra-set-assign__count">
          <span v-if="isValid" class="icon" />
          {{ extra.passengers.length }}/{{ extra.count }}
        </div>
      </div>

      <div class="extra-set-assign__body">
        <div v-if="extra.weekLabel" class="extra-set-assign__title">{{ extra.name }}</div>

        <div class="extra-set-assign__checkboxes">
          <div v-for="person in passengersToAssign" :key="person.index" class="extra-set-assign__checkbox">
            <Checkbox
              :model="extra.passengers"
              :value="person.index"
              :label="`${person.firstName} ${person.lastName}`"
              :max-length="extra.count"
              @change="passengerClick(person.index)"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Checkbox from '@/components/shared/Checkbox.vue';

export default {
  components: {
    Checkbox,
  },

  props: {
    extra: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState('bookingJourney/guestDetails', [
      'passengers',
    ]),
    isValid() {
      return this.extra.passengers.length === this.extra.count;
    },
    passengersToAssign() {
      return [...this.passengers].splice(0, this.extra.maxNumber);
    },
  },

  methods: {
    passengerClick(personIndex) {
      const person = this.extra.passengers.find((el) => el === personIndex);
      if (person) {
        this.unassignPassenger(personIndex);
      } else {
        this.assignPassenger(personIndex);
      }
    },
    assignPassenger(personIndex) {
      if (this.extra.passengers.length === this.extra.count) return;
      const newPassengers = [...this.extra.passengers, personIndex];
      this.$emit('updatePassengers', {
        extra: this.extra,
        val: newPassengers,
      });
    },
    unassignPassenger(personIndex) {
      const newPassengers = this.extra.passengers.filter((el) => el !== personIndex);
      this.$emit('updatePassengers', {
        extra: this.extra,
        val: newPassengers,
      });
    },
  },
};
</script>
