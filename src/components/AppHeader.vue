<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { locale, tr, toggle } = useLocale()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('home')

const sectionIds = ['home', 'about', 'varieties', 'orchards', 'contact']

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
  <header :class="['header', { 'header--scrolled': isScrolled }]">
    <div class="container header__inner">

      <a href="#home" class="header__logo" @click.prevent="scrollTo('home')">
        <img src="/logo.png" alt="ЗП Дилян Велев" class="header__logo-img" />
      </a>

      <nav class="header__nav" aria-label="Main navigation">
        <a
          v-for="(label, id) in { home: tr.nav.home, about: tr.nav.about, varieties: tr.nav.varieties, orchards: tr.nav.orchards, contact: tr.nav.contact }"
          :key="id"
          :href="`#${id}`"
          :class="['header__nav-link', { 'is-active': activeSection === id }]"
          @click.prevent="scrollTo(id)"
        >{{ label }}</a>
      </nav>

      <div class="header__controls">
        <!-- Language toggle -->
        <button class="lang-toggle" :aria-label="`Switch to ${locale === 'en' ? 'Bulgarian' : 'English'}`" @click="toggle">
          <span :class="['lang-toggle__opt', { 'is-active': locale === 'bg' }]">БГ</span>
          <span class="lang-toggle__sep">/</span>
          <span :class="['lang-toggle__opt', { 'is-active': locale === 'en' }]">EN</span>
        </button>

        <a href="#contact" class="header__cta" @click.prevent="scrollTo('contact')">
          {{ tr.nav.cta }}
        </a>
      </div>

      <div class="header__mobile-controls">
        <button class="lang-toggle lang-toggle--mobile" :aria-label="`Switch language`" @click="toggle">
          <span :class="['lang-toggle__opt', { 'is-active': locale === 'bg' }]">БГ</span>
          <span class="lang-toggle__sep">/</span>
          <span :class="['lang-toggle__opt', { 'is-active': locale === 'en' }]">EN</span>
        </button>

        <button
          class="header__hamburger"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span :class="{ 'is-open': isMobileMenuOpen }"></span>
          <span :class="{ 'is-open': isMobileMenuOpen }"></span>
          <span :class="{ 'is-open': isMobileMenuOpen }"></span>
        </button>
      </div>

    </div>

    <nav :class="['header__mobile-nav', { 'is-open': isMobileMenuOpen }]" aria-label="Mobile navigation">
      <a
        v-for="(label, id) in { home: tr.nav.home, about: tr.nav.about, varieties: tr.nav.varieties, orchards: tr.nav.orchards, contact: tr.nav.contact }"
        :key="id"
        :href="`#${id}`"
        class="header__mobile-link"
        @click.prevent="scrollTo(id)"
      >{{ label }}</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  padding: 20px 0;
  transition: background 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease;
}

.header--scrolled {
  background: rgba(253, 252, 250, 0.96);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 13px 0;
  box-shadow: 0 1px 24px rgba(0, 0, 0, 0.08);
}

.header__inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
}

/* ── Logo ── */
.header__logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header__logo-img {
  height: 78px;
  width: auto;
  border-radius: 10px;
  object-fit: contain;
  transition: opacity 0.2s;
}

.header__logo:hover .header__logo-img { opacity: 0.85; }

/* ── Desktop nav ── */
.header__nav {
  display: flex;
  align-items: center;
  gap: 2px;
  justify-content: center;
}

.header__nav-link {
  padding: 6px 13px;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: var(--color-text);
  border-radius: var(--radius);
  transition: color 0.2s;
}

.header:not(.header--scrolled) .header__nav-link { color: rgba(255,255,255,0.75); }

.header__nav-link:hover,
.header__nav-link.is-active { color: var(--color-cherry); }

.header:not(.header--scrolled) .header__nav-link:hover,
.header:not(.header--scrolled) .header__nav-link.is-active { color: #fff; }

/* ── Controls (lang + CTA) ── */
.header__controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

/* ── Language toggle ── */
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 5px 8px;
  border-radius: var(--radius);
  transition: background 0.2s;
  cursor: pointer;
}

.lang-toggle:hover { background: rgba(255,255,255,0.10); }
.header--scrolled .lang-toggle:hover { background: rgba(0,0,0,0.05); }

.lang-toggle__opt {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.35);
  transition: color 0.2s;
}

.lang-toggle__opt.is-active { color: rgba(255,255,255,0.90); }

.header--scrolled .lang-toggle__opt { color: rgba(0,0,0,0.30); }
.header--scrolled .lang-toggle__opt.is-active { color: var(--color-cherry); }

.lang-toggle__sep {
  font-size: 10px;
  color: rgba(255,255,255,0.20);
}
.header--scrolled .lang-toggle__sep { color: rgba(0,0,0,0.15); }

/* ── CTA button ── */
.header__cta {
  padding: 9px 20px;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  background: var(--color-cherry);
  border-radius: var(--radius);
  transition: background 0.2s, transform 0.15s;
}

.header__cta:hover {
  background: var(--color-cherry-dark);
  transform: translateY(-1px);
}

/* ── Mobile controls ── */
.header__mobile-controls {
  display: none;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.lang-toggle--mobile .lang-toggle__opt { color: rgba(255,255,255,0.40); }
.lang-toggle--mobile .lang-toggle__opt.is-active { color: rgba(255,255,255,0.90); }
.lang-toggle--mobile .lang-toggle__sep { color: rgba(255,255,255,0.15); }
.header--scrolled .lang-toggle--mobile .lang-toggle__opt { color: rgba(0,0,0,0.30); }
.header--scrolled .lang-toggle--mobile .lang-toggle__opt.is-active { color: var(--color-cherry); }
.header--scrolled .lang-toggle--mobile .lang-toggle__sep { color: rgba(0,0,0,0.15); }

/* ── Hamburger ── */
.header__hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 6px;
  background: none;
  border: none;
  cursor: pointer;
}

.header__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.25s ease;
  transform-origin: center;
}

.header--scrolled .header__hamburger span { background: var(--color-text); }

.header__hamburger span:nth-child(1).is-open { transform: rotate(45deg) translate(5px, 5px); }
.header__hamburger span:nth-child(2).is-open { opacity: 0; }
.header__hamburger span:nth-child(3).is-open { transform: rotate(-45deg) translate(5px, -5px); }

/* ── Mobile nav dropdown ── */
.header__mobile-nav {
  display: none;
  flex-direction: column;
  background: var(--color-warm-white);
  border-top: 1px solid var(--color-border);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.header__mobile-nav.is-open { max-height: 360px; }

.header__mobile-link {
  padding: 15px 32px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
  transition: color 0.2s, background 0.2s;
}

.header__mobile-link:last-child { border-bottom: none; }
.header__mobile-link:hover { color: var(--color-cherry); background: var(--color-cream); }

@media (max-width: 900px) {
  .header__nav,
  .header__controls {
    display: none;
  }
  .header__mobile-controls,
  .header__mobile-nav {
    display: flex;
  }
}
</style>
