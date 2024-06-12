<script setup>
import homeComponents from '../components/homeComponents.vue'
import homePage from '../components/homePage.vue'
import Tutoservices from '@/services/Tutoservices'
import { ref, onMounted } from 'vue'
const token = ref(null)

onMounted(() => {
  Tutoservices.loginPublic()
    .then((response) => {
      token.value = response.data.data
      localStorage.setItem('jwt', response.data.data)
    })
    .catch((error) => {
      console.log(error.message)
    })
})
</script>

<template>
  <div class="mainPage">
    <homeComponents />
    <homePage />
  </div>
</template>

<style scoped>
.mainPage {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  width: 100%;
  margin: auto;
}
</style>
