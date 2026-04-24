<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()
</script>

<template>
  <section id="orchards" class="orchards">
    <div class="container">

      <div class="orchards__header">
        <div v-appear class="section-label">{{ tr.orchards.label }}</div>
        <h2 v-appear="80" class="orchards__heading">
          {{ tr.orchards.heading }}<br><em>{{ tr.orchards.headingItalic }}</em>
        </h2>
        <p v-appear="160" class="orchards__intro">{{ tr.orchards.intro }}</p>
      </div>

      <div class="orchards__grid">
        <article
          v-for="(item, i) in tr.orchards.items"
          :key="i"
          v-appear="i * 80"
          class="feature-card"
          :style="{ background: item.gradient }"
        >
          <div class="feature-card__icon">
            <svg v-if="item.icon === 'cherry'" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5 C14 5 13.5 9 11 10.5" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M14 6 C14 6 16 9 18.5 10.5" stroke="rgba(255,255,255,0.9)" stroke-width="1.5" stroke-linecap="round"/>
              <line x1="11" y1="10.5" x2="10" y2="13.5" stroke="rgba(255,255,255,0.9)" stroke-width="1.3" stroke-linecap="round"/>
              <line x1="18.5" y1="10.5" x2="19" y2="13.5" stroke="rgba(255,255,255,0.9)" stroke-width="1.3" stroke-linecap="round"/>
              <circle cx="9.5" cy="18" r="4.5" fill="rgba(255,255,255,0.85)"/>
              <circle cx="19.5" cy="18" r="4.5" fill="rgba(255,255,255,0.85)"/>
              <path d="M14 5 C12.5 2, 9 2.5, 9.5 5 C10.5 7.5, 14 6, 14 5Z" fill="rgba(255,255,255,0.70)"/>
            </svg>
            <svg v-else-if="item.icon === 'location'" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 3 C9.6 3 6 6.6 6 11 C6 17.5 14 25 14 25 C14 25 22 17.5 22 11 C22 6.6 18.4 3 14 3Z" stroke="rgba(255,255,255,0.85)" stroke-width="1.6" fill="rgba(255,255,255,0.15)"/>
              <circle cx="14" cy="11" r="3.5" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" fill="none"/>
            </svg>
            <svg v-else-if="item.icon === 'sprout'" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 25 L14 13" stroke="rgba(255,255,255,0.85)" stroke-width="1.6" stroke-linecap="round"/>
              <path d="M14 13 C14 8 10 5 6 6.5 C6 10 9 13 14 13Z" fill="rgba(255,255,255,0.75)"/>
              <path d="M14 16 C14 11.5 18 8.5 22 10 C22 13.5 19 16.5 14 16Z" fill="rgba(255,255,255,0.65)"/>
            </svg>
            <svg v-else-if="item.icon === 'calendar'" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="20" height="18" rx="2.5" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" fill="rgba(255,255,255,0.10)"/>
              <path d="M4 12 L24 12" stroke="rgba(255,255,255,0.85)" stroke-width="1.5"/>
              <path d="M9 4 L9 8 M19 4 L19 8" stroke="rgba(255,255,255,0.85)" stroke-width="1.6" stroke-linecap="round"/>
              <circle cx="9" cy="18" r="1.5" fill="rgba(255,255,255,0.80)"/>
              <circle cx="14" cy="18" r="1.5" fill="rgba(255,255,255,0.80)"/>
              <circle cx="19" cy="18" r="1.5" fill="rgba(255,255,255,0.80)"/>
            </svg>
            <svg v-else-if="item.icon === 'medal'" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="16" r="9" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" fill="rgba(255,255,255,0.10)"/>
              <path d="M14 12 L15.2 15.2 L18.6 15.2 L15.9 17.2 L17 20.4 L14 18.4 L11 20.4 L12.1 17.2 L9.4 15.2 L12.8 15.2 Z" fill="rgba(255,255,255,0.80)"/>
              <path d="M10 7 L7 3 M18 7 L21 3" stroke="rgba(255,255,255,0.75)" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M7 3 L21 3" stroke="rgba(255,255,255,0.70)" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <svg v-else-if="item.icon === 'truck'" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7 L18 7 L18 19 L3 19 Z" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" fill="rgba(255,255,255,0.10)" stroke-linejoin="round"/>
              <path d="M18 10 L23 10 L25 14 L25 19 L18 19 Z" stroke="rgba(255,255,255,0.85)" stroke-width="1.5" fill="rgba(255,255,255,0.10)" stroke-linejoin="round"/>
              <circle cx="7" cy="21" r="2.5" stroke="rgba(255,255,255,0.85)" stroke-width="1.3" fill="none"/>
              <circle cx="21" cy="21" r="2.5" stroke="rgba(255,255,255,0.85)" stroke-width="1.3" fill="none"/>
            </svg>
          </div>

          <h3 class="feature-card__title">{{ item.title }}</h3>
          <p class="feature-card__desc">{{ item.description }}</p>
        </article>
      </div>

    </div>
  </section>
</template>

<style scoped>
.orchards {
  padding: var(--section-padding) 0;
  background: var(--color-cream);
}

.orchards__header {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: start;
  gap: 0 60px;
  margin-bottom: 56px;
}

.section-label {
  grid-column: 1; grid-row: 1;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-cherry);
  margin-bottom: 16px;
}

.section-label::before {
  content: '';
  display: block;
  width: 28px; height: 2px;
  background: var(--color-cherry);
  border-radius: 2px;
}

.orchards__heading {
  grid-column: 1; grid-row: 2;
  font-family: var(--font-display);
  font-size: clamp(30px, 3.2vw, 44px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-text);
  white-space: nowrap;
}

.orchards__heading em { font-style: italic; color: var(--color-cherry); }

.orchards__intro {
  grid-column: 2 / -1; grid-row: 2;
  align-self: center;
  font-size: 16px;
  color: var(--color-text-muted);
  line-height: 1.75;
  max-width: 440px;
  padding-left: 20px;
  border-left: 2px solid var(--color-border);
}

.orchards__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  border-radius: var(--radius-lg);
  padding: 32px;
  color: #fff;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.feature-card__icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  background: rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.feature-card__icon svg { width: 24px; height: 24px; }

.feature-card__title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;
  color: #fff;
  margin-bottom: 12px;
}

.feature-card__desc {
  font-size: 14.5px;
  line-height: 1.75;
  color: rgba(255,255,255,0.72);
}

@media (max-width: 900px) {
  .orchards__header {
    grid-template-columns: 1fr;
    gap: 0;
    margin-bottom: 40px;
  }
  .orchards__intro {
    grid-column: 1; grid-row: 3;
    border-left: none;
    padding-left: 0;
    margin-top: 20px;
    border-top: 2px solid var(--color-border);
    padding-top: 20px;
  }
  .orchards__heading { white-space: normal; }
  .orchards__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 580px) {
  .orchards__grid { grid-template-columns: 1fr; gap: 14px; }
}
</style>
