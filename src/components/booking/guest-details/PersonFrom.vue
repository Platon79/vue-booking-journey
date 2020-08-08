<template>
  <div>
    <div class="bj-card__form-row">
      <div class="bj-card__form-group">
        <div :class="{ _error: $v.title.$error }" class="bj-card__form-input _col20 _m-col50">
          <JumpSelect
            v-model="$v.title.$model"
            :options="value.isAdult ? adultTitleOptions : childrenTitleOptions"
            label="Title"
            placeholder="Choose title"
            required
          />
          <template v-if="$v.title.$error">
            <div v-if="!$v.title.required" class="bj-card__form-error">Field is required</div>
          </template>
        </div>
        <div :class="{ _error: $v.firstName.$error }" class="bj-card__form-input _col30 _t-col28 _m-col100">
          <JumpInput
            v-model="$v.firstName.$model"
            name="firstName"
            label="First name"
            required
            autocomplete="given-name"
          />
          <template v-if="$v.firstName.$error">
            <div v-if="!$v.firstName.required" class="bj-card__form-error">Field is required</div>
          </template>
        </div>
        <div :class="{ _error: $v.lastName.$error }" class="bj-card__form-input _col30 _t-col28 _m-col100">
          <JumpInput
            v-model="$v.lastName.$model"
            name="lastName"
            label="Last name"
            required
            autocomplete="family-name"
          />
          <template v-if="$v.lastName.$error">
            <div v-if="!$v.lastName.required" class="bj-card__form-error">Field is required</div>
          </template>
        </div>
        <div :class="{ _error: $v.birthDay.$error }" class="bj-card__form-input _col20 _t-col24 _m-col50">
          <JumpInput
            v-model="$v.birthDay.$model"
            name="dob"
            label="Date of birth"
            placeholder="dd/mm/yyyy"
            required
          />
          <template v-if="$v.birthDay.$error">
            <div v-if="!$v.birthDay.required" class="bj-card__form-error">Field is required</div>
            <div v-else-if="!$v.birthDay.mustBeDate" class="bj-card__form-error">
              Please enter a valid date of birth
            </div>
            <div v-else-if="!$v.birthDay.validBirthDay" class="bj-card__form-error">
              <template v-if="value.isAdult">Adult passenger must be over 18</template>
              <template v-else>The age you provided at search does not match this date of birth</template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import { required } from 'vuelidate/lib/validators';
import JumpInput from '@/components/shared/Input.vue';
import JumpSelect from '@/components/shared/Select.vue';

export default {
  components: {
    JumpInput,
    JumpSelect,
  },

  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    adultTitleOptions: [
      {
        label: 'Mr',
        val: 'Mr',
      },
      {
        label: 'Mrs',
        val: 'Mrs',
      },
      {
        label: 'Ms',
        val: 'Ms',
      },
      {
        label: 'Miss',
        val: 'Miss',
      },
    ],
    childrenTitleOptions: [
      {
        label: 'Master',
        val: 'Master',
      },
      {
        label: 'Miss',
        val: 'Miss',
      },
    ],
  }),

  computed: {
    ...mapState('bookingJourney', [
      'holidaysDetails',
    ]),
    title: {
      get() { return this.value.title; },
      set(val) { this.changeValue('title', val); },
    },
    firstName: {
      get() { return this.value.firstName; },
      set(val) { this.changeValue('firstName', this.makeStringCapital(val)); },
    },
    lastName: {
      get() { return this.value.lastName; },
      set(val) { this.changeValue('lastName', this.makeStringCapital(val)); },
    },
    birthDay: {
      get() { return this.value.birthDay; },
      set(val) { this.changeValue('birthDay', val); },
    },
  },

  watch: {
    'value.$validationTrigger': {
      handler() {
        this.$v.$touch();
        this.$emit('validationFired');
      },
    },
    '$v.$invalid': {
      immediate: true,
      handler(val) {
        this.changeValue('$invalid', val);
      },
    },
  },

  validations() {
    return {
      title: {
        required,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      birthDay: {
        required,
        mustBeDate: this.mustBeDate,
        validBirthDay: this.validBirthDay,
      },
    };
  },

  methods: {
    makeStringCapital(str) {
      const firstLetter = str.substr(0, 1);
      const otherLetters = str.substr(1);
      return firstLetter.toUpperCase() + otherLetters;
    },
    changeValue(fieldName, value) {
      this.$emit('changePassenger', {
        index: this.value.index,
        fieldName,
        value,
      });
    },
    mustBeDate(val) {
      const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
      return re.test(val);
    },
    validBirthDay(value) {
      const childAge = this.value.age;
      const holidayEndDate = moment(this.holidaysDetails.departureDate, 'YYYY-MM-DD')
        .add(this.holidaysDetails.duration, 'days');
      const currentAge = holidayEndDate.diff(moment(value, 'DD/MM/YYYY'), 'years');
      if (this.value.isAdult) {
        return currentAge > 18;
      }
      return childAge === currentAge;
    },
  },
};
</script>
