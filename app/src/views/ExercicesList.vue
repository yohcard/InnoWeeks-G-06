<script setup>
import { ref, onMounted } from 'vue'
import ExercisesView from '@/components/ExercisesView.vue'
import Tutoservices from '@/services/Tutoservices'

const exercices = ref([])
const belongs = ref({})

onMounted(async () => {
  try {
    const Exeresponse = await Tutoservices.getExercises()
    console.log(Exeresponse.data.data)
    exercices.value = Exeresponse.data.data

    exercices.value.forEach((exercice) => {
      belongs.value[exercice.exeId] = {}
    })

    for (const exercice of exercices.value) {
      const Belresponse = await Tutoservices.getExePrerequisites(exercice.exeId)
      console.log(Belresponse.data.data)
      belongs.value[exercice.exeId] = Belresponse.data.data
    }
  } catch (error) {
    console.log(error.message)
  }
})
</script>

<template>
  <div class="home">
    <div class="exercise-container">
      <h3 class="title">Liste d'exercices:</h3>
      <ExercisesView
        v-for="(exercice, index) in exercices"
        :key="exercice.exeId"
        :Exercise="exercice"
        :Belong="belongs[exercice.exeId] || {}"
      />
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 20px;
}

.exercise-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
