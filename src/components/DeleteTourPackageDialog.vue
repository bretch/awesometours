<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-text>Delete this Tour Package?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="$emit('close')">Cancel</v-btn>
        <v-btn flat color="red" @click="remove">Yes, delete this.</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>      
</template>
<script>
    export default {
      props: ['dialog', 'id', 'type'],
      methods: {
        remove () {
          this.$store.commit('DELETE_PACKAGE', this.id)
          this.$emit('close')
          if (this.type === 'public') this.$router.replace('/')
          else this.$router.replace('/exclusive')
        }
      }
    }
</script>