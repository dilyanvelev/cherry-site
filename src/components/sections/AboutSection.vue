<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
const { tr } = useLocale()

function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
}
</script>

<template>
    <section id="about" class="about" aria-labelledby="about-title">
        <figure class="about__figure">
            <div class="about__photo">
                <img src="/gallery/garden.jpg" width="768" height="1024" :alt="tr.about.photoAlt" loading="lazy" decoding="async" />
                <span class="about__caption">{{ tr.about.photoCaption }}</span>
            </div>
            <figcaption class="about__note">
                <span class="about__note-label">{{ tr.about.noteLabel }}</span>
                {{ tr.about.note }}
            </figcaption>
        </figure>

        <div class="about__text">
            <p class="about__kicker">{{ tr.about.label }}</p>
            <h2 id="about-title" class="about__title">
                <span v-for="(line, i) in tr.about.headingLines" :key="line" :class="['about__title-line', { 'about__title-line--accent': i === tr.about.headingLines.length - 1 }]">{{ line }}{{ " " }}</span>
            </h2>
            <p class="about__body">{{ tr.about.body1 }}</p>
            <p class="about__body">{{ tr.about.body2 }}</p>
            <a class="about__link" href="#varieties" @click.prevent="scrollTo('varieties')">
                {{ tr.about.link }}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
                    <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
            </a>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use "@/design/tokens" as *;

.about {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: center;
    gap: 56px 88px;
    padding: 120px $gutter 128px;
    font-family: $sans;
    color: $bing;
    background: $varosano;

    @media (max-width: $bp-tablet) {
        gap: 48px 56px;
        padding: 96px $gutter-tablet 104px;
    }

    @media (max-width: 900px) {
        grid-template-columns: minmax(0, 1fr);
    }

    @media (max-width: $bp-phone) {
        padding: 72px $gutter-phone 80px;
    }

    &__figure {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin: 0;

        // Text first on narrow screens, the photo backs it up
        @media (max-width: 900px) {
            order: 1;
            max-width: 520px;
        }
    }

    &__photo {
        position: relative;
        aspect-ratio: 4 / 5;
        overflow: hidden;
        border: $rule;
        border-radius: $radius;
        background: $kora;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% 70%;
            filter: saturate(1.06) contrast(1.04);
        }
    }

    &__caption {
        position: absolute;
        left: 14px;
        bottom: 14px;
        padding: 6px 10px;
        border-radius: $radius;
        background: $etiket;
        @include mono-label;
        font-size: 11px;
    }

    &__note {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-width: 44ch;
        padding-left: 18px;
        border-left: $rule;
        font-size: 15px;
        line-height: 1.55;
        color: $kora;
    }

    &__note-label {
        @include mono-label;
        font-size: 11px;
        color: $bing;
    }

    &__text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 22px;
        max-width: 640px;
    }

    &__kicker {
        margin: 0;
        @include mono-label;
        color: $kora;
    }

    &__title {
        margin: 0 0 8px;
        font-family: $display;
        font-weight: 900;
        font-size: clamp(54px, 5.6vw, 92px);
        line-height: 0.88;
        letter-spacing: -0.005em;
    }

    &__title-line {
        display: block;

        &--accent {
            color: $burla;
        }
    }

    &__body {
        margin: 0;
        max-width: 56ch;
        font-size: 18px;
        line-height: 1.65;

        & + & {
            color: $kora;
        }
    }

    &__link {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
        padding-bottom: 4px;
        border-bottom: $rule;
        font-size: 17px;
        font-weight: 600;
        transition: color 0.2s;

        svg {
            transition: transform 0.35s $ease-settle;
        }

        &:hover {
            color: $burla;

            svg {
                transform: translateX(4px);
            }
        }

        @include focus-ring;
    }
}
</style>
