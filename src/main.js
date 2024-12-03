import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

// Vuetify

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components


const vuetify = createVuetify({
  components,
  directives,
  theme:{
    defaultTheme: 'dark'
  }
})

const app = createApp(App)
app.use(vuetify)
app.mount('#app')