<template>
<div id="SavingsCalculator">
  <p class="is-size-2 has-text-centered has-text-weight-bold mb-6">Savings Calculator</p>
  <div class="columns section mt-0 mb-0 pt-0 pb-0">
    <div class="column">
      <p class="has-text-weight-bold is-size-4 mt-4 mb-5">
        Calculate How much You Can Earn With <span style="color: #75bd9f;">Willow Bank</span>
      </p>
      <div class="columns my-6">
        <div class="column">
          <div class="has-text-left">
            <b-field label="Enter Savings Account Balance ($)">
              <b-input placeholder="Balance"
                       type="number"
                       min="100"
                       max="100000"
                       id="balance">
              </b-input>
            </b-field>
          </div>
        </div>
        <div class="column">
          <div class="has-text-left mb-6">
            <b-field label="Time Period (#)">
              <b-input placeholder="Years"
                       type="number"
                       min="1"
                       max="25"
                       id="years">
              </b-input>
            </b-field>
          </div>
        </div>
      </div>
      <p class="is-size-4">After <b>5 years</b> your <b>$10,000</b> will turn into
        <b style="color: #75bd9f;">$13,500</b> <br/>which is a <b style="color: #75bd9f;">35%</b> increase!</p>
    </div>
    <div class="column">
      <img src="../../assets/img/calculator.png" width="375"/>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
class SavingsCalculator extends Vue {
//   public updateInputs(): void{
//     [inputAmount, outputAmount] = new AutoNumeric.multiple(
//         ['#balance', '#years'],
//         [
//           {
//             watchExternalChanges: true,
//             decimalPlaces: 6,
//           },
//           'floatPos',
//         ])
//   }
// }
}

export default SavingsCalculator
</script>

<style scoped>
.b-slider{
  max-width: 400px;
}
</style>