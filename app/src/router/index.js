import { createRouter, createWebHistory } from 'vue-router';

const routes = [
 
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../components/Contact.vue')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('../components/video.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
