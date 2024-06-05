import { createRouter, createWebHistory } from 'vue-router';
import home from '@/views/homepage.vue'
const routes = [
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
    path: '/homeHelp',
    name: 'homeHelp',
    component: () => import('@/views/homeHelp.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
