<template>
  <div class="container">
    <div class="logo">
      <img src="../assets/logo.png" alt="Logo" />
    </div>
    <nav class="navigation">
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/exercices">exercices</router-link></li>
        <li><router-link to="/video">video</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped>
.header {
  background-color: #333;
  color: #fff;
  width: 1000%;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo img {
  max-height: 50px;
}

.navigation ul {
  list-style: none;
  display: flex;
  gap: 4rem;
}

.navigation ul li {
  margin: 0;
}

.navigation ul li a {
  color: #fff;
  text-decoration: none;
  padding: 1rem 1rem;
  transition: background 0.3s;
}

.navigation ul li a:hover {
  background: #555;
  border-radius: 4px;
}
</style>
