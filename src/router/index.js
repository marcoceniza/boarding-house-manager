import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardHome from '@/views/pages/dashboard/DashboardHome.vue'
import Tenants from '@/views/pages/dashboard/Tenants.vue'
import Rooms from '@/views/pages/dashboard/Rooms.vue'
import Billings from '@/views/pages/dashboard/Billings.vue'
import Profile from '@/views/pages/dashboard/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        { path: '', name: 'Dashboard', component: DashboardHome },
        { path: 'tenants', name: 'Tenants', component: Tenants },
        { path: 'rooms', name: 'Rooms', component: Rooms },
        { path: 'billings', name: 'Billings', component: Billings },
        { path: 'profile', name: 'Profile', component: Profile },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/pages/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/pages/Register.vue'),
    },
  ],
})

export default router
