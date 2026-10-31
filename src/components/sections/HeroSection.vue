<script setup lang="ts">
import { computed } from "vue"
import { useLocale } from "@/composables/useLocale"
import CrateLabel from "@/components/CrateLabel.vue"
import { useHarvestYear } from "@/composables/useHarvestYear"

const { tr, phoneHref } = useLocale()

const harvestYear = useHarvestYear()

const ctaText = computed(() => tr.value.hero.cta.replace("{year}", String(harvestYear.value)))

function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
}
</script>

<template>
    <section id="home" class="hero" :aria-label="tr.hero.ariaLabel">
        <div class="hero__copy">
            <h1 class="hero__title">
                <span class="hero__display">
                    <span v-for="(line, i) in tr.hero.titleLines" :key="line" :class="['hero__line', { 'hero__line--accent': i === tr.hero.titleLines.length - 1 }]">
                        <span class="hero__line-inner" :style="{ '--i': i }">{{ line }}{{ " " }}</span>
                    </span>
                </span>
                {{ " " }}<span class="hero__keyword">{{ tr.hero.keyword }}</span>
            </h1>

            <p class="hero__sub">{{ tr.hero.sub }}</p>

            <div class="hero__actions">
                <a class="hero__cta" href="#contact" @click.prevent="scrollTo('contact')">
                    {{ ctaText }}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
                        <path d="M4 12h15M13 6l6 6-6 6" />
                    </svg>
                </a>
                <p class="hero__call">
                    {{ tr.hero.callLabel }}
                    <a class="hero__phone" :href="phoneHref">{{ tr.nav.phone }}</a>
                </p>
            </div>
        </div>

        <div class="hero__visual">
            <figure class="hero__photo">
                <img src="/gallery/harvest-crates.jpg" width="665" height="1182" :alt="tr.hero.photoAlt" fetchpriority="high" decoding="async" />
                <figcaption class="hero__caption">{{ tr.hero.photoCaption }}</figcaption>
            </figure>

            <CrateLabel class="hero__label" :title="tr.hero.label.title" :subtitle="tr.hero.label.species" subtitle-lang="la" :rows="tr.hero.label.rows">
                <p class="hero__stamp">
                    <span v-for="part in tr.hero.label.stamp" :key="part">{{ part }}</span>
                </p>
            </CrateLabel>
        </div>

        <!-- Uneven ink edge for the rubber stamp -->
        <svg class="hero__defs" aria-hidden="true" focusable="false">
            <filter id="stamp-ink" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
            </filter>
        </svg>
    </section>
</template>

<style scoped lang="scss">
@use "@/design/tokens" as *;

@keyframes lineRise {
    from {
        transform: translateY(105%);
    }
    to {
        transform: none;
    }
}

@keyframes labelSettle {
    from {
        opacity: 0;
        transform: translateY(-28px) rotate(-9deg);
    }
    to {
        opacity: 1;
        transform: rotate(-2.5deg);
    }
}

@keyframes stampLand {
    from {
        opacity: 0;
        transform: rotate(-7deg) scale(1.7);
    }
    to {
        opacity: 0.92;
        transform: rotate(-7deg) scale(1);
    }
}

