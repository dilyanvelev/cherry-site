<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()

const year = new Date().getFullYear()

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">

      <div class="footer__brand">
        <div class="footer__logo">
          <img src="/logo.png" alt="ЗП Дилян Велев" class="footer__logo-img" />
        </div>
        <p class="footer__tagline">{{ tr.footer.tagline }}</p>
      </div>

      <nav class="footer__nav" aria-label="Footer navigation">
        <span class="footer__col-heading">{{ tr.footer.navHeading }}</span>
        <a href="#home"      class="footer__nav-link" @click.prevent="scrollTo('home')">{{ tr.nav.home }}</a>
        <a href="#about"     class="footer__nav-link" @click.prevent="scrollTo('about')">{{ tr.nav.about }}</a>
        <a href="#varieties" class="footer__nav-link" @click.prevent="scrollTo('varieties')">{{ tr.nav.varieties }}</a>
        <a href="#orchards"  class="footer__nav-link" @click.prevent="scrollTo('orchards')">{{ tr.nav.orchards }}</a>
        <a href="#contact"   class="footer__nav-link" @click.prevent="scrollTo('contact')">{{ tr.nav.contact }}</a>
      </nav>

      <div class="footer__contact-col">
        <span class="footer__col-heading">{{ tr.footer.contactHeading }}</span>
        <a href="mailto:contact@zpdilyanvelev.bg" class="footer__contact-link">contact@zpdilyanvelev.bg</a>
        <a href="tel:+359000000000" class="footer__contact-link">+359 (0) 000 000 000</a>
        <p class="footer__contact-text">{{ tr.contact.locationValue }}</p>
      </div>

      <div class="footer__hours-col">
        <span class="footer__col-heading">{{ tr.footer.hoursHeading }}</span>
        <p class="footer__contact-text">{{ tr.footer.hoursValue }}</p>
        <a
          href="https://www.google.com/maps/search/Rakitnitsa,+Stara+Zagora,+Bulgaria"
          target="_blank"
          rel="noopener noreferrer"
          class="footer__maps-btn"
        >
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5C3.5 9.75 8 14.5 8 14.5s4.5-4.75 4.5-8.5A4.5 4.5 0 0 0 8 1.5z" stroke="currentColor" stroke-width="1.2"/>
            <circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.1"/>
          </svg>
          {{ tr.footer.mapsLink }}
        </a>
      </div>

    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <span>© {{ year }} {{ tr.footer.copyright }}</span>
        <span class="footer__divider">·</span>
        <span>{{ tr.footer.region }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #110d0b;
  color: rgba(255,255,255,0.60);
  font-size: 14px;
}

.footer__inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1.2fr;
  gap: 48px;
  padding-top: 64px;
  padding-bottom: 56px;
}

.footer__logo {
  margin-bottom: 18px;
}

.footer__logo-img {
  height: 80px;
  width: auto;
  border-radius: 12px;
  object-fit: contain;
}

.footer__tagline {
  font-size: 14px;
  line-height: 1.75;
  color: rgba(255,255,255,0.42);
  white-space: pre-line;
}

.footer__nav,
.footer__contact-col,
.footer__hours-col {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.footer__col-heading {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.32);
  margin-bottom: 4px;
}

.footer__nav-link,
.footer__contact-link {
  font-size: 14px;
  color: rgba(255,255,255,0.55);
  transition: color 0.2s;
}

.footer__nav-link:hover,
.footer__contact-link:hover { color: #fff; }

.footer__contact-text { font-size: 14px; color: rgba(255,255,255,0.45); }

.footer__maps-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  padding: 8px 14px;
  font-size: 12.5px;
  font-weight: 500;
  color: rgba(255,255,255,0.55);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius);
  transition: color 0.2s, border-color 0.2s;
}

.footer__maps-btn svg { width: 14px; height: 14px; }
.footer__maps-btn:hover { color: #fff; border-color: rgba(255,255,255,0.30); }

.footer__bottom { border-top: 1px solid rgba(255,255,255,0.07); }
.footer__bottom-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 13px;
  color: rgba(255,255,255,0.28);
}
.footer__divider { opacity: 0.4; }

@media (max-width: 900px) {
  .footer__inner { grid-template-columns: 1fr 1fr; gap: 36px; }
  .footer__brand { grid-column: 1 / -1; }
}

@media (max-width: 480px) {
  .footer__inner { grid-template-columns: 1fr; }
  .footer__bottom-inner { flex-direction: column; gap: 4px; align-items: flex-start; }
  .footer__divider { display: none; }
}
</style>
