<template>
  <div id="page-down" class="m-5">
            <svg id="page-down" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="7 13 12 18 17 13"></polyline>
              <polyline points="7 6 12 11 17 6"></polyline>
            </svg>
  </div>
</template>

<script>
export default {
  name: "PageDown"
}
</script>

<style scoped>
#page-down{
  transform: translatey(0px);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-7px);
  }
  100% {
    transform: translatey(0px);
  }
}
</style>