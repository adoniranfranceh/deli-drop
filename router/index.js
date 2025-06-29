import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue"
import RestaurantDetails from "@/src/views/RestaurantDetails.vue";

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/buscar', name: 'Search', component: Search },
  { path: '/restaurante/:id', name: 'Restaurant', component: RestaurantDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
