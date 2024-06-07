<template>
  <div class="phone-call-help">
    <h1>Besoin d'aide ?</h1>
    <h2>Pour n'importe qu'elle question d'aide informatique nous sommes présent pour vous !</h2>
    <p>Nous sommes disponibles pour vous aider aux horaires suivants :</p>
    <ul>
      <li v-for="(horaire, index) in horaires" :key="index">
        {{ horaire.jour }} : {{ horaire.ouverture }} - {{ horaire.fermeture }}
      </li>
    </ul>
    <p>
      Appelez-nous au : <a :href="'tel:' + numero">{{ numero }}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'PhoneCallHelp',
  data() {
    return {
      horaires: [
        { jour: 'Lundi', ouverture: '09:00', fermeture: '17:00' },
        { jour: 'Mardi', ouverture: '09:00', fermeture: '17:00' },
        { jour: 'Mercredi', ouverture: '09:00', fermeture: '17:00' },
        { jour: 'Jeudi', ouverture: '09:00', fermeture: '17:00' },
        { jour: 'Vendredi', ouverture: '09:00', fermeture: '17:00' },
        { jour: 'Samedi', ouverture: '10:00', fermeture: '14:00' },
        { jour: 'Dimanche', ouverture: 'Fermé', fermeture: '' }
      ],
      numero: '0123456789'
    }
  }
}
</script>

<style scoped>
.phone-call-help {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.phone-call-help h1 {
  color: #333;
}

.phone-call-help ul {
  list-style-type: none;
  padding: 0;
}

.phone-call-help li {
  margin: 5px 0;
}

.phone-call-help a {
  color: #007bff;
  text-decoration: none;
}

.phone-call-help a:hover {
  text-decoration: underline;
}
</style>
