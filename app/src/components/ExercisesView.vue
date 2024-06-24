<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  Exercise: {
    type: Object,
    required: true
  },
  Belong: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const showRequirements = ref(false)
const router = useRouter()
let number = { id: props.Exercise.exeId }
let page = 'ExerciseView' + number.id
console.log(page)
const goToAnotherPage = () => {
  router.push({
    name: page,
    params: { id: props.Exercise.exeId }
  })
}

const toggleRequirements = () => {
  showRequirements.value = !showRequirements.value
}

// Watch for changes in Belong to debug the requirements
watch(
  () => props.Belong,
  (newVal) => {
    console.log('Belong updated:', newVal)
  }
)
</script>

<template>
  <div>
    <div v-if="Exercise" class="exercise-container">
      <div class="exercise-info" @click="toggleRequirements">
        <h2>{{ Exercise.exeTitre }}</h2>
        <p>{{ Exercise.exeDescription }}</p>
      </div>
      <button class="start-button" @click="goToAnotherPage">Start</button>
    </div>

    <div v-if="showRequirements" class="requirements">
      <h3>Prérequis:</h3>
      <ul>
        <li v-for="(requirement, index) in Belong" :key="index">
          {{ requirement.preDescription }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.exercise-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  border: 1px solid #fff;
  color: white;
  background-color: #39495c;
  border-radius: 8px;
  margin-bottom: 15px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.exercise-container:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.exercise-info {
  flex-grow: 1;
}

.start-button {
  margin-left: 20px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.start-button:hover {
  background-color: #45a049;
}

.requirements {
  padding: 10px;
  border-top: 1px solid #ccc;
  background-color: #f9f9f9;
  color: black;
}
</style>
