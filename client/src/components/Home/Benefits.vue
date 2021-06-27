<template>
  <div id="Benefits">
    <p class="is-size-2 has-text-centered has-text-weight-bold">Our Benefits</p>
    <div class="columns">
      <div class="column">
        <img class="m-6" src="../../assets/img/anonymous.png" />
        <p class="is-size-3 has-text-weight-bold mb-3">Financial Privacy</p>
        <p>Freedom of <b>crypto</b> and <b>stock trading</b></p>
      </div>
      <div class="column">
        <img class="m-6" src="../../assets/img/profits.png" />
        <p class="is-size-3 has-text-weight-bold mb-3">High Interest</p>
        <p>Savings account <b>interest rate of 7%</b></p>
      </div>
      <div class="column">
        <img class="m-6" src="../../assets/img/technical-support.png" />
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
export default class Benefits extends Vue {}
</script>

<style scoped>
img{
  width: 200px;
}
</style>