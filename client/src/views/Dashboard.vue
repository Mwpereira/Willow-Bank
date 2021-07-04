<template>
  <div id="Dashboard">
    <NavBar/>
    <Page :is="page"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import NavBar from "@/components/Dashboard/NavBar.vue";
import WebsiteUtils from "@/utils/website-utils";
import UserService from "@/services/user-service";
import Summary from "@/components/Dashboard/Summary.vue";
import Account from "@/components/Dashboard/Account.vue";
import Settings from "@/components/Dashboard/Settings.vue";
import Etransfers from "@/components/Dashboard/Etransfers.vue";
import Info from "@/components/Dashboard/Info.vue";
import AuthService from "@/services/auth-service";

@Component({
  components: {
    NavBar,
    Summary,
    Account,
    Settings,
    Etransfers,
    Info
  },
})
export default class Dashboard extends Vue {
  get page() {
    return this.$store.getters.page;
  }

  async created(): Promise<void> {
    if (!this.$store.getters.isLoggedIn) {
      await WebsiteUtils.switchVue('login');
    }
    else if (this.$store.getters.isLoggedIn && !this.$store.getters.acceptedTermsAndConditions) {
      await WebsiteUtils.switchVue('firstTimeLogin');
    }
    else
    {
      this.$store.dispatch('getRefreshToken').then(async (validAccessToken) => {
        if (!validAccessToken) {
          await AuthService.logout();
        }
        else {
          if ((this.$store.getters.account === null)) {
            await UserService.getAccount();
          }
          if (this.$router.currentRoute.path !== '/dashboard') {
            await this.$store.dispatch('getPage', this.$router.currentRoute.path);
          } else {
            this.$store.commit('setPage', 'Summary')
            WebsiteUtils.updatePageTitle("Dashboard");
          }
        }
      });
    }
  }
}
</script>

<style scoped></style>
