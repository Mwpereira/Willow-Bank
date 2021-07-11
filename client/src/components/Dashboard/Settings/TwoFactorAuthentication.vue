<template>
  <div id="TwoFactorAuthentication" class="">
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form @submit.prevent="next({ email, password })">
        <b-field>
          <b-checkbox v-model="agree0" class="my-2" type="is-warning"
            >Enable Two Factor Authentication
          </b-checkbox>
        </b-field>
        <div class="columns is-vcentered">
          <div class="column">
            <b-button
              id="backButton"
              class="button is-white is-fullwidth has-text-weight-bold mt-5"
              v-on:click="back({ firstName, lastName, country })"
              >Cancel
            </b-button>
          </div>
          <div class="column">
            <button
              :disabled="invalid || country === ''"
              class="button is-warning is-fullwidth has-text-weight-bold mt-5"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TwoFactorAuthentication extends Vue {}
</script>

<style scoped></style>
