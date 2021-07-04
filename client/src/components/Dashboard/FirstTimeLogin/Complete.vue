<template>
  <div id="Complete">
    <div class="columns">
      <div class="column has-text-left mt-5">
        <p class="is-size-5 has-text-weight-bold my-5">
          Let's Start Saving and Earning
        </p>
        <p class="my-2 py-1">Account Type: <b>Premium</b></p>
        <p class="my-2 py-1">Initial Investment: <b>$10,000</b></p>
        <p class="my-2 py-1">Interest Rate: <b>7%</b></p>
        <b-button class="mt-2 is-primary is-size-6" v-on:click="complete()"
          >Complete & Continue</b-button
        >
      </div>
      <div class="column">
        <img
          class="mt-5"
          src="../../../assets/img/FirstTimeLogin/sapling.png"
          width="225"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/services/user-service";
import WebsiteUtils from "@/utils/website-utils";
import BuefyService from "@/services/buefy-service";

@Component
export default class Complete extends Vue {
  public async complete() {
    BuefyService.startLoading();
    const response = await UserService.acceptedTermsAndConditions();
    BuefyService.stopLoading();
    new Promise((resolve) => setTimeout(resolve, 1000));
    if (response.data.acceptedTermsAndConditions) {
      await this.$store.commit("setAcceptedTermsAndConditions", true);
      await WebsiteUtils.switchVue("dashboard");
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .mb-6 {
    margin-bottom: 12px !important;
  }
}
</style>
