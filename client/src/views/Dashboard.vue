<template>
  <p>Dashboard</p>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import WebsiteUtils from "@/utils/website-utils";
import UserService from "@/services/user-service";

@Component
export default class Dashboard extends Vue {
  mounted(): void {
    if(!this.$store.getters.isLoggedIn){
      WebsiteUtils.switchPage('login');
    }
    if(this.$store.getters.isLoggedIn && !this.$store.getters.acceptedTermsAndConditions){
      WebsiteUtils.switchPage('firstTimeLogin');
    }
    UserService.getAccount();
    WebsiteUtils.updatePageTitle("Dashboard");
  }
}
</script>

<style scoped></style>
