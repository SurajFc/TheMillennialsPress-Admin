<template>
  <div class="columns is-variable">
    <div class="column has-text-centered card">
      <p class="heading">
        <b-icon icon="account" custom-size="mdi-18px"></b-icon>
        <span class="is-size-7">Users</span>
      </p>
      <p class="title">{{ $store.getters.getAll.users }}</p>
    </div>
    <div class="column has-text-centered card">
      <div>
        <p class="heading">
          <b-icon icon="newspaper-variant" custom-size="mdi-18px"></b-icon>
          <span class="is-size-7">Articles</span>
        </p>
        <p class="title">{{ $store.getters.getAll.articles }}</p>
      </div>
    </div>
    <div class="column has-text-centered card">
      <div>
        <p class="heading">
          <b-icon icon="currency-inr" custom-size="mdi-18px"></b-icon>
          <span class="is-size-7">Donations</span>
        </p>
        <p class="title">124553</p>
      </div>
    </div>
    <div class="column has-text-centered card">
      <div>
        <p class="heading">
          <b-icon icon="thumb-up-outline" custom-size="mdi-18px"></b-icon>
          <span class="is-size-7">Feedbacks</span>
        </p>
        <p class="title">16</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paneltop',
  created() {
    this.$store.dispatch('FetchItems')
  },
}
</script>