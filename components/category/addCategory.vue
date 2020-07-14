<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <form
      action
      class="box"
      enctype="multipart/form-data"
      @submit.prevent="passes(saveCategory)"
    >
      <div class="modal-card" style="width: auto;">
        <header class="modal-card-head has-text-centered">
          <p class="modal-card-title">Add Category</p>
        </header>
        <section class="modal-card-body">
          <ValidationProvider
            rules="required|min:3|max:20"
            name="Name"
            v-slot="{ errors, valid }"
          >
            <b-field
              horizontal
              label="Name"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="text"
                v-model="formData.name"
                placeholder="Category Name"
                required
              ></b-input>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            rules="required:min:10|max:50"
            name="description"
            v-slot="{ errors, valid }"
          >
            <b-field
              horizontal
              label="Description"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input type="textarea" v-model="formData.description"></b-input>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            rules="required|image|size:1024"
            name="image"
            v-slot="{ errors, valid }"
          >
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
            </b-field>
          </ValidationProvider>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">
            Close
          </button>
          <button class="button is-primary">Save</button>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import toast from '../../mixins/toast.js'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [toast],
  data() {
    return {
      file: null,
      formData: {
        name: this.name,
        description: this.description
      }
    }
  },
  methods: {
    async saveCategory() {
      const fd = new FormData()

      fd.append('image', this.file, this.file.name)
      for (var key in this.formData) {
        fd.append(key, this.formData[key])
      }
      console.log(fd)

      try {
        await this.$axios.$post('category', fd)
        this.$emit('refreshdata1')
        this.$parent.close()
        this.Toast({ message: 'Succesfully Added', type: 'is-success' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped>
</style>