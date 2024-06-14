<template>
  <div class="main">
    <ul>
      <li class="cartHome">
        <a href="HomeHelp">
          <h2>Aide à domicile</h2>
          <div class="image-container">
            <img src="../assets/aideInformatique.png" />
          </div>
        </a>
      </li>
      <li class="cartHome">
        <a href="PhoneCallHelp">
          <h2>Conseil téléphonique</h2>
          <div class="image-container">
            <img src="../assets/Telephone-fixe-personne-agee.jpg" alt="conseil téléphonique" />
          </div>
        </a>
      </li>
      <li class="cartHome">
        <a href="cours">
          <h2>Cours chez nous</h2>
          <div class="image-container">
            <img src="../assets/cours-informatique-internet.jpg" alt="cours chez nous" />
          </div>
        </a>
      </li>
      <li class="cartHome">
        <a href="contacte&links">
          <h2>Contact et lien d'aide</h2>
          <div class="image-container">
            <img src="../assets/lienaider.jpg" alt="contact et lien d'aide" />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  width: 50%;
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 25%;
}

.cartHome {
  background-color: lightgray;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 200px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: contents;
}

h2 {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #333;
  font-size: 15px;
}

.image-container {
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  width: 100%;
  height: 125px;
  max-width: 150px;
  max-height: 150px;
  display: block;
  border-radius: 5%;
}
</style>
