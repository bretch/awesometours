<template>
  <v-card>
    <v-card-media :src="`/static/images/${tourPackage.image}`" height="200px">
    </v-card-media>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ tourPackage.name }}</h3>
        <div>{{ tourPackage.details }}</div>
      </div>
    </v-card-title>
    <v-list>
      <v-subheader>Tour Rates</v-subheader>
      <v-list-tile avatar v-for="(rate, index) in tourPackage.rates" v-bind:key="index" @click="">
        <v-list-tile-avatar>
          <v-icon color="amber darken-4">people</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-sub-title>{{ rate.noOfPersons }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-sub-title>{{ currency }} <strong>{{ rate.amount }} </strong> per person</v-list-tile-sub-title>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>          
    <v-card-actions v-if="Object.keys(profile).length">
      <v-btn flat :to="`/tour/${tourPackage.id}`" router>Update</v-btn>
      <v-btn color="red" flat @click.stop="$emit('remove',tourPackage.id)">Delete Tour Package</v-btn>
    </v-card-actions>
  </v-card>  
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    props: ['tourPackage'],
    computed: mapState(['profile', 'currency'])
  }
</script>