import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/fc',
      name: 'fc',
      component: require('@/components/FCSCommands').default
    },
    {
      path: '/wl',
      name: 'wl',
      component: require('@/components/WeightedList').default
    },
    {
      path: '/tl',
      name: 'tl',
      component: require('@/components/TrafficLight').default
    },
    {
      path: '/ul',
      name: 'ul',
      component: require('@/components/FCSLinks').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
