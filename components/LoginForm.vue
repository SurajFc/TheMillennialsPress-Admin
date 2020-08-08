<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <h1 class="has-text-centered is-size-4">The Millenial Press</h1>
      <form class="box" @submit.prevent="passes(onSubmit)">
        <ValidationProvider rules="required|email" name="Email" v-slot="{ errors, valid }">
          <b-field
            label="Email"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <div class="control has-icons-left">
              <b-input type="email" placeholder="e.g. john@doe.com" v-model="email" required></b-input>
              <span class="icon is-small is-left">
                <b-icon icon="email" type="is-black"></b-icon>
              </span>
            </div>
          </b-field>
        </ValidationProvider>

        <ValidationProvider
          rules="min:6|max:40"
          vid="password"
          name="Password"
          v-slot="{ errors, valid }"
        >
          <b-field
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
              ></b-input>
              <span class="icon is-small is-left">
                <b-icon icon="lock" type="is-black"></b-icon>
              </span>
            </div>
          </b-field>
        </ValidationProvider>
        <br />
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <label for class="checkbox">
                <b-checkbox type="is-primary" />Remember me
              </label>
            </div>
            <div class="field has-text-right">
              <b-button class="forgot" @click="forgotPrompt()">Forgot Password?</b-button>
            </div>
          </div>
        </div>
        <div class="field has-text-centered">
          <button class="button is-black">Login</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ForgotPassword from '~/components/forgotPassword.vue'

export default {
  name: 'HomePage',
  layout: 'blank',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async onSubmit() {
      try {
        let response = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        this.$router.push('/')
      } catch {
        this.$store.dispatch('Toast', {
          message: 'Some Error',
          type: 'is-danger',
        })
      }
    },
    forgotPrompt() {
      this.$buefy.modal.open({
        parent: this,
        component: ForgotPassword,
        hasModalCard: true,

        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      })
    },
  },
  mounted() {
    if (this.$cookies.get('auth._token.local')) {
      this.onSubmit()
    } else {
    }
  },
}
</script>
<style scoped>
.forgot {
  background: none !important;
  border: none;
  padding: 0 !important;

  /*input has OS specific font-family*/
  color: #069;
  text-decoration: none;
  cursor: pointer;
}
</style>