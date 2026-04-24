<script setup lang="ts">
import { ref, reactive } from "vue"
import { useLocale } from "@/composables/useLocale"

const { tr } = useLocale()

const form = reactive({ name: "", email: "", phone: "", message: "" })
const errors = reactive({ name: "", email: "", message: "" })
const isSubmitting = ref(false)
const isSubmitted = ref(false)

function validate(): boolean {
    errors.name = form.name.trim() ? "" : tr.value.contact.errors.name
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : tr.value.contact.errors.email
    errors.message = form.message.trim().length >= 10 ? "" : tr.value.contact.errors.message
    return !errors.name && !errors.email && !errors.message
}

async function submit() {
    if (!validate()) return
    isSubmitting.value = true
    await new Promise((resolve) => setTimeout(resolve, 1400))
    isSubmitting.value = false
    isSubmitted.value = true
}

function reset() {
    form.name = ""
    form.email = ""
    form.phone = ""
    form.message = ""
    errors.name = ""
    errors.email = ""
    errors.message = ""
    isSubmitted.value = false
}
</script>

<template>
    <section id="contact" class="contact">
        <div class="container contact__inner">
            <!-- Info column -->
            <div v-appear class="contact__info">
                <div class="section-label">{{ tr.contact.label }}</div>

                <h2 class="contact__heading">
                    {{ tr.contact.heading }}<br />
                    <em>{{ tr.contact.headingItalic }}</em>
                </h2>

                <p class="contact__sub">{{ tr.contact.sub }}</p>

                <ul class="contact__details">
                    <li class="contact__detail">
                        <div class="contact__detail-icon">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10 2a5.5 5.5 0 0 0-5.5 5.5c0 4.125 5.5 10.5 5.5 10.5s5.5-6.375 5.5-10.5A5.5 5.5 0 0 0 10 2z"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    fill="rgba(255,255,255,0.1)"
                                />
                                <circle cx="10" cy="7.5" r="2" stroke="currentColor" stroke-width="1.3" fill="none" />
                            </svg>
                        </div>
                        <div>
                            <span class="contact__detail-label">{{ tr.contact.locationLabel }}</span>
                            <span class="contact__detail-value">{{ tr.contact.locationValue }}</span>
                        </div>
                    </li>

                    <li class="contact__detail">
                        <div class="contact__detail-icon">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5h14c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1z" stroke="currentColor" stroke-width="1.5" fill="rgba(255,255,255,0.1)" />
                                <path d="M2 6l8 6 8-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </div>
                        <div>
                            <span class="contact__detail-label">{{ tr.contact.emailLabel }}</span>
                            <a href="mailto:contact@zpdilyanvelev.bg" class="contact__detail-value contact__detail-value--link"> contact@zpdilyanvelev.bg </a>
                        </div>
                    </li>

                    <li class="contact__detail">
                        <div class="contact__detail-icon">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5 13.8l-2.5-1.1c-.3-.1-.6 0-.8.2l-1.1 1.3c-1.9-.9-3.4-2.4-4.3-4.3l1.3-1.1c.2-.2.3-.5.2-.8L7.2 5.5c-.1-.3-.4-.5-.7-.5H4c-.3 0-.6.1-.8.4C2.8 6.7 2.5 9.6 4.5 12.5c1.8 2.6 4.8 4.1 8 3.5.4-.1.6-.4.5-.8V14.5c0-.3-.2-.6-.5-.7z"
                                    stroke="currentColor"
                                    stroke-width="1.4"
                                    fill="rgba(255,255,255,0.1)"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <div>
                            <span class="contact__detail-label">{{ tr.contact.phoneLabel }}</span>
                            <a href="tel:+359000000000" class="contact__detail-value contact__detail-value--link"> +359 (0) 000 000 000 </a>
                        </div>
                    </li>

                    <li class="contact__detail">
                        <div class="contact__detail-icon">
                            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="3" width="16" height="14" rx="1.5" stroke="currentColor" stroke-width="1.4" fill="rgba(255,255,255,0.1)" />
                                <path d="M2 7h16M6 3v4M14 3v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
                            </svg>
                        </div>
                        <div>
                            <span class="contact__detail-label">{{ tr.contact.hoursLabel }}</span>
                            <span class="contact__detail-value">{{ tr.contact.hoursValue }}</span>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Form column -->
            <div v-appear="150" class="contact__form-wrap">
                <Transition name="fade" mode="out-in">
                    <div v-if="isSubmitted" class="contact__success">
                        <div class="contact__success-icon">
                            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="20" fill="rgba(155,35,53,0.15)" />
                                <path d="M14 24 L21 31 L34 17" stroke="var(--color-cherry-light)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <h3 class="contact__success-title">{{ tr.contact.form.successTitle }}</h3>
                        <p class="contact__success-body">{{ tr.contact.form.successBody }}</p>
                        <button class="contact__success-btn" @click="reset">{{ tr.contact.form.sendAnother }}</button>
                    </div>

                    <form v-else class="contact__form" novalidate @submit.prevent="submit">
                        <div class="form-row">
                            <div class="form-field" :class="{ 'has-error': errors.name }">
                                <label for="c-name" class="form-label">
                                    {{ tr.contact.form.name }} <span aria-hidden="true">{{ tr.contact.form.required }}</span>
                                </label>
                                <input id="c-name" v-model="form.name" type="text" class="form-input" :placeholder="tr.contact.form.namePlaceholder" autocomplete="name" />
                                <span v-if="errors.name" class="form-error" role="alert">{{ errors.name }}</span>
                            </div>

                            <div class="form-field" :class="{ 'has-error': errors.email }">
                                <label for="c-email" class="form-label">
                                    {{ tr.contact.form.email }} <span aria-hidden="true">{{ tr.contact.form.required }}</span>
                                </label>
                                <input id="c-email" v-model="form.email" type="email" class="form-input" :placeholder="tr.contact.form.emailPlaceholder" autocomplete="email" />
                                <span v-if="errors.email" class="form-error" role="alert">{{ errors.email }}</span>
                            </div>
                        </div>

                        <div class="form-field">
                            <label for="c-phone" class="form-label">
                                {{ tr.contact.form.phone }}
                                <span class="form-optional">{{ tr.contact.form.phoneOptional }}</span>
                            </label>
                            <input id="c-phone" v-model="form.phone" type="tel" class="form-input" :placeholder="tr.contact.form.phonePlaceholder" autocomplete="tel" />
                        </div>

                        <div class="form-field" :class="{ 'has-error': errors.message }">
                            <label for="c-message" class="form-label">
                                {{ tr.contact.form.message }} <span aria-hidden="true">{{ tr.contact.form.required }}</span>
                            </label>
                            <textarea id="c-message" v-model="form.message" class="form-input form-textarea" :placeholder="tr.contact.form.messagePlaceholder" rows="5"></textarea>
                            <span v-if="errors.message" class="form-error" role="alert">{{ errors.message }}</span>
                        </div>

                        <button type="submit" class="form-submit" :disabled="isSubmitting">
                            <span v-if="isSubmitting" class="form-submit__spinner" aria-hidden="true"></span>
                            <span>{{ isSubmitting ? tr.contact.form.submitting : tr.contact.form.submit }}</span>
                            <svg v-if="!isSubmitting" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 10h14M10 4l7 6-7 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </form>
                </Transition>
            </div>

            <!-- Full-width map -->
            <div v-appear="250" class="contact__map-card">
                <iframe
                    class="contact__map-iframe"
                    src="https://maps.google.com/maps?q=Rakitnitsa,+Stara+Zagora,+Bulgaria&t=k&z=13&ie=UTF8&iwloc=&output=embed"
                    title="ZP Dilyan Velev — Rakitnitsa, Stara Zagora"
                    allowfullscreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
                <a href="https://www.google.com/maps/search/Rakitnitsa,+Stara+Zagora,+Bulgaria" target="_blank" rel="noopener noreferrer" class="contact__map-link">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5C3.5 9.75 8 14.5 8 14.5s4.5-4.75 4.5-8.5A4.5 4.5 0 0 0 8 1.5z" stroke="currentColor" stroke-width="1.2" />
                        <circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.1" />
                    </svg>
                    <span>{{ tr.footer.mapsLink }}</span>
                    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.contact {
    padding: var(--section-padding) 0;
    background: radial-gradient(ellipse at 20% 50%, rgba(42, 77, 20, 0.25) 0%, transparent 60%), linear-gradient(160deg, #100c08 0%, #18090b 60%, #100a0a 100%);
}

.contact__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
}

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
    content: "";
    display: block;
    width: 28px;
    height: 2px;
    background: var(--color-cherry-light);
    border-radius: 2px;
}

