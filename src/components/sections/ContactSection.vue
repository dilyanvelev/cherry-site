<script setup lang="ts">
import { ref, reactive } from "vue"
import emailjs from "@emailjs/browser"
import { useLocale } from "@/composables/useLocale"
import { useHarvestYear } from "@/composables/useHarvestYear"
import { EMAIL, MAPS_URL } from "@/site"

const EMAILJS_SERVICE_ID = "service_bf6qy73"
const EMAILJS_TEMPLATE_ID = "template_tl09mbv"
const EMAILJS_PUBLIC_KEY = "lr_rk_mw1Tk6B2PUw"


const { tr, phoneHref } = useLocale()
const harvestYear = useHarvestYear()

const form = reactive({ name: "", email: "", phone: "", message: "" })
const errors = reactive({ name: "", email: "", message: "" })
const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref("")

function validate(): boolean {
    errors.name = form.name.trim() ? "" : tr.value.contact.errors.name
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : tr.value.contact.errors.email
    errors.message = form.message.trim().length >= 10 ? "" : tr.value.contact.errors.message
    return !errors.name && !errors.email && !errors.message
}

async function submit() {
    if (!validate()) return
    isSubmitting.value = true
    submitError.value = ""
    try {
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                name: form.name,
                email: form.email,
                phone: form.phone || "—",
                message: form.message,
            },
            EMAILJS_PUBLIC_KEY,
        )
        isSubmitted.value = true
    } catch {
        submitError.value = tr.value.contact.form.sendError
    } finally {
        isSubmitting.value = false
    }
}

function reset() {
    form.name = ""
    form.email = ""
    form.phone = ""
    form.message = ""
    errors.name = ""
    errors.email = ""
    errors.message = ""
    submitError.value = ""
    isSubmitted.value = false
}
</script>

<template>
    <section id="contact" class="contact" aria-labelledby="contact-title">
        <div class="contact__info">
            <p class="contact__kicker">{{ tr.contact.label }}</p>
            <h2 id="contact-title" class="contact__title">
                <span v-for="line in tr.contact.headingLines" :key="line">{{ line.replace("{year}", String(harvestYear)) }}{{ " " }}</span>
            </h2>
            <p class="contact__sub">{{ tr.contact.sub }}</p>

            <div class="contact__call">
                <span class="contact__call-label">{{ tr.contact.callLabel }}</span>
                <a class="contact__phone" :href="phoneHref">{{ tr.nav.phone }}</a>
            </div>

            <dl class="contact__details">
                <div>
                    <dt>{{ tr.contact.emailLabel }}</dt>
                    <dd><a :href="`mailto:${EMAIL}`">{{ EMAIL }}</a></dd>
                </div>
                <div>
                    <dt>{{ tr.contact.locationLabel }}</dt>
                    <dd>{{ tr.contact.locationValue }}</dd>
                </div>
            </dl>
        </div>

        <!-- The order slip -->
        <div class="slip">
            <Transition name="slip" mode="out-in">
                <div v-if="isSubmitted" class="slip__done" role="status">
                    <p class="slip__stamp" aria-hidden="true">{{ tr.contact.form.stamp }}</p>
                    <h3 class="slip__done-title">{{ tr.contact.form.successTitle }}</h3>
                    <p class="slip__done-body">{{ tr.contact.form.successBody }}</p>
                    <button type="button" class="slip__again" @click="reset">{{ tr.contact.form.sendAnother }}</button>
                </div>

                <form v-else class="slip__form" novalidate @submit.prevent="submit">
                    <div class="slip__head">
                        <p class="slip__title">{{ tr.contact.form.slipTitle }}</p>
                        <p class="slip__meta">{{ tr.contact.form.slipMeta }}</p>
                    </div>

                    <div class="slip__row">
                        <div :class="['field', { 'field--error': errors.name }]">
                            <label for="c-name" class="field__label">
                                {{ tr.contact.form.name }} <span aria-hidden="true">{{ tr.contact.form.required }}</span>
                            </label>
                            <input id="c-name" v-model="form.name" type="text" class="field__input" :placeholder="tr.contact.form.namePlaceholder" autocomplete="name" required :aria-invalid="!!errors.name" aria-describedby="c-name-error" />
                            <span v-if="errors.name" id="c-name-error" class="field__error" role="alert">{{ errors.name }}</span>
                        </div>

                        <div :class="['field', { 'field--error': errors.email }]">
                            <label for="c-email" class="field__label">
                                {{ tr.contact.form.email }} <span aria-hidden="true">{{ tr.contact.form.required }}</span>
                            </label>
                            <input id="c-email" v-model="form.email" type="email" class="field__input" :placeholder="tr.contact.form.emailPlaceholder" autocomplete="email" required :aria-invalid="!!errors.email" aria-describedby="c-email-error" />
                            <span v-if="errors.email" id="c-email-error" class="field__error" role="alert">{{ errors.email }}</span>
                        </div>
                    </div>

                    <div class="field">
                        <label for="c-phone" class="field__label">
                            {{ tr.contact.form.phone }} <span class="field__optional">{{ tr.contact.form.phoneOptional }}</span>
                        </label>
                        <input id="c-phone" v-model="form.phone" type="tel" class="field__input" :placeholder="tr.contact.form.phonePlaceholder" autocomplete="tel" />
                    </div>

                    <div :class="['field', { 'field--error': errors.message }]">
                        <label for="c-message" class="field__label">
                            {{ tr.contact.form.message }} <span aria-hidden="true">{{ tr.contact.form.required }}</span>
                        </label>
                        <textarea id="c-message" v-model="form.message" class="field__input field__input--area" :placeholder="tr.contact.form.messagePlaceholder" rows="4" required :aria-invalid="!!errors.message" aria-describedby="c-message-error"></textarea>
                        <span v-if="errors.message" id="c-message-error" class="field__error" role="alert">{{ errors.message }}</span>
                    </div>

                    <p v-if="submitError" class="slip__send-error" role="alert">{{ submitError }}</p>

                    <button type="submit" class="slip__submit" :disabled="isSubmitting">
                        {{ isSubmitting ? tr.contact.form.submitting : tr.contact.form.submit }}
                        <svg v-if="!isSubmitting" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
                            <path d="M4 12h15M13 6l6 6-6 6" />
                        </svg>
                    </button>
                </form>
            </Transition>
        </div>

        <figure class="contact__map">
            <iframe
                src="https://maps.google.com/maps?q=Rakitnitsa,+Stara+Zagora,+Bulgaria&t=k&z=13&ie=UTF8&iwloc=&output=embed"
                :title="tr.contact.mapTitle"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <figcaption>
                <a :href="MAPS_URL" target="_blank" rel="noopener noreferrer">
                    {{ tr.footer.mapsLink }}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true">
                        <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                </a>
            </figcaption>
        </figure>

        <!-- Uneven ink edge for the "received" stamp -->
        <svg class="contact__defs" aria-hidden="true" focusable="false">
            <filter id="stamp-ink-slip" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" />
            </filter>
        </svg>
    </section>
