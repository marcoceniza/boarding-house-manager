import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import DashboardHome from '@/views/pages/dashboard/DashboardHome.vue'
import Tenants from '@/views/pages/dashboard/Tenants.vue'
import Rooms from '@/views/pages/dashboard/Rooms.vue'
import Billings from '@/views/pages/dashboard/Billings.vue'
import Profile from '@/views/pages/dashboard/Profile.vue'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
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
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/pages/Register.vue'),
      meta: { guest: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.user) {
    try {
      await authStore.getUser();
    } catch (error) {
      console.warn("User check failed");
    }
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const guestOnly = to.matched.some(record => record.meta.guest);

  if (requiresAuth && !authStore.user) {
    return next({ name: 'login' });
  }

  if (guestOnly && authStore.user) {
    return next({ name: 'Dashboard' });
  }

  next();
});

export default router