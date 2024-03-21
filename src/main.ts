import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import { i18n } from './plugins/i18n'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import './assets/main.css'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: () => import('./pages/Home.vue') 
  },
  { 
    path: '/favorites', 
    name: 'Favorites', 
    component: () => import('./pages/Favorites.vue') 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(autoAnimatePlugin)
app.use(i18n)
app.mount('#app')
