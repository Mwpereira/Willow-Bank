<template>
  <div id="AddContact" class="container">
    <div class="section wb-section has-text-left">
      <p class="title mb-6">Add Contact</p>
      <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
        <form @submit.prevent="addContact({ name, email })">
          <b-field label="Name">
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
          <b-field label="Email">
            <BInputWithValidation
              v-model="email"
              icon="envelope"
              icon-pack="fas"
              placeolder="Name"
              rules="required|email"
              type="email"
            >
            </BInputWithValidation>
          </b-field>
          <div class="columns is-vcentered">
            <div class="column">
              <button
                :disabled="invalid"
                class="button is-primary is-fullwidth has-text-weight-bold mt-5"
                type="submit"
              >
                Add Contact
              </button>
            </div>
            <div class="column">
              <button
                v-on:click="switchPage('etransfer/manageContacts')"
                class="button is-light is-fullwidth has-text-weight-bold mt-5"
              >
                Manage Contact
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
import { Contact } from "@/interfaces/contact";
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
export default class AddContact extends Vue {
  private name = "";
  private email = "";

  async created(): Promise<void> {
    await WebsiteUtils.checkEtransfer();
  }

  public async addContact(contact: Contact) {
    BuefyService.startLoading();

    if (
      await this.$store.dispatch("updateContacts", {
        name: contact.name,
        email: contact.email,
        messageAction: MessageAction.ADD,
      })
    ) {
      await WebsiteUtils.switchPage("etransfer/sendEtransfer");
    }

    BuefyService.stopLoading();
  }

  public switchPage(page: string): void {
    WebsiteUtils.switchPage(page);
  }
}
</script>