.contact__heading {
    font-family: var(--font-display);
    font-size: clamp(30px, 3.2vw, 48px);
    font-weight: 500;
    line-height: 1.12;
    letter-spacing: -0.02em;
    color: #fff;
    margin-bottom: 24px;
}

.contact__heading em {
    font-style: italic;
    color: var(--color-cherry-light);
}

.contact__sub {
    font-size: 16px;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.55);
    margin-bottom: 40px;
    max-width: 380px;
}

.contact__details {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 32px;
}

.contact__detail {
    display: flex;
    align-items: flex-start;
    gap: 14px;
}

.contact__detail-icon {
    width: 38px;
    height: 38px;
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.6);
}

.contact__detail-icon svg {
    width: 17px;
    height: 17px;
}

.contact__detail > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 2px;
}

.contact__detail-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
}

.contact__detail-value {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.72);
}
.contact__detail-value--link {
    transition: color 0.2s;
}
.contact__detail-value--link:hover {
    color: #fff;
}

/* Map card — full width row */
.contact__map-card {
    grid-column: 1 / -1;
    border-radius: var(--radius-lg);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.contact__map-iframe {
    display: block;
    width: 100%;
    height: 400px;
    border: none;
    filter: grayscale(20%) contrast(1.05);
}

.contact__map-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.55);
    background: rgba(255, 255, 255, 0.05);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    transition:
        color 0.2s,
        background 0.2s;
}

