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
        <div :class="{ _error: $v.dateOfBirth.$error }" class="bj-card__form-input _col20 _t-col24 _m-col50">
          <JumpInput
            v-model="$v.dateOfBirth.$model"
            name="dob"
            label="Date of birth"
            placeholder="dd/mm/yyyy"
            required
          />
          <template v-if="$v.dateOfBirth.$error">
            <div v-if="!$v.dateOfBirth.required" class="bj-card__form-error">Field is required</div>
            <div v-else-if="!$v.dateOfBirth.mustBeDate" class="bj-card__form-error">
              Please enter a valid date of birth
            </div>
            <div v-else-if="!$v.dateOfBirth.validBirthDay" class="bj-card__form-error">
              <template v-if="value.isAdult">Adult passenger must be over 18</template>
              <template v-else>The age you provided at search does not match this date of birth</template>
            </div>
          </template>
        </div>
      </div>
    </div>

    <AddressFields
      v-if="value.leadPassenger"
      :line1="$v.addressLine1.$model"
      :line2="addressLine2"
      :county="addressCounty"
      :city="$v.addressCity.$model"
      :postcode="$v.addressPostcode.$model"
      :line1-error="$v.addressLine1.$error"
      :city-error="$v.addressCity.$error"
      :postcode-error="$v.addressPostcode.$error"
      @updateField="updateAddressField"
    />

    <div v-if="value.leadPassenger" class="bj-card__form-row">
      <div class="bj-card__form-label">
        Contact details
        <p>We’ll only use these to keep you informed of any updates to your holiday.</p>
      </div>

      <div class="bj-card__form-group">
        <div :class="{ _error: $v.phoneNumber.$error }" class="bj-card__form-input _col50 _m-col100">
          <JumpInput v-model="$v.phoneNumber.$model" name="phone" label="Mobile" required />
          <template v-if="$v.phoneNumber.$error">
            <div v-if="!$v.phoneNumber.required" class="bj-card__form-error">Field is required</div>
          </template>
        </div>
      </div>

      <div class="bj-card__form-group">
        <div :class="{ _error: $v.email.$error }" class="bj-card__form-input _email _col50 _m-col100">
          <JumpInput v-model="$v.email.$model" name="email" label="Email" required autocomplete="email" />
          <template v-if="$v.email.$error">
            <div v-if="!$v.email.required" class="bj-card__form-error">Field is required</div>
            <div v-if="!$v.email.email" class="bj-card__form-error">Please enter valid email</div>
          </template>
        </div>
        <div :class="{ _error: $v.emailConfirm.$error }" class="bj-card__form-input _email-conf _col50 _m-col100">
          <JumpInput
            v-model="$v.emailConfirm.$model"
            name="emailConfirmation"
            label="Confirm email"
            required
            autocomplete="email"
          />
          <template v-if="$v.emailConfirm.$error">
            <div v-if="!$v.emailConfirm.required" class="bj-card__form-error">Emails must match</div>
          </template>
        </div>
      </div>
    </div>

    <MarketingPreferences v-if="value.leadPassenger" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import { required, email, sameAs } from 'vuelidate/lib/validators';
import JumpInput from '@/components/shared/Input.vue';
import JumpSelect from '@/components/shared/Select.vue';
// import DateInput from '@/components/shared/DateInput.vue';
import MarketingPreferences from './MarketingPreferences.vue';
import AddressFields from './AddressFields.vue';

export default {
  components: {
    JumpInput,
    JumpSelect,
    // DateInput,
    MarketingPreferences,
    AddressFields,
  },

  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    emailConfirm: '',
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
    phoneCode: {
      alpha3Code: 'GBR',
      code: '+44',
      flag: 'https://restcountries.eu/data/gbr.svg',
    },
    phoneNumber: '',
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
    dateOfBirth: {
      get() { return this.value.dateOfBirth; },
      set(val) { this.changeValue('dateOfBirth', val); },
    },
    email: {
      get() { return this.value.email; },
      set(val) { this.changeValue('email', val); },
    },
    addressCity: {
      get() { return this.value.addressCity; },
      set(val) { this.changeValue('addressCity', val); },
    },
    addressCounty: {
      get() { return this.value.addressCounty; },
      set(val) { this.changeValue('addressCounty', val); },
    },
    addressLine1: {
      get() { return this.value.addressLine1; },
      set(val) { this.changeValue('addressLine1', val); },
    },
    addressLine2: {
      get() { return this.value.addressLine2; },
      set(val) { this.changeValue('addressLine2', val); },
    },
    addressPostcode: {
      get() { return this.value.addressPostcode; },
      set(val) { this.changeValue('addressPostcode', val); },
    },
  },

  watch: {
    phoneNumber(val) {
      this.changeValue('contactNumber', val);
    },
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
    let rules = {
      title: {
        required,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      dateOfBirth: {
        required,
        mustBeDate: this.mustBeDate,
        validBirthDay: this.validBirthDay,
      },
    };
    if (this.value.leadPassenger) {
      rules = {
        ...rules,
        email: {
          required,
          email,
        },
        emailConfirm: {
          sameAsPassword: sameAs('email'),
        },
        addressCity: {
          required,
        },
        addressLine1: {
          required,
        },
        addressPostcode: {
          required,
        },
        phoneNumber: {
          required,
        },
      };
    }
    return rules;
  },

  methods: {
    makeStringCapital(str) {
      const firstLetter = str.substr(0, 1);
      const otherLetters = str.substr(1);
      return firstLetter.toUpperCase() + otherLetters;
    },
    updateAddressField({ fieldName, value }) {
      switch (fieldName) {
        case 'line1':
          this.$v.addressLine1.$model = value;
          break;
        case 'line2':
          this.changeValue('addressLine2', value);
          break;
        case 'city':
          this.$v.addressCity.$model = value;
          break;
        case 'county':
          this.changeValue('addressCounty', value);
          break;
        case 'postcode':
          this.$v.addressPostcode.$model = value;
          break;
        default:
          break;
      }
    },
    changeValue(fieldName, value) {
      this.$emit('changePassenger', {
        index: this.value.index,
        fieldName,
        value,
      });
    },
    mustBeDate(val) {
      // const re = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
      const re = /^([0-2][0-9]|(3)[0-1])( \/ )(((0)[0-9])|((1)[0-2]))( \/ )\d{4}$/;
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
