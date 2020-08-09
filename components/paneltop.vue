<template>
  <div class="columns is-variable">
    <div class="column has-text-centered card">
      <p class="heading">
        <b-icon icon="account" custom-size="mdi-18px"></b-icon>
        <span class="is-size-7">Users</span>
      </p>
      <p class="title">{{ getAll.users }}</p>
    </div>
    <div class="column has-text-centered card">
      <div>
        <p class="heading">
          <b-icon icon="newspaper-variant" custom-size="mdi-18px"></b-icon>
          <span class="is-size-7">Articles</span>
        </p>
        <p class="title">{{ getAll.articles }}</p>
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
import { mapGetters } from 'vuex'
export default {
  name: 'paneltop',
  computed: {
    ...mapGetters({
      getAll: 'paneltop/getAll',
    }),
  },
  created() {
    this.$store.dispatch('paneltop/FetchItems')
  },
}
</script>