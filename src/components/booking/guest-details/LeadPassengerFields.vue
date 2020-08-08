<template>
  <div class="bj__guests-lead">
    <AddressFields
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

    <div class="bj-card__form-row">
      <div class="bj-card__form-label">
        Contact details
        <p>We’ll only use these to keep you informed of any updates to your holiday.</p>
      </div>

      <div class="bj-card__form-group">
        <div :class="{ _error: $v.contactNumber.$error }" class="bj-card__form-input _col50 _m-col100">
          <JumpInput v-model="$v.contactNumber.$model" name="phone" label="Mobile" required />
          <template v-if="$v.contactNumber.$error">
            <div v-if="!$v.contactNumber.required" class="bj-card__form-error">Field is required</div>
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

    <MarketingPreferences />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required, email, sameAs } from 'vuelidate/lib/validators';
import MarketingPreferences from './MarketingPreferences.vue';
import AddressFields from './AddressFields.vue';
import JumpInput from '@/components/shared/Input.vue';

export default {
  components: {
    MarketingPreferences,
    AddressFields,
    JumpInput,
  },

  data: () => ({
    emailConfirm: '',
  }),

  computed: {
    ...mapState('bookingJourney/guestDetails', [
      'leadPassengerData',
    ]),
    contactNumber: {
      get() { return this.leadPassengerData.contactNumber; },
      set(val) { this.changeValue('contactNumber', val); },
    },
    email: {
      get() { return this.leadPassengerData.email; },
      set(val) { this.changeValue('email', val); },
    },
    addressCity: {
      get() { return this.leadPassengerData.addressCity; },
      set(val) { this.changeValue('addressCity', val); },
    },
    addressCounty: {
      get() { return this.leadPassengerData.addressCounty; },
      set(val) { this.changeValue('addressCounty', val); },
    },
    addressLine1: {
      get() { return this.leadPassengerData.addressLine1; },
      set(val) { this.changeValue('addressLine1', val); },
    },
    addressLine2: {
      get() { return this.leadPassengerData.addressLine2; },
      set(val) { this.changeValue('addressLine2', val); },
    },
    addressPostcode: {
      get() { return this.leadPassengerData.addressPostcode; },
      set(val) { this.changeValue('addressPostcode', val); },
    },
  },

  validations() {
    return {
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
      contactNumber: {
        required,
      },
    };
  },

  methods: {
    ...mapActions('bookingJourney/guestDetails', [
      'updateLeadPassengerData',
    ]),
    changeValue(fieldName, value) {
      this.updateLeadPassengerData({
        ...this.leadPassengerData,
        fieldName: value,
      });
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
  },
};
</script>
