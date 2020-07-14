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
          vertical
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
            width="600"
            height="350"
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
        <br />
        <div class="section" style="max-height: 400px; overflow: auto;">
          <ValidationProvider
            rules="required|min:1000"
            name="Content"
            v-slot="{ errors, valid }"
          >
            <b-field
              horizontal
              label="Content"
              :type="{ 'is-danger': errors, 'is-success': valid }"
              custom-class="has-text-left "
            >
              <div v-if="errors[0]" class="has-text-centered">
                <p>
                  <b-icon type="is-danger" icon="close-circle"></b-icon>
                  <span class="has-text-danger">{{ errors[0] }}</span>
                </p>
              </div>
              <div v-if="valid">
                <p><b-icon type="is-success" icon="check-circle"></b-icon></p>
              </div>
              <br />
            </b-field>
            <client-only>
              <quill-editor
                class="editor"
                v-model="formData.content"
                :options="editorOption"
                ref="editor"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
            </client-only>
            <div></div>
          </ValidationProvider>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import toast from '../mixins/toast.js'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],

  [{ font: [] }],
  [{ align: [] }],
  ['clean'],
  ['link', 'image', 'video', 'formula'],

  ['emoji']
]

export default {
  name: 'AddArticle',
  mixins: [toast],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  // head: {
  //   script: [
  //     { src: '/node_modules/quill-image-resize-module/image-resize.min.js' }
  //   ]
  // },
  data() {
    return {
      categories: [],

      formData: {
        title: '',
        cover: null,
        category: '',
        tags: [],
        content: '<p>I am Example</p>'
      },
      editorOption: {
        // Some Quill options...
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: this.imageHandler
            },
            ImageResize: {}
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          'emoji-toolbar': true,
          'emoji-textarea': true,
          'emoji-shortname': true
        }
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
    imageHandler() {
      const input = document.createElement('input')

      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('added_by', this.$auth.user[0].email)

        // Save current cursor state
        const range = this.$refs.editor.quill.getSelection(true)

        console.log('here')

        // Move cursor to right side of image (easier to continue typing)
        this.$refs.editor.quill.setSelection(range.index + 1)

        await this.$axios
          .$post('article/images', formData)
          .then(res => {
            this.$refs.editor.quill.insertEmbed(
              range.index,
              'image',
              `${this.$imageURL}${res.image}`
            )
            this.Toast({
              message: 'Image Uploaded Success',
              type: 'is-success'
            })
          })
          .catch(e => {
            this.Toast({
              message: 'Some Error. Pls Try Again',
              type: 'is-danger'
            })
          }) // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
      }
    },

    saveArticle() {},
    onChange(image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.formData.cover = image
      } else {
        // console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    }
  },

  mounted() {
    this.getCategories()
  }
}
</script>
<style scoped lang="scss">
.container {
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
  .editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
</style>