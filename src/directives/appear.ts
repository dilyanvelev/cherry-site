import type { Directive } from 'vue'

export const vAppear: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    const delay = binding.value ?? 0

    el.classList.add('v-appear')
    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    )

    observer.observe(el)
  },
}
