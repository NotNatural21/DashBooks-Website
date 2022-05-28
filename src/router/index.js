import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RecordView from '../views/RecordView.vue';
import ProjectView from '../views/ProjectView.vue';
import TimeSheetView from '../views/TimeSheetView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
          path: '/DashBooks/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/DashBooks/records',
          name: 'records',
          component: RecordView
        },
        {
          path: '/DashBooks/projects',
          name: 'projects',
          component: ProjectView
        },
        {
          path: '/DashBooks/projects/timesheet',
          name: 'timesheet',
          component: TimeSheetView
        }
    ]
})

export default router
