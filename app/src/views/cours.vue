<template>
  <div class="cours">
    <h1>Réserver un cours</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div>
        <label for="firstname">Prénom :</label>
        <input type="text" id="firstname" v-model="form.firstname" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div>
        <label for="course">Choisir un cours :</label>
        <select id="course" v-model="form.course" required>
          <option value="" disabled>Choisir un cours</option>
          <option v-for="course in courses" :key="course.id" :value="course.name">
            {{ course.name }} ({{ course.time }})
          </option>
        </select>
      </div>
      <button type="submit">Réserver</button>
    </form>
    <div v-if="confirmationMessage" class="confirmation-message">
      {{ confirmationMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cours',
  data() {
    return {
      courses: [
        {
          id: 1,
          name: 'Apprendre a utiliser internet et la technologie correctement',
          time: 'Samedi matin 9h-12h'
        },
        {
          id: 2,
          name: 'Rester au courant des nouvelle technologie',
          time: 'Samedi après-midi 14h-17h'
        }
      ],
      form: {
        name: '',
        course: ''
      },
      confirmationMessage: ''
    }
  },
  methods: {
    submitForm() {
      this.confirmationMessage = `Merci, ${this.form.name}. Vous avez réservé le ${this.form.course}.`
      // Réinitialiser le formulaire
      this.form.name = ''
      this.form.course = ''
    }
  }
}
</script>

<style scoped>
.cours {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.cours h1 {
  color: #333;
}

.cours form {
  display: flex;
  flex-direction: column;
}

.cours div {
  margin-bottom: 10px;
}

.cours label {
  margin-bottom: 5px;
}

.cours input,
.cours select {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.cours button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cours button:hover {
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
