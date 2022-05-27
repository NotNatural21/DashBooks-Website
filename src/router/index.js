import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SettingsView from '../views/SettingsView.vue';
import RecordView from '../views/RecordView.vue';
import ProjectView from '../views/ProjectView.vue';
import TimeSheetView from '../views/TimeSheetView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/records',
    name: 'records',
    component: RecordView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectView
  },
  {
    path: '/timesheet',
    name: 'timesheet',
    component: TimeSheetView
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
