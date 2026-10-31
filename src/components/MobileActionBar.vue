<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { tr, phoneHref } = useLocale()

// Shown once the hero's own CTAs have scrolled away; out of the way while the contact form or footer is on screen
const pastHero = ref(false)
const nearContact = ref(false)
let observer: IntersectionObserver | null = null

function onScroll() {
  pastHero.value = window.scrollY > window.innerHeight * 0.8
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  const visible = new Set<Element>()
  observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) visible.add(e.target)
      else visible.delete(e.target)
    }
    nearContact.value = visible.size > 0
  })
  for (const sel of ['#contact', 'footer']) {
    const el = document.querySelector(sel)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <nav :class="['action-bar', { 'is-shown': pastHero && !nearContact }]" :aria-label="tr.nav.quickActions">
    <a class="action-bar__btn action-bar__btn--call" :href="phoneHref">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
      </svg>
      {{ tr.nav.callShort }}
    </a>
    <a class="action-bar__btn action-bar__btn--order" href="#contact" @click.prevent="scrollTo('contact')">
      {{ tr.nav.orderShort }}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  </nav>
</template>

<style scoped lang="scss">
@use '@/design/tokens' as *;

// Phones only: traders browse on the phone and the call is the real conversion
.action-bar {
  display: none;

  @media (max-width: $bp-phone) {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 150;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 10px $gutter-phone calc(10px + env(safe-area-inset-bottom));
    border-top: $rule;
    background: $varosano;
    transform: translateY(110%);
    transition: transform 0.35s $ease-settle;
    // Off-screen bar must not catch focus or taps
    visibility: hidden;

    &.is-shown {
      transform: none;
      visibility: visible;
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 50px;
    border-radius: $radius;
    font-family: $sans;
    font-size: 16px;
    font-weight: 600;

    @include focus-ring;

    &--call {
      color: $etiket;
      background: $burla;
    }

    &--order {
      color: $bing;
      border: $rule;
    }
  }
}
</style>
