<template>
  <div>
    <div class="has-text-right has-text-centered-mobile">
      <b-button
        type="is-success"
        icon-size="is-medium"
        size="is-large"
        icon-left="plus"
        style="margin: 0px 30px 30px;"
        @click="AddUser()"
      >Add Admin</b-button>
    </div>
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
          field="last_login"
          label="Last Login"
          sortable
        >{{ $moment(props.row.last_login).format('LLLL') }}</b-table-column>
        <b-table-column field="is_active" label="Active">
          <b-switch
            v-model="props.row.is_active"
            @input="ChangeStatus(props.row.is_active, props.row.user_id)"
          ></b-switch>
        </b-table-column>
        <b-table-column label="Edit">
          <span>
            <b-button type="is-primary" icon-right="pencil" @click="EditUser(props.index)" />
          </span>
        </b-table-column>
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
        const res = await this.$axios.$get(`getUsers?page=${this.page}`)
        this.data = res.results
        this.total = res.count
      } catch {
        this.$store.dispatch('Toast', {
          message: 'Some Error',
          type: 'is-danger',
        })
      }
    },
    onPageChange(page) {
      this.page = page

      this.getUsers()
    },
    async ChangeStatus(value, id) {
      try {
        const res = await this.$axios.$post(`editsuperuser?q=${id}`, {
          is_active: value,
        })
        this.$store.dispatch('Toast')
      } catch {
        this.$store.dispatch('Toast', {
          message: 'Some Error',
          type: 'is-danger',
        })
      }
    },
    EditUser(id) {
      this.$buefy.modal.open({
        parent: this,
        component: EditUserModal,
        hasModalCard: true,
        props: this.data[id],
        events: { refreshdata: this.getUsers },
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      })
    },
    AddUser() {
      this.$buefy.modal.open({
        parent: this,
        component: AddUserModal,
        hasModalCard: true,
        events: { refreshdata1: this.getUsers },
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      })
    },
  },
  mounted() {
    this.getUsers()
  },
}
</script>

