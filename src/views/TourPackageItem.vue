<template>
    <v-flex xs10 offset-xs1 sm6 offset-sm3 mt-5 mb-5>    
      <v-form>
        <v-text-field
          label="Name"
          v-model="tourPackage.name"
          required
        ></v-text-field>
        <v-text-field
          label="Details"
          v-model="tourPackage.details"
          required
          multi-line
        ></v-text-field>   
        <v-checkbox
          label="Exclusive Tour?"
          v-model="tourPackage.type"
          required
        ></v-checkbox>

         <v-list two-line subheader>
            <v-subheader>Tour Rates</v-subheader>
            <v-list-tile v-for="(rate, index) in tourPackage.rates" v-bind:key="index">
              <v-list-tile-action>
                <v-icon color="amber darken-4">people</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="pr-3">
                <v-text-field
                  label="No of Persons"
                  :value="rate.noOfPersons"
                  @input="value => updateRate(index, { noOfPersons: value})"
                  mask="###"
                  required
                ></v-text-field>
              </v-list-tile-content>
              <v-list-tile-content>
                <v-text-field
                  label="Amount"
                  :value="rate.amount"
                  :prefix="currency"
                  @input="value => updateRate(index, { amount: value })"
                  required
                ></v-text-field>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon  @click="removeRate(index)"><v-icon color="red">delete</v-icon></v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile>
                <v-btn @click="addRate"><v-icon color="green">add</v-icon> Add Rate </v-btn>
            </v-list-tile>

          </v-list>         
        <v-btn color="primary" flat @click="submit">{{ $route.params.id? 'Update' : 'Create' }}</v-btn>
        <v-btn color="red" flat @click.stop="dialog = true" v-if="$route.params.id">Delete Tour Package</v-btn>
      </v-form>
      <v-snackbar :timeout="6000" top vertical v-model="snackbar">   
          <span v-if="$route.params.id">Successfully updated Tour Package.</span>
          <span v-else>Successfully created Tour Package.</span>
          <v-btn flat color="pink" @click.native="closeSnackbar">Close</v-btn>
      </v-snackbar>
      <DeleteTourPackageDialog :dialog="dialog" :id="$route.params.id" :type="tourPackage.type ? 'private': 'public'" @close="dialog = false"/>
    </v-flex>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      const initial = {
        name: 'Unnamed Tour',
        details: 'Add Tour details here',
        image: 'background.jpg',
        rates: [{ noOfPersons: 1, amount: 900 }],
        type: false
      }

      return {
        initial,
        tourPackage: initial,
        dialog: false,
        snackbar: false
      }
    },
    computed: mapState(['currency', 'tourPackages']),
    watch: {
      '$route.name': 'refresh'
    },
    mounted () {
      this.refresh()
    },
    methods: {
      async refresh () {
        if (this.$route.name === 'TourPackageItem') {
          if (!this.tourPackages.length) {
            await this.$store.dispatch('getTourPackages')
          }
          const item = this.$store.getters.getTourPackageById(this.$route.params.id)
          if (item) {
            this.tourPackage = item
            this.tourPackage.type = this.tourPackage.type === 'private'
          }
        } else {
          this.tourPackage = this.initial
        }
      },
      updateRate (rateIndex, rate) {
        this.tourPackage.rates[rateIndex] = {...this.tourPackage.rates[rateIndex], ...rate}
      },
      removeRate (rateIndex) {
        this.tourPackage.rates = this.tourPackage.rates.filter((rate, rIndex) => rIndex !== rateIndex)
      },
      addRate () {
        this.tourPackage.rates.push({ noOfPersons: 1, amount: 900 })
      },
      update () {
        const tourPackage = {...this.tourPackage, type: this.tourPackage.type ? 'private' : 'public'}
        this.$store.commit('UPDATE_PACKAGE', {
          id: this.$route.params.id,
          tourPackage
        })
        this.snackbar = true
      },
      async create () {
        const tourPackage = {...this.tourPackage, type: this.tourPackage.type ? 'private' : 'public'}
        await this.$store.dispatch('createTourPackage', tourPackage)
        this.snackbar = true
      },
      submit () {
        if (this.$route.params.id) {
          this.update()
        } else {
          this.create()
        }
      },
      closeSnackbar () {
        this.snackbar = false
        if (this.tourPackage.type) this.$router.replace('/exclusive')
        else this.$router.replace('/')
      }
    }
  }
</script>
