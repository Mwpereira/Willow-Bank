<template>
  <div id="Settings" class="container">
    <div class="section has-text-left">
      <p class="title mb-6">Settings</p>
      <b-tabs id="tabs">
        <b-tab-item label="User Details">
          <UserData />
        </b-tab-item>
        <b-tab-item label="Change Credentials">
          <ChangeCredentials />
        </b-tab-item>
        <b-tab-item label="2FA">
          <TwoFactorAuthentication />
        </b-tab-item>
        <b-tab-item label="Admin">
          <Admin />
        </b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import Admin from "@/components/Dashboard/Settings/Admin.vue";
import BuefyService from "@/services/buefy-service";
import WebsiteUtils from "@/utils/website-utils";
import { Component, Vue } from "vue-property-decorator";
import UserData from "@/components/Dashboard/Settings/UserData.vue";
import TwoFactorAuthentication from "@/components/Dashboard/Settings/TwoFactorAuthentication.vue";
import ChangeCredentials from "@/components/Dashboard/Settings/ChangeCredentials.vue";

@Component({
  components: { Admin, TwoFactorAuthentication, ChangeCredentials, UserData },
})
export default class Settings extends Vue {
  async created(): Promise<void> {
    await WebsiteUtils.checkSettings();
  }
}
</script>

<style scoped>
#tabs {
  max-width: 650px;
  min-height: 450px;
}
</style>
