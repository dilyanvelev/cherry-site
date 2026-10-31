<script setup lang="ts">
// The crate label — the page's signature element (src/design/design-dna.md).
// Positioning, rotation and entrance motion belong to the parent; this owns the paper.
withDefaults(
    defineProps<{
        title: string
        rows: { k: string; v: string }[]
        subtitle?: string
        subtitleLang?: string
        titleTag?: "p" | "h3"
    }>(),
    { titleTag: "p" },
)
</script>

<template>
    <div class="crate-label" role="group" :aria-label="title">
        <span class="crate-label__hole" aria-hidden="true"></span>
        <slot name="media" />
        <component :is="titleTag" class="crate-label__title">{{ title }}</component>
        <p v-if="subtitle" class="crate-label__subtitle" :lang="subtitleLang">{{ subtitle }}</p>
        <dl class="crate-label__rows">
            <div v-for="row in rows" :key="row.k" class="crate-label__row">
                <dt>{{ row.k }}</dt>
                <dd>{{ row.v }}</dd>
            </div>
        </dl>
        <!-- Below the perforated tear line -->
        <div v-if="$slots.default" class="crate-label__tear">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@/design/tokens" as *;

.crate-label {
    position: relative;
    padding: 44px 24px 22px;
    border-radius: $radius;
    font-family: $sans;
    color: $bing;
    background: $etiket;
    box-shadow: $paper-shadow;
    // Rotations pivot on the hole, the way a hung tag swings
    transform-origin: 50% 22px;

    &__hole {
        position: absolute;
        top: 14px;
        left: 50%;
        width: 16px;
        height: 16px;
        margin-left: -8px;
        border-radius: 50%;
        // Reads as a hole over any background
        background: rgba(36, 16, 15, 0.55);
        // Reinforcement ring, as on real tags
        box-shadow:
            inset 0 1px 2px rgba(36, 16, 15, 0.35),
            0 0 0 4px $etiket,
            0 0 0 5px rgba(36, 16, 15, 0.18);
    }

    &__title {
        margin: 0;
        font-family: $display;
        font-weight: 900;
        font-size: 44px;
        line-height: 0.9;
        text-transform: uppercase;
        letter-spacing: 0.01em;
    }

    &__subtitle {
        margin: 6px 0 0;
        @include mono-label;
        font-size: 11px;
        color: $kora;
    }

    &__rows {
        margin: 14px 0 0;
        border-top: $rule;
    }

    &__row {
        display: grid;
        grid-template-columns: 104px minmax(0, 1fr);
        align-items: baseline;
        gap: 12px;
        padding: 8px 0 7px;
        border-bottom: 1px dotted rgba(36, 16, 15, 0.35);

        dt {
            @include mono-label;
            font-size: 10.5px;
            color: $kora;
        }

        dd {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            line-height: 1.3;
        }
    }

    &__tear {
        margin: 18px -24px 0;
        padding: 20px 24px 0;
        border-top: 2px dashed rgba(36, 16, 15, 0.4);
    }
}
</style>
