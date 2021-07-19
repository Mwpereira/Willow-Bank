<template>
  <div id="AccountSummary" class="container">
    <div class="section has-text-left">
      <p class="title mb-6">Account Summary</p>
      <div class="columns">
        <div class="column is-size-5">
          <p class="my-3">
            <b>Account Balance:</b> ${{ account.balance.toLocaleString() }}
          </p>
          <p class="my-3">
            <b>Number of Transactions:</b>
            {{ Object.keys(account.transactions).length }}
          </p>
          <p class="my-3">
            <b>Latest Transaction:</b>
            {{ account.transactions[0] ? account.transactions[0].date : "N/A" }}
          </p>
        </div>
        <div class="column">
          <div class="card mb-6">
            <div class="card-header p-6">
              <span>
                <i class="fas fa-coins"></i>
              </span>
              <p class="ml-3">Premium Savings Account</p>
            </div>
          </div>
        </div>
      </div>
      <Transactions />
    </div>
  </div>
</template>

<script lang="ts">
import Transactions from "@/components/Dashboard/Accounts/Transactions.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: { Transactions },
})
export default class AccountSummary extends Vue {
  get account() {
    return this.$store.getters.account;
  }
}
</script>

<style scoped></style>
