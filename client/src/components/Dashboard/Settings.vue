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
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserData from "@/components/Dashboard/Settings/UserData.vue";
import TwoFactorAuthentication from "@/components/Dashboard/Settings/TwoFactorAuthentication.vue";
import ChangeCredentials from "@/components/Dashboard/Settings/ChangeCredentials.vue";

@Component({
  components: { TwoFactorAuthentication, ChangeCredentials, UserData },
})
export default class Settings extends Vue {}
</script>

<style scoped>
#tabs {
  max-width: 600px;
}
</style>
