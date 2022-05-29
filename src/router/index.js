import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProjectView from '../views/ProjectView.vue';
import TimeSheetView from '../views/TimeSheetView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/projects',
          name: 'projects',
          component: ProjectView
        },
        {
          path: '/projects/timesheet',
          name: 'timesheet',
          component: TimeSheetView
        }
    ]
})

export default router
