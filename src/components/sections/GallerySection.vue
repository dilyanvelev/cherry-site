<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()
</script>

<template>
  <section class="gallery">
    <div class="container">

      <div class="gallery__header">
        <div v-appear class="section-label">{{ tr.gallery.label }}</div>
        <h2 v-appear="80" class="gallery__heading">
          {{ tr.gallery.heading }}<br>
          <em>{{ tr.gallery.headingItalic }}</em>
        </h2>
      </div>

      <div class="gallery__grid">
        <div
          v-for="(photo, i) in tr.gallery.photos"
          :key="i"
          v-appear="i * 80"
          :class="['gallery__item', i === 0 ? 'gallery__item--featured' : '']"
        >
          <img :src="photo.src" :alt="photo.alt" />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.gallery {
  padding: var(--section-padding) 0;
  background: var(--color-warm-white);
}

.gallery__header {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
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

.gallery__heading {
  font-family: var(--font-display);
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

.gallery__heading em {
  font-style: italic;
  color: var(--color-cherry);
}

/* ── Grid ── */
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 280px 280px;
  gap: 12px;
}

.gallery__item {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.gallery__item--featured {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.gallery__item:hover img {
  transform: scale(1.04);
}

@media (max-width: 900px) {
  .gallery__header { flex-direction: column; align-items: flex-start; gap: 16px; }
  .gallery__grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  .gallery__item--featured {
    grid-column: 1 / -1;
    grid-row: auto;
    height: 280px;
  }
  .gallery__item { aspect-ratio: 4 / 3; }
}

@media (max-width: 520px) {
  .gallery__grid { grid-template-columns: 1fr; }
  .gallery__item--featured { height: 240px; }
}
</style>
