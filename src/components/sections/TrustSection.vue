<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()
</script>

<template>
  <section class="trust">
    <div class="container trust__inner">

      <div class="trust__header">
        <div v-appear class="section-label">{{ tr.trust.label }}</div>
        <h2 v-appear="80" class="trust__heading">
          {{ tr.trust.heading }}<br>
          <em>{{ tr.trust.headingItalic }}</em>
        </h2>
      </div>

      <div class="trust__grid">
        <div
          v-for="(item, i) in tr.trust.items"
          :key="i"
          v-appear="i * 100"
          class="trust__card"
        >
          <div class="trust__icon">
            <!-- Farm / Direct -->
            <svg v-if="item.icon === 'farm'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 28V14l12-10 12 10v14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="11" y="18" width="10" height="10" rx="1" stroke="currentColor" stroke-width="1.8"/>
              <path d="M16 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" stroke-width="1.8"/>
            </svg>
            <!-- Fresh / Cherry -->
            <svg v-else-if="item.icon === 'fresh'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="22" r="6" stroke="currentColor" stroke-width="1.8"/>
              <circle cx="22" cy="22" r="6" stroke="currentColor" stroke-width="1.8"/>
              <path d="M16 8 C16 8 14 16 10 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M16 10 C16 10 20 16 22 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M16 8 C14 2 10 2 10 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            <!-- Bulk / Box -->
            <svg v-else-if="item.icon === 'bulk'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 10l12-6 12 6v12l-12 6L4 22V10z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M16 4v24M4 10l12 6 12-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
            <!-- Delivery / Truck -->
            <svg v-else-if="item.icon === 'delivery'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="9" width="18" height="14" rx="1.5" stroke="currentColor" stroke-width="1.8"/>
              <path d="M20 13h5l4 5v5h-9V13z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <circle cx="8" cy="25" r="2.5" stroke="currentColor" stroke-width="1.8"/>
              <circle cx="24" cy="25" r="2.5" stroke="currentColor" stroke-width="1.8"/>
            </svg>
          </div>
          <h3 class="trust__card-title">{{ item.title }}</h3>
          <p class="trust__card-body">{{ item.body }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.trust {
  padding: var(--section-padding) 0;
  background: var(--color-cream);
}

.trust__inner {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.trust__header {
  display: flex;
  align-items: center;
  gap: 40px;
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
  white-space: nowrap;
}

.section-label::before {
  content: '';
  display: block;
  width: 28px;
  height: 2px;
  background: var(--color-cherry);
  border-radius: 2px;
}

.trust__heading {
  font-family: var(--font-display);
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.trust__heading em {
  font-style: italic;
  color: var(--color-cherry);
}

.trust__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.trust__card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.trust__card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.trust__icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: rgba(155, 35, 53, 0.08);
  color: var(--color-cherry);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.trust__icon svg {
  width: 24px;
  height: 24px;
}

.trust__card-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 10px;
  line-height: 1.3;
}

.trust__card-body {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.75;
}

@media (max-width: 900px) {
  .trust__header { flex-direction: column; align-items: flex-start; gap: 16px; }
  .trust__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 520px) {
  .trust__grid { grid-template-columns: 1fr; }
}
</style>
