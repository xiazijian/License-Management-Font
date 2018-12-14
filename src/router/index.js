import Vue from 'vue'
import Router from 'vue-router'
import PWS from '@/components/PWS'
import PAS from '@/components/PAS'
import Prophet from '@/components/prophet'
import Login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/pws',
      name: 'pws',
      component: PWS
    },
    {
      path: '/pas',
      name: 'pas',
      component: PAS
    },
    {
      path: '/prophet',
      name: 'prophet',
      component: Prophet
    }
  ]
})
