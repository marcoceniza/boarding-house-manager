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
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        { path: '', name: 'Dashboard', component: DashboardHome },
        { path: 'rooms', name: 'Rooms', component: Rooms },
        { path: 'tenants', name: 'Tenants', component: Tenants },
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

// Global auth/guest guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const publicPages = ['login', 'register']
  const authRequired = !publicPages.includes(to.name)

  if (authRequired && !token) {
    return next({ name: 'login' })
  }

  if (token && publicPages.includes(to.name)) {
    return next({ name: 'Dashboard' })
  }

  next()
})

export default router