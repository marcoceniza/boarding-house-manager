import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardHome from '@/views/pages/dashboard/DashboardHome.vue'
import Tenants from '@/views/pages/dashboard/Tenants.vue'
import Rooms from '@/views/pages/dashboard/Rooms.vue'
import Billing from '@/views/pages/dashboard/Billing.vue'
import Settings from '@/views/pages/dashboard/Settings.vue'

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
        { path: '', component: DashboardHome },
        { path: 'tenants', component: Tenants },
        { path: 'rooms', component: Rooms },
        { path: 'billing', component: Billing },
        { path: 'settings', component: Settings },
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
