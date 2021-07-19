<template>
  <div id="TwoFactorAuthentication" class="">
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form
        @submit.prevent="
          updateTwoFactorAuthenticationEnabled(twoFactorAuthenticationEnabled)
        "
      >
        <b-field>
          <b-checkbox
            v-model="twoFactorAuthenticationEnabled"
            class="my-2"
            type="is-warning"
            >Enable Two Factor Authentication
          </b-checkbox>
        </b-field>
        <div class="columns is-vcentered">
          <div class="column"></div>
          <div class="column">
            <button
              :disabled="false"
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
import BuefyService from "@/services/buefy-service";
import { Component, Vue } from "vue-property-decorator";
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import { ValidationObserver } from "vee-validate";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class TwoFactorAuthentication extends Vue {
  public twoFactorAuthenticationEnabled!: boolean;

  created(): void {
    this.twoFactorAuthenticationEnabled =
      this.$store.getters.twoFactorAuthenticationEnabled;
  }

  public async updateTwoFactorAuthenticationEnabled() {
    BuefyService.startLoading();

    await this.$store.dispatch(
      "saveTwoFactorAuthenticationEnabled",
      this.twoFactorAuthenticationEnabled
    );

    BuefyService.stopLoading();
  }
}
</script>

<style scoped></style>
