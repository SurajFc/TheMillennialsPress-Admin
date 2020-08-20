<template>
  <div>
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
    >
      <template slot-scope="props">
        <b-table-column label="#">{{ props.index + 1 }}</b-table-column>
        <b-table-column field="email" label="email" sortable>{{ props.row.email }}</b-table-column>
        <b-table-column
          field="created_at"
          label="Creation Date"
          sortable
        >{{ $moment(props.row.created_at).format('LLLL') }}</b-table-column>
        <b-table-column
          field="updated_at"
          label="Updation Date"
          sortable
        >{{ $moment(props.row.created_at).format('LLLL') }}</b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import EditUserModal from '~/components/superuser/EditUserModal'
import AddUserModal from '~/components/superuser/AddUserModal'

export default {
  head() {
    return {
      title: 'Admin | The Millennials Press Admin',
      meta: [
        {
          hid: 'Admin ',
          name: 'Admin',
          content: 'Admin | The Millennials Press Admin',
        },
      ],
    }
  },
  data() {
    return {
      page: 1,
      total: 0,
      perPage: 10,
      loading: false,
      data: [],
    }
  },
  methods: {
    async getUsers() {
      try {
        const res = await this.$axios.$get(`newsletter?page=${this.page}`)
        this.data = res.results
        this.total = res.count
      } catch {
        this.$store.dispatch('toaster/Toast', {
          message: 'Some Error',
          type: 'is-danger',
        })
      }
    },
    onPageChange(page) {
      this.page = page

      this.getUsers()
    },
  },
  mounted() {
    this.getUsers()
  },
}
</script>

