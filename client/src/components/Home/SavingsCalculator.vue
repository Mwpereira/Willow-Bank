<template>
  <div id="SavingsCalculator">
    <p class="is-size-2 has-text-centered has-text-weight-bold mb-6">Savings Calculator</p>
    <div class="columns section mt-0 mb-0 pt-0 pb-0">
      <div class="column">
        <p class="has-text-weight-bold is-size-4 mt-4 mb-5">
          Calculate How much You Can Earn With <span style="color: #75bd9f;">Willow Bank</span>
        </p>
        <div class="my-6">
          <div class="has-text-left mb-6">
            <b-field label="Enter Savings Account Balance ($)">
              <b-slider v-model="balance" indicator :tooltip="false" :min="100" :max="100000" :format="format"
                        :locale="locale"></b-slider>
            </b-field>
          </div>
          <div class="has-text-left mb-6">
            <b-field label="Time Period (number of years)">
              <b-slider v-model="years" indicator :tooltip="false" :min="1" :max="25" :format="format"
                        :locale="locale"></b-slider>
            </b-field>
          </div>
        </div>
        <p class="is-size-4 my-5">After <b>{{ years }} years</b> your <b>${{ oldBalance }}</b> will turn into
          <b style="color: #75bd9f;">${{ newBalance }}</b> <br/>which is a <b
              style="color: #75bd9f;">{{ percentIncrease }}%</b> increase!</p>
      </div>
      <div class="column">
        <img src="../../assets/img/calculator.png" width="400"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

@Component
export default class SavingsCalculator extends Vue {
  public balance = 50000;
  public years = 5;
  public oldBalance = "1000";
  public newBalance = "1000";
  public percentIncrease = "0";

  @Watch('years')
  @Watch('balance')
  public balanceChanged(): void {
    this.oldBalance = this.balance.toLocaleString();
    const amount = this.balance * (Math.pow((1 + (0.07 / 12)), (12 * this.years)));
    const interest = amount - this.balance;
    this.newBalance = (this.balance + parseFloat(interest.toFixed(2))).toFixed(2);
    this.percentIncrease = (parseFloat(this.newBalance) / this.balance * 100 - 100).toFixed(2);
    this.newBalance = parseFloat((this.balance + parseFloat(interest.toFixed(2))).toFixed(2)).toLocaleString();
  }

  mounted() {
    this.balanceChanged();
  }
}
</script>

<style scoped>
.b-slider {
  max-width: 400px;
}

.b-field label {
  font-size: 24px;
}
</style>