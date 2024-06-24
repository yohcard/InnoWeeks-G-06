<script setup>
import { ref } from 'vue'
import Tutoservices from '@/services/Tutoservices'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../auth.js'

const router = useRouter()

const utiPseudo = ref('')
const utiMdp = ref('')
const loginError = ref('')

const login = async () => {
  try {
    const response = await Tutoservices.login({
      utiPseudo: utiPseudo.value,
      utiMdp: utiMdp.value
    })
    console.log(utiPseudo.value)
    console.log(utiMdp.value)

    if (response.data.token) {
      localStorage.setItem('jwt', response.data.token)
      loginError.value = ''
      isAuthenticated.value = true
      router.push('/')
      console.log('Login successful:', response.data.data)
    } else {
      loginError.value = 'Invalid utiPseudo or utiMdp'
    }
  } catch (error) {
    console.log(error.message)
    loginError.value = 'An error occurred during login'
  }
}
</script>

<template>
  <div class="container">
    <div class="account">
      <h2>My Account</h2>
      <form @submit.prevent="login">
        <label for="utiPseudo">Pseudo ou Adresse mail</label>
        <input
          type="text"
          v-model="utiPseudo"
          name="utiPseudo"
          id="utiPseudo"
          placeholder="Entrez Pseudo ou Adresse mail"
          required
        />
        <label for="utiMdp">Mot de passe</label>
        <input
          type="password"
          v-model="utiMdp"
          name="utiMdp"
          id="utiMdp"
          placeholder="Entrez Mot de passe"
          required
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>

  <div v-if="loginError" class="error">{{ loginError }}</div>
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.account {
  margin: 0 auto;
  padding: 20px;
  margin-top: 235px;
  margin-bottom: 295px;
  max-width: 400px;
  width: 350px;
  background: lightcyan;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1; /* Ensure the account div stays above the background */
}

.account h2 {
  margin-top: 5px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: rgb(0, 86, 126);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
}

label {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: rgb(0, 86, 126);
}

input[type='text'],
input[type='password'],
input[type='submit'] {
  width: 80%;
  max-width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  border-radius: 10px;
}

input[type='submit'] {
  background: blue;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
}

input[type='submit']:hover {
  background: rgb(0, 143, 0);
}

button {
  padding: 10px 15px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 84px;
  margin-bottom: 84px;
  transition: background 0.3s ease;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
}

button:hover {
  background: #0063cc;
}

.error {
  position: absolute;
  bottom: 250px;
  width: 100%;
  color: red;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-align: center;
  z-index: 2; /* Ensure the error message stays above other content */
}

label {
  margin-bottom: -12px;
}
</style>
