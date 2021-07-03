<template>
  <p>Dashboard</p>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import WebsiteUtils from "@/utils/website-utils";

@Component
export default class Dashboard extends Vue {
  mounted(): void {
    if(!this.$store.getters.isLoggedIn){
      WebsiteUtils.switchPage('login');
    }
    if(this.$store.getters.isLoggedIn && !this.$store.getters.acceptedTermsAndConditions){
      WebsiteUtils.switchPage('firstTimeLogin');
    }
    WebsiteUtils.updatePageTitle("Dashboard");
  }
}
</script>

<style scoped></style>
