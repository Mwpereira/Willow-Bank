<template>
  <div id="RemoveContact" class="container">
    <div class="section wb-section has-text-left">
      <p class="title mb-6">Remove Contact</p>
      <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
        <form @submit.prevent="removeContact">
          <b-field label="Name of Payee">
            <b-autocomplete
                v-model="name"
                :data="filteredDataArray"
                clearable
                icon="search"
                icon-pack="fas"
                placeholder="e.g John Doe"
                @select="option => selected = option">
              <template #empty>No results found</template>
            </b-autocomplete>
          </b-field>
          <div class="columns is-vcentered">
            <div class="column">
              <button
                  :disabled="invalid || !contacts[name] || name === ''"
                  class="button is-danger is-fullwidth has-text-weight-bold mt-5"
                  type="submit"
              >
                Remove Contact
              </button>
            </div>
            <div class="column">
              <button
                  class="button is-light is-fullwidth has-text-weight-bold mt-5"
                  v-on:click="switchPage('etransfer/manageContacts')"
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
import BInputWithValidation from '@/components/Common/Inputs/BInputWithValidation.vue';
import {MessageAction} from '@/enums/message-action';
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
export default class RemoveContact extends Vue {
  private name = '';
  private selected = null;

  get contacts() {
    return this.$store.getters.etransfer.contacts;
  }

  get filteredDataArray() {
    return Object.keys(this.contacts).filter((option) => {
      return option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
    })
  }

  public async removeContact() {
    BuefyService.startLoading();

    if (await this.$store.dispatch('updateContacts', {
      name: this.contacts[this.selected].name,
      email: this.contacts[this.selected].email,
      messageAction: MessageAction.REMOVE
    })) {
      await WebsiteUtils.switchPage('etransfer/sendEtransfer');
    }

    BuefyService.stopLoading();
  }

  public switchPage(page: string): void {
    WebsiteUtils.switchPage(page);
  }
}
</script>
