<template>
  <div id="Auth">
    <div class="columns section">
      <div class="column">

      </div>
      <div class="column" style="margin-top: 10%">
        <div v-if="this.page === 'Login'">
          <form class="has-text-left">
            <b-field label="Email"
                     type="is-danger"
                     message="This email is invalid">
              <b-input type="email" icon-pack="fas"
                       icon="envelope" placeolder="Email">
              </b-input>
            </b-field>
            <b-field label="Password">
              <b-input type="password"
                       icon-pack="fas"
                       icon="key  "
                       password-reveal>
              </b-input>
            </b-field>
            <b-button class="mt-5">Login</b-button>
          </form>
        </div>
        <div v-else>
          <form>
            <b-input></b-input>
            <b-input></b-input>
            <b-input></b-input>
            <b-input></b-input>
            <b-input></b-input>
            <b-input></b-input>
            <b-button>Register</b-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import PropertiesConstants from "@/constants/properties-constants";

@Component
export default class Auth extends Vue {
  public page = "Auth";

  mounted(): void {
    this.page = this.$router.currentRoute.path.substr(1) === "login" ? "Login" : "Register";
    document.title = this.page + PropertiesConstants.titleSuffix;
  }
}
</script>


<style scoped>
.b-field{
  max-width: 400px;
}
</style>