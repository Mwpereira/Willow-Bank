<template>
  <div id="Login">
    <p class="title is-size-3 has-text-left pb-2">Log in to <span id="bank">Willow Bank</span></p>
    <form class="has-text-left">
      <b-field label="Email" class="mb-5">
        <b-input
            type="email"
            icon-pack="fas"
            icon="envelope"
            placeolder="Email"
        >
        </b-input>
      </b-field>
      <b-field label="Password" class="mb-5">
        <b-input type="password" icon-pack="fas" icon="key" password-reveal>
        </b-input>
      </b-field>
      <div class="columns is-vcentered">
        <div class="column">
          <b-field class="mt-5"
          >Ready to join?<a
              v-on:click="updatePage('register')"
              rel="noopener"
          >
            Sign up</a
          ></b-field
          >
        </div>
        <div class="column">
          <b-button
              class="button is-primary is-fullwidth has-text-weight-bold mt-5"
          >Login
          </b-button
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";

@Component
export default class Login extends Vue {
  public page = "Login";

  @Emit()
  updatePage(page: string) {
    this.page = page;
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
