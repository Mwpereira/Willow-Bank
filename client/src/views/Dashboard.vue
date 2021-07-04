<template>
  <div id="Dashboard">
    <NavBar />
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
  async mounted() {
    if (!this.$store.getters.isLoggedIn) {
      WebsiteUtils.switchVue('login');
    }
    if (this.$store.getters.isLoggedIn && !this.$store.getters.acceptedTermsAndConditions) {
      WebsiteUtils.switchVue('firstTimeLogin');
    }
    if (this.$store.getters.account === null) {
      await UserService.getAccount();
    }
    if(this.$router.currentRoute.path !== '/dashboard'){
      await this.$store.dispatch('getPage', this.$router.currentRoute.path);
    }
    else{
      this.$store.commit('setPage', 'Summary')
      WebsiteUtils.updatePageTitle("Dashboard");
    }
  }

  get page() {
    return this.$store.getters.page;
  }
}
</script>

<style scoped></style>
