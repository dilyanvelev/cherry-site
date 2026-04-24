<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()
</script>

<template>
  <section id="juice" class="juice">
    <div class="container juice__inner">

      <div class="juice__text">
        <div v-appear class="section-label">{{ tr.juice.label }}</div>
        <h2 v-appear="80" class="juice__heading">
          {{ tr.juice.heading }}<br>
          <em>{{ tr.juice.headingItalic }}</em>
        </h2>
        <p v-appear="160" class="juice__body">{{ tr.juice.body1 }}</p>
        <p v-appear="220" class="juice__body">{{ tr.juice.body2 }}</p>
      </div>

      <div class="juice__gallery">
        <div
          v-for="(photo, i) in tr.juice.photos"
          :key="i"
          v-appear="100 + i * 80"
          class="juice__photo"
        >
          <img :src="photo.src" :alt="photo.alt" />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.juice {
  padding: var(--section-padding) 0;
  background: var(--color-warm-white);
}

.juice__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* ── Text side ── */
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-cherry);
  margin-bottom: 20px;
}

.section-label::before {
  content: '';
  display: block;
  width: 28px;
  height: 2px;
  background: var(--color-cherry);
  border-radius: 2px;
}

.juice__heading {
  font-family: var(--font-display);
  font-size: clamp(30px, 3.2vw, 44px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 28px;
}

.juice__heading em {
  font-style: italic;
  color: var(--color-cherry);
}

.juice__body {
  font-size: 16px;
  color: var(--color-text-muted);
  line-height: 1.8;
  margin-bottom: 20px;
}

/* ── Gallery grid ── */
.juice__gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
}

.juice__photo {
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 3 / 4;
}

.juice__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.juice__photo:hover img {
  transform: scale(1.04);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .juice__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .juice__gallery {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }

  .juice__photo {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 480px) {
  .juice__gallery {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}
</style>
