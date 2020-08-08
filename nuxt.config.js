export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || 'The Millennials Press',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          process.env.npm_package_description ||
          'Admin site of the Millennials',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  },
  loading: {
    color: 'green',
    height: '5px',
    throttle: 0,
  },

  loadingIndicator: {
    name: 'chasing-dots',
    color: '#3B8070',
    background: 'white',
  },

  /*
   ** Global CSS
   */
  css: [
    '~assets/css/global.scss',

    'quill/dist/quill.core.css',
    // for snow theme
    'quill/dist/quill.snow.css',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/vee-validate.js',
    '~/plugins/imageurl.js',
    // {src:'~/plugins/vue-picture-input',ssr:false},
    {
      src: '~plugins/nuxt-quill-plugin',
      ssr: false,
    },
    '~/plugins/axios',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/dotenv'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'nuxt-moment',
    'cookie-universal-nuxt',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.server_url,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
  },

  router: {
    middleware: ['auth'],
    base: '/news/',
  },

  auth: {
    localStorage: false,
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        maxAge: 2592000, //30days
        expires: 30,
      },
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: '/logout',
            method: 'post',
          },
          user: {
            url: '/user',
            method: 'get',
            propertyName: 'data',
          },
        },
        tokenRequired: true,
        tokenType: 'Token',
        globalToken: true,
        autoFetchUser: true,
      },
    },
  },
}
