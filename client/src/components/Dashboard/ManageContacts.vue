<template>
  <div id="ManageContacts" class="container">
    <div class="section wb-section has-text-left">
      <p class="title mb-6">Manage Contacts</p>
      <p class="mb-3 is-size-5">Please choose one of the following:</p>
      <div class="field is-grouped">
        <button
            class="button is-primary is-fullwidth has-text-weight-bold mr-3 mt-5"
            type="submit"
            v-on:click="switchPage('etransfer/manageContacts/add')"
        >
          Add Contact
        </button>
        <button
            class="button is-primary is-fullwidth is-light has-text-weight-bold mt-5"
            type="submit"
            v-on:click="switchPage('etransfer/manageContacts/remove')"
        >
          Remove Contact
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BuefyService from '@/services/buefy-service';
import WebsiteUtils from '@/utils/website-utils';
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class ManageContacts extends Vue {
  public switchPage(page: string): void {
    WebsiteUtils.switchPage(page);
  }

  async created(): Promise<void> {
    WebsiteUtils.checkEtransfer();
  }
}
</script>

<style scoped>

</style>
