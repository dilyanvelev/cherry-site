<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import CrateLabel from '@/components/CrateLabel.vue'

const { tr } = useLocale()

// Picking windows as fractions of the May 1 – July 31 axis, in the order of tr.varieties.items.
// Read off the periods: late May – early June · June · late June – July.
const WINDOWS: [number, number][] = [
  [0.2, 0.45],
  [0.34, 0.66],
  [0.56, 0.9],
]

// Axis geometry (px) shared by the template, the CSS and the strings
const MONTHS_H = 28
const AXIS_GAP = 14
const TRACK_H = 40
const TRACK_GAP = 10
const DROP = 72 // axis bottom → label top
const HOLE_Y = 22 // label top → hole centre (CrateLabel)

const tracksH = 3 * TRACK_H + 2 * TRACK_GAP
const stringsH = MONTHS_H + AXIS_GAP + tracksH + DROP + HOLE_Y
// Approximate label centres in a 3-column grid
const LABEL_X = [16.2, 50, 83.8]

const strings = WINDOWS.map(([start, end], i) => ({
  x1: ((start + end) / 2) * 100,
  y1: MONTHS_H + AXIS_GAP + i * (TRACK_H + TRACK_GAP) + TRACK_H,
  x2: LABEL_X[i],
}))

const labels = computed(() =>
  tr.value.varieties.items.map((item) => ({
    ...item,
    rows: [
      { k: tr.value.varieties.seasonLabel, v: item.season },
      { k: tr.value.varieties.periodLabel, v: item.period },
      { k: tr.value.varieties.caliberLabel, v: item.caliber },
    ],
  })),
)

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section
    id="varieties"
    class="varieties"
    aria-labelledby="varieties-title"
    :style="{ '--months-h': `${MONTHS_H}px`, '--axis-gap': `${AXIS_GAP}px`, '--track-h': `${TRACK_H}px`, '--track-gap': `${TRACK_GAP}px`, '--drop': `${DROP}px` }"
  >
    <div class="varieties__head">
      <div>
        <p class="varieties__kicker">{{ tr.varieties.label }}</p>
        <h2 id="varieties-title" class="varieties__title">
          <span v-for="line in tr.varieties.headingLines" :key="line">{{ line }}{{ " " }}</span>
        </h2>
      </div>
      <p class="varieties__intro">{{ tr.varieties.intro }}</p>
    </div>

    <div class="season">
      <!-- Picking calendar; the same periods are in each label as text -->
      <div class="season__axis" aria-hidden="true">
        <div class="season__months">
          <span v-for="month in tr.varieties.months" :key="month">{{ month }}</span>
        </div>
        <div class="season__tracks">
          <div v-for="(item, i) in tr.varieties.items" :key="item.name" class="season__track">
            <span class="season__bar" :style="{ left: `${WINDOWS[i][0] * 100}%`, width: `${(WINDOWS[i][1] - WINDOWS[i][0]) * 100}%` }">
              <span class="season__name">{{ item.name }}</span>
            </span>
          </div>
        </div>
      </div>

      <svg class="season__strings" :height="stringsH" aria-hidden="true" focusable="false">
        <line v-for="(s, i) in strings" :key="i" :x1="`${s.x1}%`" :y1="s.y1" :x2="`${s.x2}%`" :y2="stringsH" />
      </svg>

      <ul class="season__labels">
        <li v-for="item in labels" :key="item.name">
          <CrateLabel class="season__label" title-tag="h3" :title="item.name" :rows="item.rows">
            <template #media>
              <img class="season__photo" :src="item.image" :alt="item.alt" width="600" height="450" loading="lazy" decoding="async" />
            </template>
            <p class="season__desc">{{ item.description }}</p>
          </CrateLabel>
        </li>
      </ul>
    </div>

    <div class="varieties__price">
      <p>{{ tr.varieties.priceNote }}</p>
      <a href="#contact" @click.prevent="scrollTo('contact')">
        {{ tr.varieties.priceCta }}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
          <path d="M4 12h15M13 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/design/tokens' as *;

