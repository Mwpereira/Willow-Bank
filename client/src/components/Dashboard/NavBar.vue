<template>
  <b-navbar>
    <template #start>
      <b-navbar-item v-on:click="switchPage('dashboard/view')">
        Dashboard
      </b-navbar-item>
      <b-navbar-dropdown label="Account">
        <b-navbar-item v-on:click="switchPage('account/summary')"
          >Summary
        </b-navbar-item>
        <b-navbar-item v-on:click="switchPage('account/payBills')"
          >Pay Bills
        </b-navbar-item>
        <b-navbar-item v-on:click="switchPage('account/managePayees')"
          >Manage Payees
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="eTransfer">
        <b-navbar-item v-on:click="switchPage('etransfer/transfers')"
          >Past Transfers
        </b-navbar-item>
        <b-navbar-item v-on:click="switchPage('etransfer/sendEtransfer')"
          >Send eTransfer
        </b-navbar-item>
        <b-navbar-item v-on:click="switchPage('etransfer/manageContacts')"
          >Manage Contacts
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item v-on:click="switchPage('info')">Info</b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a
            class="button is-warning"
            rel="noopener"
            v-on:click="switchPage('user/settings')"
          >
            <strong>Settings</strong>
          </a>
          <a class="button is-light" rel="noopener" v-on:click="logout()">
            Logout
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import AuthService from "@/services/auth-service";
import BuefyService from "@/services/buefy-service";
import WebsiteUtils from "@/utils/website-utils";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  public switchPage(page: string): void {
    WebsiteUtils.switchPage(page);
  }

  public logout(): void {
    AuthService.logout();
    BuefyService.successToast("Signed Out");
  }
}
</script>

<style scoped>
.navbar-item {
  font-weight: bold;
}
</style>
