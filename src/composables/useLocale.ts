import { ref, computed } from 'vue'
import { translations, type Locale } from '@/i18n/translations'

const locale = ref<Locale>('bg')

export function useLocale() {
  const tr = computed(() => translations[locale.value])

  function toggle() {
    locale.value = locale.value === 'en' ? 'bg' : 'en'
  }

  return { locale, tr, toggle }
}
