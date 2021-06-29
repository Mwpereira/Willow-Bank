<template>
  <div id="Register" class="has-text-left">
    <p class="title is-size-3 has-text-left pb-2">
      Sign up for <span id="bank">Willow Bank</span>
    </p>
    <div v-if="step === 0">
      <Step0
        :email="this.user.email"
        :password="this.user.password"
        @next="next($event)"
        @update-page="updatePage($event)"
      />
    </div>
    <div v-if="step === 1">
      <Step1
        :country="this.user.country"
        :firstName="this.user.firstName"
        :lastName="this.user.lastName"
        @back="back($event)"
        @next="next($event)"
      />
    </div>
    <div v-if="step === 2">
      <Step2
        :security-question-one="
          this.user.twoFactorAuthentication.securityQuestionOne
        "
        :security-question-two="
          this.user.twoFactorAuthentication.securityQuestionTwo
        "
        :security-answer-one="
          this.user.twoFactorAuthentication.securityAnswerOne
        "
        :security-answer-two="
          this.user.twoFactorAuthentication.securityAnswerTwo
        "
        @back="back($event)"
        @register="register($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import AuthService from "@/services/auth-service";
import Step0 from "@/components/Auth/Register/Step0.vue";
import Step1 from "@/components/Auth/Register/Step1.vue";
import Step2 from "@/components/Auth/Register/Step2.vue";
import { RegisterRequest } from "@/interfaces/register-request";
import BuefyService from "@/services/buefy-service";
import ResponseUtils from "@/utils/response-utils";

@Component({
  components: { Step2, Step1, Step0 },
})
export default class Register extends Vue {
  public user: RegisterRequest = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
    twoFactorAuthentication: {
      securityQuestionOne: "",
      securityAnswerOne: "",
      securityQuestionTwo: "",
      securityAnswerTwo: "",
    },
  };
  private page = "Register";
  private step = 0;

  @Emit()
  updatePage(page: string) {
    this.page = page;
  }

  public next(user: object): void {
    this.updateUser(user);
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

  public back(user: object): void {
    this.updateUser(user);
    if (this.step === 2) {
      // document.getElementById("submit").className -= "is-primary";
    }
    this.step--;
  }

  private updateUser(user: object) {
    for (const [key, value] of Object.entries(user)) {
      if (key === "securityQuestionOne" || key === "securityQuestionTwo") {
        this.user.twoFactorAuthentication[key] = value;
      } else {
        this.user[key] = value;
      }
    }
  }

  private async register(user: object): Promise<void> {
    BuefyService.startLoading();
    this.updateUser(user);
    if (ResponseUtils.successAuthProcessor(await AuthService.register(this.user))) {
      this.updatePage('login')
    }
    BuefyService.stopLoading();
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  button {
    margin-top: 0 !important;
  }

  #backButton {
    margin-top: 20px !important;
  }
}

@media only screen and (max-width: 425px) {
  #bank {
    display: block;
  }
}
</style>
