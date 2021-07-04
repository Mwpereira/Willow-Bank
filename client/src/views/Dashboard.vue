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
import DashboardSummary from "@/components/Dashboard/Summary.vue";
import Summary from "@/components/Dashboard/AccountSummary.vue";
import Settings from "@/components/Dashboard/Settings.vue";
import Etransfers from "@/components/Dashboard/Etransfers.vue";
import PayBills from "@/components/Dashboard/AccountPayBills.vue";
import Info from "@/components/Dashboard/Info.vue";
import AuthService from "@/services/auth-service";

@Component({
  components: {
    NavBar,
    DashboardSummary,
    Summary,
    PayBills,
    Settings,
    Etransfers,
    Info,
  },
})
export default class Dashboard extends Vue {
  get page() {
    return this.$store.getters.page;
  }

  async created(): Promise<void> {
    if (
        !this.$store.getters.acceptedTermsAndConditions
    ) {
      await WebsiteUtils.switchVue("firstTimeLogin");
    } else {
      this.$store.dispatch("getRefreshToken").then(async (validAccessToken) => {
        if (!validAccessToken) {
          await AuthService.logout();
        } else {
          if (this.$store.getters.account === null) {
            await UserService.getAccount();
          }
          await this.$store.dispatch(
              "getPage",
              this.$router.currentRoute.path
          );
        }
      });
    }
  }
}
</script>

<style scoped></style>
