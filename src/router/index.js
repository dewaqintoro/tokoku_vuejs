import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Elektronik from '../views/Elektronik.vue'
import Detail from '../views/Detail.vue'
import Keranjang from '../views/Keranjang.vue'
import Pesanan from '../views/Pesanan.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/elektronik',
    name: 'Elektronik',
    component: Elektronik
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang
  },
  {
    path: '/pesanan',
    name: 'Pesanan',
    component: Pesanan
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
