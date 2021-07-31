<template>
  <div id="Admin" class="">
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form id="form" @submit.prevent="sendTransaction({ amount, action })">
        <b-field class="mb-5" label="Transaction">
          <b-select
              v-model="action"
              icon="shapes"
              icon-pack="fas"
              placeholder="Transaction Action"
              rules="required"
          >
            <option>Deposit</option>
            <option>Withdraw</option>
          </b-select>
        </b-field>
        <b-field label="Amount">
          <BInputWithValidation
              v-model="amount"
              v-bind:options="options"
              icon="money-bill"
              icon-pack="fas"
              rules="required|min_value:1|max_value:10000"
          >
          </BInputWithValidation>
        </b-field>
        <div class="columns is-vcentered">
          <div class="column"></div>
          <div class="column">
            <button
                :disabled="invalid"
                class="button is-info is-fullwidth has-text-weight-bold mt-5"
                type="submit"
            >
              Send Request
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <p class="mt-6 has-text-weight-bold">
      Willow Bank User
    </p>
    <div class="columns is-vcentered">
      <div class="column"></div>
      <div class="column">
        <button
            class="button is-danger is-fullwidth has-text-weight-bold mt-5"
            v-on:click="confirmationDeleteUser"
        >
          Delete Account
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BInputWithValidation from '@/components/Common/Inputs/BInputWithValidation.vue';
import {TransactionActions} from '@/enums/transaction-actions';
import {AdminTransaction} from '@/interfaces/admin-transaction';
import BuefyService from '@/services/buefy-service';
import WebsiteUtils from '@/utils/website-utils';
import {ValidationObserver} from 'vee-validate';
import Component from 'vue-class-component';
import {Vue} from 'vue-property-decorator';

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class Admin extends Vue {
  private amount = '';
  private action = TransactionActions.DEPOSIT;

  public confirmationDeleteUser() {
    this.$buefy.dialog.confirm({
      title: 'Deleting User',
      message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
      confirmText: 'Delete Account',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: async () => await this.deleteUser()
    })
  }

  public async deleteUser(){
    await this.$store.dispatch('deleteUser');
  }

  public async sendTransaction(transaction: AdminTransaction): Promise<void> {
    BuefyService.startLoading();

    transaction.amount = parseFloat(this.amount);

    if (await this.$store.dispatch('sendTransaction', transaction)) {
      await WebsiteUtils.switchPage('dashboard/view');
    }

    BuefyService.stopLoading();
  }
}
</script>

<style scoped></style>
