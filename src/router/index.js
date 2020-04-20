import Vue from 'vue'
import store from '@/store/index';
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'screen'
    }
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: Home,
    meta: {
      layout: 'simple'
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: Home,
    meta: {
      layout: 'simple'
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Home,
    meta: {
      layout: 'default'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('setLayout', to.meta.layout || 'default');
  next();
})

export default router
