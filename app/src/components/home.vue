<template>
    <div class="main">
        <div class="column">
            <ul>
                <li class="cartHome">
                    <a href="homeHelp">
                        <h2>Aide à domicile</h2>
                        <div class="image-container">
                            <img src="../assets/aideInformatique-.png" alt="aideInformatique">
                        </div>
                    </a>
                </li>
                <li class="cartHome">
                    <a href="itHelp">
                        <h2>Conseil téléphonique</h2>
                        <div class="image-container">
                            <img src="../assets/Telephone-fixe-personne-agee.jpg" alt="aideInformatique">
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="column">
            <ul >
                <li class="cartHome">
                    <a href="cours">
                        <h2>Cours</h2>
                        <div class="image-container">
                            <img src="../assets/cours-informatique-internet.jpg" alt="cours">
                        </div>
                    </a>
                </li>
                <li class="cartHome">
                    <a href="contacte&links">
                        <h2>contact et lien d'aide</h2>
                        <div class="image-container">
                            <img src="../assets/lienaider.jpg" alt="aide en ligne">
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.main {
    display: flex;
    justify-content: center;  
    gap: 10px;  
    width: 50%;
}

.column {
    flex: 1;
}

.cartHome {
    margin-top: 1%;
    background-color: #acacac;
    height: auto;
    padding: 20px;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.image-container {
    text-align: center;
}

.image-container img {
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 5%;
}
</style> 