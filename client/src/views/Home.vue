<template>
  <div id="Home">
    <NavBar />
    <div id="section-hero" class="section">
      <Hero />
    </div>
    <div id="section-benefits" class="section">
      <div class="container">
        <Benefits />
      </div>
    </div>
    <PageDown class="my-6 pb-5" />
    <div id="section-savingscalculator" class="section">
      <div class="container">
        <SavingsCalculator />
      </div>
    </div>
    <PageDown class="my-6" />
    <div id="section-goals" class="section">
      <div class="container">
        <Goals />
      </div>
    </div>
    <div class="control has-text-centered mt-5 mb-6 pb-6">
      <a class="button is-primary is-medium" href="/register" rel="noopener">
        Let's Start Saving
      </a>
    </div>
    <div id="section-contact" class="section my-6">
      <div class="container">
        <Contact />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/Home/NavBar.vue";
import Benefits from "@/components/Home/Benefits.vue";
import Contact from "@/components/Home/ContactUs.vue";
import Goals from "@/components/Home/Goals.vue";
import Hero from "@/components/Home/Hero.vue";
import PageDown from "@/components/Home/PageDown.vue";
import SavingsCalculator from "@/components/Home/SavingsCalculator.vue";

@Component({
  components: {
    SavingsCalculator,
    PageDown,
    Benefits,
    Contact,
    Goals,
    Hero,
    NavBar,
  },
})
export default class Home extends Vue {
  mounted(): void {
    document.title = "Willow Bank";
  }
}
</script>

<style scoped></style>
