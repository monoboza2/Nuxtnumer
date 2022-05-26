// const { resolve } = require('path')
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nuxtnumer',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['katex/dist/katex.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    './plugins/katex.client.js',
    { src: '~/plugins/chart.js', mode: 'client' },
    { src: './plugins/evalexpress.js', mode: 'client' },
    { src: '~/plugins/scatter.js', mode: 'client' },
    './plugins/myGlobal.js',
    './plugins/vuetify.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/vuetify'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxt/http'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['katex', 'vue-katex'],
    babel: { compact: true },
  },
  extend(config, ctx) {
    config.resolve.alias.vue = 'vue/dist/vue.common'
  },

  // rootDir: resolve(__dirname, '..'),
  // buildDir: resolve(__dirname, '.nuxt'),
  // srcDir: __dirname,
  // jsonApi: {
  //   baseURL: 'http://localhost:3005/jsonapi',
  //   // @deprecated since version 0.1.0
  //   baseUrl: 'http://localhost:3005/jsonapi'
  // }

}
