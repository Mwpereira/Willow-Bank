<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
    <form @submit.prevent="next({ email, password })">
      <b-field class="mb-5" label="Email">
        <BInputWithValidation
          v-model="email"
          icon="envelope"
          icon-pack="fas"
          placeolder="Email"
          rules="required|email"
          type="username"
        >
        </BInputWithValidation>
      </b-field>
      <b-field class="mb-5" label="Password">
        <BInputWithValidation
          v-model="password"
          icon="key"
          icon-pack="fas"
          password-reveal
          rules="required|min_password:7|max_account_characters:64"
          type="password"
        >
        </BInputWithValidation>
      </b-field>
      <div class="columns is-vcentered">
        <div class="column mb">
          <b-field class="mt-5"
            >Already a member?<a
              rel="noopener"
              v-on:click="updatePage('login')"
            >
              Log in</a
            ></b-field
          >
        </div>
        <div class="column">
          <button
            class="button is-warning is-fullwidth has-text-weight-bold mt-5"
            :disabled="invalid"
            type="submit"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import { Emit, Prop, Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import { ValidationObserver } from "vee-validate";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class Step0 extends Vue {
  @Prop() public email!: string;
  @Prop() public password!: string;
  private page = "Step0";

  @Emit()
  updatePage(page: string) {
    this.page = page;
  }

  @Emit()
  next(user: string) {}
}
</script>

<style scoped></style>
