<template>
  <section class="mt-6">
    <b-steps
        v-model="activeStep"
        :animated="isAnimated"
        :has-navigation="hasNavigation"
        :icon-next="nextIcon"
        :icon-prev="prevIcon"
        :label-position="labelPosition"
        :mobile-mode="mobileMode"
        :rounded="isRounded">
      <b-step-item :clickable="isStepsClickable" class="mt-5" label="Select Accounts" step="1">
        <h1 class="title has-text-centered">Select Accounts</h1>
        <p class="is-size-5">Please choose the accounts you would like to open (cannot be updated):</p>
      </b-step-item>

      <b-step-item :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}" class="mt-5"
                   label="Terms & Services" step="2">
        <h1 class="title has-text-centered">Terms & Services</h1>
        <p class="is-size-5">Lorem ipsum dolor sit amet.</p>
      </b-step-item>

      <b-step-item :clickable="isStepsClickable" :step="3" class="mt-5" disabled label="Complete">
        <h1 class="title has-text-centered">Complete</h1>
        <p class="is-size-5">Let's Start Saving and Earning</p>
        <button class="button is-primary is-size-6" v-on:click="dashboard()">Complete</button>
      </b-step-item>

      <template v-if="customNavigation"
                #navigation="{previous, next}">
        <b-button
            :disabled="previous.disabled"
            icon-left="backward"
            icon-pack="fas"
            outlined
            type="is-danger"
            @click.prevent="previous.action">
          Previous
        </b-button>
        <b-button
            :disabled="next.disabled"
            icon-pack="fas"
            icon-right="forward"
            outlined
            type="is-success"
            @click.prevent="next.action">
          Next
        </b-button>
      </template>
    </b-steps>
  </section>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import WebsiteUtils from "@/utils/website-utils";

@Component
export default class FirstTimeLogin extends Vue {
  public activeStep: 0;

  public showSocial: false;
  public isAnimated: true;
  public isRounded: true;
  public isStepsClickable: false;

  public hasNavigation: true;
  public customNavigation: false;
  public isProfileSuccess: false;

  public prevIcon: 'chevron-left';
  public nextIcon: 'chevron-right';
  public labelPosition: 'bottom';
  public mobileMode: 'minimalist';

  public dashboard(){
    WebsiteUtils.switchPage('dashboard')
  }

  mounted(): void {
    WebsiteUtils.updatePageTitle("Let's Get Started");
  }
}
</script>

<style>
.step-details{
  margin-top: 7px !important;
}
</style>
