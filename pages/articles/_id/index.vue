<template>
  <div>
    <b-navbar>
      <template slot="brand">
        <b-navbar-item>
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item>Home</b-navbar-item>
        <b-navbar-item>Documentation</b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item>About</b-navbar-item>
          <b-navbar-item>Contact</b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="columns">
      <div class="column is-2"></div>
      <div class="section column is-desktop-6 is-widescreen-6 is-mobile-12">
        <h1 class="title is-3">{{ data.title }}</h1>
        <p class="subtitle is-5">{{ data.subtitle }}</p>

        <p class="subtitle is-7">by: {{ data.author_name | capitalize }}</p>
        <b-button
          class="subtitle is-6 is-success"
          outlined
          tag="nuxt-link"
          to="/"
        >{{ data.category_name }}</b-button>
        <b-field grouped group-multiline>
          <div class="control" v-for="i in data.tags" :key="i.id">
            <b-taglist attached>
              <b-button type="is-info" size="is-small">{{ i }}</b-button>
            </b-taglist>
          </div>
        </b-field>

        <p class="subtitle is-7">
          updated at: {{ $moment(data.updated_at).format('LLL') }} (IST)
          <span
            class="is-pulled-right"
          >
            <span>
              <b-icon icon="facebook" size="is-medium" type="is-facebook"></b-icon>
            </span>
            <span>
              <b-icon icon="twitter" size="is-medium" type="is-twitter"></b-icon>
            </span>
            <span>
              <b-icon icon="linkedin" size="is-medium" type="is-linkedin"></b-icon>
            </span>
          </span>
        </p>
        <figure class="image is-3by2" v-if="data.cover">
          <img :src="$imageURL + 'media/' + data.cover" />
        </figure>
        <br />
        <div v-html="data.content"></div>
      </div>
      <div class="column is-2"></div>
      <div class="column is-2"></div>
    </div>
  </div>
</template>
<script>
//720 X 240
export default {
  layout: 'blank',
  head() {
    return {
      title: this.$route.params.id + ' | The Millennials Press Admin',
      meta: [
        {
          hid: 'View rticle',
          name: 'View article',
          content: 'Trending | The Millennials Press Admin',
        },
      ],
    }
  },
  data() {
    return {
      data: [],
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  methods: {
    async getDetails() {
      await this.$axios
        .$get(`article/view/${this.$route.params.id}`)
        .then((res) => {
          this.data = res[0]
        })
        .catch()
    },
  },
  mounted() {
    this.getDetails()
  },
}
</script>
