<template>
  <div id="Summary" class="container">
    <div class="section has-text-left">
      <p class="title">Dashboard</p>
      <div class="card p-6 mb-5">
        <div class="columns">
          <div class="column">
            <p class="is-size-1 has-text-primary">$10,000</p>
            <p class="has-text-weight-bold">Premium Savings Account Balance</p>
          </div>
          <div class="column">
            <p class="is-size-1">0</p>
            <p class="has-text-weight-bold">Number of Transactions</p>
          </div>
        </div>
      </div>

      <div class="card p-6 mb-5">
        <div class="columns">
          <div class="column">
            <p class="is-size-1">Yesterday</p>
            <p class="has-text-weight-bold">Last Login</p>
          </div>
          <div class="column">
            <p class="is-size-1">0</p>
            <p class="has-text-weight-bold">Notifications</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Summary extends Vue {}
</script>

<style scoped></style>
