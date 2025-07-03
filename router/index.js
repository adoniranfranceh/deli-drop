import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue"
import RestaurantScreen from "@/src/views/RestaurantScreen.vue";

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/buscar', name: 'Search', component: Search },
  { path: '/restaurante/:id', name: 'Restaurant', component: RestaurantScreen }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
