<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()
</script>

<template>
  <div class="stats-strip">
    <div class="container stats-strip__inner">
      <div
        v-for="(item, i) in tr.stats.items"
        :key="i"
        v-appear="i * 100"
        class="stats-strip__item"
      >
        <span class="stats-strip__value">{{ item.value }}</span>
        <span class="stats-strip__label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats-strip {
  background:
    radial-gradient(ellipse at 30% 50%, rgba(42, 77, 20, 0.30) 0%, transparent 60%),
    linear-gradient(135deg, #110d09 0%, #1c0b0d 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.stats-strip__inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0;
}

.stats-strip__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 40px 24px;
  position: relative;
  transition: background 0.2s;
}

.stats-strip__item::after {
  content: '';
  position: absolute;
  right: 0;
  top: 25%;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.08);
}

.stats-strip__item:last-child::after { display: none; }

.stats-strip__value {
  font-family: var(--font-display);
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-cherry-light);
}

.stats-strip__label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
}

@media (max-width: 640px) {
  .stats-strip__inner {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats-strip__item:nth-child(2)::after { display: none; }
  .stats-strip__item:nth-child(3)::after { display: none; }

  .stats-strip__item:nth-child(1),
  .stats-strip__item:nth-child(2) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>
