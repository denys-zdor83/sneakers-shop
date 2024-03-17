import { createI18n } from 'vue-i18n'
import { EN_LOCALE } from './locales/en/index.js'

export const i18n = createI18n({
  locale: 'en',
  messages: {
    en: EN_LOCALE,
  }
})