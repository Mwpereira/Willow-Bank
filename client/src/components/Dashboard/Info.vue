<template>
  <div id="Info" class="container">
    <div class="section has-text-left">
      <p class="title mb-6">Information</p>
      <p class="my-3">Version: <b>v1.0.0</b></p>
      <p class="my-3">Front end: <b>Buefy/Bulma + Vue.js + TS</b></p>
      <p class="my-3">Back end: <b>AWS Serverless + TS</b></p>
      <p class="my-3">Created By: <b>Michael Pereira</b></p>
      <a href="https://ko-fi.com/michaelpereira" target="_blank">
        <b-button class="is-warning has-text-weight-bold mt-5 my-2">
          <span class="mr-3">
            <i class="fas fa-coffee"></i>
          </span>
          Buy me a coffee
        </b-button>
      </a>
      <br />
      <a href="https://github.com/mwpereira/" target="_blank">
        <b-button class="is-github has-text-weight-bold my-2 has-text-white">
          <span class="mr-3">
            <i class="fab fa-github"></i>
          </span>
          Github
        </b-button>
      </a>
      <br />
      <a href="https://www.linkedin.com/in/michael-pereira-07/" target="_blank">
        <b-button class="is-linkedin has-text-weight-bold my-2 has-text-white">
          <span class="mr-3">
            <i class="fab fa-linkedin-in"></i>
          </span>
          LinkedIn
        </b-button>
      </a>
      <p class="my-6 is-italic">Found a bug? <a>Post Here</a></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Info extends Vue {}
</script>

<style scoped></style>
