<template>
  <div id="Login" class="has-text-left">
    <p class="title is-size-3 pb-2">
      Log in to <span id="bank">Willow Bank</span>
    </p>
    <ValidationObserver rel="observer">
      <form @submit.prevent="login()">
        <b-field class="mb-5" label="Email">
          <b-input
              v-model="user.email"
              icon="envelope"
              icon-pack="fas"
              placeolder="Email"
              required
              type="email"
          />
        </b-field>
        <b-field class="mb-5" label="Password">
          <b-input
              v-model="user.password"
              icon="key"
              icon-pack="fas"
              password-reveal
              required
              type="password"
          >
          </b-input>
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
import {Component, Emit, Prop, Vue} from "vue-property-decorator";
import AuthService from "@/services/auth-service";
import BuefyService from "@/services/buefy-service";
import ResponseUtils from "@/utils/response-utils";

@Component
export default class Login extends Vue {
  @Prop() private page = "Login";
  @Prop() private user = {
    email: "",
    password: "",
  };

  @Emit()
  updatePage(page: string): void {
    this.page = page;
  }

  private async login(): Promise<void> {
    BuefyService.startLoading();
    if (ResponseUtils.successAuthProcessor(await AuthService.login(this.user))) {
      console.log("Test");
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
