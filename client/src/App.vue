<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<style lang="scss">
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
</style>
<script>
import Footer from "@/components/Footer";
export default {
  components: { Footer },
};
</script>
