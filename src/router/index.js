import { createRouter, createWebHistory } from 'vue-router'
import { protectedRoutes } from './protected'

const routes = [...protectedRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_FOLDER),
  routes,
})

export default router
