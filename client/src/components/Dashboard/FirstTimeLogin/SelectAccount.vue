<template>
  <div id="SelectAccount">
    <div class="columns">
      <div class="column has-text-left has-text-weight-bold mt-5">
        <p class="is-size-5 my-5">Please confirm your account:</p>
        <div class="card mb-6">
          <div class="card-header p-6">
            <span>
              <i class="fas fa-coins"></i>
            </span>
            <p class="ml-3">Premium Savings Account</p>
          </div>
        </div>
      </div>
      <div class="column">
        <img src="../../../assets/img/FirstTimeLogin/piggy-bank.png" width="225" class="mt-5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class SelectAccount extends Vue {
  public selectedAccount() {

  }
}
</script>

<style scoped>
.card {
  width: auto !important;
}

@media only screen and (max-width: 768px) {
  .mb-6{
    margin-bottom: 12px !important;
  }
}
</style>
