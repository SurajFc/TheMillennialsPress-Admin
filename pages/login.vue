<template>
  <section class="hero is-white is-fullheight">
    <div class="hero-body">
      <div class="container is-medium">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-6-desktop is-4-widescreen">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
  layout: 'blank',
  head() {
    return {
      title: 'Login | The Millennials Press Admin',
      meta: [
        {
          hid: 'Login',
          name: 'Login',
          content: 'Login | The Millennials Press Admin',
        },
      ],
    }
  },
  components: {
    LoginForm,
  },
}
</script>
