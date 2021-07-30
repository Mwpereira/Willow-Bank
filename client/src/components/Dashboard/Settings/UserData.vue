<template>
  <div id="UserData" class="">
    <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
      <form @submit.prevent="save({ firstName, lastName, country })">
        <b-field class="mb-5" label="First Name"
          ><p class="mt-2">{{ settings ? settings.firstName : "" }}</p></b-field
        >
        <b-field class="mb-5" label="Last Name"
          ><p class="mt-2">{{ settings ? settings.lastName : "" }}</p></b-field
        >
        <b-field class="mb-5" label="Country">
          <b-select
            v-model="country"
            class="dropdown-box mt-2"
            icon="globe-americas"
            icon-pack="fas"
            placeholder="Country"
            rules="required"
          >
            <option value="Canada">Canada</option>
            <option value="United States">United States</option>
          </b-select>
        </b-field>
        <div class="columns is-vcentered">
          <div class="column"></div>
          <div class="column">
            <button
              :disabled="country === settings.country"
              class="button is-warning is-fullwidth has-text-weight-bold mt-5"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import BInputWithValidation from "@/components/Common/Inputs/BInputWithValidation.vue";
import { ValidationObserver } from "vee-validate";
import { Settings } from "@/interfaces/settings";
import BuefyService from "@/services/buefy-service";

@Component({
  components: {
    BInputWithValidation,
    ValidationObserver,
  },
})
export default class UserData extends Vue {
  private country = "Canada";

  get settings(): Settings {
    return this.$store.getters.settings;
  }

  public async save(settings: Settings): Promise<void> {
    BuefyService.startLoading();

    await this.$store.dispatch("saveSettings", settings);

    BuefyService.stopLoading();
  }

  created(): void {
    this.country = this.settings.country;
  }
}
</script>

<style scoped></style>
