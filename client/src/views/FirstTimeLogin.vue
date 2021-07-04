<template>
  <section class="mt-6 container">
    <b-steps
      v-model="activeStep"
      :animated="true"
      :has-navigation="true"
      :rounded="true"
      mobile-mode="minimalist"
    >
      <b-step-item
        :clickable="activeStep > 0"
        class="mt-5"
        label="Select Account"
        step="1"
      >
        <h1 class="title has-text-centered mb-6">Select Account</h1>
        <SelectAccounts />
      </b-step-item>

      <b-step-item
        :clickable="activeStep > 1"
        class="mt-5"
        label="Terms & Services"
        step="2"
      >
        <h1 class="title has-text-centered mb-6">Terms & Services</h1>
        <TermsAndConditions
          :agree0="this.agree0"
          :agree1="this.agree1"
          :agree2="this.agree2"
          @update-agrees="updateAgrees($event)"
        />
      </b-step-item>

      <b-step-item
        :clickable="activeStep > 1"
        :step="3"
        class="mt-5"
        disabled
        label="Complete"
      >
        <h1 class="title has-text-centered mb-6">Complete</h1>
        <Complete />
      </b-step-item>

      <template v-if="true" #navigation="{ previous, next }">
        <div class="my-6">
          <b-button
            :disabled="previous.disabled"
            class="mx-2"
            @click.prevent="previous.action"
          >
            <i class="fas fa-angle-left"></i>
          </b-button>
          <b-button
            :disabled="next.disabled || disableButton"
            class="mx-2"
            @click.prevent="next.action"
          >
            <i class="fas fa-angle-right"></i>
          </b-button>
        </div>
      </template>
    </b-steps>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WebsiteUtils from "@/utils/website-utils";
import TermsAndConditions from "@/components/Dashboard/FirstTimeLogin/TermsAndConditions.vue";
import SelectAccounts from "@/components/Dashboard/FirstTimeLogin/SelectAccount.vue";
import Complete from "@/components/Dashboard/FirstTimeLogin/Complete.vue";
import AuthService from "@/services/auth-service";

@Component({
  components: { Complete, SelectAccounts, TermsAndConditions },
})
export default class FirstTimeLogin extends Vue {
  public activeStep = 0;

  public agree0 = false;
  public agree1 = false;
  public agree2 = false;

  get disableButton(): boolean {
    return (
      this.activeStep === 1 && (!this.agree0 || !this.agree1 || !this.agree2)
    );
  }

  public updateAgrees(agrees: any): void {
    this.agree0 = agrees.agree0;
    this.agree1 = agrees.agree1;
    this.agree2 = agrees.agree2;
  }

  public async dashboard(): Promise<void> {
    await WebsiteUtils.switchVue("dashboard");
  }

  async created(): Promise<void> {
    if (
      this.$store.getters.isLoggedIn &&
      this.$store.getters.acceptedTermsAndConditions
    ) {
      await WebsiteUtils.switchVue("dashboard");
    } else if (!this.$store.getters.isLoggedIn) {
      await AuthService.logout();
    } else {
      await WebsiteUtils.updatePageTitle("Let's Get Started");
    }
  }
}
</script>

<style>
.step-details {
  margin-top: 7px !important;
}
</style>
