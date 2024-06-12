<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="All">
    <TheHeader />
    <RouterView />
    <TheFooter />
  </div>
</template>
<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
}

h1 {
  font-size: 40px;
}

h2 {
  font-size: 26px;
}

#layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

.All {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.All > * {
  flex: 1;
}
</style>
