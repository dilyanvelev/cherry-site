<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()
</script>

<template>
  <section class="trust" aria-labelledby="trust-title">
    <div class="trust__lead">
      <p class="trust__kicker">{{ tr.trust.label }}</p>
      <h2 id="trust-title" class="trust__title">
        <span v-for="line in tr.trust.headingLines" :key="line" class="trust__title-line">{{ line }}{{ " " }}</span>
      </h2>

      <!-- The usual chain with the middlemen struck out -->
      <div class="route">
        <p class="route__label">{{ tr.trust.routeLabel }}</p>
        <ol class="route__steps">
          <li v-for="item in tr.trust.route" :key="item.step" :class="['route__step', { 'route__step--cut': item.cut }]">
            <del v-if="item.cut">{{ item.step }}</del>
            <template v-else>{{ item.step }}</template>
          </li>
        </ol>
      </div>
    </div>

    <ul class="trust__list">
      <li v-for="item in tr.trust.items" :key="item.title" class="trust__item">
        <h3 class="trust__item-title">{{ item.title }}</h3>
        <p class="trust__item-body">{{ item.body }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
@use '@/design/tokens' as *;

$paper-rule: 2px solid $etiket;

.trust {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 48px 72px;
  padding: 112px $gutter 120px;
  font-family: $sans;
  color: $etiket;
  background: $burla;

  @media (max-width: $bp-tablet) {
    gap: 40px 48px;
    padding: 88px $gutter-tablet 96px;
  }

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: $bp-phone) {
    padding: 64px $gutter-phone 72px;
  }

  // Heading at the top, route pinned to the bottom edge of the ledger
  &__lead {
    display: flex;
    flex-direction: column;
    gap: 28px;

    .route {
      margin-top: auto;

      @media (max-width: 900px) {
        margin-top: 12px;
      }
    }
  }

  &__kicker {
    margin: 0;
    @include mono-label;
  }

  &__title {
    margin: 0;
    font-family: $display;
    font-weight: 900;
    font-size: clamp(54px, 5.6vw, 92px);
    line-height: 0.88;
    letter-spacing: -0.005em;
  }

  &__title-line {
    display: block;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: $paper-rule;
  }

  &__item {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: baseline;
    gap: 8px 32px;
    padding: 24px 0 22px;
    border-bottom: $paper-rule;

    @media (max-width: $bp-phone) {
      grid-template-columns: minmax(0, 1fr);
      padding: 20px 0 18px;
    }
  }

  &__item-title {
    margin: 0;
    font-family: $display;
    font-weight: 800;
    font-size: clamp(28px, 2.4vw, 36px);
    line-height: 1;
  }

  &__item-body {
    margin: 0;
    font-size: 17px;
    line-height: 1.55;
  }
}

.route {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;

  &__label {
    margin: 0;
    @include mono-label;
    font-size: 11px;
  }

  &__steps {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 0;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: $display;
    font-weight: 800;
    font-size: 26px;
    line-height: 1.1;
  }

  &__step {
    display: inline-flex;
    align-items: baseline;

    & + &::before {
      content: '→';
      margin: 0 10px;
      font-family: $sans;
      font-weight: 400;
      font-size: 0.8em;
    }

    // Large bold text, so 3:1 is the AA floor here
    del {
      color: rgba(251, 251, 246, 0.78);
      text-decoration: line-through;
      text-decoration-thickness: 2px;
    }
  }
}
</style>
