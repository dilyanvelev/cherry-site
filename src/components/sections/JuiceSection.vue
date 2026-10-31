<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="juice" class="juice" aria-labelledby="juice-title">
    <div class="juice__text">
      <p class="juice__kicker">{{ tr.juice.label }}</p>
      <h2 id="juice-title" class="juice__title">
        <span v-for="(line, i) in tr.juice.headingLines" :key="line" :class="{ 'juice__accent': i === tr.juice.headingLines.length - 1 }">{{ line }}{{ " " }}</span>
      </h2>
      <p class="juice__body">{{ tr.juice.body1 }}</p>

      <!-- Reads like the ingredients panel on the pack -->
      <dl class="juice__facts">
        <div v-for="fact in tr.juice.facts" :key="fact.k" class="juice__fact">
          <dt>{{ fact.k }}</dt>
          <dd>{{ fact.v }}</dd>
        </div>
      </dl>

      <p class="juice__body juice__body--muted">{{ tr.juice.body2 }}</p>
      <a class="juice__link" href="#contact" @click.prevent="scrollTo('contact')">
        {{ tr.juice.cta }}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>

    <!-- Two prints laid on the table: the product, and the fruit it comes from -->
    <div class="juice__prints">
      <img class="juice__print juice__print--main" src="/gallery/juice-packages.jpg" width="768" height="1024" :alt="tr.juice.photoAlt" loading="lazy" decoding="async" />
      <img class="juice__print juice__print--small" src="/gallery/cherries-hand.jpg" width="665" height="1182" :alt="tr.juice.handAlt" loading="lazy" decoding="async" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/design/tokens' as *;

.juice {
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  align-items: center;
  gap: 56px 88px;
  padding: 120px $gutter 128px;
  font-family: $sans;
  color: $bing;
  background: $varosano;

  @media (max-width: $bp-tablet) {
    gap: 48px 56px;
    padding: 96px $gutter-tablet 104px;
  }

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: $bp-phone) {
    padding: 72px $gutter-phone 80px;
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
    max-width: 600px;
  }

  &__kicker {
    margin: 0;
    @include mono-label;
    color: $kora;
  }

  &__title {
    margin: 0 0 8px;
    font-family: $display;
    font-weight: 900;
    font-size: clamp(54px, 5.6vw, 92px);
    line-height: 0.88;
    letter-spacing: -0.005em;

    span {
      display: block;
    }
  }

  &__accent {
    color: $burla;
  }

  &__body {
    margin: 0;
    max-width: 52ch;
    font-size: 18px;
    line-height: 1.65;

    &--muted {
      color: $kora;
    }
  }

  &__facts {
    width: 100%;
    max-width: 460px;
    margin: 6px 0;
    border-top: $rule;
    border-bottom: $rule;
  }

  &__fact {
    display: grid;
    grid-template-columns: 130px minmax(0, 1fr);
    align-items: baseline;
    gap: 16px;
    padding: 9px 0 8px;

    & + & {
      border-top: 1px dotted rgba(36, 16, 15, 0.35);
    }

    dt {
      @include mono-label;
      font-size: 11px;
      color: $kora;
    }

    dd {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 6px;
    padding-bottom: 4px;
    border-bottom: $rule;
    font-size: 17px;
    font-weight: 600;
    transition: color 0.2s;

    svg {
      transition: transform 0.35s $ease-settle;
    }

    &:hover {
      color: $burla;

      svg {
        transform: translateX(4px);
      }
    }

    @include focus-ring;
  }

  &__prints {
    position: relative;
    // Leaves room on the left for the small print to hang out
    padding: 0 0 72px 64px;

    @media (max-width: 900px) {
      max-width: 480px;
      padding-left: 48px;
    }

    @media (max-width: $bp-phone) {
      padding: 0 0 56px 32px;
    }
  }

  &__print {
    display: block;
    border: 6px solid $etiket;
    outline: 2px solid $bing;
    border-radius: $radius;
    box-shadow: $paper-shadow;
    object-fit: cover;
    filter: saturate(1.06) contrast(1.04);

    &--main {
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 5;
      transform: rotate(1.5deg);
    }

    &--small {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 42%;
      height: auto;
      aspect-ratio: 3 / 4;
      object-position: 50% 40%;
      transform: rotate(-4deg);
    }
  }
}
</style>
