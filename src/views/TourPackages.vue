<template>
  <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex v-for="(tourPackage, i) in tourPackages.filter(tp => tp.type === type)":key='i' sm6 md4 lg4 xl3>
          <TourPackageCard :tourPackage="tourPackage" @remove="remove"/>
        </v-flex>
      </v-flex>
    </v-layout>
    <DeleteTourPackageDialog :dialog="dialog" :id="id" :type="type" @close="dialog = false"/>    
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    props: ['type'],
    data () {
      return {
        dialog: false,
        id: null
      }
    },
    computed: mapState(['tourPackages', 'currency']),
    methods: {
      remove (id) {
        this.dialog = true
        this.id = id
      }
    }
  }
</script>