<template>
  <div id="Dashboard">
    <NavBar/>
    <Page :is="page"/>
  </div>
</template>

<script lang="ts">
import AddPayee from '@/components/Dashboard/Accounts/AddPayee.vue';
import RemovePayee from '@/components/Dashboard/Accounts/RemovePayee.vue';
import DashboardSummary from '@/components/Dashboard/DashboardSummary.vue';
import Info from '@/components/Dashboard/Info.vue';
import ManageContacts from '@/components/Dashboard/ManageContacts.vue';
import ManagePayees from '@/components/Dashboard/ManagePayees.vue';
import NavBar from '@/components/Dashboard/NavBar.vue';
import PayBills from '@/components/Dashboard/PayBills.vue';
import SendEtransfer from '@/components/Dashboard/SendEtransfer.vue';
import Settings from '@/components/Dashboard/Settings.vue';
import Summary from '@/components/Dashboard/Summary.vue';
import WebsiteUtils from '@/utils/website-utils';
import {Component, Vue} from 'vue-property-decorator';

@Component({
  components: {
    NavBar,
    DashboardSummary,
    Summary,
    PayBills,
    AddPayee,
    RemovePayee,
    ManagePayees,
    SendEtransfer,
    ManageContacts,
    Settings,
    Info,
  },
})
export default class Dashboard extends Vue {
  get page(): string {
    return this.$store.getters.page;
  }

  async created(): Promise<void> {
    if (!this.$store.getters.acceptedTermsAndConditions) {
      await WebsiteUtils.switchVue('firstTimeLogin');
    } else {
      await this.$store.dispatch('getPage', this.$router.currentRoute.path);
      this.$store.dispatch('getRefreshToken').then(async (validAccessToken) => {
        if (!validAccessToken) {
          await this.$store.dispatch('logout');
        } else {
          await this.$store.dispatch('getAccount');
          await this.$store.dispatch('getSettings');
        }
      });
    }
  }
}
</script>

<style>
.wb-section {
  max-width: 650px;
}
</style>
