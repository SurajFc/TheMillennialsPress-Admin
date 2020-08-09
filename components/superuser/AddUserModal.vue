<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <form action enctype="multipart/form-data" @submit.prevent="passes(saveUser)">
        <div class="modal-card" style="width: auto;">
          <header class="modal-card-head has-text-centered">
            <p class="modal-card-title">Edit User</p>
          </header>
          <section class="modal-card-body">
            <ValidationProvider rules="required|email" name="Email">
              <b-field
                slot-scope="{ errors, valid }"
                label="Email"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  type="email"
                  v-model="email"
                  readonly
                  onfocus="javascript: this.removeAttribute('readonly')"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider rules="required" vid="password" name="Password">
              <b-field
                slot-scope="{ errors, valid }"
                label="Password"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <div class="control has-icons-left">
                  <b-input
                    type="password"
                    v-model="password"
                    password-reveal
                    placeholder="*******"
                    required
                    autocomplete="off"
                  ></b-input>
                  <span class="icon is-small is-left">
                    <b-icon icon="lock" type="is-black"></b-icon>
                  </span>
                </div>
              </b-field>
            </ValidationProvider>

            <ValidationProvider rules="required|confirmed:password" name="Password Confirmation">
              <b-field
                slot-scope="{ errors, valid }"
                label="Confirm Password"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <div class="control has-icons-left">
                  <b-input
                    type="password"
                    v-model="confirmation"
                    password-reveal
                    placeholder="*******"
                    required
                    autocomplete="off"
                  ></b-input>
                  <span class="icon is-small is-left">
                    <b-icon icon="lock" type="is-black"></b-icon>
                  </span>
                </div>
              </b-field>
            </ValidationProvider>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">Close</button>
            <button class="button is-primary">Save</button>
          </footer>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>


<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      email: '',
      password: '',
      confirmation: '',
    }
  },
  methods: {
    async saveUser() {
      try {
        await this.$axios.$post('addsuperuser', {
          email: this.email,
          password: this.password,
        })

        this.$emit('refreshdata1')
        this.$store.dispatch('FetchItems')
        this.$parent.close()
        this.$store.dispatch('toaster/Toast')
      } catch {
        this.$store.dispatch('toaster/Toast', {
          message: 'Some Error',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>
