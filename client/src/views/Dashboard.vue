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
import summary from "@/components/Dashboard/Summary.vue";

@Component({
  components: {
    NavBar,
    summary
  },
})
export default class Dashboard extends Vue {
  async mounted(): void {
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
      this.$store.commit('setPage', 'summary')
      WebsiteUtils.updatePageTitle("Dashboard");
    }
  }

  get page() {
    return this.$store.getters.page;
  }
}
</script>

<style scoped></style>
