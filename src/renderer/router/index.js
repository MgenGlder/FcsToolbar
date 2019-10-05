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
      component: require('@/components/toolbar-apps/FCSCommands').default,
      props: {
        showHeaderAndFooter: false
      }
    },
    {
      path: '/wl',
      name: 'wl',
      component: require('@/components/toolbar-apps/WeightedList/Home').default,
      props: {
        showHeaderAndFooter: false
      }
    },
    {
      path: '/tl',
      name: 'tl',
      component: require('@/components/toolbar-apps/TrafficLight').default,
      props: {
        showHeaderAndFooter: false
      }
    },
    {
      path: '/ul',
      name: 'ul',
      component: require('@/components/toolbar-apps/FCSLinks').default,
      props: {
        showHeaderAndFooter: false
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
