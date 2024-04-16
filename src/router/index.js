import { createRouter, createWebHistory } from 'vue-router'

import { API } from '@api'
import { asyncGlobalSpinner } from "@loader-worker"

const ROUTER_PATHS = {
  HOME: '/',
  FAVORITES: '/favorites',
  PRODUCT: '/product/:id',
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
  { 
    path: ROUTER_PATHS.PRODUCT, 
    name: 'Product', 
    component: () => import('../pages/Product.vue') ,
    beforeEnter: [
      async (to) => {
        const [data] = await asyncGlobalSpinner(
          API.UrlsService.GetProduct(to.params.id)
        )
        to.meta.product = data
      } 
    ]
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})