</template>

<style scoped lang="scss">
@use "@/design/tokens" as *;

@keyframes stampLand {
    from {
        opacity: 0;
        transform: rotate(-8deg) scale(1.7);
    }
    to {
        opacity: 0.92;
        transform: rotate(-8deg) scale(1);
    }
}

.contact {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    align-items: start;
    gap: 64px 88px;
    padding: 120px $gutter 112px;
    font-family: $sans;
    color: $etiket;
    background: $burla;

    @media (max-width: $bp-tablet) {
        gap: 56px 48px;
        padding: 96px $gutter-tablet 96px;
    }

    @media (max-width: 900px) {
        grid-template-columns: minmax(0, 1fr);
    }

    @media (max-width: $bp-phone) {
        gap: 48px;
        padding: 72px $gutter-phone 72px;
    }

    a {
        @include focus-ring($etiket);
    }

    &__info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 22px;
    }

    &__kicker {
        margin: 0;
        @include mono-label;
    }

    &__title {
        margin: 0 0 8px;
        font-family: $display;
        font-weight: 900;
        font-size: clamp(54px, 5.6vw, 92px);
        line-height: 0.88;
        letter-spacing: -0.005em;

        span {
            display: block;
        }
    }

    &__sub {
        margin: 0;
        max-width: 46ch;
        font-size: 18px;
        line-height: 1.6;
    }

    &__call {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 14px;
    }

    &__call-label {
        @include mono-label;
        font-size: 11px;
    }

    &__phone {
        font-family: $display;
        font-weight: 900;
        font-size: clamp(48px, 4.6vw, 72px);
        line-height: 1;
        text-decoration: underline;
        text-decoration-thickness: 3px;
        text-underline-offset: 8px;
    }

    &__details {
        width: 100%;
        max-width: 420px;
        margin: 10px 0 0;
        border-top: 2px solid $etiket;

        div {
            display: grid;
            grid-template-columns: 120px minmax(0, 1fr);
            align-items: baseline;
            gap: 16px;
            padding: 10px 0 9px;
            border-bottom: 1px dotted rgba(251, 251, 246, 0.55);
        }

        dt {
            @include mono-label;
            font-size: 11px;
        }

        dd {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            overflow-wrap: anywhere;
        }

        a {
            text-decoration: underline;
            text-underline-offset: 3px;
        }
    }

    &__map {
        grid-column: 1 / -1;
        margin: 0;

        iframe {
            display: block;
            width: 100%;
            height: 340px;
            border: 6px solid $etiket;
            border-radius: $radius;
            background: $van;
        }

        figcaption {
            margin-top: 12px;
        }

        a {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            @include mono-label;
            text-decoration: underline;
            text-underline-offset: 4px;
        }
    }

    &__defs {
        position: absolute;
        width: 0;
        height: 0;
    }
}

