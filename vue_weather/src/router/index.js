import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '../components/Weather.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Weather',
    component: Weather
  }
]

const router = new VueRouter({
  routes
})

export default router
