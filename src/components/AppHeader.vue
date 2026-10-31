<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import BrandLogo from '@/components/BrandLogo.vue'

const { locale, tr, phoneHref, toggle } = useLocale()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('home')

const sectionIds = ['home', 'about', 'varieties', 'juice', 'contact']

const navLinks = computed(() => [
  { id: 'about', label: tr.value.nav.about },
  { id: 'varieties', label: tr.value.nav.varieties },
  { id: 'juice', label: tr.value.nav.juice },
  { id: 'contact', label: tr.value.nav.contact },
])

function handleScroll() {
  isScrolled.value = window.scrollY > 60
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const el = document.getElementById(sectionIds[i])
    if (el && window.scrollY >= el.offsetTop - 120) {
      activeSection.value = sectionIds[i]
      break
    }
  }
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  isMobileMenuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header :class="['header', { 'header--scrolled': isScrolled || isMobileMenuOpen }]">
    <div class="header__bar">
      <a href="#home" class="header__brand" :aria-label="tr.nav.homeLabel" @click.prevent="scrollTo('home')">
        <BrandLogo />
      </a>

      <nav class="header__nav" :aria-label="tr.nav.mainNav">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          :class="['header__nav-link', { 'is-active': activeSection === link.id }]"
          @click.prevent="scrollTo(link.id)"
        >{{ link.label }}</a>
      </nav>

      <div class="header__right">
        <a class="header__phone" :href="phoneHref">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
          </svg>
          {{ tr.nav.phone }}
        </a>

        <button class="lang-toggle" type="button" :aria-label="`Switch to ${locale === 'en' ? 'Bulgarian' : 'English'}`" @click="toggle">
          <span :class="['lang-toggle__opt', { 'is-active': locale === 'bg' }]" lang="bg">БГ</span>
          <span class="lang-toggle__sep" aria-hidden="true">/</span>
          <span :class="['lang-toggle__opt', { 'is-active': locale === 'en' }]">EN</span>
        </button>

        <button
          class="header__menu"
          type="button"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav"
          :aria-label="isMobileMenuOpen ? tr.nav.closeMenu : tr.nav.openMenu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg v-if="!isMobileMenuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <nav id="mobile-nav" :class="['header__mobile-nav', { 'is-open': isMobileMenuOpen }]" :aria-label="tr.nav.mainNav">
      <a
        v-for="link in navLinks"
        :key="link.id"
        :href="`#${link.id}`"
        class="header__mobile-link"
        @click.prevent="scrollTo(link.id)"
      >{{ link.label }}</a>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@use '@/design/tokens' as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  font-family: $sans;
  color: $bing;
  background: $varosano;
  border-bottom: $rule;
  transition: box-shadow 0.35s ease;

  &--scrolled {
    box-shadow: 0 10px 24px -18px rgba(36, 16, 15, 0.5);
  }

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: calc(var(--header-height) - 2px);
    padding: 0 $gutter;

    @media (max-width: $bp-tablet) {
      padding: 0 $gutter-tablet;
    }

    @media (max-width: $bp-phone) {
      padding: 0 $gutter-phone;
    }
  }

  &__brand {
    display: block;
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }

    @include focus-ring;

    @media (max-width: $bp-tablet) {
      width: 58px;
      height: 58px;
    }

    @media (max-width: $bp-phone) {
      width: 50px;
      height: 50px;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 34px;

    @media (max-width: $bp-tablet) {
      display: none;
    }
  }

  &__nav-link {
    position: relative;
    padding: 6px 0;
    font-size: 16px;
    font-weight: 500;
    transition: color 0.2s;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: $burla;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s $ease-settle;
    }

    &:hover,
    &.is-active {
      color: $burla;
    }

    &.is-active::after {
      transform: none;
    }

    @include focus-ring;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 22px;
  }

  &__phone {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    transition: color 0.2s;

    &:hover {
      color: $burla;
    }

    @include focus-ring;

    @media (max-width: $bp-phone) {
      display: none;
    }
  }

  &__menu {
    display: none;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: $rule;
    border-radius: $radius;
    color: $bing;

    @include focus-ring;

    @media (max-width: $bp-tablet) {
      display: inline-flex;
    }
  }

  &__mobile-nav {
    display: none;
    flex-direction: column;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;

    &.is-open {
      max-height: 360px;
      border-top: $rule;
    }

    @media (max-width: $bp-tablet) {
      display: flex;
    }
  }

  &__mobile-link {
    padding: 14px $gutter-tablet;
    font-family: $display;
    font-size: 28px;
    font-weight: 800;
    border-bottom: 1px dotted rgba(36, 16, 15, 0.35);
    transition: color 0.2s;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: $burla;
    }

    @include focus-ring;

    @media (max-width: $bp-phone) {
      padding: 12px $gutter-phone;
    }
  }
}

.lang-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  color: $kora;
  @include mono-label;
  font-size: 13px;

  &__opt.is-active {
    color: $bing;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }

  @include focus-ring;
}
</style>
