<template>
  <form @submit.prevent="next({ email, password })">
    <b-field class="mb-5" label="Email">
      <b-input
        v-model="email"
        icon="envelope"
        icon-pack="fas"
        placeolder="Email"
        required
        type="email"
      >
      </b-input>
    </b-field>
    <b-field class="mb-5" label="Password">
      <b-input
        v-model="password"
        icon="key"
        icon-pack="fas"
        password-reveal
        required
        type="password"
      >
      </b-input>
    </b-field>
    <div class="columns is-vcentered">
      <div class="column mb">
        <b-field class="mt-5"
          >Already a member?<a rel="noopener" v-on:click="updatePage('login')">
            Log in</a
          ></b-field
        >
      </div>
      <div class="column">
        <button
          class="button is-warning is-fullwidth has-text-weight-bold mt-5"
          type="submit"
        >
          Next
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Emit, Prop, Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
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
