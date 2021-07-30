<template>
  <div id="PastTransfers" class="container">
    <div class="section has-text-left">
      <p class="title mb-6">Past Transfers</p>
      <div class="columns">
        <div class="column is-size-5">
          <p class="my-3">
            <b>Account Balance:</b> ${{ account.balance.toLocaleString() }}
          </p>
          <p class="my-3">
            <b>Number of e-Transfers:</b>
            {{ Object.keys(etransfer.transactions).length }}
          </p>
          <p class="my-3">
            <b>Latest e-Transfer:</b>
            {{
              etransfer.transactions[etransfer.transactions.length - 1]
                  ? etransfer.transactions[
                  etransfer.transactions.length - 1
                      ].date.split(",")[0]
                  : "N/A"
            }}
          </p>
        </div>
        <div class="column">
          <div class="card mb-6">
            <div class="card-header p-6">
              <span class="mr-3">
                <i class="fas fa-user"></i>
              </span>
              <p class="ml-3">{{ this.$store.getters.email }}</p>
            </div>
          </div>
        </div>
      </div>
      <Transactions/>
    </div>
  </div>
</template>

<script lang="ts">
import Transactions from '@/components/Dashboard/Etransfers/Transactions.vue';
import {Component, Vue} from 'vue-property-decorator';

@Component({
  components: {Transactions},
})
export default class PastTransfers extends Vue {
  get account() {
    return this.$store.getters.account;
  }

  get etransfer() {
    return this.$store.getters.etransfer;
  }
}
</script>
