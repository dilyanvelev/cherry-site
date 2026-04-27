<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()

const PDF_PATH = '/eu-project.pdf'
</script>

<template>
  <section id="eu-project" class="eu">
    <div class="container eu__inner">

      <div class="eu__header">
        <span class="section-label">{{ tr.euProject.label }}</span>
        <h2 class="eu__heading">
          {{ tr.euProject.heading }}<br />
          <em>{{ tr.euProject.headingItalic }}</em>
        </h2>
        <p class="eu__body">{{ tr.euProject.body }}</p>

        <div class="eu__flag" aria-hidden="true">
          <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="40" fill="#003399"/>
            <g fill="#FFCC00">
              <polygon points="30,5 31.2,8.6 35,8.6 32,10.8 33.1,14.4 30,12.2 26.9,14.4 28,10.8 25,8.6 28.8,8.6"/>
              <polygon points="30,25.6 31.2,29.2 35,29.2 32,31.4 33.1,35 30,32.8 26.9,35 28,31.4 25,29.2 28.8,29.2"/>
              <polygon points="19.7,15.3 20.9,18.9 24.7,18.9 21.7,21.1 22.8,24.7 19.7,22.5 16.6,24.7 17.7,21.1 14.7,18.9 18.5,18.9"/>
              <polygon points="40.3,15.3 41.5,18.9 45.3,18.9 42.3,21.1 43.4,24.7 40.3,22.5 37.2,24.7 38.3,21.1 35.3,18.9 39.1,18.9"/>
              <polygon points="36.4,7.1 37.6,10.7 41.4,10.7 38.4,12.9 39.5,16.5 36.4,14.3 33.3,16.5 34.4,12.9 31.4,10.7 35.2,10.7"/>
              <polygon points="23.6,7.1 24.8,10.7 28.6,10.7 25.6,12.9 26.7,16.5 23.6,14.3 20.5,16.5 21.6,12.9 18.6,10.7 22.4,10.7"/>
              <polygon points="36.4,23.5 37.6,27.1 41.4,27.1 38.4,29.3 39.5,32.9 36.4,30.7 33.3,32.9 34.4,29.3 31.4,27.1 35.2,27.1"/>
              <polygon points="23.6,23.5 24.8,27.1 28.6,27.1 25.6,29.3 26.7,32.9 23.6,30.7 20.5,32.9 21.6,29.3 18.6,27.1 22.4,27.1"/>
              <polygon points="16.6,20 17.8,23.6 21.6,23.6 18.6,25.8 19.7,29.4 16.6,27.2 13.5,29.4 14.6,25.8 11.6,23.6 15.4,23.6"/>
              <polygon points="43.4,20 44.6,23.6 48.4,23.6 45.4,25.8 46.5,29.4 43.4,27.2 40.3,29.4 41.4,25.8 38.4,23.6 42.2,23.6"/>
              <polygon points="30,2 31.2,5.6 35,5.6 32,7.8 33.1,11.4 30,9.2 26.9,11.4 28,7.8 25,5.6 28.8,5.6"/>
              <polygon points="30,28.6 31.2,32.2 35,32.2 32,34.4 33.1,38 30,35.8 26.9,38 28,34.4 25,32.2 28.8,32.2"/>
            </g>
          </svg>
          <span>European Agricultural Fund</span>
        </div>

        <div class="eu__actions">
          <a :href="PDF_PATH" target="_blank" rel="noopener noreferrer" class="eu__btn eu__btn--primary">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3v10M10 13l-3-3m3 3l3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 15h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
            {{ tr.euProject.downloadBtn }}
          </a>
          <a :href="PDF_PATH" target="_blank" rel="noopener noreferrer" class="eu__btn eu__btn--outline">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="2" width="10" height="13" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M7 6h4M7 9h4M7 12h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path d="M13 8l4 0M17 8l-2.5 2.5M17 8l-2.5-2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ tr.euProject.openBtn }}
          </a>
        </div>
      </div>

      <div class="eu__preview">
        <div class="eu__frame">
          <iframe
            :src="`${PDF_PATH}#toolbar=1&navpanes=0&scrollbar=1`"
            class="eu__iframe"
            title="EU Project Document"
            loading="lazy"
          ></iframe>
          <div class="eu__mobile-fallback">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="28" height="36" rx="3" fill="#e8eaf6" stroke="#9B2335" stroke-width="1.5"/>
              <path d="M12 14h16M12 20h16M12 26h10" stroke="#9B2335" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="36" cy="34" r="8" fill="#9B2335"/>
              <path d="M33 34l2 2 4-4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>{{ tr.euProject.mobileNote }}</p>
            <a :href="PDF_PATH" target="_blank" rel="noopener noreferrer" class="eu__btn eu__btn--primary">
              {{ tr.euProject.openBtn }}
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.eu {
  background: var(--color-warm-white);
  border-top: 1px solid var(--color-border);
  padding: 100px 0;
}

.eu__inner {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 64px;
  align-items: start;
}

/* ── Left column ── */
.eu__heading {
  font-family: var(--font-display);
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 12px 0 20px;
}

.eu__heading em {
  font-style: italic;
  color: var(--color-cherry);
}

.eu__body {
  font-size: 15px;
  line-height: 1.8;
  color: var(--color-text-muted);
  margin-bottom: 28px;
  max-width: 420px;
}

.eu__flag {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding: 12px 16px;
  background: #f0f3ff;
  border: 1px solid #c7d0f5;
  border-radius: var(--radius);
  width: fit-content;
}

.eu__flag svg {
  width: 40px;
  height: 27px;
  border-radius: 2px;
  flex-shrink: 0;
}

.eu__flag span {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #003399;
}

.eu__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.eu__btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 11px 22px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: var(--radius);
  transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
  border: 2px solid transparent;
  cursor: pointer;
}

.eu__btn svg { width: 16px; height: 16px; }

.eu__btn--primary {
  color: #fff;
  background: var(--color-cherry);
  border-color: var(--color-cherry);
}
.eu__btn--primary:hover {
  background: var(--color-cherry-dark);
  border-color: var(--color-cherry-dark);
  transform: translateY(-1px);
}

.eu__btn--outline {
  color: var(--color-text);
  background: transparent;
  border-color: var(--color-border);
}
.eu__btn--outline:hover {
  border-color: var(--color-text-muted);
  transform: translateY(-1px);
}

/* ── Right column — PDF frame ── */
.eu__frame {
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 2px 8px rgba(0,0,0,0.06),
    0 12px 40px rgba(0,0,0,0.10),
    0 0 0 1px rgba(0,0,0,0.06);
  background: #f5f5f5;
  position: relative;
}

.eu__iframe {
  display: block;
  width: 100%;
  height: 680px;
  border: none;
}

/* Mobile fallback — shown instead of iframe on small screens */
.eu__mobile-fallback {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 32px;
  text-align: center;
}

.eu__mobile-fallback svg {
  width: 64px;
  height: 64px;
  opacity: 0.75;
}

.eu__mobile-fallback p {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.7;
  max-width: 280px;
}

@media (max-width: 960px) {
  .eu__inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .eu__body { max-width: 100%; }

  /* swap iframe for friendly fallback on mobile */
  .eu__iframe { display: none; }
  .eu__mobile-fallback { display: flex; }
}

@media (max-width: 480px) {
  .eu { padding: 72px 0; }
  .eu__actions { flex-direction: column; align-items: flex-start; }
  .eu__btn { width: 100%; justify-content: center; }
}
</style>
