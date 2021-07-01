<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
    <form @submit.prevent="next({ firstName, lastName, country })">
      <b-field class="mb-5" label="First Name">
        <BInputWithValidation v-model="firstName" rules="required|max_account_characters:64"></BInputWithValidation>
      </b-field>
      <b-field class="mb-5" label="Last Name">
        <BInputWithValidation v-model="lastName" rules="required|max_account_characters:64"></BInputWithValidation>
      </b-field>
      <b-field class="mb-5" label="Country">
        <b-select v-model="country"
                  class="dropdown-box"
                  icon="globe-americas"
                  icon-pack="fas"
                  placeholder="Country"
                  rules="required"
        >
          <option value="Canada">Canada</option>
          <option value="United States">United States</option>
        </b-select>
      </b-field>
      <div class="columns is-vcentered">
        <div class="column">
          <b-button
              id="backButton"
              class="button is-white is-fullwidth has-text-weight-bold mt-5"
              v-on:click="back({ firstName, lastName, country })"
          >Back
          </b-button>
        </div>
        <div class="column">
          <button
              :disabled="invalid || country === ''"
              class="button is-warning is-fullwidth has-text-weight-bold mt-5"
              type="submit"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import {Emit, Prop, Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import {ValidationObserver} from "vee-validate";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class Step1 extends Vue {
  @Prop() public firstName!: string;
  @Prop() public lastName!: string;
  @Prop() public country!: string;

  @Emit()
  next(user: object) {
  }

  @Emit()
  back(user: object) {
  }
}
</script>

<style scoped>
</style>
