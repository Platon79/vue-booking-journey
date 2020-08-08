<template>
  <div class="bj-card__form-row bj-guest__address-wrap">
    <div class="bj-card__form-label">Address</div>

    <div class="bj-card__form-group">
      <div
        v-show="addressMode === 'auto'"
        :class="{ _error: someAddressFiledIsntFilled }"
        class="bj-card__form-input _col70 _m-col100"
      >
        <JumpInput
          id="fullAddress"
          v-model="fullAddress"
          autocomplete="no"
          label="Full address"
          required
        />
        <template v-if="someAddressFiledIsntFilled">
          <div class="bj-card__form-error">Need to fill all address fields</div>
        </template>
      </div>
      <div
        v-show="addressMode === 'manual'"
        :class="{ _error: line1Error }"
        class="bj-card__form-input _col70 _m-col100"
      >
        <JumpInput
          :value="line1"
          name="line1"
          label="Street address line 1"
          required
          autocomplete="address-line1"
          @input="(val) => updateField('line1', val)"
        />
        <div v-if="line1Error" class="bj-card__form-error">Field is required</div>
      </div>
      <div class="bj-card__form-input address-switcher-wrap _col30">
        <div :class="{'_turned-on': addressMode === 'manual'}" class="address-switcher" @click="toggleAddressMode">
          <span class="address-switcher__label">Autofill</span>
          <span class="address-switcher__tool">
            <i />
          </span>
          <span class="address-switcher__label">Manual</span>
        </div>
      </div>
    </div>

    <div v-show="addressMode === 'manual'" class="bj-card__form-group">
      <div class="bj-card__form-input _col70 _m-col100">
        <JumpInput
          :value="line2"
          name="line2"
          label="Street address line 2"
          autocomplete="address-line2"
          @input="(val) => updateField('line2', val)"
        />
      </div>
    </div>

    <div v-show="addressMode === 'manual'" class="bj-card__form-group">
      <div class="bj-card__form-input _col25 _m-col100">
        <JumpInput
          :value="county"
          name="county"
          label="County"
          autocomplete="address-level1"
          @input="(val) => updateField('county', val)"
        />
      </div>
      <div :class="{ _error: cityError }" class="bj-card__form-input _col25 _m-col100">
        <JumpInput
          :value="city"
          name="city"
          label="Town/City"
          required
          autocomplete="address-level2"
          @input="(val) => updateField('city', val)"
        />
        <div v-if="cityError" class="bj-card__form-error">Field is required</div>
      </div>
      <div :class="{ _error: postcodeError }" class="bj-card__form-input _col20 _m-col50">
        <JumpInput
          :value="postcode"
          name="postcode"
          label="Postcode"
          required
          autocomplete="postal-code"
          @input="(val) => updateField('postcode', val)"
        />
        <div v-if="postcodeError" class="bj-card__form-error">Field is required</div>
      </div>
    </div>
  </div>
</template>

<script>
import JumpInput from '@/components/shared/Input.vue';

export default {
  components: {
    JumpInput,
  },

  props: {
    line1: {
      type: String,
      default: '',
    },
    line2: {
      type: String,
      default: '',
    },
    county: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    postcode: {
      type: String,
      default: '',
    },
    line1Error: {
      type: Boolean,
      default: false,
    },
    cityError: {
      type: Boolean,
      default: false,
    },
    postcodeError: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    addressMode: 'manual', // auto or manual
    fullAddress: '',
  }),

  computed: {
    someAddressFiledIsntFilled() {
      return this.line1Error
        || this.cityError
        || this.postcodeError;
    },
  },

  mounted() {
    if (this.line1) {
      this.fullAddress = `${this.line1} ${this.line2} ${this.city} ${this.county} ${this.postcode}`;
    }
  },

  methods: {
    updateField(fieldName, value) {
      this.$emit('updateField', {
        fieldName,
        value,
      });
    },
    toggleAddressMode() {
      // Turn off because need to find analog of address library
      console.log('Feature is in developing');
      // this.addressMode = this.addressMode === 'auto' ? 'manual' : 'auto';
    },
  },
};
</script>
