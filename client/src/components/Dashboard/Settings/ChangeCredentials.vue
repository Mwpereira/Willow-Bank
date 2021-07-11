<template>
  <div id="ChangePassword" class="">
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form @submit.prevent="next({ email, password })">
        <b-field class="mb-5" label="Email">
          <BInputWithValidation
            v-model="email"
            icon="envelope"
            icon-pack="fas"
            placeolder="Email"
            rules="required|email"
            type="email"
          >
          </BInputWithValidation>
        </b-field>
        <b-field class="mb-5" label="Password">
          <BInputWithValidation
            v-model="password"
            icon="key"
            icon-pack="fas"
            password-reveal
            rules="required|min_password:7|max_account_characters:64"
            type="password"
          >
          </BInputWithValidation>
        </b-field>
        <div class="columns is-vcentered">
          <div class="column">
            <b-button
              id="backButton"
              class="button is-white is-fullwidth has-text-weight-bold mt-5"
              v-on:click="back({ firstName, lastName, country })"
              >Cancel
            </b-button>
          </div>
          <div class="column">
            <button
              :disabled="invalid || country === ''"
              class="button is-warning is-fullwidth has-text-weight-bold mt-5"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script lang="ts">
import { Emit, Prop, Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import { ValidationObserver } from "vee-validate";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class ChangeCredentials extends Vue {
  public email!: string;
  public password!: string;
}
</script>

<style scoped></style>