.hero {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    min-height: max(100svh, 720px);
    padding-top: var(--header-height);
    font-family: $sans;
    color: $bing;
    background: $varosano;

    @media (max-width: 900px) {
        grid-template-columns: minmax(0, 1fr);
        min-height: 0;
    }

    &__copy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 28px;
        padding: 56px $gutter 72px;

        @media (max-width: $bp-tablet) {
            padding: 48px $gutter-tablet 64px;
        }

        @media (max-width: 900px) {
            padding-bottom: 40px;
        }

        @media (max-width: $bp-phone) {
            gap: 22px;
            padding: 32px $gutter-phone 36px;
        }
    }

    &__title {
        display: flex;
        flex-direction: column;
        gap: 22px;
        margin: 0;
        font-weight: inherit;
    }

    &__display {
        display: block;
        font-family: $display;
        font-weight: 900;
        font-size: clamp(64px, 9vw, 150px);
        line-height: 0.86;
        letter-spacing: -0.01em;

        @media (max-width: 900px) {
            font-size: clamp(64px, 17vw, 132px);
        }
    }

    // Masks for the rise-in; padding keeps Cyrillic descenders (д, р, у) from being clipped
    &__line {
        display: block;
        overflow: hidden;
        padding-bottom: 0.08em;
        margin-bottom: -0.08em;

        &--accent {
            color: $burla;
        }
    }

    &__line-inner {
        display: block;
        animation: lineRise 0.9s $ease-settle both;
        animation-delay: calc(0.12s + var(--i) * 0.09s);

        @media (prefers-reduced-motion: reduce) {
            animation: none;
        }
    }

    &__keyword {
        display: block;
        max-width: 34ch;
        padding-top: 18px;
        border-top: $rule;
        font-size: 19px;
        font-weight: 600;
        line-height: 1.35;

        @media (max-width: $bp-phone) {
            font-size: 17px;
        }
    }

    &__sub {
        margin: 0;
        max-width: 46ch;
        font-size: 17px;
        line-height: 1.6;
        color: $kora;
    }

    &__actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 18px 32px;
        margin-top: 6px;
    }

    &__cta {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        min-height: 58px;
        padding: 0 26px;
        border-radius: $radius;
        background: $burla;
        color: $etiket;
        font-size: 17px;
        font-weight: 600;
        transition: background-color 0.2s ease;

        svg {
            transition: transform 0.35s $ease-settle;
        }

        &:hover {
            background: $van;

            svg {
                transform: translateX(4px);
            }
        }

        @include focus-ring;

        @media (max-width: $bp-phone) {
            width: 100%;
            justify-content: space-between;
        }
    }

    &__call {
        display: flex;
        align-items: baseline;
        gap: 10px;
        margin: 0;
        font-size: 15px;
        color: $kora;
    }

    &__phone {
        font-family: $display;
        font-size: 32px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: 0.01em;
        color: $bing;
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 5px;

        &:hover {
            color: $burla;
        }

        @include focus-ring;
    }

    &__visual {
        position: relative;
        min-height: 0;

        @media (max-width: 900px) {
            display: flex;
            flex-direction: column;
        }
    }

    &__photo {
        position: absolute;
        inset: 0;
        margin: 0;
        overflow: hidden;
        border-left: $rule;
        background: $van;

        img {
            width: 100%;
            height: 100%;
            max-width: none;
            object-fit: cover;
            object-position: 50% 62%;
            filter: saturate(1.06) contrast(1.04);
        }

        @media (max-width: 900px) {
            position: relative;
            height: min(110vw, 560px);
            border-left: none;
            border-top: $rule;
        }
    }

    &__caption {
        position: absolute;
        right: 16px;
        top: 16px;
        padding: 6px 10px;
        border-radius: $radius;
        background: $etiket;
        color: $bing;
        @include mono-label;
        font-size: 11px;
    }

    &__defs {
        position: absolute;
        width: 0;
        height: 0;
    }
}

// The crate label (CrateLabel.vue) — hangs across the seam between type panel and photo
.hero__label {
    position: absolute;
    left: -56px;
    bottom: 56px;
    z-index: 2;
    width: 330px;
    transform: rotate(-2.5deg);
    animation: labelSettle 1s $ease-settle 0.55s both;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }

    @media (max-width: $bp-tablet) {
        left: -36px;
        bottom: 40px;
        width: 300px;
    }

    @media (max-width: 900px) {
        position: relative;
        left: auto;
        bottom: auto;
        align-self: flex-start;
        width: min(340px, calc(100% - #{3 * $gutter-phone}));
        margin: -150px 0 40px $gutter-tablet;
    }

    @media (max-width: $bp-phone) {
        margin-left: $gutter-phone;
    }
}

.hero__stamp {
    display: inline-flex;
    flex-direction: column;
    margin: 0;
    padding: 7px 14px 6px;
    border: 3px double $pechat;
    border-radius: 4px;
    color: $pechat;
    font-family: $display;
    font-size: 22px;
    font-weight: 800;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    mix-blend-mode: multiply;
    filter: url(#stamp-ink);
    opacity: 0.92;
    transform: rotate(-7deg);
    animation: stampLand 0.38s $ease-settle 1.35s both;

    span + span {
        margin-top: 3px;
        font-size: 15px;
        letter-spacing: 0.12em;
    }

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
}
</style>
