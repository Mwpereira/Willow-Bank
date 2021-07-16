<template>
  <div id="Footer" class="footer">
    <div class="container has-text-weight-bold is-size-7">
      <p>2021 © Willow Bank. All rights reserved.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class Footer extends Vue {}
</script>

<style scoped>
#Footer {
  background: white;
  clear: both;
  position: relative;
  height: 50px;
  bottom: 0px;
  right: 0px;
  left: 0px;
}
</style>
