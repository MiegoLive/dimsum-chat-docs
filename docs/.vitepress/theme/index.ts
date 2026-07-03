import DefaultTheme from 'vitepress/theme'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import './index.css'
import WidgetUpdater from './components/WidgetUpdater.vue'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(vuetify)
    app.component('WidgetUpdater', WidgetUpdater)
  },
}