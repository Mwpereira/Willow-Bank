<template>
  <form
    @submit.prevent="
      register({
        twoFactorAuthentication: {
          securityQuestionOne,
          securityAnswerOne,
          securityQuestionTwo,
          securityAnswerTwo,
        },
      })
    "
  >
    <b-field class="mb-5" label="Security Question 1:">
      <b-select
        v-model="securityQuestionOne"
        icon="star"
        icon-pack="fas"
        placeholder="Security Question 1"
        required
      >
        <option value="Favourite Artist?">Favourite Artist?</option>
        <option value="Favourite Movie?">Favourite Movie?</option>
        <option value="Favourite Show?">Favourite Show?</option>
        <option value="Favourite Dish?">Favourite Dish?</option>
        <option value="Favourite Dessert?">Favourite Dessert?</option>
      </b-select>
    </b-field>
    <b-input
      v-model="securityAnswerOne"
      class="mb-5"
      icon="key"
      icon-pack="fas"
      password-reveal
      required
      type="password"
    ></b-input>
    <b-field class="mb-5" label="Security Question 2:">
      <b-select
        v-model="securityQuestionTwo"
        icon="user"
        icon-pack="fas"
        placeholder="Security Question 2"
        required
      >
        <option value="Childhood Best Friend's Name?">
          Childhood Best Friend's Name?
        </option>
        <option value="Mother's Maiden Name?">Mother's Maiden Name?</option>
        <option value="Father's Middle Name?">Father's Middle Name?</option>
        <option value="First Pet's Name?">First Pet's Name?</option>
        <option value="First Partner's Name?">First Partner's Name?</option>
      </b-select>
    </b-field>
    <b-input
      class="mb-5"
      v-model="securityAnswerTwo"
      icon="key"
      icon-pack="fas"
      password-reveal
      required
      type="password"
    ></b-input>
    <div class="columns is-vcentered">
      <div class="column">
        <b-button
          id="backButton"
          class="button is-white is-fullwidth has-text-weight-bold mt-5"
          v-on:click="
            back({
              twoFactorAuthentication: {
                securityQuestionOne,
                securityAnswerOne,
                securityQuestionTwo,
                securityAnswerTwo,
              },
            })
          "
          >Back
        </b-button>
      </div>
      <div class="column">
        <button
          class="button is-warning is-fullwidth has-text-weight-bold mt-5"
          type="submit"
        >
          Sign up
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Emit, Prop, Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class Step2 extends Vue {
  @Prop() public securityQuestionOne!: string;
  @Prop() public securityAnswerOne!: string;
  @Prop() public securityQuestionTwo!: string;
  @Prop() public securityAnswerTwo!: string;

  @Emit()
  register(user: object) {}

  @Emit()
  back(user: object) {}
}
</script>
