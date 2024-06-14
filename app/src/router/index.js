import { createRouter, createWebHistory } from 'vue-router'
import home from '@/views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../components/Contact.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../components/video.vue')
    },
    {
      path: '/HomeHelp',
      name: 'homeHelp',
      component: () => import('@/views/homeHelp.vue')
    },
    {
      path: '/PhoneCallHelp',
      name: 'PhoneCallHelp',
      component: () => import('@/views/PhoneCallHelp.vue')
    },
    {
      path: '/Cours',
      name: 'Cours',
      component: () => import('@/views/cours.vue')
    },
    {
      path: '/contact&Links',
      name: 'contacte&links',
      component: () => import('@/views/contact&Links.vue')
    },
    {
      path: '/exercices',
      name: 'exercices',
      component: () => import('@/views/ExercicesList.vue')
    },
    {
      path: '/exercice',
      name: 'exercice',
      component: () => import('@/views/Exercise.vue')
    }
  ]
})

export default router
