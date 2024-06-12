import { ref } from 'vue'

export const isAuthenticated = ref(!!localStorage.getItem('jwt'))
