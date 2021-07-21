<template>
  <div id="Admin" class="">
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form
        id="form"
        @submit.prevent="sendTransaction({ amount, transactionAction })"
      >
        <b-field label="Transaction" class="mb-5">
          <b-select
            v-model="transactionAction"
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
  </div>
</template>

<script lang="ts">
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import { AdminTransaction } from "@/interfaces/admin-transaction";
import BuefyService from "@/services/buefy-service";
import WebsiteUtils from "@/utils/website-utils";
import { ValidationObserver } from "vee-validate";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class Admin extends Vue {
  private amount!: string;
  private transactionAction = "Deposit";

  public async sendTransaction(transaction: AdminTransaction): Promise<void> {
    BuefyService.startLoading();

    transaction.amount = parseFloat(this.amount);

    if (await this.$store.dispatch("sendTransaction", transaction)) {
      await WebsiteUtils.switchPage("dashboard/view");
    }

    BuefyService.stopLoading();
  }
}
</script>

<style scoped></style>
