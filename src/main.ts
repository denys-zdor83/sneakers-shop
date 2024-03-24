import App from './App.vue'
import { i18n } from './plugins/i18n'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createGlobalLoader } from "@loader-worker";
import router from './router'

import './assets/main.css'

createGlobalLoader()

const app = createApp(App)
app.use(router)
app.use(autoAnimatePlugin)
app.use(i18n)
app.mount('#app')
