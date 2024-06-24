<template>
  <div v-if="isLoginFormVisible" id="loginForm">
    <div class="contact-form">
      <h1>
        Exercices <br />
        Envois d'un mail
      </h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">Email du destinataire :</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div>
          <label for="text">Objet de votre mail :</label>
          <input type="text" id="text" v-model="form.text" required />
        </div>
        <div>
          <label for="message">Message :</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  </div>
  <div v-else><button @click="toggleLoginForm">Commencer</button></div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const form = ref({
      email: '',
      text: '',
      message: ''
    })

    const router = useRouter()
    const isLoginFormVisible = ref(false)

    const toggleLoginForm = () => {
      alert(
        'Le premier exercice consiste à se connecter à une page de login.\nVoici les données à insérer:\nEmail du destinataire : : distanataire@example.com\nObjet de votre mail : Objet\nMessage : Ceci est un message.'
      )
      isLoginFormVisible.value = !isLoginFormVisible.value
      console.log('isLoginFormVisible:', isLoginFormVisible.value)
    }

    const submitForm = () => {
      const expectedEmail = 'distanataire@example.com'
      const expectedText = 'Objet'
      const expectedMessage = 'Ceci est un message.'

      if (
        form.value.email === expectedEmail &&
        form.value.text === expectedText &&
        form.value.message === expectedMessage
      ) {
        alert('Vous avez reussit l exercice 3 bien jouer !')

        router.push('/exercices')
      } else {
        if (form.value.email !== expectedEmail) {
          alert(
            "L'email du destinataire est incorrect.\n\nConseil : Assurez-vous que l'email correspond à distanataire@example.com."
          )
        } else if (form.value.text !== expectedText) {
          alert(
            "L'objet de votre mail est incorrect.\n\nConseil : Assurez-vous que l'objet correspond à objet execices deux."
          )
        } else if (form.value.message !== expectedMessage) {
          alert(
            'Le message est incorrect.\n\nConseil : Assurez-vous que le message correspond à Ceci est un message de d exemple pour l exercices deux.'
          )
        }
      }
    }

    return {
      form,
      isLoginFormVisible,
      toggleLoginForm,
      submitForm
    }
  }
}
</script>

<style scoped>
.contact-form {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 100%;
}

.contact-form h1 {
  text-align: center;
  margin-bottom: 20px;
}

.contact-form div {
  margin-bottom: 15px;
}

.contact-form label {
  display: block;
  margin-bottom: 5px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.contact-form button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.contact-form button:hover {
  background-color: #0056b3;
}
</style>
