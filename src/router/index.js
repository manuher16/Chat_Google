import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue")
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("../views/ChatView.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

})

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {
    onAuthStateChanged(auth, user => {

      if (!user) {
        console.log("user not logged in")
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    })
  }
  next()
})

export default router
