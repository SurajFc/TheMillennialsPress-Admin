<template></template>

<script>
export default {
  methods: {
    async logoutUser() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
</style>
