<script setup lang="ts">
import { computed, useId } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { locale, tr } = useLocale()

// The logo renders in both header and footer — ids must not collide
const uid = useId()
const ids = { ring: `${uid}-ring`, cherry: `${uid}-cherry`, leaf: `${uid}-leaf` }

const ringText = computed(() => tr.value.nav.brand.toLocaleUpperCase(locale.value))

// Circle the text runs along (r = 42), clockwise from 6 o'clock; the gap at the bottom holds the dot
const RING_RADIUS = 42
const RING_PATH = `M60 ${60 + RING_RADIUS} a${RING_RADIUS} ${RING_RADIUS} 0 1 1 0 ${-2 * RING_RADIUS} a${RING_RADIUS} ${RING_RADIUS} 0 1 1 0 ${2 * RING_RADIUS}`
const RING_GAP = 14
const RING_TEXT_LENGTH = 2 * Math.PI * RING_RADIUS - 2 * RING_GAP
</script>

<template>
  <svg class="brand-logo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <path :id="ids.ring" :d="RING_PATH" />
      <radialGradient :id="ids.cherry" cx=".34" cy=".3" r=".75">
        <stop offset="0" stop-color="#F0596C" />
        <stop offset=".4" stop-color="#B01E36" />
        <stop offset="1" stop-color="#4A0712" />
      </radialGradient>
      <linearGradient :id="ids.leaf" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#6E8F4E" />
        <stop offset="1" stop-color="#2F4722" />
      </linearGradient>
    </defs>

    <circle class="brand-logo__ring" cx="60" cy="60" r="58.5" />
    <circle class="brand-logo__ring brand-logo__ring--inner" cx="60" cy="60" r="35" />

    <text class="brand-logo__text" :lang="locale">
      <textPath :href="`#${ids.ring}`" :startOffset="RING_GAP" :textLength="RING_TEXT_LENGTH" lengthAdjust="spacing">
        {{ ringText }}
      </textPath>
    </text>
    <circle class="brand-logo__dot" cx="60" :cy="60 + RING_RADIUS - 4" r="2.2" />

    <g transform="translate(60 58) scale(.82) translate(-60 -60)">

      <path d="M63 37 C58 48 52 58 48 67" class="brand-logo__stem" />
      <path d="M63 37 C67 49 70 61 72 70" class="brand-logo__stem" />
      <path d="M63 37 C69 29 77 28 82 31 C77 38 69 40 63 37 Z" :fill="`url(#${ids.leaf})`" />
      <circle cx="47" cy="76" r="11" :fill="`url(#${ids.cherry})`" />
      <circle cx="72" cy="79" r="11" :fill="`url(#${ids.cherry})`" />
      <ellipse cx="43.5" cy="72" rx="3" ry="1.8" fill="#fff" opacity=".45" transform="rotate(-30 43.5 72)" />
      <ellipse cx="68.5" cy="75" rx="3" ry="1.8" fill="#fff" opacity=".45" transform="rotate(-30 68.5 75)" />
    </g>
  </svg>
</template>

<style scoped lang="scss">
@use '@/design/tokens' as *;

// Ink follows the parent's `color`, so the mark works on any zone
.brand-logo {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;

  &__ring {
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;

    &--inner {
      stroke-opacity: 0.35;
      stroke-width: 1;
    }
  }

  &__text {
    font-family: $sans;
    font-size: 15px;
    font-weight: 600;
    fill: currentColor;
  }

  &__dot {
    fill: $burla;
  }

  &__stem {
    fill: none;
    stroke: $kora;
    stroke-width: 2;
    stroke-linecap: round;
  }
}
</style>
