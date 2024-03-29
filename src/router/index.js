import { createRouter, createWebHistory } from 'vue-router'
import AppointmentsApp from '../views/appointments/AppointmentsApp.vue'
import AuthAPI from '@/api/AuthAPI'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminApp.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('@/views/admin/AppointmentsView.vue'),
        }
      ]
    },
    {
      path: '/',
      name: 'appointments',
      component: AppointmentsApp,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import ('../views/appointments/MyAppointmentsView.vue')
        },
        {
          path: 'nueva',
          component: () => import('../views/appointments/NewAppointmentApp.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appointments/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('../views/appointments/AppointmentView.vue')
            }
          ]
        },
        {
          path: ':id/editar',
          component: () => import ('../views/appointments/EditAppointmentApp.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'detalles',
              name: 'edit-appointment-details',
              component: () => import('../views/appointments/AppointmentView.vue'),
            }
          ],
        },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/auth/AuthApp.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('@/views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'olvide-password/:token',
          name: 'new-password',
          component: () => import('@/views/auth/NewPasswordView.vue'),
        },
      ],
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(!requiresAuth) {
    return next()
  }

  try {
    const { data } = await AuthAPI.auth()
    if(!data.admin) {
      return next()
    } 
    
    return next({name: 'admin'})
  } catch (err) {
    return next({name: 'login'})
  }
})

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
  if(!requiresAdmin) {
    return next()
  }

  try {
    await AuthAPI.admin()
    
    return next()
  } catch (err) {
    return next({name: 'my-appointments'})
  }
})

export default router
