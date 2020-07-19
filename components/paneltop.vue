<template>
  <nav class="level">
    <div class="level-item has-text-centered box">
      <div>
        <p class="heading">
          <b-icon icon="account" custom-size="mdi-18px"></b-icon>
          <span class="is-size-7">Users</span>
        </p>
        <p class="title">{{ $store.getters.getAll.users }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered box">
      <div>
        <p class="heading">
          <b-icon icon="newspaper-variant" custom-size="mdi-18px"></b-icon>
          <span class="is-size-7">Articles</span>
        </p>
        <p class="title">{{ $store.getters.getAll.articles }}</p>
      </div>
    </div>
    <div class="level-item has-text-centered box">
      <div>
        <p class="heading">
          <b-icon icon="currency-inr" custom-size="mdi-18px"></b-icon>
          <span class="is-size-7">Donations</span>
        </p>
        <p class="title">124553</p>
      </div>
    </div>
    <div class="level-item has-text-centered box">
      <div>
        <p class="heading">
          <b-icon icon="thumb-up-outline" custom-size="mdi-18px"></b-icon>
          <span class="is-size-7">Feedbacks</span>
        </p>
        <p class="title">16</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'paneltop',
  created() {
    this.$store.dispatch('FetchItems')
  }
}
</script>