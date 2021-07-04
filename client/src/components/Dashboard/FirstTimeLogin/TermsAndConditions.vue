<template>
  <div id="TermsAndConditions">
    <div class="columns">
      <div class="column has-text-left has-text-weight-bold mt-5 mb-5 pb-5">
        <p class="is-size-5 my-5">Please read and agree to the following:</p>
        <b-field>
          <b-checkbox
            v-model="agree0"
            class="my-2"
            type="is-warning"
            v-on:click="allowNext()"
            >I Allow My Data To Be Encrypted, Hashed & Stored
          </b-checkbox>
        </b-field>
        <b-field>
          <b-checkbox
            v-model="agree1"
            class="my-2"
            type="is-warning"
            v-on:click="allowNext()"
            >I Agree To Pay Taxes On Any Savings Account Earnings
          </b-checkbox>
        </b-field>
        <b-field>
          <b-checkbox
            v-model="agree2"
            class="my-2"
            type="is-warning"
            v-on:click="allowNext()"
            >I Acknowledge All Of This Is Fake :)
          </b-checkbox>
        </b-field>
      </div>
      <div class="column">
        <img
          src="../../../assets/img/FirstTimeLogin/contract.png"
          width="225"
          class="mt-5"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class TermsAndConditions extends Vue {
  @Prop() public agree0 = false;
  @Prop() public agree1 = false;
  @Prop() public agree2 = false;

  @Emit() updateAgrees(agrees: object): void {}

  @Watch("agree0")
  @Watch("agree1")
  @Watch("agree2")
  public allowNext(): void {
    this.updateAgrees({
      agree0: this.agree0,
      agree1: this.agree1,
      agree2: this.agree2,
    });
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .mb-6 {
    margin-bottom: 12px !important;
  }
}
</style>
