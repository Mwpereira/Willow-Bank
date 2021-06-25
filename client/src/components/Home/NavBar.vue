<template>
  <b-navbar>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Home
      </b-navbar-item>
      <b-navbar-dropdown label="Benefits">
        <b-navbar-item href="#Benefits">
          Info
        </b-navbar-item>
        <b-navbar-item href="#SavingsCalculator">
          Savings Calculator
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item href="#Goals">
        Goals
      </b-navbar-item>
      <b-navbar-item href="#Contact">
        Contact Us
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
name: "NavBar"
}
</script>

<style scoped>
.navbar-item{
  font-weight: bold;
}
</style>