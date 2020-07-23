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
        >Add Admin</b-button
      >
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
        <b-table-column label="#">
          {{ props.index + 1 }}
        </b-table-column>
        <b-table-column field="email" label="email" sortable>
          {{ props.row.email }}
        </b-table-column>
        <b-table-column field="last_login" label="Last Login" sortable>
          {{ $moment(props.row.last_login).format('LLLL') }}
        </b-table-column>
        <b-table-column field="is_active" label="Active">
          <b-switch
            v-model="props.row.is_active"
            @input="ChangeStatus(props.row.is_active, props.row.user_id)"
          >
          </b-switch>
        </b-table-column>
        <b-table-column label="Edit">
          <span>
            <b-button
              type="is-primary"
              icon-right="pencil"
              @click="EditUser(props.index)"
            />
          </span>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import toast from '~/mixins/toast'
import EditUserModal from '~/components/superuser/EditUserModal'
import AddUserModal from '~/components/superuser/AddUserModal'

export default {
  mixins: [toast],
  data() {
    return {
      page: 1,
      total: 0,
      perPage: 10,
      loading: false,
      data: []
    }
  },
  methods: {
    async getUsers() {
      await this.$axios
        .$get(`getUsers?page=${this.page}`)
        .then(res => {
          this.data = res.results
          this.total = res.count
          console.log('resss====>', res)
        })
        .catch()
    },
    onPageChange(page) {
      this.page = page

      this.getUsers()
    },
    ChangeStatus(value, id) {
      this.$axios
        .$post(`editsuperuser?q=${id}`, {
          is_active: value
        })
        .then(res => {
          this.Toast({ message: 'Success', type: 'is-success' })
        })
        .catch(error => {
          this.Toast({ message: 'Error', type: 'is-danger' })
        })
    },
    EditUser(id) {
      this.$buefy.modal.open({
        parent: this,
        component: EditUserModal,
        hasModalCard: true,
        props: this.data[id],
        events: { refreshdata: this.getUsers },
        customClass: 'custom-class custom-class-2',
        trapFocus: true
      })
    },
    AddUser() {
      this.$buefy.modal.open({
        parent: this,
        component: AddUserModal,
        hasModalCard: true,
        events: { refreshdata1: this.getUsers },
        customClass: 'custom-class custom-class-2',
        trapFocus: true
      })
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

