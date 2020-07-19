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
          {{ choosenPersons.length }}/{{ extra.count }}
        </div>
      </div>

      <div class="extra-set-assign__body">
        <div v-if="extra.weekLabel" class="extra-set-assign__title">{{ extra.name }}</div>

        <div class="extra-set-assign__checkboxes">
          <div v-for="person in extra.passengersToAssign" :key="person.index" class="extra-set-assign__checkbox">
            <Checkbox
              :model="choosenPersons"
              :value="person.index"
              :label="person.fullName"
              :max-length="extra.count"
              @change="passengerClick(person.index)"
            />
            <div
              v-if="extra.skiLevels && openedPassengerLevelsPopup === extra.identifier + person.index"
              class="extra-set-assign__levels"
            >
              <h4>Ski/board level</h4>
              <div class="extra-set-assign__levels-list">
                <div
                  v-for="levelTid in extra.skiLevels"
                  :key="levelTid"
                  :class="{active: extra.skiLevelValue[person.index] === skiLevelsOptionsObject[levelTid].levelCode}"
                  class="extra-set-assign__levels-item"
                  @click="levelClick(person.index, levelTid)"
                >
                  {{ skiLevelsOptionsObject[levelTid].name }}
                </div>
              </div>
            </div>
            <div
              v-if="extra.skiLevelValue && extra.skiLevelValue[person.index]"
              class="extra-set-assign__levels-label"
              @click="openPassengerLevelsPopup(person.index)"
            >
              {{ skiLevelsOptionsObjectByLevelCode[extra.skiLevelValue[person.index]].name }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
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
    ...mapState('bookingJourney/extras', [
      'openedPassengerLevelsPopup',
      'skiLevelsOptions',
    ]),
    ...mapGetters('bookingJourney/extras', [
      'skiLevelsOptionsObject',
      'skiLevelsOptionsObjectByLevelCode',
    ]),
    choosenPersons() {
      return this.extra.skiLevelValue ? Object.keys(this.extra.skiLevelValue).map(el => +el) : [];
    },
    isValid() {
      return this.choosenPersons.length === this.extra.count;
    },
  },

  watch: {
    'extra.count': {
      immediate: true,
      handler(val) {
        const extraSkiLevels = this.extra.skiLevels;
        if (!this.extra.isAssignable || (extraSkiLevels && extraSkiLevels.length > 1)) return;
        const { passengers, passengersToAssign } = this.extra;
        const hasSkiLevel = !!extraSkiLevels;
        const singleSkiLevelsCode = hasSkiLevel ? this.skiLevelsOptionsObject[extraSkiLevels[0]].levelCode : null;
        const newSkiLevels = {};
        if (passengers.length > val) {
          for (let i = 0; i < val; i += 1) {
            const personIndex = passengers[i];
            newSkiLevels[personIndex] = hasSkiLevel ? singleSkiLevelsCode : null;
          }
        } else if (val === passengersToAssign.length) {
          passengersToAssign.forEach((el) => {
            newSkiLevels[el.index] = hasSkiLevel ? singleSkiLevelsCode : null;
          });
        } else {
          return;
        }
        this.$emit('updatePassengers', {
          val: newSkiLevels,
          extraIdentifier: this.extra.identifier,
          extra: this.extra,
        });
      },
    },
  },

  mounted() {
    // Close popup if click outside of it
    document.addEventListener('mousedown', (e) => {
      if (this.openedPassengerLevelsPopup && !e.target.closest('.extra-set-assign__levels')) {
        this.closePassengerLevelsPopup();
      }
    });
  },

  methods: {
    ...mapActions('bookingJourney/extras', [
      'updateOpenedPassengerLevelsPopup',
    ]),
    passengerClick(personIndex) {
      if (Object.prototype.hasOwnProperty.call(this.extra.skiLevelValue, personIndex)) {
        this.unassignPerson(personIndex);
      } else if (this.extra.skiLevels && this.extra.skiLevels.length === 1) {
        this.assignPerson(personIndex, this.extra.skiLevels[0]);
      } else if (this.extra.skiLevels && this.extra.skiLevels.length > 1) {
        this.openPassengerLevelsPopup(personIndex);
      } else {
        this.assignPerson(personIndex);
      }
    },
    levelClick(personIndex, levelTid = null) {
      this.assignPerson(personIndex, levelTid);
      this.closePassengerLevelsPopup();
    },
    openPassengerLevelsPopup(personIndex) {
      this.updateOpenedPassengerLevelsPopup(this.extra.identifier + personIndex);
    },
    closePassengerLevelsPopup() {
      this.updateOpenedPassengerLevelsPopup('');
    },
    assignPerson(personIndex, levelTid = null) {
      const newPassengers = { ...this.extra.skiLevelValue };
      newPassengers[personIndex] = levelTid ? this.skiLevelsOptionsObject[levelTid].levelCode : null;
      this.$emit('updatePassengers', {
        val: newPassengers,
        extra: this.extra,
      });
    },
    unassignPerson(personIndex) {
      const newPassengers = { ...this.extra.skiLevelValue };
      delete newPassengers[personIndex];
      this.$emit('updatePassengers', {
        val: newPassengers,
        extra: this.extra,
      });
    },
  },
};
</script>
