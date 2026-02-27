import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomeScreen',
    component: () => import('@/views/HomeScreen.vue')
  },
  {
    path: '/buscar',
    name: 'SearchScreen',
    component: () => import('@/views/SearchScreen/index.vue')
  },
  {
    path: '/restaurante/:id',
    name: 'RestaurantScreen',
    component: () => import('@/views/RestaurantScreen.vue'),
    props: true
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/CheckoutView.vue')
  },
  {
    path: '/order/:code',
    name: 'OrderTracking',
    component: () => import('@/views/OrderTrackingView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
