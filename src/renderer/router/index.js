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
      component: require('@/components/toolbar-apps/FCSCommands').default
    },
    {
      path: '/wl',
      name: 'wl',
      component: require('@/components/toolbar-apps/WeightedList/WeightedList').default
    },
    {
      path: '/tl',
      name: 'tl',
      component: require('@/components/toolbar-apps/TrafficLight').default
    },
    {
      path: '/ul',
      name: 'ul',
      component: require('@/components/toolbar-apps/FCSLinks').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
