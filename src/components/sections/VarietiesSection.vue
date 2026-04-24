<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()
</script>

<template>
  <section id="varieties" class="varieties">
    <div class="container">

      <div class="varieties__header">
        <div v-appear class="section-label">{{ tr.varieties.label }}</div>
        <div class="varieties__heading-row">
          <h2 v-appear="80" class="varieties__heading">
            {{ tr.varieties.heading }}<br>
            <em>{{ tr.varieties.headingItalic }}</em>
          </h2>
          <p v-appear="160" class="varieties__intro">{{ tr.varieties.intro }}</p>
        </div>
      </div>

      <div class="varieties__grid">
        <article
          v-for="(variety, i) in tr.varieties.items"
          :key="i"
          v-appear="i * 100"
          class="variety-card"
        >
          <!-- Colored top panel -->
          <div class="variety-card__top" :style="{ background: variety.color }">
            <span class="variety-card__season-badge">{{ variety.season }}</span>

            <!-- Cherry SVG illustration -->
            <svg class="variety-card__cherry" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M40 14 C40 14 38 28 30 35" stroke="rgba(255,255,255,0.55)" stroke-width="3" stroke-linecap="round"/>
              <path d="M40 18 C40 18 46 30 54 35" stroke="rgba(255,255,255,0.55)" stroke-width="3" stroke-linecap="round"/>
              <line x1="30" y1="35" x2="27" y2="46" stroke="rgba(255,255,255,0.55)" stroke-width="2.5" stroke-linecap="round"/>
              <line x1="54" y1="35" x2="55" y2="46" stroke="rgba(255,255,255,0.55)" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="26" cy="62" r="16" fill="rgba(255,255,255,0.22)"/>
              <circle cx="56" cy="62" r="16" fill="rgba(255,255,255,0.22)"/>
              <circle cx="21" cy="57" r="4.5" fill="rgba(255,255,255,0.30)"/>
              <circle cx="51" cy="57" r="4.5" fill="rgba(255,255,255,0.30)"/>
              <path d="M40 14 C36 5, 26 6, 27 13 C29 20, 40 17, 40 14Z" fill="rgba(255,255,255,0.45)"/>
            </svg>

            <div class="variety-card__caliber-badge">
              <span class="variety-card__caliber-label">{{ tr.varieties.caliberLabel }}</span>
              <span class="variety-card__caliber-value">{{ variety.caliber }}</span>
            </div>
          </div>

          <!-- Card body -->
          <div class="variety-card__body">
            <h3 class="variety-card__name">{{ variety.name }}</h3>

            <div class="variety-card__meta">
              <div class="variety-card__meta-item">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
                  <path d="M1.5 6.5h13" stroke="currentColor" stroke-width="1.3"/>
                  <path d="M5 1.5v2M11 1.5v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                </svg>
                <span>{{ variety.period }}</span>
              </div>
            </div>

            <p class="variety-card__desc">{{ variety.description }}</p>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<style scoped>
.varieties {
  padding: var(--section-padding) 0;
  background: var(--color-cream);
}

/* ── Header ── */
.varieties__header {
  margin-bottom: 56px;
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-cherry);
  margin-bottom: 18px;
}

.section-label::before {
  content: '';
  display: block;
  width: 28px;
  height: 2px;
  background: var(--color-cherry);
  border-radius: 2px;
}

.varieties__heading-row {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 60px;
}

.varieties__heading {
  font-family: var(--font-display);
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-text);
  white-space: nowrap;
}

.varieties__heading em {
  font-style: italic;
  color: var(--color-cherry);
}

.varieties__intro {
  font-size: 16px;
  color: var(--color-text-muted);
  line-height: 1.75;
  max-width: 440px;
  padding-left: 20px;
  border-left: 2px solid var(--color-border);
}

/* ── Grid ── */
.varieties__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* ── Card ── */
.variety-card {
  background: #fff;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.variety-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

/* Top colored panel */
.variety-card__top {
  position: relative;
  height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
  overflow: hidden;
}

.variety-card__season-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.90);
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 100px;
  backdrop-filter: blur(4px);
}

.variety-card__cherry {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -56%);
  width: 80px;
  height: 96px;
  opacity: 0.90;
}

.variety-card__caliber-badge {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.20);
  border-radius: var(--radius);
  padding: 8px 16px;
  backdrop-filter: blur(4px);
}

.variety-card__caliber-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.variety-card__caliber-value {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  line-height: 1;
}

/* Card body */
.variety-card__body {
  padding: 24px;
}

.variety-card__name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
  line-height: 1.2;
}

.variety-card__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.variety-card__meta-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: var(--color-text-muted);
  font-weight: 500;
}

.variety-card__meta-item svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: var(--color-cherry);
}

.variety-card__desc {
  font-size: 14px;
  line-height: 1.75;
  color: var(--color-text-muted);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .varieties__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .varieties__heading-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .varieties__intro {
    border-left: none;
    padding-left: 0;
    border-top: 2px solid var(--color-border);
    padding-top: 20px;
  }
  .varieties__heading {
    white-space: normal;
  }
}

@media (max-width: 520px) {
  .varieties__grid {
    grid-template-columns: 1fr;
  }
}
</style>
