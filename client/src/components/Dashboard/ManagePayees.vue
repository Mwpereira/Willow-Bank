<template>
  <div id="ManagePayees" class="container">
    <div class="section wb-section has-text-left">
      <p class="title mb-6">Manage Payees</p>
      <p class="mb-3 is-size-5">Please choose one of the following:</p>
      <div class="field is-grouped">
        <button
          class="button is-primary is-fullwidth mr-3 mt-5"
          type="submit"
          v-on:click="switchPage('account/managePayees/add')"
        >
          Add Payee
        </button>
        <button
          class="
            button
            is-primary is-fullwidth is-light
            has-text-weight-bold
            mt-5
          "
          type="submit"
          v-on:click="switchPage('account/managePayees/remove')"
        >
          Remove Payee
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import WebsiteUtils from "@/utils/website-utils";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ManagePayees extends Vue {
  public switchPage(page: string): void {
    WebsiteUtils.switchPage(page);
  }
}
</script>

<style scoped></style>
