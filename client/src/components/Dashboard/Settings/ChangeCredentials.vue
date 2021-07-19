<template>
  <div id="ChangePassword" class="">
    <p class="mb-4"><b>Current Email:</b> {{ email }}</p>
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form @submit.prevent="updateEmail(newEmail)">
        <b-field label="Email">
          <BInputWithValidation
            v-model="newEmail"
            icon="envelope"
            icon-pack="fas"
            placeolder="Email"
            rules="required|email"
            type="email"
          >
          </BInputWithValidation>
        </b-field>
        <div class="columns is-vcentered">
          <div class="column"></div>
          <div class="column">
            <button
              :disabled="invalid"
              class="button is-warning is-fullwidth has-text-weight-bold mt-5"
              type="submit"
            >
              Update Email
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form
        class="mt-6"
        @submit.prevent="changePassword(currentPassword, newPassword)"
      >
        <b-field label="Current Password">
          <BInputWithValidation
            v-model="currentPassword"
            icon="key"
            icon-pack="fas"
            password-reveal
            rules="required|min_password:7|max_account_characters:64"
            type="password"
          >
          </BInputWithValidation>
        </b-field>
        <b-field label="New Password">
          <BInputWithValidation
            v-model="newPassword"
            icon="key"
            icon-pack="fas"
            password-reveal
            rules="required|min_password:7|max_account_characters:64"
            type="password"
          >
          </BInputWithValidation>
        </b-field>
        <div class="columns is-vcentered">
          <div class="column"></div>
          <div class="column">
            <button
              :disabled="invalid"
              class="button is-warning is-fullwidth has-text-weight-bold mt-5"
              type="submit"
            >
              Change Password
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script lang="ts">
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import BuefyService from "@/services/buefy-service";
import { ValidationObserver } from "vee-validate";
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class ChangeCredentials extends Vue {
  public newEmail!: string;
  public currentPassword!: string;
  public newPassword!: string;

  get email(): string {
    return this.$store.getters.email;
  }

  public async updateEmail(newEmail: string): Promise<void> {
    BuefyService.startLoading();

    if (await this.$store.dispatch("updateEmail", newEmail)) {
      this.newEmail = "";
    }

    BuefyService.stopLoading();
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    BuefyService.startLoading();

    if (
      await this.$store.dispatch("changePassword", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
    ) {
      this.currentPassword = "";
      this.newPassword = "";
    }

    BuefyService.stopLoading();
  }
}
</script>

<style scoped></style>
