<template>



<div id="app">
  <h1>Prise de rendez-vous</h1>
  <form @submit.prevent="submitAppointment">
    <label for="date">Date:</label>
    <input type="date" id="date" v-model="appointment.date" required><br><br>
    <label for="time">Heure:</label>
    <input type="time" id="time" v-model="appointment.time" required><br><br>
    <button type="submit">Prendre rendez-vous</button>
  </form>

  <p v-if="appointmentSubmitted">Rendez-vous pris pour le {{ appointment.date }} à {{ appointment.time }}</p>
</div>
</template>

<script setup>
new Vue({
  el: '#app',
  data: {
    appointment: {
      date: '',
      time: ''
    },
    appointmentSubmitted: false
  },
  methods: {
    submitAppointment() {
      // Ici, vous pouvez envoyer les données de rendez-vous à votre serveur
      // par exemple, à l'aide d'une requête HTTP
      // Après avoir reçu une réponse réussie, vous pouvez afficher un message de confirmation
      // Pour cet exemple, je vais juste afficher un message de confirmation

      // Simuler l'envoi des données au serveur
      setTimeout(() => {
        this.appointmentSubmitted = true;
      }, 1000);
    }
  }
});
</script>

