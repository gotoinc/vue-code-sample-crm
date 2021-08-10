import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main'
    },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'auth'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    meta: {
      layout: 'auth'
    },
    component: () => import('@/views/SignUp.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/Categories.vue')
  },
  {
    path: '/detailrecord',
    name: 'DetailRecord',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'History',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/History.vue')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/record',
    name: 'Record',
    meta: {
      layout: 'main'
    },
    component: () => import('@/views/Record.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
