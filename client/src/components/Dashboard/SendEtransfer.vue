<template>
  <div id="SendEtransfer" class="container">
    <div class="section wb-section has-text-left">
      <p class="title mb-6">e-Transfer</p>
      <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
        <form id="form" @submit.prevent="sendEtransfer()">
          <b-field label="Find a Contact">
            <b-autocomplete
              v-model="name"
              :data="filteredDataArray"
              clearable
              icon="search"
              icon-pack="fas"
              placeholder="e.g John Doe"
              @select="(option) => (selected = option)"
            >
              <template #empty>No results found</template>
              <template #footer>
                <a @click="switchPage('etransfer/manageContacts/add')">
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
          <!--          <p>Payee: {{ this.amount }}</p>-->
          <!--          <p>Amount: {{ this.selected }}</p>-->
          <!--          <p>Account: Premium Savings Account</p>-->
          <!--          <p>Sender: {{ this.$store.getters.email }}</p>-->
          <div class="columns is-vcentered">
            <div class="column">
              <button
                :disabled="invalid || !contacts[name] || name === ''"
                class="button is-warning is-fullwidth has-text-weight-bold mt-5"
                type="submit"
              >
                Send
              </button>
            </div>
            <div class="column">
              <button
                v-on:click="switchPage('etransfer/manageContacts')"
                class="button is-light is-fullwidth has-text-weight-bold mt-5"
              >
                Manage Contacts
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
import { TransactionActions } from "@/enums/transaction-actions";
import { TransactionTypes } from "@/enums/transaction-types";
import BuefyService from "@/services/buefy-service";
import UserService from "@/services/user-service";
import WebsiteUtils from "@/utils/website-utils";
import { ValidationObserver } from "vee-validate";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class SendEtransfer extends Vue {
  private amount = "";
  private name = "";
  private selected = null;

  async created(): Promise<void> {
    await WebsiteUtils.checkEtransfer();
  }

  get contacts() {
    return this.$store.getters.etransfer.contacts;
  }

  get filteredDataArray() {
    return Object.keys(this.$store.getters.etransfer.contacts).filter(
      (option) => {
        return (
          option.toString().toLowerCase().indexOf(this.name.toLowerCase()) >= 0
        );
      }
    );
  }

  public async sendEtransfer(): Promise<void> {
    BuefyService.startLoading();

    if (
      await this.$store.dispatch("sendEtransfer", {
        amount: parseFloat(this.amount),
        receiver: this.contacts[this.name],
        type: TransactionTypes.ETRANSFER,
        action: TransactionActions.WITHDRAW,
      })
    ) {
      await WebsiteUtils.switchPage("dashboard/view");
    }

    BuefyService.stopLoading();
  }

  public switchPage(page: string): void {
    WebsiteUtils.switchPage(page);
  }
}
</script>

<style scoped></style>
