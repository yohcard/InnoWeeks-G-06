<template>
    <div class="contact-form">
      <h1>Contactez-nous</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Nom:</label>
          <input type="text" id="name" v-model="form.name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required />
        </div>
        <div>
          <label for="message">Message:</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      submitForm() {
        // Traitement du formulaire
        console.log('Nom:', this.form.name);
        console.log('Email:', this.form.email);
        console.log('Message:', this.form.message);
  
        // Réinitialisation du formulaire
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';
  
        alert('Votre message a été envoyé avec succès!');
      }
    }
  };
  </script>
  
  <style scoped>
  .contact-form {
    max-width: 600px;
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
  