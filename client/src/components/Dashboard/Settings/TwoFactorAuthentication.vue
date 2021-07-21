<template>
  <div id="TwoFactorAuthentication" class="">
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form @submit.prevent="updateTwoFactorAuthenticationEnabled(tfaEnabled)">
        <b-field>
          <b-checkbox v-model="tfaEnabled" class="my-2" type="is-warning"
            >Enable Two Factor Authentication
          </b-checkbox>
        </b-field>
        <div class="columns is-vcentered">
          <div class="column"></div>
          <div class="column">
            <button
              :disabled="tfaEnabled === twoFactorAuthenticationEnabled"
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
  private tfaEnabled = false;

  get twoFactorAuthenticationEnabled(): boolean {
    return this.$store.getters.twoFactorAuthenticationEnabled;
  }

  test() {
    console.log("adasd");
  }

  created(): void {
    this.tfaEnabled = this.twoFactorAuthenticationEnabled;
  }

  public async updateTwoFactorAuthenticationEnabled(
    tfaEnabled: boolean
  ): Promise<void> {
    BuefyService.startLoading();

    await this.$store.dispatch(
      "saveTwoFactorAuthenticationEnabled",
      tfaEnabled
    );

    BuefyService.stopLoading();
  }
}
</script>

<style scoped></style>
