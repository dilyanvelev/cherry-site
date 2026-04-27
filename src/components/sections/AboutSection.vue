<script setup lang="ts">
import { useLocale } from "@/composables/useLocale"
const { tr } = useLocale()

const statValues = ["15+", "4", "3"]
</script>

<template>
    <section id="about" class="about">
        <div class="container about__inner">
            <div class="about__text">
                <div v-appear class="section-label">{{ tr.about.label }}</div>

                <h2 v-appear="80" class="about__heading">
                    {{ tr.about.heading }}<br />
                    <em>{{ tr.about.headingItalic }}</em>
                </h2>

                <p v-appear="160" class="about__body">{{ tr.about.body1 }}</p>
                <p v-appear="220" class="about__body">{{ tr.about.body2 }}</p>

                <div class="about__stats">
                    <div v-for="(label, i) in tr.about.statLabels" :key="i" v-appear="300 + i * 100" class="about__stat">
                        <span class="about__stat-value">{{ statValues[i] }}</span>
                        <span class="about__stat-label">{{ label }}</span>
                    </div>
                </div>
            </div>

            <div v-appear="100" class="about__visual" aria-hidden="true">
                <div class="about__card about__card--main">
                    <img src="/gallery/garden.jpg" alt="Cherry garden" class="about__garden-img" />
                </div>

                <div class="about__card about__card--quote">
                    <svg class="about__quote-icon" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 24 L0 12 C0 5.4 4 1.6 12 0 L14 4 C10.7 4.7 9 6.7 9 10 L14 10 L14 24 Z" fill="currentColor" />
                        <path d="M18 24 L18 12 C18 5.4 22 1.6 30 0 L32 4 C28.7 4.7 27 6.7 27 10 L32 10 L32 24 Z" fill="currentColor" />
                    </svg>
                    <p>{{ tr.about.quote }}</p>
                    <div class="about__quote-author">{{ tr.about.quoteAuthor }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.about {
    padding: var(--section-padding) 0;
    background: var(--color-warm-white);
}

.about__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
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
    margin-bottom: 20px;
}

.section-label::before {
    content: "";
    display: block;
    width: 28px;
    height: 2px;
    background: var(--color-cherry);
    border-radius: 2px;
}

.about__heading {
    font-family: var(--font-display);
    font-size: clamp(30px, 3.2vw, 44px);
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--color-text);
    margin-bottom: 28px;
}

.about__heading em {
    font-style: italic;
    color: var(--color-cherry);
}

.about__body {
    font-size: 16px;
    color: var(--color-text-muted);
    line-height: 1.8;
    margin-bottom: 20px;
}

.about__stats {
    display: flex;
    gap: 40px;
    margin-top: 44px;
    padding-top: 40px;
    border-top: 1px solid var(--color-border);
}

.about__stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.about__stat-value {
    font-family: var(--font-display);
    font-size: 40px;
    font-weight: 600;
    color: var(--color-cherry);
    line-height: 1;
    letter-spacing: -0.02em;
}

.about__stat-label {
    font-size: 13px;
    color: var(--color-text-muted);
    font-weight: 500;
}

.about__visual {
    position: relative;
}

.about__card {
    background: #fff;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    overflow: hidden;
}

.about__card--main {
    min-height: 340px;
    overflow: hidden;
}

.about__garden-img {
    width: 100%;
    height: 100%;
    min-height: 340px;
    object-fit: cover;
    display: block;
}

.about__card--quote {
    position: absolute;
    bottom: -32px;
    left: -32px;
    width: 280px;
    padding: 24px 28px;
    background: var(--color-cherry-dark);
    color: #fff;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
}

.about__quote-icon {
    width: 24px;
    height: 18px;
    color: rgba(255, 255, 255, 0.35);
    margin-bottom: 12px;
}

.about__card--quote p {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 14.5px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 12px;
}

.about__quote-author {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.55);
    text-transform: uppercase;
}

@media (max-width: 900px) {
    .about__inner {
        grid-template-columns: 1fr;
        gap: 60px;
    }
    .about__visual {
        order: -1;
    }
    .about__card--quote {
        position: relative;
        bottom: auto;
        left: auto;
        width: 100%;
        margin-top: 16px;
    }
}

@media (max-width: 480px) {
    .about__stats {
        gap: 24px;
        flex-wrap: wrap;
    }
}
</style>
