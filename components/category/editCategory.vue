<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <form action enctype="multipart/form-data" @submit.prevent="passes(saveCategory)">
      <div class="modal-card" style="width: auto;">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title">Edit Category</p>
        </header>
        <section class="modal-card-body">
          <ValidationProvider rules="required|min:3|max:20" name="Name" v-slot="{ errors, valid }">
            <b-field
              horizontal
              label="Name"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input type="text" v-model="formData.name" placeholder="Category Name" required></b-input>
            </b-field>
          </ValidationProvider>
          <ValidationProvider rules="min:10|max:50" name="description" v-slot="{ errors, valid }">
            <b-field
              horizontal
              label="Description"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input type="textarea" v-model="formData.description"></b-input>
            </b-field>
          </ValidationProvider>
          <ValidationProvider rules="image|size:1024" name="image" v-slot="{ errors, valid }">
            <b-field
              class="file"
              horizontal
              label="Image"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-upload v-model="file">
                <a class="button is-primary">
                  <b-icon icon="upload"></b-icon>
                  <span>Click to upload</span>
                </a>
              </b-upload>
              <div v-if="file">
                <span class="file-name">{{ file.name }}</span>
              </div>
              <div v-else>
                <figure class="image is-128x128">
                  <img :src="$imageURL + image" />
                </figure>
              </div>
            </b-field>
          </ValidationProvider>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button class="button is-primary" @click="saveCategory()">Save</button>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  props: ['name', 'description', 'image', 'id'],
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    return {
      file: null,
      formData: {
        cat: this.id,
        name: this.name,
        description: this.description,
      },
    }
  },
  methods: {
    async saveCategory() {
      const fd = new FormData()
      if (this.file) {
        fd.append('image', this.file, this.file.name)
        for (var key in this.formData) {
          fd.append(key, this.formData[key])
        }
      } else {
        for (var key in this.formData) {
          fd.append(key, this.formData[key])
        }
      }
      try {
        await this.$axios.$post('editcategory', fd)
        this.$emit('refreshdata')
        this.$parent.close()
        this.$store.dispatch('Toast', {
          message: 'Edit  Success',
          type: 'is-info',
        })
      } catch (error) {
        this.$store.dispatch('Toast', {
          message: 'Some Error',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>
<style scoped>
</style>