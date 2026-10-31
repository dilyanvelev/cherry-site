<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import CrateLabel from '@/components/CrateLabel.vue'
import { useHarvestYear } from '@/composables/useHarvestYear'

const { tr, locale } = useLocale()
const harvestYear = useHarvestYear()

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

// Live season state: where today sits on the May 1 – July 31 axis (0–1 = in season)
const AXIS_DAYS = 92
const DAY_MS = 86_400_000
const now = new Date()
const todayAt = (now.getTime() - new Date(now.getFullYear(), 4, 1).getTime()) / DAY_MS / AXIS_DAYS
const inSeason = todayAt >= 0 && todayAt <= 1

const status = computed(() => {
  const s = tr.value.varieties.status
  const fmt = (d: Date) => d.toLocaleDateString(locale.value === 'bg' ? 'bg-BG' : 'en-GB', { day: 'numeric', month: 'long' })
  const orders = s.orders.replace('{year}', String(harvestYear.value))
  if (inSeason) {
    const picking = tr.value.varieties.items.filter((_, i) => todayAt >= WINDOWS[i][0] && todayAt <= WINDOWS[i][1]).map((item) => item.name)
    const line = picking.length ? s.picking.replace('{names}', picking.join(', ')) : s.between
    return { line: `${s.today}, ${fmt(now)} · ${line}`, orders }
  }
  const start = new Date(harvestYear.value, 4, 1 + Math.round(WINDOWS[0][0] * AXIS_DAYS))
  const days = Math.ceil((start.getTime() - now.getTime()) / DAY_MS)
  return { line: s.before.replace('{date}', fmt(start)).replace('{days}', String(days)), orders }
})

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

    <div :class="['season-status', { 'season-status--live': inSeason }]">
      <span class="season-status__dot" aria-hidden="true"></span>
      <p class="season-status__line">{{ status.line }}</p>
      <p class="season-status__orders">{{ status.orders }}</p>
    </div>

    <div class="season">
      <!-- Picking calendar; the same periods are in each label as text -->
      <div class="season__axis" aria-hidden="true">
        <span v-if="inSeason" :class="['season__today', { 'season__today--flip': todayAt > 0.8 }]" :style="{ left: `${todayAt * 100}%` }">
          <span>{{ tr.varieties.status.today }}</span>
        </span>
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


// One line of real state above the calendar: days to the first picking, or what's being picked today
.season-status {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto;
  align-items: center;
  gap: 6px 16px;
  margin-bottom: -32px;
  padding: 14px 18px;
  border: 2px solid $varosano;
  border-radius: $radius;

  @media (max-width: 900px) {
    grid-template-columns: 10px minmax(0, 1fr);
  }

  @media (max-width: $bp-phone) {
    margin-bottom: -16px;
  }

  &__dot {
    flex: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid $varosano;
  }

  &--live &__dot {
    background: $etiket;
    box-shadow: 0 0 0 4px rgba(251, 251, 246, 0.25);
  }

  &__line {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
  }

  &__orders {
    margin: 0;
    @include mono-label;
    font-size: 11px;

    @media (max-width: 900px) {
      grid-column: 2;
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

  // Today's line across the calendar, in season only
  &__today {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    border-left: 2px dashed $etiket;

    // Just under the month row, so it never covers a month name
    span {
      position: absolute;
      top: calc(var(--months-h) + 6px);
      left: 6px;
      padding: 3px 6px;
      border-radius: $radius;
      color: $bing;
      background: $etiket;
      white-space: nowrap;
      @include mono-label;
      font-size: 11px;
    }

    &--flip span {
      left: auto;
      right: 8px;
    }
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
