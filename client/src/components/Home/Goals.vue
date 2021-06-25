<template>
  <div id="Goals">
    <p class="is-size-2 has-text-centered has-text-weight-bold">Our Goals</p>
    <div class="columns is-multiline">
      <div class="column">
        <img class="m-6" src="../../assets/img/bitcoin.png" />
        <p class="is-size-3 has-text-weight-bold mb-3">Financial Flexibility</p>
        <p>Stay in control of <b>your money</b></p>
      </div>
      <div class="column">
        <img class="m-6" src="../../assets/img/server.png" />
        <p class="is-size-3 has-text-weight-bold mb-3">Latest Technology</p>
        <p>Provide state of the art technology <br />for the <b>fastest performance</b></p>
      </div>
      <div class="column">
        <img class="m-6" src="../../assets/img/cloud.png" />
        <p class="is-size-3 has-text-weight-bold mb-3">Advanced Security</p>
        <p>Keep your financials <b>safe</b> with <br/>
          <b>complex hashing</b> and <b>encryption</b></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Goals",
}
</script>

<style scoped>
img{
  width: 200px;
}
</style>