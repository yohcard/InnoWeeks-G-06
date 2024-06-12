import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
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
      name: 'exercices1',
      component: () => import('@/views/exercices1.vue')
    }
  ]
})

export default router
