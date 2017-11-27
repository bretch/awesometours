import Vue from 'vue'
import VueRouter from 'vue-router'
import TourPackages from '@/views/TourPackages'
import TourPackageItem from '@/views/TourPackageItem'
import Callback from '@/components/Callback'
import { requireAuth } from './../utils/auth'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TourPackages',
      component: TourPackages,
      props: {type: 'public'}
    },
    {
      path: '/exclusive',
      beforeEnter: requireAuth,
      name: 'PrivateTourPackages',
      component: TourPackages,
      props: {type: 'private'}
    },
    {
      path: '/create',
      beforeEnter: requireAuth,
      name: 'CreateTourPackage',
      component: TourPackageItem
    },
    {
      path: '/tour/:id',
      beforeEnter: requireAuth,
      name: 'TourPackageItem',
      component: TourPackageItem
    },
    {
      path: '/callback',
      component: Callback
    }
  ]
})
