import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyProduct from "@/views/MyProduct";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import AllProducts from "@/views/AllProducts";
import { getAuth } from "firebase/auth";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: AllProducts,
      meta: { requiresAuth: true },
    },
    {
      path: '/myProduct',
      name: 'myProduct',
      component: MyProduct,
      meta: { requiresAuth: true },
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
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
})
router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = getAuth().currentUser

  if (requiresAuth && !currentUser) {
    next('/sign-in')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})
export default router
