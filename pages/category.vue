<template>
  <div>
    <div class="has-text-right has-text-centered-mobile">
      <b-button
        type="is-success"
        icon-size="is-medium"
        size="is-large"
        icon-left="plus"
        style="margin: 0px 30px 30px;"
        @click="AddCardModal()"
        >Add</b-button
      >
    </div>
    <section>
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
                  <small>@{{ props.row.slug }}</small>

                  <br />{{ props.row.description }}
                </p>
              </div>
              <div class="media-right">
                <span>
                  <b-button
                    type="is-danger"
                    icon-right="trash-can-outline"
                    @click="deleteCategory(props.row.id)"
                  />
                </span>
              </div>
            </div>
          </article>
        </template>
      </b-table>
    </section>
  </div>
</template>

<script>
import CategoryEditForm from '../components/category/editCategory.vue'
import AddCategoryForm from '../components/category/addCategory.vue'
import toast from '../mixins/toast.js'

export default {
  components: {
    CategoryEditForm,
    AddCategoryForm
  },
  mixins: [toast],
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
    async deleteCategory(cat) {
      try {
        await this.$axios.$post('deletecategory', {
          cat: cat
        })
        this.loadCategory()
this.$store.dispatch('Toast',{message:'Sucessfully deleted'});
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
    }
  },
  mounted() {
    this.loadCategory()
  }
}
</script>
