import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './plugins/i18n'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import './assets/main.css'

const app = createApp(App)
app.use(autoAnimatePlugin)
app.use(i18n)
app.mount('#app')
