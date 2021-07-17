<template>
  <div id="benefits">
    <p class="is-size-2 has-text-centered has-text-weight-bold mb-2">Our Benefits</p>
    <div class="columns">
      <div class="column">
        <img
            alt="Financial Privacy"
            class="ml-6 mr-6 mt-6 mb-5"
            src="../../assets/img/Home/anonymous.webp"
            webp-fallback=".png"
        />
        <p class="is-size-3 has-text-weight-bold mb-3">Financial Privacy</p>
        <p>Freedom of <b>crypto</b> and <b>stock trading</b></p>
      </div>
      <div class="column">
        <img
            alt="High Interest"
            class="ml-6 mr-6 mt-6 mb-5"
            src="../../assets/img/Home/profits.webp"
            webp-fallback=".png"
        />
        <p class="is-size-3 has-text-weight-bold mb-3">High Interest</p>
        <p>Savings account <b>interest rate of 7%</b></p>
      </div>
      <div class="column">
        <img
            alt="Customer Support"
            class="ml-6 mr-6 mt-6 mb-5"
            src="../../assets/img/Home/technical-support.webp"
            webp-fallback=".png"
        />
        <p class="is-size-3 has-text-weight-bold mb-3">Customer Support</p>
        <p><b>24/7</b> customer support</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class Benefits extends Vue {
}
</script>

<style scoped>
img {
  width: 200px;
}
</style>
