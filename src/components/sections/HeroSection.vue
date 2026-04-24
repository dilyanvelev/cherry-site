<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { tr } = useLocale()

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="home" class="hero">

    <div class="hero__bg-art" aria-hidden="true">
      <svg viewBox="0 0 500 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M420 0 C380 80, 320 140, 260 200 C200 260, 140 300, 100 380" stroke="rgba(92,61,46,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M260 200 C280 240, 310 280, 290 340" stroke="rgba(92,61,46,0.30)" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M200 260 C170 300, 180 360, 160 400" stroke="rgba(92,61,46,0.25)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <circle cx="285" cy="360" r="22" fill="rgba(155,35,53,0.45)"/>
        <circle cx="318" cy="348" r="22" fill="rgba(155,35,53,0.40)"/>
        <circle cx="160" cy="415" r="18" fill="rgba(155,35,53,0.35)"/>
        <circle cx="192" cy="408" r="18" fill="rgba(155,35,53,0.30)"/>
        <path d="M260 200 C240 175, 210 172, 215 192 C222 210, 258 205, 260 200Z" fill="rgba(42,77,20,0.40)"/>
        <path d="M200 260 C180 240, 155 242, 160 258 C166 272, 198 265, 200 260Z" fill="rgba(42,77,20,0.35)"/>
        <path d="M100 380 C80 360, 55 362, 60 378 C66 393, 98 386, 100 380Z" fill="rgba(42,77,20,0.30)"/>
        <path d="M320 100 C350 140, 370 180, 360 240" stroke="rgba(92,61,46,0.20)" stroke-width="2" stroke-linecap="round" fill="none"/>
        <circle cx="355" cy="250" r="14" fill="rgba(155,35,53,0.25)"/>
        <circle cx="375" cy="243" r="14" fill="rgba(155,35,53,0.20)"/>
      </svg>
    </div>

    <div class="container hero__content">

      <div class="hero__badge">
        <span class="hero__badge-dot"></span>
        <span>{{ tr.hero.badge }}</span>
      </div>

      <h1 class="hero__heading">
        {{ tr.hero.line1 }}<br>
        <em>{{ tr.hero.line2 }}</em><br>
        {{ tr.hero.line3 }}<br>
        {{ tr.hero.line4 }}
      </h1>

      <p class="hero__sub">{{ tr.hero.sub }}</p>

      <div class="hero__actions">
        <button class="hero__btn hero__btn--primary" @click="scrollTo('varieties')">
          {{ tr.hero.cta1 }}
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="hero__btn hero__btn--outline" @click="scrollTo('contact')">
          {{ tr.hero.cta2 }}
        </button>
      </div>

    </div>

    <div class="hero__scroll-hint" aria-hidden="true" @click="scrollTo('about')">
      <div class="hero__scroll-line"></div>
      <span>{{ tr.hero.scroll }}</span>
    </div>

    <div class="hero__fade" aria-hidden="true"></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 75% 25%, rgba(100, 35, 20, 0.50) 0%, transparent 55%),
    radial-gradient(ellipse at 20% 80%, rgba(26, 46, 14, 0.55) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(40, 15, 12, 0.30) 0%, transparent 70%),
    linear-gradient(155deg, #0c1b07 0%, #190c08 45%, #250c0c 100%);
}

.hero__bg-art {
  position: absolute;
  top: -5%; right: -5%;
  width: 55%;
  max-width: 560px;
  height: 110%;
  pointer-events: none;
}

.hero__bg-art svg { width: 100%; height: 100%; }

.hero__content {
  position: relative;
  z-index: 2;
  padding-top: calc(var(--header-height) + 40px);
  padding-bottom: 100px;
  max-width: 640px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,0.20);
  border-radius: 100px;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.70);
  margin-bottom: 36px;
}

.hero__badge-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-cherry-light);
  flex-shrink: 0;
}

.hero__heading {
  font-family: var(--font-display);
  font-size: clamp(52px, 7vw, 88px);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: #fff;
  margin-bottom: 28px;
}

.hero__heading em {
  font-style: italic;
  color: var(--color-cherry-light);
}

.hero__sub {
  font-size: clamp(15px, 1.8vw, 17px);
  color: rgba(255,255,255,0.60);
  line-height: 1.75;
  max-width: 460px;
  margin-bottom: 44px;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  border-radius: var(--radius);
  transition: background 0.2s, transform 0.15s, border-color 0.2s, color 0.2s;
  cursor: pointer;
  border: 2px solid transparent;
}

.hero__btn svg { width: 18px; height: 18px; transition: transform 0.2s; }
.hero__btn--primary:hover svg { transform: translateX(3px); }

.hero__btn--primary {
  color: #fff;
  background: var(--color-cherry);
  border-color: var(--color-cherry);
}
.hero__btn--primary:hover {
  background: var(--color-cherry-dark);
  border-color: var(--color-cherry-dark);
  transform: translateY(-2px);
}

.hero__btn--outline {
  color: rgba(255,255,255,0.85);
  background: transparent;
  border-color: rgba(255,255,255,0.30);
}
.hero__btn--outline:hover {
  border-color: rgba(255,255,255,0.65);
  color: #fff;
  transform: translateY(-2px);
}

.hero__scroll-hint {
  position: absolute;
  bottom: 40px; left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  z-index: 2;
}

.hero__scroll-line {
  width: 1px; height: 52px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.50));
  animation: scrollPulse 2.2s ease-in-out infinite;
}

.hero__scroll-hint span {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.40);
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
}

.hero__fade {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, var(--color-warm-white));
  pointer-events: none;
  z-index: 1;
}

@media (max-width: 768px) {
  .hero__bg-art { width: 80%; right: -20%; opacity: 0.6; }
  .hero__content { max-width: 100%; }
}

/* ── Hero entrance animations ── */
@keyframes heroEnter {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: none; }
}

@keyframes heroBgEnter {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: none; }
}

.hero__bg-art  { animation: heroBgEnter 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both; }
.hero__badge   { animation: heroEnter  0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both; }
.hero__heading { animation: heroEnter  0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.30s both; }
.hero__sub     { animation: heroEnter  0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.50s both; }
.hero__actions { animation: heroEnter  0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both; }
.hero__scroll-hint { animation: heroEnter 0.6s ease 1.1s both; }

@media (prefers-reduced-motion: reduce) {
  .hero__bg-art, .hero__badge, .hero__heading,
  .hero__sub, .hero__actions, .hero__scroll-hint {
    animation: none;
  }
}
</style>
