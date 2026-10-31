import { ref, computed, watchEffect } from 'vue'
import { translations, type Locale } from '@/i18n/translations'

const locale = ref<Locale>('bg')

// Keeps <html lang>, the tab title and the meta description in sync with the language.
// lang="bg" also switches Sofia Sans to its Bulgarian Cyrillic forms.
watchEffect(() => {
  const { seo } = translations[locale.value]
  document.documentElement.lang = locale.value
  document.title = seo.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description)
})

export function useLocale() {
  const tr = computed(() => translations[locale.value])
  // "0894 600 985" → "tel:+359894600985"
  const phoneHref = computed(() => `tel:+359${tr.value.nav.phone.replace(/\s/g, '').replace(/^0/, '')}`)

  function toggle() {
    locale.value = locale.value === 'en' ? 'bg' : 'en'
  }

  return { locale, tr, phoneHref, toggle }
}
