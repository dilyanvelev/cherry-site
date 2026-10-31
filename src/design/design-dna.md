# Design DNA — ЗП Дилян Велев (cherry-site)

Subject: a family cherry farm in Rakitnitsa, Stara Zagora, selling its own harvest (Бигаро Бюрла · Ван · Бинг) by the crate and by the kilo.
Audience: produce traders and market stall owners (primary, phone-first, practical) + households buying for jam/juice (secondary).
Page job: get a trader to call or send an order request for the coming season.

## Palette — taken from the farm, not from a colour wheel

| name | hex | where it comes from | role |
|---|---|---|---|
| Варосано (lime-wash) | `#ECEEE7` | the whitewashed tree trunks in the garden | base canvas |
| Бинг (Bing) | `#24100F` | near-black mahogany skin of a ripe Bing | ink / text |
| Бюрла (Burlat) | `#C21D38` | the bright red of the early Burlat | structural colour zones, primary CTA |
| Ван (Van) | `#6A0E1E` | dark red Van skin | deep zones, hover states |
| Печат (stamp ink) | `#2D3C9A` | blue-violet rubber-stamp ink on produce paperwork | stamp only, nowhere else |
| Етикет (label paper) | `#FBFBF6` | white crate-label paper | label surface |
| Кора (bark) | `#5E5148` | trunk bark under the lime | secondary text, captions |

Contrast (computed): Бинг/Варосано 15.5 · Бюрла/Варосано 5.1 · Етикет/Бюрла 5.7 · Варосано/Ван 10.6 · Печат/Етикет 9.1 · Кора/Варосано 6.5. All AA.

## Type

Sofia Sans Extra Condensed (display, 800–900) / Sofia Sans (body, 400–600) / IBM Plex Mono (label fields, captions, 500).
Rationale: Sofia Sans is drawn by a Bulgarian studio (Lettersoup) with native Bulgarian Cyrillic forms (needs `lang="bg"`, already set by `useLocale`). The extra-condensed cut reads like crate stencils and market labels; the width contrast (extra-condensed vs normal width) is the system. Plex Mono is the typewriter on the label.

Scale: display `clamp(64px, 11.5vw, 184px)` / line-height .84 / tracking -0.01em · h2 `clamp(44px, 6vw, 88px)` · body 17–18px / 1.6 · mono labels 12–13px, tracking .08em, uppercase.

## Geometry

Containers: 2px radius, weight carried by 2px Bing rules (crate-frame heavy, never hairline newspaper rules).
Rounded only where the real object is round: the label's punched hole, cherries.
Shadows: one real paper shadow, only under labels — `0 1px 0 rgba(36,16,15,.08), 0 18px 34px -12px rgba(36,16,15,.35)`.

## Layout skeleton — AX31 colour-block zoning (+ AX24 asymmetric splits inside zones)

Sections are separated by full-bleed colour changes (Варосано → Бюрла → Варосано → Ван → Варосано → Бинг), not by whitespace.

```
CANDIDATE A (chosen) — colour-block zones
┌──────────────────────────┬──────────────┐
│ ЧЕРЕШИ                   │              │  hero: type panel 7/12 | photo 5/12 (bleeds right)
│ ОТ ДЪРВОТО,              │   [crates    │
│ БЕЗ ПОСРЕДНИК.     ┌─────┼──┐ photo]    │  ← label crosses the seam
│ sub · [CTA] phone  │ЕТИКЕТ │  │          │
└────────────────────┴───────┴──┴─────────┘
████████████ Бюрла zone: why buy direct (list, not cards) █████
░░ Варосано: story 40/60 with garden photo (trunks) ░░░░░░░░
▓▓▓▓ Ван zone: 3 variety labels hung on a May→July axis ▓▓▓▓
░░ Варосано: juice ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
████ Бюрла zone: order slip + phone (footer is the dark close) ██

CANDIDATE B — sticky-scroll: pinned crate photo, copy scrolls past.  Lost: photos are phone-res and the site is short; INP/CWV risk for little gain.
CANDIDATE C — horizontal season chapter (May → July). Lost: only 3 varieties, a horizontal scroller for 3 items is ceremony.
```

## Hero composition — AX59 vertical split-screen

Type panel on lime-wash vs real harvest photo; the produce label is pinned across the seam so the two halves are physically joined. Mobile collapse is designed: headline → photo band with the label overlapping its top edge → CTAs.

## Signature — the crate label (Етикет)

The paper label every wholesale crate carries (packer, origin, variety, caliber, harvest), with a punched hole, a perforated tear line and a blue rubber stamp. Used in exactly two places: the hero (farm facts) and the varieties (one label per variety), both via `src/components/CrateLabel.vue`. The blue rubber stamp appears in the hero and once more as the earned confirmation on the order slip ("Прието") after a request is sent. Everything around it stays quiet.
Why it belongs: traders read these labels every day; it carries real data (caliber 26–28+ mm, 4 ha, 30+ t) instead of a stats strip.

## Motion — AX40 restrained

One curve: `--ease-settle: cubic-bezier(.2, .9, .25, 1.15)` (slight overshoot, like a stamp landing). Two moments only: headline lines rise from their masks on load; the label settles and the stamp lands. No fade-up-on-everything. `prefers-reduced-motion` → static.

## Imagery

Real farm photographs only (phone-shot, ~665–980px wide). Never full-bleed wider than ~700px; shown in tall portrait frames with a 2px Бинг frame and a mono caption. One grade for all: `filter: saturate(1.06) contrast(1.04)`. Ask for higher-res originals before shipping the hero at retina quality.

Dark mode: none. Light-dominant page whose colour zones already supply the dark moments.

Design-log check: clean (log empty).

Conditional justifications: none used. BP11 avoided: 2px radius, heavy rules, no newspaper columns. BP01 avoided: cool lime-white base, sans display, no terracotta.

Divergence note: the generic version of this brief is a dark full-bleed orchard photo + elegant serif + "From our family to your table". This one is a trade document: a light, condensed, label-driven page built around the crate rather than the blossom.

## SEO anchor

Primary keyword (BG): „череши на едро от производител“, plus local modifiers „Стара Загора“ and „Ракитница“. Evidence: wholesale listings in the region use exactly this phrasing (olx.bg, Stara Zagora region). No volume data (Semrush not connected).
H1 = display headline + keyword line inside the same `<h1>`.
