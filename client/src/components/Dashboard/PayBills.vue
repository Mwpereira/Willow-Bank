<template>
  <div id="PayBills" class="container">
    <div class="section has-text-left">
      <p class="title mb-6">Pay Bills</p>
      <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
        <form id="form" @submit.prevent="payBill()">
          <b-field label="Find a Payee">
            <b-autocomplete
                v-model="name"
                :data="filteredDataArray"
                clearable
                icon="search"
                icon-pack="fas"
                placeholder="e.g American Express"
                @select="option => selected = option">
              <template #empty>No results found</template>
              <template #footer>
                <a @click="switchPage('account/managePayees/add')">
                  <span> Add new... </span>
                </a>
              </template>
            </b-autocomplete>
          </b-field>
          <b-field label="Amount">
            <BInputWithValidation
                v-model="amount"
                icon="money-bill"
                icon-pack="fas"
                rules="required|min_value:1|max_value:10000"
            >
            </BInputWithValidation>
          </b-field>
          <div class="columns is-vcentered">
            <div class="column">
              <button
                  :disabled="invalid || !payees[name] || name === ''"
                  class="button is-warning is-fullwidth has-text-weight-bold mt-5"
                  type="submit"
              >
                Pay Bill
              </button>
            </div>
            <div class="column">
              <button
                  v-on:click="switchPage('account/managePayees')"
                  class="button is-light is-fullwidth has-text-weight-bold mt-5"
              >
                Manage Payees
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import BInputWithValidation from '@/components/Common/Inputs/BInputWithValidation.vue';
import {TransactionActions} from '@/enums/transaction-actions';
import {TransactionTypes} from '@/enums/transaction-types';
import BuefyService from '@/services/buefy-service';
import WebsiteUtils from '@/utils/website-utils';
import {ValidationObserver} from 'vee-validate';
import {Component, Vue} from 'vue-property-decorator';

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class PayBills extends Vue {
  private amount!: string;
  private name = '';
  private selected = null;

  get payees() {
    return this.$store.getters.account.payees;
  }

  get filteredDataArray() {
    return Object.keys(this.$store.getters.account.payees).filter((option) => {
      return option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
    })
  }

  public async payBill(): Promise<void> {
    BuefyService.startLoading();

    if (await this.$store.dispatch('payBill', {
      amount: parseFloat(this.amount),
      receiver: this.name,
      type: TransactionTypes.BILL,
      action: TransactionActions.WITHDRAW
    })) {
      await WebsiteUtils.switchPage('dashboard/view')
    }

    BuefyService.stopLoading();
  }

  public switchPage(page: string): void {
    WebsiteUtils.switchPage(page);
  }
}
</script>

<style scoped>
#form {
  max-width: 650px;
}
</style>
