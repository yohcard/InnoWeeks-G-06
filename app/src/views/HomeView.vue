<script setup>
import { RouterLink, RouterView, useRoute  } from 'vue-router'
import homeView from '../components/homeComponents.vue'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'
import home from '../components/home.vue'

const route = useRoute()
</script>

<template >
    
  <div class="mainPage">
    <header>
      <TheHeader/>
    </header>
    <div class="main">
        <div >
        <RouterView/>
      </div>
    </div>
    <div class="TheFooter">
      <TheFooter/>
    </div>
  </div>
</template>

<style scoped>
header {
  width: 200%;
  height: 50px;
  padding: 2px;
  display: flex;
  margin: 1%;
  justify-content: left;
  background-color: #333; 
}

.main {
  width: 200%;
  height: auto;
  display: grid;
  
}

.TheFooter{
    width: 140%;
    text-align: center;
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
