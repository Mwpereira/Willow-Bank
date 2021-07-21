<template>
  <div id="AccountPayBills" class="container">
    <div class="section has-text-left">
      <p class="title mb-6">Pay Bills</p>
      <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
        <form id="form" @submit.prevent="payBill()">
          <b-field label="Payee">
            <b-select icon="user" icon-pack="fas" placeholder="Select a Payee">
              <option
                v-for="option in data"
                :key="option.id"
                :value="option.id"
              >
                {{ option.user.first_name }}
              </option>
            </b-select>
          </b-field>
          <b-field label="Amount">
            <BInputWithValidation
              v-model="amount"
              icon="money-bill"
              icon-pack="fas"
              min="0"
              placeolder="Email"
              rules="required|email"
              type="number"
            >
            </BInputWithValidation>
          </b-field>
          <div class="columns is-vcentered">
            <div class="column"></div>
            <div class="column">
              <button
                :disabled="invalid"
                class="button is-warning is-fullwidth has-text-weight-bold mt-5"
                type="submit"
              >
                Pay Bill
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script lang="ts">
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import { AdminTransaction } from "@/interfaces/admin-transaction";
import BuefyService from "@/services/buefy-service";
import { ValidationObserver } from "vee-validate";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class AccountPayBills extends Vue {
  private amount = 0;

  get balance() {
    return this.$store.getters.account.balance;
  }

  public async payBill(transaction?: AdminTransaction): Promise<void> {
    BuefyService.startLoading();

    if (await this.$store.dispatch("payBill", transaction)) {
      console.log("fsfs");
    }

    BuefyService.stopLoading();
  }
}
</script>

<style scoped>
#form {
  max-width: 650px;
}
</style>
