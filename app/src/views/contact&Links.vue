<template>
  <div class="aide-informatique">
    <h1>Aide Informatique pour les Personnes Âgées</h1>
    <h2>Numéros d'Aide Informatique</h2>
    <ul>
      <li v-for="aide in aideInformatique" :key="aide.numero">
        {{ aide.nom }} : <a :href="'tel:' + aide.numero">{{ aide.numero }}</a>
      </li>
    </ul>
    <h2>Liens Utiles</h2>
    <ul>
      <li v-for="lien in liensUtiles" :key="lien.url">
        <a :href="lien.url" target="_blank">{{ lien.nom }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aideInformatique: [
        { nom: 'Assistance Technique', numero: '0123456789' },
        { nom: 'Support Informatique', numero: '0987654321' }
      ],
      liensUtiles: [
        { nom: 'Site de Support', url: 'https://www.support.com' },
        { nom: 'Guide Informatique', url: 'https://www.guide.com' }
      ]
    }
  }
}
</script>

<style scoped>
.aide-informatique {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.aide-informatique h1,
.aide-informatique h2 {
  color: #333;
}

.aide-informatique ul {
  list-style-type: none;
  padding: 0;
}

.aide-informatique li {
  margin: 5px 0;
}

.aide-informatique a {
  color: #007bff;
  text-decoration: none;
}

.aide-informatique a:hover {
  text-decoration: underline;
}
</style>
