import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import CalculatorView from '@/views/CalculatorView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: CalculatorView
    },
  ]
})

export default router