$line: rgba(236, 238, 231, 0.28);

.varieties {
  display: flex;
  flex-direction: column;
  gap: 72px;
  padding: 120px $gutter 112px;
  font-family: $sans;
  color: $varosano;
  background: $van;

  @media (max-width: $bp-tablet) {
    padding: 96px $gutter-tablet 96px;
  }

  @media (max-width: $bp-phone) {
    gap: 48px;
    padding: 72px $gutter-phone 72px;
  }

  &__head {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: end;
    gap: 28px 72px;

    @media (max-width: 900px) {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  &__kicker {
    margin: 0 0 24px;
    @include mono-label;
  }

  &__title {
    margin: 0;
    font-family: $display;
    font-weight: 900;
    font-size: clamp(54px, 5.6vw, 92px);
    line-height: 0.88;
    letter-spacing: -0.005em;

    span {
      display: block;
    }
  }

  &__intro {
    margin: 0;
    max-width: 52ch;
    font-size: 18px;
    line-height: 1.6;
  }

  &__price {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px 32px;
    padding-top: 24px;
    border-top: 2px solid $varosano;

    p {
      margin: 0;
      font-size: 17px;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding-bottom: 4px;
      border-bottom: 2px solid $varosano;
      font-size: 17px;
      font-weight: 600;

      svg {
        transition: transform 0.35s $ease-settle;
      }

      &:hover svg {
        transform: translateX(4px);
      }

      @include focus-ring($varosano);
    }
  }
}

.season {
  position: relative;

  &__axis {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--axis-gap);
    // Month ticks at 0, ⅓, ⅔ and the right edge
    background:
      linear-gradient(90deg, $line 1px, transparent 1px) 0 0 / 33.333% 100%,
      linear-gradient(270deg, $line 1px, transparent 1px);
  }

  &__months {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    height: var(--months-h);
    border-bottom: 2px solid $varosano;

    span {
      padding-left: 10px;
      @include mono-label;
    }
  }

  &__tracks {
    display: flex;
    flex-direction: column;
    gap: var(--track-gap);
  }

  &__track {
    position: relative;
    height: var(--track-h);
  }

  // Name above, picking window as the bar underneath
  &__bar {
    position: absolute;
    bottom: 0;
    height: 10px;
    border-radius: $radius;
    background: $etiket;
  }

  &__name {
    position: absolute;
    left: 0;
    bottom: 16px;
    font-family: $display;
    font-weight: 800;
    font-size: 20px;
    line-height: 1;
    white-space: nowrap;
  }

  &__strings {
    position: absolute;
    top: 0;
    left: 0;
    // Above the labels, so each string runs over the paper into its hole
    z-index: 1;
    width: 100%;
    overflow: visible;
    pointer-events: none;

    line {
      stroke: $etiket;
      stroke-width: 1.5;
      stroke-opacity: 0.75;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }

  &__labels {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: start;
    gap: 32px;
    margin: var(--drop) 0 0;
    padding: 0;
    list-style: none;

    @media (max-width: 900px) {
      grid-template-columns: minmax(0, 1fr);
      gap: 40px;
      max-width: 440px;
      margin-top: 48px;
      // Room for the rotated corners at phone width
      padding: 0 6px;
    }

    // Each tag hangs at its own slight angle
    li:nth-child(1) .season__label {
      transform: rotate(-1.8deg);
    }

    li:nth-child(2) .season__label {
      transform: rotate(1.2deg);
    }

    li:nth-child(3) .season__label {
      transform: rotate(-0.8deg);
    }
  }

  &__photo {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    margin-bottom: 18px;
    border: $rule;
    border-radius: $radius;
    object-fit: cover;
    filter: saturate(1.06) contrast(1.04);
  }

  &__desc {
    margin: 0;
    font-size: 15px;
    line-height: 1.55;
    color: $kora;
  }
}
</style>
