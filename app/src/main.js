import { createApp } from 'vue'

import App from './App.vue'
import router from './router' // import index.js de /router, pas la variable, le .js entier!!!!

import './assets/main.css'

const app = createApp(App)

app.use(router) // utilisation de /router/index.js

app.mount('#app')
