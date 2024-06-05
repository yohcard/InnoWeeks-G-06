<template>
  <div class="main">
    <ul>
      <li>
        <h2>Comment créer un compte Google</h2>
        <div class="video-container">
          <video controls>
            <source src="/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </li>
      <li>
        <h2>Comment utiliser Chat GPT</h2>
        <div class="video-container">
          <video controls>
            <source src="/video2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #f0f0f0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 800px;
}

li {
  margin-bottom: 40px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
}

video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
