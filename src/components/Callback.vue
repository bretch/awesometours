<template>
</template>
<script>

export default {
  name: '',
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('afterLogin')
      this.$router.replace('/')
    })
  }
}
</script>