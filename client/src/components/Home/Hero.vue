<template>
  <div class="hero is-halfheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered is-centered">
          <div class="column">
            <img width="375px" src="../../assets/img/logo.png" />
            <p class="subtitle is-italic is-size-5 py-5 mb-5">
              Watch your money grow...
            </p>
            <PageDown class="pt-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import PageDown from "@/components/Home/PageDown.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    PageDown,
  },
})
export default class Hero extends Vue {}
</script>

<style scoped></style>
