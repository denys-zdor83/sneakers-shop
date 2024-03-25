import App from './App.vue'
import { i18n } from './plugins/i18n'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createGlobalLoader } from "@loader-worker"
import router from './router'
import Toast, { type PluginOptions } from "vue-toastification"

// --- CSS
import './assets/main.css'
import "vue-toastification/dist/index.css"
// --- CSS

createGlobalLoader()
const options: PluginOptions = {
  timeout: 5000,
  icon: false,
};

const app = createApp(App)
app.use(router)
app.use(autoAnimatePlugin)
app.use(i18n)
app.use(Toast, options);
app.mount('#app')
