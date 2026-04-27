<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { tr } = useLocale()

const month = new Date().getMonth() // 0-indexed

const status = computed(() => {
  if (month === 4 || month === 5) return 'open'   // May or June
  if (month === 2 || month === 3) return 'soon'   // March or April
  return 'closed'
})

const statusLabel = computed(() => {
  if (status.value === 'open')   return tr.value.availability.statusOpen
  if (status.value === 'soon')   return tr.value.availability.statusSoon
  return tr.value.availability.statusClosed
})

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="availability" class="avail">
    <div class="container avail__inner">

      <div v-appear class="avail__text">
        <div class="section-label">{{ tr.availability.label }}</div>
        <h2 class="avail__heading">
          {{ tr.availability.heading }}<br>
          <em>{{ tr.availability.headingItalic }}</em>
        </h2>

        <div :class="['avail__status', `avail__status--${status}`]">
          <span class="avail__status-dot"></span>
          {{ statusLabel }}
        </div>

        <p class="avail__body">{{ tr.availability.body }}</p>

        <p class="avail__urgency">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm0 3v4m0 2v.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
          {{ tr.availability.urgency }}
        </p>

        <button class="avail__cta" @click="scrollToContact">
          {{ tr.availability.cta }}
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div v-appear="150" class="avail__calendar">
        <div class="avail__cal-label">Harvest Window</div>
        <div class="avail__months">
          <div
            v-for="(m, i) in tr.availability.months"
            :key="i"
            :class="['avail__month', (i === 4 || i === 5) ? 'avail__month--active' : '']"
          >
            <span class="avail__month-name">{{ m }}</span>
            <div class="avail__month-bar"></div>
          </div>
        </div>
        <div class="avail__packaging">
          <div class="avail__pkg-card">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              <path d="M12 3v18M3 7l9 4 9-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <div>
              <strong>Bulk Crates</strong>
              <span>10–25 kg per crate</span>
            </div>
          </div>
          <div class="avail__pkg-card">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 6V4a4 4 0 0 1 8 0v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <div>
              <strong>Retail Bags</strong>
              <span>1–5 kg for individuals</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.avail {
  padding: var(--section-padding) 0;
  background:
    radial-gradient(ellipse at 80% 20%, rgba(155, 35, 53, 0.18) 0%, transparent 55%),
    linear-gradient(150deg, #0f0b08 0%, #1a0c0a 50%, #120d0b 100%);
  color: #fff;
}

.avail__inner {
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
  color: var(--color-cherry-light);
  margin-bottom: 20px;
}

.section-label::before {
  content: '';
  display: block;
  width: 28px;
  height: 2px;
  background: var(--color-cherry-light);
  border-radius: 2px;
}

.avail__heading {
  font-family: var(--font-display);
  font-size: clamp(30px, 3.2vw, 46px);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 28px;
}

.avail__heading em {
  font-style: italic;
  color: var(--color-cherry-light);
}

.avail__status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 24px;
}

.avail__status--open   { background: rgba(34,197,94,0.15); color: #4ade80; border: 1px solid rgba(34,197,94,0.3); }
.avail__status--soon   { background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
.avail__status--closed { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.12); }

.avail__status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.avail__status--open   .avail__status-dot { background: #4ade80; box-shadow: 0 0 6px #4ade80; }
.avail__status--soon   .avail__status-dot { background: #fbbf24; box-shadow: 0 0 6px #fbbf24; }
.avail__status--closed .avail__status-dot { background: rgba(255,255,255,0.4); }

.avail__body {
  font-size: 16px;
  color: rgba(255,255,255,0.65);
  line-height: 1.8;
  margin-bottom: 20px;
}

.avail__urgency {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--color-cherry-light);
  margin-bottom: 36px;
}

.avail__urgency svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.avail__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  background: var(--color-cherry);
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.avail__cta svg { width: 18px; height: 18px; transition: transform 0.2s; }
.avail__cta:hover { background: var(--color-cherry-dark); transform: translateY(-2px); }
.avail__cta:hover svg { transform: translateX(3px); }

/* ── Calendar side ── */
.avail__calendar {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-lg);
  padding: 36px;
}

.avail__cal-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 20px;
}

.avail__months {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 32px;
}

.avail__month {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.avail__month-name {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.35);
}

.avail__month--active .avail__month-name { color: #fff; }

.avail__month-bar {
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 3px;
}

.avail__month--active .avail__month-bar {
  background: var(--color-cherry);
  box-shadow: 0 0 8px rgba(155,35,53,0.6);
}

.avail__packaging {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 24px;
}

.avail__pkg-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: rgba(255,255,255,0.05);
  border-radius: var(--radius);
  border: 1px solid rgba(255,255,255,0.08);
}

.avail__pkg-card svg {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  color: var(--color-cherry-light);
}

.avail__pkg-card div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.avail__pkg-card strong {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.avail__pkg-card span {
  font-size: 12px;
  color: rgba(255,255,255,0.45);
}

@media (max-width: 900px) {
  .avail__inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
</style>
