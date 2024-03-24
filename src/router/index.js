import { createRouter, createWebHistory } from 'vue-router'

const ROUTER_PATHS = {
  HOME: '/',
  FAVORITES: '/favorites'
}

const routes = [
  { 
    path: ROUTER_PATHS.HOME, 
    name: 'Home', 
    component: () => import('../pages/Home.vue'),
  },
  { 
    path: ROUTER_PATHS.FAVORITES, 
    name: 'Favorites', 
    component: () => import('../pages/Favorites.vue') 
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})