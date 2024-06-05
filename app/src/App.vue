<script setup>
import { RouterLink, RouterView } from 'vue-router'
import homeView from './views/HomeView.vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="mainPage">
    <header>
      <TheHeader/>
    </header>
    <div class="main">
      <div>
        <homeView/>
      </div>
      <RouterView/>
    </div>
    <footer>
      <TheFooter/>
    </footer>
  </div>
</template>

<style scoped>
header {
  width: 200%;
  height: 50px;
  padding: 2px;
  display: flex;
  margin: 3%;
  justify-content: left;
  background-color: #333; 
}

.main {
  width: 200%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50%;
}

.divRouterView {
  padding: 0%;
  margin: 0%;
}

.mainPage {
  width: 100%;
  height: 80%;
}
</style>
