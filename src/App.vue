<template>
  <v-app dark>
    <v-toolbar dense  dark>
      <v-tabs>
        <v-tabs-bar  dark>
          <v-tabs-slider color="amber darken-3"></v-tabs-slider>
          <v-tabs-item 
            class="title amber--text text--darken-3"
            to="/"
            replace
            router>
              {{ title }}
          </v-tabs-item>
          <v-tabs-item
            class="hidden-xs-only"
            v-for="(tab, i) in tabs"
            :key="i"
            :to="tab.path"
            replace
            router>
          {{ tab.title }}
          </v-tabs-item>
        </v-tabs-bar>
      </v-tabs>            
      <v-spacer></v-spacer>
        <template v-if="Object.keys(profile).length">
          <v-avatar size="35px" class="mr-2" @click="handleLogout">
            <img :src="profile.picture" :alt="profile.given_name">
          </v-avatar>
          <v-btn flat @click="handleLogout" class="hidden-sm-and-down">Logout</v-btn>
        </template>
        <v-btn flat @click="handleLogin"  class="mr-0" v-else> <v-icon>account_circle</v-icon><span class="hidden-sm-and-down">&nbsp Admin Login</span></v-btn>    
    </v-toolbar>
    <v-parallax src="/static/images/sunset.jpg" height="320">
        <v-layout column align-center justify-center>
          <h1 class="white--text text--darken-4 display-2"><i>Adventure awaits the brave!</i></h1>
        </v-layout>
     </v-parallax>    
    <v-content>
      <router-view>
        <v-container fluid></v-container>
      </router-view>
    </v-content>    
    <v-flex md-1 offset-md6 sm-2 offset-sm5 xs-2 offset-xs5 v-if="loading">
      <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="orange"></v-progress-circular>
    </v-flex>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['profile']),
      tabs () {
        if (Object.keys(this.profile).length) {
          return [
            {path: '/', title: 'Public Tour Packages'},
            {path: '/exclusive', title: 'Private Tour Packages'},
            {path: '/create', title: 'Add Tour Package'}
          ]
        }
        return [{path: '/', title: 'Tour Packages'}]
      }
    },
    data () {
      return {
        fixed: false,
        title: 'Awesome Tours!',
        loading: true
      }
    },
    mounted () {
      this.loading = true
      this.$store.dispatch('getProfile')
      this.$store.dispatch('getTourPackages', () => {
        this.loading = false
      })
    },
    methods: {
      handleLogin () {
        this.$store.dispatch('login')
      },
      handleLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
