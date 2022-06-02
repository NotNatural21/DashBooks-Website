import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/projects',
        name: 'projects',
        component: () => import('../views/ProjectView.vue')
    },
    {
        path: '/project/timesheet',
        name: 'timesheet',
        component: () => import('../views/TimeSheetView.vue')
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: () => import('../views/InvoiceView.vue')
    }
  ]
})

export default router
