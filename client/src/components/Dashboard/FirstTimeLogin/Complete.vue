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
        <p class="my-2 py-1">Max Deposit/Withdraw Limit: <b>$10,000</b></p>
        <p class="my-2 py-1">Max e-Transfer Limit: <b>$3,000</b></p>
        <b-button class="mt-3 is-primary is-size-6" v-on:click="complete()"
          >Complete & Continue
        </b-button>
      </div>
      <div class="column">
        <img
          alt="Complete Registration"
          class="mt-5"
          src="../../../assets/img/FirstTimeLogin/sapling.webp"
          webp-fallback=".png"
          width="225"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BuefyService from "@/services/buefy-service";
import WebsiteUtils from "@/utils/website-utils";
import Buefy from "buefy";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Complete extends Vue {
  public async complete() {
    BuefyService.startLoading();
    this.$store.dispatch("acceptedTermsAndConditions").then(async (result) => {
      BuefyService.stopLoading();
      if (result) {
        await WebsiteUtils.switchVue("dashboard");
      }
    });
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
