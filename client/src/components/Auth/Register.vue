<template>
  <div id="Register">
    <p class="title is-size-3 has-text-left pb-2">Sign up for <span id="bank">Willow Bank</span></p>
    <form class="has-text-left" @submit.prevent="register">
      <div v-if="step === 0">
        <b-field label="Email" class="mb-5">
          <b-input
              type="email"
              icon-pack="fas"
              icon="envelope"
              placeolder="Email"
              v-model="user.email"
              required
          >
          </b-input>
        </b-field>
        <b-field label="Password" class="mb-5">
          <b-input type="password" icon-pack="fas" icon="key" v-model="user.password" password-reveal required>
          </b-input>
        </b-field>
      </div>
      <div v-if="step === 1">
        <b-field label="First Name" class="mb-5">
          <b-input v-model="user.firstName" required></b-input>
        </b-field>
        <b-field label="Last Name" class="mb-5">
          <b-input v-model="user.lastName" required></b-input>
        </b-field>
        <b-field class="pt-2 mb-5">
          <b-select placeholder="Country" icon-pack="fas" icon="globe-americas" v-model="user.country" required>
            <option value="Canada">Canada</option>
            <option value="United States">United States</option>
          </b-select>
        </b-field>
      </div>
      <div v-if="step === 2">
        <b-field class="pt-2 mb-5">
          <b-select placeholder="Security Question 1" icon-pack="fas" icon="star" v-model="user.twoFactorAuthentication.securityQuestionOne" required>
            <option value="1">Favourite Artist?</option>
            <option value="2">Favourite Movie?</option>
            <option value="3">Favourite Show?</option>
            <option value="4">Favourite Dish?</option>
            <option value="5">Favourite Dessert?</option>
          </b-select>
        </b-field>
        <b-field class="pt-2 mb-5">
          <b-select placeholder="Security Question 2" icon-pack="fas" icon="user" v-model="user.twoFactorAuthentication.securityQuestionTwo" required>
            <option value="1">Childhood Best Friend's Name?</option>
            <option value="2">Mother's Maiden Name?</option>
            <option value="3">Father's Middle Name?</option>
            <option value="4">First Pet's Name?</option>
            <option value="5">First Partner's Name?</option>
          </b-select>
        </b-field>
      </div>
      <div class="columns is-vcentered">
        <div class="column mb">
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
                class="button is-white is-fullwidth has-text-weight-bold mt-5" v-on:click="back" id="backButton">Back
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
  public user = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    country: null,
    twoFactorAuthentication: {
      securityQuestionOne: null,
      securityAnswerOne: null,
      securityQuestionTwo: null,
      securityAnswerTwo: null
    }
  }

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
@media only screen and (max-width: 768px) {
  button {
    margin-top: 0 !important;
  }

  #backButton{
    margin-top: 20px !important;
  }
}

@media only screen and (max-width: 425px) {
  #bank {
    display: block;
  }
}
</style>
