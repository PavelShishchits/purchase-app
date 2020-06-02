import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

import Home from '../views/Home.vue'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'
import Main from '../views/Main'

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
    name: 'Login',
    component: Login,
    meta: {
      layout: 'simple',
      title: 'Log in'
    }
  },
  {
    path: '/sign-up',
    name: 'Registration',
    component: Registration,
    meta: {
      layout: 'simple',
      title: 'Registration'
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: {
      layout: 'default',
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

store.dispatch('auth/autoLogin');

router.beforeEach((to, from, next) => {
  store.commit('setLayout', to.meta.layout || 'default');

  const isAuthenticated = store.getters['auth/isAuthenticated'];
  if (to.meta.requireAuth && !isAuthenticated) {
    next({name: 'Home'});
  }
  if (!to.meta.requireAuth && isAuthenticated) {
    next({name: 'Main'})
  }

  next();
})

export default router;
