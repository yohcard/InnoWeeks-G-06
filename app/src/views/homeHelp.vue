<template>
  <div class="home-help">
    <h1>Prendre un rendez-vous pour une aide à domicile</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div>
        <label for="address">Adresse :</label>
        <input type="text" id="address" v-model="form.address" required />
      </div>
      <div>
        <label for="issues">Votre probleme :</label>
        <input type="text" id="issues" v-model="form.issues" required />
      </div>
      <div>
        <label for="date">Date :</label>
        <input type="date" id="date" v-model="form.date" required />
      </div>
      <div>
        <label for="time">Heure :</label>
        <input type="time" id="time" v-model="form.time" required />
      </div>
      <button type="submit">Prendre rendez-vous</button>
    </form>
    <div v-if="confirmationMessage" class="confirmation-message">
      {{ confirmationMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHelp',
  data() {
    return {
      form: {
        name: '',
        address: '',
        date: '',
        time: ''
      },
      confirmationMessage: ''
    }
  },
  methods: {
    submitForm() {
      // Ici, nous pourrions envoyer les données à un serveur via une API
      // Pour cet exemple, nous allons simplement afficher un message de confirmation
      this.confirmationMessage = `Merci, ${this.form.name}. Votre rendez-vous a été pris pour le ${this.form.date} à ${this.form.time} à l'adresse ${this.form.address}.`
      // Réinitialiser le formulaire
      this.form.name = ''
      this.form.address = ''
      this.form.date = ''
      this.form.time = ''
    }
  }
}
</script>

<style scoped>
.home-help {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.home-help h1 {
  color: #333;
}

.home-help form {
  display: flex;
  flex-direction: column;
}

.home-help div {
  margin-bottom: 10px;
}

.home-help label {
  margin-bottom: 5px;
}

.home-help input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.home-help button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.home-help button:hover {
  background-color: #0056b3;
}

.confirmation-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
}
</style>
