<template>
  <div id="app">
    <transition name="fade">
      <div v-if="isLoginFormVisible" id="loginForm">
        <h2>Exercice de connexion</h2>
        <form @submit.prevent="login">
          <label for="userfirstname">Prénom de l'utilisateur :</label>
          <input
            v-model="userfirstname"
            type="text"
            id="userfirstname"
            name="userfirstname"
          /><br /><br />
          <label for="userlastname">Nom de l'utilisateur :</label>
          <input
            v-model="userlastname"
            type="text"
            id="userlastname"
            name="userlastname"
          /><br /><br />
          <label for="usernickname">Pseudo de l'utilisateur :</label>
          <input
            v-model="usernickname"
            type="text"
            id="usernickname"
            name="usernickname"
          /><br /><br />
          <label for="email">Adresse mail :</label>
          <input type="email" id="email" v-model="email" required />
          <label for="password">Mot de passe :</label>
          <input v-model="password" type="password" id="password" name="password" /><br /><br />
          <button type="submit">Se connecter</button>
        </form>
      </div>
      <div v-else><button @click="toggleLoginForm">Commencer</button></div>
    </transition>
  </div>
  <div v-if="exe1" id="loginForm">
    <a href="ExerciseView2">
      <button>aller à l'exercices 2</button>
    </a>
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
import { useRouter } from 'vue-router'

const isLoginFormVisible = ref(false)
const userfirstname = ref('')
const userlastname = ref('')
const usernickname = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const exe1 = ref(false)

/*const isStrongPassword = (p) =>
  p.search(
    /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$)(?=.*[;:\.,!¡\?¿@#\$%\^&\-_+=\(\)\[\]\{\}])).{12,20}$/
  ) != -1
*/
const toggleLoginForm = () => {
  alert(
    "Le premier exercice consiste à se connecter à une page de login.\nVoici les données à insérer:\nPrénom de l'utilisateur: Prenom1 \n Nom d'utilisateur : Nom1\nPseudo de l'utilisateur: utilisateur1\nAdresse mail: utilisateur@example.com\nMot de passe : password1"
  )
  isLoginFormVisible.value = !isLoginFormVisible.value
  console.log('isLoginFormVisible:', isLoginFormVisible.value)
}

const login = () => {
  const expecteduserfirstname = 'Prenom1'
  const expecteduserlastname = 'Nom1'
  const expectedusernickname = 'utilisateur1'
  const expectedemail = 'utilisateur@exemple.com'
  const expectedPassword = 'password1'

  if (
    userfirstname.value === expecteduserfirstname &&
    password.value === expectedPassword &&
    userlastname.value === expecteduserlastname &&
    usernickname.value === expectedusernickname &&
    email.value === expectedemail
  ) {
    alert('Connexion réussie !')
    exe1.value = true
    router.value.push('/exercices2')
  } else {
    switch (password.value) {
      case 0:
        if (password.value.toLowerCase() === expectedPassword.toLowerCase()) {
          alert(
            "Nom d'utilisateur ou mot de passe incorrect.\n\nJe vais vous aider à vous connecter.\n\nConseil :\n\nil y a une erreur de majuscule dans le mot de passe."
          )
        } else {
          alert(
            "Nom d'utilisateur ou mot de passe incorrect.\n\nJe vais vous aider à vous connecter.\n\nConseil :\n\nil y a une erreur dans le mot de passe."
          )
        }
    }
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
    } else if (userfirstname.value !== expecteduserfirstname) {
      if (userfirstname.value.toLowerCase() === expecteduserfirstname.toLowerCase()) {
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
