<template>
  <div id="contact-us">
    <p class="is-size-2 has-text-centered has-text-weight-bold mb-2">Contact Us</p>
    <div class="columns is-vcentered">
      <div class="column">
        <p class="has-text-weight-bold is-size-4 my-5">Connect With Us</p>
        <p class="py-4">
          <i class="far fa-envelope"></i
          ><span class="ml-3">support@willowbankfinancial.com</span>
        </p>
        <p class="py-4">
          <i class="fas fa-phone-alt"></i
          ><span class="ml-3">(123) 456-7890</span>
        </p>
        <p class="py-4 is-italic is-size-5">
          24/7 Support Ready to Assistance Anytime!
        </p>
      </div>
      <div class="column">
        <img
            alt="Contact Us"
            src="../../assets/img/Home/contact.png"
            webp-fallback=".png"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class ContactUs extends Vue {}
</script>
