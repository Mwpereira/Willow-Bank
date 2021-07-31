<template>
  <div id="RemovePayee" class="container">
    <div class="section wb-section has-text-left">
      <p class="title mb-6">Remove Payee</p>
      <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
        <form @submit.prevent="confirmationDeletePayee">
          <b-field label="Name of Payee">
            <b-autocomplete
              v-model="name"
              :data="filteredDataArray"
              clearable
              icon="search"
              icon-pack="fas"
              placeholder="e.g American Express"
              @select="(option) => (selected = option)"
            >
              <template #empty>No results found</template>
            </b-autocomplete>
          </b-field>
          <div class="columns is-vcentered">
            <div class="column">
              <button
                :disabled="invalid || !payees[name] || name === ''"
                class="button is-danger is-fullwidth has-text-weight-bold mt-5"
                type="submit"
              >
                Remove
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
export default class RemovePayee extends Vue {
  private name = "";
  private selected = null;

  get payees() {
    return this.$store.getters.account.payees;
  }

  get filteredDataArray() {
    return Object.keys(this.payees).filter((option) => {
      return (
        option.toString().toLowerCase().indexOf(this.name.toLowerCase()) >= 0
      );
    });
  }

  public confirmationDeletePayee() {
    this.$buefy.dialog.confirm({
      title: 'Deleting Payee',
      message: 'Are you sure you want to <b>delete</b> this payee? This action cannot be undone.',
      confirmText: 'Delete Payee',
      type: 'is-danger',
      hasIcon: true,
      onConfirm: async () => await this.removePayee()
    })
  }

  public async removePayee() {
    BuefyService.startLoading();

    if (
      await this.$store.dispatch("updatePayees", {
        name: this.payees[this.selected].name,
        accountNumber: this.payees[this.selected].accountNumber,
        messageAction: MessageAction.REMOVE,
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
