import { defineConfig, type HtmlTagDescriptor, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { translations } from './src/i18n/translations'
import { EMAIL, MAPS_URL } from './src/site'

// Production address, no trailing slash, e.g. "https://chereshi-rakitnitsa.bg".
// While empty, the build leaves out canonical, og:url/og:image and sitemap.xml (they need absolute URLs).
const SITE_URL = ''

const OG_IMAGE = '/og-image.jpg' // 1200×630, in /public

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Head tags, structured data, robots.txt and sitemap.xml — all from one place.
// Bulgarian is the default language, so the static head is Bulgarian; useLocale swaps title/description at runtime.
function siteSeo(): Plugin {
  const { seo, nav, varieties } = translations.bg
  const phone = `+359${nav.phone.replace(/\s/g, '').replace(/^0/, '')}`

  const business = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: nav.brand,
    alternateName: translations.en.nav.brand,
    description: seo.description,
    telephone: phone,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ракитница',
      addressRegion: 'Стара Загора',
      addressCountry: 'BG',
    },
    areaServed: { '@type': 'Country', name: 'България' },
    hasMap: MAPS_URL,
    // No prices: they are on request, as the page says
    makesOffer: [
      ...varieties.items.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Product', name: `Череши ${item.name}`, description: item.description },
      })),
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Черешов сок' } },
    ],
    ...(SITE_URL ? { url: `${SITE_URL}/`, image: `${SITE_URL}${OG_IMAGE}` } : {}),
  }

  return {
    name: 'site-seo',
    transformIndexHtml(html) {
      const tags: HtmlTagDescriptor[] = [
        { tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(business), injectTo: 'head' },
      ]
      if (SITE_URL) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${SITE_URL}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${SITE_URL}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image', content: `${SITE_URL}${OG_IMAGE}` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:image', content: `${SITE_URL}${OG_IMAGE}` }, injectTo: 'head' },
        )
      }
      return {
        html: html.replace(/%SEO_TITLE%/g, escapeAttr(seo.title)).replace(/%SEO_DESCRIPTION%/g, escapeAttr(seo.description)),
        tags,
      }
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(SITE_URL ? ['', `Sitemap: ${SITE_URL}/sitemap.xml`] : [])].join('\n')
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots}\n` })

      if (SITE_URL) {
        const lastmod = new Date().toISOString().slice(0, 10)
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><lastmod>${lastmod}</lastmod></url>
</urlset>
`
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), siteSeo()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
