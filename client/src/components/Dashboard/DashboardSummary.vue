<template>
  <div id="DashboardSummary" class="container">
    <div class="section has-text-left">
      <p class="title">Dashboard</p>
      <div class="card p-6 mb-5">
        <div class="columns">
          <div class="column">
            <p class="is-size-1 has-text-primary">
              ${{ account ? account.balance.toLocaleString() : "0" }}
            </p>
            <p class="has-text-weight-bold">Premium Savings Account Balance</p>
          </div>
          <div class="column">
            <p class="is-size-1">
              {{ account ? Object.keys(account.transactions).length : "0" }}
            </p>
            <p class="has-text-weight-bold">Number of Transactions</p>
          </div>
        </div>
      </div>

      <div class="card p-6 mb-5">
        <div class="columns">
          <div class="column">
            <p class="is-size-3 mb-2">
              {{ lastLogin ? lastLogin.split(",")[0] : "N/A" }}
            </p>
            <p class="has-text-weight-bold">Last Login</p>
          </div>
          <div class="column">
            <p class="is-size-3 mb-2">0</p>
            <p class="has-text-weight-bold">Notifications</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import WebsiteUtils from "@/utils/website-utils";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DashboardSummary extends Vue {
  get account() {
    return this.$store.getters.account;
  }

  get lastLogin() {
    return this.$store.getters.lastLogin;
  }

  async created(): Promise<void> {
    await WebsiteUtils.updatePageTitle(
      this.$router.currentRoute.path.substr(1)
    );
  }
}
</script>
