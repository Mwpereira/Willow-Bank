<template>
  <form @submit.prevent="next({ firstName, lastName, country })">
    <b-field class="mb-5" label="First Name">
      <b-input v-model="firstName" required></b-input>
    </b-field>
    <b-field class="mb-5" label="Last Name">
      <b-input v-model="lastName" required></b-input>
    </b-field>
    <b-field class="mb-5" label="Country">
      <b-select
        v-model="country"
        icon="globe-americas"
        icon-pack="fas"
        placeholder="Country"
        required
      >
        <option value="Canada">Canada</option>
        <option value="United States">United States</option>
      </b-select>
    </b-field>
    <div class="columns is-vcentered">
      <div class="column mb">
        <b-button
          id="backButton"
          class="button is-white is-fullwidth has-text-weight-bold mt-5"
          v-on:click="back({ firstName, lastName, country })"
          >Back
        </b-button>
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
export default class Step1 extends Vue {
  @Prop() public firstName!: string;
  @Prop() public lastName!: string;
  @Prop() public country!: string;

  @Emit()
  next(user: object) {}

  @Emit()
  back(user: object) {}
}
</script>

<style scoped></style>