.contact__map-link svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
}
.contact__map-link .arrow {
    margin-left: auto;
    transition: transform 0.2s;
}
.contact__map-link:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
}
.contact__map-link:hover .arrow {
    transform: translateX(3px);
}

/* ── Form ── */
.contact__form-wrap {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: var(--radius-lg);
    padding: 40px;
    backdrop-filter: blur(8px);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.form-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
}
.form-field:last-of-type {
    margin-bottom: 0;
}

.form-label {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.55);
    letter-spacing: 0.01em;
}
.form-label span[aria-hidden] {
    color: var(--color-cherry-light);
    margin-left: 2px;
}
.form-optional {
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.28);
}

.form-input {
    width: 100%;
    padding: 12px 16px;
    font-family: var(--font-body);
    font-size: 14.5px;
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius);
    outline: none;
    transition:
        border-color 0.2s,
        background 0.2s;
    resize: none;
}

.form-input::placeholder {
    color: rgba(255, 255, 255, 0.22);
}
.form-input:focus {
    border-color: var(--color-cherry-light);
    background: rgba(255, 255, 255, 0.09);
}
.has-error .form-input {
    border-color: rgba(255, 100, 100, 0.6);
}
.form-textarea {
    min-height: 120px;
    line-height: 1.6;
}
.form-error {
    font-size: 12.5px;
    color: rgba(255, 140, 140, 0.9);
}

.form-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 14px 28px;
    margin-top: 8px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #fff;
    background: var(--color-cherry);
    border-radius: var(--radius);
    border: 2px solid var(--color-cherry);
    transition:
        background 0.2s,
        transform 0.15s,
        opacity 0.2s;
}

.form-submit:not(:disabled):hover {
    background: var(--color-cherry-dark);
    border-color: var(--color-cherry-dark);
    transform: translateY(-2px);
}

.form-submit:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}
.form-submit svg {
    width: 18px;
    height: 18px;
    transition: transform 0.2s;
}
.form-submit:not(:disabled):hover svg {
    transform: translateX(3px);
}

.form-submit__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Success */
.contact__success {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 24px 0;
}
.contact__success-icon {
    margin-bottom: 24px;
}
.contact__success-icon svg {
    width: 64px;
    height: 64px;
}
.contact__success-title {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 12px;
}
.contact__success-body {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.7;
    margin-bottom: 32px;
    max-width: 280px;
}
.contact__success-btn {
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius);
    transition:
        background 0.2s,
        color 0.2s;
}
.contact__success-btn:hover {
    background: rgba(255, 255, 255, 0.13);
    color: #fff;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 900px) {
    .contact__inner {
        grid-template-columns: 1fr;
        gap: 48px;
    }
    .contact__sub {
        max-width: 100%;
    }
}

@media (max-width: 520px) {
    .contact__form-wrap {
        padding: 28px 20px;
    }
    .form-row {
        grid-template-columns: 1fr;
        gap: 0;
    }
}
</style>
