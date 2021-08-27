<template>
  <div id="Auth">
    <p
      id="backButton"
      class="has-text-weight-bold has-text-left is-size-5 pt-5 pl-5"
      v-on:click="$router.push('/')"
    >
      <i class="fas fa-angle-left mr-1"></i>
      Back
    </p>
    <div class="columns is-centered section">
      <div class="column is-narrow">
        <div class="card p-6 mb-6">
          <div v-if="this.page === 'login'">
            <Login @login="user = $event" @update-page="page = $event" />
          </div>
          <div v-else>
            <Register @register="user = $event" @update-page="page = $event" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import PropertiesConstants from "@/constants/properties-constants";
import Login from "@/components/Auth/Login.vue";
import Register from "@/components/Auth/Register.vue";
import WebsiteUtils from "@/utils/website-utils";
import { Route } from "vue-router";

@Component({
  components: { Register, Login },
})
export default class Auth extends Vue {
  private page = "Auth";
  private user = null;

  async created(): Promise<void> {
    if (this.$store.getters.isLoggedIn) {
      await WebsiteUtils.switchVue("dashboard");
    } else {
      this.page =
        this.$router.currentRoute.path.substr(1) === "login"
          ? "login"
          : "register";
      await WebsiteUtils.updatePageTitle(this.page);
    }
  }

  @Watch("page")
  private async switchAuth(): Promise<void> {
    if (this.page !== this.$router.currentRoute.path.substr(1)) {
      await WebsiteUtils.switchVue(`${this.page}`);
      document.title =
        this.page.substr(0, 1).toUpperCase() +
        this.page.substr(1) +
        PropertiesConstants.titleSuffix;
    }
  }

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(newVal: Route) {
    this.page = this.$router.currentRoute.path.substr(1);
  }
}
</script>

<style scoped>
#backButton {
  cursor: pointer;
}

.card {
  width: 500px;
}

@media only screen and (max-width: 768px) {
  .section {
    padding: 50px 0px 50px 0px !important;
    margin: 0px 12px 12px 5px !important;
  }

  .columns {
    padding-right: 0px;
    padding-left: 0px;
  }

  .card {
    box-shadow: none;
    padding: 0 !important;
    margin: 0 !important;
    width: auto;
  }

  #backButton {
    padding: 20px 0 0 20px !important;
  }
}
</style>
