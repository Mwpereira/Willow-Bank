<template>
  <div id="Register">
    <p class="title is-size-3 has-text-left pb-2">Sign up for <span id="bank">Willow Bank</span></p>
    <form class="has-text-left">
      <div v-if="step === 0">
        <b-field label="Email" class="mb-5">
          <b-input
              type="email"
              icon-pack="fas"
              icon="envelope"
              placeolder="Email"
              required
          >
          </b-input>
        </b-field>
        <b-field label="Password" class="mb-5">
          <b-input type="password" icon-pack="fas" icon="key" password-reveal required>
          </b-input>
        </b-field>
        <b-field label="Confirm Password" class="mb-5">
          <b-input type="password" icon-pack="fas" icon="key" password-reveal required>
          </b-input>
        </b-field>
      </div>
      <div v-if="step === 1">
        <b-field label="First Name" class="mb-5">
          <b-input v-model="name" required></b-input>
        </b-field>
        <b-field label="Last Name" class="mb-5">
          <b-input v-model="name" required></b-input>
        </b-field>
        <b-field class="pt-2 mb-5">
          <b-select placeholder="Country" icon-pack="fas" icon="globe-americas" required>
            <option value="1">Canada</option>
            <option value="2">United States</option>
          </b-select>
        </b-field>
      </div>
      <div v-if="step === 2">

      </div>
      <div class="columns is-vcentered">
        <div class="column">
          <div v-if="step === 0">
            <b-field class="mt-5"
            >Already a member?<a
                v-on:click="updatePage('login')"
                rel="noopener"
            >
              Log in</a
            ></b-field
            >
          </div>
          <div v-else>
            <b-button
                class="button is-white is-fullwidth has-text-weight-bold mt-5" v-on:click="back">Back
            </b-button
            >
          </div>
        </div>
        <div class="column">
          <b-button
              class="button is-warning is-fullwidth has-text-weight-bold mt-5" :label="step === 2 ? 'Sign up' : 'Next'"
              v-on:click="next" id="submit" type="submit"
          ></b-button
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Vue} from "vue-property-decorator";

@Component
export default class Register extends Vue {
  public page = "Register";
  public step = 0;

  @Emit()
  updatePage(page: string) {
    this.page = page;
  }

  public next(): void {
    if (this.step !== 2) {
      this.step++;
      if (this.step === 2) {
        // document.("submit").className += "is-primary";
        // document.getElementById("submit").className -= "is-warning";
      }
    } else {
      //Call API
    }
  }

  public back(): void {
    if (this.step === 2) {
      // document.getElementById("submit").className -= "is-primary";
    }
    this.step--;
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
