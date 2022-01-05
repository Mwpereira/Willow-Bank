<template>
  <b-notification
    id="notification"
    type="is-info"
    aria-close-label="Close notification"
  >
    <i class="fas fa-cookie mr-1"></i>
    Our site uses cookies to provide you the best service and experience. We
    store these cookies in your request/response headers and in your session
    storage, with advanced encryption to ensure the strongest security and
    protection. Information on cookies found
    <a
      href="https://www.kaspersky.com/resource-center/definitions/cookies"
      target="_blank"
      rel="noopener"
      >here</a
    >.
  </b-notification>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Cookies extends Vue {}
</script>
