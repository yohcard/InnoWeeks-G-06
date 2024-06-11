<template>
  <div id="app">
    <transition name="fade">
      <div v-if="isLoginFormVisible" id="loginForm">
        <h2>Connexion</h2>
        <form @submit.prevent="login">
          <label for="username">Nom d'utilisateur :</label>
          <input v-model="username" type="text" id="username" name="username" /><br /><br />
          <label for="password">Mot de passe :</label>
          <input v-model="password" type="password" id="password" name="password" /><br /><br />
          <button type="submit">Se connecter</button>
        </form>
      </div>
      <div v-else><button @click="toggleLoginForm">Commencer</button></div>
    </transition>
  </div>
</template>

<style scoped>
#loginForm {
  margin-top: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-Router'

const isLoginFormVisible = ref(false)
const username = ref('')
const password = ref('')
const router = useRouter()

const toggleLoginForm = () => {
  alert(
    "Le premier exercice consiste à se connecter à une page de login.\nVoici les données à insérer:\nNom d'utilisateur : utilisateur1\nMot de passe : password1"
  )
  isLoginFormVisible.value = !isLoginFormVisible.value
  console.log('isLoginFormVisible:', isLoginFormVisible.value)
}

const login = () => {
  const expectedUsername = 'utilisateur1'
  const expectedPassword = 'password1'

  if (username.value === expectedUsername && password.value === expectedPassword) {
    alert('Connexion réussie !')
    router.value.push('/exercices2')
  } else {
    if (password.value !== expectedPassword) {
      if (password.value.toLowerCase() === expectedPassword.toLowerCase()) {
        alert(
          "Nom d'utilisateur ou mot de passe incorrect.\n\nJe vais vous aider à vous connecter.\n\nConseil :\n\nil y a une erreur de majuscule dans le mot de passe."
        )
      } else {
        alert(
          "Nom d'utilisateur ou mot de passe incorrect.\n\nJe vais vous aider à vous connecter.\n\nConseil :\n\nil y a une erreur dans le mot de passe."
        )
      }
    } else if (username.value !== expectedUsername) {
      if (username.value.toLowerCase() === expectedUsername.toLowerCase()) {
        alert(
          "Nom d'utilisateur ou mot de passe incorrect.\n\nJe vais vous aider à vous connecter.\n\nConseil :\n\nil y a une erreur de majuscule dans le nom d'utilisateur."
        )
      } else {
        alert(
          "Nom d'utilisateur ou mot de passe incorrect.\n\nJe vais vous aider à vous connecter.\n\nConseil :\n\nil y a une erreur dans le nom d'utilisateur."
        )
      }
    }
  }
}
</script>
