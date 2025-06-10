import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/buscar',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/restaurante/:id',
    name: 'RestaurantDetails',
    component: () => import('@/views/RestaurantDetails.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
