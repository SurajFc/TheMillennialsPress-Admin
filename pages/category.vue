<template>
  <section style="margin-top: 20px;">
    <b-table
      :data="data"
      default-sort-direction="asc"
      :hoverable="true"
      :mobile-cards="hasMobileCards"
      detailed
      detail-key="id"
    >
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>
          {{ props.index + 1 }}
        </b-table-column>

        <b-table-column field="name" label="Name">
          {{ props.row.name }}
        </b-table-column>

        <!-- <b-table-column field="description" label="Descp" sortable>{{ props.row.descp }}</b-table-column> -->

        <b-table-column field="date" label="Date">
          <span class="tag is-success">
            {{ new Date(props.row.created_at).toLocaleDateString() }}
          </span>
        </b-table-column>

        <b-table-column field="edit" label="Edit">
          <span>
            <b-button
              type="is-primary"
              icon-right="pencil"
              @click="EditCardModal(props.index)"
            />
          </span>
        </b-table-column>
      </template>
      <template slot="detail" slot-scope="props">
        <article class="media">
          <figure class="media-left">
            <img
              :src="$imageURL + props.row.image"
              height="100px"
              width="100px"
            />
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ props.row.name }}</strong>
                <small>@{{ props.row.name }}</small>

                <br />Lorem ipsum dolor sit amet, ng elit. Proin ornare magna
                erestibulum ut. Maecenas non massa sem.
              </p>
            </div>
            <div class="media-right">
              <span>
                <b-button
                  type="is-danger"
                  icon-right="trash-can-outline"
                  @click="alertCustomError"
                />
              </span>
            </div>
          </div>
        </article>
      </template>
    </b-table>
    <div class="section has-text-centered">
      <b-button
        type="is-success"
        icon-size="is-medium"
        size="is-medium"
        icon-left="plus"
        @click="AddCardModal()"
        >Add</b-button
      >
    </div>
  </section>
</template>

<script>
import CategoryEditForm from '../components/category/editCategory.vue'
import AddCategoryForm from '../components/category/addCategory.vue'

export default {
  components: {
    CategoryEditForm,
    AddCategoryForm
  },
  data() {
    return {
      data: [],
      selected: null,
      isLoading: true,
      hasMobileCards: true
    }
  },
  methods: {
    async loadCategory() {
      try {
        const ip = await this.$axios.$get('category')
        this.data = ip
      } catch (error) {
        console.log(error)
      }
    },
    EditCardModal(id) {
      this.$buefy.modal.open({
        parent: this,
        component: CategoryEditForm,
        hasModalCard: true,
        props: this.data[id],
        events: { refreshdata: this.loadCategory },
        customClass: 'custom-class custom-class-2',
        trapFocus: true
      })
    },
    AddCardModal() {
      this.$buefy.modal.open({
        parent: this,
        component: AddCategoryForm,
        hasModalCard: true,
        events: { refreshdata1: this.loadCategory },
        customClass: 'custom-class custom-class-2',
        trapFocus: true
      })
    },
    alertCustomError() {
      this.$buefy.dialog.alert({
        title: 'Error',
        message: "You don't wanna do this",
        type: 'is-danger',
        hasIcon: true,
        icon: 'close-circle',

        ariaRole: 'alertdialog',
        ariaModal: true
      })
    }
  },
  mounted() {
    this.loadCategory()
  }
}
</script>
