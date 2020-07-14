<template>
  <div class="section" style="margin-top: -60px;">
    <p class="has-text-centered is-size-4 is-success">Add Articles</p>
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <form
        class="box"
        enctype="multipart/form-data"
        @submit.prevent="passes(saveArticle)"
      >
        <ValidationProvider
          rules="required|min:10|max:200"
          name="title"
          v-slot="{ errors, valid }"
        >
          <b-field
            vertical
            label="Title"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-input
              type="text"
              v-model="formData.title"
              placeholder="Article Title"
              required
            ></b-input>
          </b-field>
        </ValidationProvider>
        <br />
        <ValidationProvider rules="required" name="Category">
          <b-field
            horizontal
            label="Category"
            slot-scope="{ errors, valid }"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            custom-class="has-text-left"
          >
            <b-select
              placeholder="Select Category"
              expanded
              v-model="formData.category"
            >
              <option value="">None</option>
              <option
                v-for="option in categories"
                :value="option.id"
                :key="option.id"
                >{{ option.name }}
              </option></b-select
            >
          </b-field>
        </ValidationProvider>
        <br />
        <ValidationProvider
          rules="required"
          v-slot="{ errors, valid }"
          name="Tags"
        >
          <b-field
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
            label="Tags"
            horizontal
            custom-class="has-text-left"
          >
            <template slot="label">
              Tags
              <b-tooltip type="is-dark" label="Each Tag max length is 20">
                <b-icon size="is-small" icon="help-circle-outline"></b-icon>
              </b-tooltip>
            </template>
            <b-taginput
              ellipsis
              maxlength="20"
              maxtags="20"
              icon="label"
              has-counter
              type="is-secondary"
              rounded
              v-model="formData.tags"
              placeholder="Add a tag (max 20)"
            >
            </b-taginput>
          </b-field>
        </ValidationProvider>

        <br />
        <b-field
          class="file"
          horizontal
          label="Cover"
          custom-class="has-text-left"
        >
          <template slot="label">
            Cover
            <b-tooltip type="is-dark" label="Image should be less than 1Mb">
              <b-icon size="is-small" icon="help-circle-outline"></b-icon>
            </b-tooltip>
          </template>
          <picture-input
            ref="pictureInput"
            required
            width="800"
            height="300"
            margin="16"
            accept="image/jpeg,image/png"
            size="1"
            :alertOnError="true"
            button-class="button is-primary"
            :custom-strings="{
              upload: '<h1>Bummer!</h1>',
              drag: 'Drag a 😺 photo or GTFO',
            }"
            @change="onChange"
          >
          </picture-input>
        </b-field>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

// import toast from '../../mixins/toast.js'
export default {
  name: 'AddArticle',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      categories: [],
      formData: {
        title: '',
        cover: null,
        category: '',
        tags: []
      }
    }
  },
  methods: {
    async getCategories() {
      try {
        const ip = await this.$axios.$get('category')
        this.categories = ip
      } catch (error) {
        console.log(error)
      }
    },
    saveArticle() {},
    onChange(image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.formData.cover = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  },
  mounted() {
    this.getCategories()
  }
}
</script>
