<template>
  <div id="AddPayee" class="container">
    <div class="section wb-section has-text-left">
      <p class="title mb-6">Add Payee</p>
      <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
        <form @submit.prevent="addPayee({ name, accountNumber })">
          <b-field label="Name of Payee">
            <BInputWithValidation
              v-model="name"
              icon="user"
              icon-pack="fas"
              placeolder="Name"
              rules="required"
              type="text"
            >
            </BInputWithValidation>
          </b-field>
          <b-field label="Account Number">
            <BInputWithValidation
              v-model="accountNumber"
              icon="user-secret"
              icon-pack="fas"
              rules="required|min_an_value:0|max_an_value:999999999999"
            >
            </BInputWithValidation>
          </b-field>
          <div class="columns is-vcentered">
            <div class="column">
              <button
                :disabled="invalid || payees[name]"
                class="button is-primary is-fullwidth has-text-weight-bold mt-5"
                type="submit"
              >
                Add
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
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import { MessageAction } from "@/enums/message-action";
import { Payee } from "@/interfaces/payee";
import BuefyService from "@/services/buefy-service";
import WebsiteUtils from "@/utils/website-utils";
import { ValidationObserver } from "vee-validate";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class AddPayee extends Vue {
  private name = "";
  private accountNumber = "";

  get payees() {
    return this.$store.getters.account.payees;
  }

  public async addPayee(payee: Payee) {
    BuefyService.startLoading();

    if (
      await this.$store.dispatch("updatePayees", {
        name: payee.name,
        accountNumber: payee.accountNumber,
        messageAction: MessageAction.ADD,
      })
    ) {
      await WebsiteUtils.switchPage("account/payBills");
    }

    BuefyService.stopLoading();
  }

  public switchPage(page: string): void {
    WebsiteUtils.switchPage(page);
  }
}
</script>
