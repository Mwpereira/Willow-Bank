<template>
  <div id="app">
    <router-view />
    <div v-if="showNotification">
      <b-notification
        id="notification"
        type="is-info"
        aria-close-label="Close notification"
      >
        Our site uses cookies to provide you the best service and experience. We
        store these cookies with advanced encryption to ensure the strongest
        security and protection.
      </b-notification>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@/components/Common/Footer.vue";

@Component({
  components: {
    Footer,
  },
})
export default class App extends Vue {
  public showNotification = true;

  created() {
    if (localStorage.getItem("readCookiesNotfication") === "true") {
      this.showNotification = false;
    } else {
      localStorage.setItem("readCookiesNotfication", "true");
    }
  }
}
</script>

<style lang="scss">
#notification {
  position: fixed;
  width: 400px;
  right: 10px;
  bottom: 10px;
  text-align: left;
  opacity: 0.85;
  z-index: 100;
}

html,
body {
  scroll-behavior: smooth;
  scroll-padding: 8vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@media only screen and (max-width: 768px) {
  html {
    overflow-x: hidden !important;
  }
}
</style>
