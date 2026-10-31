<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import BrandLogo from '@/components/BrandLogo.vue'
import { EMAIL, MAPS_URL } from '@/site'

const { tr, phoneHref } = useLocale()

const year = new Date().getFullYear()

const navLinks = computed(() => [
  { id: 'about', label: tr.value.nav.about },
  { id: 'varieties', label: tr.value.nav.varieties },
  { id: 'juice', label: tr.value.nav.juice },
  { id: 'contact', label: tr.value.nav.contact },
])

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <div class="footer__main">
      <div class="footer__brand">
        <span class="footer__logo">
          <BrandLogo />
        </span>
        <p class="footer__tagline">{{ tr.footer.tagline }}</p>
      </div>

      <nav class="footer__col" :aria-label="tr.footer.navLabel">
        <p class="footer__heading">{{ tr.footer.navHeading }}</p>
        <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" class="footer__link" @click.prevent="scrollTo(link.id)">{{ link.label }}</a>
      </nav>

      <div class="footer__col">
        <p class="footer__heading">{{ tr.footer.contactHeading }}</p>
        <a class="footer__phone" :href="phoneHref">{{ tr.nav.phone }}</a>
        <a class="footer__link" :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
        <p class="footer__text">{{ tr.contact.locationValue }}</p>
        <a class="footer__link footer__link--small" :href="MAPS_URL" target="_blank" rel="noopener noreferrer">
          {{ tr.footer.mapsLink }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </div>

    <div class="footer__bottom">
      <span>© {{ year }} {{ tr.footer.copyright }} · {{ tr.footer.place }}</span>
      <a href="#home" class="footer__top" @click.prevent="scrollTo('home')">
        {{ tr.footer.toTop }}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
          <path d="M12 20V5M6 11l6-6 6 6" />
        </svg>
      </a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/design/tokens' as *;

$muted: rgba(236, 238, 231, 0.72);

// The dark close after the last colour zone
.footer {
  padding: 80px $gutter 32px;
  font-family: $sans;
  color: $varosano;
  background: $bing;

  @media (max-width: $bp-tablet) {
    padding: 72px $gutter-tablet 28px;
  }

  @media (max-width: $bp-phone) {
    padding: 56px $gutter-phone 24px;
  }

  a {
    @include focus-ring($varosano);
  }

  &__main {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 3fr) minmax(0, 4fr);
    gap: 48px 56px;
    padding-bottom: 56px;

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: $bp-phone) {
      grid-template-columns: minmax(0, 1fr);
      gap: 40px;
      padding-bottom: 40px;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;

    @media (max-width: 900px) {
      grid-column: 1 / -1;
    }
  }

  &__logo {
    display: block;
    width: 84px;
    height: 84px;
  }

  &__tagline {
    margin: 0;
    font-family: $display;
    font-weight: 800;
    font-size: clamp(28px, 2.6vw, 38px);
    line-height: 1;
    white-space: pre-line;
  }

  &__col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  &__heading {
    margin: 0 0 6px;
    @include mono-label;
    font-size: 11px;
    color: $muted;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    overflow-wrap: anywhere;
    transition: color 0.2s;

    &:hover {
      color: $etiket;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    &--small {
      margin-top: 4px;
      @include mono-label;
      font-size: 11px;
    }
  }

  &__phone {
    font-family: $display;
    font-weight: 900;
    font-size: 34px;
    line-height: 1;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 6px;
  }

  &__text {
    margin: 0;
    font-size: 16px;
    color: $muted;
  }

  &__bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px 24px;
    padding-top: 22px;
    border-top: 1px solid rgba(236, 238, 231, 0.22);
    font-size: 14px;
    color: $muted;
  }

  &__top {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    @include mono-label;
    font-size: 11px;
    color: $varosano;

    svg {
      transition: transform 0.35s $ease-settle;
    }

    &:hover svg {
      transform: translateY(-3px);
    }
  }
}
</style>
