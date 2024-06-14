<template>
  <header>
    <div class="container">
      <div class="logo">
        <img src="../assets/logo.svg" alt="Logo" />
        <h1>FlashTuto</h1>
      </div>
      <nav v-if="isAuthenticated">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink>
        <RouterLink :to="{ name: 'exercices' }">Exercices</RouterLink>
        <RouterLink :to="{ name: 'video' }">Video</RouterLink>
        <RouterLink :to="{ name: 'contact' }">Contact</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onUpdated } from 'vue'
import { isAuthenticated } from '../auth.js'

onUpdated(() => {})
</script>

<style scoped>
header {
  width: 100%;
  background-color: lightgrey;
  max-height: 70px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 1rem;
  color: #fff;
}

.logo img {
  max-height: 75px;
}

.logo {
  display: flex;
}
nav {
  font-size: 150%;
  display: flex;
  gap: 15px;
}

nav a {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: rgb(0, 86, 126);
  text-decoration: none;
  padding: 5px 10px;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

nav a.router-link-exact-active {
  color: #070068;
}

nav a:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #0084b8;
  border-radius: 4px;
}
</style>
