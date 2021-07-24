<template>
  <div id="Dashboard">
    <NavBar />
    <Page :is="page" />
  </div>
</template>

<script lang="ts">
import PayBills from "@/components/Dashboard/AccountPayBills.vue";
import Summary from "@/components/Dashboard/AccountSummary.vue";
import Etransfers from "@/components/Dashboard/Etransfers.vue";
import Info from "@/components/Dashboard/Info.vue";
import NavBar from "@/components/Dashboard/NavBar.vue";
import Settings from "@/components/Dashboard/Settings.vue";
import DashboardSummary from "@/components/Dashboard/Summary.vue";
import BuefyService from '@/services/buefy-service';
import WebsiteUtils from "@/utils/website-utils";
import { Component, Vue } from "vue-property-decorator";

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
    if (!this.$store.getters.acceptedTermsAndConditions) {
      await WebsiteUtils.switchVue("firstTimeLogin");
    } else {
      await this.$store.dispatch("getPage", this.$router.currentRoute.path);
      this.$store.dispatch("getRefreshToken").then(async (validAccessToken) => {
        if (!validAccessToken) {
          await this.$store.dispatch("logout");
        } else {
          BuefyService.startLoading();
          this.$store.dispatch("getAccount").then(async ()=> {
            await this.$store.dispatch("getSettings");
          })
          BuefyService.stopLoading();
        }
      });
    }
  }
}
</script>

<style scoped></style>
