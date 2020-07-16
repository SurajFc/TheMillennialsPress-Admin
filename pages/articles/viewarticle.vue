<template>
  <div class="section" style="margin-top: -60px;">
    <!-- <b-table :data="data"> </b-table> -->
  </div>
</template>

<script>
export default {
  name: 'ViewArticle',
  data() {
    return {
      data: []
    }
  },
  methods: {
    async getArticles() {
      await this.$axios
        .$get('article/getall')
        .then(res => {
          this.data = res.data
        })
        .catch()
    }
  },
  mounted() {
    this.getArticles()
  }
}
</script>

<style>
</style>