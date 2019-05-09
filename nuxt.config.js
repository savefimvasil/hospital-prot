const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  router: {
    middleware: 'root-protect'
  },
  loading: { color: '#fff' },
  css: [
    '~/assets/style/app.styl'
  ],
  plugins: [
    '@/plugins/vuetify',
    {src: '~/plugins/firebase', ssr: false },
    {src: '~/plugins/setUser', ssr: false }
  ],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    extend(config, ctx) {
    }
  }
}
