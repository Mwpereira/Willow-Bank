<template>
  <div id="Goals">
    <p class="is-size-2 has-text-centered has-text-weight-bold">Our Goals</p>
    <div class="columns is-multiline">
      <div class="column">
        <img
          class="ml-6 mr-6 mt-6 mb-5"
          src="../../assets/img/Home/bitcoin.png"
        />
        <p class="is-size-3 has-text-weight-bold mb-3">Financial Flexibility</p>
        <p>Have you stay in control of <br /><b>your money</b></p>
      </div>
      <div class="column">
        <img
          class="ml-6 mr-6 mt-6 mb-5"
          src="../../assets/img/Home/server.png"
        />
        <p class="is-size-3 has-text-weight-bold mb-3">Latest Technology</p>
        <p>
          Provide state of the art technology <br />for the
          <b>fastest performance</b>
        </p>
      </div>
      <div class="column">
        <img
          class="ml-6 mr-6 mt-6 mb-5"
          src="../../assets/img/Home/cloud.png"
        />
        <p class="is-size-3 has-text-weight-bold mb-3">Advanced Security</p>
        <p>
          Keep your financials <b>safe</b> with <br />
          <b>complex hashing</b> and <b>encryption</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class Goals extends Vue {}
</script>

<style scoped>
img {
  width: 200px;
}
</style>
