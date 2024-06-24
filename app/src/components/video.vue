<template>
  <div class="main">
    <ul>
      <li class="videoItem">
        <h2>Comment créer un compte Google</h2>
        <div class="video-container">
          <video controls>
            <source src="/video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        </div>
      </li>
      <li class="videoItem">
        <h2>Comment utiliser Chat GPT</h2>
        <div class="video-container">
          <video controls>
            <source src="/video2.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* espace entre les éléments */
}

.videoItem {
  background-color: #8b8b8b;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
  width: 100%;
  background: #000;
  border-radius: 5px;
  overflow: hidden;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
