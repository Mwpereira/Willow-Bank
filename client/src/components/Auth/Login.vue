<template>
  <div id="Login" class="has-text-left">
    <p class="title is-size-3 pb-2">
      Log in to <span id="bank">Willow Bank</span>
    </p>
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form @submit.prevent="login()">
        <b-field class="mb-5" label="Email">
          <BInputWithValidation
            v-model="user.email"
            icon="envelope"
            icon-pack="fas"
            placeolder="Email"
            rules="required|email"
            type="email"
          />
        </b-field>
        <b-field class="mb-5" label="Password">
          <BInputWithValidation
            v-model="user.password"
            icon="key"
            icon-pack="fas"
            password-reveal
            rules="required"
            type="password"
          >
          </BInputWithValidation>
        </b-field>
        <div class="columns is-vcentered">
          <div class="column">
            <b-field class="mt-5"
              >Ready to join?<a
                rel="noopener"
                v-on:click="updatePage('register')"
              >
                Sign up</a
              ></b-field
            >
          </div>
          <div class="column">
            <button
              :disabled="invalid"
              class="button is-primary is-fullwidth has-text-weight-bold mt-5"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import AuthService from "@/services/auth-service";
import BuefyService from "@/services/buefy-service";
import ResponseUtils from "@/utils/response-utils";
import { ValidationObserver } from "vee-validate";
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import WebsiteUtils from "@/utils/website-utils";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class Login extends Vue {
  private page = "Login";
  private user = {
    email: null,
    password: null,
  };

  @Emit()
  updatePage(page: string): void {
    this.page = page;
  }

  private async login(): Promise<void> {
    BuefyService.startLoading();
    const response = await AuthService.login(this.user);
    if (ResponseUtils.successAuthProcessor(response)) {
      const data = response.data;
      
      this.$store.commit(
        "setAcceptedTermsAndConditions",
        data.acceptedTermsAndConditions
      );
      this.$store.commit("setEmail", data.email);
      this.$store.commit("setLastLogin", data.lastLogin);

      if (data.acceptedTermsAndConditions) {
        WebsiteUtils.switchVue("dashboard");
      } else {
        WebsiteUtils.switchVue("firstTimeLogin");
      }
    }
    BuefyService.stopLoading();
  }
}
</script>

<style scoped>
@media only screen and (max-width: 425px) {
  #bank {
    display: block;
  }
}
</style>