// Torn from an order pad: paper, a printed head, ruled lines to write on
.slip {
    position: relative;
    padding: 34px 36px 36px;
    border-radius: $radius;
    color: $bing;
    background: $etiket;
    box-shadow: $paper-shadow;

    @media (max-width: $bp-phone) {
        padding: 26px 20px 28px;
    }

    // Perforated top edge where it came off the pad
    &::before {
        content: "";
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        border-top: 2px dashed rgba(36, 16, 15, 0.3);
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 22px;
    }

    &__head {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: 6px 16px;
        padding: 6px 0 14px;
        border-bottom: $rule;
    }

    &__title {
        margin: 0;
        font-family: $display;
        font-weight: 900;
        font-size: 40px;
        line-height: 0.9;
        text-transform: uppercase;
    }

    &__meta {
        margin: 0;
        @include mono-label;
        font-size: 11px;
        color: $kora;
    }

    &__row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 22px 24px;

        @media (max-width: $bp-phone) {
            grid-template-columns: minmax(0, 1fr);
        }
    }

    &__send-error {
        margin: 0;
        padding: 10px 12px;
        border-left: 3px solid $burla;
        font-size: 15px;
        color: $burla;
        background: rgba(194, 29, 56, 0.06);
    }

    &__submit {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        min-height: 58px;
        margin-top: 4px;
        padding: 0 24px;
        border-radius: $radius;
        font-family: $sans;
        font-size: 17px;
        font-weight: 600;
        color: $etiket;
        background: $burla;
        transition: background-color 0.2s;

        &:hover:not(:disabled) {
            background: $van;
        }

        &:disabled {
            cursor: progress;
            opacity: 0.75;
        }

        @include focus-ring;
    }

    &__done {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 14px;
        padding: 24px 0 8px;
    }

    &__stamp {
        margin: 0 0 18px;
        padding: 10px 22px 8px;
        border: 4px double $pechat;
        border-radius: 4px;
        color: $pechat;
        font-family: $display;
        font-size: 44px;
        font-weight: 900;
        line-height: 1;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        mix-blend-mode: multiply;
        filter: url(#stamp-ink-slip);
        opacity: 0.92;
        transform: rotate(-8deg);
        animation: stampLand 0.38s $ease-settle 0.15s both;

        @media (prefers-reduced-motion: reduce) {
            animation: none;
        }
    }

    &__done-title {
        margin: 0;
        font-family: $display;
        font-weight: 900;
        font-size: 36px;
        line-height: 1;
    }

    &__done-body {
        margin: 0;
        font-size: 17px;
        line-height: 1.55;
        color: $kora;
    }

    &__again {
        margin-top: 8px;
        padding-bottom: 4px;
        border-bottom: $rule;
        font-family: $sans;
        font-size: 16px;
        font-weight: 600;
        color: $bing;

        @include focus-ring;
    }
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &__label {
        @include mono-label;
        font-size: 11px;
        color: $kora;
    }

    &__optional {
        text-transform: none;
        letter-spacing: 0;
    }

    // Written-on lines, not boxes
    &__input {
        width: 100%;
        padding: 8px 0 9px;
        border: none;
        border-bottom: $rule;
        border-radius: 0;
        font-family: $sans;
        font-size: 17px;
        color: $bing;
        background: transparent;
        transition: border-color 0.2s, box-shadow 0.2s;

        &::placeholder {
            color: rgba(94, 81, 72, 0.75);
        }

        &:focus {
            outline: none;
            border-bottom-color: $burla;
            box-shadow: 0 2px 0 $burla;
        }

        &--area {
            min-height: 112px;
            padding-top: 2px;
            resize: vertical;
            // Text sits on the pad's ruled lines: line-height = rule spacing
            line-height: 34px;
            background: repeating-linear-gradient(transparent 0 33px, rgba(36, 16, 15, 0.14) 33px 34px);
            background-position: 0 2px;
            background-attachment: local;
        }
    }

    &__error {
        font-size: 14px;
        font-weight: 600;
        color: $burla;
    }

    &--error .field__input {
        border-bottom-color: $burla;
    }
}

.slip-enter-active,
.slip-leave-active {
    transition: opacity 0.25s ease;
}

.slip-enter-from,
.slip-leave-to {
    opacity: 0;
}
</style>
