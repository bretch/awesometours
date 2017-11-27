// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VParallax,
  VDataTable,
  VTabs,
  VCard,
  VForm,
  VTextField,
  VDialog,
  VAvatar,
  VSubheader,
  VSnackbar,
  VCheckbox,
  VProgressCircular,
  transitions
} from 'vuetify'

import '../node_modules/vuetify/src/stylus/app.styl'

import App from './App'
import router from './router'
import store from './store'
import DeleteTourPackageDialog from '@/components/DeleteTourPackageDialog'
import TourPackageCard from '@/components/TourPackageCard'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VParallax,
    VDataTable,
    VTabs,
    VCard,
    VForm,
    VTextField,
    VDialog,
    VAvatar,
    VSubheader,
    VSnackbar,
    VCheckbox,
    VProgressCircular,
    transitions
  }
})

// local components
Vue.component('DeleteTourPackageDialog', DeleteTourPackageDialog)
Vue.component('TourPackageCard', TourPackageCard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
