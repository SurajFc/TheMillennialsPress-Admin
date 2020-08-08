<template>
  <div>
    <b-steps type="is-info" class="is-primary" mobile-mode="compact" :has-navigation="false">
      <b-step-item label="OTP Send" v-if="step==1" icon="account-key">
        <ValidationObserver ref="observer" v-slot="{ passes }">
          <form class="box" @submit.prevent="passes(sendOTP)">
            <div class="modal-card" style="width: auto;">
              <header class="modal-card-head has-text-centered">
                <p class="modal-card-title has-text-info">Forgot Password? No Worries</p>
              </header>
              <section class="modal-card-body">
                <ValidationProvider rules="required|email" name="Email" v-slot="{ errors, valid }">
                  <b-field
                    label="Email"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <div class="control has-icons-left">
                      <b-input
                        type="email"
                        placeholder="e.g. john@doe.com"
                        v-model="email"
                        required
                      ></b-input>
                      <span class="icon is-small is-left">
                        <b-icon icon="email" type="is-black"></b-icon>
                      </span>
                    </div>
                  </b-field>
                </ValidationProvider>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-primary">Send OTP</button>
                <!-- <b-button class="button has-text-right" type="button" @click="$parent.close()">Close</b-button> -->
              </footer>
            </div>
          </form>
        </ValidationObserver>
      </b-step-item>

      <b-step-item label="OTP" v-if="step==2" icon="numeric">
        <ValidationObserver ref="observer1" v-slot="{ passes }">
          <form class="box" @submit.prevent="passes(verifyOTP)">
            <div class="modal-card" style="width: auto;">
              <header class="modal-card-head has-text-centered">
                <p class="modal-card-title has-text-info">Enter OTP</p>
              </header>
              <section class="modal-card-body">
                <ValidationProvider rules="required|email" name="Email" v-slot="{ errors, valid }">
                  <b-field
                    label="Email"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <div class="control has-icons-left">
                      <b-input
                        type="email"
                        placeholder="e.g. john@doe.com"
                        v-model="email"
                        required
                        disabled
                      ></b-input>
                      <span class="icon is-small is-left">
                        <b-icon icon="email" type="is-black"></b-icon>
                      </span>
                    </div>
                  </b-field>
                </ValidationProvider>
                <ValidationProvider rules="required|digits:6" name="OTP" v-slot="{ errors, valid }">
                  <b-field
                    label="OTP"
                    :type="{ 'is-danger': errors[0], 'is-success': valid }"
                    :message="errors"
                  >
                    <div class="control has-icons-left">
                      <b-input type="number" placeholder="6 digit OTP" v-model="otp"></b-input>
                      <span class="icon is-small is-left">
                        <b-icon icon="numeric" type="is-black"></b-icon>
                      </span>
                    </div>
                  </b-field>
                </ValidationProvider>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-primary">Verify OTP</button>
              </footer>
            </div>
          </form>
        </ValidationObserver>
      </b-step-item>
      <b-step-item label="Verification" icon="check" v-if="step==3">
        <div class="modal-card">
          <header class="modal-card-head has-text-centered">
            <p class="modal-card-title">
              <b-icon icon="check-all" size="is-large" type="is-success"></b-icon>
            </p>
          </header>
          <section class="modal-card-body has-text-centered">
            <p>Account Verified</p>
            <p>A new password has been sent to your email</p>
          </section>
        </div>
      </b-step-item>
    </b-steps>
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
      step: 1,
      otp: '',
    }
  },
  methods: {
    sendOTP() {
      this.$axios
        .$post('forgot', {
          email: this.email,
        })
        .then((res) => {
          if (res['status'] == 1) {
            this.step = 2
            this.$store.dispatch('Toast', {
              message: 'OTP Send. Check your Email',
              type: 'is-success',
            })
          }
        })
        .catch((e) => {
          this.$store.dispatch('Toast', {
            message: 'Error No user Found',
            type: 'is-danger',
          })
        })
    },

    verifyOTP() {
      this.$axios
        .$post('verifyotp', {
          email: this.email,
          otp: this.otp,
        })
        .then((res) => {
          if (res['status'] == 1) {
            this.$store.dispatch('Toast', {
              message: 'OTP Verified',
              type: 'is-success',
            })
            this.step = 3
            this.newPass()
          }
        })
        .catch((e) => {
          this.$store.dispatch('Toast', {
            message: 'Wrong OTP',
            type: 'is-danger',
          })
        })
    },
    newPass() {
      this.$axios
        .$post('newpass', { email: this.email })
        .then((res) => {
          if (res['status'] == 1) {
            this.$store.dispatch('Toast', {
              message: 'New Password sent. Check your Email',
              type: 'is-success',
            })
          }
        })
        .catch((e) => {})
    },
  },
}
</script>

<style scoped>
</style>