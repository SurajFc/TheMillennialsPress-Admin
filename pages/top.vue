<template>
  <div class="section" style="margin-top: -60px;">
    <section>
      <p class="has-text-centered is-size-4 is-success">Trending Articles</p>
    </section>

    <b-table
      :data="data"
      :loading="loading"
      paginated
      backend-pagination
      :total="total"
      :per-page="perPage"
      @page-change="onPageChange"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      :hoverable="true"
      :mobile-cards="true"
      detailed
      detail-key="id"
    >
      <template slot-scope="props">
        <b-table-column label="#">{{ props.index + 1 }}</b-table-column>
        <b-table-column field="title" label="Title" sortable>
          {{
          props.row.title | truncate(20)
          }}
        </b-table-column>
        <b-table-column field="count" label="Total Views" sortable>
          {{
          props.row.count
          }}
        </b-table-column>
        <b-table-column field="category_name" label="Category" sortable>
          <span class="tag is-danger">{{ props.row.category.name }}</span>
        </b-table-column>
        <b-table-column field="is_active" label="Active">
          <b-switch
            v-model="props.row.is_active"
            @input="ChangeStatus(props.row.is_active, props.row.id)"
          ></b-switch>
        </b-table-column>
        <b-table-column field="realease" label="Published At" sortable>
          <span class="tag is-success">
            {{
            props.row.realease
            ? new Date(props.row.realease).toLocaleDateString()
            : 'unknown'
            }}
            {{
            new Date(props.row.realease).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            })
            }}
          </span>
        </b-table-column>
        <b-table-column label="Edit">
          <span>
            <b-button type="is-primary" icon-right="pencil" @click="EditArticle(props.row.slug)" />
          </span>
        </b-table-column>
        <b-table-column label="Preview">
          <b-button
            size="is-medium"
            tag="nuxt-link"
            :to="props.row.slug"
            target="_blank"
            icon-left="eye"
          >view</b-button>
        </b-table-column>
      </template>
      <template slot="detail" slot-scope="props">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="$imageURL + props.row.cover" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <small>Author</small>
                <strong>@{{ props.row.author_name }}</strong>

                <br />
                {{ props.row.subtitle }}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small">
                    <i class="fas fa-reply"></i>
                  </span>
                </a>
                <a class="level-item">
                  <span class="icon is-small">
                    <i class="fas fa-retweet"></i>
                  </span>
                </a>
                <a class="level-item">
                  <span class="icon is-small">
                    <i class="fas fa-heart"></i>
                  </span>
                </a>
              </div>
            </nav>
          </div>
          <div class="media-right has-bottom-right">Added by: {{ props.row.user }}</div>
        </article>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'ViewArticle',
  head() {
    return {
      title: 'TOP | The Millennials Press Admin',
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'TOP',
          name: 'Trending',
          content: 'TOP | The Millennials Press Admin',
        },
      ],
    }
  },
  data() {
    return {
      data: [],
      loading: false,
      perPage: 10,
      page: 1,
      total: 0,
    }
  },
  filters: {
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + '...' : value
    },
  },
  methods: {
    getTopArticles() {
      this.$axios
        .$get(`getTopNews?page=${this.page}`)
        .then((res) => {
          console.log('res--==>', res)
          this.data = res.results
          this.total = res.count
        })
        .catch()
    },
    onPageChange(page) {
      this.page = page
      this.getTrendingArticles()
    },
    async ChangeStatus(value, id) {
      try {
        const res = await this.$axios.$post('changestatus', {
          id: id,
          active: value,
        })

        if (res.status == '1') {
          this.$store.dispatch('toaster/Toast')
        }
      } catch {
        this.$store.dispatch('toaster/Toast', {
          message: 'Some Error',
          type: 'is-danger',
        })
      }
    },

    EditArticle(slug) {
      this.$router.push(`/articles/edit/${slug}`)
    },
  },
  mounted() {
    this.getTopArticles()
  },
}
</script>
