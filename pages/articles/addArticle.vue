<template>
  <div class="section" style="margin-top: -60px;">
    <p class="has-text-centered is-size-4 is-success">Add Articles</p>
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <form class="box" enctype="multipart/form-data" @submit.prevent="passes(saveArticle)">
        <ValidationProvider rules="required|min:20|max:500" name="title" v-slot="{ errors, valid }">
          <b-field
            vertical
            label="Title"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-input type="text" v-model="formData.title" placeholder="Article Title"></b-input>
          </b-field>
        </ValidationProvider>
        <br />
        <ValidationProvider rules="required|max:500" name="subtitle" v-slot="{ errors, valid }">
          <b-field
            horizontal
            label="SubTitle"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
            custom-class="has-text-left"
          >
            <b-input type="text" v-model="formData.subtitle" placeholder="SubTitle"></b-input>
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
            <b-select placeholder="Select Category" v-model="formData.category">
              <option value>None</option>
              <option
                v-for="option in categories"
                :value="option.id"
                :key="option.id"
              >{{ option.name }}</option>
            </b-select>
          </b-field>
        </ValidationProvider>
        <br />
        <ValidationProvider rules="required" v-slot="{ errors, valid }" name="Tags">
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
            ></b-taginput>
          </b-field>
        </ValidationProvider>

        <br />
        <b-field class="file" label="Cover" horizontal custom-class="has-text-left">
          <b-upload v-model="cover" drag-drop>
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="cover">{{ cover.name }}</span>
        </b-field>
        <br />
        <div class="section">
          <ValidationProvider rules="required|min:500" name="Content" v-slot="{ errors, valid }">
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
                <p>
                  <b-icon type="is-success" icon="check-circle"></b-icon>
                </p>
              </div>
              <br />
            </b-field>
            <client-only>
              <quill-editor
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
        <b-field label="Publish Time" horizontal custom-class="has-text-left ">
          <b-datetimepicker
            style="width: 33%;"
            placeholder="Type or select a date..."
            icon="calendar-today"
            v-model="formData.realease"
            :min-datetime="minDatetime"
            :max-datetime="maxDatetime"
            position="is-top-right"
            :timepicker="{ hourFormat: '12' }"
          ></b-datetimepicker>
        </b-field>
        <ValidationProvider rules="required|min:5" name="author" v-slot="{ errors, valid }">
          <b-field
            horizontal
            label="Author"
            custom-class="has-text-left "
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-input
              type="text"
              v-model="formData.author_name"
              placeholder="author"
              style="width: 33%;"
            ></b-input>
          </b-field>
        </ValidationProvider>
        <br />
        <div class="field has-text-centered">
          <button class="button is-black" size="is-medium">Save</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

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

  ['emoji'],
]

export default {
  name: 'AddArticle',
  head() {
    return {
      title: 'ADD Article | The Millennials Press Admin',
      meta: [
        {
          hid: 'Add Article ',
          name: 'Add Article',
          content: 'Edit article | The Millennials Press Admin',
        },
      ],
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    const min = new Date()
    min.setDate(min.getDate() - 0)
    min.setHours(min.getHours())
    min.setMinutes(min.getMinutes())
    min.setSeconds(min.getSeconds())
    const max = new Date()
    max.setDate(max.getDate() + 7)
    max.setHours(18)
    max.setMinutes(0)
    max.setSeconds(0)

    return {
      categories: [],
      minDatetime: min,
      maxDatetime: max,
      cover: null,
      formData: {
        title: '',
        subtitle: '',
        category: '',
        tags: [],
        content: '<p>I am Example</p>',
        realease: new Date(),
        author_name: '',
      },
      editorOption: {
        // Some Quill options...
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: this.imageHandler,
            },
            imageResize: true,
            ImageResize: {
              displaySize: true,
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white',
              },
              modules: ['Resize', 'DisplaySize', 'Toolbar'],
            },
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
          },
          'emoji-toolbar': true,
          'emoji-textarea': true,
          'emoji-shortname': true,
        },
      },
    }
  },
  methods: {
    async getCategories() {
      try {
        const ip = await this.$axios.$get('category')
        this.categories = ip
      } catch (error) {}
    },
    async imageHandler() {
      const input = document.createElement('input')

      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()

      input.onchange = async () => {
        const file = input.files[0]
        if (file.size < 1048576) {
          const formData = new FormData()
          formData.append('image', file)
          formData.append('added_by', this.$auth.user[0].email)

          // Save current cursor state
          const range = this.$refs.editor.quill.getSelection(true)

          // Move cursor to right side of image (easier to continue typing)
          this.$refs.editor.quill.setSelection(range.index + 1)

          try {
            const res = await this.$axios.$post('article/images', formData)

            this.$refs.editor.quill.insertEmbed(
              range.index,
              'image',
              `${this.$imageURL}${res.image}`
            )

            this.$store.dispatch('toaster/Toast', {
              message: 'Image Uploaded Success',
              type: 'is-success',
            })
          } catch {
            this.$store.dispatch('toaster/Toast', {
              message: 'Some Error',
              type: 'is-danger',
            })
          } // API post, returns image
        } else {
          this.$store.dispatch('toaster/Toast', {
            message: 'Size of image should be less than 1 MB',
            type: 'is-danger',
          })
        }
        // location as string e.g. 'http://www.example.com/images/foo.png'
      }
    },

    async saveArticle() {
      this.formData.realease = this.$moment(this.formData.realease).format(
        'YYYY-MM-DD HH:mm'
      )
      const fd = new FormData()

      if (this.cover) {
        fd.append('cover', this.cover)
      }

      fd.append('user', this.$auth.user[0].email)
      for (var key in this.formData) {
        if (key == 'tags') {
          for (var i = 0; i < this.formData.tags.length; i++) {
            fd.append(key, this.formData.tags[i])
          }
        } else {
          fd.append(key, this.formData[key])
        }
      }

      try {
        await this.$axios.$post('addarticle', fd)
      } catch {
        // this.$store.dispatch('Toast', {
        //   message: 'Some Error',
        //   type: 'is-danger',mnsdf
        // })
      }
      this.$router.push('/articles/viewarticle')
      this.$store.dispatch('toaster/Toast', { message: 'Successfully Added' })
      this.$store.dispatch('FetchItems')
    },
    // onChange(image) {
    //   console.log('New picture selected!')
    //   if (image) {
    //     console.log('Picture loaded.')
    //     this.cover = image
    //   } else {
    //     console.log('FileReader API not supported: use the <form>, Luke!')
    //   }
    // },

    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
  },

  mounted() {
    this.getCategories()
  },
}
</script>
<style scoped>
.quill-editor {
  height: 500px;
  margin-bottom: 20px;
}
</style>